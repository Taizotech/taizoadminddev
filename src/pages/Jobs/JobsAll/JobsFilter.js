/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobFilterOptions } from "../../../apiServices";
import { MyModal, convertDateYYYYMMDD } from "../../../utility";
import ModalContainer from "../../../components/modal_popup";
import { AiOutlineClose } from "react-icons/ai";
import { BiFilterAlt } from "react-icons/bi";
import FBStyle from "../../Candidate/FacebookMeta/candidateFacebookMeta.module.scss";
import {
  Autocomplete,
  FormControl,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { JobsDetailsActions } from "../../../redux-store/store";
function JobsFilter() {
  const JobFilter = useSelector((state) => state.JobsDetailsDetails.JobsData);
  const JobFilterRedDot = useSelector(
    (state) => state.JobsDetailsDetails.refreshRedDot
  );
  const create = useSelector((state) => state.JobsDetailsDetails.createdTime);
  const ended = useSelector((state) => state.JobsDetailsDetails.endDate);
  const [showFilter, setShowFilter] = useState(false);
  const Dispatch = useDispatch();
  const [adminList, setAdminList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filterOptions, setFilteredOptions] = useState([]);
  const handleOptionChange = (event, values) => {
    console.log(values, "values");
    setSelectedOptions(values);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showCustom, setshowCustom] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [validationErrors, setValidationErrors] = useState({
    start: false,
    end: false,
  });

  const adminDetails = useSelector((state) => state.adminDetails);
  // console.log(adminDetails);

  let initialFilterObj = {
    assignTo: localStorage.getItem("adminID"),
    priority: null,
    companyName: "",
    area: [],
    benefits: [],
    gender: null,
    industry: [],
    jobCategory: [],
    jobExp: -1,
    jobMaxExp: -1,
    jobLocation: [],
    keyskills: [],
    qualification: [],
    employerId: -1,
    salary: -1,
    maxSalary: -1,
    pages: 1,
    size: 10,
    createdTime: "2021-01-01",
    endDate: convertDateYYYYMMDD(new Date()),
    dateFilterType: "",
  };

  // const [formData, setFormData] = useState(initialState);
  const [options, setOptions] = useState({
    industry: [],
    jobCategory: [],
    keyskills: [],
    qualification: [],
    area: [],
    jobLocation: [],
  });

  const [filteredObj, setFilteredObj] = useState({
    assignTo: localStorage.getItem("adminID"),
    priority: JobFilter.priority,
    companyName: JobFilter.companyName,
    area: JobFilter.area,
    benefits: JobFilter.benefits,
    gender: JobFilter.gender,
    industry: JobFilter.industry,
    jobCategory: JobFilter.jobCategory,
    jobExp: JobFilter.jobExp,
    jobMaxExp: JobFilter.jobMaxExp,
    jobLocation: JobFilter.jobLocation,
    keyskills: JobFilter.keyskills,
    qualification: JobFilter.qualification,
    employerId: JobFilter.employerId,
    salary: JobFilter.salary,
    maxSalary: JobFilter.maxSalary,
    pages: JobFilter.pages,
    size: JobFilter.size,
    createdTime: JobFilter.createdTime,
    endDate: JobFilter.endDate,
  });

  const [showRedDot, setShowRedDot] = useState(false);

  const [dateRange, setDateRange] = useState({
    start: JobFilter.createdTime,
    end: JobFilter.endDate,
    dateFilterType: JobFilter.dateFilterType,
  });
  // useEffect(() => {
  //   getJobFilterOptions().then((data) => {
  //     setOptions((prevOptions) => ({
  //       ...prevOptions,
  //       industry: data.filter((el) => el.category == "industry"),
  //       jobCategory: data.filter((el) => el.category == "job category"),
  //       keySkills: data.filter((element) => element.category == "skills"),
  //       jobLocation: data.filter((element) => element.category == "city"),
  //       qualification: data.filter(
  //         (element) => element.category == "qualification"
  //       ),
  //       area: data.filter((element) => element.category == "areas"),
  //     }));
  //   });

  //   GetAllsdminDetails()
  //     .then((data) => {
  //       setAdminList(data);
  //     })
  //     .catch(() => {
  //       alert("Something Went wrong");
  //     });
  // }, []);
  function handleFieldChange(field, value) {
    switch (field) {
      // case "":
      //   if (numbersOnlyTest(value)) {
      //     setFormData({ ...formData, [field]: value });
      //   }
      //   break;
      case "companyName":
        setFilteredObj({ ...filteredObj, [field]: value });
        break;
    }
  }
  useEffect(() => {
    getJobFilterOptions().then((data) => {
      // to get filter options
      // console.log(data);
      setFilteredOptions(data);
    });
  }, []);
  useEffect(() => {
    if (selectedOptions.length !== 0) {
      selectedOptions.forEach((option) => {
        switch (option.category) {
          case "areas":
            setFilteredObj((prev) => {
              let updatedAreas = [...prev.area];

              if (!updatedAreas.includes(option.options)) {
                updatedAreas.push(option.options);
              } else {
                updatedAreas = selectedOptions
                  .filter((el) => el.category === "areas")
                  .map((el) => el.options);
              }

              return { ...prev, area: updatedAreas };
            });
            break;
          case "benefits":
            setFilteredObj((prev) => {
              let updatedBenefits = [...prev.benefits];

              if (!updatedBenefits.includes(option.options)) {
                updatedBenefits.push(option.options);
              } else {
                updatedBenefits = selectedOptions
                  .filter((el) => el.category === "benefits")
                  .map((el) => el.options);
              }

              return { ...prev, benefits: updatedBenefits };
            });
            break;
          case "skills":
            setFilteredObj((prev) => {
              let updatedSkills = [...prev.keyskills];

              if (!updatedSkills.includes(option.options)) {
                updatedSkills.push(option.options);
              } else {
                updatedSkills = selectedOptions
                  .filter((el) => el.category === "skills")
                  .map((el) => el.options);
              }

              return { ...prev, keyskills: updatedSkills };
            });
            break;
          case "qualification":
            setFilteredObj((prev) => {
              let updatedQualifications = [...prev.qualification];

              if (!updatedQualifications.includes(option.options)) {
                updatedQualifications.push(option.options);
              } else {
                updatedQualifications = selectedOptions
                  .filter((el) => el.category === "qualification")
                  .map((el) => el.options);
              }

              return { ...prev, qualification: updatedQualifications };
            });
            break;
          case "industry":
            setFilteredObj((prev) => {
              let updatedIndustries = [...prev.industry];

              if (!updatedIndustries.includes(option.options)) {
                updatedIndustries.push(option.options);
              } else {
                updatedIndustries = selectedOptions
                  .filter((el) => el.category === "industry")
                  .map((el) => el.options);
              }

              return { ...prev, industry: updatedIndustries };
            });
            break;
          case "city":
            setFilteredObj((prev) => {
              let updatedJobLocations = [...prev.jobLocation];

              if (!updatedJobLocations.includes(option.options)) {
                updatedJobLocations.push(option.options);
              } else {
                updatedJobLocations = selectedOptions
                  .filter((el) => el.category === "city")
                  .map((el) => el.options);
              }

              return { ...prev, jobLocation: updatedJobLocations };
            });
            break;
          case "job category":
            setFilteredObj((prev) => {
              let updatedJobCategory = [...prev.jobCategory];

              if (!updatedJobCategory.includes(option.options)) {
                updatedJobCategory.push(option.options);
              } else {
                updatedJobCategory = selectedOptions
                  .filter((el) => el.category === "job category")
                  .map((el) => el.options);
              }

              return { ...prev, jobCategory: updatedJobCategory };
            });

            break;
        }
      });
    }

    // Resetting values if not selected
    let categoryList = selectedOptions.map((el) => el.category);

    if (!categoryList.includes("areas")) {
      setFilteredObj((prev) => ({ ...prev, area: [] }));
    }

    if (!categoryList.includes("benefits")) {
      setFilteredObj((prev) => ({ ...prev, benefits: [] }));
    }

    if (!categoryList.includes("skills")) {
      setFilteredObj((prev) => ({ ...prev, keyskills: [] }));
    }

    if (!categoryList.includes("qualification")) {
      setFilteredObj((prev) => ({ ...prev, qualification: [] }));
    }

    if (!categoryList.includes("industry")) {
      setFilteredObj((prev) => ({ ...prev, industry: [] }));
    }

    if (!categoryList.includes("city")) {
      setFilteredObj((prev) => ({ ...prev, jobLocation: [] }));
    }

    if (!categoryList.includes("job category")) {
      setFilteredObj((prev) => ({ ...prev, jobCategory: [] }));
    }

    // ...
  }, [selectedOptions]);
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
  useEffect(() => {
    console.log(filteredObj);
  }, [filteredObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    Dispatch(
      JobsDetailsActions.setJobsData({
        ...filteredObj,
        createdTime: dateRange.start || create,
        endDate: dateRange.end || ended,
        pages: 1,
        size: JobFilter.size,
        dateFilterType: dateRange.dateFilterType || "",
      })
    );
    const isFilterApplied =
      filteredObj.priority ||
      filteredObj.companyName ||
      filteredObj.area ||
      filteredObj.benefits ||
      filteredObj.gender ||
      filteredObj.industry ||
      filteredObj.jobCategory ||
      filteredObj.jobExp ||
      filteredObj.jobMaxExp ||
      filteredObj.jobLocation ||
      filteredObj.keyskills ||
      filteredObj.qualification ||
      filteredObj.employerId ||
      filteredObj.salary ||
      filteredObj.maxSalary ||
      dateRange.start ||
      dateRange.end;

    Dispatch(JobsDetailsActions.setJobsRedDot(isFilterApplied));
    // if (isFilterApplied) {
    //   setShowRedDot(true);
    // } else {
    //   setShowRedDot(false);
    // }
    setShowFilter(false);
  };
  function handleClear(e) {
    e.preventDefault();

    Dispatch(JobsDetailsActions.setJobsData(initialFilterObj));

    setDateRange({
      start: "2020-01-01",
      end: convertDateYYYYMMDD(new Date()),
      dateFilterType: "",
    });
    setSelectedOptions([]);
    setFilteredObj(initialFilterObj);
    setShowRedDot(false);
    Dispatch(JobsDetailsActions.setJobsRedDot(false));
  }
  function handleClickCross(e) {
    e.preventDefault();
    Dispatch(
      JobsDetailsActions.setJobsData({
        ...filteredObj,
        createdTime: dateRange.start,
        endDate: dateRange.end,
        pages: 1,
        size: JobFilter.size,
        dateFilterType: dateRange.dateFilterType,
      })
    );
    setShowFilter(false);
  }
  const ExpMinandMax = [
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
  const handlePriorityChange = (value, reason) => {
    console.log(value, reason, "valueeeeeeeeeeeeee");
    if (value !== null) {
      setFilteredObj((prev) => ({ ...prev, priority: value }));
    } else {
      setFilteredObj((prev) => ({ ...prev, priority: null }));
    }
  };
  const handleExperienceChange = (e) => {
    const { value, name } = e.target;
    console.log(e);
    console.log(value, name);
    if (name === "minExperience") {
      setFilteredObj((prev) => ({ ...prev, jobExp: value }));
    } else if (name === "maxExperience") {
      setFilteredObj((prev) => ({ ...prev, jobMaxExp: value }));
    }
  };
  const handleSalary = (e) => {
    const { value, id } = e.target;
    // console.log(value, id);
    if (id === "minSalary") {
      if (value != -1) {
        setFilteredObj((prev) => ({ ...prev, salary: value }));
      } else {
        setFilteredObj((prev) => ({ ...prev, salary: -1 }));
      }
    }

    if (id === "maxSalary") {
      if (value != -1) {
        setFilteredObj((prev) => ({ ...prev, maxSalary: value }));
      } else {
        setFilteredObj((prev) => ({ ...prev, maxSalary: -1 }));
      }
    }
  };
  const experienceLabels = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];
  const Gender = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
    // {
    //   value: "Both",
    //   label: "Both",
    // },
  ];
  const handleGenderChange = (e) => {
    const { value, name } = e.target;

    if (name === "Gender") {
      setFilteredObj((prev) => ({ ...prev, gender: value }));
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
              backgroundColor: JobFilterRedDot ? "red" : "transparent",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
            }}
          ></p>
          Filter
        </button>
      </div>
      {showFilter && (
        <MyModal>
          <ModalContainer
            childComponent={
              <>
                {" "}
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
                        {" "}
                        <div className="row">
                          <div className="col-sm-9">
                            {" "}
                            <Autocomplete
                              multiple
                              id="tags-outlined"
                              className=""
                              options={filterOptions.map((option) => option)}
                              getOptionLabel={(option) =>
                                `${option.options} (${option.category})`
                              }
                              value={selectedOptions}
                              filterSelectedOptions
                              onChange={handleOptionChange}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Select Option"
                                  placeholder="Area,City,Industry,Job Category,Benifits,Skills,Qualification"
                                />
                              )}
                            />
                          </div>
                          <div className="col-sm-3">
                            <TextField
                              // className="mt-2"
                              fullWidth
                              label="Company Name"
                              name="companyName"
                              placeholder="Company Name"
                              value={filteredObj.companyName}
                              onChange={(event) =>
                                handleFieldChange(
                                  "companyName",
                                  event.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-3 mt-3">
                            {" "}
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
                          <div className="col-sm-3 mt-3">
                            {" "}
                            <Autocomplete
                              // filterSelectedOptions
                              id="priority"
                              name="priority"
                              disableClearable
                              onChange={(e, value, reason) =>
                                handlePriorityChange(value, reason)
                              } // Pass 'value' directly
                              options={experienceLabels.map(
                                (option) => option.label
                              )}
                              value={filteredObj.priority}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Priority"
                                  InputProps={{
                                    ...params.InputProps,
                                    type: "search",
                                  }}
                                />
                              )}
                            />
                          </div>
                          <div className="col-sm-3 mt-3">
                            {" "}
                            <TextField
                              onChange={(e) => handleExperienceChange(e)}
                              name="minExperience"
                              id="minExperience"
                              className="form-control"
                              select
                              label="Min Experience"
                              value={filteredObj.jobExp}
                            >
                              {ExpMinandMax.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>
                          <div className="col-sm-3 mt-3">
                            <TextField
                              onChange={(e) => handleExperienceChange(e)}
                              name="maxExperience"
                              id="maxExperience"
                              className="form-control"
                              select
                              label="Max Experience"
                              value={filteredObj.jobMaxExp}
                            >
                              {ExpMinandMax.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>
                          <div className="col-sm-3 mt-3">
                            <TextField
                              onChange={(e) => {
                                handleSalary(e);
                              }}
                              value={
                                filteredObj.salary === -1
                                  ? ""
                                  : filteredObj.salary
                              }
                              className="form-control"
                              type="number"
                              id="minSalary"
                              label="Min Salary"
                              variant="outlined"
                              fullWidth
                            />
                          </div>
                          <div className="col-sm-3 mt-3">
                            {" "}
                            <TextField
                              type="number"
                              onChange={(e) => {
                                handleSalary(e);
                              }}
                              value={
                                filteredObj.maxSalary === -1
                                  ? ""
                                  : filteredObj.maxSalary
                              }
                              className="form-control"
                              id="maxSalary"
                              label="Max Salary"
                              variant="outlined"
                              fullWidth
                            />
                          </div>
                          <div className="col-sm-3 mt-3">
                            {" "}
                            <TextField
                              onChange={(e) => handleGenderChange(e)}
                              name="Gender"
                              id="Gender"
                              className="form-control"
                              select
                              label="Gender"
                              value={filteredObj.gender}
                            >
                              {Gender.map((option) => (
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
                        <div className="row"></div>
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

export default JobsFilter;
