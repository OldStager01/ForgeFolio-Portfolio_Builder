import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import { login, logout } from "./redux/slices/authSlice.js";
import { refreshData } from "./redux/slices/userSlice.js";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const _id = useSelector((state) => state.auth._id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshData(_id));
  }, [dispatch]);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
