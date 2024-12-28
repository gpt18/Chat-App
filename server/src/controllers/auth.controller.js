import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (!fullName || !username || !password || !confirmPassword) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, error: "Passwords do not match" });
        }

        const user = await UserModel.findOne({ username });

        if (user) {
            return res.status(400).json({ success: false, error: "Username already exists" });
        }

        // Hash Password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create User Avatar
        const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new UserModel({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePicture: gender === "male" ? boyAvatar : girlAvatar
        });

        if (!newUser) {
            return res.status(400).json({ success: false, error: "Error creating user" });
        }

        generateTokenAndSetCookie({ uid: newUser._id }, res);
        await newUser.save();

        res.status(201).json({
            success: true, message: "Profile created successfully", data: {
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePicture: newUser.profilePicture
            }
        });


    } catch (error) {
        console.log("Error in signup controller", error);
        const devError = process.env.NODE_ENV !== "development" ? "Internal server error" : error.message;
        res.status(500).json({ success: false, error: devError });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        const user = await UserModel.findOne({ username });

        const isPasswordValid = user && await bcryptjs.compare(password, user.password || "");

        if (!isPasswordValid) {
            return res.status(400).json({ success: false, error: "Invalid username or password" });
        }

        generateTokenAndSetCookie({ uid: user._id }, res);

        res.status(200).json({
            success: true, message: "Logged in successfully", data: {
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                profilePicture: user.profilePicture
            }
        });

    } catch (error) {
        console.log("Error in login controller", error);
        const devError = process.env.NODE_ENV !== "development" ? "Internal server error" : error.message;
        res.status(500).json({ success: false, error: devError });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("u_at");
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error);
        const devError = process.env.NODE_ENV !== "development" ? "Internal server error" : error.message;
        res.status(500).json({ success: false, error: devError });
    }
}