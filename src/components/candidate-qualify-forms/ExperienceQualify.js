/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  QualifyJobRole,
  GetPreferredCities,
  getJobIndustries,
  PostQualifyCandidate,
  AllEducationDegree,
  GetCities,
  GetStates,
  getKeySkills,
  GetCourses,
  Getlanguages,
  GetCandidateSources,
} from "../../apiServices";
import styles from "./CommonQualify.module.scss";
import dayjs from "dayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SuccessTick from "../../components/success_tick";
import ModalContainer from "../../components/modal_popup";
import { FBmetaLeadsSliceActions } from "../../redux-store/store";
import { MyModal } from "../../utility";
import { FormControl } from "@mui/material";
function ExperienceQualify({
  onclosemodal,
  onmobileNumber,
  onwhatsappNumber,
  onclosepopup,
  Onreloadepage,
}) {
  const firstErrorRef = useRef(null);
  const [jobRoles, setJobRoles] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [jobIndustries, setJobIndustries] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enableSubmit,setEnableSubmit]=useState(false)
  const onnumber = onmobileNumber; // Calling the function
  console.log(onnumber);

  const initialState = {
    date: "",
    notes: "",
    isPrevioussalary: "",
    candidatename: "",
    candidateDOB: "",
    candidateGender: "",
    candidateInitial: "",
    mobilenumber: onmobileNumber,
    whatsappnumber: onwhatsappNumber,
    companyname: null,
    states: [],
    cities: [],
    filteredStates: [],
    filteredCities: [],
    selectedState: "",
    selectedCity: "",
    JobChange: "",
    salaryproof: "",
    Specialization: "",
    currentindustrysalary: "",
    proofdocument: "",
    currentsalary: "",
    staylocation: "",
    suitablework: "",
    completedYear: "",
    immediatejoining: "",
    Currentwork: "",
    noticeperiod: "",
    Currentjob: "",
    currentcompany: "",
    longworkgap: "",
    Overallexperience: "",
    years: "",
    months: "",
    industry: "",
    relationname:"",
    relationshipstatus:"",
    emergencynumber:"",
    currentposition: "",
    currentlyworking: "",
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
    currentlocation: "",
    skills: [],
    certification: [],
    language: [],
    candidateSource: "",
    course: "",
    education: "",
    position: "",
    qualification: "",
    location: "",
    anotherDropdown: "",
    worklocation: "",
    pFEsiaccount: "",
    isPrevioussalary: true,
    iscandidatename: true,
    iscandidateDOB: true,
    // iscandidateGender: true,
    iscandidateInitial: true,
    ismobilenumber: true,
    isWhatsappNumber: true,
    isJobChangeValid: true,
    isCompletedYear: true,
    isRelationNameValid:true,
    // issalaryproofSelected: true,
    isSpecializationValid: false,
    // iscurrentindustrysalarySelected: true,
    // iscurrentindustrysalaryValid: true,
    isproofdocumentValid: true,
    // isrelationshipstatusValid:true,  
    // iscurrentsalaryValid: true,
    iscompanynameValid: true,
    isstaylocationValid: true,
    isEmergencynumber:true,
    // isStateValid: true,
    // isCityValid: true,
    iscandidateSource: true,
    ispFEsiaccount: true,
    // isimmediatejoiningSelected: true,
    isCurrentworkhoursValid: true,
    isnotesValid: true,
    isdateValid: true,
    isnoticeperiodValid: true,
    isCurrentjobValid: true,
    iscurrentcompanyValid: true,
    // islongworkgapSelected: true,
    // isOverallexperienceSelected: true,
    isyearsValid: true,
    ismonthsValid: true,
    // iscurrentpositionValid: true,
    isindustryValid: true,
    isresumeSelected: true,
    // istransportationSelected: true,
    iscurrentlyworkingSelected: true,
    isCompletedSelected: true,
    isaccomodationSelected: true,
    iswillingworkSelected: true,
    // isRelocateSelected: true,
    isExpectedSalarySelected: true,
    // isCourseValid: true,
    iseducationValid: true,
    isPositionValid: true,
    // isCurrentStayValid: true,
    isQualificationSelected: true,
    // isLocationSelected: true,
    isAnotherDropdownValid: true,
    isskills: true,
    iscertification: true,
    // islanguage: true,
    isWorkLocationValid: true,
    isSkillValid: true,
    iscurrentLocation: true,
    isExpected: true,
    isshiftSelected: true,
  };

  const [arrayofData, setArrayofData] = useState({
    Skills: [],
    certification: [],
    language: [],
    candidateSource: [],
  });
  const [formData, setFormData] = useState(initialState);
  const Dispatch = useDispatch();
  const adminDetails = useSelector((state) => state.adminDetails);
  useEffect(() => {
    if (formData.education == "Below 10" || "10th Pass and Above") {
      setFormData((prev) => ({ ...prev, Specialization: "" }));
    }
  }, [formData.education]);

  let isSuperAdmin = adminDetails.roleID == 1;

  useEffect(() => {
    // to set super admin id as 0
    let id = isSuperAdmin ? 0 : localStorage.getItem("adminID");
    Dispatch(FBmetaLeadsSliceActions.setFBmetaListFilterAdminId(id));
  }, []);

  const handleChange = (field, value) => {
    let isValid = true;

    if (field === "education") {
      isValid = value !== "";
      setFormData({
        ...formData,
        [field]: value,
        iseducationValid: isValid,
      });
    }
    // else if (field === "position") {
    //   isValid = value !== "";
    //   setFormData({
    //     ...formData,
    //     [field]: value,
    //     isPositionValid: isValid,
    //   });
    // }
    else if (field === "years") {
      isValid = value !== "";
      setFormData({
        ...formData,
        [field]: value,
        isyearsValid: isValid,
      });
    } else if (field === "months") {
      isValid = value !== "";
      setFormData({
        ...formData,
        [field]: value,
        ismonthsValid: isValid,
      });
    } else if (field === "current") {
      isValid = value !== "";
      setFormData({
        ...formData,
        [field]: value,
        isCurrentStayValid: isValid,
      });
    } else if (field === "Currentjob") {
      isValid = value !== "";
      setFormData({
        ...formData,
        [field]: value,
        isCurrentjobValid: isValid,
      });
    }  else if (field === "relationshipstatus") {
      isValid = value !== "";
      setFormData({
        ...formData,
        [field]: value,
        isrelationshipstatusValid: isValid,
      });
    }else if (field === "Currentwork") {
      isValid = value !== "";
      setFormData({
        ...formData,
        [field]: value,
        isCurrentworkhoursValid: isValid,
      });
    } else if (field === "noticeperiod") {
      isValid = value !== "";
      setFormData({
        ...formData,
        [field]: value,
        isnoticeperiodValid: isValid,
      });
    } else if (field === "currentsalary") {
      isValid = value !== "";
      setFormData({
        ...formData,
        [field]: value,
        iscurrentsalaryValid: isValid,
      });
    } else if (field === "currentindustrysalary") {
      isValid = value !== "";
      setFormData({
        ...formData,
        [field]: value,
        iscurrentindustrysalaryValid: isValid,
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
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

  // const handleMultiSelectChange = (field, selectedValues) => {
  //   if (field === "position") {
  //     setFormData({
  //       ...formData,
  //       [field]: selectedValues,
  //       [`is${field.charAt(0).toUpperCase() + field.slice(1)}Valid`]:
  //         selectedValues.length > 0,
  //     });
  //   } else if (field === "currentposition") {
  //     setFormData({
  //       ...formData,
  //       [field]: selectedValues,
  //       [`is${field.charAt(0).toUpperCase() + field.slice(1)}Valid`]:
  //         selectedValues.length > 0,
  //     });
  //   } else if (field === "industry") {
  //     setFormData({
  //       ...formData,
  //       [field]: selectedValues,
  //       [`is${field.charAt(0).toUpperCase() + field.slice(1)}Valid`]:
  //         selectedValues.length > 0,
  //     });
  //   } else if (field === "anotherDropdown") {
  //     setFormData({
  //       ...formData,
  //       [field]: selectedValues,
  //       [`is${field.charAt(0).toUpperCase() + field.slice(1)}Valid`]:
  //         selectedValues.length > 0,
  //     });
  //   } else if (field === "proofdocument") {
  //     setFormData({
  //       ...formData,
  //       [field]: selectedValues,
  //       [`is${field.charAt(0).toUpperCase() + field.slice(1)}Valid`]:
  //         selectedValues.length > 0,
  //     });
  //   }
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

  const handleRadioChange = (field, value) => {
    const isValid = value !== "";
    if (field === "qualification") {
      // setFormData({
      //   ...formData,
      //   [field]: value,
      //   isQualificationSelected: isValid,
      // });
    } else if (field === "location") {
      setFormData({
        ...formData,
        [field]: value,
        isLocationSelected: isValid,
      });
    } else if (field === "course") {
      setFormData({
        ...formData,
        [field]: value,
        isCourseValid: isValid,
      });
    } else if (field === "candidateGender") {
      setFormData({
        ...formData,
        [field]: value,
        iscandidateGender: isValid,
      });
    } else if (field === "pFEsiaccount") {
      setFormData({
        ...formData,
        [field]: value,
        ispFEsiaccount: isValid,
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
    } else if (field === "currentlyworking") {
      setFormData({
        ...formData,
        [field]: value,
        iscurrentlyworkingSelected: isValid,
      });
    } else if (field === "Overallexperience") {
      setFormData({
        ...formData,
        [field]: value,
        isOverallexperienceSelected: isValid,
      });
    } else if (field === "longworkgap") {
      setFormData({
        ...formData,
        [field]: value,
        islongworkgapSelected: isValid,
      });
    } else if (field === "immediatejoining") {
      setFormData({
        ...formData,
        [field]: value,
        isimmediatejoiningSelected: isValid,
      });
    } else if (field === "currentindustrysalary") {
      setFormData({
        ...formData,
        [field]: value,
        iscurrentindustrysalarySelected: isValid,
      });
    } else if (field === "salaryproof") {
      setFormData({
        ...formData,
        [field]: value,
        issalaryproofSelected: isValid,
      });
    }
  };

  // const handleworklocationChange = (value) => {
  //   setFormData({
  //     ...formData,
  //     worklocation: value,
  //     isWorkLocationValid: true,
  //   });
  // };

  // const handleskillChange = (value) => {
  //   setFormData({
  //     ...formData,
  //     skills: value,
  //     isSkillValid: true,
  //   });
  // };

  // const handleskillChange = (value) => {
  //   setFormData({
  //     ...formData,
  //     skills: value,
  //     isSkillValid: true,
  //   });
  // };

  // const handleexpectedChange = (value) => {
  //   setFormData({
  //     ...formData,
  //     expected: value,
  //     isExpected: true,
  //   });
  // };

  // const handlecurrentlocation = (value) => {
  //   setFormData({
  //     ...formData,
  //     currentlocation: value,
  //     iscurrentLocation: true,
  //   });
  // };

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
    } else if (field === "candidatename") {
      isValid = fieldValid;
      setFormData({
        ...formData,
        candidatename: value,
        iscandidatename: isValid,
      });
    } else if (field === "candidateInitial") {
      isValid = fieldValid;
      setFormData({
        ...formData,
        candidateInitial: value,
        iscandidateInitial: isValid,
      });
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
    }
    // Add other specific field validations similarly

    else if (field === "expected") {
      isValid = fieldValid;
      setFormData({
        ...formData,
        expected: value,
        isExpected: isValid,
      });
    } else if (field === "completedYear") {
      isValid = fieldValid;
      setFormData({
        ...formData,
        completedYear: value,
        isCompletedYear: isValid,
      });
    } else if (field === "currentlocation") {
      isValid = fieldValid;
      setFormData({
        ...formData,
        currentlocation: value,
        iscurrentLocation: isValid,
      });
    }
   
    else if (field === "relationname") {
      isValid = value !== "";
      setFormData({
        ...formData,
        relationname: value,
        isRelationNameValid: true,
      });
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
    } else if (field === "suitablework") {
      isValid = fieldValid;
      setFormData({
        ...formData,
        suitablework: value,
        issuitableworkValid: isValid,
      });
    } else if (field === "staylocation") {
      isValid = fieldValid;
      setFormData({
        ...formData,
        staylocation: value,
        isstaylocationValid: isValid,
      });
    } else if (field === "companyname") {
      isValid = fieldValid;
      setFormData({
        ...formData,
        companyname: value,
        iscompanynameValid: isValid,
      });
    } else if (field === "Previoussalary") {
      isValid = fieldValid;
      setFormData({
        ...formData,
        Previoussalary: value,
        isPrevioussalary: isValid,
      });
    }
  };

  const handleSelectChange = (fieldName, selectedOption) => {
    // Update formData with selected option
    setFormData({
      ...formData,
      [fieldName]: selectedOption,
      [`${fieldName}Valid`]: !!selectedOption, // Assuming single selection, check if selectedOption is truthy
    });

    // Validate other fields based on fieldName
    if (fieldName === "position") {
      // Validate position field
      setFormData((prevFormData) => ({
        ...prevFormData,
        isPositionValid: !!selectedOption,
      }));
    }
    if (fieldName === "skills") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        isskills: !!selectedOption,
      }));
    }
    if (fieldName === "language") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        islanguage: !!selectedOption,
      }));
    } else if (fieldName === "currentposition") {
      // Validate anotherField
      setFormData((prevFormData) => ({
        ...prevFormData,
        iscurrentpositionValid: !!selectedOption,
      }));
    } else if (fieldName === "industry") {
      // Validate anotherField
      setFormData((prevFormData) => ({
        ...prevFormData,
        isindustryValid: !!selectedOption,
      }));
    } else if (fieldName === "JobChange") {
      // Validate anotherField
      setFormData((prevFormData) => ({
        ...prevFormData,
        isJobChangeValid: !!selectedOption,
      }));
    } else if (fieldName === "candidateSource") {
      // Validate anotherField
      setFormData((prevFormData) => ({
        ...prevFormData,
        iscandidateSource: !!selectedOption,
      }));
    }
  };
  const handledatebirthchange = (field, value) => {
    console.log(value,"good date");
        setFormData((prevFormData) => ({
      ...prevFormData,
      // [field]: formattedDate, // Set the field value to the formatted date string
      [field]: value, // Set the field value directly
      iscandidateDOB: true,
    }));
  };
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

  const handlenoteschange = (field, value) => {
    setFormData({
      ...formData,
      notes: value,
      isnotesValid: true,
    });
  };
  // const handledatechange = (field, value) => {
  //   setFormData({
  //     ...formData,
  //     date: value,
  //     isdateValid: true,
  //   });
  // };

  const handledatechange = (field, value) => {
    // const formattedDate = dayjs(value.$d).format("DD-MM-YYYY HH:mm");
    const formattedDate = dayjs(value.$d).format("DD-MM-YYYY hh:mm ");

    console.log("Field:", field);
    console.log("Formatted Date:", formattedDate);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value.$d,
      isdateValid: true,
    }));
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
    // Fetch job industries when component mounts
    getJobIndustries()
      .then((data) => {
        if (data.statuscode === 200) {
          setJobIndustries(
            data.results.map((industry) => ({
              value: industry.industry,
              label: industry.industry,
            }))
          );
        } else {
          console.error("Failed to fetch job industries:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching job industries:", error);
      });
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
      Previoussalary,
      companyname,
      relationname,
      relationshipstatus,
      emergencynumber,
      JobChange,
      salaryexpectation,
      salaryproof,
      proofdocument,
      currentsalary,
      currentindustrysalary,
      staylocation,
      suitablework,
      immediatejoining,
      noticeperiod,
      Currentwork,
      Currentjob,
      currentcompany,
      longworkgap,
      Overallexperience,
      months,
      years,
      resume,
      coursecompleted,
      currentposition,
      industry,
      currentlyworking,
      accomodation,
      shift,
      willingwork,
      relocate,
      position,
      qualification,
      anotherDropdown,
      location,
      notes,
      date,
      worklocation,
      education,
      language,
      certification,
      completedYear,
      course,
      skills,
      current,
      currentlocation,
      expected,
      transportation,
      candidateDOB,
      candidatename,
      candidateInitial,
      candidateGender,
      candidateSource,
      mobilenumber,
      whatsappnumber,
      pFEsiaccount,
      compl,
      selectedCity,
      selectedState,
    } = formData;

    setFormData({
      ...formData,
      // iscompanynameValid: !!companyname,
      isJobChangeValid: !!JobChange,
      isRelationNameValid: !!relationname,
      isExpectedSalarySelected: !!salaryexpectation,
      issalaryproofSelected: !!salaryproof,
      isproofdocumentValid: !!proofdocument,
      // iscurrentsalaryValid: !!currentsalary,
      // iscurrentindustrysalaryValid: !!currentindustrysalary,
      isstaylocationValid: !!staylocation,
      // isimmediatejoiningSelected: !!immediatejoining,
      issuitableworkValid: suitablework,
      isnoticeperiodValid: !!noticeperiod,
      isCurrentworkhoursValid: !!Currentwork,
      isCurrentjobValid: !!Currentjob,
      iscurrentcompanyValid: currentcompany,
      // isrelationshipstatusValid: !!relationshipstatus,
      // islongworkgapSelected: !!longworkgap,
      // isOverallexperienceSelected: !!Overallexperience,
      ismonthsValid: !!months,
      isyearsValid: !!years,
      isindustryValid: !!industry,
      iscurrentpositionValid: !!currentposition,
      isresumeSelected: !!resume,
      istransportationSelected: !!transportation,
      isCompletedSelected: !!coursecompleted,
      isaccomodationSelected: !!accomodation,
      isshiftSelected: !!shift,
      // iswillingworkSelected: !!willingwork,
      isRelocateSelected: !!relocate,
      isPositionValid: !!position,
      iscurrentlyworkingSelected: !!currentlyworking,
      // isQualificationSelected: !!qualification,
      isAnotherDropdownValid: !!anotherDropdown.length > 0,
      // isLocationSelected: !!location,
      isWorkLocationValid: !!worklocation,
      iseducationValid: !!education,
      // isCourseValid: !!course,
      isskills: !!skills.length > 0,
      iscertification: !!certification.length > 0,
      // islanguage: !!language.length > 0,
      isCurrentStayValid: !!current,
      iscurrentLocation: !!currentlocation,
      // isCompletedYear: !!completedYear,
      isExpected: !!expected,
      isnotesValid: !!notes,
      isdateValid: !!date,
      ispFEsiaccount: !!pFEsiaccount,
      isCompletedYear: !!completedYear,
      iscandidateSource: !!candidateSource,
      isPrevioussalary: !!Previoussalary,
      iscandidateDOB: !!candidateDOB,
      iscandidatename: !!candidatename,
      // iscandidateGender: !!candidateGender,
      iscandidateInitial: !!candidateInitial,
      ismobilenumber: !!(mobilenumber && mobilenumber.toString().length === 10),
      isWhatsappNumber: !!(whatsappnumber && whatsappnumber.toString().length == 10),
      isEmergencynumber: !!(emergencynumber && emergencynumber.length === 10),
      // isCityValid: !!selectedCity,
      // isStateValid: !!selectedState,
      isSpecializationValid: checkSpecializationValidation(),
      // isExpectedSalarySelected: salaryexpectation,
    });

    if (
      (position &&
        anotherDropdown.length > 0 &&
        location &&
        education &&
        course &&
        salaryexpectation &&
        expected &&
        shift &&
        accomodation &&
        current &&
        relocate &&
        coursecompleted &&
        transportation &&
        proofdocument &&
        mobilenumber &&
        candidatename &&
        candidateDOB &&
        candidateInitial &&
        candidateSource &&
        candidateGender &&
        skills &&
        pFEsiaccount &&
        emergencynumber&&
        relationshipstatus&&
        relationname&&
        // certification &&
        language &&
        selectedCity &&
        selectedState) ||
      checkSpecializationValidation() ||
      completedYear
    ) {
      try {
        const apiData = {
          firstName: candidatename,
          mobileNumber: mobilenumber,
          whatsappNumber: whatsappnumber,
          lastName: candidateInitial,
          dateOfBirth: candidateDOB,
          // gender: "Male",
          appliedJobrole: selectedPosition,
          preferredJobLocation: selectedjoblocation
            .map((option) => option.label)
            .join(","),
          // jobrole: selectjobrole,
          reasonForJobChange: selectedjobchange,
          industry: selectedindustry,
          experienceInMonth: months,
          experienceInYear: years,
          overallExperience: Overallexperience,
          havingWorkGap: longworkgap,
          experienced: true,
          currentlyWorking: true,
          companyLocation: currentcompany,
          jobType: Currentjob,
          jobWorkHours: Currentwork,
          noticePeriod: noticeperiod,
          immediateJoiner: immediatejoining,
          // canSuitableJobLocation: suitablework,
          adminSuggestedSalary: currentsalary,
          // currentStayType: current,
          currentCandidateLocation: staylocation,
          // havingSalaryProof: salaryproof,
          havingJobLocation: location,
          education: education,
          companyName: companyname,
          isMechanicalRelatedDegree: course,
          // skillsCertifications: skills,
          keySkill: formData.skills.map((option) => option.label).join(","),
          reference: formData.candidateSource.label,
          pfEsiAccount: pFEsiaccount,
          passed_out_year: completedYear,
          certificationCourses: formData.certification
            .map((option) => option.label)
            .join(","),
          knownLanguages: formData.language
            .map((option) => option.label)
            .join(","),
          // readyToRelocate: relocate,
          expectedSalary: parseInt(expected, 10),
          salaryExpectationAdminPreference: salaryexpectation,
          readyForShifts: shift,
          needAccommodation: accomodation,
          // needTransport: transportation,
          havingUpdatedCV: resume,
          workForSuggestedSalary: currentindustrysalary,
          takeHomeSalary: Previoussalary,
          specialization: selectedspecizationoption,
          salaryProofDocumentType: selectedproofdocumentoption
            .map((option) => option.label)
            .join(","),

          isCourseCompleted: coursecompleted,
          followUpDate: date,
          notes: notes,
          currentState: selectedState,
          currentCity: selectedCity,
          emergencyContactNumber:emergencynumber,
          relationshipType:relationshipstatus,
          relationName:relationname,
        };
        setEnableSubmit(true)
        const response = await PostQualifyCandidate(
          apiData,
          onnumber,
          date,
          notes
        );
        console.log("API Response:", response);
        setShowSuccess(true);
        setEnableSubmit(false)
        setTimeout(() => {
          setShowSuccess(false);
          onclosemodal();
          onclosepopup();
          Onreloadepage();
        }, 3000);
        // Handle success scenario (e.g., show success message, reset form, etc.)
      } catch (error) {
        console.error("API Error:", error);
        // Handle error scenario (e.g., show error message)
      }
    } else {
      const firstErrorMessage = document.querySelector(".error-message");
      if (firstErrorMessage) {
        // Scroll to the first error message element
        firstErrorMessage.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(()=>{
    console.log(formData,formData.isWhatsappNumber,"Helooooooooooooooooooooooooooooooooooooooo")
  },[formData.isWhatsappNumber])

  return (
    <div className="container" style={{ marginBottom: "25px" }}>
      <div className="">
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="container-fluid">
              <div className={`${styles.container}`}>
                <h2 className={`${styles.Heading}`}>Current Status</h2>
              </div>
              <div className="row mt-3">
                <div className="col-md-6 mb-3">
                  <label
                    htmlFor="currentpositionDropdown"
                    className="form-label"
                  >
                    <strong>Reason for Job Change?</strong>
                  </label>
                  <Select
                    isMulti={false} // Set isMulti to false for single selection
                    className={`react-select-container ${
                      !formData.isJobChangeValid && "is-invalid"
                    }`}
                    classNamePrefix="react-select"
                    id="qualificationDropdown"
                    value={formData.JobChange}
                    options={[
                      // { value: "", label: "" },
                      { value: "Higher Salary ", label: "Higher Salary " },
                      { value: "Higher Position ", label: "Higher Position " },
                      {
                        value: "Contract ending soon ",
                        label: "Contract ending soon ",
                      },
                      { value: "Job Location", label: "Job Location" },
                      { value: "Shift Timings ", label: "Shift Timings " },
                      { value: "Work Hours ", label: "Work Hours " },
                      {
                        value: "Other reason is not listed",
                        label: "Other reason is not listed",
                      },
                      {
                        value: "No company accommodation",
                        label: "No company accommodation",
                      },
                    ]}
                    onChange={(selectedValue) =>
                      handleSelectChange("JobChange", selectedValue)
                    } // Modify onChange to handle single selected value
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        border: "1px solid #ced4da",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }),
                    }}
                  />
                  {!formData.isJobChangeValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please Select a Job Change
                    </div>
                  )}
                </div>
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
                    onChange={(selectedOption) =>
                      handleSelectChange("position", selectedOption)
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
                  {!formData.isPositionValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select a position.
                    </div>
                  )}
                </div>
              </div>
              <div className={`${styles.container}`}>
                <h2 className={`${styles.Heading}`}>Experience Details</h2>
              </div>

              <div className="row mt-5">
                <div className="col-md-6 mb-3">
                  <label htmlFor="industryDropdown" className="form-label">
                    <strong>Current industry?</strong>
                  </label>
                  <Select
                    isMulti={false} // Set isMulti to false for single selection
                    className={`react-select-container mt-2 ${
                      !formData.isindustryValid && "is-invalid"
                    }`}
                    classNamePrefix="react-select"
                    id="industryDropdown"
                    name="industry"
                    value={formData.industry}
                    onChange={(
                      selectedValue // Handle single selected value
                    ) => handleSelectChange("industry", selectedValue)}
                    options={jobIndustries}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        border: "1px solid #ced4da",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }),
                    }}
                  />
                  {!formData.isindustryValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select a current industry.
                    </div>
                  )}
                </div>
                <div className="col-md-6 d-flex gap-3">
                  <div>
                    <strong>Experience in years and months</strong>
                    <div className="d-flex gap-3">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="yearsDropdown" className="form-label">
                          {/* <strong>Years</strong> */}
                        </label>
                        <select
                          className={`form-control ${
                            !formData.isyearsValid && "is-invalid"
                          }`}
                          id="monthsDropdown"
                          value={formData.years}
                          onChange={(e) =>
                            handleChange("years", e.target.value)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <option value="">Select years</option>
                          <option value="0">0 year</option>
                          <option value="1">1 year</option>
                          <option value="2">2 years</option>
                          <option value="3">3 years</option>
                          <option value="4">4 years</option>
                          <option value="5">5 years</option>
                          <option value="6">6 years</option>
                          <option value="7">7 years</option>
                          <option value="8">8 years</option>
                          <option value="9">9 years</option>
                          <option value="10">10 years</option>
                          <option value="11">11 years</option>
                          <option value="12">12 years</option>
                        </select>
                        {!formData.isyearsValid && (
                          <div
                            style={{ color: "red" }}
                            className="error-message"
                          >
                            Please select the years.
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6 ">
                        <label htmlFor="monthsDropdown" className="form-label">
                          {/* <strong>Months</strong> */}
                        </label>
                        <select
                          className={`form-control ${
                            !formData.ismonthsValid && "is-invalid"
                          }`}
                          id="monthsDropdown"
                          value={formData.months}
                          onChange={(e) =>
                            handleChange("months", e.target.value)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <option value="">Select months</option>
                          <option value="0">0 month</option>
                          <option value="1">1 month</option>
                          <option value="2">2 months</option>
                          <option value="3">3 months</option>
                          <option value="4">4 months</option>
                          <option value="5">5 months</option>
                          <option value="6">6 months</option>
                          <option value="7">7 months</option>
                          <option value="8">8 months</option>
                          <option value="9">9 months</option>
                          <option value="10">10 months</option>
                          <option value="11">11 months</option>
                          <option value="12">12 months</option>
                        </select>
                        {!formData.ismonthsValid && (
                          <div
                            style={{ color: "red" }}
                            className="error-message"
                          >
                            Please select the months.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <strong>
                      Overall experience in the same industry and job category?
                    </strong>
                  </label>
                  <div className={`d-flex`}>
                    <div className={`ms-2 mb-3 ${styles.radioInput}`}>
                      <label className="form-check-label me-3">
                      <input
                        type="radio"
                        name="Overallexperience"
                        value="True"
                        className="form-check-input"
                        id="OverallexperienceYes"
                        checked={formData.Overallexperience === "True"}
                        onChange={() =>
                          handleRadioChange("Overallexperience", "True")
                        }
                      />
                      <label for="OverallexperienceYes">Yes</label>
                      </label>
                    </div>
                    <div className={`ms-2 mb-3 ${styles.radioInput}`}>
                      <label className="form-check-label">
                      <input
                        type="radio"
                        name="Overallexperience"
                        value="False"
                        id="OverallexperienceNo"
                        className="form-check-input"
                        checked={formData.Overallexperience === "False"}
                        onChange={() =>
                          handleRadioChange("Overallexperience", "False")
                        }
                      />
                      <label for="OverallexperienceNo">No</label>
                      </label>
                    </div>
                  </div>
                  {!formData.isOverallexperienceSelected && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select a Overall experience.
                    </div>
                  )}
                </div> */}
                {/* <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <strong>Long work gap in the past?</strong>
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

              <div className={`${styles.container}`}>
                <h2 className={`${styles.Heading}`}>Current Work Details</h2>
              </div>
              {/* break */}
              {/* {formData.longworkgap === true || formData.longworkgap===false} */}
              <div className="row mt-5 mb-4">
                {" "}
                <div className="col-md-6 mb-3">
                  <label htmlFor="companyname" className="form-label">
                    <strong>Current company name?</strong>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      !formData.iscompanynameValid && "is-invalid"
                    }`}
                    id="companyname"
                    value={formData.companyname}
                    onChange={(e) =>
                      handlefieldchange("companyname", e.target.value)
                    }
                    onKeyPress={(e) => {
                      // Check if the pressed key is a number
                      if (/\d/.test(e.key)) {
                        e.preventDefault(); // Prevent the input of numbers
                      }
                    }}
                  />
                  {!formData.iscompanynameValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please enter the current company name.
                    </div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="currentcompany" className="form-label">
                    <strong>Current company work location?</strong>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      !formData.iscurrentcompanyValid && "is-invalid"
                    }`}
                    id="currentcompany"
                    value={formData.currentcompany}
                    onChange={(e) =>
                      handlefieldchange("currentcompany", e.target.value)
                    }
                    onKeyPress={(e) => {
                      // Check if the pressed key is a number
                      if (/\d/.test(e.key)) {
                        e.preventDefault(); // Prevent the input of numbers
                      }
                    }}
                  />
                  {!formData.iscurrentcompanyValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please enter the current company.
                    </div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="currentDropdown" className="form-label">
                    <strong>Current job type?</strong>
                  </label>
                  <select
                    className={`form-control ${
                      !formData.isCurrentjobValid && "is-invalid"
                    }`}
                    id="currentDropdown"
                    value={formData.Currentjob}
                    onChange={(e) => handleChange("Currentjob", e.target.value)}
                  >
                    <option value="">Select Current job type</option>
                    <option value="On Roll">On Roll</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Apprenticeship">Apprenticeship</option>
                  </select>
                  {!formData.isCurrentjobValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select current job type.
                    </div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="currentDropdown" className="form-label">
                    <strong>Current work hours?</strong>
                  </label>
                  <select
                    className={`form-control ${
                      !formData.isCurrentworkhoursValid && "is-invalid"
                    }`}
                    id="currentDropdown"
                    value={formData.Currentwork}
                    onChange={(e) =>
                      handleChange("Currentwork", e.target.value)
                    }
                  >
                    <option value="">Select Current work hours</option>
                    <option value="8 Hours">8 Hours</option>
                    <option value="10 Hours">10 Hours</option>
                    <option value="12 Hours">12 Hours</option>
                  </select>
                  {!formData.isCurrentworkhoursValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select a Current work hours.
                    </div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="currentDropdown" className="form-label">
                    <strong>Notice Period?</strong>
                  </label>
                  <select
                    className={`form-control ${
                      !formData.isnoticeperiodValid && "is-invalid"
                    }`}
                    id="currentDropdown"
                    value={formData.noticeperiod}
                    onChange={(e) =>
                      handleChange("noticeperiod", e.target.value)
                    }
                  >
                    <option value="">Select Notice Period</option>
                    <option value="15 Days">15 Days</option>
                    <option value="1 Month">1 Month</option>
                    <option value="2 Months">2 Months</option>
                    <option value="3 Months">3 Months</option>
                    <option value="None">None</option>
                  </select>
                  {!formData.isnoticeperiodValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select a Notice Period.
                    </div>
                  )}
                </div>
                {/* <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <strong>Immediate Joining</strong>
                  </label>
                  <div className={`d-flex`}>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      <label className="form-check-label me-3">
                      <input
                        type="radio"
                        name="immediatejoining"
                        id="immediatejoiningRadioYes"
                        value="True"
                        className="form-check-input"
                        checked={formData.immediatejoining === "True"}
                        onChange={() =>
                          handleRadioChange("immediatejoining", "True")
                        }
                      />
                      <label for="immediatejoiningRadioYes">Yes</label>
                      </label>
                    </div>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      <label className="form-check-label">
                      <input
                        type="radio"
                        name="immediatejoining"
                        id="immediatejoiningRadioNo"
                        value="False"
                        className="form-check-input"
                        checked={formData.immediatejoining === "False"}
                        onChange={() =>
                          handleRadioChange("immediatejoining", "False")
                        }
                      />
                      <label for="immediatejoiningRadioNo">No</label>
                      </label>
                    </div>
                  </div>
                  {!formData.isimmediatejoiningSelected && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select a Immediate Joining.
                    </div>
                  )}
                </div> */}
              </div>
              <div className={`${styles.container}`}>
                <h2 className={`${styles.Heading}`}>Salary Details</h2>
              </div>
              {/* break */}
              <div className="row mt-5 mt-4">
                <div className="col-md-6 mb-3">
                  <label htmlFor="expected" className="form-label">
                    <strong>Current take home salary?</strong>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      !formData.isPrevioussalary && "is-invalid"
                    }`}
                    id="Previoussalary"
                    value={formData.Previoussalary}
                    onChange={(e) =>
                      handlefieldchange("Previoussalary", e.target.value)
                    }
                    maxLength={5}
                    onKeyPress={(e) => {
                      // Allow only numbers
                      if (!/\d/.test(e.key)) {
                        e.preventDefault(); // Prevent the input of non-numeric characters
                      }
                    }}
                  />
                  {!formData.isPrevioussalary && (
                    <div style={{ color: "red" }} className="error-message">
                      Please enter the Current salary.
                    </div>
                  )}
                </div>
                {/* <div className="col-md-6 mb-3">
                  <label htmlFor="currentDropdown" className="form-label">
                    <strong>Is the jobseeker's current salary?</strong>
                  </label>
                  <select
                    className={`form-control ${
                      !formData.iscurrentsalaryValid && "is-invalid"
                    }`}
                    id="currentDropdown"
                    value={formData.currentsalary}
                    onChange={(e) =>
                      handleChange("currentsalary", e.target.value)
                    }
                  >
                    <option value="">Select Current Salary</option>
                    <option value="High">High</option>
                    <option value="Average">Average</option>
                    <option value="Low">Low</option>
                  </select>
                  {!formData.iscurrentsalaryValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select a Current Salary.
                    </div>
                  )}
                </div> */}
                {/* <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <strong>Having salary proof?</strong>
                  </label>
                  <div className={`d-flex`}>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      <label className="form-check-label me-3">
                      <input
                        type="radio"
                        name="salaryproof"
                        id="salaryproofRadioYes"
                        value="True"
                        className="form-check-input"
                        checked={formData.salaryproof === "True"}
                        onChange={() =>
                          handleRadioChange("salaryproof", "True")
                        }
                      />
                      <label for="salaryproofRadioYes">Yes</label>
                      </label>
                    </div>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      <label className="form-check-label">
                      <input
                        type="radio"
                        name="salaryproof"
                        id="salaryproofRadioNo"
                        value="False"
                        className="form-check-input"
                        checked={formData.salaryproof === "False"}
                        onChange={() =>
                          handleRadioChange("salaryproof", "False")
                        }
                      />
                      <label for="salaryproofRadioNo">No</label>
                      </label>
                    </div>
                  </div>

                  {!formData.issalaryproofSelected && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select a Salary proof.
                    </div>
                  )}
                </div> */}
                <div className="col-md-6 mb-3">
                  <label
                    htmlFor="currentpositionDropdown"
                    className="form-label"
                  >
                    <strong>Salary proof document</strong>
                  </label>
                  <Select
                    isMulti
                    className={`react-select-container ${
                      !formData.isproofdocumentValid && "is-invalid"
                    }`}
                    // innerref={firstErrorRef}
                    classNamePrefix="react-select"
                    id="qualificationDropdown"
                    value={formData.proofdocument}
                    options={[
                      // { value: "", label: "" },
                      { value: "Pay Slip", label: "Pay Slip" },
                      { value: "Bank Statement", label: "Bank Statement" },
                      { value: "None", label: "None" },
                    ]}
                    onChange={(selectedValues) =>
                      handleMultiSelectChange("proofdocument", selectedValues)
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
                  {!formData.isproofdocumentValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please Select a proof document
                    </div>
                  )}
                </div>
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
                      <label className="form-check-label me-3">
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
                      </label>
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
              <div className={`${styles.container}`}>
                <h2 className={`${styles.Heading}`}>Education Details</h2>
              </div>
              {/* break */}

              <div className="row mt-5 mb-4">
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
                    onChange={(e) => handleChange("education", e.target.value)}
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
                          onChange={() => handleRadioChange("course", "False")}
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
                      Please choose
                    </div>
                  )}
                </div>
              </div>
              <div className={`${styles.container}`}>
                <h2 className={`${styles.Heading}`}>Expertise Details</h2>
              </div>
              {/* break */}

              <div className="row mt-4 mb-4">
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
                    className={`react-select-container`}
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
              

              {/* break  */}
              <div className={`${styles.container}`}>
                <h2 className={`${styles.Heading}`}>Job Location Details</h2>
              </div>
              <div className="row mt-4 mb-3">
                <div className="col-md-6 mb-3">
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
                    onChange={(selectedValues) =>
                      handleMultiSelectChange("anotherDropdown", selectedValues)
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
                        onChange={() => handleRadioChange("location", "False")}
                      />
                      <label for="locationRadioNo">No</label>
                      </label>
                    </div>
                  </div>

                  {!formData.isLocationSelected && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select a location.
                    </div>
                  )}
                </div> */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <strong>Having PF/ESI Account ?</strong>
                  </label>
                  <div className={`d-flex`}>
                    {/* <div className="mb-3 d-flex"> */}
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      <input
                        type="radio"
                        name="pFEsiaccount"
                        id="pFEsiaccountYes"
                        value="True"
                        className="form-check-input"
                        checked={formData.pFEsiaccount === "True"}
                        onChange={() =>
                          handleRadioChange("pFEsiaccount", "True")
                        }
                      />
                      <label for="pFEsiaccountYes">Yes</label>
                      {/* </label> */}
                    </div>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name="pFEsiaccount"
                          id="pFEsiaccountNo"
                          value="False"
                          className="form-check-input"
                          checked={formData.pFEsiaccount === "False"}
                          onChange={() =>
                            handleRadioChange("pFEsiaccount", "False")
                          }
                        />
                        <label for="pFEsiaccountNo">No</label>
                      </label>
                    </div>
                  </div>

                  {!formData.ispFEsiaccount && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select pf/esi account
                    </div>
                  )}
                </div>

                {/* <div className="col-md-6 mb-3">
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
                    onChange={(e) =>
                      handlefieldchange("suitablework", e.target.value)
                    }
                    onKeyPress={(e) => {
                      // Check if the pressed key is a number
                      if (/\d/.test(e.key)) {
                        e.preventDefault(); // Prevent the input of numbers
                      }
                    }}
                  />
                  {!formData.issuitableworkValid && (
                    <div style={{ color: "red" }} className="error-message">
                      Please enter the Suitable work.
                    </div>
                  )}
                </div> */}
              </div>
             
              <div className={`${styles.container}`}>
                <h2 className={`${styles.Heading}`}>Basic Details</h2>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6">
                  <div className="row">
                    <div className="col-sm-8">
                      {" "}
                      <label htmlFor="skills" className="form-label">
                        <strong>Name</strong>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          !formData.iscandidatename && "is-invalid"
                        }`}
                        id="candidatename"
                        placeholder="Enter candidate name"
                        value={formData.candidatename}
                        onChange={(e) =>
                          handlefieldchange("candidatename", e.target.value)
                        }
                        onKeyPress={(e) => {
                          // Check if the pressed key is a number
                          if (/\d/.test(e.key)) {
                            e.preventDefault(); // Prevent the input of numbers
                          }
                        }}
                      />
                      {!formData.iscandidatename && (
                        <div style={{ color: "red" }} className="error-message">
                          please enter name
                        </div>
                      )}
                    </div>
                    <div className="col-sm-4">
                      {" "}
                      <label htmlFor="skills" className="form-label">
                        <strong>Initial</strong>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          !formData.iscandidateInitial && "is-invalid"
                        }`}
                        id="candidateInitial"
                        value={formData.candidateInitial}
                        placeholder="Initial"
                        onChange={(e) =>
                          handlefieldchange("candidateInitial", e.target.value)
                        }
                        onKeyPress={(e) => {
                          // Check if the pressed key is a number
                          if (/\d/.test(e.key)) {
                            e.preventDefault(); // Prevent the input of numbers
                          }
                        }}
                      />
                      {!formData.iscandidateInitial && (
                        <div style={{ color: "red" }} className="error-message">
                          please enter initial
                        </div>
                      )}
                    </div>
                  </div>
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
                        checked={formData.candidateGender === "Male"}
                        onChange={() =>
                          handleRadioChange("candidateGender", "Male")
                        }
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
                        checked={formData.candidateGender === "Female"}
                        onChange={() =>
                          handleRadioChange("candidateGender", "Female")
                        }
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
                        checked={formData.candidateGender === "Other"}
                        onChange={() =>
                          handleRadioChange("candidateGender", "Other")
                        }
                      />
                      <label for="genderRadioOther">Other</label>
                      </label>
                    </div>
                  </div>

                  {!formData.iscandidateGender && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select a gender.
                    </div>
                  )}
                </div> */}
                     <div className="col-md-6 mb-3">
                  <label htmlFor="name" className="form-label">
                    <strong>Date of birth</strong>
                  </label>
                  <input
                    type="date"
                    name="candidateDOB"
                    id=""
                    className={`form-control ${
                      !formData.iscandidateDOB && "is-invalid"
                    }`}
                    onChange={(e) =>
                      handledatebirthchange("candidateDOB", e.target.value)
                    }
                    // value={formData.candidateDOB}
                  />
                  {!formData.iscandidateDOB && (
                    <div style={{ color: "red" }} className="error-message">
                      Please select a date of birth.
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
           
                <div className="col-sm-6">
                  <label htmlFor="mobilenumber" className="form-label">
                    <strong>Mobile number</strong>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      !formData.ismobilenumber && "is-invalid"
                    }`}
                    id="mobilenumber"
                    value={formData.mobilenumber}
                    placeholder="Enter mobile number"
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
                  {!formData.ismobilenumber && (
                    <div style={{ color: "red" }} className="error-message">
                      Please enter the mobile number.
                    </div>
                  )}
                </div>
                <div className="col-sm-6">
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
               <div className="row mt-2"> 
              
                <div className="col-md-6 ">
                  <label htmlFor="staylocation" className="form-label">
                    <strong>Current stay location?</strong>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      !formData.isstaylocationValid && "is-invalid"
                    }`}
                    id="staylocation"
                    placeholder="Enter current stay location"
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
                </div></div>
              </div>
              <div className="row mt-2">
                {/* <div className="col-md-6 ">
                  <strong className="mt-1">Permanent state</strong>
                  <FormControl fullWidth>
                    <Select
                      className={`mt-2 react-select-container ${
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
                        Please select the State.
                      </div>
                    )}
                  </FormControl>
                </div> */}
                {/* <div className="col-md-6 ">
                  <strong className="mt-1">Permanent city</strong>
                  <FormControl fullWidth>
                    <Select
                      className={`mt-2 react-select-container ${
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
                        Please select the City.
                      </div>
                    )}
                  </FormControl>
                </div> */}
              </div>
              <div className="" id="JobLocation">
                <div className={`${styles.container}`}>
                  <h2 className={`${styles.Heading}`}>Emergency Contact Details</h2>
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
                    onChange={(e) => handlefieldchange("relationname", e.target.value)}
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
              <div className="row ">
                {" "}
              
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
                      Please select a Current Stay.
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
            
              <div className={`${styles.container}`}>
                <h2 className={`${styles.Heading}`}>Other Details</h2>
              </div>
              {/* break */}
              <div className="row mt-5 mt-4">
                {" "}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <strong>Willing to work in rotational shift?</strong>
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
                    <strong>Accomodation Required?</strong>
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
                      Please select a shift.
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
                    <strong>Transportation Required?</strong>
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
                      Please select a transportation.
                    </div>
                  )}
                </div> */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <strong>Updated CV/Resume?</strong>
                  </label>
                  <div className={`d-flex`}>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      {/* <label className="form-check-label me-3"> */}
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
                      {/* </label> */}
                    </div>
                    <div className={`me-2 mb-3 d-flex ${styles.radioInput}`}>
                      {/* <label className="form-check-label"> */}
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
                      {/* </label> */}
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

            <button type="submit" className="btn btn-success float-end" disabled={enableSubmit}>
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
    </div>
  );
}

export default ExperienceQualify;
