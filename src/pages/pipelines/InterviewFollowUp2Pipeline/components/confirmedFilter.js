import {
  Autocomplete,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlinePhone } from "react-icons/ai";
import {
  GetAllsdminDetails,
  getJobFilterOptions,
} from "../../../../apiServices";
import {
  MyModal,
  addDaysToDate,
  addOneyear,
  convertDateYYYYMMDD,
  dateFormate,
  modifyDate,
} from "../../../../utility";
import ModalContainer from "../../../../components/modal_popup";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { CandidatePipelineActions } from "../../../../redux-store/store";
import { useSelector } from "react-redux";

function Confirmed1Filter({ onclose }) {
  let filterDetails = useSelector(
    (state) => state.CandidatePipelineDetails.followUp2Confirmed
  );

  const [filterData, setFilterData] = useState({
    mobileNumber: filterDetails.mobileNumber,
    assignTo: filterDetails.assignTo,
    profilePageNo: filterDetails.profilePageNo,
    fromSource: filterDetails.fromSource,
    followupStatus: filterDetails.followupStatus,
    currentStatus: filterDetails.currentStatus,
    jobCategory: filterDetails.jobCategory,
    dateFilterType: filterDetails.dateFilterType,
    interviewDateFilterType: filterDetails.interviewDateFilterType,
    expYearsMax: filterDetails.expYearsMax,
    expYearsMin: filterDetails.expYearsMin,
    // createdTimeStart: filterDetails.createdTimeStart,
    // createdTimeEnd: filterDetails.createdTimeEnd,
    page: 0,
    // pipelineStage: "Interview Scheduled",
    stages: 13,
    startDate: dateFormate(modifyDate("sub", 7)),
    endDate: dateFormate(new Date()),
  });

  const [adminList, setAdminList] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [showCustom, setshowCustom] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    start: false,
    end: false,
  });
  const [interviewDate, setinterviewDate] = React.useState(null);
  const opeinterviewDaten = Boolean(interviewDate);
  const handleinterviewDateClick = (event) => {
    setinterviewDate(event.currentTarget);
  };
  const [showCustom1, setshowCustom1] = useState(false);

  const [validationErrors1, setValidationErrors1] = useState({
    start: false,
    end: false,
  });
  const experience = [
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
    {
      value: "12",
      label: "12",
    },
    {
      value: "13",
      label: "13",
    },
    {
      value: "14",
      label: "14",
    },
    {
      value: "15+",
      label: "15+",
    },
  ];
  function addOneDate(date) {
    let dateValue = new Date(date);
    dateValue.setDate(dateValue.getDate() + 1);
    return convertDateYYYYMMDD(dateValue);
  }
  const Dispatch = useDispatch();

  // function handleCustomDate(value, type) {
  //   const val = value.target.value;

  //   if (type === "startDate") {
  //     setFilterData((prev) => ({
  //       ...prev,
  //       createdTimeStart: val,
  //       dateFilterType: "custom",
  //     }));
  //     setValidationErrors((prev) => ({
  //       ...prev,
  //       start: false,
  //     }));
  //   } else {
  //     setFilterData((prev) => ({
  //       ...prev,
  //       createdTimeEnd: val,
  //       dateFilterType: "custom",
  //     }));
  //     setValidationErrors((prev) => ({
  //       ...prev,
  //       end: false,
  //     }));
  //   }
  // }
  function handleCustomDate(value, type) {
    const val = value.target.value;

    if (type === "startDate") {
      setFilterData((prev) => ({
        ...prev,
        createdTimeStart: val,
        dateFilterType: "custom",
      }));
      setValidationErrors((prev) => ({
        ...prev,
        start: false,
      }));
    } else {
      const endDate = new Date(val);
      endDate.setDate(endDate.getDate() + 1);
      setFilterData((prev) => ({
        ...prev,
        createdTimeEnd: val,
        dateFilterType: "custom",
      }));
      setValidationErrors((prev) => ({
        ...prev,
        end: false,
      }));
    }
  }
  function handleCustomDate1(value, type) {
    const val = value.target.value;

    if (type === "startDate") {
      setFilterData((prev) => ({
        ...prev,
        followup2ConfirmedStart: val,
        interviewDateFilterType: "custom",
      }));
      setValidationErrors((prev) => ({
        ...prev,
        start: false,
      }));
    } else {
      const endDate = new Date(val);
      endDate.setDate(endDate.getDate() + 1);
      setFilterData((prev) => ({
        ...prev,
        followup2ConfirmedEnd: val,
        interviewDateFilterType: "custom",
      }));
      setValidationErrors((prev) => ({
        ...prev,
        end: false,
      }));
    }
  }

  const isFormValid = () => {
    const isValid =
      (filterData.createdTimeStart || filterData.followup2ConfirmedStart) &&
      (filterData.createdTimeEnd || filterData.followup2ConfirmedEnd);

    if (!(filterData.createdTimeStart || filterData.followup2ConfirmedStart)) {
      setValidationErrors((prev) => ({
        ...prev,
        start: true,
      }));
      setValidationErrors1((prev) => ({
        ...prev,
        start: true,
      }));
    }

    if (!(filterData.createdTimeEnd || filterData.followup2ConfirmedEnd)) {
      setValidationErrors((prev) => ({
        ...prev,
        end: true,
      }));
      setValidationErrors1((prev) => ({
        ...prev,
        end: true,
      }));
    }

    return isValid;
  };
  const handleApplyCustomDate = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      // console.log("Form submitted:", dateRange);
      setValidationErrors({
        start: false,
        end: false,
      });
      setshowCustom(false);
    }
  };
  const handleApplyCustomDate1 = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      // console.log("Form submitted:", dateRange);
      setValidationErrors({
        start: false,
        end: false,
      });
      setValidationErrors1({
        start: false,
        end: false,
      });
      setshowCustom(false);
      setshowCustom1(false);
    }
  };

  const handleClose = (val) => {
    console.log(val);

    setAnchorEl(null);
  };

  const handleClose1 = (val) => {
    console.log(val);

    setinterviewDate(null);
  };

  const [options, setOptions] = useState({
    jobCategory: [],
  });

  const handleDateSelect = (val) => {
    let selectedOption = val;
    const today = new Date();
    let endDate = new Date();
    // endDate.setDate(endDate.getDate() + 1);
    if (selectedOption === "lastWeek") {
      const startDate = new Date();

      startDate.setDate(today.getDate() - 7);
      setFilterData((prev) => ({
        ...prev,
        dateFilterType: "Last 1 Week",
        createdTimeStart: startDate.toISOString().split("T")[0],
        createdTimeEnd: endDate.toISOString().split("T")[0],
      }));
      setAnchorEl(null);
    } else if (selectedOption === "today") {
      setFilterData((prev) => ({
        ...prev,
        dateFilterType: "Today",
        createdTimeStart: today.toISOString().split("T")[0],
        createdTimeEnd: endDate.toISOString().split("T")[0],
      }));
      setAnchorEl(null);
    } else if (selectedOption === "lastMonth") {
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);

      setFilterData((prev) => ({
        ...prev,
        dateFilterType: "Last Month",
        createdTimeStart: startDate.toISOString().split("T")[0],
        createdTimeEnd: endDate.toISOString().split("T")[0],
      }));
      setAnchorEl(null);
    } else if (selectedOption === "lastTwoWeeks") {
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 13);

      setFilterData((prev) => ({
        ...prev,
        dateFilterType: "Last 2 Week",
        createdTimeStart: startDate.toISOString().split("T")[0],
        createdTimeEnd: endDate.toISOString().split("T")[0],
      }));
      setAnchorEl(null);
    } else if (selectedOption === "yesterday") {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 1);

      setFilterData((prev) => ({
        ...prev,
        dateFilterType: "Yesterday",
        createdTimeStart: startDate.toISOString().split("T")[0],
        createdTimeEnd: endDate.toISOString().split("T")[0],
      }));
      setAnchorEl(null);
    } else if (selectedOption === "custom") {
      setshowCustom(true);
      setAnchorEl(null);
    }
  };
  const handleInterviewDateSelect = (val) => {
    let selectedOption = val;
    const today = new Date();
    let endDate = new Date();
    // endDate.setDate(endDate.getDate() + 1);
    if (selectedOption === "lastWeek") {
      const startDate = new Date();

      startDate.setDate(today.getDate() - 7);
      setFilterData((prev) => ({
        ...prev,
        interviewDateFilterType: "Last 1 Week",
        followup2ConfirmedStart: startDate.toISOString().split("T")[0],
        followup2ConfirmedEnd: endDate.toISOString().split("T")[0],
      }));
      setinterviewDate(null);
    } else if (selectedOption === "today") {
      setFilterData((prev) => ({
        ...prev,
        interviewDateFilterType: "Today",
        followup2ConfirmedStart: today.toISOString().split("T")[0],
        followup2ConfirmedEnd: endDate.toISOString().split("T")[0],
      }));
      setinterviewDate(null);
    } else if (selectedOption === "lastMonth") {
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);

      setFilterData((prev) => ({
        ...prev,
        interviewDateFilterType: "Last Month",
        followup2ConfirmedStart: startDate.toISOString().split("T")[0],
        followup2ConfirmedEnd: endDate.toISOString().split("T")[0],
      }));
      setinterviewDate(null);
    } else if (selectedOption === "lastTwoWeeks") {
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 13);

      setFilterData((prev) => ({
        ...prev,
        interviewDateFilterType: "Last 2 Week",
        followup2ConfirmedStart: startDate.toISOString().split("T")[0],
        followup2ConfirmedEnd: endDate.toISOString().split("T")[0],
      }));
      setinterviewDate(null);
    } else if (selectedOption === "yesterday") {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 1);

      setFilterData((prev) => ({
        ...prev,
        interviewDateFilterType: "Yesterday",
        followup2ConfirmedStart: startDate.toISOString().split("T")[0],
        followup2ConfirmedEnd: endDate.toISOString().split("T")[0],
      }));
      setinterviewDate(null);
    } else if (selectedOption === "custom") {
      setshowCustom1(true);
      setinterviewDate(null);
    }
  };

  useEffect(() => {
    getJobFilterOptions().then((data) => {
      setOptions((prev) => ({
        ...prev,
        jobCategory: data
          .filter((el) => el.category == "job category")
          .map((el) => el.options),
      }));
    });
    GetAllsdminDetails()
      .then((data) => {
        console.log(data);
        const activeAdmins = data.filter((item) => !item.Deactived);
        setAdminList(activeAdmins);
      })
      .catch(() => {
        alert("Something Went wrong");
      });
  }, []);

  function handleFieldChange(field, value) {
    switch (field) {
      case "mobileNumber":
        // Check if the value is numeric before updating the state
        if (/^\d*$/.test(value) || value === "") {
          setFilterData((prev) => ({ ...prev, [field]: value }));
        }
        break;

      default:
        setFilterData((prev) => ({ ...prev, [field]: value }));
        break;
    }
  }

  useEffect(() => {
    Dispatch(CandidatePipelineActions.setFollowUp2Confirmed(filterData));
  }, [filterData]);

  function handleSubmit() {
    Dispatch(CandidatePipelineActions.setFollowUp2Confirmed(filterData));
    onclose();
    // console.log(CandidatePipelineActions.setFollowUp2Confirmed(filterData));
  }

  function clearAllFilter() {
    setFilterData({
      mobileNumber: -1,
      assignTo: localStorage.getItem("adminID"),
      profilePageNo: -1,
      fromSource: "",
      jobCategory: "",
      currentStatus: "",
      dateFilterType: "",
      interviewDateFilterType: "",
      // createdTimeStart: "2020-01-01",
      // createdTimeEnd: dateFormate(addDaysToDate(1)),
      expYearsMax: -1,
      expYearsMin: -1,
      page: "",
      followupStatus: -1,
      // pipelineStage: "Interview Scheduled",
      stages: 13,
      startDate: dateFormate(modifyDate("sub", 7)),
      endDate: dateFormate(new Date()),
    });
  }

  useEffect(() => {
    // console.log(filterDetails);
  }, [filterDetails]);

  return (
    <div
      style={{
        width: "70vw",
      }}
    >
      <div className="d-flex justify-content-between ">
        <span>
          <p>
            <b>Interview Follow Up Filter</b>{" "}
          </p>
        </span>
        <span
          onClick={() => {
            onclose();
          }}
          className="btn btn-danger"
          style={{ cursor: "pointer" }}
        >
          <AiOutlineClose style={{ fontSize: "20px" }} />
        </span>
        {/* <span
          onClick={() => {
            onclose();
          }}
        >
          <IoMdClose />
        </span> */}
      </div>
      <div className="row my-3 ">
        <div className="col-sm-4">
          <TextField
            id="outlined-basic"
            label="Mobile number"
            variant="outlined"
            fullWidth
            value={filterData.mobileNumber == -1 ? "" : filterData.mobileNumber}
            onChange={(event) =>
              handleFieldChange("mobileNumber", event.target.value)
            }
            inputProps={{ maxLength: 15 }}
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
        <div className="col-sm-4">
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Created on"
              id="basic-button"
              value={`${filterData.dateFilterType}`}
              // value={`${dateRange.start} - ${dateRange.end}`}
              aria-controls={open ? "basic-menu" : undefined}
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
              // style={{ width: "100%" }}
            >
              <MenuItem
                onClick={() => {
                  handleDateSelect("today");
                }}
                style={{ width: "300px" }}
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
                          <p className="text-center ">Select Custom Date </p>
                          <div className="mt-2">
                            <label htmlFor="start">From</label>
                            <input
                              className={`form-control ${
                                validationErrors.start ? "is-invalid" : ""
                              }`}
                              style={{ width: "100%" }}
                              type="date"
                              id="start"
                              onChange={(value) =>
                                handleCustomDate(value, "startDate")
                              }
                              value={filterData.createdTimeStart}
                              name="trip-start"
                              min="2020-01-01"
                              max={new Date().toISOString().split("T")[0]}
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
                                validationErrors.end ? "is-invalid" : ""
                              }`}
                              value={filterData.createdTimeEnd}
                              style={{ width: "100%" }}
                              type="date"
                              id="end"
                              onChange={(value) =>
                                handleCustomDate(value, "endDate")
                              }
                              name="trip-end"
                              min="2020-01-01"
                              max={new Date().toISOString().split("T")[0]}
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
                              onClick={handleApplyCustomDate}
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
        <div className="col-sm-4">
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Interview Date"
              id="basic-button"
              value={`${filterData.interviewDateFilterType}`}
              // value={`${dateRange.start} - ${dateRange.end}`}
              aria-controls={opeinterviewDaten ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={opeinterviewDaten ? "true" : undefined}
              onClick={handleinterviewDateClick}
            ></TextField>
            <Menu
              id="basic-menu"
              anchorEl={interviewDate}
              open={opeinterviewDaten}
              onClose={handleClose1}
              fullWidth
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              // style={{ width: "100%" }}
            >
              <MenuItem
                onClick={() => {
                  handleInterviewDateSelect("today");
                }}
                style={{ width: "300px" }}
              >
                Today
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleInterviewDateSelect("yesterday");
                }}
              >
                Yesterday
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleInterviewDateSelect("lastWeek");
                }}
              >
                Last 1 Week
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleInterviewDateSelect("lastTwoWeeks");
                }}
              >
                Last 2 Week
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleInterviewDateSelect("lastMonth");
                }}
              >
                Last Month
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleInterviewDateSelect("custom");
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
                          <p className="text-center ">Select Custom Date </p>
                          <div className="mt-2">
                            <label htmlFor="start">From</label>
                            <input
                              className={`form-control ${
                                validationErrors1.start ? "is-invalid" : ""
                              }`}
                              style={{ width: "100%" }}
                              type="date"
                              id="start"
                              onChange={(value) =>
                                handleCustomDate1(value, "startDate")
                              }
                              value={filterData.followup2ConfirmedStart}
                              name="trip-start"
                              min="2020-01-01"
                              max={new Date().toISOString().split("T")[0]}
                            />
                            {validationErrors1.start && (
                              <div className="invalid-feedback">
                                Start date is required.
                              </div>
                            )}
                          </div>
                          <div className="mt-2">
                            <label htmlFor="end">To</label>
                            <input
                              className={`form-control ${
                                validationErrors1.end ? "is-invalid" : ""
                              }`}
                              value={filterData.followup2ConfirmedEnd}
                              style={{ width: "100%" }}
                              type="date"
                              id="end"
                              onChange={(value) =>
                                handleCustomDate1(value, "endDate")
                              }
                              name="trip-end"
                              min="2020-01-01"
                              max={new Date().toISOString().split("T")[0]}
                            />
                            {validationErrors1.end && (
                              <div className="invalid-feedback">
                                End date is required.
                              </div>
                            )}
                          </div>
                          <div className="d-flex justify-content-end mt-3 ">
                            <button
                              onClick={() => {
                                setValidationErrors1({
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
                              onClick={handleApplyCustomDate1}
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
      </div>
      <div className="row my-3 ">
        <div className="col-sm-4">
          <TextField
            onChange={(e) => handleFieldChange("assignTo", e.target.value)}
            name="AssignedTo"
            id="AssignedTo"
            className="form-control"
            select
            label="Assigned To"
            value={filterData.assignTo}
            defaultValue={filterData.assignTo}
          >
            <MenuItem value={-1}>ALL</MenuItem>
            {adminList.map((el) => (
              <MenuItem key={el.id} value={el.id}>
                {el.userName}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-sm-4">
          <FormControl fullWidth>
            <InputLabel id="select-label">Source</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              label="Select option"
              value={filterData.fromSource}
              onChange={(event) =>
                handleFieldChange("fromSource", event.target.value)
              }
              // onChange={(e) => HandleCanlead(e, "fromSource")}
            >
              <MenuItem value={""}>ALL</MenuItem>
              <MenuItem value="Retention">Retention</MenuItem>
              <MenuItem value="Reference">Reference</MenuItem>
              <MenuItem value="Whatsapp">Whatsapp</MenuItem>
              <MenuItem value="App">App</MenuItem>
              <MenuItem value="Meta lead">Meta lead</MenuItem>
              <MenuItem value="Naukri">Naukri</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-sm-4">
          <Autocomplete
            id="tags-outlined"
            options={options.jobCategory.map((option) => option)}
            fullWidth
            getOptionLabel={(option) => option}
            // onChange={(event, value) => {
            //   updateJobCategory(value);
            //   console.log(value, "value jobs");
            // }}

            value={filterData.jobCategory}
            onChange={(event, value, reason) => {
              if (reason === "clear") {
                handleFieldChange("jobCategory", "");
              } else {
                handleFieldChange("jobCategory", value);
              }
            }}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Job category"
                placeholder="Job category"
              />
            )}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-sm-4">
          <TextField
            onChange={(event) =>
              handleFieldChange("expYearsMin", event.target.value)
            }
            value={filterData.expYearsMin}
            name="experience"
            id="experience"
            className="form-control"
            select
            label="Min experience"
          >
            {experience.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-sm-4">
          <TextField
            onChange={(event) =>
              handleFieldChange("expYearsMax", event.target.value)
            }
            value={filterData.expYearsMax}
            name="experience"
            id="experience"
            className="form-control"
            select
            label="Max experience"
          >
            {experience.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
      <div className="d-flex justify-content-end flex-row">
        <button onClick={clearAllFilter} className="btn btn-danger mx-2">
          Clear
        </button>
        <button onClick={handleSubmit} className="btn btn-success">
          Submit
        </button>
      </div>
    </div>
  );
}

export default Confirmed1Filter;
