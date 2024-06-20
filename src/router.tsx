import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Autentication/Login";
import Register from "./views/Autentication/Register";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "register", element: <Register /> },
]);

export default router;
