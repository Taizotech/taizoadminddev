/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import styles from "./login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { UserLoginDetails } from "../../apiServices";

import TextField from "@mui/material/TextField";

import { useDispatch, useSelector } from "react-redux";
import { adminDetailsActions } from "../../redux-store/store";
import CandidateFaceBookMetaTable from "../Candidate/FacebookMeta/CandidateFaceBookMetaTable";

let noError;

const LogIn = (props) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email_id: { value: "", err: false },
    password: { value: "", err: false },
  });
  const [showError, setShowError] = useState({ showErr: false });
  const [isloggedIn, setIsloggedIn] = useState({ LoggedIn: false });
  const adminDetails = useSelector((state) => state.adminDetails);

  const Dispatch = useDispatch();

  const input_handler = (e) => {
    console.log(inputs);
    console.log(e.target.value);
    const name = e.target.name;
    const val = e.target.value;
    const showErr = val === "";
    setInputs((values) => ({
      ...values,
      [name]: { value: val, err: showErr },
    }));
  };

  const Login_handler = (e) => {
    e.preventDefault();

    if (inputs.email_id.value == "" || inputs.password.value == "") {
      noError++;
    } else {
      noError = 0;
    }

    const req_obj = {
      method: "POST",
    };

    if (noError == 0) {
      UserLoginDetails(inputs.email_id.value, inputs.password.value)
        .then((data) => {
          if (data.message == "Login successful") {
            console.log(data, "success");

            console.log(data.admin.id);

            localStorage.setItem("adminID", data.admin.id);

            // to update admin details after logged in
            // Dispatch(
            //   adminDetailsActions.setAdminLoginDetails({
            //     adminID: data.admin.id,
            //     privileges: data.roles[0].privileges,
            //     roleID: data.roles[0].roleId,
            //     emailID: data.roles[0].emailID,
            //     isActive: data.roles[0].isActive,
            //     userName: data.roles[0].userName,
            //     module: data.roles[0].module,
            //   })
            // );

            navigate("/CandidateTabsview");

            setShowError((val) => ({ ...val, showErr: false }));
            // setIsloggedIn((val) => ({ ...val, LoggedIn: true }));
            // CleverTapInit(data.data.userName, data.data.emailId);
          } else {
            setShowError((val) => ({ ...val, showErr: true }));
            // setIsloggedIn((val) => ({ ...val, LoggedIn: false }));
          }
        })
        .catch((err) => {
          // console.log(err);
          setShowError((val) => ({ ...val, showErr: true }));
          setIsloggedIn((val) => ({ ...val, LoggedIn: false }));
        });
    } else {
      if (inputs.email_id.value == "" && inputs.password.value == "") {
        setInputs((values) => ({
          ...values,
          email_id: { value: "", err: true },
          password: { value: "", err: true },
        }));
      } else {
        if (inputs.password.value == "") {
          setInputs((values) => ({
            ...values,
            email_id: { value: "", err: false },
            password: { value: "", err: true },
          }));
        }

        if (inputs.email_id.value == "") {
          setInputs((values) => ({
            ...values,
            email_id: { value: "", err: true },
            password: { value: "", err: false },
          }));
        }
      }
    }

    return false;
  };

  return (
    <>
      <div className="">
        <h3 className="text-center mt-5 my-2 mb-4">Log In</h3>
        <div className={` ${styles.login_btn_wrp}`}>
          <div
            className={`shadow p-3 mb-5 bg-body rounded-2 ${styles.login_content}`}
          >
            <form action="#" onSubmit={Login_handler}>
              <div
                className={` ${styles["form-group"]} ${
                  inputs.email_id.err && styles.invalid
                }`}
              >
                <TextField
                  type="email"
                  onChange={(e) => {
                    input_handler(e);
                  }}
                  className="form-control mt-4"
                  name="email_id"
                  id="email_id"
                  value={inputs.email_id.value}
                  label="Email ID"
                  variant="outlined"
                  // required
                />
                {inputs.email_id.err && (
                  <p className="text-danger my-3">Enter Email ID</p>
                )}
              </div>
              <div
                className={` ${styles["form-group"]} ${
                  inputs.password.err && styles.invalid
                }`}
              >
                <TextField
                  type="password"
                  className="form-control  mt-4 "
                  name="password"
                  id="password"
                  value={inputs.password.value}
                  onChange={input_handler}
                  label="Password"
                  variant="outlined"
                  // required
                />
                {inputs.password.err && (
                  <p className="text-danger my-3">Enter password</p>
                )}
              </div>
              <div className={`mt-5 ${styles.login_btn_wrp}`}>
                <Button
                  variant="contained"
                  type="submit"
                  className={styles.login_btn}
                  color=""
                  style={{ backgroundColor: "#169C50", color: "#ffff" }}
                >
                  Log In
                </Button>
              </div>
            </form>
            <div>
              {showError.showErr && (
                <p className="text-danger my-1">Invalid Credentials</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
