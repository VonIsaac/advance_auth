// components/RootLayout.jsx
import { Outlet } from "react-router-dom";
import RefreshHandler from "../RefreshHandler";

const RootLayout = () => {
  return (
    <>
      <RefreshHandler />
      <Outlet />
    </>
  );
};

export default RootLayout;
