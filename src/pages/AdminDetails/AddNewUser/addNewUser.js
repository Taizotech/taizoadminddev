/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import {
  Autocomplete,
  Box,
  Card,
  FormControlLabel,
  TextField,
} from "@mui/material";
import * as React from "react";

import Checkbox from "@mui/material/Checkbox"; // Import Checkbox component

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useState } from "react";
import {
  GetAdminByMobileNumberOrEmail,
  GetTotalAdminRoles,
  GetTotalPrevilegesList,
  PostAdminNewUser,
} from "../../../apiServices";
import { useEffect } from "react";

import CreateNewFolderSharpIcon from "@mui/icons-material/CreateNewFolderSharp";

import ChromeReaderModeSharpIcon from "@mui/icons-material/ChromeReaderModeSharp";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";

import EditSharpIcon from "@mui/icons-material/EditSharp";

import style from "./addUser.module.scss";
import {
  MyModal,
  alphabetTest,
  emailValidation,
  numbersOnlyTest,
} from "../../../utility";
import { Button } from "@material-ui/core";

import ConfirmationPopup from "../../../components/ModalPopups/confirmationPopup";
import ModalContainer from "../../../components/modal_popup";
import { useRef } from "react";
import SuccessTick from "../../../components/success_tick";

// import Autocomplete from "@mui/material";

const AddNewUser = () => {
  const [adminPrivileges, setAdminPrivileges] = useState([]);

  const [selectedAdminPrivileges, setSelectedAdminPrivileges] = useState([]);

  const [enableSubmit, setEnableSubmit] = useState(false);

  const [totalRoles, setTotalRoles] = useState([]);

  const [showSuccess, setShowSuccess] = useState(false);

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const autocompleteRef = useRef();

  const [formData, setFormData] = useState({
    userEmail: { val: "", err: "" },
    password: { val: "", err: "" },
    userName: { val: "", err: "" },
    userMobile: { val: "", err: "" },
    userRole: { val: { name: null, id: null }, err: "" },
    userModule: { val: "", err: "" },
    selectedAdminPrivileges: { val: [], err: "" },
  });

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  useEffect(() => {
    GetTotalPrevilegesList().then((data) => {
      let privilegesList = data.privileges.map((el) => {
        el["create"] = false;
        el["update"] = false;
        el["delete"] = false;
        el["read"] = true;
        return el;
      });
      setAdminPrivileges(privilegesList);
    });
  }, []);

  useEffect(() => {
    GetTotalAdminRoles().then((data) => {
      setTotalRoles(data);
    });
  }, []);

  function handleConfirmationClose() {
    setShowConfirmPopup(false);
  }

  function handleConfirmationOpen(e) {
    setShowConfirmPopup(true);
  }

  const handleFieldChange = (field, value, err) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: { val: value, err: err },
    }));
  };

  const handleErrorChange = (field, error) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: { ...prevData[field], err: error },
    }));
  };

  useEffect(() => {
    // to set selectedPrivileges in form data state
    const selectedPrivileges = [...selectedAdminPrivileges];
    console.log(selectedPrivileges);
    handleFieldChange("selectedAdminPrivileges", selectedPrivileges, "");
  }, [selectedAdminPrivileges]);

  const handleEmailChange = (event) => {
    let data = {
      emailId: event.target.value,
      mobileNo: null,
    };

    let value = event.target.value;
    let error = !emailValidation(value) ? "Please enter valid email" : "";
    handleFieldChange("userEmail", value, error);
    // eslint-disable-next-line eqeqeq
    if (error == "") {
      // to check if email id already exist or not
      GetAdminByMobileNumberOrEmail(data).then((data) => {
        if (data.message !== "new User") {
          handleFieldChange("userEmail", value, "Email ID already exists");
        } else {
          handleFieldChange("userEmail", value, "");
        }
      });
    }
  };

  const handleMobileChange = (event) => {
    let value = event.target.value;
    let data = {
      emailId: null,
      mobileNo: event.target.value,
    };

    let error = "";

    if (value !== "") {
      error = !numbersOnlyTest(value) ? "Please enter valid mobile number" : "";
    } else {
      error = "Please enter valid mobile number";
    }

    // value == "" &&
    // handleErrorChange("userMobile", "Please enter the mobile number");
    numbersOnlyTest(value) && handleFieldChange("userMobile", value, error);

    if (error == "" && value.length == 10) {
      // to check if mobile number already exists or not

      GetAdminByMobileNumberOrEmail(data).then((data) => {
        if (data.message != "new User") {
          handleFieldChange(
            "userMobile",
            value,
            "Mobile Number already exists"
          );
        } else {
          handleFieldChange("userMobile", value, "");
        }
      });
    }
  };

  const handlePasswordChange = (event) => {
    let value = event.target.value;
    let error = value == "" ? "Please enter the password" : "";
    handleFieldChange("password", value, error);
  };

  const handleNameChange = (event) => {
    let value = event.target.value;
    let error = !alphabetTest(value) ? "Please enter valid name" : "";
    error == "" && handleFieldChange("userName", value, error);
  };

  const handleRoleChange = (event, value, reason) => {
    let error = value == null ? "Please select the user role" : "";
    if (reason === "selectOption") {
      error = "";
    } else if (reason === "removeOption") {
      error = "Please select the user role";
    } else if (reason === "clear") {
      error = "Please select the user role";
    }

    let name = value != null ? value.roleName : null;
    let id = value != null ? value.id : null;

    handleFieldChange("userRole", { name: name, id: id }, error);
  };

  const handleModuleChange = (event, value, reason) => {
    let error = value == null ? "Please select the user module" : "";
    if (reason === "selectOption") {
      error = "";
    } else if (reason === "removeOption") {
      error = "Please select the user module";
    } else if (reason === "clear") {
      error = "Please select the user module";
    }
    handleFieldChange("userModule", value, error);
  };

  function handleAddPrivilege(e, value, reason) {
    if (reason === "selectOption") {
      let updatedPrivileges = [...selectedAdminPrivileges];

      // Find missing elements in selectedAdminPrivileges that are not in value
      const missingInArray1 = value.filter(
        (item1) =>
          !updatedPrivileges.some(
            (item2) => item2.privilegeName === item1.privilegeName
          )
      );

      // Merge missingInArray1 with updatedPrivileges
      updatedPrivileges = [...updatedPrivileges, ...missingInArray1];

      setSelectedAdminPrivileges(updatedPrivileges);
    } else if (reason === "removeOption") {
      // Find elements in selectedAdminPrivileges that are not in value
      const missingInArray2 = selectedAdminPrivileges.filter((item1) =>
        value.some((item2) => item2.privilegeName === item1.privilegeName)
      );

      // Set the state to the filtered array (removing elements)
      setSelectedAdminPrivileges(missingInArray2);
    } else if (reason === "clear") {
      setSelectedAdminPrivileges([]);
    }
  }

  const handleCheckboxChange = (event, object) => {
    let fieldName = event.target.name;
    setSelectedAdminPrivileges((prev) => {
      let Privileges = [...prev];

      let updatedPrivileges = Privileges.map((element) => {
        if (element.privilegeName == object.privilegeName) {
          element[fieldName] = event.target.checked;
        }
        return element;
      });
      return updatedPrivileges;
    });
  };

  function returnCheckedStatus(element, type) {
    let checkedStatus = false;
    // eslint-disable-next-line array-callback-return
    selectedAdminPrivileges.map((el) => {
      if (el.privilegeName == element.privilegeName) {
        checkedStatus = el[type];
      }
    });
    return checkedStatus;
  }

  function validateForm() {
    // email validation
    let noError = 0;
    if (!emailValidation(formData.userEmail.val)) {
      noError++;
      handleErrorChange("userEmail", "Please enter the valid email");
    } else if (formData.userEmail.err != "") {
      noError++;
    } else {
      handleErrorChange("userEmail", "");
    }

    if (formData.password.val == "") {
      noError++;
      handleErrorChange("password", "Please enter the password");
    } else {
      handleErrorChange("password", "");
    }

    if (formData.userModule.val == "") {
      noError++;
      handleErrorChange("userModule", "Please enter the user module");
    } else {
      handleErrorChange("userModule", "");
    }

    if (formData.userName.val == "") {
      noError++;
      handleErrorChange("userName", "Please enter the user name");
    } else {
      handleErrorChange("userName", "");
    }

    if (formData.userMobile.val == "") {
      noError++;
      handleErrorChange("userMobile", "Please enter the valid mobile number");
    } else if (formData.userMobile.val.length != 10) {
      noError++;
      handleErrorChange("userMobile", "Please enter the valid mobile number");
    } else if (formData.userMobile.err != "") {
      noError++;
    } else {
      handleErrorChange("userMobile", "");
    }

    if (formData.userRole.val.name == null) {
      noError++;
      handleErrorChange("userRole", "Please enter the admin role");
    } else {
      handleErrorChange("userRole", "");
    }

    if (formData.selectedAdminPrivileges.val.length == 0) {
      handleErrorChange(
        "selectedAdminPrivileges",
        "Please select the admin privileges"
      );
      noError++;
    } else {
      handleErrorChange("selectedAdminPrivileges", "");
    }

    if (formData.selectedAdminPrivileges.val.length != 0) {
      let selectedPrivileges = formData.selectedAdminPrivileges.val;
      selectedPrivileges.map((element) => {
        if (
          element.create == false &&
          element.read == false &&
          element.update == false &&
          element.delete == false
        ) {
          noError++;
          handleErrorChange(
            "selectedAdminPrivileges",
            "Please select any one CRUD access for the privileges"
          );
        }
      });
    }

    if (noError == 0) {
      handleConfirmationOpen();
    }
  }

  function handleSubmit() {
    validateForm();
  }

  function ConfirmFormSubmit() {
    // to post the form
    setEnableSubmit(true);
    PostAdminNewUser(formData)
      .then((data) => {
        const { statuscode } = data;
        console.log(data);
        if (statuscode !== 200) {
          console.log(data, "form error");
          alert(`Somthing went wrong. Please try again. Error: ${statuscode}`);
          setTimeout(() => {
            setEnableSubmit(false);
            setShowConfirmPopup(false);
          }, 3000);
          return;
        }

        handleConfirmationClose();
        console.log(data);
        setEnableSubmit(false);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setShowConfirmPopup(false);
        }, 3000);
        setFormData({
          userEmail: { val: "", err: "" },
          password: { val: "", err: "" },
          userName: { val: "", err: "" },
          userMobile: { val: "", err: "" },
          userRole: { val: { name: null, id: null }, err: "" },
          userModule: { val: "", err: "" },
          selectedAdminPrivileges: { val: [], err: "" },
        });
        setSelectedAdminPrivileges([]);
        autocompleteRef.current.clearValue();
      })
      .catch((err) => {
        console.log(err, "Form Error");
        setEnableSubmit(false);
      });
  }

  return (
    <>
      <div className={`${style.addUserContainer}`}>
        {/* <h4 className="text-center">Add New User</h4> */}
        <div>
          <Box component="form" noValidate autoComplete="off">
            <form>
              <div className="row">
                <div className="col-sm-4">
                  <div>
                    <div className="mt-3">
                      <TextField
                        id="outlined-required"
                        label="Name"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{ width: "100%" }}
                        fullWidth
                        value={formData.userName.val}
                        error={Boolean(formData.userName.err)}
                        helperText={formData.userName.err}
                        onChange={(e) => {
                          handleNameChange(e);
                        }}
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        id="outlined-required"
                        label="Email"
                        name="userEmail"
                        value={formData.userEmail.val}
                        error={Boolean(formData.userEmail.err)}
                        helperText={formData.userEmail.err}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{ width: "100%" }}
                        fullWidth
                        onChange={(e) => {
                          handleEmailChange(e);
                        }}
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        id="outlined-required"
                        label="Password"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={formData.password.val}
                        sx={{ width: "100%" }}
                        fullWidth
                        onChange={(e) => {
                          handlePasswordChange(e);
                        }}
                        error={Boolean(formData.password.err)}
                        helperText={formData.password.err}
                        inputProps={{
                          maxLength: 30,
                        }}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        id="outlined-required"
                        label="Mobile Number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{ width: "100%" }}
                        fullWidth
                        value={formData.userMobile.val}
                        error={Boolean(formData.userMobile.err)}
                        helperText={formData.userMobile.err}
                        onChange={(e) => {
                          handleMobileChange(e);
                        }}
                        inputProps={{
                          maxLength: 10,
                        }}
                      />
                    </div>

                    <div className="mt-3">
                      <Autocomplete
                        disablePortal
                        options={["Employer", "JobSeeker", "EmployerField"]}
                        ref={autocompleteRef}
                        onChange={(e, value, reason) => {
                          handleModuleChange(e, value, reason);
                        }}
                        value={formData.userModule.val}
                        name="userModule"
                        getOptionLabel={(option) => option}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="experienceYear"
                            color="primary"
                            label="Module"
                            variant="outlined"
                            placeholder="e.g., Jobseeker"
                            error={Boolean(formData.userModule.err)}
                            helperText={formData.userModule.err}
                            fullWidth
                          />
                        )}
                        size="medium"
                        fullWidth
                      />
                    </div>

                    <div className="mt-3">
                      <Autocomplete
                        disablePortal
                        options={totalRoles}
                        ref={autocompleteRef}
                        onChange={(e, value, reason) => {
                          handleRoleChange(e, value, reason);
                        }}
                        value={
                          totalRoles.find(
                            (role) =>
                              role.roleName === formData.userRole.val.name
                          ) || null
                        }
                        name="userRole"
                        getOptionLabel={(option) => {
                          return " " + option.roleName;
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="experienceYear"
                            color="primary"
                            label="Role"
                            variant="outlined"
                            placeholder="e.g., Super Admin"
                            error={Boolean(formData.userRole.err)}
                            helperText={formData.userRole.err}
                            fullWidth
                          />
                        )}
                        size="medium"
                        fullWidth
                      />
                    </div>

                    <div className="mt-3">
                      <Autocomplete
                        multiple
                        id="checkboxes-tags-demo"
                        limitTags={2}
                        options={adminPrivileges}
                        disableCloseOnSelect
                        ref={autocompleteRef}
                        onChange={(e, value, reason) => {
                          handleAddPrivilege(e, value, reason);
                        }}
                        value={formData.selectedAdminPrivileges.val}
                        sx={{ width: "100%" }}
                        fullWidth
                        getOptionLabel={(option) => {
                          return " " + option.privilegeName;
                        }}
                        renderOption={(props, option, { selected }) => (
                          <li key={adminPrivileges.indexOf(option)} {...props}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option.privilegeName}
                          </li>
                        )}
                        //   style={{ width: 200 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            label="+ Add Privileges"
                            placeholder="Favorites"
                            error={Boolean(
                              formData.selectedAdminPrivileges.err
                            )}
                            helperText={formData.selectedAdminPrivileges.err}
                          />
                        )}
                      />
                    </div>
                    <div className="d-grid justify-content-center mt-3">
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleSubmit();
                        }}
                        color="primary"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="col-sm-8 mt-3">
                  <div>
                    <div>
                      <Card variant="outlined">
                        <div className="row py-3">
                          <div className="col-5">
                            <h5 className="pt-2 ps-3">
                              <strong>Privileges</strong>
                            </h5>
                          </div>
                          <div className="col-7">
                            {" "}
                            <div className="row">
                              <div className="col-3">
                                <FormControlLabel
                                  control={<></>}
                                  label={
                                    <strong>
                                      {" "}
                                      <ChromeReaderModeSharpIcon /> Read
                                    </strong>
                                  }
                                />
                              </div>
                              <div className="col-3">
                                <FormControlLabel
                                  control={<></>}
                                  label={
                                    <strong>
                                      {" "}
                                      <CreateNewFolderSharpIcon /> Create
                                    </strong>
                                  }
                                />
                              </div>

                              <div className="col-3">
                                <FormControlLabel
                                  control={<></>}
                                  label={
                                    <strong>
                                      {" "}
                                      <EditSharpIcon /> Update
                                    </strong>
                                  }
                                />
                              </div>
                              <div className="col-3">
                                {" "}
                                <FormControlLabel
                                  control={<></>}
                                  label={
                                    <strong>
                                      {" "}
                                      <DeleteForeverSharpIcon /> Delete
                                    </strong>
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>

                    <div>
                      {selectedAdminPrivileges.length == 0 && (
                        <Card>
                          <div className="text-center py-3">
                            <h6 className="">
                              <strong>No Privileges Added</strong>
                            </h6>
                          </div>
                        </Card>
                      )}
                    </div>

                    <div className={`${style.privileges_wrp}`}>
                      {selectedAdminPrivileges.map((el) => (
                        <>
                          <Card variant="outlined">
                            <div className="p-2 ">
                              <div className="row">
                                <div className="col-5">
                                  {/* <strong>{el.privilegeName}</strong> */}

                                  <div className="mt-2 ms-4 ">
                                    <FormControlLabel
                                      control={<></>}
                                      label={
                                        <strong>{el.privilegeName}</strong>
                                      }
                                    />
                                    {!el.read &&
                                      !el.create &&
                                      !el.update &&
                                      !el.delete && (
                                        <p className="text-danger">
                                          Please select any one access
                                        </p>
                                      )}{" "}
                                  </div>
                                </div>
                                <div className="col-7">
                                  <div className="row">
                                    <div className="col-3">
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            name="read"
                                            onChange={(e) => {
                                              handleCheckboxChange(e, el);
                                            }}
                                            checked={returnCheckedStatus(
                                              el,
                                              "read"
                                            )}
                                          />
                                        }
                                        label=""
                                      />
                                    </div>
                                    <div className="col-3">
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            name="create"
                                            onChange={(e) => {
                                              handleCheckboxChange(e, el);
                                            }}
                                            checked={returnCheckedStatus(
                                              el,
                                              "create"
                                            )}
                                          />
                                        }
                                        label=""
                                      />
                                    </div>

                                    <div className="col-3">
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            name="update"
                                            onChange={(e) => {
                                              handleCheckboxChange(e, el);
                                            }}
                                            checked={returnCheckedStatus(
                                              el,
                                              "update"
                                            )}
                                          />
                                        }
                                        label=""
                                      />
                                    </div>
                                    <div className="col-3">
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            name="delete"
                                            onChange={(e) => {
                                              handleCheckboxChange(e, el);
                                            }}
                                            checked={returnCheckedStatus(
                                              el,
                                              "delete"
                                            )}
                                          />
                                        }
                                        label=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div></div>
            </form>
          </Box>
        </div>

        <div>
          {showSuccess && (
            <MyModal>
              <ModalContainer
                childComponent={
                  <SuccessTick HeadText="New user added successfully" />
                }
              />
            </MyModal>
          )}
          {showConfirmPopup && (
            <MyModal>
              <ModalContainer
                childComponent={
                  <ConfirmationPopup
                    heading={"Confirmation"}
                    headingText={"Are you sure you want to add new user?"}
                    onConfirm={ConfirmFormSubmit}
                    enableSubmit={enableSubmit}
                    onRequestClose={handleConfirmationClose}
                  />
                }
              />
            </MyModal>
          )}
        </div>
      </div>
    </>
  );
};

export default AddNewUser;
