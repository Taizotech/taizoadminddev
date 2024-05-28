/* eslint-disable default-case */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlinePhone } from "react-icons/ai";
import FBStyle from "../../Candidate/FacebookMeta/candidateFacebookMeta.module.scss";
import { EmployerRegisterActions } from "../../../redux-store/store";
import {
  Autocomplete,
  FormControl,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import ModalContainer from "../../../components/modal_popup";
import { MyModal, numbersOnlyTest } from "../../../utility";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "rsuite";
import { BiFilterAlt } from "react-icons/bi";
import { getJobFilterOptions } from "../../../apiServices";
function EmployerRegisterFilter() {
  const EmployerRegisterFilter = useSelector(
    (state) => state.EmployerRegisterDetails.EmployerRegisterFilter
  );
  const EmployerRegisterFilterRedDot = useSelector(
    (state) => state.EmployerRegisterDetails.refreshRedDot
  );
  const size = useSelector(
    (state) => state.EmployerRegisterDetails.EmployerRegisterFilter.size
  );
  const create = useSelector(
    (state) => state.EmployerRegisterDetails.EmployerRegisterFilter.createdTime
  );
  const ended = useSelector(
    (state) => state.EmployerRegisterDetails.EmployerRegisterFilter.endDate
  );
  const [showFilter, setShowFilter] = useState(false);
  const [showRedDot, setShowRedDot] = useState(false);
  const initialState = {
    companyName: EmployerRegisterFilter.companyName,
    contactNumber: EmployerRegisterFilter.contactNumber,
    industry: EmployerRegisterFilter.industry,
    city: EmployerRegisterFilter.city,
    area: EmployerRegisterFilter.area,
    createdTime: EmployerRegisterFilter.createdTime,
    endDate: EmployerRegisterFilter.endDate,
  };
  const [formData, setFormData] = useState(initialState);
  const Dispatch = useDispatch();
  const [options, setOptions] = useState({
    city: [],
    area: [],
    industry: [],
  });
  const [dateRange, setDateRange] = useState({
    start: EmployerRegisterFilter.createdTime,
    end: EmployerRegisterFilter.endDate,
    dateFilterType: EmployerRegisterFilter.dateFilterType,
  });
  const [showCustom, setshowCustom] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    start: false,
    end: false,
  });

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
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  useEffect(() => {
    getJobFilterOptions().then((data) => {
      const IndustryOptions = data.filter((el) => el.category == "industry");
      const cityOptions = data.filter((element) => element.category === "city");
      const areaOptions = data.filter(
        (element) => element.category === "areas"
      );
      setOptions((prev) => ({
        ...prev,
        city: cityOptions,
        area: areaOptions,
        industry: IndustryOptions,
        //   jobCategory: JobCategoryOptions,
      }));
      console.log(IndustryOptions);
    });
  }, []);
  const updateArea = (event) => {
    // to update cities
    console.log(event, "jhjhjkhjh");
    setFormData({ ...formData, area: event });
  };
  const updateCity = (event) => {
    // to update cities
    console.log(event, "jhjhjkhjh");
    setFormData({ ...formData, city: event.options });
  };
  const updateIndustry = (event) => {
    // to update cities
    console.log(event, "jhjhjkhjh");
    setFormData({ ...formData, industry: event.options });
  };

  function handleFieldChange(field, value) {
    switch (field) {
      case "contactNumber":
        if (numbersOnlyTest(value)) {
          setFormData({ ...formData, [field]: value });
        }
        break;
      case "companyName":
        setFormData({ ...formData, [field]: value });
        break;
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    Dispatch(
      EmployerRegisterActions.setEmployerRegisterFilter({
        ...formData,
        createdTime: dateRange.start || create,
        endDate: dateRange.end || ended,
        page: 1,
        size: size,
        dateFilterType: dateRange.dateFilterType || "",
      })
    );
    const isFilterApplied =
      formData.area ||
      formData.city ||
      formData.companyName ||
      formData.contactNumber ||
      formData.industry ||
      dateRange.start ||
      dateRange.end;

    Dispatch(
      EmployerRegisterActions.setEmployerRegisterRedDot(isFilterApplied)
    );
    // if (isFilterApplied) {
    //   setShowRedDot(true);
    // } else {
    //   setShowRedDot(false);
    // }
    setShowFilter(false);
    // setDateRange({ start: "", end: "" });
  };
  function handleClear(e) {
    e.preventDefault();
    setFormData({
      companyName: "",
      contactNumber: "",
      industry: "",
      city: "",
      area: "",
      createdTime: "",
      endDate: "",
    });
    // setSelectedValue("");
    setDateRange({
      start: null,
      end: null,
      dateFilterType: "",
    });
    setShowRedDot(false);

    Dispatch(
      EmployerRegisterActions.setEmployerRegisterFilter({
        ...initialState,
        createdTime: "",
        endDate: "",
        page: 1,
        size: size,
        dateFilterType: "",
      })
    );
  }
  function handleClickCross(e) {
    e.preventDefault();
    Dispatch(
      EmployerRegisterActions.setEmployerRegisterFilter({
        ...formData,
        page: 1,
        size: size,
        createdTime: create,
        endDate: ended,
        dateFilterType: dateRange.dateFilterType,
      })
    );
    setShowFilter(false);
  }
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
              backgroundColor: EmployerRegisterFilterRedDot
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
                              id="outlined-basic"
                              label="Mobile number"
                              variant="outlined"
                              fullWidth
                              value={formData.contactNumber}
                              // inputProps={{ maxLenth: 10 }}
                              onChange={(event) =>
                                handleFieldChange(
                                  "contactNumber",
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
                          <div className="col-sm-4 mt-3">
                            <TextField
                              fullWidth
                              label="Company Name"
                              name="companyName"
                              placeholder="Company Name"
                              value={formData.companyName}
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
                          <div className="col-sm-4 mt-3">
                            <Autocomplete
                              name="industries"
                              id="tags-outlined"
                              onChange={(event, value, reason) => {
                                if (reason === "clear") {
                                  console.log("Selection cleared");
                                  updateIndustry("");
                                } else {
                                  updateIndustry(value);
                                  console.log(value, "value jobs");
                                }
                              }}
                              options={options.industry.map((option) => option)}
                              getOptionLabel={(option) => `${option.options}`}
                              filterSelectedOptions
                              value={{
                                options: formData.industry
                                  ? formData.industry
                                  : "",
                                category: "industry",
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Industry"
                                  placeholder="Industry"
                                />
                              )}
                            />
                          </div>
                          <div className="col-sm-4 mt-3">
                            {" "}
                            <Autocomplete
                              id="tags-outlined"
                              options={options.area.map((option) => option)}
                              getOptionLabel={(option) => `${option.options}`}
                              onChange={(event, value, reason) => {
                                if (reason === "clear") {
                                  console.log("Selection cleared");
                                  updateArea("");
                                } else {
                                  updateArea(value ? value.options : "");
                                  console.log(value, "value jobs");
                                }
                              }}
                              value={{
                                options: formData.area ? formData.area : "",
                                category: "areas",
                              }}
                              fullWidth
                              filterSelectedOptions
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Area"
                                  placeholder="Area"
                                  value={formData.area}
                                />
                              )}
                            />
                          </div>
                          <div className="col-sm-4 mt-3">
                            <Autocomplete
                              id="tags-outlined"
                              options={options.city.map((option) => option)}
                              getOptionLabel={(option) => `${option.options}`}
                              // onChange={(event, value) => {
                              //   updateCity(value);
                              //   // console.log(value);
                              // }}
                              onChange={(event, value, reason) => {
                                if (reason === "clear") {
                                  console.log("Selection cleared");
                                  updateCity("");
                                } else {
                                  updateCity(value);
                                  console.log(value, "value jobs");
                                }
                              }}
                              value={{
                                options: formData.city ? formData.city : "",
                                category: "city",
                              }}
                              fullWidth
                              filterSelectedOptions
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="City"
                                  placeholder="City"
                                />
                              )}
                            />
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

export default EmployerRegisterFilter;
