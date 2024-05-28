/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { Typography, TextField, FormControl } from "@mui/material";
import {
  QualifyJobRole,
  GetPreferredCities,
  PostQualifyCandidate,
  PutFBmetaIsQualified,
  AllEducationDegree,
  GetStates,
  GetCities,
  getKeySkills,
  Getlanguages,
  GetCandidateSources,
  GetCourses,
} from "../../apiServices";
import styles from "./CommonQualify.module.scss";
import dayjs from "dayjs";
import SuccessTick from "../../components/success_tick";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { FormControlLabel, PopperProps } from "@mui/material";
import {
  DateTimePicker,
  // DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
// import DatePicker from 'react-bootstrap-date-picker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ModalContainer from "../../components/modal_popup";
import { FBmetaLeadsSliceActions } from "../../redux-store/store";
import { MyModal, calculateAge } from "../../utility";
import { useNavigate } from "react-router-dom";
const YourComponent = ({
  onclosemodal,
  onmobileNumber,
  onwhatsappNumber,
  onclosepopup,
  Onreloadepage,
}) => {
  // const options = [
  //   { value: "option1", label: "Option 1" },
  //   { value: "option2", label: "Option 2" },
  //   { value: "option3", label: "Option 3" },
  //   // Add more options as needed
  // ];

  // const [selectedOptions, setSelectedOptions] = useState([]);

  // const handleChange = (selectedValues) => {
  //   setSelectedOptions(selectedValues);
  // };

  // return (
  //   <div>
  //     <label>Select Options:</label>
  //     <Select
  //       isMulti
  //       options={options}
  //       value={selectedOptions}
  //       onChange={handleChange}
  //     />
  //     <p>Selected Options: {JSON.stringify(selectedOptions)}</p>
  //   </div>
  // );
  const Dispatch = useDispatch();
  const adminDetails = useSelector((state) => state.adminDetails);

  let isSuperAdmin = adminDetails.roleID == 1;

  useEffect(() => {
    // to set super admin id as 0
    let id = isSuperAdmin ? 0 : localStorage.getItem("adminID");
    Dispatch(FBmetaLeadsSliceActions.setFBmetaListFilterAdminId(id));
  }, []);
  const firstErrorRef = useRef(null);
  const [courses, setCourses] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const [keySkills, setKeySkills] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const onnumber = onmobileNumber; // Calling the function
  const Navigate = useNavigate();
  console.log(onnumber);
  const initialState = {
    states: [],
    cities: [],
    selectedState: "",
    selectedCity: "",
    filteredStates: [],
    filteredCities: [],
    skills: [],
    certification: [],
    language: [],
    userInputState: "",
    userInputCity: "",
    initial: "",
    mobilenumber: onmobileNumber,
    emergencynumber: "",
    whatsappnumber: onwhatsappNumber,
    name: "",
    relationname: "",
    date: "",
    datebirth: "",
    gender: "",
    notes: "",
    JobChange: "",
    relationshipstatus: "",
    suitablework: "",
    Specialization: "",
    resume: "",
    transportation: "",
    coursecompleted: "",
    accomodation: "",
    shift: "",
    willingwork: "",
    salaryexpectation: "",
    expected: "",
    relocate: "",
    current: "",
    completedYear: "",
    candidateSource: "",
    currentlocation: "",
    // skills: null,
    course: "",
    education: "",
    position: "",
    longworkgap: "",
    staylocation: "",
    currentindustrysalary: "",
    // qualification: "",
    location: "",
    anotherDropdown: "",
    // keyskills: "",
    worklocation: "",
    isInitialValid: true,
    isWhatsappNumber: true,
    isMobileNumber: true,
    isEmergencynumber: true,
    isNameValid: true,
    isRelationNameValid: true,
    isDateOfBirthValid: true,
    // isStateValid: true,
    // isCityValid: true,
    issuitableworkValid: true,
    isresumeSelected: true,
    // istransportationSelected: true,
    isCompletedSelected: true,
    isskills: true,
    iscertification: true,
    // islanguage: true,
    isaccomodationSelected: true,
    isCompletedYear: true,
    iswillingworkSelected: true,
    // isRelocateSelected: true,
    isExpectedSalarySelected: true,
    // iscurrentindustrysalarySelected: true,
    // iscurrentindustrysalaryValid: true,
    iscandidateSource: true,
    // isCourseValid: true,
    iseducationValid: true,
    // iskeyskillsValid: true,
    isSpecializationValid: false,
    isPositionValid: true,
    isstaylocationValid: true,
    isJobChangeValid: true,
    // isrelationshipstatusValid:true,    // isCurrentStayValid: true,
    // isQualificationSelected: true,
    // isLocationSelected: true,
    // isGenderSelect: true,
    isAnotherDropdownValid: true,
    isWorkLocationValid: true,
    isSkillValid: true,
    isnotesValid: true,
    isdateValid: true,
    iscurrentLocation: true,
    isExpected: true,
    isshiftSelected: true,

    // islongworkgapSelected: true,
  };

  const [arrayofData, setArrayofData] = useState({
    Skills: [],
    certification: [],
    language: [],
    candidateSource: [],
  });

  const [formData, setFormData] = useState(initialState);

  // console.log("Log of formadata",formData);
  useEffect(() => {
    if (formData.education == "Below 10" || "10th Pass and Above") {
      setFormData((prev) => ({ ...prev, Specialization: "" }));
    }
  }, [formData.education]);

  const handleChange = (field, value) => {
    let isValid = true;

    if (field === "education") {
      isValid = value !== "";
      setFormData({
        ...formData,
        [field]: value,
        iseducationValid: isValid,
      });
    } else if (field === "position") {
      isValid = value !== "";
      setFormData({
        ...formData,
        [field]: value,
        isPositionValid: isValid,
      });
    } else if (field === "current") {
      isValid = value !== "";
      setFormData({
        ...formData,
        [field]: value,
        isCurrentStayValid: isValid,
      });
    } else if (field === "city") {
      isValid = value !== "";
      setFormData({
        ...formData,
        [field]: value,
        isCityValid: isValid,
      });
    } else if (field === "states") {
      isValid = value !== "";
      console.log(value, "state");
      setFormData({
        ...formData,
        [field]: value,
        isStateValid: isValid,
      });
    } else if (field === "currentindustrysalary") {
      isValid = value !== "";
      setFormData({
        ...formData,
        [field]: value,
        iscurrentindustrysalaryValid: isValid,
      });
    } else if (field === "relationshipstatus") {
      isValid = value !== "";
      setFormData({
        ...formData,
        [field]: value,
        isrelationshipstatusValid: isValid,
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleBlur = (field, selectedOption) => {
    if (field === "Specialization") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]:
          prevFormData.education === "Diploma" ||
          prevFormData.education === "ITI" ||
          prevFormData.education === "UG" ||
          prevFormData.education === "PG"
            ? selectedOption
            : "",
      }));
    }
  };
  const educationRequiresSpecialization10th = [
    "Below 10",
    "10th Pass and Above",
  ];
  const handleSpcalization = (field, selectedOption) => {
    if (selectedOption.value) {
      setFormData({
        ...formData,
        [field]: selectedOption,
        isSpecializationValid: true,
      });
    } else {
      setFormData({
        ...formData,
        Specialization: null,
        isSpecializationValid: true,
      });
    }
  };

  const checkSpecializationValidation = () => {
    const educationRequiresSpecialization = ["Diploma", "ITI", "UG", "PG"];

    if (
      formData.education &&
      educationRequiresSpecialization.includes(formData.education)
    ) {
      return !!formData.Specialization;
    } else {
      return true;
    }
  };

  // const handleMultiSelectChange = (field, selectedValues) => {
  //   setFormData({
  //     ...formData,
  //     [field]: selectedValues,
  //     [`is${field.charAt(0).toUpperCase() + field.slice(1)}Valid`]:
  //       selectedValues.length > 0,
  //   });
  // };
  const handleMultiSelectChange = (field, selectedValues) => {
    const isValid = selectedValues.length > 0;

    // const isValid = value !== "";
    if (field === "position") {
      setFormData({
        ...formData,
        [field]: selectedValues,
        isPositionValid: isValid,
      });
    } else if (field === "currentposition") {
      setFormData({
        ...formData,
        [field]: selectedValues,
        iscurrentpositionValid: isValid,
      });
    } else if (field === "industry") {
      setFormData({
        ...formData,
        [field]: selectedValues,
        isindustryValid: isValid,
      });
    } else if (field === "anotherDropdown") {
      setFormData({
        ...formData,
        [field]: selectedValues,
        isAnotherDropdownValid: isValid,
      });
    } else if (field === "skills") {
      setFormData({
        ...formData,
        [field]: selectedValues,
        isskills: isValid,
      });
    } else if (field === "certification") {
      setFormData({
        ...formData,
        [field]: selectedValues,
        iscertification: isValid,
      });
    } else if (field === "language") {
      setFormData({
        ...formData,
        [field]: selectedValues,
        islanguage: isValid,
      });
    } else if (field === "proofdocument") {
      setFormData({
        ...formData,
        [field]: selectedValues,
        isproofdocumentValid: isValid,
      });
    } else if (field === "JobChange") {
      setFormData({
        ...formData,
        [field]: selectedValues,
        isJobChangeValid: isValid,
      });
    }
  };

  const handleMultiSelectChange1 = (field, selectedValues1) => {
    setFormData({
      ...formData,
      [field]: selectedValues1,
      [`is${field.charAt(0).toUpperCase() + field.slice(1)}Valid`]:
        selectedValues1.length > 0,
    });
  };
  const handleRadioChange = (field, value) => {
    const isValid = value !== "";
    if (field === "qualification") {
    } else if (field === "location") {
      setFormData({
        ...formData,
        [field]: value,
        isLocationSelected: isValid,
      });
    } else if (field === "gender") {
      setFormData({
        ...formData,
        [field]: value,
        isGenderSelect: isValid,
      });
    } else if (field === "course") {
      setFormData({
        ...formData,
        [field]: value,
        isCourseValid: isValid,
      });
    } else if (field === "coursecompleted") {
      setFormData({
        ...formData,
        [field]: value,
        isCompletedSelected: isValid,
      });
    } else if (field === "relocate") {
      setFormData({
        ...formData,
        [field]: value,
        isRelocateSelected: isValid,
      });
    } else if (field === "salaryexpectation") {
      setFormData({
        ...formData,
        [field]: value,
        isExpectedSalarySelected: isValid,
      });
    } else if (field === "shift") {
      setFormData({
        ...formData,
        [field]: value,
        isshiftSelected: isValid,
      });
    } else if (field === "accomodation") {
      setFormData({
        ...formData,
        [field]: value,
        isaccomodationSelected: isValid,
      });
    } else if (field === "willingwork") {
      setFormData({
        ...formData,
        [field]: value,
        iswillingworkSelected: isValid,
      });
    } else if (field === "longworkgap") {
      setFormData({
        ...formData,
        [field]: value,
        islongworkgapSelected: isValid,
      });
    } else if (field === "transportation") {
      setFormData({
        ...formData,
        [field]: value,
        istransportationSelected: isValid,
      });
    } else if (field === "resume") {
      setFormData({
        ...formData,
        [field]: value,
        isresumeSelected: isValid,
      });
    } else if (field === "currentindustrysalary") {
      setFormData({
        ...formData,
        [field]: value,
        iscurrentindustrysalarySelected: isValid,
      });
    }
  };

  const handleworklocationChange = (value) => {
    setFormData({
      ...formData,
      worklocation: value,
      isWorkLocationValid: true,
    });
  };

  const handleskillChange = (value) => {
    setFormData({
      ...formData,
      skills: value,
      isSkillValid: value.trim() !== "",
    });
  };

  // const handlesuitableworklocationChange = (value) => {
  //   setFormData({
  //     ...formData,
  //     suitableworklocation: value,
  //     isSuitableworklocationValid: true,
  //   });
  // };

  const handlenoteschange = (field, value) => {
    setFormData({
      ...formData,
      notes: value,
      isnotesValid: true,
    });
  };
  // const handledatechange = (field, value) => {
  //   console.log(e);
  //   setFormData({
  //     ...formData,
  //     date: value,
  //     isdateValid: true,
  //   });
  // };
  const handledatechange = (field, value) => {
    // const formattedDate = dayjs(value.$d).format("DD-MM-YYYY HH:mm");
    const formattedDate = dayjs(value.$d).format("DD-MM-YYYY hh:mm");

    console.log("Field:", field);
    console.log("Formatted Date:", formattedDate);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value.$d,
      isdateValid: true,
    }));
  };
  const handledatebirthchange = (field, value) => {
    if (!value) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
            isDateOfBirthValid: false, // Mark the date as invalid
            dateOfBirthError: "Date of birth is required." // Set an error message
        }));
    } else {
        console.log(value, "good date");
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
            isDateOfBirthValid: true,
            dateOfBirthError: "" // Clear any existing error message
        }));
    }
};


  const handlecurrentlocation = (value) => {
    setFormData({
      ...formData,
      currentlocation: value,
      iscurrentLocation: true,
    });
  };
  const handlefieldchange = (field, value) => {
    let isValid = true;
    let fieldValid = true;
  
    // Check for empty or null value
    if (!value || value === "") {
      fieldValid = false;
    }
  
    // Check for length 0
    if (typeof value === "string" && value.length === 0) {
      fieldValid = false;
    }
  
    if (field === "worklocation") {
      isValid = fieldValid;
      setFormData({
        ...formData,
        worklocation: value,
        isWorkLocationValid: isValid,
      });
      return
    } else if (field === "name") {
      isValid = fieldValid;
      setFormData({
        ...formData,
        name: value,
        isNameValid: isValid,
      });
      return
    } else if (field === "initial") {
      isValid = fieldValid;
      setFormData({
        ...formData,
        initial: value,
        isInitialValid: isValid,
      });
      return
    }
    // else if (field === "skills") {
    //   isValid = value !== "";
    //   setFormData({
    //     ...formData,
    //     skills: value,
    //     isSkillValid: value.trim() !== "",
    //   });
    // }
    else if (field === "mobilenumber" || field === "whatsappnumber" || field === "emergencynumber") {
      isValid = fieldValid && value.length >= 10;
      setFormData({
        ...formData,
        [field]: value,
        [`is${field.charAt(0).toUpperCase() + field.slice(1)}`]: isValid,
      });
      return
    }
    // Add other specific field validations similarly

    else if (field === "expected") {
      isValid = fieldValid;
      setFormData({
        ...formData,
        expected: value,
        isExpected: isValid,
      });
      return
    } else if (field === "completedYear") {
      isValid = fieldValid;
      setFormData({
        ...formData,
        completedYear: value,
        isCompletedYear: isValid,
      });
      return
    } else if (field === "currentlocation") {
      isValid = fieldValid;
      setFormData({
        ...formData,
        currentlocation: value,
        iscurrentLocation: isValid,
      });
      return
    }
   
    else if (field === "relationname") {
      isValid = value !== "";
      setFormData({
        ...formData,
        relationname: value,
        isRelationNameValid: true,
      });
      return
    } 
    // else if (field === "currentlyworking") {
    //   setFormData({
    //     ...formData,
    //     currentlyworking: value,
    //     iscurrentlyworkingValid: true,
    //   });
    // }
    else if (field === "currentcompany") {
      isValid = fieldValid;
      setFormData({
        ...formData,
        currentcompany: value,
        iscurrentcompanyValid: isValid,
      });
      return
    } else if (field === "suitablework") {
      isValid = fieldValid;
      setFormData({
        ...formData,
        suitablework: value,
        issuitableworkValid: isValid,
      });
      return
    } else if (field === "staylocation") {
      isValid = fieldValid;
      setFormData({
        ...formData,
        staylocation: value,
        isstaylocationValid: isValid,
      });
      return
    } else if (field === "companyname") {
      isValid = fieldValid;
      setFormData({
        ...formData,
        companyname: value,
        iscompanynameValid: isValid,
      });
      return
    } else if (field === "Previoussalary") {
      isValid = fieldValid;
      setFormData({
        ...formData,
        Previoussalary: value,
        isPrevioussalary: isValid,
      });
      return
    }
  };

  const handleSelectChange = (fieldName, selectedOption) => {
    // Check if the selected option has a value
    const isValid = selectedOption && selectedOption.label && selectedOption.label.trim().length > 0;
  
    // Update formData with selected option and validation status
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: selectedOption,
      [`${fieldName}Valid`]: isValid,
    }));
  
    // Validate other fields based on fieldName
    if (fieldName === "position") {
      // Validate position field
      setFormData((prevFormData) => ({
        ...prevFormData,
        isPositionValid: isValid,
      }));
      return
    } else if (fieldName === "currentposition") {
      // Validate anotherField
      setFormData((prevFormData) => ({
        ...prevFormData,
        iscurrentpositionValid: isValid,
      }));
      return
    } else if (fieldName === "industry") {
      // Validate anotherField
      setFormData((prevFormData) => ({
        ...prevFormData,
        isindustryValid: isValid,
      }));
      return
    } else if (fieldName === "JobChange") {
      // Validate anotherField
      setFormData((prevFormData) => ({
        ...prevFormData,
        isJobChangeValid: isValid,
      }));
      return
    } else if (fieldName === "candidateSource") {
      // Validate anotherField
      setFormData((prevFormData) => ({
        ...prevFormData,
        iscandidateSource: isValid,
      }));
      return
    }
  };
  
  useEffect(() => {
    const fetchJobRoles = async () => {
      try {
        const data = await QualifyJobRole();
        const jobRoles = data.results;
        setJobRoles(jobRoles);
      } catch (error) {
        console.error("Error fetching job roles:", error);
      }
    };

    fetchJobRoles();
  }, []); // The empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    async function fetchKeySkills() {
      try {
        const data = await getKeySkills();
        setKeySkills(data.results);
      } catch (error) {
        console.error("Error fetching key skills:", error);
        // Handle error, maybe set an error state
      }
    }
    fetchKeySkills();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const stateId = 1; // Replace with the actual state ID
        const cities = await GetPreferredCities(stateId);
        setCityOptions(
          cities.data.map((city) => ({ value: city.id, label: city.city }))
        );
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    async function fetchCourses() {
      const response = await AllEducationDegree();
      setCourses(
        response.map((course) => ({
          value: course.courses,
          label: course.courses,
        }))
      );
    }

    fetchCourses();
  }, []);

  useEffect(() => {
    // Fetch states when component mounts
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const states = await GetStates();
      setFormData((prevFormData) => ({
        ...prevFormData,
        states: states.results,
        filteredStates: states.results, // Initialize filteredStates with all states
      }));
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const citiesResponse = await GetCities(stateId);
      setFormData((prevFormData) => ({
        ...prevFormData,
        cities: citiesResponse.results,
        filteredCities: citiesResponse.results,
      }));
    } catch (error) {
      console.error(`Error fetching cities for state ${stateId}:`, error);
    }
  };

  const handleStateChange = (selectedOption) => {
    if (selectedOption) {
      console.log("Selected State:", selectedOption);
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedState: selectedOption.label,
        isStateValid: true,
      }));
      console.log(selectedOption.value, "selectedOption");
      fetchCities(selectedOption.value);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedState: null,
        isStateValid: false,
      }));
    }
  };

  useEffect(() => {
    fetchCities(31);
  }, []);

  const handleCityChange = (selectedOption) => {
    if (selectedOption) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedCity: selectedOption.label,
        isCityValid: true,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedCity: null,
        isCityValid: false,
      }));
    }
  };

  const filterStates = (inputValue) => {
    const filteredStates = formData.states.filter((state) =>
      state.state.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      filteredStates: filteredStates,
    }));
  };

  const filterCities = (inputValue) => {
    const filteredCities = formData.cities.filter((city) =>
      city.city.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      filteredCities: filteredCities,
    }));
  };
  useEffect(() => {
    getKeySkills().then((data) => {
      // console.log(data, "hesfkkkkkkkkkkkkkkkkkkkkkkkkkkk");
      setArrayofData((prev) => ({
        ...prev,
        Skills: data.results.map((skill) => ({
          value: skill.id,
          label: skill.skill,
        })),
      }));
    });
    GetCourses().then((data) => {
      // console.log(data, "hesfkkkkkkkkkkkkkkkkkkkkkkkkkkk");
      setArrayofData((prev) => ({
        ...prev,
        certification: data.results.map((courses) => ({
          value: courses.id,
          label: courses.courses,
        })),
      }));
    });
    Getlanguages().then((data) => {
      // console.log(data, "hesfkkkkkkkkkkkkkkkkkkkkkkkkkkk");
      setArrayofData((prev) => ({
        ...prev,
        language: data.results.map((languages) => ({
          value: languages.id,
          label: languages.languages,
        })),
      }));
    });
    GetCandidateSources().then((data) => {
      console.log(data, "hesfkkkkkkkkkkkkkkkkkkkkkkkkkkk");
      setArrayofData((prev) => ({
        ...prev,
        candidateSource: data.map((source) => ({
          value: source.id,
          label: source.source,
        })),
      }));
    });
  }, []);
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const selectedjoblocation = formData.anotherDropdown;

      const selectedOption = formData.position;
      const selectedPosition = selectedOption ? selectedOption.label : null;
      const selectcurrentjobrole = formData.currentposition;
      const selectjobrole = selectcurrentjobrole
        ? selectcurrentjobrole.label
        : null;
      const selctindustry = formData.industry;
      const selectedindustry = selctindustry ? selctindustry.label : null;
      const selectreasonforjobchange = formData.JobChange;
      const selectedjobchange = selectreasonforjobchange
        ? selectreasonforjobchange.label
        : null;
      const selectedspecilazation = formData.Specialization;
      const selectedspecizationoption = selectedspecilazation
        ? selectedspecilazation.label
        : null;
      const selectedproofdocumentoption = formData.proofdocument;

      const {
        JobChange,
        relationname,
        relationshipstatus,
        emergencynumber,
        whatsappnumber,
        mobilenumber,
        selectedState,
        selectedCity,
        initial,
        name,
        datebirth,
        suitablework,
        Specialization,
        resume,
        coursecompleted,
        accomodation,
        shift,
        willingwork,
        salaryexpectation,
        relocate,
        position,
        qualification,
        keyskills,
        anotherDropdown,
        location,
        worklocation,
        completedYear,
        education,
        course,
        skills,
        certification,
        language,
        notes,
        date,
        current,
        staylocation,
        longworkgap,
        currentindustrysalary,
        candidateSource,
        expected,
        transportation,
        gender,
      } = formData;

      setFormData({
        ...formData,
        isJobChangeValid: !!JobChange,
        ismobilenumber: !!(
          mobilenumber && mobilenumber.toString().length === 10
        ),
        isWhatsappNumber: !!(
          whatsappnumber && whatsappnumber.toString().length == 10
        ),
        isEmergencynumber: !!(emergencynumber && emergencynumber.length === 10),
        // isCityValid: !!selectedCity,
        // isStateValid: !!selectedState,
        // isrelationshipstatusValid: !!relationshipstatus,
        isInitialValid: !!initial,
        isDateOfBirthValid: !!datebirth,
        isNameValid: !!name,
        isRelationNameValid: !!relationname,
        issuitableworkValid: !!suitablework,
        isresumeSelected: !!resume,
        istransportationSelected: !!transportation,
        isCompletedSelected: !!coursecompleted,
        isaccomodationSelected: !!accomodation,
        isshiftSelected: !!shift,
        iswillingworkSelected: !!willingwork,
        isRelocateSelected: !!relocate,
        isPositionValid: !!position,
        isstaylocationValid: !!staylocation,
        // iscurrentindustrysalaryValid: !!currentindustrysalary,
        isCompletedYear: !!completedYear,
        // isQualificationSelected: !!qualification,
        isAnotherDropdownValid: !!anotherDropdown.length > 0,
        // iskeyskillsValid: keyskills.length > 0,
        isskills: !!skills.length > 0,
        iscertification: !!certification.length > 0,
        // islanguage: !!language.length > 0,
        // isLocationSelected: !!location,
        // isGenderSelect: !!gender,
        isWorkLocationValid: !!worklocation,
        iscandidateSource: !!candidateSource,
        iseducationValid: !!education.length > 0,
        // isCourseValid: !!course,
        // isSkillValid: !!skills,
        isCurrentStayValid: !!current,
        islongworkgapSelected: !!longworkgap,
        // iscurrentLocation: !!currentlocation,
        isExpected: !!expected,
        isExpectedSalarySelected: salaryexpectation,
        isnotesValid: !!notes,
        isdateValid: !!date,
        isSpecializationValid: checkSpecializationValidation(),
      });

      if (
        (formData.isDateOfBirthValid &&
          whatsappnumber &&
          mobilenumber &&
          initial &&
          selectedCity &&
          selectedState &&
          name &&
          position &&
          anotherDropdown &&
          skills &&
          location &&
          emergencynumber &&
          relationshipstatus &&
          relationname &&
          worklocation &&
          education &&
          course &&
          currentindustrysalary &&
          salaryexpectation &&
          expected &&
          willingwork &&
          shift &&
          resume &&
          accomodation &&
          staylocation &&
          // gender &&
          current &&
          relocate &&
          coursecompleted &&
          transportation) ||
        checkSpecializationValidation() ||
        completedYear
      ) {
        const apiData = {
          appliedJobrole: selectedPosition,
          preferredJobLocation: selectedjoblocation
            .map((option) => option.label)
            .join(","),
          keySkill: formData.skills.map((option) => option.label).join(","),
          certificationCourses: formData.certification
            .map((option) => option.label)
            .join(","),
          knownLanguages: formData.language
            .map((option) => option.label)
            .join(","),
          havingJobLocation: location,
          emergencyContactNumber: emergencynumber,
          relationshipType: relationshipstatus,
          relationName: relationname,
          education: education,
          // companyLocation: worklocation,
          // havingEducationalGap: longworkgap,
          // currentCandidateLocation: currentlocation,
          currentCandidateLocation: staylocation,
          reference: formData.candidateSource.label,
          // currentStayType: current,
          expectedSalary: expected,
          isCourseCompleted: coursecompleted,
          // isMechanicalRelatedDegree: course,
          // skillsCertifications: skills,
          // readyToRelocate: relocate,
          salaryExpectationAdminPreference: salaryexpectation,
          workForSuggestedSalary: currentindustrysalary,
          readyForShifts: shift,
          needAccommodation: accomodation,
          // needTransport: transportation,
          havingUpdatedCV: resume,
          // canSuitableJobLocation: suitablework,
          specialization: selectedspecizationoption,
          followUpDate: date,
          notes: notes,
          firstName: name,
          lastName: initial,
          dateOfBirth: datebirth,
          // age:calculateAge(datebirth),
          mobileNumber: mobilenumber,
          whatsappNumber: whatsappnumber,
          currentState: selectedState,
          passed_out_year: completedYear,
          currentCity: selectedCity,
          // gender: "Male",
        };
        console.log("API dataaa:", apiData);
        setEnableSubmit(true);
        const response = await PostQualifyCandidate(
          apiData,
          onnumber,
          date,
          notes
        );
        console.log("API Response:", response);
        setShowSuccess(true);
        setEnableSubmit(false);
        setTimeout(() => {
          setShowSuccess(false);
          onclosemodal();
          onclosepopup();
          Onreloadepage();
        }, 3000);

        // Handle success scenario (e.g., show success message, reset form, etc.)
      } else {
        const firstErrorMessage = document.querySelector(".error-message");
        if (firstErrorMessage) {
          // Scroll to the first error message element
          firstErrorMessage.scrollIntoView({ behavior: "smooth" });
        }
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      // Handle error scenario (e.g., show error message)
    }
  };

  // const handleRightButtonClick = async () => {
  //   try {
  //     const response = await PostQualifyCandidate(apiData);
  //     console.log("API Response:", response);
  //     setShowSuccess(true);
  //     setTimeout(() => {
  //       setShowSuccess(false);
  //     }, 3000);
  //     close();
  //   } catch (error) {
  //     console.error("Error:", error);
  //     // Handle error if needed
  //   }
  // };
  const scrollToNextSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePositionChange = () => {
    scrollToNextSection("JobLocation");
  };

  const handleCityAndWorkChange = (
    cityValues,
    suitableWorkValue,
    locationValue
  ) => {
    if (
      cityValues &&
      suitableWorkValue !== undefined &&
      locationValue !== undefined
    ) {
      scrollToNextSection("Education");
    }
  };
  const handleSuitableWorkBlur = () => {
    // Scroll to the next section (Education) when suitable work field loses focus
    scrollToNextSection("Education");
  };
  return (
    <div className="container" style={{ marginBottom: "25px" }}>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="container-fluid">
              <div className="row mt-4">
                {" "}
                <div className="col-md-6 mb-4">
                  <label htmlFor="positionDropdown" className="form-label">
                    <strong>Position applying for?</strong>
                  </label>
                  <Select
                    className={`react-select-container ${
                      !formData.isPositionValid && "is-invalid"
                    }`}
                    // innerref={firstErrorRef}
                    classNamePrefix="react-select"
                    id="positionDropdown"
                    value={formData.position}
                    options={jobRoles.map((jobRole) => ({
                      value: jobRole.jobRoles,
                      label: jobRole.jobRoles,
                    }))}
                    onChange={(selectedOption) => {
                      handleSelectChange("position", selectedOption);
                    }}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        border: "1px solid #ced4da",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }),
                    }}
                  />
                  {!formData.isPositionValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select a position.
                    </div>
                  )}
                </div>
              </div>

              {/* 
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  <strong>Are you current working?</strong>
                </label>
                <div className={`d-flex`}>
                  <div className={`mb-3 d-flex ${styles.radioInput}`}>
                    <input
                      type="radio"
                      name="currentlyworking"
                      value="True"
                      readOnly
                      id="currentlyWorkingRadioYes"
                      className="form-check-input"
                      checked={formData.currentlyworking === "True"}
                      onChange={() =>
                        handleRadioChange("currentlyworking", "True")
                      }
                    />
                    <label for="currentlyWorkingRadioYes">Yes</label>
                  </div>
                  <div className={`ms-2 mb-3 ${styles.radioInput}`}>
                    <input
                      type="radio"
                      name="currentlyworking"
                      value="False"
                      readOnly
                      id="currentlyWorkingRadioNo"
                      className="form-check-input"
                      checked={formData.currentlyworking === "False"}
                      onChange={() =>
                        handleRadioChange("currentlyworking", "False")
                      }
                    />
                    <label
                      for="currentlyWorkingRadioNo"
                      className={`form-check-label`}
                    >
                      No
                    </label>
                    </div>
                    </div>
                  )}
                </div>
                </div>
                
              </div>
              <div className="row mt-3"><div className="col-md-6 mb-3">
                  <label htmlFor="mobilenumber" className="form-label">
                    <strong>Whatsapp number</strong>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      !formData.isWhatsappNumber && "is-invalid"
                    }`}
                    id="mobilenumber"
                    placeholder="Enter whatsapp number"
                    value={formData.whatsappnumber}
                    // defaultValue={onmobileNumber}
                    onChange={(e) =>
                      handlefieldchange("whatsappnumber", e.target.value)
                    }
                    maxLength={10}
                    onKeyPress={(e) => {
                      // Allow only numbers
                      if (!/\d/.test(e.key)) {
                        e.preventDefault(); // Prevent the input of non-numeric characters
                      }
                    }}
                  />
                  {!formData.isWhatsappNumber && (
                    <div style={{ color: "red" }} className="error-message">
                      Please enter the whatsapp number.
                    </div>
                  </div>
                
              </div>
              <div className="row mt-3"><div className="col-md-6 mb-3">
                  <label htmlFor="mobilenumber" className="form-label">
                    <strong>Whatsapp number</strong>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      !formData.isWhatsappNumber && "is-invalid"
                    }`}
                    id="mobilenumber"
                    placeholder="Enter whatsapp number"
                    value={formData.whatsappnumber}
                    // defaultValue={onmobileNumber}
                    onChange={(e) =>
                      handlefieldchange("whatsappnumber", e.target.value)
                    }
                    maxLength={10}
                    onKeyPress={(e) => {
                      // Allow only numbers
                      if (!/\d/.test(e.key)) {
                        e.preventDefault(); // Prevent the input of non-numeric characters
                      }
                    }}
                  />
                  {!formData.isWhatsappNumber && (
                    <div style={{ color: "red" }} className="error-message">
                      Please enter the whatsapp number.
                    </div>
                  )}
                </div>
                {!formData.iscurrentlyworkingSelected && (
                  <div style={{ color: "red" }} className="error-message">
                    Please select a currently working.
                  </div>
                )}
              </div> */}

              {/* <hr style={{ border: "2px solid gray" }} /> */}
              <div className={`${styles.container}`}>
                <h2 className={`${styles.Heading}`}>Salary Details</h2>
              </div>
              {/* break */}
              <div className="row mt-3">
                <div className="col-md-6 mb-3">
                  <label htmlFor="expected" className="form-label">
                    <strong>Expected Salary?</strong>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      !formData.isExpected && "is-invalid"
                    }`}
                    id="expected"
                    value={formData.expected}
                    onChange={(e) =>
                      handlefieldchange("expected", e.target.value)
                    }
                    maxLength={5}
                    onKeyPress={(e) => {
                      // Allow only numbers
                      if (!/\d/.test(e.key)) {
                        e.preventDefault(); // Prevent the input of non-numeric characters
                      }
                    }}
                  />
                  {!formData.isExpected && (
                    <div style={{ color: "red" }} className="error-message">
                      Please enter the expected salary.
                    </div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <strong>Salary expectation is?</strong>
                  </label>
                  <div className={`d-flex`}>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      {/* <label className="form-check-label me-3"> */}
                      <input
                        type="radio"
                        name="salaryexpectation"
                        id="salaryexpectationYes"
                        value="Average"
                        className="form-check-input"
                        checked={formData.salaryexpectation === "Average"}
                        onChange={() =>
                          handleRadioChange("salaryexpectation", "Average")
                        }
                      />
                      <label for="salaryexpectationYes">Average</label>
                      {/* </label> */}
                    </div>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name="salaryexpectation"
                          id="salaryexpectationNo"
                          value="High"
                          className="form-check-input"
                          checked={formData.salaryexpectation === "High"}
                          onChange={() =>
                            handleRadioChange("salaryexpectation", "High")
                          }
                        />
                        <label for="salaryexpectationNo">High</label>
                      </label>
                    </div>
                  </div>

                  {!formData.isExpectedSalarySelected && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select a expectation salary.
                    </div>
                  )}
                </div>
                {/* <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <strong>
                      Willing to work for current industry salary that you
                      suggested?
                    </strong>
                  </label>
                  <div className={`d-flex`}>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                     
                      <input
                        type="radio"
                        name="currentindustrysalary"
                        value="True"
                        id="currentindustrysalaryRadioYes"
                        className="form-check-input"
                        checked={formData.currentindustrysalary === "True"}
                        onChange={() =>
                          handleRadioChange("currentindustrysalary", "True")
                        }
                      />
                      <label for="currentindustrysalaryRadioYes">Yes</label>
                    
                    </div>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      <input
                        type="radio"
                        name="currentindustrysalary"
                        id="currentindustrysalaryRadioNo"
                        value="False"
                        className="form-check-input"
                        checked={formData.currentindustrysalary === "False"}
                        onChange={() =>
                          handleRadioChange("currentindustrysalary", "False")
                        }
                      />
                      <label for="currentindustrysalaryRadioNo">No</label>
                     
                    </div>
                  </div>
                  {!formData.iscurrentindustrysalarySelected && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select a current industry salary.
                    </div>
                  )}
                </div> */}
                {/* <div className="col-md-6 mb-3">
                  <label
                    htmlFor="currentindustrysalaryDropdown"
                    className="form-label"
                  >
                    <strong>
                      {" "}
                      Willing to work for current industry salary that you
                      suggested?
                    </strong>
                  </label>
                  <select
                    className={`form-control ${
                      !formData.iscurrentindustrysalaryValid && "is-invalid"
                    }`}
                    id="currentDropdown"
                    value={formData.currentindustrysalary}
                    onChange={(e) =>
                      handleChange("currentindustrysalary", e.target.value)
                    }
                  >
                    <option value="">Select current industry salary</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="I am not sure">I am not sure</option>
                  </select>
                  {!formData.iscurrentindustrysalaryValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please Current Industry salary.
                    </div>
                  )}
                </div> */}
              </div>
              <div id="Education">
                <div className={`${styles.container}`}>
                  <h2 className={`${styles.Heading}`}>Educational Details</h2>
                </div>

                <div className="row mt-3">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="educationDropdown" className="form-label">
                      <strong>Education</strong>
                    </label>
                    <select
                      className={`form-control ${
                        !formData.iseducationValid && "is-invalid"
                      }`}
                      id="educationDropdown"
                      value={formData.education}
                      onChange={(e) =>
                        handleChange("education", e.target.value)
                      }
                    >
                      <option value="">Select education</option>
                      <option value="Below 10">Below 10</option>
                      <option value="10th Pass and Above">
                        10th Pass and Above
                      </option>
                      <option value="Diploma">Diploma</option>
                      <option value="ITI">ITI</option>
                      <option value="UG">UG</option>
                      <option value="PG">PG</option>
                    </select>
                    {!formData.iseducationValid && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select the education.
                      </div>
                    )}
                  </div>
                  {(formData.education === "Diploma" ||
                    formData.education === "ITI" ||
                    formData.education === "UG" ||
                    formData.education === "PG") && (
                    <div className="col-md-6 mb-3">
                      <label htmlFor="positionDropdown" className="form-label">
                        <strong>Specialization</strong>
                      </label>
                      <Select
                        className={`react-select-container ${
                          !formData.isSpecializationValid && "is-invalid"
                        }`}
                        // innerref={firstErrorRef}
                        classNamePrefix="react-select"
                        id="positionDropdown"
                        value={formData.Specialization}
                        options={courses}
                        onChange={(selectedOption) =>
                          handleSpcalization("Specialization", selectedOption)
                        }
                        // onBlur={() => handleBlur("Specialization")}
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            border: "1px solid #ced4da",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }),
                        }}
                      />
                      {!formData.isSpecializationValid && (
                        <div style={{ color: "red" }} className="error-message">
                          Please select a Specialization.
                        </div>
                      )}
                    </div>
                  )}
                  {(formData.education === "Diploma" ||
                    formData.education === "ITI" ||
                    formData.education === "UG" ||
                    formData.education === "PG") && (
                    <div className="col-md-6 mb-3">
                      <label htmlFor="completedYear" className="form-label">
                        <strong>Degree completed Year?</strong>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          !formData.isCompletedYear && "is-invalid"
                        }`}
                        id="completedYear"
                        value={formData.completedYear}
                        onChange={(e) =>
                          handlefieldchange("completedYear", e.target.value)
                        }
                        maxLength={4}
                        onKeyPress={(e) => {
                          // Allow only numbers
                          if (!/\d/.test(e.key)) {
                            e.preventDefault(); // Prevent the input of non-numeric characters
                          }
                        }}
                      />
                      {!formData.isCompletedYear && (
                        <div style={{ color: "red" }} className="error-message">
                          Please enter completed year
                        </div>
                      )}
                    </div>
                  )}
                  {/* <div className="col-md-6 mb-3">
                    <label className="form-label">
                      <strong>Mechanical related degree/course?</strong>
                    </label>
                    <div className={`d-flex`}>
                      <div className="mb-3 d-flex">
                      <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                        <input
                          type="radio"
                          name="course"
                          id="courseRadioYes"
                          value="True"
                          className="form-check-input"
                          checked={formData.course === "True"}
                          onChange={() => handleRadioChange("course", "True")}
                        />
                        <label for="courseRadioYes">Yes</label>
                        </label>
                      </div>
                      <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                        <label className="form-check-label">
                          <input
                            type="radio"
                            name="course"
                            id="courseRadioNo"
                            value="False"
                            className="form-check-input"
                            checked={formData.course === "False"}
                            onChange={() =>
                              handleRadioChange("course", "False")
                            }
                          />
                          <label for="courseRadioNo">No</label>
                        </label>
                      </div>
                    </div>

                    {!formData.isCourseValid && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select a course.
                      </div>
                    )}
                  </div> */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      <strong>Do you have any arrear(s)?</strong>
                    </label>
                    <div className={`d-flex`}>
                      {/* <div className="mb-3 d-flex"> */}
                      <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                        {/* <label className="form-check-label me-3"> */}
                        <input
                          type="radio"
                          name="coursecompleted"
                          id="coursecompletedYes"
                          value="True"
                          className="form-check-input"
                          checked={formData.coursecompleted === "True"}
                          onChange={() =>
                            handleRadioChange("coursecompleted", "True")
                          }
                        />
                        <label for="coursecompletedYes">Yes</label>
                        {/* </label> */}
                      </div>
                      <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                        <label className="form-check-label">
                          <input
                            type="radio"
                            name="coursecompleted"
                            id="coursecompletedNo"
                            value="false"
                            className="form-check-input"
                            checked={formData.coursecompleted === "False"}
                            onChange={() =>
                              handleRadioChange("coursecompleted", "False")
                            }
                          />
                          <label for="coursecompletedNo">No</label>
                        </label>
                      </div>
                    </div>

                    {!formData.isCompletedSelected && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select a course completed.
                      </div>
                    )}
                  </div>
                  {/* <div className="col-md-6 mb-3">
                    <label className="form-label">
                      <strong>
                        Is there a gap now after education ( 1year or more)?
                      </strong>
                    </label>
                    <div className={`d-flex`}>
                      <div className={`ms-2 mb-3 d-flex ${styles.radioInput}`}>
                        <label className="form-check-label me-3">
                        <input
                          type="radio"
                          name="longworkgap"
                          id="longworkgapRadioYes"
                          value="True"
                          className="form-check-input"
                          checked={formData.longworkgap === "True"}
                          onChange={() =>
                            handleRadioChange("longworkgap", "True")
                          }
                        />
                        <label for="longworkgapRadioYes">Yes</label>
                        </label>
                      </div>
                      <div className={`ms-2 mb-3 d-flex ${styles.radioInput}`}>
                        <label className="form-check-label">
                          <input
                            type="radio"
                            name="longworkgap"
                            id="longworkgapRadioNo"
                            value="False"
                            className="form-check-input"
                            checked={formData.longworkgap === "False"}
                            onChange={() =>
                              handleRadioChange("longworkgap", "False")
                            }
                          />
                          <span className="ms-2">No</span>
                          <label for="longworkgapRadioNo">No</label>
                        </label>
                      </div>
                    </div>
                    {!formData.islongworkgapSelected && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select a long work gap.
                      </div>
                    )}
                  </div> */}
                </div>
              </div>
              <div className={`${styles.container}`}>
                <h2 className={`${styles.Heading}`}>Expertise Details</h2>
              </div>

              <div className="row mt-3 ">
                {" "}
                <div className="col-md-6 mb-3">
                  <label htmlFor="anotherDropdown" className="form-label">
                    <strong>Skills</strong>
                  </label>
                  <Select
                    isMulti
                    className={`react-select-container ${
                      !formData.isskills && "is-invalid"
                    }`}
                    classNamePrefix="react-select"
                    id="anotherDropdown"
                    value={formData.skills}
                    options={arrayofData.Skills}
                    onChange={(selectedValues) =>
                      handleMultiSelectChange("skills", selectedValues)
                    }
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        border: "1px solid #ced4da",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }),
                    }}
                  />
                  {!formData.isskills && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select at least one option.
                    </div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="anotherDropdown" className="form-label">
                    <strong>Certification(optional)</strong>
                  </label>
                  <Select
                    isMulti
                    className={`react-select-container 
                    
                    `}
                    // ${
                    //   !formData.isAnotherDropdownValid && "is-invalid"
                    // }
                    classNamePrefix="react-select"
                    id="anotherDropdown"
                    value={formData.certification}
                    options={arrayofData.certification}
                    onChange={(selectedValues) =>
                      handleMultiSelectChange("certification", selectedValues)
                    }
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        border: "1px solid #ced4da",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }),
                    }}
                  />
                  {/* {!formData.isAnotherDropdownValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select at least one option.
                    </div>
                  )} */}
                </div>
                {/* <div className="col-md-6 mb-3">
                  <label htmlFor="anotherDropdown" className="form-label">
                    <strong>Known Language(s)</strong>
                  </label>
                  <Select
                    isMulti
                    className={`react-select-container ${
                      !formData.islanguage && "is-invalid"
                    }`}
                    classNamePrefix="react-select"
                    id="anotherDropdown"
                    value={formData.language}
                    options={arrayofData.language}
                    onChange={(selectedValues) =>
                      handleMultiSelectChange("language", selectedValues)
                    }
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        border: "1px solid #ced4da",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }),
                    }}
                  />
                  {!formData.islanguage && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select at least one option.
                    </div>
                  )}
                </div> */}
                {/* <div className="col-md-6 mb-3">
                  <label htmlFor="skills" className="form-label">
                    <strong>Skills and Certifications (optional)</strong>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      !formData.isSkillValid && "is-invalid"
                    }`}
                    id="skills"
                    value={formData.skills}
                    onChange={(e) =>
                      handlefieldchange("skills", e.target.value)
                    }
                    onKeyPress={(e) => {
                      // Check if the pressed key is a number
                      if (/\d/.test(e.key)) {
                        e.preventDefault(); // Prevent the input of numbers
                      }
                    }}
                  />
                  {!formData.isSkillValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please enter the skills.
                    </div>
                  )}
                </div> */}
              </div>
              <div className="" id="JobLocation">
                <div className={`${styles.container}`}>
                  <h2 className={`${styles.Heading}`}>Job Location Details</h2>
                </div>

                <div className="row mt-3 ">
                  <div className="col-md-6 ">
                    <label htmlFor="anotherDropdown" className="form-label">
                      <strong>Preferred job city?</strong>
                    </label>
                    <Select
                      isMulti
                      className={`react-select-container ${
                        !formData.isAnotherDropdownValid && "is-invalid"
                      }`}
                      classNamePrefix="react-select"
                      id="anotherDropdown"
                      value={formData.anotherDropdown}
                      options={cityOptions}
                      onChange={(selectedValues) => {
                        handleMultiSelectChange(
                          "anotherDropdown",
                          selectedValues
                        );
                        // handleCityAndWorkChange(
                        //   selectedValues,
                        //   formData.suitablework,
                        //   formData.location
                        // );
                      }}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: "1px solid #ced4da",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }),
                      }}
                    />
                    {!formData.isAnotherDropdownValid && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select at least one option.
                      </div>
                    )}
                  </div>
                  {/* <div className="col-md-6 mb-3">
                    <label className="form-label">
                      <strong>
                        Do we have a job opening at the preferred job city?
                      </strong>
                    </label>
                    <div className={`d-flex`}>
                      <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                        <label className="form-check-label me-3">
                        <input
                          type="radio"
                          name="location"
                          id="locationRadioYes"
                          value="True"
                          className="form-check-input"
                          checked={formData.location === "True"}
                          onChange={() => handleRadioChange("location", "True")}
                        />
                        <label for="locationRadioYes">Yes</label>
                        </label>
                      </div>
                      <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                        <label className="form-check-label">
                        <input
                          type="radio"
                          name="location"
                          id="locationRadioNo"
                          value="False"
                          className="form-check-input"
                          checked={formData.location === "False"}
                          onChange={() =>
                            handleRadioChange("location", "False")
                          }
                        />
                        <label for="locationRadioNo">No</label>
                        </label>
                      </div>
                    </div>

                    {!formData.isLocationSelected && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select a city.
                      </div>
                    )}
                  </div> */}

                  {/*<div className="col-md-6 mb-3">
                    <label htmlFor="suitablework" className="form-label">
                      <strong>Suitable work location (area) ?</strong>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        !formData.issuitableworkValid && "is-invalid"
                      }`}
                      id="suitablework"
                      value={formData.suitablework}
                      onChange={(e) => {
                        handlefieldchange("suitablework", e.target.value);
                      }}
                      onKeyPress={(e) => {
                        // Check if the pressed key is a number
                        if (/\d/.test(e.key)) {
                          e.preventDefault(); // Prevent the input of numbers
                        }
                      }}
                    />
                    {!formData.issuitableworkValid && (
                      <div style={{ color: "red" }} className="error-message">
                        Please enter the suitable work.
                      </div>
                    )}
                  </div>*/}
                </div>
              </div>
              {/* <div className={`${styles.container}`}>
                <h2 className={`${styles.Heading}`}>Background Details</h2>
              </div> */}
              {/* break */}
              <div className="row mt-5 mb-4">
                {/* <div className="col-md-6 mb-3">
                  <label htmlFor="currentDropdown" className="form-label">
                    <strong>Current stay type?</strong>
                  </label>
                  <select
                    className={`form-control ${
                      !formData.isCurrentStayValid && "is-invalid"
                    }`}
                    id="currentDropdown"
                    value={formData.current}
                    onChange={(e) => handleChange("current", e.target.value)}
                  >
                    <option value="">Select Current Stay</option>
                    <option value="Rented">Rented</option>
                    <option value="Own House">Own House</option>
                    <option value="Company room">Company room</option>
                  </select>
                  {!formData.isCurrentStayValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select a current Stay type.
                    </div>
                  )}
                </div> */}
                {/* <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <strong>Ready to relocate?</strong>
                  </label>
                  <div className={`d-flex`}>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      <label className="form-check-label me-3">
                      <input
                        type="radio"
                        name="relocate"
                        id="relocateRadioYes"
                        value="True"
                        className="form-check-input"
                        checked={formData.relocate === "True"}
                        onChange={() => handleRadioChange("relocate", "True")}
                      />
                      <label for="relocateRadioYes">Yes</label>
                      </label>
                    </div>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      <label className="form-check-label">
                      <input
                        type="radio"
                        name="relocate"
                        id="relocateRadioNo"
                        value="False"
                        className="form-check-input"
                        checked={formData.relocate === "False"}
                        onChange={() => handleRadioChange("relocate", "False")}
                      />
                      <label for="relocateRadioNo">No</label>
                      </label>
                    </div>
                  </div>

                  {!formData.isRelocateSelected && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select a relocate place.
                    </div>
                  )}
                </div> */}
              </div>

              <div className="" id="JobLocation">
                <div className={`${styles.container}`}>
                  <h2 className={`${styles.Heading}`}>Basic Details</h2>
                </div>
              </div>

              <div className="row mt-3">
                {" "}
                <div className="col-md-4 mb-3">
                  <label htmlFor="name" className="form-label">
                    <strong>Name</strong>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      !formData.isNameValid && "is-invalid"
                    }`}
                    id="name"
                    placeholder="Enter name"
                    // style={{ height: "60px" }}
                    value={formData.name}
                    onChange={(e) => handlefieldchange("name", e.target.value)}
                    onKeyPress={(e) => {
                      // Check if the pressed key is a number
                      if (/\d/.test(e.key)) {
                        e.preventDefault(); // Prevent the input of numbers
                      }
                    }}
                  />
                  {!formData.isNameValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please enter the name.
                    </div>
                  )}
                </div>
                <div className="col-md-2 mb-3">
                  <label htmlFor="initial" className="form-label">
                    <strong>Initial</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter initial"
                    className={`form-control ${
                      !formData.isInitialValid && "is-invalid"
                    }`}
                    id="initial"
                    // style={{ height: "60px" }}
                    value={formData.initial}
                    onChange={(e) =>
                      handlefieldchange("initial", e.target.value)
                    }
                    onKeyPress={(e) => {
                      // Check if the pressed key is a number
                      if (/\d/.test(e.key)) {
                        e.preventDefault(); // Prevent the input of numbers
                      }
                    }}
                  />
                  {!formData.isInitialValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please enter the initial.
                    </div>
                  )}
                </div>
                {/* <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <strong>Gender</strong>
                  </label>
                  <div className={`d-flex`}>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      <label className="form-check-label me-3">
                      <input
                        type="radio"
                        name="gender"
                        id="genderRadioYes"
                        value="True"
                        className="form-check-input"
                        checked={formData.gender === "Male"}
                        onChange={() => handleRadioChange("gender", "Male")}
                      />
                      <label for="genderRadioYes">Male</label>
                      </label>
                    </div>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      <label className="form-check-label">
                      <input
                        type="radio"
                        name="gender"
                        id="genderRadioFemale"
                        value="False"
                        className="form-check-input"
                        checked={formData.gender === "Female"}
                        onChange={() => handleRadioChange("gender", "Female")}
                      />
                      <label for="genderRadioFemale">Female</label>
                      </label>
                    </div>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      <label className="form-check-label">
                      <input
                        type="radio"
                        name="gender"
                        id="genderRadioOther"
                        value="False"
                        className="form-check-input"
                        checked={formData.gender === "Other"}
                        onChange={() => handleRadioChange("gender", "Other")}
                      />
                      <label for="genderRadioOther">Other</label>
                      </label>
                    </div>
                  </div>

                  {!formData.isGenderSelect && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select a gender.
                    </div>
                  )}
                </div> */}
                <div className="col-md-6 mb-3">
                  {/* <Typography variant="subtitle1">
                    <strong>Date</strong>
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date"
                      // inputFormat="DD/MM/yyyy"
                      value={formData.datebirth}
                      onChange={(datebirth) =>
                        handledatebirthchange("datebirth", datebirth)
                      }
                      fullWidth
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          sx={{ width: "100%" }}
                        />
                      )}
                    />
                  </LocalizationProvider> */}

                  <label htmlFor="name" className="form-label">
                    <strong>Date of birth</strong>
                  </label>
                  <input
                    type="date"
                    name=""
                    id=""
                    className={`form-control 
                    
                    `}
                    // ${!formData.datebirth && "is-invalid"}
                    // value={formData.datebirth}
                    onChange={(event) =>
                      handledatebirthchange("datebirth", event.target.value)
                    }
                  />
                  {!formData.isDateOfBirthValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select a date.
                    </div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="mobilenumber" className="form-label">
                    <strong>Mobile number</strong>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      !formData.isMobileNumber && "is-invalid"
                    }`}
                    id="mobilenumber"
                    placeholder="Enter mobile number"
                    value={formData.mobilenumber}
                    // defaultValue={onmobileNumber}
                    onChange={(e) =>
                      handlefieldchange("mobilenumber", e.target.value)
                    }
                    maxLength={10}
                    onKeyPress={(e) => {
                      // Allow only numbers
                      if (!/\d/.test(e.key)) {
                        e.preventDefault(); // Prevent the input of non-numeric characters
                      }
                    }}
                  />
                  {!formData.isMobileNumber && (
                    <div style={{ color: "red" }} className="error-message">
                      Please enter the mobile number.
                    </div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="mobilenumber" className="form-label">
                    <strong>Whatsapp number</strong>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      !formData.isWhatsappNumber && "is-invalid"
                    }`}
                    id="mobilenumber"
                    placeholder="Enter whatsapp number"
                    value={formData.whatsappnumber}
                    // defaultValue={onmobileNumber}
                    onChange={(e) =>
                      handlefieldchange("whatsappnumber", e.target.value)
                    }
                    maxLength={10}
                    onKeyPress={(e) => {
                      // Allow only numbers
                      if (!/\d/.test(e.key)) {
                        e.preventDefault(); // Prevent the input of non-numeric characters
                      }
                    }}
                  />
                  {!formData.isWhatsappNumber && (
                    <div style={{ color: "red" }} className="error-message">
                      Please enter the whatsapp number.
                    </div>
                  )}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6 mb-3">
                  <label htmlFor="staylocation" className="form-label">
                    <strong>Current stay location?</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter stay location"
                    className={`form-control ${
                      !formData.isstaylocationValid && "is-invalid"
                    }`}
                    id="staylocation"
                    value={formData.staylocation}
                    onChange={(e) =>
                      handlefieldchange("staylocation", e.target.value)
                    }
                    onKeyPress={(e) => {
                      // Check if the pressed key is a number
                      if (/\d/.test(e.key)) {
                        e.preventDefault(); // Prevent the input of numbers
                      }
                    }}
                  />
                  {!formData.isstaylocationValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please enter the stay location.
                    </div>
                  )}
                </div>
              </div>
              <div className="row mt-3">
                {/* <div className="col-md-6 ">
                  <strong className="">Permanent state?</strong>
                  <FormControl fullWidth>
                    <Select
                      className={`mt-3 react-select-container ${
                        !formData.isStateValid && "is-invalid"
                      }`}
                      classNamePrefix="react-select"
                      id="statesDropdown"
                      value={formData.states.find(
                        (state) => state.value === formData.selectedState
                      )}
                      options={formData.filteredStates.map((state) => ({
                        value: state.id,
                        label: state.state,
                      }))}
                      // defaultValue={{ value: 31, label: "Tamil Nadu" }}
                      onChange={handleStateChange}
                      onInputChange={filterStates}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: "1px solid #ced4da",
                          borderRadius: "4px",
                          cursor: "pointer",
                          width: "100%",
                        }),
                      }}
                    />
                    {!formData.isStateValid && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select the state.
                      </div>
                    )}
                  </FormControl>
                </div> */}
                {/* <div className="col-md-6 ">
                  <strong className="mb-3">Permanent city?</strong>
                  <FormControl fullWidth>
                    <Select
                      className={`mt-3 react-select-container ${
                        !formData.isCityValid && "is-invalid"
                      }`}
                      classNamePrefix="react-select"
                      id="citiesDropdown"
                      value={formData.cities.find(
                        (city) => city.value === formData.selectedCity
                      )}
                      options={formData.filteredCities.map((city) => ({
                        value: city.id,
                        label: city.city,
                      }))}
                      // defaultValue={formData.filteredCities.find(
                      //   (city) => city.id
                      // )}
                      onChange={handleCityChange}
                      onInputChange={filterCities}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: "1px solid #ced4da",
                          borderRadius: "4px",
                          cursor: "pointer",
                          width: "100%",
                        }),
                      }}
                    />
                    {!formData.isCityValid && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select the city.
                      </div>
                    )}
                  </FormControl>
                </div> */}
              </div>

              <div className="" id="JobLocation">
                <div className={`${styles.container}`}>
                  <h2 className={`${styles.Heading}`}>
                    Emergency Contact Details
                  </h2>
                </div>
              </div>
              <div className="row mt-4 mb-4">
                {" "}
                {/* <div className="col-md-6 mb-3">
                  <label
                    htmlFor="currentindustrysalaryDropdown"
                    className="form-label"
                  >
                    <strong>
                      {" "}
                      Relationship Type
                    </strong>
                  </label>
                  <select
                    className={`form-control ${
                      !formData.isrelationshipstatusValid && "is-invalid"
                    }`}
                    id="currentDropdown"
                    value={formData.relationshipstatus}
                    onChange={(e) =>
                      handleChange("relationshipstatus", e.target.value)
                    }
                  >
                    <option value="">Select The Relation</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                    <option value="Husband">Husband</option>
                    <option value="Wife">Wife</option>
                    
                  </select>
                  {!formData.isrelationshipstatusValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please Select a relationship status
                    </div>
                  )}
                </div> */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="name" className="form-label">
                    <strong>Relation Name</strong>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      !formData.isRelationNameValid && "is-invalid"
                    }`}
                    id="name"
                    placeholder="Enter relation name"
                    // style={{ height: "60px" }}
                    value={formData.relationname}
                    onChange={(e) =>
                      handlefieldchange("relationname", e.target.value)
                    }
                    onKeyPress={(e) => {
                      // Check if the pressed key is a number
                      if (/\d/.test(e.key)) {
                        e.preventDefault(); // Prevent the input of numbers
                      }
                    }}
                  />
                  {!formData.isRelationNameValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please enter relation name.
                    </div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="mobilenumber" className="form-label">
                    <strong>Emergency number</strong>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      !formData.isEmergencynumber && "is-invalid"
                    }`}
                    id="mobilenumber"
                    placeholder="Enter emergency number"
                    value={formData.emergencynumber}
                    // defaultValue={onmobileNumber}
                    onChange={(e) =>
                      handlefieldchange("emergencynumber", e.target.value)
                    }
                    maxLength={10}
                    onKeyPress={(e) => {
                      // Allow only numbers
                      if (!/\d/.test(e.key)) {
                        e.preventDefault(); // Prevent the input of non-numeric characters
                      }
                    }}
                  />
                  {!formData.isEmergencynumber && (
                    <div style={{ color: "red" }} className="error-message">
                      Please enter the emergency number.
                    </div>
                  )}
                </div>
              </div>
              <div className={`${styles.container}`}>
                <h2 className={`${styles.Heading}`}>Other Details</h2>
              </div>
              {/* break */}
              <div className="row mt-5 mt-4">
                {" "}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <strong>Ready to work in shifts?</strong>
                  </label>
                  <div className={`d-flex`}>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      {/* <label className="form-check-label me-3"> */}
                      <input
                        type="radio"
                        name="shift"
                        id="shiftRadioYes"
                        value="True"
                        className="form-check-input"
                        checked={formData.shift === "True"}
                        onChange={() => handleRadioChange("shift", "True")}
                      />
                      <label for="shiftRadioYes">Yes</label>
                      {/* </label> */}
                    </div>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      {/* <label className="form-check-label"> */}
                      <input
                        type="radio"
                        name="shift"
                        id="shiftRadioNo"
                        value="False"
                        className="form-check-input"
                        checked={formData.shift === "False"}
                        onChange={() => handleRadioChange("shift", "False")}
                      />
                      <label for="shiftRadioNo">No</label>
                      {/* </label> */}
                    </div>
                  </div>

                  {!formData.isshiftSelected && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select a shift.
                    </div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <strong>Accomodation required?</strong>
                  </label>
                  <div className={`d-flex`}>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      {/* <label className="form-check-label me-3"> */}
                      <input
                        type="radio"
                        name="accomodation"
                        id="accomodationYes"
                        value="True"
                        className="form-check-input"
                        checked={formData.accomodation === "True"}
                        onChange={() =>
                          handleRadioChange("accomodation", "True")
                        }
                      />
                      <label for="accomodationYes">Yes</label>
                      {/* </label> */}
                    </div>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name="accomodation"
                          id="accomodationNo"
                          value="False"
                          className="form-check-input"
                          checked={formData.accomodation === "False"}
                          onChange={() =>
                            handleRadioChange("accomodation", "False")
                          }
                        />
                        <label for="accomodationNo">No</label>
                      </label>
                    </div>
                  </div>

                  {!formData.isaccomodationSelected && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select an option.
                    </div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label
                    htmlFor="currentpositionDropdown"
                    className="form-label"
                  >
                    <strong>How do you hear about ?</strong>
                  </label>
                  <Select
                    isMulti={false} // Set isMulti to false for single selection
                    className={`react-select-container ${
                      !formData.iscandidateSource && "is-invalid"
                    }`}
                    classNamePrefix="react-select"
                    id="qualificationDropdown"
                    name="candidateSource"
                    value={formData.candidateSource}
                    options={arrayofData.candidateSource}
                    onChange={(selectedValue) =>
                      handleSelectChange("candidateSource", selectedValue)
                    } // Modify onChange to handle single selected value
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        border: "1px solid #ced4da",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        zIndex: 9999, // Set desired z-index value
                      }),
                    }}
                  />
                  {!formData.iscandidateSource && (
                    <div style={{ color: "red" }} className="error-message">
                      Please Select a option
                    </div>
                  )}
                </div>
                {/* <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <strong>Transportation required?</strong>
                  </label>
                  <div className={`d-flex`}>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      <label className="form-check-label me-3">
                      <input
                        type="radio"
                        name="transportation"
                        id="transportationYes"
                        value="True"
                        className="form-check-input"
                        checked={formData.transportation === "True"}
                        onChange={() =>
                          handleRadioChange("transportation", "True")
                        }
                      />
                      <label for="transportationYes">Yes</label>
                      </label>
                    </div>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name="transportation"
                          id="transportationNo"
                          value="False"
                          className="form-check-input"
                          checked={formData.transportation === "False"}
                          onChange={() =>
                            handleRadioChange("transportation", "False")
                          }
                        />
                        <label for="transportationNo">No</label>
                      </label>
                    </div>
                  </div>

                  {!formData.istransportationSelected && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select an option.
                    </div>
                  )}
                </div> */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <strong>Updated CV/Resume?</strong>
                  </label>
                  <div className={`d-flex`}>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      <label className="form-check-label me-3">
                        <input
                          type="radio"
                          name="resume"
                          id="resumeYes"
                          value="True"
                          className="form-check-input"
                          checked={formData.resume === "True"}
                          onChange={() => handleRadioChange("resume", "True")}
                        />
                        <label for="resumeYes">Yes</label>
                      </label>
                    </div>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name="resume"
                          id="resumeNo"
                          value="False"
                          className="form-check-input"
                          checked={formData.resume === "False"}
                          onChange={() => handleRadioChange("resume", "False")}
                        />
                        <label for="resumeNo">No</label>
                      </label>
                    </div>
                  </div>

                  {!formData.isresumeSelected && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select a resume.
                    </div>
                  )}
                </div>
              </div>

              <div className={`${styles.container}`}>
                <h2 className={`${styles.Heading}`}>Notes</h2>
              </div>

              <div className="row mt-5 mt-4">
                {/* <div className="col-md-6 mb-3">
                  <label htmlFor="dateandtime" className="form-label">
                    <strong> Date and Time (Optional)</strong>
                  </label>{" "}
                  <input
                    type="datetime-local"
                    name="date"
                    id="date"
                    className={`form-control`}
                    value={formData.date}
                    onChange={(e) => handledatechange("date", e.target.value)}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      sx={{ width: "100%", zIndex: 6000 }}
                      value={formData.date}
                      onChange={(date) => handledatechange("date", date)}
                    />
                  </LocalizationProvider>
                </div> */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="notes" className="form-label">
                    <strong> Notes (Optional)</strong>
                  </label>
                  <input
                    type="text"
                    className={`form-control`}
                    id="notes"
                    value={formData.notes}
                    maxLength={100}
                    style={{ height: "60px" }}
                    onChange={(e) => handlenoteschange("notes", e.target.value)}
                  />
                </div>
              </div>

              {/* <div className="col-md-6 mb-3">
                <label htmlFor="worklocation" className="form-label">
                  <strong>Work Location</strong>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    !formData.isWorkLocationValid && "is-invalid"
                  }`}
                  id="eworklocation"
                  value={formData.worklocation}
                  onChange={(e) =>
                    handlefieldchange("worklocation", e.target.value)
                  }
                  onKeyPress={(e) => {
                    // Check if the pressed key is a number
                    if (/\d/.test(e.key)) {
                      e.preventDefault(); // Prevent the input of numbers
                    }
                  }}
                />
                {!formData.isWorkLocationValid && (
                  <div style={{ color: "red" }} className="error-message">
                    Please enter the location.
                  </div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="currentlocation" className="form-label">
                  <strong>Current Location</strong>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    !formData.iscurrentLocation && "is-invalid"
                  }`}
                  id="currentlocation"
                  value={formData.currentlocation}
                  onChange={(e) =>
                    handlefieldchange("currentlocation", e.target.value)
                  }
                  onKeyPress={(e) => {
                    // Check if the pressed key is a number
                    if (/\d/.test(e.key)) {
                      e.preventDefault(); // Prevent the input of numbers
                    }
                  }}
                />
                {!formData.iscurrentLocation && (
                  <div style={{ color: "red" }} className="error-message">
                    Please enter the current location.
                  </div>
                )}
              </div> */}
            </div>

            <button
              type="submit"
              className="btn btn-success float-end"
              disabled={enableSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      {showSuccess && (
        <MyModal>
          <ModalContainer
            zIndex={8000}
            childComponent={<SuccessTick HeadText="Successfully" />}
          />
        </MyModal>
      )}
      {/* {showSuccess && ( */}
      {/* <MyModal>
        <ModalContainer
          zIndex={12000}
          childComponent={
            <div style={{ width: "300px", height: "50px" }}>
              <div>Are You Sure You Want to submit?</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <button>Left Button</button>
                <button onClick={handleRightButtonClick}>Right Button</button>
                <button>Right Button</button>
              </div>
            </div>
          }
        />
      </MyModal> */}

      {/* )} */}
    </div>
  );
};

export default YourComponent;
