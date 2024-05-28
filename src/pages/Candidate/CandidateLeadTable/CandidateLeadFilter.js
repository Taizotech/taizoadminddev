/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React from "react";
import { MyModal, numbersOnlyTest } from "../../../utility";
import ModalContainer from "../../../components/modal_popup";
import { useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import FBStyle from "../FacebookMeta/candidateFacebookMeta.module.scss";
import { AiOutlineClose, AiOutlinePhone } from "react-icons/ai";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetAllsdminDetails, getJobFilterOptions } from "../../../apiServices";
import { useEffect } from "react";
import { CandidateLeadActions } from "../../../redux-store/store";
function CandidateLeadFilter() {
  const CandidateLeadFilterlist = useSelector(
    (state) => state.CandidateLeadTable.CandidateLeadFilter
  );
  const CandidateLeadFilterDetails = useSelector(
    (state) => state.CandidateLeadTable.CandidateLeadFilter
  );
  const CandidateLeadFilterRedDot = useSelector(
    (state) => state.CandidateLeadTable.refreshRedDot
  );
  const started = useSelector(
    (state) => state.CandidateLeadTable.CandidateLeadFilter.createdTime
  );
  const ended = useSelector(
    (state) => state.CandidateLeadTable.CandidateLeadFilter.endDate
  );
  const size = useSelector(
    (state) => state.CandidateLeadTable.CandidateLeadFilter.size
  );
  const adminDetails = useSelector((state) => state.adminDetails);
  // console.log(adminDetails);

  let isSuperAdmin = adminDetails.roleID == 1;
  const Dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);
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
    let endDate = new Date();
    // endDate.setDate(endDate.getDate() + 1);
    if (selectedOption === "lastWeek") {
      const startDate = new Date();

      startDate.setDate(today.getDate() - 7);
      setDateRange((prev) => ({
        ...prev,
        dateFilterType: "Last 1 Week",
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
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);

      setDateRange((prev) => ({
        ...prev,
        dateFilterType: "Last Month",
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      }));
      setAnchorEl(null);
    } else if (selectedOption === "lastTwoWeeks") {
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 13);

      setDateRange((prev) => ({
        ...prev,
        dateFilterType: "Last 2 Week",
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      }));
      setAnchorEl(null);
    } else if (selectedOption === "yesterday") {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 1);

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

  const initialState = {
    adminId: isSuperAdmin ? "null" : localStorage.getItem("adminID"),
    profilePageNo: CandidateLeadFilterlist.profilePageNo,
    mobileNumber: CandidateLeadFilterlist.mobileNumber,
    fromSource: CandidateLeadFilterlist.fromSource,
    jobCategory: CandidateLeadFilterlist.jobCategory,
    status: CandidateLeadFilterlist.status,
    maxExperience: CandidateLeadFilterlist.maxExperience,
    expYears: CandidateLeadFilterlist.expYears,
  };
  const [adminList, setAdminList] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [dateRange, setDateRange] = useState({
    start: CandidateLeadFilterDetails.createdTime,
    end: CandidateLeadFilterDetails.endDate,
    dateFilterType: CandidateLeadFilterDetails.dateFilterType,
  });
  const [options, setOptions] = useState({
    educationQualification: [],
    jobCategory: [],
  });

  useEffect(() => {
    getJobFilterOptions().then((data) => {
      setOptions((prev) => ({
        ...prev,
        jobCategory: data.filter((el) => el.category == "job category"),
        educationQualification: data
          .filter((element) => element.category == "qualification")
          .filter((_, index) => index !== 1),
      }));
    });
    GetAllsdminDetails()
      .then((data) => {
        const activeAdmins = data.filter((item) => !item.Deactived);
        setAdminList(activeAdmins);
      })
      .catch(() => {
        alert("Something Went wrong");
      });
  }, []);
  const updateJobCategory = (event, value) => {
    setFormData({ ...formData, jobCategory: event.options });
  };
  const handleAssignToChange = (e) => {
    const { value, name } = e.target;
    console.log(value, name);

    setFormData((prev) => ({ ...prev, adminId: value }));
  };
  const salary = [
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
  function handleClickCross(e) {
    e.preventDefault();
    Dispatch(
      CandidateLeadActions.setCandidateLeadFilter({
        ...formData,
        page: 1,
        size: size,
        createdTime: started,
        endDate: ended,
        dateFilterType: dateRange.dateFilterType,
      })
    );
    setShowRedDot(false);
    setShowFilter(false);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    Dispatch(
      CandidateLeadActions.setCandidateLeadFilter({
        ...formData,
        createdTime: dateRange.start || started,
        endDate: dateRange.end || ended,
        page: 1,
        size: size,
        dateFilterType: dateRange.dateFilterType || "",
      })
    );
    const isFilterApplied =
      formData.profilePageNo ||
      formData.mobileNumber ||
      formData.fromSource ||
      formData.jobCategory ||
      formData.status ||
      formData.maxExperience ||
      formData.expYears ||
      dateRange.start ||
      dateRange.end;

    Dispatch(
      CandidateLeadActions.setCandidateLeadFilterRedDot(isFilterApplied)
    );
    setShowFilter(false);
  };
  function handleClear(e) {
    e.preventDefault();
    setFormData({
      adminId: isSuperAdmin ? "null" : localStorage.getItem("adminID"),
      profilePageNo: "",
      mobileNumber: "",
      fromSource: "",
      jobCategory: "",
      status: "",
      maxExperience: "",
      expYears: "",
    });
    // setSelectedValue("");
    setDateRange({
      start: null,
      end: null,
      dateFilterType: "",
    });
    setShowRedDot(false);
    Dispatch(
      CandidateLeadActions.setCandidateLeadFilter({
        ...initialState,
        createdTime: "",
        endDate: null,
        page: 1,
        size: size,
        dateFilterType: "",
      })
    );
  }
  function handleFieldChange(field, value) {
    switch (field) {
      case "mobileNumber":
        if (numbersOnlyTest(value)) {
          setFormData({ ...formData, [field]: value });
        }
        break;
      case "fromSource":
        setFormData({ ...formData, [field]: value });
        break;
      case "profilePageNo":
        setFormData({ ...formData, [field]: value });
        break;
      case "status":
        setFormData({ ...formData, [field]: value });
        break;
      case "expYears":
        setFormData({ ...formData, [field]: value });
        break;
      case "maxExperience":
        setFormData({ ...formData, [field]: value });
        break;
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
  const handleApplyCustomDate = (e) => {
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
  return (
    <div>
      <div className="d-flex justify-content-end">
        <button
          className={`rounded-pill d-flex align-items-center ${FBStyle.Filterbutton}`}
          variant="contained"
          onClick={() => setShowFilter(true)}
        >
          <BiFilterAlt />
          <p
            style={{
              backgroundColor: CandidateLeadFilterRedDot
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
            childComponent={
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
                              id="outlined-basic"
                              label="Mobile number"
                              variant="outlined"
                              fullWidth
                              value={formData.mobileNumber}
                              onChange={(event) =>
                                handleFieldChange(
                                  "mobileNumber",
                                  event.target.value
                                )
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
                                    <AiOutlinePhone
                                      style={{ marginRight: "5px" }}
                                    />{" "}
                                    +91
                                  </span>
                                ),
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
                                style={{ width: "100%" }}
                              >
                                <MenuItem
                                  onClick={() => {
                                    handleDateSelect("today");
                                  }}
                                  style={{ width: "180px" }}
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
                          <div className="col-sm-3">
                            <Autocomplete
                              id="tags-outlined"
                              options={options.jobCategory.map(
                                (option) => option
                              )}
                              fullWidth
                              getOptionLabel={(option) => `${option.options}`}
                              // onChange={(event, value) => {
                              //   updateJobCategory(value);
                              //   console.log(value, "value jobs");
                              // }}
                              onChange={(event, value, reason) => {
                                if (reason === "clear") {
                                  console.log("Selection cleared");
                                  updateJobCategory("");
                                } else {
                                  updateJobCategory(value);
                                  console.log(value, "value jobs");
                                }
                              }}
                              value={{
                                options: formData.jobCategory
                                  ? formData.jobCategory
                                  : "",
                                category: "job category",
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
                          <div className="col-sm-3">
                            <FormControl fullWidth>
                              <InputLabel id="select-label">Source</InputLabel>
                              <Select
                                labelId="select-label"
                                id="select"
                                label="Select option"
                                value={formData.fromSource}
                                onChange={(event) =>
                                  handleFieldChange(
                                    "fromSource",
                                    event.target.value
                                  )
                                }
                                // onChange={(e) => HandleCanlead(e, "fromSource")}
                              >
                                <MenuItem value="fromAdmin">Admin</MenuItem>
                                <MenuItem value="fromWA">Whatsapp</MenuItem>
                                <MenuItem value="fromFbMetaLeadAd">
                                  FB Meta Lead's
                                </MenuItem>
                                <MenuItem value="fromNaukri">
                                Naukri
                                </MenuItem>
                                <MenuItem value="fromRetention">
                                Retention
                                </MenuItem>
                                <MenuItem value="fromApp">App</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-sm-3">
                            <TextField
                              onChange={(event) =>
                                handleFieldChange(
                                  "expYears",
                                  event.target.value
                                )
                              }
                              value={formData.expYears}
                              name="experience"
                              id="experience"
                              className="form-control"
                              select
                              label="Min experience"
                            >
                              {salary.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>
                          <div className="col-sm-3">
                            <TextField
                              onChange={(event) =>
                                handleFieldChange(
                                  "maxExperience",
                                  event.target.value
                                )
                              }
                              value={formData.maxExperience}
                              name="experience"
                              id="experience"
                              className="form-control"
                              select
                              label="Max experience"
                            >
                              {salary.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>
                          <div className="col-sm-3">
                            <TextField
                              fullWidth
                              label="Stage"
                              id="fullWidth"
                              placeholder="Stage"
                              type="number"
                              name="profileNo"
                              value={formData.profilePageNo}
                              onChange={(event) =>
                                handleFieldChange(
                                  "profilePageNo",
                                  event.target.value
                                )
                              }
                            />
                          </div>
                          <div className="col-sm-3">
                            <FormControl fullWidth>
                              <InputLabel id="select-label">Status</InputLabel>
                              <Select
                                labelId="select-label"
                                id="select"
                                label="Select option"
                                value={formData.status}
                                onChange={(event) =>
                                  handleFieldChange(
                                    "status",
                                    event.target.value
                                  )
                                }
                              >
                                <MenuItem value="Qualified">Qualified</MenuItem>
                                <MenuItem value="NotQualified">
                                  Not Qualified
                                </MenuItem>
                                <MenuItem value="CallNotAttend">
                                  Not Attend
                                </MenuItem>
                                {/* <MenuItem value="followup">Follow Up</MenuItem> */}
                                <MenuItem value="nostatus">No Status</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-sm-3">
                            {adminList && isSuperAdmin && (
                              <TextField
                                onChange={(e) => handleAssignToChange(e)}
                                name="AssignedTo"
                                id="AssignedTo"
                                className="form-control"
                                select
                                label="Assigned To"
                                value={formData.adminId}
                                defaultValue={formData.adminId}
                              >
                                <MenuItem value={"null"}>ALL</MenuItem>
                                {adminList.map((el) => (
                                  <MenuItem key={el.id} value={el.id}>
                                    {el.userName}
                                  </MenuItem>
                                ))}
                              </TextField>
                            )}
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
  );
}

export default CandidateLeadFilter;
