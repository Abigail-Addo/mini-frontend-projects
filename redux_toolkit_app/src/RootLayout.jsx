import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./pages/Root";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import App from "./App";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="app" element={<App />} />
    </Route>
  )
);

function RootLayout() {
  return <RouterProvider router={router} />;
}

export default RootLayout;
