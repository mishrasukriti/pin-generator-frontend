import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ToastContainer, toast } from "react-toastify";
import mobile from "../../assets/mobile.JPG";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";


const Dash = () => {
  const [isLoading, setLoading] = useState(true);
  const successNotify = (msg) => toast.success(msg);
  const failedNotify = (message) => toast.error(message);

  const history = useHistory();


  const handleKeyUp = (event) => {
    
    let input = event.target;
    if (input !== null && input !== undefined) {

      let index = getIndex(input);
      let text = event.target.value;
      
      let digit = text.slice(0, 1);
      event.target.value = digit;
     
      let rest = text.slice(1, text.length);
      
      let next;

      if (rest.length > 0) {

        let nextInputName = `chars[${index + 1}]`;
        next = document.getElementsByName(nextInputName);
        if (next.length > 0) {
          next[0].value = rest;
          next[0].focus();
          handleKeyUp(next[0], event);
        }

      }

    }
  }


  const handleKeyDown = (event) => {
    
    let input = event.target;
    if (input !== null && input !== undefined) {
      let index = getIndex(input);
      let prev;
      if (event.which === 8 && !(event.target.value)) {
        let prev;
        let prevInputName = `chars[${index - 1}]`;
        prev = document.getElementsByName(prevInputName);
        
        if (prev[0] !== null && prev[0] !== undefined) prev[0].focus();
      }
    }

    
  }

  const getIndex = (input) => {
    let name = input.getAttribute("name");
    const index = parseInt(name.split(/[\[\]]/)[1], 10);
    return index;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "https://pin-generator-server.herokuapp.com/api/validateOTP";
    const token = localStorage.getItem("token");

    let inputs = document.getElementsByClassName("def-txt-input");
    let otp = '';
    for (let input of inputs) {
      if (input !== null && input !== undefined) {
        otp += input.value;
      }
    }
    
    let hash = otp;
    var reg = new RegExp('^\\d+$');
    if (!reg.test(hash)) {
       for (let input of inputs) {
        input.style.border = "2px solid red"
      }
      failedNotify("Enter numeric characters !!");
      return;
    }else{
      for (let input of inputs) {
        input.style.border = "1px solid grey"
      }
    }

    let request = { otp };
    
    axios({
      url: url,
      method: "post",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
      data: request,
    })
      .then((response) => {
        
        if (response.data.message === "OTP Verified") {
          successNotify("OTP verified Succesfully");
          history.push("/welcomeScreen");
        }
        else if (response.data.message === "OTP Incorrect") failedNotify("Incorrect OTP");
        setLoading(false);
      })
      
      .catch((err) => {
        console.log("error in catch ", err);
        setLoading(false);
        failedNotify("Some problem while verifying");
      });
  }

  const handleResend = (e) => {

    e.preventDefault();
    const url = "https://pin-generator-server.herokuapp.com/api/resndOTP";
    const token = localStorage.getItem("token");
    let email = localStorage.getItem("email");
    let request = { email };
    axios({
      url: url,
      method: "post",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
      data: request
    })
      .then((response) => {
        if (response.data.message === "OTP Resent Successfully") successNotify("OTP Resent Successfully");
        else if (response.data.message === "Resend OTP Limit exceeded") failedNotify("Resend OTP Limit exceeded");
        setLoading(false);
      })
      .catch((err) => {
        console.log("error in catch ", err);
        setLoading(false);
        failedNotify("Failed to Send OTP Again. Please try Again");
      });
  }

  return (

    <React.Fragment>
      <ToastContainer />
      <div style={{textAlign:"center", marginTop:"50px"}}>
        <div >
          
          <img src={mobile} />
          <h1 style={{ textAlign: "center", color: "blue" }} >Enter Pin</h1>
        </div>


        <form onSubmit={handleSubmit}>
          <div style={{ marginTop: "30px" }} className="m-5">

            <input type="text" className="def-txt-input" name="chars[1]" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
            <input type="text" className="def-txt-input" name="chars[2]" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
            <input type="text" className="def-txt-input" name="chars[3]" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
            <input type="text" className="def-txt-input" name="chars[4]" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
            <input type="text" className="def-txt-input" name="chars[5]" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
          </div>

          <div style={{ marginTop: "30px" }}>
            <button class="pin-btn">Verify</button> <button class="pin-btn" onClick={handleResend}>Resend OTP</button>
          </div>
        </form>

        
      </div>


    </React.Fragment>
  );
};

export default Dash;