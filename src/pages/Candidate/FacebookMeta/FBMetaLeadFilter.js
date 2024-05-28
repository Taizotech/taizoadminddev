/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useEffect, useRef, useState } from "react";
import FBStyle from "./candidateFacebookMeta.module.scss";
import { BiFilterAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { MyModal, numbersOnlyTest } from "../../../utility";
import ModalContainer from "../../../components/modal_popup";
import { AiOutlineClose, AiOutlinePhone } from "react-icons/ai";
import {
  Autocomplete,
  FormControl,
  Stack,
  TextField,
  MenuItem,
  Menu,
  InputLabel,
  Select,
} from "@mui/material";
import { FBmetaLeadsSliceActions } from "../../../redux-store/store";
import { GetAllsdminDetails, getJobFilterOptions } from "../../../apiServices";
function FBinterviewFilter() {
  const FBmetaListFilter = useSelector(
    (state) => state.FbmetaLeadDetails.FBmetaListFilter
  );
  const FBmetaListFilterRedDot = useSelector(
    (state) => state.FbmetaLeadDetails.refreshRedDot
  );
  const size = useSelector(
    (state) => state.FbmetaLeadDetails.FBmetaListFilter.size
  );
  const create = useSelector(
    (state) => state.FbmetaLeadDetails.FBmetaListFilter.createdTime
  );
  const ended = useSelector(
    (state) => state.FbmetaLeadDetails.FBmetaListFilter.endDate
  );
  const filterDetails = useSelector(
    (state) => state.FbmetaLeadDetails.FBmetaListFilter
  );

  const adminDetails = useSelector((state) => state.adminDetails);

  let isSuperAdmin = adminDetails.roleID == 1;

  const [adminList, setAdminList] = useState([]);

  const initialState = {
    adminId: isSuperAdmin ? 0 : localStorage.getItem("adminID"),
    candidateName: FBmetaListFilter.candidateName,
    mobileNumber: FBmetaListFilter.mobileNumber,
    educationQualification: FBmetaListFilter.educationQualification,
    preferredLocation: FBmetaListFilter.preferredLocation,
    jobCategory: FBmetaListFilter.jobCategory,
    experience: FBmetaListFilter.experience,
    whatsappNumber: FBmetaListFilter.whatsappNumber,
    joiningAvailability: FBmetaListFilter.joiningAvailability,
    notAttend: FBmetaListFilter.notAttend,
    notQualified: FBmetaListFilter.notQualified,
    noStatus: FBmetaListFilter.noStatus,
    followUp: FBmetaListFilter.followUp,
  };
  const [formData, setFormData] = useState(initialState);
  const [options, setOptions] = useState({
    educationQualification: [],
    jobCategory: [],
  });
  const [dateRange, setDateRange] = useState({
    start: filterDetails.createdTime,
    end: filterDetails.endDate,
    dateFilterType: filterDetails.dateFilterType,
  });
  const [showFilter, setShowFilter] = useState(false);
  const [showCustom, setshowCustom] = useState(false);
  const [showRedDot, setShowRedDot] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    start: false,
    end: false,
  });
  const [selectStatus, setSelectStatus] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const firstTextFieldRef = useRef();
  const secondTextFieldRef = useRef();
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

  function handleFieldChange(field, value) {
    switch (field) {
      case "mobileNumber":
        if (numbersOnlyTest(value)) {
          setFormData({ ...formData, [field]: value });
        }
        break;
      case "jobCategory":
        setFormData({ ...formData, [field]: value });
        break;
      case "educationQualification":
        setFormData({ ...formData, [field]: value });
        break;
      case "preferredLocation":
        setFormData({ ...formData, [field]: value });
        break;
      case "joiningAvailability":
        setFormData({ ...formData, [field]: value });
        break;
      case "experience":
        setFormData({ ...formData, [field]: value });
        break;
    }
  }
  const Dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    Dispatch(
      FBmetaLeadsSliceActions.setFBmetaListFilter({
        ...formData,
        createdTime: dateRange.start || create,
        endDate: dateRange.end || ended,
        pages: 1,
        size: size,
        dateFilterType: dateRange.dateFilterType || "",
        notAttend: selectStatus,
        notQualified: selectStatus,
        noStatus: selectStatus,
        followUp: selectStatus,
      })
    );

    const isFilterApplied =
      formData.candidateName ||
      formData.educationQualification ||
      formData.mobileNumber ||
      formData.whatsappNumber ||
      formData.joiningAvailability ||
      formData.adminId ||
      formData.preferredLocation ||
      formData.experience ||
      formData.jobCategory ||
      dateRange.start ||
      dateRange.end;

    Dispatch(
      FBmetaLeadsSliceActions.setFBmetaListFilterRedDot(isFilterApplied)
    );
    setShowFilter(false);
  };
  const handleKeyPress = (e) => {
    // Check if the Enter key is pressed (key code 13)
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  function handleAssignToChange(e) {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, adminId: value }));
  }

  function handleClear(e) {
    e.preventDefault();
    setFormData({
      adminId: isSuperAdmin ? 0 : localStorage.getItem("adminID"),
      candidateName: "",
      mobileNumber: "",
      educationQualification: "",
      jobCategory: "",
      experience: "",
      whatsappNumber: "",
      joiningAvailability: "",
      preferredLocation: "",
      notAttend: "",
      notQualified: "",
      followUp: "",
    });
    // setSelectedValue("");
    setSelectStatus("");
    setDateRange({
      start: null,
      end: null,
      dateFilterType: "",
    });
    setShowRedDot(false);
    Dispatch(
      FBmetaLeadsSliceActions.setFBmetaListFilter({
        ...initialState,
        createdTime: "",
        endDate: "",
        pages: 1,
        size: size,
        dateFilterType: "",
      })
    );
  }
  function handleClickCross(e) {
    e.preventDefault();
    Dispatch(
      FBmetaLeadsSliceActions.setFBmetaListFilter({
        ...formData,
        pages: 1,
        size: size,
        createdTime: create,
        endDate: ended,
        dateFilterType: dateRange.dateFilterType,
      })
    );
    setShowFilter(false);
  }

  useEffect(() => {
    console.log(dateRange, "dataRange");
  }, [dateRange]);
  const salary = [
    {
      value: "fresher",
      label: "Fresher",
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
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setSelectStatus({
  //     ...selectStatus,
  //     [name]: value === "notAttend" || "notQualified" ? true : false,
  //   });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectStatus(value);
  };
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
  }, []);

  const updateJobCategory = (event) => {
    setFormData({ ...formData, jobCategory: event.options });
  };
  const updateQualification = (event) => {
    setFormData({ ...formData, educationQualification: event.options });
  };

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

  return (
    <div>
      <div className="d-flex justify-content-end">
        <button
          className={`rounded-pill d-flex align-items-center ${FBStyle.Filterbutton}`}
          variant="contained"
          onClick={() => setShowFilter(true)}
        >
          <BiFilterAlt />{" "}
          <p
            style={{
              backgroundColor: FBmetaListFilterRedDot ? "red" : "transparent",
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
                          <div className="col-sm-4 mt-3">
                            <TextField
                              id="outlined-basic-1"
                              label="Mobile number"
                              variant="outlined"
                              fullWidth
                              value={formData.mobileNumber}
                              // inputProps={{ maxLenth: 10 }}
                              onChange={(event) =>
                                // event.target.value.length <= 10 &&
                                handleFieldChange(
                                  "mobileNumber",
                                  event.target.value
                                )
                              }
                              inputProps={{ maxLength: 10 }}
                              InputProps={{
                                // onKeyPress: (e) => {
                                //   if (e.key === "Enter") {
                                //     e.preventDefault();
                                //     handleSubmit(e);
                                //   }
                                // },
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
                          <div className="col-sm-4 mt-3">
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
                          <div className="col-sm-4 mt-3">
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
                        </div>
                        <div className="row">
                          <div className="col-sm-4 mt-3">
                            <TextField
                              onChange={(event) =>
                                handleFieldChange(
                                  "experience",
                                  event.target.value
                                )
                              }
                              value={formData.experience}
                              name="experience"
                              id="experience"
                              className="form-control"
                              select
                              label="Experience"
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
                          <div className="col-sm-4 mt-3">
                            <Autocomplete
                              id="tags-outlined"
                              options={options.educationQualification.map(
                                (option) => option
                              )}
                              fullWidth
                              getOptionLabel={(option) => `${option.options}`}
                              // onChange={(event, value) => {
                              //   updateQualification(value);
                              //   console.log(value, "value jobs");
                              // }}
                              onChange={(event, value, reason) => {
                                if (reason === "clear") {
                                  console.log("Selection cleared");
                                  updateQualification("");
                                } else {
                                  updateQualification(value);
                                  console.log(value, "value jobs");
                                }
                              }}
                              value={{
                                options: formData.educationQualification
                                  ? formData.educationQualification
                                  : "",
                                category: "qualification",
                              }}
                              filterSelectedOptions
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Qualification"
                                  placeholder="Qualification"
                                />
                              )}
                            />
                          </div>
                          <div className="col-sm-4 mt-3">
                            <TextField
                              id="outlined-basic-2"
                              label="Preferred City"
                              variant="outlined"
                              fullWidth
                              value={formData.preferredLocation}
                              InputProps={{
                                onKeyPress: (e) => {
                                  if (e.key === "Enter") {
                                    handleSubmit(e);
                                  }
                                },
                              }}
                              onChange={(event) => {
                                //   console.log(event.target.value);
                                handleFieldChange(
                                  "preferredLocation",
                                  event.target.value
                                );
                              }}
                            />
                          </div>

                          <div className="col-sm-4 mt-3">
                            {/* <FormControl component="fieldset">
                              <RadioGroup row aria-label="status" name="status">
                                <FormControlLabel
                                  value={true}
                                  control={<Radio />}
                                  label="Not Attend"
                                  name="notAttend"
                                  checked={selectStatus.notAttend}
                                  onChange={handleChange}
                                />
                                <FormControlLabel
                                  value={true}
                                  control={<Radio />}
                                  label="Not Qualified"
                                  name="notQualified"
                                  checked={selectStatus.notQualified}
                                  onChange={handleChange}
                                />
                              </RadioGroup>
                            </FormControl> */}
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Status
                              </InputLabel>
                              <Select
                                fullWidth
                                value={selectStatus}
                                onChange={handleChange}
                                name=""
                                label="Status"
                                defaultValue={""}
                              >
                                <MenuItem value={"Not Attend"}>
                                  Not Attend
                                </MenuItem>
                                <MenuItem value={"Not Qualifed"}>
                                  Not Qualified
                                </MenuItem>
                                <MenuItem value={"Follow Up"}>
                                  Follow Up
                                </MenuItem>
                                <MenuItem value={"No Status"}>
                                  No Status
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <div className="col-sm-4 mt-3">
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
                                <MenuItem value={0}>ALL</MenuItem>
                                {adminList.map((el) => (
                                  <MenuItem key={el.id} value={el.id}>
                                    {el.userName}
                                  </MenuItem>
                                ))}
                              </TextField>
                            )}
                          </div>
                          {/* <div className="col-sm-3">
                            <FormControl>
                              <Select
                                value={selectStatus.notQualified}
                                onChange={handleChange}
                                name="notQualified"
                              >
                                <MenuItem value="true">Not Qualified</MenuItem>
                              </Select>
                            </FormControl>
                          </div> */}
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
              </>
            }
          />
        </MyModal>
      )}
    </div>
  );
}

export default FBinterviewFilter;
