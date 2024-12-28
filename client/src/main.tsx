import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AdminApp from "./AdminApp.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/chat"} />,
  },
  {
    path: "/chat",
    element: <App />,
  },
  {
    path: "/admin",
    element: <AdminApp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
  </>
);
