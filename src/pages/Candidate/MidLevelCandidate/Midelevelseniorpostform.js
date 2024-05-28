/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CompanyLogo from "../../../../src/assets/images/uploadfile.png";
import imageUpload from "../../../../src/assets/images/resume.png";
import Select from "@mui/material/Select";
import {
  PutMIDSENIPORLEVEL,
  UploadMidSeniorResume,
} from "../../../apiServices";
import { MyModal } from "../../../utility";
import SuccessTick from "../../../components/success_tick";
import ModalContainer from "../../../components/modal_popup";
function Midelevelseniorpostform({ onclose, reloadpage, prefillData }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    EmailId: "",
    Initial: "",
    Name: "",
    MobileNumber: "",
    WhatsupNumber: "",
    EduacationalQualification: "",
    PrefredLocation: "",
    CurrentLocation: "",
    months: "",
    years: "",
    file: "",
    Manufacturing: "null", // Default Manufacturing
    currentjobposition: "",
    DropdownField1: "null",
    DropdownField2: "null",
    DropdownField3: "",
    currentlyworking: "",
    currentsalary: "",
    expecetdsealary: "",
    LinkedinUrl: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const handleFileChange = async () => {
    const file = fileInputRef.current.files[0];
    setSelectedFileName(file.name);
    if (file) {
      try {
        const imageUrl = await readFileAsync(file);
        console.log("Image URL:", imageUrl);
        setImageUrl(imageUrl);
        setFormData((prevFormData) => ({
          ...prevFormData,
          file: file,
        }));
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  };

  const [errors, setErrors] = useState({
    Initial: "",
    Name: "",
    MobileNumber: "",
  });
  // const fileInputRef = React.createRef();
  const [imageUrl, setImageUrl] = useState(null);
  const [midSeniorRegister, setmidSeniorRegister] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleDropdown1Change = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      DropdownField1: Array.isArray(value) ? value : value,
    }));
  };

  const handleDropdown3Change = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      DropdownField3: Array.isArray(value) ? value : value,
    }));
  };

  const handleCloseClick = () => {
    window.location.href = "/MidLevelSenior#leads";
  };
  const handleDropdown2Change = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      DropdownField2: Array.isArray(value) ? value : value,
    }));
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const fileValue = name === "file" ? e.target.files[0] : value;

    switch (name) {
      case "file":
        if (fileValue) {
          try {
            const imageUrl = await readFileAsync(fileValue);
            console.log("Image URL:", imageUrl);
            setImageUrl(imageUrl);
          } catch (error) {
            console.error("Error reading file:", error);
          }
        }
        return;

      // case "MobileNumber":
      //   setErrors((prevErrors) => ({
      //     ...prevErrors,
      //     [name]:
      //       value.length < 10
      //         ? "Mobile number must be at least 10 digits."
      //         : null,
      //   }));
      //   break;

      case "WhatsupNumber":
        if (value.trim() !== "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]:
              value.length <= 10
                ? /^[0-9]{10}$/.test(value)
                  ? null
                  : `${name} should be a numeric value with a maximum length of 10.`
                : "WhatsupNumber should be a numeric value with a maximum length of 10.",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: null,
          }));
        }
        break;

      case "currentsalary":
        if (value.trim() !== "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]:
              value.length >= 3 &&
              value.length <= 15 &&
              /^[a-zA-Z0-9 ]+$/.test(value)
                ? null
                : `${name} should besss an alphanumeric value .`,
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: null,
          }));
        }
        break;

      case "expecetdsealary":
        if (value.trim() !== "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]:
              value.length >= 3 &&
              value.length <= 15 &&
              /^[a-zA-Z0-9 ]+$/.test(value)
                ? null
                : `${name} should be an alphanumeric value .`,
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: null,
          }));
        }
        break;

      case "Name":
        if (value.trim() !== "") {
          // Regular expression to allow only alphabetic characters
          const validNameRegex = /^[A-Za-z ]+$/;

          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validNameRegex.test(value)
              ? ""
              : "Name should contain only alphabetic characters.",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Name is required.",
          }));
        }
        break;

      case "MobileNumber":
        const mobileNumberRegex = /^[0-9]{10}$/;
        const isNumeric = /^[0-9]+$/.test(value);
        const isValidMobileNumber = mobileNumberRegex.test(value) && isNumeric;
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]:
            isValidMobileNumber && value.length === 10
              ? ""
              : "Invalid Mobile Number.",
        }));
        break;

      default:
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: null,
        }));
        break;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };

  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      Manufacturing: e.target.value,
    });
  };

  const handleRadioChange1 = (e) => {
    setFormData({
      ...formData,
      currentlyworking: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FormData before API call:", formData);
    setErrors({
      Name: "",
      MobileNumber: "",
      WhatsupNumber: "",
    });

    let formIsValid = true;

    if (!formData.Name.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        Name: "Name is required.",
      }));
      formIsValid = false;
    } else {
      // Regular expression to allow only alphabetic characters and spaces
      const validNameRegex = /^[A-Za-z ]+$/;

      if (!validNameRegex.test(formData.Name)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          Name: "Name should contain only alphabetic characters.",
        }));
        formIsValid = false;
      }
    }

    if (
      !formData.MobileNumber.toString().trim() ||
      formData.MobileNumber.toString().length < 10
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        MobileNumber: "Mobile number must be at least 10 digits.",
      }));
      formIsValid = false;
    }

    if (
      formData.WhatsupNumber &&
      (formData.WhatsupNumber.toString().trim() === "" ||
        formData.WhatsupNumber.toString().length < 10)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        WhatsupNumber:
          "Whatsapp number must be at least 10 digits if provided.",
      }));
      formIsValid = false;
    }

    if (
      formData.currentsalary &&
      (formData.currentsalary.toString().trim() === "" ||
        formData.currentsalary.toString().length < 3 ||
        formData.currentsalary.toString().length > 15)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        currentsalary: "invalid",
      }));
      formIsValid = false;
    }

    if (
      formData.expecetdsealary &&
      (formData.expecetdsealary.toString().trim() === "" ||
        formData.expecetdsealary.toString().length < 3 ||
        formData.expecetdsealary.toString().length > 15)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expecetdsealary: "Invalid",
      }));
      formIsValid = false;
    }

    if (
      formData.EmailId &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.EmailId)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        EmailId: "Invalid email format",
      }));
      formIsValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        EmailId: "", // Clear the error if the validation passes
      }));
    }

    // Check if the form is valid before making the API call
    if (!formIsValid) {
      return;
    }
    setShowSuccess(true);
    PutMIDSENIPORLEVEL(formData).then((data) => {
      if (data.code === 400) {
        alert("Already registered employer");
        return;
      }
      if (formData.file) {
        UploadMidSeniorResume(
          formData.file,
          formData.MobileNumber,
          formData.LinkedinUrl
        ).the((data) => {});
      }

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    });
    // try {
    //   handleOpen();

    //   const response = await PutMIDSENIPORLEVEL(formData);
    //   console.log("API Response:", response);

    //   // If profile details submission is successful, then proceed with resume upload
    //   let resumeResponse;

    //   if (formData.file) {
    //     resumeResponse = await UploadMidSeniorResume(
    //       formData.file,
    //       formData.MobileNumber,
    //       formData.LinkedinUrl
    //     );
    //     console.log("Resume Upload Response:", resumeResponse);
    //   }
    //   handleClose();

    // } catch (error) {
    //   console.error("Error calling API:", error);
    //   return;
    // }
    setFormData({
      EmailId: "",
      Initial: "",
      Name: "",
      MobileNumber: "",
      WhatsupNumber: "",
      EduacationalQualification: "",
      PrefredLocation: "",
      CurrentLocation: "",
      months: "",
      years: "",
      file: "",
      Manufacturing: "null", // Default Manufacturing
      currentjobposition: "",
      DropdownField1: "null",
      DropdownField2: "null",
      DropdownField3: "",
      currentlyworking: "",
      currentsalary: "",
      expecetdsealary: "",
      LinkedinUrl: "",
    });
    setTimeout(() => {
      setShowSuccess(false);
      reloadpage();
    }, 3500);
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("FormData before API call:", formData);
  //   setErrors({
  //     Name: "",
  //     MobileNumber: "",
  //     WhatsupNumber: null,
  //   });

  //   let formIsValid = true;

  //   if (!formData.Name.trim()) {
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       Name: "Name is required.",
  //     }));
  //     formIsValid = false;
  //   } else {
  //     const validNameRegex = /^[A-Za-z ]+$/;
  //     if (!validNameRegex.test(formData.Name)) {
  //       setErrors((prevErrors) => ({
  //         ...prevErrors,
  //         Name: "Name should contain only alphabetic characters.",
  //       }));
  //       formIsValid = false;
  //     }
  //   }

  //   if (!formData.MobileNumber.trim() || formData.MobileNumber.length < 10) {
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       MobileNumber: "Mobile number must be at least 10 digits.",
  //     }));
  //     formIsValid = false;
  //   }

  //   if (
  //     formData.WhatsupNumber &&
  //     (formData.WhatsupNumber.trim() === "" ||
  //       formData.WhatsupNumber.length < 10)
  //   ) {
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       WhatsupNumber:
  //         "Whatsapp number must be at least 10 digits if provided.",
  //     }));
  //     formIsValid = false;
  //   }

  //   // Handle formData.currentsalary and formData.expecetdsealary
  //   const handleSalaryValidation = (salary) => {
  //     return (
  //       salary &&
  //       (salary.toString().trim() === "" ||
  //         salary.toString().length < 3 ||
  //         salary.toString().length > 7)
  //     );
  //   };

  //   if (handleSalaryValidation(formData.currentsalary)) {
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       currentsalary: "Invalid",
  //     }));
  //     formIsValid = false;
  //   }

  //   if (handleSalaryValidation(formData.expecetdsealary)) {
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       expecetdsealary: "Invalid",
  //     }));
  //     formIsValid = false;
  //   }

  //   // Continue with the rest of the validation...

  //   // Check if the form is valid before making the API call
  //   if (!formIsValid) {
  //     return;
  //   }

  //   try {
  //     handleOpen();
  //     setShowSuccess(true);
  //     const response = await PutMIDSENIPORLEVEL(formData);
  //     console.log("API Response:", response);

  //     let resumeResponse;

  //     if (formData.file) {
  //       resumeResponse = await UploadMidSeniorResume(
  //         formData.file,
  //         formData.MobileNumber,
  //         formData.LinkedinUrl
  //       );
  //       console.log("Resume Upload Response:", resumeResponse);
  //     }
  //     handleClose();

  //     if (response.code === 400) {
  //       alert("Already registered employer");
  //       return;
  //     }

  //     setTimeout(() => {
  //       setShowSuccess(false);
  //     }, 3000);

  //     setFormData({
  //       EmailId: "",
  //       Initial: "",
  //       // Update other fields as needed...
  //     });

  //     setTimeout(() => {
  //       setShowSuccess(false);
  //       reloadpage();
  //     }, 3500);
  //   } catch (error) {
  //     console.error("Error calling API:", error);
  //     return;
  //   }
  // };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (prefillData && prefillData.mobileNumber) {
      const years = parseInt(prefillData.expInYears);
      const months = parseInt(prefillData.expInMonths);
      const prefillResume = prefillData?.resumeLink
        ? new File([], prefillData.resumeLink.split("_").pop())
        : null;
      setFormData((prev) => ({
        ...prev,
        MobileNumber: prefillData.mobileNumber,
        // whatsappNumber: prefillData.whatsappNumber,
        Name: prefillData.firstName,
        Initial: prefillData.lastName,
        EmailId: prefillData.emailId,
        WhatsupNumber: prefillData.whatsappNumber,
        EduacationalQualification: prefillData.educationalQualification,
        PrefredLocation: prefillData.prefJobLocation,
        Manufacturing: prefillData.expInManufacturing ? "true" : "false",
        years: years,
        months: months,
        DropdownField3: prefillData.noticePeriod,
        currentjobposition: prefillData.jobCategory,

        currentlyworking: prefillData.currentlyWorking ? "true" : "false",
        currentsalary: prefillData.currentSalary,
        expecetdsealary: prefillData.expectedSalary,
        LinkedinUrl: prefillData.linkedinUrl,
        CurrentLocation: prefillData.currentLocation,
        // file: prefillData.resumeLink,
        file: prefillResume,
      }));

      if (prefillResume) {
        setImageUrl(URL.createObjectURL(prefillResume));
        setSelectedFileName(prefillResume.name);
      }
    }
  }, [prefillData]);
  return (
    <>
      <div
        style={{
          width: "900px",
          height: "70vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <div className="p-2">
          <form onSubmit={handleSubmit} maxWidth="md">
            {/* <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <button
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
              }}
              onClick={handleCloseClick}
            >
              X
            </button>
          </div> */}
            <Grid container spacing={2} style={{ marginTop: "16px" }}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "300px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        maxWidth: "400px",
                        display: "flex",
                      }}
                    >
                      <div>
                        {imageUrl ? (
                          <img
                            src={imageUpload}
                            alt="Uploaded"
                            style={{ width: "85px", height: "85px" }}
                          />
                        ) : (
                          <img
                            src={CompanyLogo}
                            alt="pic"
                            style={{ width: "75px", height: "75px" }}
                          />
                        )}
                        {imageUrl && <p>File: {selectedFileName}</p>}
                      </div>
                      <div
                        style={{
                          marginLeft: "10px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            opacity: 0,
                            cursor: "pointer",
                          }}
                          onChange={handleFileChange}
                        />

                        <button
                          className="mx-4,mb-3"
                          style={{
                            marginTop: "10px",
                            padding: "10px",
                            backgroundColor: "#169c50",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            fontSize: "14px",
                            cursor: "pointer",
                          }}
                          // onClick={handleChooseFile}
                          onClick={() => fileInputRef.current.click()}
                        >
                          Choose File
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              {/* <Grid item xs={12} sm={6} md={6} lg={6}> */}
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <TextField
                  label="Name"
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  error={!!errors.Name}
                  helperText={errors.Name}
                />
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <TextField
                  label="Initial"
                  type="text"
                  name="Initial"
                  value={formData.Initial}
                  inputProps={{
                    maxLength: 5,
                    // pattern: "^[A-Za-z]+$",
                  }}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  error={!!errors.Initial}
                  helperText={errors.Initial}
                  // style={{ width: "45%" }}
                />
              </Grid>
              {/* </Grid> */}

              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  label="EmailId"
                  // type="text"
                  name="EmailId"
                  value={formData.EmailId}
                  onChange={handleInputChange}
                  fullWidth
                  InputProps={{
                    pattern: "^[^s@]+@[^s@]+\\.[^s@]+$",
                  }}
                  error={!!errors.EmailId}
                  helperText={errors.EmailId}
                  // style={{ width: "347px", marginLeft: "-120px" }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  label="Mobile Number"
                  // type="text"
                  name="MobileNumber"
                  value={formData.MobileNumber}
                  inputProps={{ maxLength: 10, pattern: "[0-9]*" }}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  error={!!errors.MobileNumber}
                  helperText={errors.MobileNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  label="Whatsapp Number"
                  type="text"
                  name="WhatsupNumber"
                  value={formData.WhatsupNumber}
                  inputProps={{ maxLength: 10, pattern: "[0-9]*" }}
                  onChange={handleInputChange}
                  fullWidth
                  error={!!errors.WhatsupNumber}
                  helperText={errors.WhatsupNumber}
                  sx={{
                    "& input:invalid": {
                      borderColor: "red",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  label="Educational Qualification"
                  type="text"
                  name="EduacationalQualification"
                  value={formData.EduacationalQualification}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  label="Preferred Location"
                  type="text"
                  name="PrefredLocation"
                  value={formData.PrefredLocation}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  label="Current Location"
                  type="text"
                  name="CurrentLocation"
                  value={formData.CurrentLocation}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  label="Linkedin Url"
                  type="text"
                  name="LinkedinUrl"
                  value={formData.LinkedinUrl}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <div>Do You Have Experience in Manufacturing Industry</div>
                <RadioGroup
                  name="Manufacturing"
                  value={formData.Manufacturing}
                  onChange={handleRadioChange}
                  row
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </Grid>
              {formData.Manufacturing === "true" ? (
                <>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <div className="mb-3"> How many years of experience ?</div>
                    <Grid container spacing={2}>
                      {" "}
                      {/* <Grid item xs={12} sm={6} md={6} lg={6}>
                        <FormControl sx={{ width: "100%" }}>
                          <InputLabel id="demo-multiple-name-label">
                            Years
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={formData.DropdownField1}
                            onChange={handleDropdown1Change}
                            input={<OutlinedInput label="Years" />}
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
                            <MenuItem value={11}>11 Year</MenuItem>
                            <MenuItem value={12}>12 Year</MenuItem>
                            <MenuItem value={13}>13 Years</MenuItem>
                            <MenuItem value={14}>14 Years</MenuItem>
                            <MenuItem value={15}>15 Years</MenuItem>
                            <MenuItem value={16}>16 Years</MenuItem>
                            <MenuItem value={17}>17 Years</MenuItem>
                            <MenuItem value={18}>18 Years</MenuItem>
                            <MenuItem value={19}>19 Years</MenuItem>
                            <MenuItem value={20}>20 Years</MenuItem>
                            <MenuItem value={21}>21 Years</MenuItem>
                            <MenuItem value={22}>22 Years</MenuItem>
                            <MenuItem value={23}>23 Years</MenuItem>
                            <MenuItem value={24}>24 Years</MenuItem>
                            <MenuItem value={25}>25 Years</MenuItem>
                            <MenuItem value={26}>26 Years</MenuItem>
                            <MenuItem value={27}>27 Years</MenuItem>
                            <MenuItem value={28}>28 Years</MenuItem>
                            <MenuItem value={29}>29 Years</MenuItem>
                            <MenuItem value={30}>30 Years</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <FormControl sx={{ width: "100%" }}>
                          <InputLabel id="demo-multiple-name-label">
                            Months
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={formData.DropdownField2}
                            onChange={handleDropdown2Change}
                            input={<OutlinedInput label="Months" />}
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
                            <MenuItem value={11}>11 Months</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid> */}
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextField
                          label="Years"
                          type="number"
                          name="years"
                          value={formData.years}
                          onChange={handleInputChange}
                          fullWidth
                          InputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextField
                          label="Months"
                          type="number"
                          name="months"
                          value={formData.months}
                          onChange={handleInputChange}
                          fullWidth
                          InputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      label="Current Job Position"
                      type="text"
                      name="currentjobposition"
                      value={formData.currentjobposition}
                      onChange={handleInputChange}
                      fullWidth
                      // style={{ marginTop: "20px" }}
                    />
                  </Grid>
                </>
              ) : null}
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <div>Are You Currently Working?</div>
                <RadioGroup
                  name="Manufacturing"
                  value={formData.currentlyworking}
                  onChange={handleRadioChange1}
                  row
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                {/* <div>What Is Your Current Salary?</div> */}
                <TextField
                  label="Current Salary"
                  type=" "
                  name="currentsalary"
                  inputProps={{ maxLength: 15 }}
                  value={formData.currentsalary}
                  onChange={handleInputChange}
                  error={!!errors.currentsalary}
                  helperText={errors.currentsalary}
                  sx={{
                    "& input:invalid": {
                      borderColor: "red",
                    },
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                {/* <div>What Is Your Expected Salary?</div> */}
                <TextField
                  label="Expected Salary"
                  type=""
                  name="expecetdsealary"
                  value={formData.expecetdsealary}
                  onChange={handleInputChange}
                  inputProps={{ maxLength: 15 }}
                  fullWidth
                  error={!!errors.expecetdsealary}
                  helperText={errors.expecetdsealary}
                  sx={{
                    "& input:invalid": {
                      borderColor: "red",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                {/* <div>Joining Availability </div> */}
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-multiple-name-label">
                    Notice Period
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={formData.DropdownField3}
                    onChange={handleDropdown3Change}
                    placeholder="Joining Availability"
                    input={<OutlinedInput label="DropdownField3" />}
                    fullWidth
                    label="Notice Period"
                    MenuProps={{
                      style: { zIndex: 10008 },
                    }}
                  >
                    <MenuItem value={"Immediate Joiner"}>
                      Immediate Joiner
                    </MenuItem>
                    <MenuItem value={"15 Days"}>15 Days</MenuItem>
                    <MenuItem value={"1 Month"}>1 Month</MenuItem>
                    <MenuItem value={"2 Months"}>2 Months</MenuItem>
                    <MenuItem value={"3 Months"}>3 Months</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="flex-end">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#169c50", color: "white" }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {showSuccess && (
              <MyModal>
                <ModalContainer
                  zIndex={5000}
                  childComponent={<SuccessTick HeadText="Successfully" />}
                />
              </MyModal>
            )}
            {midSeniorRegister && (
              <MyModal>
                <ModalContainer
                  zIndex={6002}
                  childComponent={
                    <>
                      <p>{formData.Name} is already registered candidate</p>
                    </>
                  }
                />
              </MyModal>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Midelevelseniorpostform;
