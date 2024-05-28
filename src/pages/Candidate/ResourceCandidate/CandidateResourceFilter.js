/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React from "react";
import { useState, useEffect } from "react";

import { AiOutlineClose, AiOutlinePhone } from "react-icons/ai";
import { BiFilterAlt } from "react-icons/bi";
import { MyModal, convertDateYYYYMMDD } from "../../../utility";
import ModalContainer from "../../../components/modal_popup";
import { useDispatch, useSelector } from "react-redux";
import FBStyle from "../FacebookMeta/candidateFacebookMeta.module.scss";
import registercandidatestyle from "../CandidateRegistered/RegisteredCandidate.module.scss";
import {
  GetAllsdminDetails,
  GetITICourses,
  GetPGCourses,
  GetUGCourses,
  GetdiplomaCourses,
  getJobFilterOptions,
} from "../../../apiServices";
import { CandidateRegisteredActions } from "../../../redux-store/store";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { FormControl, Menu } from "@material-ui/core";

function CandidateResourceFilter() {
  const Dispatch = useDispatch();
  const filterDetails = useSelector(
    (state) => state.CandidateRegistered.filterData
  );
  const [showFilter, setShowFilter] = useState(false);

  const [adminList, setAdminList] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showCustom, setshowCustom] = useState(false);

  const open = Boolean(anchorEl);
  const handleDateClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [validationErrors, setValidationErrors] = useState({
    start: false,
    end: false,
  });

  const adminDetails = useSelector((state) => state.adminDetails);
  // console.log(adminDetails);

  let isSuperAdmin = adminDetails.roleID == 1;

  let initialFilterObj = {
    adminId: isSuperAdmin ? -1 : localStorage.getItem("adminID"),
    mobileNumber: "",
    gender: "Both",
    industry: [],
    jobCategory: [],
    eligibility: null,
    qualification: [],
    candidateType: null,
    specification: [],
    skills: [],
    prefLocation: [],
    passed_out_year: -1,
    experience: -1,
    maxExperience: -1,
    pages: 1,
    size: 10,
    createdTime: "2020-01-01",
    endDate: convertDateYYYYMMDD(new Date()),
    dateFilterType: "",
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const [formData, setFormData] = useState(initialState);
  const [options, setOptions] = useState({
    Industries: [],
    Jobrole: [],
    keySkills: [],
    Qualification: [],
    specification: [],
    prefLocation: [],
  });

  const [filteredObj, setFilteredObj] = useState({
    adminId: isSuperAdmin ? -1 : localStorage.getItem("adminID"),
    mobileNumber: filterDetails.mobileNumber,
    gender: filterDetails.gender,
    industry: filterDetails.industry,
    jobCategory: filterDetails.jobCategory,
    eligibility: filterDetails.eligibility,
    qualification: filterDetails.qualification,
    candidateType: null,
    specification: filterDetails.specification,
    skills: filterDetails.skills,
    prefLocation: filterDetails.prefLocation,
    passed_out_year: -1,
    experience: filterDetails.experience,
    maxExperience: filterDetails.maxExperience,
    pages: filterDetails.pages,
    size: filterDetails.size,
    createdTime: filterDetails.createdTime,
    endDate: filterDetails.endDate,
  });

  const [showRedDot, setShowRedDot] = useState(false);

  const [dateRange, setDateRange] = useState({
    start: filterDetails.createdTime,
    end: filterDetails.endDate,
    dateFilterType: filterDetails.dateFilterType,
  });

  function prefillMultiSelection(type) {
    let array2 = [];
    let array1 = [];
    switch (type) {
      case "keySkills":
        array2 = [...options.keySkills];
        array1 = [...filterDetails.skills];

        break;

      case "qualification":
        array2 = [...options.Qualification];
        array1 = [...filterDetails.qualification];
        break;

      case "prefLocation":
        array2 = [...options.prefLocation];
        array1 = [...filterDetails.prefLocation];
        break;

      case "industry":
        array2 = [...options.industry];
        array1 = [...filterDetails.industry];
        break;

      case "jobCategory":
        array2 = [...options.Jobrole];
        array1 = [...filterDetails.jobCategory];

        break;

      case "specification":
        array2 = [...options.specification];
        array1 = [...filterDetails.specification];
        break;

      default:
        break;
    }
    if (type != "specification") {
      const filteredArray = array2.filter((item) =>
        array1.includes(item.options)
      );
      // console.log(filteredArray, array1, array2, "filteredArray");
      return filteredArray;
    } else {
      const filteredArray = array2.filter((item) =>
        array1.includes(item.courses)
      );

      return filteredArray;
    }
  }

  useEffect(() => {
    getJobFilterOptions().then((data) => {
      setOptions((prevOptions) => ({
        ...prevOptions,
        Industries: data.filter((el) => el.category == "industry"),
        Jobrole: data.filter((el) => el.category == "job category"),
        keySkills: data.filter((element) => element.category == "skills"),
        prefLocation: data.filter((element) => element.category == "city"),
        Qualification: data.filter(
          (element) => element.category == "qualification"
        ),
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

  useEffect(() => {
    const apiPromises = [
      GetITICourses(),
      GetdiplomaCourses(),
      GetUGCourses(),
      GetPGCourses(),
    ];
    Promise.all(apiPromises)
      .then((results) => {
        const specificationData = results.map((data) => data.results).flat();

        setOptions((prevOptions) => ({
          ...prevOptions,
          specification: specificationData,
        }));
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error fetching and mapping data:", error);
      });
  }, []);

  const handleCandidateIDChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const withoutExponential = value.replace(/[eE]/g, "");
    const truncatedValue = withoutExponential.slice(0, 10);
    // setCandidateidnum(truncatedValue);
    setFilteredObj((prev) => ({ ...prev, mobileNumber: truncatedValue }));
  };

  // const updateIndustry = (value) => {
  //   // to update industry
  //   if (!value.length == 0) {
  //     value.forEach((element) => {
  //       setFilteredObj((prev) => {
  //         let updatedIndustry = [...prev.industry];

  //         if (!updatedIndustry.includes(element.options)) {
  //           updatedIndustry.push(element.options);
  //         } else {
  //           updatedIndustry = value
  //             .filter((el) => el.category === "industry")
  //             .map((el) => el.options);
  //         }

  //         return { ...prev, industry: updatedIndustry };
  //       });
  //     });
  //   } else {
  //     setFilteredObj((prev) => ({ ...prev, industry: [] }));
  //   }
  // };

  const updateJobCategory = (value) => {
    // to update job category
    if (!value.length == 0) {
      value.forEach((element) => {
        setFilteredObj((prev) => {
          let updatedcategory = [...prev.jobCategory];

          if (!updatedcategory.includes(element)) {
            // updatedcategory.push(element.options);
            updatedcategory.push(element);
          } else {
            updatedcategory = value.filter(
              (el) => el.category === "job category"
            );
            // .map((el) => el.options);
          }

          return { ...prev, jobCategory: updatedcategory };
        });
      });
    } else {
      setFilteredObj((prev) => ({ ...prev, jobCategory: [] }));
    }
  };

  const updateSkills = (value) => {
    // to update skills
    if (!value.length == 0) {
      value.forEach((element) => {
        setFilteredObj((prev) => {
          let updateskills = [...prev.skills];

          if (!updateskills.includes(element)) {
            updateskills.push(element);
          } else {
            updateskills = value.filter((el) => el.category === "skills");
            // .map((el) => el.options);
          }

          return { ...prev, skills: updateskills };
        });
      });
    } else {
      setFilteredObj((prev) => ({ ...prev, skills: [] }));
    }
  };

  const updateCity = (value) => {
    // to update cities
    if (!value.length == 0) {
      value.forEach((element) => {
        setFilteredObj((prev) => {
          let updateCity = [...prev.prefLocation];

          if (!updateCity.includes(element)) {
            updateCity.push(element);
          } else {
            updateCity = value.filter((el) => el.category === "city");
            // .map((el) => el.options);
          }

          return { ...prev, prefLocation: updateCity };
        });
      });
    } else {
      setFilteredObj((prev) => ({ ...prev, prefLocation: [] }));
    }
  };

  const updatequalification = (value) => {
    // to update qualification
    if (!value.length == 0) {
      value.forEach((element) => {
        setFilteredObj((prev) => {
          let updateQualification = [...prev.qualification];

          if (!updateQualification.includes(element)) {
            updateQualification.push(element);
          } else {
            updateQualification = value.filter(
              (el) => el.category === "qualification"
            );
            // .map((el) => el.options);
          }

          return { ...prev, qualification: updateQualification };
        });
      });
    } else {
      setFilteredObj((prev) => ({ ...prev, qualification: [] }));
    }
  };
  const handleSpecification = (value) => {
    if (!value.length == 0) {
      value.forEach((element) => {
        setFilteredObj((prev) => {
          let updateSpecialization = [...prev.specification];

          if (!updateSpecialization.includes(element)) {
            updateSpecialization.push(element);
          }

          return { ...prev, specification: updateSpecialization };
        });
      });
    } else {
      setFilteredObj((prev) => ({ ...prev, specification: [] }));
    }
  };

  const handleEligiblityChange = (e) => {
    const { value, name } = e.target;

    if (name === "eligiblity") {
      setFilteredObj((prev) => ({ ...prev, eligibility: value }));
    }
  };

  const handleGenderChange = (e) => {
    const { value, name } = e.target;

    if (name === "Gender") {
      setFilteredObj((prev) => ({ ...prev, gender: value }));
    }
  };

  const handleAssignToChange = (e) => {
    const { value, name } = e.target;
    console.log(value, name);

    setFilteredObj((prev) => ({ ...prev, adminId: value }));
  };

  const Eligiblity = [
    {
      value: "Qualified",
      label: "Qualified",
    },
    {
      value: "Not qualified",
      label: "Not qualified",
    },
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
    {
      value: "Both",
      label: "Both",
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
  const handleExperienceChange = (e) => {
    const { value, name } = e.target;

    if (name === "experience") {
      setFilteredObj((prev) => ({ ...prev, experience: value }));
    } else if (name === "maxExperience") {
      setFilteredObj((prev) => ({ ...prev, maxExperience: value }));
    }
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

  const handleApplyDate = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      // Your submit logic here
      // Proceed with form submission

      setValidationErrors({
        start: false,
        end: false,
      });
      setshowCustom(false); // Close the modal or perform other actions
    }
  };
  function handleClickCross(e) {
    e.preventDefault();
    postFilter();
  }

  function postFilter() {
    Dispatch(
      CandidateRegisteredActions.setRegisterCandidateListFilter({
        ...filteredObj,
        createdTime: dateRange.start,
        endDate: dateRange.end,
        dateFilterType: dateRange.dateFilterType,
      })
    );

    setShowFilter(false);
  }

  useEffect(() => {
    // List of keys to be removed
    const keysToRemove = ["pages", "size", "endDate"];

    let filterObject = { ...filterDetails };
    let initialFilterObject = { ...initialFilterObj };

    // Remove keys from the object
    keysToRemove.forEach((key) => delete filterObject[key]);
    keysToRemove.forEach((key) => delete initialFilterObject[key]);

    if (JSON.stringify(filterObject) != JSON.stringify(initialFilterObject)) {
      setShowRedDot(true);
    } else {
      setShowRedDot(false);
    }
  }, [filterDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();

    postFilter();
  };
  function onClearFilter(e) {
    // e.preventDefault();
    Dispatch(
      CandidateRegisteredActions.setRegisterCandidateListFilter(
        initialFilterObj
      )
    );

    setDateRange({
      start: "2020-01-01",
      end: convertDateYYYYMMDD(new Date()),
      dateFilterType: "",
    });
    setFilteredObj(initialFilterObj);
    setShowRedDot(false);
  }
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
              backgroundColor: showRedDot ? "red" : "transparent",
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
                <div className={`${registercandidatestyle.BoxContainerWidth}`}>
                  <form
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    <>
                      <div className="row">
                        <div className="col-md-3 mt-1 mt-sm-0">
                          <TextField
                            id="outlined-basic"
                            label="Mobile number"
                            variant="outlined"
                            fullWidth
                            value={filteredObj.mobileNumber}
                            defaultValue={filterDetails.mobileNumber}
                            onChange={handleCandidateIDChange}
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
                        {/* <div className="col-md-3 mt-1 mt-sm-0">
                          <Autocomplete
                            limitTags={1}
                            name="industries"
                            multiple
                            id="tags-outlined"
                            onChange={(event, value) => {
                              updateIndustry(value);
                            }}
                            options={(options.Industries || []).map(
                              (option) => option
                            )}
                            getOptionLabel={(option) => `${option.options}`}
                            filterSelectedOptions
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Job industries"
                                placeholder="Favorites"
                              />
                            )}
                          />
                        </div> */}
                        <div className="col-md-3 mt-1 mt-sm-0">
                          <FormControl variant="outlined" fullWidth>
                            <TextField
                              label="Registered on"
                              id="basic-button"
                              value={`${dateRange.dateFilterType}`}
                              // value={`${dateRange.start} - ${dateRange.end}`}
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleDateClick}
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
                                              onClick={handleApplyDate}
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
                        <div className="col-md-3 mt-1 mt-sm-0">
                          <Autocomplete
                            limitTags={1}
                            multiple
                            id="tags-outlined"
                            // options={candiOptions.Industries}
                            onChange={(event, value) => {
                              updateJobCategory(value);
                            }}
                            options={(options.Jobrole || []).map(
                              (option) => option
                            )}
                            getOptionLabel={(option) => `${option.options}`}
                            value={filteredObj.jobCategory}
                            defaultValue={prefillMultiSelection("jobCategory")}
                            filterSelectedOptions
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Job category"
                                placeholder="Favorites"
                              />
                            )}
                          />
                        </div>
                        <div className="col-md-3 mt-1 mt-sm-0">
                          <Autocomplete
                            limitTags={1}
                            multiple
                            id="tags-outlined"
                            options={(options.keySkills || []).map(
                              (option) => option
                            )}
                            getOptionLabel={(option) => `${option.options}`}
                            onChange={(event, value) => {
                              updateSkills(value);
                            }}
                            value={filteredObj.skills}
                            defaultValue={prefillMultiSelection("keySkills")}
                            filterSelectedOptions
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="key skill"
                                placeholder="Favorites"
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-3 mt-1 mt-sm-0">
                          <Autocomplete
                            limitTags={1}
                            multiple
                            id="tags-outlined"
                            options={(options.Qualification || []).map(
                              (option) => option
                            )}
                            getOptionLabel={(option) => `${option.options}`}
                            filterSelectedOptions
                            onChange={(event, value) => {
                              updatequalification(value);
                            }}
                            value={filteredObj.qualification}
                            defaultValue={prefillMultiSelection(
                              "qualification"
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Qualification"
                                placeholder="Qualification"
                              />
                            )}
                          />
                        </div>
                        <div className="col-md-3 mt-1 mt-sm-0">
                          {" "}
                          <Autocomplete
                            limitTags={1}
                            multiple
                            id="tags-outlined"
                            options={options.specification}
                            getOptionLabel={(option) => option.courses}
                            filterSelectedOptions
                            onChange={(event, value) => {
                              handleSpecification(value);
                            }}
                            value={filteredObj.specification}
                            defaultValue={prefillMultiSelection(
                              "specification"
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Specialization"
                                placeholder="specialization"
                              />
                            )}
                          />
                        </div>
                        <div className="col-md-3 mt-1 mt-sm-0">
                          <Autocomplete
                            limitTags={1}
                            multiple
                            id="tags-outlined"
                            options={(options.prefLocation || []).map(
                              (option) => option
                            )}
                            getOptionLabel={(option) => `${option.options}`}
                            onChange={(event, value) => {
                              updateCity(value);
                            }}
                            value={filteredObj.prefLocation}
                            defaultValue={prefillMultiSelection("prefLocation")}
                            filterSelectedOptions
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="City"
                                placeholder="Favorites"
                              />
                            )}
                          />
                        </div>
                        <div className="col-md-3 mt-1 mt-sm-0">
                          <TextField
                            onChange={(e) => handleEligiblityChange(e)}
                            name="eligiblity"
                            id="eligiblity"
                            className="form-control"
                            select
                            label="Status"
                            value={filteredObj.eligibility}
                          >
                            {Eligiblity.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-3 mt-1 mt-sm-0">
                          <TextField
                            onChange={(e) => handleExperienceChange(e)}
                            name="experience"
                            id="experience"
                            className="form-control"
                            select
                            label="Min Experience"
                            value={filteredObj.experience}
                          >
                            {expYearMonth.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                        <div className="col-md-3 mt-1 mt-sm-0">
                          <TextField
                            onChange={(e) => handleExperienceChange(e)}
                            name="maxExperience"
                            id="maxExperience"
                            className="form-control"
                            select
                            label="Max Experience"
                            value={filteredObj.maxExperience}
                          >
                            {expYearMonth.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                        <div className="col-md-3 mt-1 mt-sm-0">
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
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                        <div className="col-md-3 mt-1 mt-sm-0">
                          {adminList && isSuperAdmin && (
                            <TextField
                              onChange={(e) => handleAssignToChange(e)}
                              name="AssignedTo"
                              id="AssignedTo"
                              className="form-control"
                              select
                              label="Assigned To"
                              // value={filteredObj.adminId}
                              defaultValue={filteredObj.adminId}
                            >
                              <MenuItem value={-1}>ALL</MenuItem>
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
                          type="button"
                          onClick={(e) => {
                            onClearFilter(e);
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
                    </>
                  </form>
                </div>
              </>
            }
          />
        </MyModal>
      )}
    </div>
  );
}

export default CandidateResourceFilter;
