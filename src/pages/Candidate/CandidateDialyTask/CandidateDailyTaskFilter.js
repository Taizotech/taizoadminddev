/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import interviewStyle from "../Candidate interview schedule list/candidateInterviewSchedule.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  CandidateDailyTaskActions,
  CandidateFunnelActions,
} from "../../../redux-store/store";
import { MyModal } from "../../../utility";
import ModalContainer from "../../../components/modal_popup";
import { GetAllsdminDetails } from "../../../apiServices";

function CandidateDailyTaskFilter({ filterType }) {
  const [showFilter, setShowFilter] = useState(false);
  const [showRedDot, setshowRedDot] = useState(false);
  const [showCustom, setshowCustom] = useState(false);

  const [adminDetails, setAdminDetails] = useState();

  const filterName = useSelector(
    (state) => state.CandidateDailyTaskDetails.selectedFilter
  );

  const filterDetails = useSelector(
    (state) => state.CandidateDailyTaskDetails[filterName]
  );

  const create = useSelector(
    (state) => state.CandidateDailyTaskDetails[filterName].startDate
  );
  const ended = useSelector(
    (state) => state.CandidateDailyTaskDetails[filterName].endDate
  );

  useEffect(() => {
    console.log(filterDetails, "filterDetails");
  }, [filterDetails]);

  const [dateRange, setDateRange] = useState({
    start: filterDetails.startDate,
    end: filterDetails.endDate,
    dateFilterType: filterDetails.dateFilterType,
  });
  const [validationErrors, setValidationErrors] = useState({
    start: false,
    end: false,
  });
  const initialValues = {
    adminId: localStorage.getItem("adminID"),
  };
  const [formData, setFormData] = useState(initialValues);
  const Dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (val) => {
    console.log(val);

    setAnchorEl(null);
  };

  function openFilter() {
    setShowFilter(true);
    Dispatch(CandidateDailyTaskActions.setSelectedFilter(filterType));
  }

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

  const handleApply = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      // Your submit logic here
      // Proceed with form submission
      console.log("Form submitted:", dateRange);
      setValidationErrors({
        start: false,
        end: false,
      });
      setshowCustom(false);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    Dispatch(
      CandidateDailyTaskActions.setCandidateDailyTaskFilter({
        filterType: filterType,
        data: {
          ...formData,
        },
      })
    );

    setShowFilter(false);
    // console.log(showFilter, "jhjhsjhdfh");
  };

  function handleClear(e) {
    e.preventDefault();
    // setFormData({
    //   adminId: localStorage.getItem("adminID")
    // });

    setDateRange({
      start: new Date().toISOString().split("T")[0],
      end: new Date().toISOString().split("T")[0],
      dateFilterType: "Today",
    });
    // setShowRedDot(false);
    Dispatch(
      CandidateDailyTaskActions.setCandidateDailyTaskFilter({
        filterType: filterType,
        data: {
          ...initialValues,
          startDate: new Date().toISOString().split("T")[0],
          endDate: new Date().toISOString().split("T")[0],
          dateFilterType: "Today",
        },
      })
    );
  }

  useEffect(() => {
    GetAllsdminDetails().then((res) => {
      console.log(res, "res adminDetails--------------------------------");
      let adminDetails = res.map((el) => {
        return {
          id: el.id,
          label: el.userName,
        };
      });

      setAdminDetails([{ label: "ALL", id: 0 }, ...adminDetails]);
    });
  }, []);

  useEffect(() => {
    console.log(adminDetails, "adminDetails");
  }, [adminDetails]);

  return (
    <>
      <div className="">
        {/* <div>
          <b className="fs-4">Candidate Funnel</b>
        </div> */}

        <div>
          {" "}
          <div variant="contained" onClick={() => openFilter()}>
            <BiFilterAlt />{" "}
          </div>
        </div>
        {showFilter && (
          <MyModal>
            <ModalContainer
              zIndex={1001}
              childComponent={
                <div className={""} style={{ width: "400px" }}>
                  <>
                    <div className="d-flex justify-content-between">
                      <h4 className="text-center mb-2">Filter by</h4>
                      <h3>
                        <span
                          onClick={() => setShowFilter(false)}
                          className="btn btn-outline-danger"
                          style={{ cursor: "pointer", fontSize: 15 }}
                        >
                          <AiOutlineClose />
                        </span>
                      </h3>
                    </div>
                    <div className="">
                      <form
                        onSubmit={(e) => {
                          handleSubmit(e);
                        }}
                      >
                        {" "}
                        <div className="col-sm-12 mt-2">
                          {/* <FormControl variant="outlined" fullWidth>
                            <TextField
                              label="Created on"
                              id="basic-button"
                              value={`${dateRange.dateFilterType}`}
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
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                            >
                              <MenuItem
                                onClick={() => {
                                  handleDateSelect("today");
                                }}
                                selected
                                style={{ width: "400px" }}
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
                          </FormControl> */}
                          {/*  */}
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
                                            <label htmlFor="start">From</label>
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
                                              onClick={handleApply}
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
                        <div className="col-sm-12  mt-3 mb-5">
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Status
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              // value={age}
                              label="Stage"
                              // onChange={handleChange}
                            >
                              <MenuItem value={10}>Candidate Lead</MenuItem>
                              <MenuItem value={20}>FB Meta Lead</MenuItem>
                              <MenuItem value={30}>Register</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl fullWidth sx={{ mt: 2 }}>
                            <Autocomplete
                              fullWidth
                              disablePortal
                              id="combo-box-demo"
                              options={adminDetails}
                              renderInput={(params) => (
                                <TextField {...params} label="Assigned To" />
                              )}
                            />
                          </FormControl>
                        </div>
                        <div className="d-flex flex-row gap-2 justify-content-end mt-2">
                          <button
                            className={`rounded-pill ${interviewStyle.Filterbutton}`}
                            variant="outlined"
                            onClick={(e) => {
                              handleClear(e);
                            }}
                          >
                            Clear All
                          </button>
                          <button
                            className={`rounded-pill ${interviewStyle.search}`}
                            type="submit"
                            variant="contained"
                            sx={{ minWidth: "150px" }}
                          >
                            Search
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
    </>
  );
}

export default CandidateDailyTaskFilter;
