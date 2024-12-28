import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (payload, res) => {
    const token = jwt.sign({ ...payload }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    res.cookie('u_at', token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    });
}

export default generateTokenAndSetCookie;