import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";



const Register = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const successNotify = () => toast.success("Succesfully User Added");
  const failedNotify = (message) => toast.error(message);

  const history = useHistory();

  //ADD EMPLOYEE
  const addUser = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("triggered");
    // console.log("clicked");
    const request = {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
    };

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const url = `http://localhost:8080/api/register`;
    axios
      .post(url, request, {
        headers: headers,
      })
      .then((response) => {
        setLoading(false);
        console.log(response)
        if (response.status === 200) {
          successNotify();
        } else if (response.status === 400) {
          failedNotify("Please fill out all the fields");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        failedNotify("Failed to Add User");
      });

    setFname("");
    setLname("");
    setEmail("");
    setPassword("");
  };

  return (

    <React.Fragment>

      <ToastContainer />

      {isLoading && (
        <div className="loading">
          <Loader type="Audio" color="#897eff" height={100} width={100} />
          <p>Please wait while we verify....</p>
        </div>
      )}
      {!isLoading && (
        <div className="login-container bg">

          <div className="flexbox">
            <div className="login">
              <div className="header">
                <h1 style={{marginBottom:"20px", textAlign:"center", fontWeight:"800", fontSize:"6vh"}} >Register</h1>
              </div>
              
              <div >
                <form onSubmit={addUser}>

                  <div className>
                    <input
                      type="text"
                      name="fname"
                      value={fname}
                      placeholder="First Name"
                      onChange={(e) => setFname(e.target.value)}

                    />
                    <input
                      type="text"
                      name="lname"
                      value={lname}
                      placeholder="Last Name"
                      onChange={(e) => setLname(e.target.value)}

                    />
                    <input
                      type="email"
                      name="email"
                      value={email}
                      placeholder="email"
                      onChange={(e) => setEmail(e.target.value)}

                    />
                    <input
                      type="password"
                      name="pwd"
                      value={password}
                      placeholder="password"
                      onChange={(e) => setPassword(e.target.value)}

                    />
                    <div className="button-container">
                      <button type="submit"> Register </button>
                      <button type="button" style={{float:"right"}} onClick={() => history.goBack()}>
                        Back
                  </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Register;
