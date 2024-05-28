/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import interviewStyle from "../Candidate interview schedule list/candidateInterviewSchedule.module.scss";
import { BiFilterAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { MyModal, numbersOnlyTest } from "../../../utility";
import { GetAllsdminDetails } from "../../../apiServices";
import ModalContainer from "../../../components/modal_popup";
import { AiOutlineClose, AiOutlinePhone } from "react-icons/ai";
import { FormControl, Menu, MenuItem, Stack, TextField } from "@mui/material";
import { CandidateJoinedListActions } from "../../../redux-store/store";
function CandidateJoinedFilter() {
  const adminDetails = useSelector((state) => state.adminDetails);
  let isSuperAdmin = adminDetails.roleID == 1;
  const JoinedList = useSelector(
    (state) => state.CandidateJoinedListDetails.CandidateJoinedFilter
  );
  const JoinedListRedDot = useSelector(
    (state) => state.CandidateJoinedListDetails.refreshRedDot
  );
  const size = useSelector(
    (state) => state.CandidateJoinedListDetails.CandidateJoinedFilter.size
  );
  const create = useSelector(
    (state) =>
      state.CandidateJoinedListDetails.CandidateJoinedFilter.createdTime
  );
  const ended = useSelector(
    (state) => state.CandidateJoinedListDetails.CandidateJoinedFilter.endDate
  );
  const joinedOn = useSelector(
    (state) => state.CandidateJoinedListDetails.CandidateJoinedFilter.joinedOn
  );
  const joinedEnd = useSelector(
    (state) => state.CandidateJoinedListDetails.CandidateJoinedFilter.joinedEnd
  );
  const initialValues = {
    adminId: isSuperAdmin ? 0 : localStorage.getItem("adminID"),
    companyName: JoinedList.companyName,
    contactNumber: JoinedList.contactNumber,
    leftTheCompany: JoinedList.leftTheCompany,
  };
  const Dispatch = useDispatch();
  const [formData, setFormData] = useState(initialValues);
  const [adminList, setAdminList] = useState([]);
  const [showRedDot, setShowRedDot] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showCustom, setshowCustom] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    start: false,
    end: false,
  });
  const open = Boolean(anchorEl);
  const [dateRange, setDateRange] = useState({
    start: JoinedList.joinedOn,
    end: JoinedList.joinedEnd,
    dateFilterType: JoinedList.dateFilterType,
  });

  useEffect(() => {}, [formData]);
  function handleFieldChange(field, value) {
    switch (field) {
      case "contactNumber":
        if (numbersOnlyTest(value) && value.length <= 10) {
          setFormData({ ...formData, [field]: value });
          console.log(value);
        }
        break;
      case "companyName":
        setFormData({ ...formData, [field]: value });
        break;
      case "leftTheCompany":
        setFormData({ ...formData, [field]: value });
        console.log(value, "leftTheCompany");
        break;
      default:
        break;
    }
  }
  const handleAssignToChange = (e) => {
    const { value, name } = e.target;
    console.log(value, name);

    setFormData((prev) => ({ ...prev, adminId: value }));
  };
  useEffect(() => {
    GetAllsdminDetails()
      .then((data) => {
        const activeAdmins = data.filter((item) => !item.Deactived);
        setAdminList(activeAdmins);
      })
      .catch(() => {
        alert("Something Went wrong");
      });
  }, []);

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
      console.log("Form submitted:", dateRange);
      setValidationErrors({
        start: false,
        end: false,
      });
      setshowCustom(false);
    }
  };
  function handleClickCross(e) {
    e.preventDefault();
    Dispatch(
      CandidateJoinedListActions.setJoinedFilter({
        ...formData,
        page: 1,
        size: size,
        // createdTime: create,
        // endDate: ended,
        joinedOn: joinedOn,
        joinedEnd: joinedEnd,
        dateFilterType: dateRange.dateFilterType,
      })
    );
    // setShowRedDot(false);
    setShowFilter(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    Dispatch(
      CandidateJoinedListActions.setJoinedFilter({
        ...formData,
        page: 1,
        size: size,
        joinedOn: dateRange.start || joinedOn,
        joinedEnd: dateRange.end || joinedEnd,
        dateFilterType: dateRange.dateFilterType || "",
      })
    );

    const isFilterApplied = JoinedList.contactNumber || JoinedList.companyName;

    Dispatch(CandidateJoinedListActions.setJoinedFilterRedDot(isFilterApplied));

    setShowFilter(false);
  };
  function handleClear(e) {
    e.preventDefault();
    setFormData({
      adminId: isSuperAdmin ? 0 : localStorage.getItem("adminID"),
      contactNumber: "",
      companyName: "",
      leftTheCompany: false,
    });
    setDateRange({
      start: null,
      end: null,
      dateFilterType: "",
    });
    setShowRedDot(false);
    Dispatch(
      CandidateJoinedListActions.setJoinedFilter({
        ...initialValues,
        joinedOn: null,
        joinedEnd: null,
        page: 1,
        size: size,
        dateFilterType: "",
      })
    );
  }
  const InterviewStatus = [
    {
      value: true,
      label: "Left Company",
    },
  ];
  return (
    <div>
      <div className="d-flex justify-content-end">
        <button
          className={`rounded-pill d-flex align-items-center ${interviewStyle.Filterbutton}`}
          variant="contained"
          onClick={() => setShowFilter(true)}
        >
          <BiFilterAlt />{" "}
          <p
            style={{
              backgroundColor: JoinedListRedDot ? "red" : "transparent",
              width: "10px",
              height: "10px",
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
              <div className={`${interviewStyle.BoxContainerWidth}`}>
                <>
                  <div className="d-flex justify-content-between">
                    <h4 className="text-center mb-2">Filter by</h4>
                    <h3>
                      <span
                        onClick={handleClickCross}
                        className="btn btn-outline-danger"
                        style={{ cursor: "pointer", fontSize: 15 }}
                      >
                        <AiOutlineClose />
                      </span>
                    </h3>
                  </div>

                  <form
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    <Stack className="mt-1">
                      <div className="row">
                        <div className="col-sm-4">
                          <TextField
                            id="outlined-basic"
                            label="Mobile number"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={formData.contactNumber}
                            onChange={(event) =>
                              handleFieldChange(
                                "contactNumber",
                                event.target.value
                              )
                            }
                            InputProps={{
                              startAdornment: (
                                <span
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <AiOutlinePhone
                                    style={{ marginRight: "5px" }}
                                  />{" "}
                                  +91
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
                                style={{ width: "210px" }}
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
                        <div className="col-sm-4">
                          <TextField
                            id="outlined-basic"
                            label="Company name"
                            variant="outlined"
                            fullWidth
                            value={formData.companyName}
                            onChange={(event) =>
                              handleFieldChange(
                                "companyName",
                                event.target.value
                              )
                            }
                          />
                        </div>
                        <div className="row mt-3">
                          <div className="col-sm-4">
                            {" "}
                            <TextField
                              id="interviewStatus"
                              name="interviewStatus"
                              label="Status"
                              // className="mt-2"
                              select
                              value={formData.leftTheCompany}
                              fullWidth
                              onChange={(event) =>
                                handleFieldChange(
                                  "leftTheCompany",
                                  event.target.value
                                )
                              }
                            >
                              {InterviewStatus.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>
                          <div className="col-sm-4">
                            {adminList && isSuperAdmin && (
                              <TextField
                                onChange={(e) => handleAssignToChange(e)}
                                name="AssignedTo"
                                id="AssignedTo"
                                className="form-control"
                                select
                                fullWidth
                                label="Assigned To"
                                value={formData.adminId}
                                defaultValue={formData.adminId}
                              >
                                <MenuItem value={0} selected>
                                  ALL
                                </MenuItem>
                                {adminList.map((el) => (
                                  <MenuItem key={el.id} value={el.id}>
                                    {el.userName}
                                  </MenuItem>
                                ))}
                              </TextField>
                            )}
                          </div>
                        </div>
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
                          {/* {!formData.loading && !formData.completed && "Search"}

                          {
                            formData.loading && (
                              <div className="spinner-border spinner-border-sm text-light"></div>
                            ) // Add spinner here
                          }
                          {formData.completed && "Submitted"} */}
                        </button>
                      </div>
                    </Stack>
                  </form>
                </>
              </div>
            }
          />
        </MyModal>
      )}
    </div>
  );
}

export default CandidateJoinedFilter;
