import React from "react";
import { useEffect } from "react";
import axios from "axios";
import Constants from "../../Constants";
const Landing = () => {
  // useEffect(() => {
  //   axios
  //     .post(
  //       `${Constants.url}/auth/login`,
  //       {
  //         email: "roshanpp20@gmail.com",
  //         password: "roshan",
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((res) => {
  //       console.log("response from server is : ", res);
  //     })
  //     .catch((err) => {
  //       console.log("error is : ", err);
  //     });

  //   axios
  //     .get(`${Constants.url}/user/details`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       console.log("response is : ", res);
  //     });
  // });
  return <div>WELCOME TO FORGEFOLIO!</div>;
};

export default Landing;
