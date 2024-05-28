/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Autocomplete,
  Typography,
} from "@mui/material";

// import { GetCandidateLead, postCandidateLead } from "./Apiservice";
import {
  GetCandidateLeadform,
  QualifyJobRole,
  GetPreferredCities,
  GetPrefferedAreaList,
  GetStates,
  postCandidateLead,
  GetAllsdminDetails,
} from "../../../apiServices";
import { MyModal, dateFormate } from "../../../utility";
import ModalContainer from "../../../components/modal_popup";
import SuccessTick from "../../../components/success_tick";
// import { useNavigate } from "react-router-dom";
import "dayjs/locale/en-gb";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { CandidatePipelineActions } from "../../../redux-store/store";
import { useDispatch } from "react-redux";

const CandidateLead = ({ oncloseLead, Reloadresponse, prefilldata }) => {
  const adminMyself = localStorage.getItem("adminID");
  const [candidateLead, setCandidateLead] = useState({
    DOB: { val: "", err: "" },
    JobRole: { val: "", err: "" },
    source: { val: [], err: "" },
    assignto: { val: parseInt(adminMyself), err: "" },
    whatsapp: { val: "", err: "" },
    mobileNumber: { val: "", err: "" },
    name: { val: "", err: "" },
    lastName: { val: "", err: "" },
    gender: { val: "", err: "" },
    state: { val: { state: "Tamil Nadu", id: 31 }, err: "" },
    city: { val: { city: "", id: 1 }, err: "" },
    area: { val: "", err: "" },
    experienced: { val: "", err: "" },
  });

  // const navigate = useNavigate();
  const options1 = [
    { label: "Naukri", value: "Naukri" },
    { label: "Admin", value: "Admin" },
    { label: "Linkedin", value: "Linkedin" },
    { label: "Reference", value: "Reference" },
    { label: "Job Hai", value: "Job Hai" },
  ];
  const Dispatch = useDispatch();
  const [options, setOptions] = useState({
    state: { data: {}, list: [] },
    city: [],
    areas: [],
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [jobRoles, setJobRoles] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  //  const [enableSubmit, setEnableSubmit] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [confirmationSubmit, setconfirmationSubmit] = useState(false);

  async function setCities(id) {
    try {
      const data = await GetPreferredCities();
      console.log(data, "citiessss");
      let options = data.data.map((el) => ({
        city: el.city,
        id: el.id,
      }));
      setOptions((prev) => ({
        ...prev,
        city: options,
      }));
    } catch (error) {
      // Handle the error as needed
      console.error("Error fetching cities:", error);
    }
  }

  async function setAreas(id) {
    try {
      const data = await GetPrefferedAreaList(id);
      // console.log(data, "areaaasss");
      setOptions((prev) => ({
        ...prev,
        areas: data.map((el) => el.areas),
      }));
    } catch (error) {
      // Handle the error as needed
      console.error("Error fetching cities:", error);
    }
  }

  async function setStates() {
    try {
      const data = await GetStates();
      console.log(data, "states");
      let options = data.results.map((el) => ({ state: el.state, id: el.id }));
      setOptions((prev) => ({
        ...prev,
        state: {
          ...prev.state,
          data: { data },
          list: options,
        }, // Update 'states' to 'state'
      }));
    } catch (error) {
      // Handle the error as needed
      console.error("Error fetching cities:", error);
    }
  }

  useEffect(() => {
    let stateId = candidateLead.state.val.id;
    setCities(stateId);
    // setStates();
    // alert("hii");
    if (candidateLead.city.val.id) {
      setAreas(candidateLead.city.val.id);
    }
  }, [candidateLead.city.val.id]);
  useEffect(() => {
    const fetchUserOptions = async () => {
      try {
        const userData = await GetAllsdminDetails();
        setUserOptions(
          userData.map((user) => ({ label: user.userName, value: user.id }))
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserOptions();
  }, []);

  useEffect(() => {
    const fetchJobRoles = async () => {
      try {
        const data = await QualifyJobRole();
        const jobRoles = data.results.map((el) => el.jobRoles);
        setJobRoles(jobRoles);
      } catch (error) {
        console.error("Error fetching job roles:", error);
      }
    };

    fetchJobRoles();
  }, []);
  // The empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    console.log(jobRoles);
  }, [jobRoles]);

  const handleCityChange = (event, value, reason) => {
    if (reason === "selectOption") {
      setCandidateLead((prev) => ({
        ...prev,
        city: { val: { city: value.city, id: value.id }, err: false },
      }));
    } else if (reason === "clear") {
      setCandidateLead((prev) => ({
        ...prev,
        city: { val: { city: "", id: "" }, err: "Preferred City is required" },
      }));
    }
    console.log(
      candidateLead.city.val.city,
      candidateLead.city.val.id,
      "smfmsndkfnskdfnsmdfnsdfnsmdfnmn"
    );
    setCandidateLead((prev) => ({
      ...prev,
      area: { val: "", err: false },
    }));
  };

  const handleAreaChange = (event, value) => {
    setCandidateLead((prev) => ({
      ...prev,
      area: { val: value, err: false },
    }));
  };

  const handleJobCatogeroryChange = (event, value) => {
    console.log("Selected job role:", value);
    setCandidateLead((prev) => ({
      ...prev,
      JobRole: { val: value, err: false },
    }));
  };

  const handlesourceChange = (event, value) => {
    console.log("Selected source:", value);
    setCandidateLead((prev) => ({
      ...prev,
      source: { val: value ? value.value : "", err: false },
    }));
  };

  const handleassignChange = (event, value) => {
    console.log("Selected assign tooooooooooo:", value);
    setCandidateLead((prev) => ({
      ...prev,
      assignto: { val: value.value, err: false },
    }));
  };

  const handlestateChange = (event, value) => {
    console.log(value, "value");

    setCandidateLead((prev) => ({
      ...prev,
      state: { val: value, err: false },
    }));
  };

  const validateField = (field, value) => {
    switch (field) {
      case "mobileNumber":
        if (!value) {
          return "Mobile number is required";
        } else if (!/^\d{10}$/.test(value)) {
          return "Invalid mobile number";
        } else {
          return "";
        }

      case "city":
        if (!value || value === "") {
          return "Preferred city is required";
        } else {
          return "";
        }
      case "JobRole":
        if (!value || value === "") {
          return "Job role is required";
        } else {
          return "";
        }
      case "source":
        if (!value || value === "") {
          return "source is required";
        } else {
          return "";
        }
      case "assignto":
        if (!value || value === "") {
          return "Assign to is required";
        } else {
          return "";
        }
      case "area":
        if (!value || value === "") {
          return "Preferred Area is required";
        } else {
          return "";
        }
      // No error
      // Add more cases for other fields if needed

      default:
        return "";
    }
  };
  // const handleValidation = () => {
  //   const newErrors = {};

  //   Object.keys(candidateLead).forEach((field) => {
  //     const value = candidateLead[field].val;
  //     const fieldValidation = validateField(field, value);
  //     newErrors[field].err = fieldValidation;
  //   });

  //   setCandidateLead((prevData) => {
  //     return {
  //       ...prevData,
  //       ...newErrors,
  //     };
  //   });
  // };
  const mobileRegex = /^[0-9]{10}$/;
  const handleFieldChange = (field, value) => {
    // Update the form data
    setCandidateLead((prevData) => ({
      ...prevData,
      [field]: { ...prevData[field], val: value, err: "" },
    }));

    switch (field) {
      case "mobileNumber":
        if (mobileRegex.test(value)) {
          setCandidateLead((prev) => ({
            ...prev,
            [field]: { ...prev[field], val: value, err: "" },
          }));
        } else {
          setCandidateLead((prev) => ({
            ...prev,
            [field]: { ...prev[field], err: "Enter Valid Number" },
          }));
          return;
        }
        break;
      case "whatsapp":
        if (mobileRegex.test(value)) {
          setCandidateLead((prev) => ({
            ...prev,
            [field]: { ...prev[field], val: value, err: "" },
          }));
        } else {
          setCandidateLead((prev) => ({
            ...prev,
            [field]: { ...prev[field], err: "Enter Valid Number" },
          }));
          return;
        }
        break;
      default:
        break;
    }
    if (
      (field === "mobileNumber" && value.length === 10) ||
      (field === "whatsapp" && value.length === 10)
    ) {
      GetCandidateLeadform(value)
        .then((data) => {
          if (data.statusCode !== 400) {
            setCandidateLead((prev) => ({
              ...prev,
              [field]: { ...prev[field], err: "Number already exists" },
            }));
            return;
          }
        })
        .catch((error) => {
          console.error("Error checking mobile number existence:", error);
        });
      return;
    }
  };

  const handleDateChange = (type, val) => {
    console.log(type, dateFormate(val.$d).trim());
    handleFieldChange("DOB", dateFormate(val.$d).trim());
  };
  const checkLeadfor = (e) => {
    let errors = 0;
    if (
      errors !== 0 ||
      candidateLead.mobileNumber.err
      // candidateLead.whatsapp.err
    ) {
      return;
    }
    // Check if the mobile number field is empty
    if (!candidateLead.mobileNumber.val) {
      setCandidateLead((prev) => ({
        ...prev,
        mobileNumber: {
          ...prev.mobileNumber,
          err: "Mobile number is required",
        },
      }));
      errors++;
    } else {
      if (candidateLead.mobileNumber.val.length != 10) {
        setCandidateLead((prev) => ({
          ...prev,
          mobileNumber: {
            ...prev.mobileNumber,
            err: "Enter Valid Mobile Number",
          },
        }));
        errors++;
      } else {
        setCandidateLead((prev) => ({
          ...prev,
          mobileNumber: {
            ...prev.mobileNumber,
            err: "",
          },
        }));
      }
    }

    // validate whatsapp  number
    // if (!candidateLead.whatsapp.val) {
    //   setCandidateLead((prev) => ({
    //     ...prev,
    //     whatsapp: {
    //       ...prev.whatsapp,
    //       err: "Whatsapp number is required",
    //     },
    //   }));
    //   errors++;
    // } else {
    //   if (candidateLead.whatsapp.val.length != 10) {
    //     setCandidateLead((prev) => ({
    //       ...prev,
    //       whatsapp: {
    //         ...prev.whatsapp,
    //         err: "Enter Valid Whatsapp Number",
    //       },
    //     }));
    //     errors++;
    //   } else {
    //     setCandidateLead((prev) => ({
    //       ...prev,
    //       whatsapp: {
    //         ...prev.whatsapp,
    //         err: "",
    //       },
    //     }));
    //   }
    // }

    // validate name
    if (!candidateLead.name.val) {
      setCandidateLead((prev) => ({
        ...prev,
        name: {
          ...prev.name,
          err: "Name is required",
        },
      }));
      errors++;
    } else {
      setCandidateLead((prev) => ({
        ...prev,
        name: {
          ...prev.name,
          err: "",
        },
      }));
    }
    if (!candidateLead.JobRole.val) {
      setCandidateLead((prev) => ({
        ...prev,
        JobRole: {
          ...prev.JobRole,
          err: "job role is required",
        },
      }));
      errors++;
    } else {
      setCandidateLead((prev) => ({
        ...prev,
        JobRole: {
          ...prev.JobRole,
          err: "",
        },
      }));
    }

    if (!candidateLead.source.val) {
      setCandidateLead((prev) => ({
        ...prev,
        source: {
          ...prev.source,
          err: "source is required",
        },
      }));
      errors++;
    } else {
      setCandidateLead((prev) => ({
        ...prev,
        source: {
          ...prev.source,
          err: "",
        },
      }));
    }

    if (!candidateLead.assignto.val) {
      setCandidateLead((prev) => ({
        ...prev,
        assignto: {
          ...prev.assignto,
          err: "Assign to is required",
        },
      }));
      errors++;
    } else {
      setCandidateLead((prev) => ({
        ...prev,
        assignto: {
          ...prev.assignto,
          err: "",
        },
      }));
    }
    // if (!candidateLead.lastName.val) {
    //   setCandidateLead((prev) => ({
    //     ...prev,
    //     lastName: {
    //       ...prev.lastName,
    //       err: "Initial is required",
    //     },
    //   }));
    //   errors++;
    // } else {
    //   setCandidateLead((prev) => ({
    //     ...prev,
    //     lastName: {
    //       ...prev.lastName,
    //       err: "",
    //     },
    //   }));
    // }

    // Validate Preferred City
    const cityValidation = validateField("city", candidateLead.city.val.city);
    if (cityValidation !== "") {
      setCandidateLead((prev) => ({
        ...prev,
        city: { ...prev.city, err: cityValidation },
      }));
      errors++;
    } else {
      setCandidateLead((prev) => ({
        ...prev,
        city: { ...prev.city, err: "" },
      }));
    }

    // Validate Preferred Area if city is selected
    // if (candidateLead.city.val.city !== "") {
    //   const areaValidation = validateField("area", candidateLead.area.val);
    //   if (areaValidation !== "") {
    //     setCandidateLead((prev) => ({
    //       ...prev,
    //       area: { ...prev.area, err: areaValidation },
    //     }));
    //     errors++;
    //   } else {
    //     setCandidateLead((prev) => ({
    //       ...prev,
    //       area: { ...prev.area, err: "" },
    //     }));
    //   }
    // }
    if (!candidateLead.experienced.val) {
      setCandidateLead((prev) => ({
        ...prev,
        experienced: {
          ...prev.experienced,
          err: "Experienced is required",
        },
      }));
      errors++;
    } else {
      setCandidateLead((prev) => ({
        ...prev,
        experienced: {
          ...prev.experienced,
          err: "",
        },
      }));
    }
    if (errors != 0) return;
    setconfirmationSubmit(true);
  };
  const handleSubmit = (e, value) => {
    // e.preventDefault();

    setButtonDisabled(true);
    postCandidateLead(candidateLead).then((data) => {
      if (data.statusCode == 400) {
        alert("Mobile / Whatsapp Number Already Exits");
        return;
      }

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // navigate("/CandidateTabsview#leads");
        oncloseLead();
      }, 3000);
      Reloadresponse();
      setButtonDisabled(false);
    });
    setButtonDisabled(false);
    setCandidateLead({
      DOB: { val: "", err: "" },
      whatsapp: { val: "", err: "" },
      mobileNumber: { val: "", err: "" },
      JobRole: { val: "", err: "" },
      source: { val: "", err: "" },
      assignto: { val: "", err: "" },
      name: { val: "", err: "" },
      lastName: { val: "", err: "" },
      // gender: { val: "", err: "" },
      state: { val: { state: "Tamil Nadu", id: 31 }, err: "" },
      city: { val: { city: "", id: 1 }, err: "" },
      experienced: { val: "", err: "" },
    });
    Dispatch(CandidatePipelineActions.setRefreshCount());
  };
  useEffect(() => {
    if (prefilldata && prefilldata.mobileNumber) {
      // const data = [prefilldata.source];
      console.log(prefilldata.city, "datadata");
      setCandidateLead((prev) => ({
        ...prev,
        DOB: { val: prefilldata.dateOfBirth, err: "" },
        JobRole: { val: prefilldata.JobRole, err: "" },
        source: { val: prefilldata.source, err: "" },
        assignto: { val: parseInt(adminMyself), err: "" },
        whatsapp: { val: prefilldata.whatsapp, err: "" },
        mobileNumber: { val: prefilldata.mobileNumber.toString(), err: "" },
        name: { val: prefilldata.name, err: "" },
        lastName: { val: prefilldata.lastName, err: "" },
        // gender: { val: prefilldata, err: "" },
        state: { val: { state: "Tamil Nadu", id: 31 }, err: "" },
        city: {
          val: { city: prefilldata.city, id: prefilldata.city },
          err: "",
        },
        area: { val: prefilldata.area, err: "" },
        experienced: {
          val: prefilldata.experienced === true ? "yes" : "no",
          err: "",
        },
      }));
    }
  }, [prefilldata]);
  const paperStyle = {
    padding: 20,
    // max: "90vh",
    hight: "auto",
    width: 450,
    margin: "30px auto",
    borderRadius: 10,
  };

  const gridStyle = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div>
      <>
        <Grid container style={gridStyle}>
          {/* <Paper elevation={10} style={paperStyle}> */}
          {/* <Grid container style={gridStyle}>
             
            </Grid> */}
          <Grid item xs={12} gap={1} className="d-flex">
            <Grid className="mt-2 p-2" item xs={12} sm={6}>
              <TextField
                id="name"
                label="Candidate Name "
                variant="outlined"
                placeholder="Enter The Candidate Name"
                fullWidth
                value={candidateLead.name.val}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                error={!!candidateLead.name.err}
                helperText={candidateLead.name.err}
              />
            </Grid>
            <Grid className="mt-2 p-2" item xs={12} sm={6}>
              <TextField
                id="lastName"
                label="Initial"
                variant="outlined"
                placeholder="Initial"
                fullWidth
                value={candidateLead.lastName.val}
                onChange={(e) => handleFieldChange("lastName", e.target.value)}
                error={!!candidateLead.lastName.err}
                helperText={candidateLead.lastName.err}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} gap={1} className="d-flex">
            <Grid item xs={12} sm={6} className=" p-2">
              <Autocomplete
                id="free-solo-demo"
                options={options1}
                getOptionLabel={(option) => option.label}
                // options={jobRoles}
                // getOptionLabel={(option) => option.jobRoles}
                // value={candidateLead.JobRole.val}
                value={
                  options1.find(
                    (option) => option.value === candidateLead.source.val
                  ) || null
                }
                onChange={handlesourceChange}
                // options={options.areas}
                // getOptionLabel={(option) => option}

                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="From Source"
                    error={Boolean(candidateLead.source.err)}
                    helperText={
                      candidateLead.source.err ? candidateLead.source.err : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid className=" p-2" item xs={12} sm={6}>
              <Autocomplete
                id="free-solo-demo"
                options={[
                  { label: "Myself", value: parseInt(adminMyself) },
                  ...userOptions,
                ]}
                getOptionLabel={(option) => option.label}
                onChange={handleassignChange}
                defaultValue={{ label: "Myself", value: parseInt(adminMyself) }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Assign to"
                    error={Boolean(candidateLead.assignto.err)}
                    helperText={
                      candidateLead.assignto.err
                        ? candidateLead.assignto.err
                        : ""
                    }
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} gap={1} className="d-flex">
            <Grid item className=" p-2" xs={12} sm={6}>
              <TextField
                id="MobileNumber"
                label="Mobile Number"
                variant="outlined"
                placeholder="Enter The Mobile Number"
                fullWidth
                required
                type="text"
                inputProps={{ maxLength: 10 }}
                value={candidateLead.mobileNumber.val}
                onChange={(e) =>
                  handleFieldChange("mobileNumber", e.target.value)
                }
                // onChange={(e) => {
                //   const value = e.target.value;
                //   const isValid = numbersOnlyTest(value);

                //   setCandidateLead({
                //     ...candidateLead,
                //     mobileNumber: {
                //       val: value,
                //       err: isValid ? "" : "Only numbers are allowed",
                //     },
                //   });
                // }}
                error={!!candidateLead.mobileNumber.err}
                helperText={candidateLead.mobileNumber.err}
              />
            </Grid>
            <Grid className=" p-2" item xs={12} sm={6}>
              <TextField
                id="whatsapp"
                label="Whatsapp Number"
                variant="outlined"
                placeholder="Enter The Whatsapp Number"
                fullWidth
                type="text"
                inputProps={{ maxLength: 10 }}
                value={candidateLead.whatsapp.val}
                onChange={(e) => handleFieldChange("whatsapp", e.target.value)}
                error={!!candidateLead.whatsapp.err}
                helperText={candidateLead.whatsapp.err}
              />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            className="p-2"
            // style={{ padding: "0 20px", marginTop: 10 }}
          >
            <Grid className="mt-2" item xs={12}>
              <Autocomplete
                id="free-solo-demo"
                options={jobRoles}
                getOptionLabel={(option) => option}
                value={candidateLead.JobRole.val}
                onChange={handleJobCatogeroryChange}
                // options={options.areas}
                // getOptionLabel={(option) => option}

                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Job Role"
                    error={Boolean(candidateLead.JobRole.err)}
                    helperText={
                      candidateLead.JobRole.err ? candidateLead.JobRole.err : ""
                    }
                  />
                )}
              />
            </Grid>

            {/* <Grid item xs={12}>
                <Autocomplete
                  id="free-solo-demo"
                  value={candidateLead.state.val}
                  onChange={(event, newValue) =>
                    handlestateChange(event, newValue)
                  }
                  defaultValue={"Tamil Nadu"}
                  getOptionLabel={(options) => options.state}
                  options={options.state.list} // Use the correct options array
                  helperText={candidateLead.state.err ? "select state" : ""}
                  renderInput={(params) => (
                    <TextField {...params} label="State" />
                  )}
                />
              </Grid> */}

            <Grid item xs={12} className="d-flex">
              <Grid item xs={12}>
                <FormControl
                  component="fieldset"
                  fullWidth
                  // error={!!candidateLead.experienced.err}
                >
                  <FormLabel component="legend" style={{ textAlign: "left" }}>
                    Experienced
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="experienced"
                    name="experienced"
                    value={candidateLead.experienced.val}
                    onChange={(e) =>
                      handleFieldChange("experienced", e.target.value)
                    }
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                {candidateLead.experienced.err && (
                  <p className="text-danger">Experinece is required</p>
                )}
              </Grid>
              <Grid item xs={12} className="mt-2">
                <FormControl fullWidth>
                  <LocalizationProvider
                    adapterLocale="en-gb"
                    dateAdapter={AdapterDayjs}
                  >
                    <DatePicker
                      label="DOB (DD-MM-YYYY)"
                      value={dayjs(candidateLead.DOB.val)}
                      name="DOB"
                      onChange={(value) => handleDateChange("DOB", value)}
                      required
                      slotProps={{
                        textField: {
                          helperText: candidateLead.DOB.err,
                          error: Boolean(candidateLead.DOB.err),
                        },
                      }}
                    />
                  </LocalizationProvider>
                </FormControl>{" "}
              </Grid>
            </Grid>

            <Grid item xs={12} gap={1} className="d-flex">
              <Grid className="mt-2" item xs={12} sm={6}>
                <Autocomplete
                  id="free-solo-demo"
                  value={candidateLead.city.val}
                  onChange={handleCityChange}
                  options={options.city}
                  getOptionLabel={(options) => options.city}
                  // error={Boolean(candidateLead.city.err)}

                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Preferred Job City"
                      error={Boolean(candidateLead.city.err)}
                      helperText={
                        candidateLead.city.err ? candidateLead.city.err : ""
                      }
                    />
                  )}
                />
              </Grid>

              {candidateLead.city.val.city != "" && (
                <Grid className="mt-2" item xs={12} sm={6}>
                  <Autocomplete
                    id="free-solo-demo"
                    value={candidateLead.area.val}
                    onChange={handleAreaChange}
                    options={options.areas}
                    // getOptionLabel={(option) => option}

                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Preferred Job Area"
                        error={Boolean(candidateLead.area.err)}
                        helperText={
                          candidateLead.area.err ? candidateLead.area.err : ""
                        }
                      />
                    )}
                  />
                </Grid>
              )}
            </Grid>

            {/* <Grid item xs={11.1}>
              <FormControl component="fieldset">
                <FormLabel component="legend" style={{ textAlign: "left" }}>
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender"
                  value={candidateLead.gender.val}
                  onChange={(e) => handleFieldChange("gender", e.target.value)}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid> */}

            <div>
              <div className="d-none">
                <FormControl style={{ width: "100%", marginTop: "20px" }}>
                  <InputLabel id="demo-select-small-years">
                    Exp (Years)
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-years"
                    id="demo-select-small"
                    // value={age}
                    label="Years"
                    // onChange={handleChange}
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>0 Year </MenuItem>
                    <MenuItem value={1}>1 Year </MenuItem>
                    <MenuItem value={2}>2 Years </MenuItem>
                    <MenuItem value={3}>3 Years </MenuItem>
                    <MenuItem value={4}>4 Years </MenuItem>
                    <MenuItem value={5}>5 Years </MenuItem>
                    <MenuItem value={6}>6 Years </MenuItem>
                    <MenuItem value={7}>7 Years </MenuItem>
                    <MenuItem value={8}>8 Years </MenuItem>
                    <MenuItem value={9}>9 Years </MenuItem>
                    <MenuItem value={10}>10 Years </MenuItem>
                  </Select>
                </FormControl>

                <FormControl style={{ width: "400px", marginTop: "20px" }}>
                  <InputLabel id="demo-select-small-months">
                    Exp (Months)
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-months"
                    id="demo-select-small"
                    // value={age}
                    label="Months"
                    // fullWidth
                    // onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>0 month </MenuItem>
                    <MenuItem value={1}>1 month </MenuItem>
                    <MenuItem value={2}>2 months </MenuItem>
                    <MenuItem value={3}>3 months </MenuItem>
                    <MenuItem value={4}>4 months </MenuItem>
                    <MenuItem value={5}>5 months </MenuItem>
                    <MenuItem value={6}>6 months </MenuItem>
                    <MenuItem value={7}>7 months </MenuItem>
                    <MenuItem value={8}>8 months </MenuItem>
                    <MenuItem value={9}>9 months </MenuItem>
                    <MenuItem value={10}>10 months </MenuItem>
                    <MenuItem value={11}>11 months </MenuItem>
                    <MenuItem value={12}>12 months </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <Grid
              item
              xs={12}
              className="d-flex justify-content-end"
              style={{ textAlign: "center", marginTop: "20px" }}
            >
              <div>
                {" "}
                <Button
                  // type="submit"
                  variant="contained"
                  fullWidth
                  style={{ backgroundColor: "#169C50", color: "white" }}
                  onClick={() => checkLeadfor()}
                >
                  Submit
                </Button>
              </div>
            </Grid>
          </Grid>
          {/* </Paper> */}
          {confirmationSubmit && (
            <MyModal>
              <ModalContainer
                childComponent={
                  <>
                    <div>
                      <p>Are you sure you want to submit ? </p>
                    </div>
                    <div className="d-flex justify-content-end gap-3">
                      <div
                        className="btn btn-danger "
                        onClick={() => {
                          setconfirmationSubmit(false);
                        }}
                      >
                        Cancel
                      </div>
                      <div>
                        <button
                          className="btn btn-success"
                          onClick={(event) => handleSubmit()}
                          disabled={buttonDisabled}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </>
                }
              />{" "}
            </MyModal>
          )}
        </Grid>

        {showSuccess && (
          <MyModal>
            <ModalContainer
              zIndex={10000}
              childComponent={<SuccessTick HeadText="Successfully" />}
            />
          </MyModal>
        )}
      </>
    </div>
  );
};

export default CandidateLead;
