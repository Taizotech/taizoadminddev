/* eslint-disable default-case */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import {
  Autocomplete,
  FormControl,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlinePhone } from "react-icons/ai";
import { MyModal, numbersOnlyTest } from "../../../utility";
import ModalContainer from "../../../components/modal_popup";
import FBStyle from "../FacebookMeta/candidateFacebookMeta.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { BiFilterAlt } from "react-icons/bi";
import {
  CandidateMidLevelActions,
  CandidateMidLevelsourcingActions,
} from "../../../redux-store/store";
import {
  GetAllsdminDetails,
  GetCities,
  getJobFilterOptions,
} from "../../../apiServices";
function MidSeniorsourcingFilter() {
  const [showFilter, setShowFilter] = useState(false);
  const [adminList, setAdminList] = useState([]);
  const adminDetailsRole = useSelector((state) => state.adminDetails);
  let isSuperAdmin = adminDetailsRole.roleID == 1;

  const CandidateMidLevel = useSelector(
    (state) =>
      state.CandidateMidLevelsourcingDetails.CandidateMidLevelsourcingFilter
  );
  const CandidateMidLevelRedDot = useSelector(
    (state) => state.CandidateMidLevelsourcingDetails.refreshRedDot
  );
  const Dispatch = useDispatch();
  const pageSize = useSelector(
    (state) =>
      state.CandidateMidLevelsourcingDetails.CandidateMidLevelsourcingFilter
        .pageSize
  );
  const create = useSelector(
    (state) =>
      state.CandidateMidLevelsourcingDetails.CandidateMidLevelsourcingFilter
        .createdTimeStart
  );
  const ended = useSelector(
    (state) =>
      state.CandidateMidLevelsourcingDetails.CandidateMidLevelsourcingFilter
        .createdTimeEnd
  );
  const initialState = {
    adminId: isSuperAdmin ? 0 : localStorage.getItem("adminID"),
    firstName: CandidateMidLevel.firstName,
    lastName: CandidateMidLevel.lastName,
    emailId: CandidateMidLevel.emailId,
    mobileNumber: CandidateMidLevel.mobileNumber,
    appliedJobrole: CandidateMidLevel.appliedJobrole,
    jobrole: CandidateMidLevel.jobrole,
    currentLocation: CandidateMidLevel.currentLocation,
    preferredJobLocation: CandidateMidLevel.preferredJobLocation,
    qualified: CandidateMidLevel.qualified,
    notQualified: CandidateMidLevel.notQualified,
  };
  const [formData, setFormData] = useState(initialState);
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const [dateRange, setDateRange] = useState({
    start: CandidateMidLevel.createdTimeStart,
    end: CandidateMidLevel.createdTimeEnd,
    dateFilterType: CandidateMidLevel.dateFilterType,
  });
  const [options, setOptions] = useState({
    preferredJobLocation: [],
    currentLocation: [],
  });
  const [showCustom, setshowCustom] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    start: false,
    end: false,
  });
  const [showRedDot, setShowRedDot] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (val) => {
    console.log(val);

    setAnchorEl(null);
  };

  const handleDateSelect = (val) => {
    let selectedOption = val;
    const today = new Date();
    let endDate = new Date(today);
    if (selectedOption === "lastWeek") {
      const today = new Date();
      const todayDayOfWeek = today.getDay();

      const daysToLastMonday = (todayDayOfWeek + 6) % 7;
      const lastMonday = new Date(today);
      lastMonday.setDate(today.getDate() - daysToLastMonday - 7);

      const startDate = new Date(lastMonday);
      const endDate = new Date(lastMonday);
      endDate.setDate(lastMonday.getDate() + 6);
      setDateRange((prev) => ({
        ...prev,
        dateFilterType: "Last 1 Week",
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      }));

      setAnchorEl(null);
      console.log(startDate, endDate);
    } else if (selectedOption === "lastTwoWeeks") {
      const today = new Date();
      const todayDayOfWeek = today.getDay();

      const daysToLastMonday = (todayDayOfWeek + 13) % 14;
      const lastMonday = new Date(today);
      lastMonday.setDate(today.getDate() - daysToLastMonday - 14);

      const startDate = new Date(lastMonday);
      const endDate = new Date(lastMonday);
      endDate.setDate(lastMonday.getDate() + 13);
      console.log(startDate, endDate);
      setDateRange((prev) => ({
        ...prev,
        dateFilterType: "Last 2 Week",
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      }));
      setAnchorEl(null);
    } else if (selectedOption === "today") {
      setDateRange((prev) => ({
        ...prev,
        dateFilterType: "Today",
        start: today.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      }));
      setAnchorEl(null);
    } else if (selectedOption === "lastMonth") {
      const today = new Date(); // Assuming today is the current date

      const startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);

      const endDate = new Date(today.getFullYear(), today.getMonth(), 0);

      console.log(startDate, endDate);
      setDateRange((prev) => ({
        ...prev,
        dateFilterType: "Last Month",
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      }));
      setAnchorEl(null);
    } else if (selectedOption === "yesterday") {
      const today = new Date(); // Assuming today is the current date

      // Calculate yesterday's date
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      // Set the start time to 12:00 AM
      const startDate = new Date(yesterday);
      startDate.setHours(0, 0, 0, 0);

      // Set the end time to 11:59 PM
      const endDate = new Date(yesterday);
      endDate.setHours(23, 59, 59, 999);

      console.log(startDate, endDate);
      setDateRange((prev) => ({
        ...prev,
        dateFilterType: "Yesterday",
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      }));
      setAnchorEl(null);
    } else if (selectedOption === "custom") {
      setshowCustom(true);
      setAnchorEl(null);
    }
  };
  function handleCustomDate(value, type) {
    const val = value.target.value;

    if (type === "startDate") {
      setDateRange((prev) => ({
        ...prev,
        start: val,
        dateFilterType: "custom",
      }));
      setValidationErrors((prev) => ({
        ...prev,
        start: false,
      }));
    } else {
      setDateRange((prev) => ({
        ...prev,
        end: val,
        dateFilterType: "custom",
      }));
      setValidationErrors((prev) => ({
        ...prev,
        end: false,
      }));
    }
  }
  const isFormValid = () => {
    // Implement your validation logic here
    // For example, you can check if both start and end dates are filled
    const isValid = dateRange.start && dateRange.end;

    if (!dateRange.start) {
      setValidationErrors((prev) => ({
        ...prev,
        start: true,
      }));
    }

    if (!dateRange.end) {
      setValidationErrors((prev) => ({
        ...prev,
        end: true,
      }));
    }

    return isValid;
  };

  const handleApplyCustomDate = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      // Your submit logic here
      // Proceed with form submission
      console.log("Form submitted:", dateRange);
      setValidationErrors({
        start: false,
        end: false,
      });
      setshowCustom(false); // Close the modal or perform other actions
    }
  };

  function handleFieldChange(field, value) {
    switch (field) {
      case "mobileNumber":
        if (numbersOnlyTest(value)) {
          setFormData({ ...formData, [field]: value });
          Dispatch(
            CandidateMidLevelsourcingActions.setCandidateMidLevelsourcingFiltermobileNumber(
              value
            )
          );
        }
        break;
      case "appliedJobrole":
        setFormData({ ...formData, [field]: value });
        break;
      case "firstName":
        setFormData({ ...formData, [field]: value });
        break;
      case "jobrole":
        setFormData({ ...formData, [field]: value });
        break;
      case "currentLocation":
        setFormData({ ...formData, [field]: value });
        break;
      case "preferredJobLocation":
        setFormData({ ...formData, [field]: value });
        break;
      case "emailId":
        setFormData({ ...formData, [field]: value });
        break;
    }
  }
  useEffect(() => {
    GetCities(31).then((data) => {
      console.log(data, "cities for tamilnadu");
      setOptions((prev) => ({
        ...prev,
        preferredJobLocation: data.results.filter(
          (city) => city.stateId === 31
        ),
        currentLocation: data.results.filter((city) => city.stateId === 31),
      }));
    });

    GetAllsdminDetails()
      .then((data) => {
        console.log("Type of data from GetAllsdminDetails:", typeof data);
        console.log("Data from GetAllsdminDetails:", data);

        const activeAdmins = data.filter((item) => !item.Deactived);
        setAdminList(activeAdmins);
        console.log("Active Admins:", activeAdmins);
      })
      .catch((error) => {
        console.error("Error in GetAllsdminDetails:", error);
        // Handle the error as needed
        alert("Something Went wrong");
      });
  }, []);

  function handleAssignToChange(e) {
    const { value } = e.target;
    console.log(value, "hsjhf");
    setFormData((prev) => ({ ...prev, adminId: value }));
  }
  const updatePrefferedLocation = (event, value) => {
    // to update cities
    console.log(event, "jhjhjkhjh");
    setFormData({ ...formData, preferredJobLocation: event.city });
  };
  const updateCurrentLocation = (event, value) => {
    // to update cities
    console.log(event, "jhjhjkhjh");
    setFormData({ ...formData, currentLocation: event.city });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Size:", pageSize);
    Dispatch(
      CandidateMidLevelsourcingActions.setCandidateMidLevelsourcingFilter({
        ...formData,
        // adminId: 0,
        createdTimeStart: dateRange.start || create,
        createdTimeEnd: dateRange.end || ended,
        page: 0,
        pageSize: pageSize,
        dateFilterType: dateRange.dateFilterType || "",
      })
    );
    const isFilterApplied =
      formData.adminId ||
      formData.appliedJobrole ||
      formData.currentLocation ||
      formData.emailId ||
      formData.firstName ||
      formData.jobrole ||
      formData.lastName ||
      formData.mobileNumber ||
      formData.preferredJobLocation ||
      dateRange.start ||
      dateRange.end;

    // Show the red dot only if a filter is applied
    // if (isFilterApplied) {
    //   setShowRedDot(true);
    // } else {
    //   setShowRedDot(false);
    // }
    Dispatch(
      CandidateMidLevelsourcingActions.setCandidateMidLevelsourcingRedDot(
        isFilterApplied
      )
    );
    setShowFilter(false);
  };

  const handleKeyPress = (e) => {
    // Check if the Enter key is pressed (key code 13)
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  function handleClear(e) {
    e.preventDefault();
    setFormData({
      adminId: isSuperAdmin ? 0 : localStorage.getItem("adminID"),
      firstName: "",
      lastName: "",
      emailId: "",
      mobileNumber: "",
      appliedJobrole: "",
      jobrole: "",
      currentLocation: "",
      preferredJobLocation: "",
      qualified: "",
      notQualified: "",
      createdTimeStart: "",
      createdTimeEnd: "",
    });
    // setSelectedValue("");
    setDateRange({
      start: null,
      end: null,
      dateFilterType: "",
    });
    setShowRedDot(false);

    Dispatch(
      CandidateMidLevelsourcingActions.setCandidateMidLevelsourcingFilter({
        ...initialState,
        createdTimeStart: "",
        createdTimeEnd: "",
        page: 0,
        pageSize: pageSize,
        dateFilterType: "",
      })
    );
  }
  function handleClickCross(e) {
    e.preventDefault();
    Dispatch(
      CandidateMidLevelActions.setCandidateMidLevelFilter({
        ...formData,
        page: 0,
        pageSize: pageSize,
        createdTimeStart: create,
        createdTimeEnd: ended,
        dateFilterType: dateRange.dateFilterType,
      })
    );
    setShowFilter(false);
  }
  const ManufacturingOptions = [
    {
      value: "yes",
      label: "Yes",
    },
    {
      value: "no",
      label: "No",
    },
  ];
  const joininstatus = [
    {
      value: formData.notQualified,
      label: "Qualified",
    },
    {
      value: formData.qualified,
      label: "Not qualified",
    },
  ];
  const expYearMonth = [
    {
      value: "0",
      label: "0",
    },
    {
      value: "1",
      label: "1",
    },
    {
      value: "2",
      label: "2",
    },
    {
      value: "3",
      label: "3",
    },
    {
      value: "4",
      label: "4",
    },

    {
      value: "5",
      label: "5",
    },
    {
      value: "6",
      label: "6",
    },
    {
      value: "7",
      label: "7",
    },
    {
      value: "8",
      label: "8",
    },
    {
      value: "9",
      label: "9",
    },
    {
      value: "10",
      label: "10",
    },
    {
      value: "11",
      label: "11",
    },
  ];
  const handleManufacturing = (e) => {
    const { value, name } = e.target;
    console.log(value, "e.target");
    if (name === "experienceInManufacturing") {
      setFormData((prev) => ({ ...prev, experienceInManufacturing: value }));
    } else if (name === "currentlyWorking") {
      setFormData((prev) => ({ ...prev, currentlyWorking: value }));
    }
  };

  const handlejoiningDate = (e) => {
    const { value, name } = e.target;

    if (value === "qualified") {
      setFormData((prev) => ({ ...prev, qualified: value }));
    } else if (value === "notQualified") {
      setFormData((prev) => ({ ...prev, notQualified: value }));
    }
  };
  const handleExperienceChange = (e) => {
    const { value, name } = e.target;

    if (name === "minExperience") {
      setFormData((prev) => ({ ...prev, minExperience: value }));
    } else if (name === "maxExperience") {
      setFormData((prev) => ({ ...prev, maxExperience: value }));
    }
  };
  return (
    <div>
      <div>
        <div className="d-flex justify-content-end">
          <div>
            <TextField
              id="standard-basic"
              label="Mobile number"
              variant="standard"
              fullWidth
              value={formData.mobileNumber}
              // inputProps={{ maxLenth: 10 }}
              onChange={(event) =>
                handleFieldChange("mobileNumber", event.target.value)
              }
              inputProps={{ maxLength: 10 }}
              InputProps={{
                startAdornment: (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AiOutlinePhone style={{ marginRight: "5px" }} /> +91
                  </span>
                ),
              }}
            />
          </div>
          <button
            className={`rounded-pill d-flex align-items-center ${FBStyle.Filterbutton}`}
            variant="contained"
            onClick={() => setShowFilter(true)}
          >
            <BiFilterAlt />{" "}
            <p
              style={{
                backgroundColor: CandidateMidLevelRedDot
                  ? "red"
                  : "transparent",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
              }}
            ></p>{" "}
            Filter
          </button>
        </div>
        {showFilter && (
          <MyModal>
            <ModalContainer
              zIndex={1001}
              childComponent={
                <>
                  <div className="d-flex justify-content-between">
                    <h4 className="text-center mb-2">Filter by</h4>
                    <h3>
                      <span
                        onClick={handleClickCross}
                        // onClick={() => setShowFilter(false)}
                        className="btn btn-outline-danger"
                        style={{ cursor: "pointer", fontSize: 15 }}
                      >
                        <AiOutlineClose />
                      </span>
                    </h3>
                  </div>
                  <div className={`${FBStyle.BoxContainerWidth}`}>
                    <>
                      <form
                        onSubmit={(e) => {
                          handleSubmit(e);
                        }}
                      >
                        <Stack className="mt-1">
                          <div className="row">
                            <div className="col-sm-3">
                              <TextField
                                // className="mt-2"
                                fullWidth
                                label="Sourced for Position"
                                name="appliedJobrole"
                                placeholder="Applied for Position"
                                value={formData.appliedJobrole}
                                onChange={(event) =>
                                  handleFieldChange(
                                    "appliedJobrole",
                                    event.target.value
                                  )
                                }
                                InputProps={{
                                  onKeyPress: (e) => {
                                    if (e.key === "Enter") {
                                      handleSubmit(e);
                                    }
                                  },
                                }}
                                // inputProps={{onk}}
                              />
                            </div>
                            <div className="col-sm-3">
                              <TextField
                                // className="mt-2"
                                fullWidth
                                label="Name"
                                name="firstName"
                                placeholder="Name"
                                value={formData.firstName}
                                onChange={(event) =>
                                  handleFieldChange(
                                    "firstName",
                                    event.target.value
                                  )
                                }
                                InputProps={{
                                  onKeyPress: (e) => {
                                    if (e.key === "Enter") {
                                      handleSubmit(e);
                                    }
                                  },
                                }}
                              />
                            </div>
                            <div className="col-sm-3">
                              <FormControl variant="outlined" fullWidth>
                                <TextField
                                  label="Created on"
                                  id="basic-button"
                                  value={`${dateRange.dateFilterType}`}
                                  // value={`${dateRange.start} - ${dateRange.end}`}
                                  aria-controls={
                                    open ? "basic-menu" : undefined
                                  }
                                  aria-haspopup="true"
                                  aria-expanded={open ? "true" : undefined}
                                  onClick={handleClick}
                                ></TextField>
                                <Menu
                                  id="basic-menu"
                                  anchorEl={anchorEl}
                                  open={open}
                                  onClose={handleClose}
                                  fullWidth
                                  MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                  }}
                                  style={{ width: "100%" }}
                                >
                                  <MenuItem
                                    onClick={() => {
                                      handleDateSelect("today");
                                    }}
                                    style={{ width: "250px" }}
                                  >
                                    Today
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      handleDateSelect("yesterday");
                                    }}
                                  >
                                    Yesterday
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      handleDateSelect("lastWeek");
                                    }}
                                  >
                                    Last 1 Week
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      handleDateSelect("lastTwoWeeks");
                                    }}
                                  >
                                    Last 2 Week
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      handleDateSelect("lastMonth");
                                    }}
                                  >
                                    Last Month
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      handleDateSelect("custom");
                                    }}
                                  >
                                    Custom Date
                                  </MenuItem>
                                </Menu>
                              </FormControl>

                              {showCustom && (
                                <MyModal>
                                  <ModalContainer
                                    zIndex={1005}
                                    childComponent={
                                      <div
                                        style={{
                                          minWidth: "400px",
                                          width: "auto",
                                        }}
                                      >
                                        <>
                                          <div>
                                            <form>
                                              <p className="text-center ">
                                                Select Custom Date{" "}
                                              </p>
                                              <div className="mt-2">
                                                <label htmlFor="start">
                                                  From
                                                </label>
                                                <input
                                                  className={`form-control ${
                                                    validationErrors.start
                                                      ? "is-invalid"
                                                      : ""
                                                  }`}
                                                  style={{ width: "100%" }}
                                                  type="date"
                                                  id="start"
                                                  onChange={(value) =>
                                                    handleCustomDate(
                                                      value,
                                                      "startDate"
                                                    )
                                                  }
                                                  value={dateRange.start}
                                                  name="trip-start"
                                                  min="2020-01-01"
                                                  max={
                                                    new Date()
                                                      .toISOString()
                                                      .split("T")[0]
                                                  }
                                                />
                                                {validationErrors.start && (
                                                  <div className="invalid-feedback">
                                                    Start date is required.
                                                  </div>
                                                )}
                                              </div>
                                              <div className="mt-2">
                                                <label htmlFor="end">To</label>
                                                <input
                                                  className={`form-control ${
                                                    validationErrors.end
                                                      ? "is-invalid"
                                                      : ""
                                                  }`}
                                                  value={dateRange.end}
                                                  style={{ width: "100%" }}
                                                  type="date"
                                                  id="end"
                                                  onChange={(value) =>
                                                    handleCustomDate(
                                                      value,
                                                      "endDate"
                                                    )
                                                  }
                                                  name="trip-end"
                                                  min="2020-01-01"
                                                  max={
                                                    new Date()
                                                      .toISOString()
                                                      .split("T")[0]
                                                  }
                                                />
                                                {validationErrors.end && (
                                                  <div className="invalid-feedback">
                                                    End date is required.
                                                  </div>
                                                )}
                                              </div>
                                              <div className="d-flex justify-content-end mt-3 ">
                                                <button
                                                  onClick={() => {
                                                    setValidationErrors({
                                                      start: false,
                                                      end: false,
                                                    });
                                                    setshowCustom(false);
                                                  }}
                                                  style={{
                                                    backgroundColor: "#b2261c",
                                                  }}
                                                  className="btn rounded-pill text-white px-4  me-2"
                                                >
                                                  Close
                                                </button>
                                                <button
                                                  onClick={
                                                    handleApplyCustomDate
                                                  }
                                                  // color="primary"
                                                  className="btn rounded-pill text-white px-4"
                                                  style={{
                                                    backgroundColor: "#169C50",
                                                  }}
                                                >
                                                  Apply
                                                </button>
                                              </div>
                                            </form>
                                          </div>
                                        </>
                                      </div>
                                    }
                                  />
                                </MyModal>
                              )}
                            </div>
                            {/* <div className="col-sm-3">
                              {" "}
                              <TextField
                                // className="mt-2"
                                fullWidth
                                label="Job Category"
                                name="jobCategory"
                                placeholder="Job Category"
                                value={formData.jobCategory}
                                onChange={(event) =>
                                  handleFieldChange(
                                    "jobCategory",
                                    event.target.value
                                  )
                                }
                              />
                            </div> */}
                            <div className="col-sm-3">
                              <TextField
                                // className="mt-2"
                                fullWidth
                                label="Email ID"
                                name="emailId"
                                placeholder="Email ID"
                                value={formData.emailId}
                                onChange={(event) =>
                                  handleFieldChange(
                                    "emailId",
                                    event.target.value
                                  )
                                }
                                InputProps={{
                                  onKeyPress: (e) => {
                                    if (e.key === "Enter") {
                                      handleSubmit(e);
                                    }
                                  },
                                }}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-3 ">
                              {" "}
                              <TextField
                                className="mt-3"
                                fullWidth
                                label="Current Position"
                                name="jobrole"
                                placeholder="Current Position"
                                value={formData.jobrole}
                                onChange={(event) =>
                                  handleFieldChange(
                                    "jobrole",
                                    event.target.value
                                  )
                                }
                                InputProps={{
                                  onKeyPress: (e) => {
                                    if (e.key === "Enter") {
                                      handleSubmit(e);
                                    }
                                  },
                                }}
                              />
                            </div>
                            <div className="col-sm-3 mt-3">
                              <TextField
                                // className="mt-3"
                                fullWidth
                                label="Preferred Location"
                                name="preferredJobLocation"
                                placeholder="Preferred Location"
                                value={formData.preferredJobLocation}
                                onChange={(event) =>
                                  handleFieldChange(
                                    "preferredJobLocation",
                                    event.target.value
                                  )
                                }
                                InputProps={{
                                  onKeyPress: (e) => {
                                    if (e.key === "Enter") {
                                      handleSubmit(e);
                                    }
                                  },
                                }}
                              />
                              {/* <Autocomplete
                                id="tags-outlined"
                                options={options.preferredJobLocation.map(
                                  (option) => option
                                )}
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
                                  city: formData.preferredJobLocation
                                    ? formData.preferredJobLocation
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
                            </div>
                            <div className="col-sm-3 mt-3">
                              <TextField
                                // className="mt-3"
                                fullWidth
                                label="Current Location"
                                name="currentLocation"
                                placeholder="Current Location"
                                value={formData.currentLocation}
                                onChange={(event) =>
                                  handleFieldChange(
                                    "currentLocation",
                                    event.target.value
                                  )
                                }
                                InputProps={{
                                  onKeyPress: (e) => {
                                    if (e.key === "Enter") {
                                      handleSubmit(e);
                                    }
                                  },
                                }}
                              />
                              {/* <Autocomplete
                                id="tags-outlined"
                                options={options.currentLocation.map(
                                  (option) => option
                                )}
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
                                  city: formData.currentLocation
                                    ? formData.currentLocation
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
                                      formData.currentLocation &&
                                      formData.currentLocation.val
                                    }
                                  />
                                )}
                              /> */}
                            </div>

                            {/* <div className="col-md-3 mt-3">
                              <TextField
                                onChange={(e) => handleExperienceChange(e)}
                                name="maxExperience"
                                id="maxExperience"
                                className="form-control"
                                select
                                label="Max Experience"
                                value={formData.maxExperience}
                              >
                                {expYearMonth.map((option) => (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </div> */}
                            <div className="col-sm-3 mt-3">
                              {adminList && isSuperAdmin && (
                                <TextField
                                  onChange={(e) => handleAssignToChange(e)}
                                  name="AssignedTo"
                                  id="AssignedTo"
                                  className="form-control"
                                  select
                                  label="Assigned To"
                                  // value={formData.adminId}
                                  defaultValue={formData.adminId}
                                >
                                  <MenuItem value={0}>ALL</MenuItem>
                                  {adminList.map((el) => (
                                    <MenuItem key={el.id} value={el.id}>
                                      {el.userName}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              )}
                            </div>
                          </div>
                          <div className="row mt-3">
                            {/* <div className="col-sm-3">
                              {" "}
                              <TextField
                                // className="mt-3"
                                fullWidth
                                label="Current Location"
                                name="currentLocation"
                                placeholder="Current Location"
                                value={formData.currentLocation}
                                onChange={(event) =>
                                  handleFieldChange(
                                    "currentLocation",
                                    event.target.value
                                  )
                                }
                              />
                            </div> */}
                            <div className="col-md-3 ">
                              {" "}
                              {/* <TextField
                                onChange={(e) => handlejoiningDate(e)}
                                name="joiningDate"
                                id="joiningDate"
                                className="form-control"
                                select
                                label="Joining Status"
                                // value={formData.joiningDate}
                              >
                                {joininstatus.map((option) => (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField> */}
                            </div>
                          </div>

                          <div className="d-flex flex-row gap-2 justify-content-end mt-4">
                            <button
                              className={`rounded-pill ${FBStyle.Filterbutton}`}
                              variant="outlined"
                              onClick={(e) => {
                                handleClear(e);
                              }}
                            >
                              Clear All
                            </button>
                            <button
                              className={`rounded-pill ${FBStyle.search}`}
                              type="submit"
                              variant="contained"
                              sx={{ minWidth: "150px" }}
                            >
                              Search
                            </button>
                          </div>
                        </Stack>
                      </form>
                    </>
                  </div>
                </>
              }
            />
          </MyModal>
        )}
      </div>
    </div>
  );
}

export default MidSeniorsourcingFilter;
