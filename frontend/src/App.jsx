import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import { login, logout } from "./redux/slices/authSlice.js";
import { refreshData, fetchUserData } from "./redux/slices/userSlice.js";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
