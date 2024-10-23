import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import { login, logout } from "./redux/slices/authSlice.js";
import { refreshData } from "./redux/slices/userSlice.js";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshData());
  }, [dispatch]);

  if (loading && !error) {
    return <h1>Loading...</h1>;
  } else if (!loading && !error) {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  } else {
    return <h1>Error</h1>;
  }
}

export default App;
