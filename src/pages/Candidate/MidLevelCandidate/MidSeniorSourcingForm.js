/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { MyModal } from "../../../utility";
import {
  GetCities,
  PutMidSeniorSourcing,
  PutMidSeniorSourcingResume,
  getJobFilterOptions,
} from "../../../apiServices";
import ModalContainer from "../../../components/modal_popup";
import SuccessTick from "../../../components/success_tick";
import uploadimage from "../../../assets/images/uploadfile.png";
import Resumeimage from "../../../assets/images/ResumeLogo.png";
import { AiOutlineClose } from "react-icons/ai";
const JobApplicationForm = ({ onclose, prefillData, reload }) => {
  const [formData, setFormData] = useState({
    mobileNumber: { val: "", err: "" },
    emailId: { val: "", err: "" },
    firstName: { val: "", err: "" },
    lastName: { val: "", err: "" },
    appliedJobrole: { val: "", err: "" },
    jobrole: { val: "", err: "" },
    experienceInYears: { val: "", err: "" },
    experienceInMonths: { val: "", err: "" },
    skills: { val: "", err: "" },
    currentLocation: { val: "", err: "" },
    preferredJobLocation: { val: "", err: "" },
    adminPreferredCompany: { val: "", err: "" },
  });
  // eslint-disable-next-line no-unused-vars
  const [options, setOptions] = useState({
    preferredJobLocation: [],
    currentLocation: [],
  });
  const [success, setSuccess] = useState(false);

  const [disabled, setDisabled] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[0-9]{10}$/;
  const textInputRegex = /^[a-zA-Z  ]+$/;
  // const companynameInputRegex = /^[a-zA-Z0-9.,/& ]+$/;
  const alphabeticRegex = /^[a-zA-Z0-9.,+!@#$%^&*()_\-=[\]{};':"\\|,.<>/? ]+$/;
  const handleChange = (field, regex) => (event) => {
    const newValue = event.target.value;
    const isValid = regex.test(newValue);

    setFormData((prev) => ({
      ...prev,
      [field]: { val: newValue, err: !isValid },
    }));
  };
  const handleYearsChange = (event) => {
    const newValue = event.target.value;

    setFormData((prev) => ({
      ...prev,
      experienceInYears: { val: newValue, err: false },
    }));
  };

  const handleMonthsChange = (event) => {
    const newValue = event.target.value;

    setFormData((prev) => ({
      ...prev,
      experienceInMonths: { val: newValue, err: false },
    }));
  };

  const [resume, setresume] = useState(null);
  const [filesize, setFilesize] = useState(false);
  const [resumeError, setResumeError] = useState(false);
  const [resumerequired, setResumerequired] = useState(false);
  const MAX_FILE_SIZE_MB = 2;
  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files.length > 0) {
      const file = files[0];

      const fileSizeInMB = file.size / (1024 * 1024);

      if (fileSizeInMB > MAX_FILE_SIZE_MB) {
        setResumeError(true);
        setResumerequired(false);
        return false;
      } else {
        setresume(file);
        setResumeError(false);
        setResumerequired(false);
      }
    } else {
      setResumeError(false);
      setResumerequired(true);
    }
  };
  const fileInputRef = useRef(null);
  const handleClearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setresume(null);
      setResumeError(false);
      setResumerequired(false);
    }
  };
  useEffect(() => {
    GetCities(31).then((data) => {
      console.log(data, "cities for tamilnadu");

      // const filteredCities = data.results.filter((city) => city.stateId === 31);
      // console.log(filteredCities, "filtered cities ");
      setOptions((prev) => ({
        ...prev,
        preferredJobLocation: data.results.filter(
          (city) => city.stateId === 31
        ),
        currentLocation: data.results.filter((city) => city.stateId === 31),
      }));
    });
    getJobFilterOptions().then((Data) => {
      const formgj = Data.filter((el) => el.category === "job category");
      console.log(formgj, "ddfdfdfdfdfd");
    });
  }, []);

  useEffect(() => {
    if (prefillData && prefillData.mobileNumber) {
      setFormData((prev) => ({
        ...prev,
        mobileNumber: { val: prefillData.mobileNumber, err: false },
        emailId: { val: prefillData.emailId || "", err: false },
        firstName: { val: prefillData.firstName || "", err: false },
        lastName: { val: prefillData.lastName || "", err: false },
        appliedJobrole: { val: prefillData.appliedJobrole || "", err: false },
        jobrole: { val: prefillData.jobrole || "", err: false },
        experienceInYears: {
          val: prefillData.experienceInYears || "",
          err: false,
        },
        experienceInMonths: {
          val: prefillData.experienceInMonths || "",
          err: false,
        },
        skills: { val: prefillData.skills || "", err: false },
        currentLocation: {
          val: prefillData.currentLocation || "",
          err: false,
        },
        preferredJobLocation: {
          val: prefillData.preferredJobLocation || "",
          err: false,
        },
        adminPreferredCompany: {
          val: prefillData.adminPreferredCompany || "",
          err: false,
        },
      }));
      const fileName = prefillData.resumeLink
        ? prefillData.resumeLink.split("_").pop()
        : "";
      const formattedFileName = fileName
        ? fileName.replace(/_/g, " ").trim()
        : "";
      const prefillResume = formattedFileName
        ? new File([], formattedFileName)
        : null;

      setresume(prefillResume);
      // setresume(prefillData.resumeLink);
    }
  }, [prefillData]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidMobile =
      formData.mobileNumber.val.length !== 0 &&
      mobileRegex.test(formData.mobileNumber.val);
    const isValidlastName = textInputRegex.test(formData.lastName.val);
    const isValidEmail = emailRegex.test(formData.emailId.val);
    const isValidfirstName = textInputRegex.test(formData.firstName.val);

    setFormData((prev) => ({
      ...prev,
      mobileNumber: { val: prev.mobileNumber.val, err: !isValidMobile },
      emailId: { val: prev.emailId.val, err: !isValidEmail },
      firstName: {
        val: prev.firstName.val,
        err: !isValidfirstName,
      },
      lastName: {
        val: prev.lastName.val,
        err: !isValidlastName,
      },
    }));
    if (!resume) {
      console.log("fhji");
      setResumerequired(true);
      return;
    }
    setResumerequired(false);
    if (
      !isValidMobile ||
      !isValidfirstName ||
      !isValidlastName ||
      !isValidEmail
    ) {
      console.log("Mobile number");
      return;
    }
    setDisabled(true);
    setSuccess(true);
    PutMidSeniorSourcing(formData)
      .then((data) => {
        console.log(data, "data");

        PutMidSeniorSourcingResume(resume, formData.mobileNumber.val)
          .then((data) => {
            console.log(data, "data");
            setTimeout(() => {
              setSuccess(false);
            }, 3000);
          })
          .catch((error) => {
            console.error("Error in PutMidSeniorSourcingResume:", error);
          });
      })
      .catch((error) => {
        console.error("Error in PutMidSeniorSourcing:", error);
      });

    setDisabled(false);
    setresume("");
    setFormData({
      mobileNumber: { val: "", err: false },
      emailId: { val: "", err: false },
      firstName: { val: "", err: false },
      lastName: { val: "", err: false },
      appliedJobrole: { val: "", err: false },
      jobrole: { val: "", err: false },
      experienceInYears: { val: "", err: false },
      experienceInMonths: { val: "", err: false },
      skills: { val: "", err: false },
      currentLocation: { val: [], err: false },
      preferredJobLocation: { val: [], err: false },
      adminPreferredCompany: { val: "", err: false },
    });
    setTimeout(() => {
      reload();
    }, 3500);

    console.log("Form submitted successfully", formData);
  };
  useEffect(() => {
    if (prefillData && prefillData.mobileNumber) {
      setFormData((prev) => ({
        ...prev,
        mobileNumber: { val: prefillData.mobileNumber, err: false },
        emailId: { val: prefillData.emailId || "", err: false },
        firstName: { val: prefillData.firstName || "", err: false },
        lastName: { val: prefillData.lastName || "", err: false },
        appliedJobrole: { val: prefillData.appliedJobrole || "", err: false },
        jobrole: { val: prefillData.jobrole || "", err: false },
        experienceInYears: {
          val: prefillData.experienceInYears || "",
          err: false,
        },
        experienceInMonths: {
          val: prefillData.experienceInMonths || "",
          err: false,
        },
        skills: { val: prefillData.skills || "", err: false },
        currentLocation: {
          val: prefillData.currentLocation || "",
          err: false,
        },
        preferredJobLocation: {
          val: prefillData.preferredJobLocation || "",
          err: false,
        },
        adminPreferredCompany: {
          val: prefillData.adminPreferredCompany || "",
          err: false,
        },
      }));
    }
  }, [prefillData]);

  return (
    <div className="">
      {" "}
      {/* <Card style={{ width: "800px" }} className="mt-3">
        <CardContent> */}
      <div className="d-flex align-items-center justify-content-between ">
        {" "}
        <div className="text-center" style={{ fontSize: "18px" }}>
          <b>Mid/Senior Level Sourcing</b>
        </div>
        <div className="btn btn-outline-danger" onClick={() => onclose()}>
          <AiOutlineClose />
        </div>
      </div>
      <div
        style={{
          width: "900px",
          height: "70vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <form onSubmit={handleSubmit} className="p-2">
          <div className="col-sm-4 ">
            <label htmlFor="">
              <b>Resume upload</b>
            </label>
            <div className="mt-2 mb-2">
              {" "}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="resume-upload-input"
                ref={fileInputRef}
              />
              <label htmlFor="resume-upload-input">
                <Button
                  variant={resume ? "outlined" : "outlined"}
                  component="span"
                  color={resume ? "success" : "primary"}
                  onClick={handleClearFile}
                >
                  {resume ? (
                    <img src={Resumeimage} alt="" width={50} />
                  ) : (
                    <img src={uploadimage} alt="" width={50} />
                  )}
                </Button>
              </label>
              {resumeError && (
                <p style={{ color: "#d44349" }}>
                  Please select a valid file within {MAX_FILE_SIZE_MB} MB.
                </p>
              )}
              {resumerequired && (
                <p style={{ color: "#d44349" }}>Resume is required.</p>
              )}
              <p>
                {resume ? `Selected File: ${resume.name}` : " "}
                {/* {resume
                  ? `Selected File: ${resumeError ? "" : resume.name}`
                  : " "} */}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              {" "}
              <TextField
                fullWidth
                label="Name"
                id="fullWidth"
                value={formData.firstName && formData.firstName.val}
                error={formData.firstName && formData.firstName.err}
                onChange={handleChange("firstName", textInputRegex)}
                helperText={
                  formData.firstName && formData.firstName.err
                    ? "Name is required"
                    : ""
                }
              />
            </div>
            <div className="col-sm-6 ">
              <TextField
                fullWidth
                label="Father Name"
                id="fullWidth"
                value={formData.lastName && formData.lastName.val}
                error={formData.lastName && formData.lastName.err}
                onChange={handleChange("lastName", textInputRegex)}
                helperText={
                  formData.lastName && formData.lastName.err
                    ? "Father Name is required"
                    : ""
                }
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-sm-6">
              {/* <TextField
                id="standard-basic"
                label="Mobile number"
                variant="standard"
                fullWidth
                value={formData.mobileNumber.val}
                // inputProps={{ maxLenth: 10 }}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    mobileNumber: { val: event.target.value },
                  }))
                }
                inputProps={{ maxLength: 10 }}
                error={formData.mobileNumber && formData.mobileNumber.err}
                helperText={
                  formData.mobileNumber && formData.mobileNumber.err
                    ? "Invalid mobile number"
                    : ""
                }
              /> */}
              <TextField
                fullWidth
                label="Mobile Number"
                id="fullWidth"
                value={formData.mobileNumber && formData.mobileNumber.val}
                onChange={handleChange("mobileNumber", mobileRegex)}
                inputProps={{ maxLength: 10 }}
                error={formData.mobileNumber && formData.mobileNumber.err}
                helperText={
                  formData.mobileNumber && formData.mobileNumber.err
                    ? "Invalid mobile number"
                    : ""
                }
              />
            </div>
            <div className="col-sm-6 ">
              <TextField
                fullWidth
                label="Email ID"
                id="fullWidth"
                value={formData.emailId && formData.emailId.val}
                onChange={handleChange("emailId", emailRegex)}
                error={formData.emailId && formData.emailId.err}
                helperText={
                  formData.emailId && formData.emailId.err
                    ? "Invalid email"
                    : ""
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6  mt-3">
              {" "}
              <TextField
                fullWidth
                label="Current Position"
                id="fullWidth"
                value={formData.jobrole && formData.jobrole.val}
                error={formData.jobrole && formData.jobrole.err}
                onChange={handleChange("jobrole", alphabeticRegex)}
                helperText={
                  formData.jobrole && formData.jobrole.err ? "Not required" : ""
                }
              />
            </div>
            <div className="col-sm-6  mt-3">
              <TextField
                fullWidth
                label="Sourced For Position"
                id="fullWidth"
                value={formData.appliedJobrole && formData.appliedJobrole.val}
                error={formData.appliedJobrole && formData.appliedJobrole.err}
                onChange={handleChange("appliedJobrole", alphabeticRegex)}
                helperText={
                  formData.appliedJobrole && formData.appliedJobrole.err
                    ? "Not required"
                    : ""
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6  mt-3">
              {" "}
              <TextField
                fullWidth
                label="Sourced For Company"
                id="fullWidth"
                value={
                  formData.adminPreferredCompany &&
                  formData.adminPreferredCompany.val
                }
                error={
                  formData.adminPreferredCompany &&
                  formData.adminPreferredCompany.err
                }
                onChange={handleChange(
                  "adminPreferredCompany",
                  alphabeticRegex
                )}
                helperText={
                  formData.adminPreferredCompany &&
                  formData.adminPreferredCompany.err
                    ? "Not required"
                    : ""
                }
              />
            </div>
            <div className="col-sm-6  mt-3 ">
              <TextField
                fullWidth
                label="Current Location"
                id="fullWidth"
                value={formData.currentLocation && formData.currentLocation.val}
                error={formData.currentLocation && formData.currentLocation.err}
                onChange={handleChange("currentLocation", alphabeticRegex)}
                helperText={
                  formData.currentLocation && formData.currentLocation.err
                    ? "Not required"
                    : ""
                }
              />
              {/* <Autocomplete
                id="tags-outlined"
                options={options.currentLocation.map((option) => option)}
                getOptionLabel={(option) => `${option.city}`}
                onChange={(event, value, reason) => {
                  if (reason === "clear") {
                    console.log("Selection cleared");
                    updateCurrentLocation("");
                  } else {
                    updateCurrentLocation(value);
                    console.log(value, "value jobs");
                  }
                }}
                value={{
                  city: formData.currentLocation.val
                    ? formData.currentLocation.val
                    : "",
                  stateId: 31,
                }}
                // value={formData.currentLocation && formData.currentLocation.val}
                fullWidth
                filterSelectedOptions
                disablePortal
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Current Location"
                    placeholder="Current Location"
                    // style={{ zIndex: 10500 }}
                    value={
                      formData.currentLocation && formData.currentLocation.val
                    }
                  />
                )}
              /> */}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6  mt-3">
              {/* <Autocomplete
                id="tags-outlined"
                options={options.preferredJobLocation.map((option) => option)}
                getOptionLabel={(option) => `${option.city}`}
                onChange={(event, value, reason) => {
                  if (reason === "clear") {
                    console.log("Selection cleared");
                    updatePrefferedLocation("");
                  } else {
                    updatePrefferedLocation(value);
                    console.log(value, "value jobs");
                  }
                }}
                value={{
                  city: formData.preferredJobLocation.val
                    ? formData.preferredJobLocation.val
                    : "",
                  stateId: 31,
                }}
                fullWidth
                filterSelectedOptions
                disablePortal
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Preferred Location"
                    placeholder="Preferred Location"
                    // style={{ zIndex: 10500 }}
                  />
                )}
              /> */}
              <TextField
                fullWidth
                label="Preferred Location"
                id="fullWidth"
                value={
                  formData.preferredJobLocation &&
                  formData.preferredJobLocation.val
                }
                error={
                  formData.preferredJobLocation &&
                  formData.preferredJobLocation.err
                }
                onChange={handleChange("preferredJobLocation", alphabeticRegex)}
                helperText={
                  formData.preferredJobLocation &&
                  formData.preferredJobLocation.err
                    ? "Not required"
                    : ""
                }
              />
            </div>
            <div className="col-sm-6   mt-3 ">
              <div className="row">
                <div className="col sm-6">
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-multiple-name-label">
                      Experience Years
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      value={formData.experienceInYears.val}
                      onChange={handleYearsChange}
                      input={<OutlinedInput label="Experience Years" />}
                      fullWidth
                      MenuProps={{
                        style: { zIndex: 10008 },
                      }}
                    >
                      <MenuItem value={0}>0 Year</MenuItem>
                      <MenuItem value={1}>1 Year</MenuItem>
                      <MenuItem value={2}>2 Years</MenuItem>
                      <MenuItem value={3}>3 Years</MenuItem>
                      <MenuItem value={4}>4 Years</MenuItem>
                      <MenuItem value={5}>5 Years</MenuItem>
                      <MenuItem value={6}>6 Years</MenuItem>
                      <MenuItem value={7}>7 Years</MenuItem>
                      <MenuItem value={8}>8 Years</MenuItem>
                      <MenuItem value={9}>9 Years</MenuItem>
                      <MenuItem value={10}>10 Years</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-sm-6 ">
                  {" "}
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-multiple-name-label">
                      Experience Months
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      value={formData.experienceInMonths.val}
                      onChange={handleMonthsChange}
                      input={<OutlinedInput label="Experience Months" />}
                      fullWidth
                      MenuProps={{
                        style: { zIndex: 10008 },
                      }}
                    >
                      <MenuItem value={0}>0 Month</MenuItem>
                      <MenuItem value={1}>1 Month</MenuItem>
                      <MenuItem value={2}>2 Months</MenuItem>
                      <MenuItem value={3}>3 Months</MenuItem>
                      <MenuItem value={4}>4 Months</MenuItem>
                      <MenuItem value={5}>5 Months</MenuItem>
                      <MenuItem value={6}>6 Months</MenuItem>
                      <MenuItem value={7}>7 Months</MenuItem>
                      <MenuItem value={8}>8 Months</MenuItem>
                      <MenuItem value={9}>9 Months</MenuItem>
                      <MenuItem value={10}>10 Months</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12  mt-3 ">
              <TextField
                fullWidth
                label="Skills"
                id="fullWidth"
                value={formData.skills && formData.skills.val}
                error={formData.skills && formData.skills.err}
                onChange={handleChange("skills", alphabeticRegex)}
                helperText={
                  formData.skills && formData.skills.err ? "Not required" : ""
                }
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn mt-3 px-4 text-white"
              style={{ backgroundColor: "#169c50" }}
              disabled={disabled}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {/* </CardContent>
      </Card> */}
      {success && (
        <MyModal>
          <ModalContainer
            zIndex={6000}
            childComponent={<SuccessTick HeadText="Successfully" />}
          />
        </MyModal>
      )}
      {filesize && (
        <MyModal>
          <ModalContainer
            zIndex={6000}
            childComponent={
              <>
                <div>
                  <p>
                    File size exceeds {MAX_FILE_SIZE_MB} MB. Please select a
                    smaller file.
                  </p>
                  <div className="d-flex justify-content-end ">
                    <div
                      className="btn btn-success"
                      onClick={() => {
                        setFilesize(false);
                      }}
                    >
                      Ok
                    </div>
                  </div>
                </div>
              </>
            }
          />
        </MyModal>
      )}
    </div>
  );
};

export default JobApplicationForm;
