/* eslint-disable no-duplicate-case */
/* eslint-disable no-fallthrough */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import {
  Stack,
  TextField,
  FormControl,
  MenuItem,
  Autocomplete,
  Menu,
} from "@mui/material";

import "dayjs/locale/en-gb";

import ModalContainer from "../../../components/modal_popup";
import { MyModal, dateFormate, numbersOnlyTest } from "../../../utility";
import { GetAllsdminDetails, getJobFilterOptions } from "../../../apiServices";
import { interviewListActions } from "../../../redux-store/store";
import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";
import { AiOutlineClose, AiOutlinePhone } from "react-icons/ai";
import { BiFilterAlt } from "react-icons/bi";
import interviewStyle from "./candidateInterviewSchedule.module.scss";

// const RedDot = styled.span`
//   display: inline-block;
//   width: 10px;
//   height: 10px;
//   background-color: red;
//   border-radius: 50%; /* Makes it a circle */
// `;

export default function ScheduleInterviewFilter() {
  const interviewFilter = useSelector(
    (state) => state.interviewListDetails.interviewFilter
  );
  const interviewFilterRedDot = useSelector(
    (state) => state.interviewListDetails.refreshRedDot
  );
  const adminDetailsRole = useSelector((state) => state.adminDetails);
  let isSuperAdmin = adminDetailsRole.roleID == 1;
  const adminIDTwo = localStorage.getItem("adminID") === "2";
  const initialValues = {
    adminId: localStorage.getItem("adminID"),
    jobId: interviewFilter.jobId,
    contactNumber: interviewFilter.contactNumber,
    candidateMobileNumber: interviewFilter.candidateMobileNumber,
    companyName: interviewFilter.companyName,
    jobCategory: interviewFilter.jobCategory,
    city: interviewFilter.city,
    area: interviewFilter.area,
    interviewStatus: interviewFilter.interviewStatus,
    scheduledBy: isSuperAdmin ? 0 : localStorage.getItem("adminID"),
  };

  const filterDetails = useSelector(
    (state) => state.interviewListDetails.interviewFilter
  );
  const create = useSelector(
    (state) => state.interviewListDetails.interviewFilter.createdTime
  );
  const ended = useSelector(
    (state) => state.interviewListDetails.interviewFilter.endDate
  );
  const interviewStart = useSelector(
    (state) => state.interviewListDetails.interviewFilter.interviewDate
  );
  const interviewEnd = useSelector(
    (state) => state.interviewListDetails.interviewFilter.interviewEndDate
  );

  const [formData, setFormData] = useState(initialValues);
  const [showFilter, setShowFilter] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: filterDetails.createdTime,
    end: filterDetails.endDate,
    dateFilterType: filterDetails.dateFilterType,
  });
  const [dateRange1, setDateRange1] = useState({
    start: filterDetails.interviewDate,
    end: filterDetails.interviewEndDate,
    interviewdateFilterType: filterDetails.interviewdateFilterType,
  });
  const [showCustom, setshowCustom] = useState(false);
  const [showCustom1, setshowCustom1] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    start: false,
    end: false,
  });

  const [adminDetails, setAdminDetails] = useState({
    id: null,
    adminName: [],
  });
  const handleTextFieldClick = () => {
    setshowCustom1(true);
  };
  const [showRedDot, setShowRedDot] = useState(false);

  const Dispatch = useDispatch();

  const [errors, setErrors] = useState({
    jobId: "",
    candidateMobileNumber: "",
    contactNumber: "",
    companyName: "",
    interviewDate: "",
    jobCategory: "",
    city: [],
    area: [],
    interviewStatus: "",
    scheduledBy: "",
  });

  const [options, setOptions] = useState({
    area: [],
    city: [],
    jobCategory: [],
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const jobCategory = useSelector(
    (state) => state.interviewListDetails.interviewFilter.jobCategory
  );
  const size = useSelector(
    (state) => state.interviewListDetails.interviewFilter.size
  );
  const page = useSelector(
    (state) => state.interviewListDetails.interviewFilter.page
  );

  const [adminList, setAdminList] = useState([]);

  useEffect(() => {
    getJobFilterOptions().then((data) => {
      const cityOptions = data.filter((element) => element.category === "city");
      const areaOptions = data.filter(
        (element) => element.category === "areas"
      );
      const JobCategoryOptions = data.filter(
        (element) => element.category == "job category"
      );
      setOptions((prev) => ({
        ...prev,
        city: cityOptions,
        area: areaOptions,
        jobCategory: JobCategoryOptions,
      }));
      console.log(cityOptions);
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
    GetAllsdminDetails().then((data) => {
      console.log(data, "All admin details");
      const adminName = data.map((item) => item.userName);
      const adminid = data.map((item) => item.id);
      console.log(adminName);
      console.log(adminid);
      setAdminDetails((prev) => ({
        ...prev,
        adminName: adminName,
        id: adminid,
      }));
    });
  }, []);

  function handleAssignToChange(e) {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, scheduledBy: value }));
  }

  function handleFieldChange(field, value) {
    // const value = event.target.value;
    console.log(value, "Interview time");
    console.log(numbersOnlyTest(value));
    // eslint-disable-next-line default-case
    switch (field) {
      case "jobId":
        if (numbersOnlyTest(value)) {
          // setFormData((prev) => ({ ...prev, [field]: value }));
          setFormData({ ...formData, [field]: value });

          setErrors((prev) => ({ ...prev, [field]: "" }));
        } else {
          setErrors((prev) => ({
            ...prev,
            jobId: "Please enter valid job Id",
          }));
        }
        break;
      case "companyName":
        // setFormData((prev) => ({ ...prev, [field]: value }));

        setFormData({ ...formData, [field]: value });
        setErrors((prev) => ({ ...prev, [field]: "" }));

        break;
      // case "jobCategory":
      //   // setFormData((prev) => ({ ...prev, [field]: value }));
      //   setFormData({ ...formData, [field]: value });
      //   setErrors((prev) => ({ ...prev, [field]: "" }));

      //   break;
      case "interviewStatus":
        // setFormData((prev) => ({ ...prev, [field]: value }));
        setFormData({ ...formData, [field]: value });
        setErrors((prev) => ({ ...prev, [field]: "" }));

        break;
      case "contactNumber":
        if (numbersOnlyTest(value)) {
          if (value.length <= 10) {
            // setFormData((prev) => ({ ...prev, [field]: value }));
            setFormData({ ...formData, [field]: value });
            setErrors((prev) => ({ ...prev, [field]: "" }));
          } else {
            setErrors((prev) => ({
              ...prev,
              contactNumber: "Contact number must be exactly 10 digits long",
            }));
          }
        }
      case "candidateMobileNumber":
        if (numbersOnlyTest(value)) {
          if (value.length <= 10) {
            // setFormData((prev) => ({ ...prev, [field]: value }));
            setFormData({ ...formData, [field]: value });
            setErrors((prev) => ({ ...prev, [field]: "" }));
          } else {
            setErrors((prev) => ({
              ...prev,
              candidateMobileNumber:
                "candidate MobileNumber number must be exactly 10 digits long",
            }));
          }
        } else {
          setErrors((prev) => ({
            ...prev,
            contactNumber: "Please enter a valid number",
          }));
        }
        break;
      case "interviewStatus":
        // setFormData((prev) => ({
        //   ...prev,
        //   [field]: dateFormate(value.$d).trim(),
        // }));
        setFormData({ ...formData, [field]: value });
        setErrors((prev) => ({ ...prev, [field]: "" }));
        break;

      case "interviewDate":
        if (!value) {
          setErrors((prev) => ({ ...prev, [field]: "Date is required" }));
        } else {
          setErrors((prev) => ({ ...prev, [field]: "" }));
        }

        setFormData({ ...formData, [field]: dateFormate(value.$d).trim() });
        break;
    }
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [interviewadatanchor, setInterviewadatanchor] = React.useState(null);
  const open = Boolean(anchorEl);
  const interviewDateOpen = Boolean(interviewadatanchor);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleInterviewdateClick = (event) => {
    setInterviewadatanchor(event.currentTarget);
  };
  const handleClose = (val) => {
    console.log(val);

    setAnchorEl(null);
  };
  const handleClose1 = (val) => {
    console.log(val);

    setInterviewadatanchor(null);
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

      console.log(
        startDate.toISOString().split("T")[0],
        endDate.toISOString().split("T")[0],
        "Dateeeeeeeeeeeeee"
      );

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
  const handleInterviewDateSelect = (val) => {
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

      setDateRange1((prev) => ({
        ...prev,
        interviewdateFilterType: "Last 1 Week",
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      }));

      setInterviewadatanchor(null);
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

      setDateRange1((prev) => ({
        ...prev,
        interviewdateFilterType: "Last 2 Week",
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      }));
      setInterviewadatanchor(null);
    } else if (selectedOption === "today") {
      setDateRange1((prev) => ({
        ...prev,
        interviewdateFilterType: "Today",
        start: today.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      }));
      setInterviewadatanchor(null);
    } else if (selectedOption === "tomorrow") {
      // Calculate tomorrow's date
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      // Set the start time to 12:00 AM
      const startDate = new Date(tomorrow);
      // startDate.setHours(0, 0, 0, 0);

      // Set the end time to 11:59 PM
      const endDate = new Date(tomorrow);
      endDate.setHours(23, 59, 59, 999);

      setDateRange1((prev) => ({
        ...prev,
        interviewdateFilterType: "Tomorrow",
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      }));
      setInterviewadatanchor(null);
    } else if (selectedOption === "lastMonth") {
      const today = new Date(); // Assuming today is the current date

      const startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);

      const endDate = new Date(today.getFullYear(), today.getMonth(), 0);

      console.log(startDate, endDate);

      setDateRange1((prev) => ({
        ...prev,
        interviewdateFilterType: "Last Month",
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      }));
      setInterviewadatanchor(null);
    } else if (selectedOption === "yesterday") {
      const today = new Date();

      // Calculate yesterday's date
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      // Set the start time to 12:00 AM
      const startDate = new Date(yesterday);
      // startDate.setHours(0, 0, 0, 0);

      // Set the end time to 11:59 PM
      const endDate = new Date(yesterday);
      endDate.setHours(23, 59, 59, 999);

      setDateRange1((prev) => ({
        ...prev,
        interviewdateFilterType: "Yesterday",
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      }));
      setInterviewadatanchor(null);
    } else if (selectedOption === "custom") {
      setshowCustom1(true);
      setInterviewadatanchor(null);
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
  function handleInterviewCustomDate(value, type) {
    // setSelectedDates({
    //   ...selectedDates,
    //   [type]: value.target.value,
    // });
    const val = value.target.value;

    if (type === "startDate") {
      setDateRange1((prev) => ({
        ...prev,
        start: val,
        interviewdateFilterType: "custom",
      }));
      setValidationErrors((prev) => ({
        ...prev,
        start: false,
      }));
    } else {
      setDateRange1((prev) => ({
        ...prev,
        end: val,
        interviewdateFilterType: "custom",
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
    const isValid =
      (dateRange.start && dateRange.end) ||
      (dateRange1.start && dateRange1.end);

    if (!dateRange.start || !dateRange1.start) {
      setValidationErrors((prev) => ({
        ...prev,
        start: true,
      }));
    }

    if (!dateRange.end || !dateRange1.end) {
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
      setshowCustom(false); // Close the modal or perform other actions
      setshowCustom1(false);
    }
  };

  const updateArea = (event, value) => {
    // to update cities

    setFormData({ ...formData, area: event });
    // setFormData({ ...formData, city: value.options });
  };
  const updateCity = (event, value) => {
    // to update cities

    setFormData({ ...formData, city: event.options });
    // setFormData({ ...formData, city: value.options });
  };

  const updateJobCategory = (event, value) => {
    // to update cities

    setFormData({ ...formData, jobCategory: event.options });
  };
  const updateJScheduleby = (event, value) => {
    // to update cities

    setFormData({ ...formData, scheduledBy: event });
  };

  const InterviewStatus = [
    {
      value: "0",
      label: "None",
    },
    {
      value: "1",
      label: "Attending",
    },
    {
      value: "2",
      label: "Not Attended",
    },
    {
      value: "9",
      label: "Awaiting",
    },

    {
      value: "3",
      label: "Selected",
    },

    {
      value: "4",
      label: "Not Selected",
    },
    {
      value: "10",
      label: "Will Join",
    },
    {
      value: "5",
      label: "Offer Rejected",
    },
    // {
    //   value: "6",
    //   label: "Joined",
    // },

    // {
    //   value: "8",
    //   label: "Left Company",
    // },
    ...(isSuperAdmin || adminIDTwo
      ? [
          {
            value: "7",
            label: "Rescheduled",
          },
        ]
      : []),
  ];
  const handleSubmit = (event) => {
    event.preventDefault();

    Dispatch(
      interviewListActions.setInterviewFilter({
        ...formData,
        page: 1,
        size: size,
        createdTime: dateRange.start || create,
        endDate: dateRange.end || ended,
        interviewDate: dateRange1.start || interviewStart,
        interviewEndDate: dateRange1.end || interviewEnd,
        dateFilterType: dateRange.dateFilterType || "",
        interviewdateFilterType: dateRange1.interviewdateFilterType || "",
      })
    );

    // Check if any filter is applied
    const isFilterApplied =
      interviewFilter.jobId ||
      interviewFilter.interviewDate ||
      interviewFilter.companyName ||
      interviewFilter.contactNumber ||
      interviewFilter.candidateMobileNumber ||
      interviewFilter.jobCategory ||
      interviewFilter.city ||
      interviewFilter.area ||
      interviewFilter.interviewStatus;

    Dispatch(interviewListActions.setInterviewFilterRedDot(isFilterApplied));

    setShowFilter(false);
    // console.log(showFilter, "jhjhsjhdfh");
  };

  function handleClear(e) {
    e.preventDefault();

    setFormData({
      adminId: localStorage.getItem("adminID"),
      jobId: "",
      jobCategory: "",
      companyName: "",
      candidateMobileNumber: "",
      interviewStatus: -1,
      scheduledBy: isSuperAdmin ? 0 : localStorage.getItem("adminID"),
      city: "",
      area: "",
    });
    setDateRange1({
      start: "",
      end: "",
      interviewdateFilterType: "",
    });
    setDateRange({
      start: null,
      end: null,
      dateFilterType: "",
    });

    Dispatch(
      interviewListActions.setInterviewFilter({
        ...initialValues,
        createdTime: "",
        endDate: "",
        interviewDate: "",
        interviewEndDate: "",
        page: 1,
        size: size,
        dateFilterType: "",
        interviewdateFilterType: "",
      })
    );
    Dispatch(interviewListActions.setInterviewFilterRedDot(false));
  }

  function handleClickCross(e) {
    e.preventDefault();
    Dispatch(
      interviewListActions.setInterviewFilter({
        ...formData,
        page: 1,
        size: size,
        createdTime: create,
        endDate: ended,
        interviewDate: interviewStart,
        interviewEndDate: interviewEnd,
        dateFilterType: dateRange.dateFilterType,
      })
    );
    // setShowRedDot(false);
    setShowFilter(false);
  }
  const jobCategoryStrings = options.jobCategory.map(
    (option) => option.options
  );
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
              backgroundColor: interviewFilterRedDot ? "red" : "transparent",
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
                    <h4 className="text-center mb-2">Filter by admin</h4>
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
                        <div className="col-sm-3 mt-3">
                          <TextField
                            id="outlined-basic"
                            label="Mobile number"
                            variant="outlined"
                            fullWidth
                            value={formData.candidateMobileNumber}
                            // inputProps={{ maxLenth: 10 }}
                            onChange={(event) =>
                              // event.target.value.length <= 10 &&
                              handleFieldChange(
                                "candidateMobileNumber",
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
                        <div className="col-sm-3 mt-3">
                          {/* <FormControl fullWidth>
                            <TextField
                              id="outlined-basic"
                              label="Interview Date"
                              variant="outlined"
                              value={`${dateRange.dateFilterType}`}
                              // value={`${dateRange1.start} - ${dateRange1.end}`}
                              onClick={handleTextFieldClick}
                            /> */}
                          <FormControl variant="outlined" fullWidth>
                            <TextField
                              label="Interview Date"
                              id="basic-button"
                              value={`${dateRange1.interviewdateFilterType}`}
                              // value={`${dateRange1.start} - ${dateRange1.end}`}
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleInterviewdateClick}
                            ></TextField>
                            <Menu
                              id="basic-menu"
                              anchorEl={interviewadatanchor}
                              open={interviewDateOpen}
                              onClose={handleClose1}
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                            >
                              <MenuItem
                                onClick={() => {
                                  handleInterviewDateSelect("today");
                                }}
                                style={{ width: "210px" }}
                              >
                                Today
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleInterviewDateSelect("tomorrow");
                                }}
                                style={{ width: "210px" }}
                              >
                                Tomorrow
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
                          {showCustom1 && (
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
                                              value={dateRange1.start}
                                              onChange={(value) =>
                                                handleInterviewCustomDate(
                                                  value,
                                                  "startDate"
                                                )
                                              }
                                              // Value={
                                              //   new Date()
                                              //     .toISOString()
                                              //     .split("T")[0]
                                              // }
                                              name="trip-start"
                                              // min="2020-01-01"
                                              // max={
                                              //   new Date()
                                              //     .toISOString()
                                              //     .split("T")[0]
                                              // }
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
                                              value={dateRange1.end}
                                              // new Date().toISOString().split("T")[0]
                                              onChange={(value) =>
                                                handleInterviewCustomDate(
                                                  value,
                                                  "endDate"
                                                )
                                              }
                                              // Value={
                                              //   new Date()
                                              //     .toISOString()
                                              //     .split("T")[0]
                                              // }
                                              name="trip-end"
                                              // min="2020-01-01"
                                              // max={
                                              //   new Date()
                                              //     .toISOString()
                                              //     .split("T")[0]
                                              // }
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
                                                setshowCustom1(false);
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
                          {/* </FormControl>{" "} */}
                        </div>
                        <div className="col-sm-3 mt-3">
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
                        {/* created on */}
                        <div className="col-sm-3 mt-3">
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
                      </div>
                      <div className="row  mb-3">
                        <div className="col-sm-3 mt-3">
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

                          {/* <FormControl fullWidth>
                            <InputLabel id="city-label">City</InputLabel>
                            <Select
                              labelId="city-label"
                              sx={{ width: "100%" }}
                              label="City"
                              name="city"
                              onChange={updateCity}
                              value={formData.city}
                            >
                              {options.city.map((option, i) => (
                                <MenuItem key={i} value={option.options}>
                                  {option.options}
                                </MenuItem>
                              ))}
                              <MenuItem value=""></MenuItem>
                            </Select>
                          </FormControl> */}
                        </div>

                        <div className="col-sm-3 mt-3">
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

                          {/* <FormControl fullWidth>
                            <InputLabel id="city-label">Area</InputLabel>
                            <Select
                              labelId="city-label"
                              sx={{ width: "100%" }}
                              label="Area"
                              name="area"
                              onChange={updateArea}
                              value={formData.area}
                            >
                              {options.area.map((option, i) => (
                                <MenuItem key={i} value={option.options}>
                                  {option.options}
                                </MenuItem>
                              ))}
                              <MenuItem value=""></MenuItem>
                            </Select>
                          </FormControl> */}
                        </div>
                        <div className="col-sm-3 mt-3">
                          {" "}
                          <TextField
                            id="interviewStatus"
                            name="interviewStatus"
                            label="Status"
                            // className="mt-2"
                            select
                            value={formData.interviewStatus}
                            fullWidth
                            onChange={(event) =>
                              handleFieldChange(
                                "interviewStatus",
                                event.target.value
                              )
                            }
                          >
                            {InterviewStatus.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                        <div className="col-sm-3 mt-3">
                          <Autocomplete
                            id="tags-outlined"
                            options={options.area.map((option) => option)}
                            getOptionLabel={(option) => `${option.options}`}
                            // onChange={(event, value) => {
                            //   updateArea(value ? value.options : "");
                            //   // console.log(event, "love");
                            //   console.log(value.options, "ghghghggg");
                            // }}
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
                      </div>

                      <div className="col-sm-3 ">
                        {adminList && isSuperAdmin && (
                          <TextField
                            onChange={(e) => handleAssignToChange(e)}
                            name="AssignedTo"
                            id="AssignedTo"
                            className="form-control"
                            select
                            label="Assigned To"
                            value={formData.scheduledBy}
                            defaultValue={formData.scheduledBy}
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
