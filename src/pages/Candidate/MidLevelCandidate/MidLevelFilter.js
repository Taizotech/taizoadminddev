/* eslint-disable default-case */
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
import { CandidateMidLevelActions } from "../../../redux-store/store";
import { getJobFilterOptions } from "../../../apiServices";
function MidLevelFilter() {
  const [showFilter, setShowFilter] = useState(false);
  const CandidateMidLevel = useSelector(
    (state) => state.CandidateMidLevelDetails.CandidateMidLevelFilter
  );
  const CandidateMidLevelRedDot = useSelector(
    (state) => state.CandidateMidLevelDetails.refreshRedDot
  );
  const Dispatch = useDispatch();
  const pageSize = useSelector(
    (state) => state.CandidateMidLevelDetails.CandidateMidLevelFilter.pageSize
  );
  const create = useSelector(
    (state) =>
      state.CandidateMidLevelDetails.CandidateMidLevelFilter.createdTimeStart
  );
  const ended = useSelector(
    (state) =>
      state.CandidateMidLevelDetails.CandidateMidLevelFilter.createdTimeEnd
  );
  const initialState = {
    educationQualification: CandidateMidLevel.educationQualification,
    jobCategory: CandidateMidLevel.jobCategory,
    experienceInManufacturing: CandidateMidLevel.experienceInManufacturing,
    preferredJobLocation: CandidateMidLevel.preferredJobLocation,
    mobileNumber: CandidateMidLevel.mobileNumber,
    joiningDate: CandidateMidLevel.joiningDate,
    currentlyWorking: CandidateMidLevel.currentlyWorking,
    maxExperience: CandidateMidLevel.maxExperience,
    minExperience: CandidateMidLevel.minExperience,
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
            CandidateMidLevelActions.setCandidateMidLevelFiltermobileNumber(
              value
            )
          );
        }
        break;
      case "educationQualification":
        setFormData({ ...formData, [field]: value });
        break;
      case "jobCategory":
        setFormData({ ...formData, [field]: value });
        break;
    }
  }
  useEffect(() => {
    getJobFilterOptions().then((data) => {
      const cityOptions = data.filter((element) => element.category === "city");

      setOptions((prev) => ({
        ...prev,
        preferredJobLocation: cityOptions,
        //   jobCategory: JobCategoryOptions,
      }));
      console.log(cityOptions);
    });
  }, []);
  const updatePrefferedLocation = (event, value) => {
    // to update cities
    console.log(event, "jhjhjkhjh");
    setFormData({ ...formData, preferredJobLocation: event.options });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Size:", pageSize);
    Dispatch(
      CandidateMidLevelActions.setCandidateMidLevelFilter({
        ...formData,
        createdTimeStart: dateRange.start || create,
        createdTimeEnd: dateRange.end || ended,
        page: 0,
        pageSize: pageSize,
        dateFilterType: dateRange.dateFilterType || "",
      })
    );
    const isFilterApplied =
      formData.currentlyWorking ||
      formData.educationQualification ||
      formData.experienceInManufacturing ||
      formData.jobCategory ||
      formData.joiningDate ||
      formData.maxExperience ||
      formData.minExperience ||
      formData.mobileNumber ||
      formData.preferredJobLocation ||
      dateRange.start ||
      dateRange.end;

    // Show the red dot only if a filter is applied
    Dispatch(
      CandidateMidLevelActions.setCandidateMidLevelRedDot(isFilterApplied)
    );
    setShowFilter(false);
  };
  function handleClear(e) {
    e.preventDefault();
    setFormData({
      currentlyWorking: "",
      educationQualification: "",
      experienceInManufacturing: "",
      jobCategory: "",
      joiningDate: "",
      maxExperience: "",
      minExperience: "",
      mobileNumber: "",
      preferredJobLocation: "",
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
      CandidateMidLevelActions.setCandidateMidLevelFilter({
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
      value: "Immediately",
      label: "Immediately",
    },
    {
      value: "Within 1 month",
      label: "Within 1 month",
    },
    {
      value: "More than 1 month",
      label: "More than 1 month",
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

    if (name === "joiningDate") {
      setFormData((prev) => ({ ...prev, joiningDate: value }));
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
                                label="Qualification"
                                name="educationQualification"
                                placeholder="Qualification"
                                value={formData.educationQualification}
                                onChange={(event) =>
                                  handleFieldChange(
                                    "educationQualification",
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
                            <div className="col-sm-3">
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
                                InputProps={{
                                  onKeyPress: (e) => {
                                    if (e.key === "Enter") {
                                      handleSubmit(e);
                                    }
                                  },
                                }}
                              />
                            </div>
                            <div className="col-sm-3 ">
                              {" "}
                              <TextField
                                onChange={(e) => handleManufacturing(e)}
                                name="experienceInManufacturing"
                                id="experienceInManufacturing"
                                className="form-control"
                                select
                                label="Experience In Manufacturing"
                                value={formData.experienceInManufacturing}
                              >
                                {ManufacturingOptions.map((option) => (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-3 mt-3">
                              <Autocomplete
                                id="tags-outlined"
                                options={options.preferredJobLocation.map(
                                  (option) => option
                                )}
                                getOptionLabel={(option) => `${option.options}`}
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
                                  options: formData.preferredJobLocation
                                    ? formData.preferredJobLocation
                                    : "",
                                  category: "city",
                                }}
                                fullWidth
                                filterSelectedOptions
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Preferred Location"
                                    placeholder="Preferred Location"
                                  />
                                )}
                              />
                            </div>
                            <div className="col-sm-3 mt-3">
                              <TextField
                                onChange={(e) => handleManufacturing(e)}
                                name="currentlyWorking"
                                id="currentlyWorking"
                                className="form-control"
                                select
                                label="Currently Working"
                                value={formData.currentlyWorking}
                              >
                                {ManufacturingOptions.map((option) => (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </div>
                            <div className="col-md-3 mt-3">
                              <TextField
                                onChange={(e) => handleExperienceChange(e)}
                                name="minExperience"
                                id="minExperience"
                                className="form-control"
                                select
                                label="Min Experience"
                                value={formData.minExperience}
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
                            </div>
                            <div className="col-md-3 mt-3">
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
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-md-3 ">
                              {" "}
                              <TextField
                                onChange={(e) => handlejoiningDate(e)}
                                name="joiningDate"
                                id="joiningDate"
                                className="form-control"
                                select
                                label="Joining Status"
                                value={formData.joiningDate}
                              >
                                {joininstatus.map((option) => (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
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

export default MidLevelFilter;
