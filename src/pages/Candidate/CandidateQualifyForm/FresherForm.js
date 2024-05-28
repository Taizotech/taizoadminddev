/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import accordionstyle from "./QualifyForm.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import {
  PutFresherBasicDetails,
  PutFresherEmergencyDetails,
  PutFresherExpertise,
  PutFresherJobLocation,
  PutFresherEducationalDetails,
  PutFresherOtherDetails,
  PutFresherStatus,
  putFresherSalarayDetails,
  GetCandidateQualifyDetials,
  GetCandidateQualifyForm,
  GetCandidateSources,
  GetCourses,
  GetDepartments,
  GetPreferredCities,
  QualifyJobRole,
  getJobIndustries,
  getKeySkills,
  getCandidateLead,
  getcandidateDetails,
  GetCandidatePipeline,
} from "../../../apiServices";

import { capitalizeWord, getMaxDate } from "../../../utility";
import {
  CandidatePipelineActions,
  commonPopupActions,
} from "../../../redux-store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export function QualifyFresherform({
  mobilenumber,
  whatsappNumber,
  Reloadpage,
  ReloadupdatePage,
}) {
  console.log(whatsappNumber, "whatsappNumberwhatsappNumber");
  const Dispatch = useDispatch();
  let filterDetails = useSelector(
    (state) => state.CandidatePipelineDetails.candidateFilter
  );
  const [fresherWorkingField, setfresherWorkingField] = useState({
    PostionApply: null,
    ExpectedSalary: "",
    SalaryRadio: "",
    Education: "",
    Specialization: null,
    CompletedYear: "",
    EducationArrear: "",
    KeySkills: "",
    CertificationCourse: "",
    CandidatePreferredCity: "",
    CandidateFirstName: "",
    CandidateLastName: "",
    CandidateDOB: "",
    CandidateMobileNumber: mobilenumber.toString(),
    CandidateWhtsappNumber: whatsappNumber.toString(),
    CandidateCurrentLocation: "",
    EmergencyName: "",
    EmergencyNumber: "",
    RotationalShift: "",
    Accomodation: "",
    Refference: "",
    CvResume: "",
    notes: "",
  });
  const [validity, setValidity] = useState({
    isPositionValid: true,
    isExpectedSalary: true,
    isSalaryRadio: true,
    isEducation: true,
    isSpecialization: true,
    isCompletedYear: true,
    isEducationArrear: true,
    isKeySkills: true,
    isCertificationCourse: true,
    isCandidatePreferredCity: true,
    isCandidateFirstName: true,
    isCandidateLastName: true,
    isCandidateDOB: true,
    isCandidateMobileNumber: true,
    isCandidateWhtsappNumber: true,
    isCandidateCurrentLocation: true,
    isEmergencyName: true,
    isEmergencyNumber: true,
    isRotationalShift: true,
    isAccomodation: true,
    isRefference: true,
    isCvResume: true,
    isValidNotes: true,
    isFollowDate1: true,
    isFollowDate2: true,
  });
  console.log(fresherWorkingField.CandidateWhtsappNumber, "whatsappNumber");
  const [arrayofData, setArrayofData] = useState({
    jobRoles: [],
    city: [],
    industry: [],
    specializationcourses: [],
    DepartmentList: [],
    KeySkills: [],
    Certification: [],
    CandidateSource: [],
  });
  const [enableSubmit, setEnableSubmit] = useState(true);
  const [selected, setSelected] = useState(null);

  const [showEducationDetials, setShowEducationDetials] = useState(false);
  const [stepCompleted, setStepCompleted] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
    step7: false,
    step8: false,
  });
  const [stepSuccess, setStepSuccess] = useState({
    s1Success: false,
    s2Success: false,
    s3Success: false,
    s4Success: false,
    s5Success: false,
    s6Success: false,
    s7Success: false,
    s8Success: false,
  });
  const [selectedDate, setSelectedDate] = useState({
    tentativeInterviewDate: null,
    followUpDate1: null,
  });

  const handleDateChange = (date, type) => {
    setSelectedDate((prevState) => ({
      ...prevState,
      [type]: date,
    }));

    setValidity((prevState) => ({
      ...prevState,
      [type === "tentativeInterviewDate"
        ? "isFollowDate1"
        : "isFollowDate2"]: true,
    }));
    setStepCompleted((prev) => ({ ...prev, step10: true }));
  };

  const handleCandidateDetails = async (candidateleadId, type) => {
    let data;
    if (type === "CandidateLead") {
      data = await getCandidateLead(candidateleadId);
    } else if (type === "RegisterCandidate") {
      data = await getcandidateDetails(candidateleadId);
    }

    // Dispatch action to show the popup and pass the fetched data
    Dispatch(
      commonPopupActions.setShowPopup({
        name: "candidateDetails",
        id: candidateleadId,
        type: type,
        data: data,
      })
    );
  };
  const dateDiff = Math.ceil(
    (selectedDate.tentativeInterviewDate - new Date()) / (1000 * 60 * 60 * 24)
  );
  // console.log(dateDiff, "dateDiff");
  const toggle = (index) => {
    if (
      index === 1 &&
      // !fresherWorkingField.PostionApply &&
      !stepSuccess.s1Success
    ) {
      return;
    }

    if (
      index === 2 &&
      // !fresherWorkingField.ExpectedSalary &&
      // !fresherWorkingField.SalaryRadio
      !stepSuccess.s2Success
    ) {
      return;
    }
    if (
      index === 3 &&
      //  !fresherWorkingField.Education
      !stepSuccess.s3Success
    ) {
      return;
    }
    if (
      index === 4 &&
      // !fresherWorkingField.KeySkills
      !stepSuccess.s4Success
    ) {
      return;
    }
    if (
      index === 5 &&
      //  !fresherWorkingField.CandidatePreferredCity
      !stepSuccess.s5Success
    ) {
      return;
    }
    if (
      index === 6 &&
      // !fresherWorkingField.CandidateFirstName &&
      // !fresherWorkingField.CandidateLastName &&
      // !fresherWorkingField.CandidateDOB &&
      // !fresherWorkingField.CandidateMobileNumber &&
      // !fresherWorkingField.CandidateWhtsappNumber &&
      // !fresherWorkingField.CandidateCurrentLocation
      !stepSuccess.s6Success
    ) {
      return;
    }
    if (
      index === 7 &&
      // !fresherWorkingField.EmergencyName &&
      // !fresherWorkingField.EmergencyNumber
      !stepSuccess.s7Success
    ) {
      return;
    }
    setSelected(index);

    setSelected(index === selected ? null : index);
  };
  const handleSelectChange = (field, selectedValue) => {
    const selectedoption = selectedValue.value;
    console.log("selectedoption", selectedoption);
    if (field === "PostionApply") {
      setfresherWorkingField((prevState) => ({
        ...prevState,
        PostionApply: selectedoption,
      }));
      setValidity((prevState) => ({
        ...prevState,
        isPositionValid: true,
      }));
      setStepCompleted((prev) => ({ ...prev, step1: true }));
    } else if (field === "Education") {
      setfresherWorkingField((prevState) => ({
        ...prevState,
        Education: selectedValue,
        Specialization: null,
        CompletedYear: null,
        EducationArrear: "",
      }));
      setValidity((prevState) => ({
        ...prevState,
        isEducation: true,
      }));

      if (
        selectedValue === "Below 10" ||
        selectedValue === "10th Pass and Above"
      ) {
        setShowEducationDetials(false);
      } else {
        handleGetDepartment(selectedValue);
        setShowEducationDetials(true);
      }

      setStepCompleted((prev) => ({ ...prev, step3: true }));
    } else if (field === "Refference") {
      setfresherWorkingField((prevState) => ({
        ...prevState,
        Refference: selectedoption,
      }));
      setValidity((prevState) => ({
        ...prevState,
        isRefference: true,
      }));
      setStepCompleted((prev) => ({ ...prev, step8: true }));
    }
  };

  const handleInputChange = (field, value) => {
    switch (field) {
      case "ExpectedSalary":
        setfresherWorkingField((prevState) => ({
          ...prevState,
          ExpectedSalary: value,
        }));
        // console.log(value, "Company name value");
        setValidity((prevState) => ({
          ...prevState,
          isExpectedSalary: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step2: true }));
        break;
      case "CompletedYear":
        setfresherWorkingField((prevState) => ({
          ...prevState,
          CompletedYear: value,
        }));
        // console.log(value, "Company name value");
        setValidity((prevState) => ({
          ...prevState,
          isCompletedYear: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step3: true }));
        break;
      case "CandidateFirstName":
        setfresherWorkingField((prevState) => ({
          ...prevState,
          CandidateFirstName: value,
        }));
        // console.log(value, "CandidateFirstName");
        setValidity((prevState) => ({
          ...prevState,
          isCandidateFirstName: value !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step6: true }));
        break;
      case "CandidateLastName":
        setfresherWorkingField((prevState) => ({
          ...prevState,
          CandidateLastName: value,
        }));
        // console.log(value, "CandidateLastName");
        setValidity((prevState) => ({
          ...prevState,
          isCandidateLastName: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step6: true }));
        break;
      case "CandidateDOB":
        setfresherWorkingField((prevState) => ({
          ...prevState,
          CandidateDOB: value,
        }));
        // console.log(value, "CandidateDOB");
        setValidity((prevState) => ({
          ...prevState,
          isCandidateDOB: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step6: true }));
        break;
      case "CandidateMobileNumber":
        setfresherWorkingField((prevState) => ({
          ...prevState,
          CandidateMobileNumber: value,
        }));
        // console.log(value, "Company name value");
        setValidity((prevState) => ({
          ...prevState,
          isCandidateMobileNumber: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step6: true }));
        break;
      case "CandidateWhtsappNumber":
        setfresherWorkingField((prevState) => ({
          ...prevState,
          CandidateWhtsappNumber: value,
        }));
        // console.log(value, "Company name value");
        setValidity((prevState) => ({
          ...prevState,
          isCandidateWhtsappNumber: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step6: true }));
        break;
      case "CandidateCurrentLocation":
        setfresherWorkingField((prevState) => ({
          ...prevState,
          CandidateCurrentLocation: value,
        }));
        // console.log(value, "Company name value");
        setValidity((prevState) => ({
          ...prevState,
          isCandidateCurrentLocation: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step6: true }));
        break;
      case "EmergencyName":
        setfresherWorkingField((prevState) => ({
          ...prevState,
          EmergencyName: value,
        }));
        // console.log(value, "Company name value");
        setValidity((prevState) => ({
          ...prevState,
          isEmergencyName: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step7: true }));
        break;
      case "EmergencyNumber":
        setfresherWorkingField((prevState) => ({
          ...prevState,
          EmergencyNumber: value,
        }));
        // console.log(value, "Company name value");
        setValidity((prevState) => ({
          ...prevState,
          isEmergencyNumber: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step7: true }));
        break;
      case "notes":
        setfresherWorkingField((prevState) => ({
          ...prevState,
          notes: value,
        }));
        // console.log(value, "Company name value");
        setValidity((prevState) => ({
          ...prevState,
          isValidNotes: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step8: true }));
        break;
      default:
        break;
    }
  };

  const handleRadioChange = (field, value) => {
    setfresherWorkingField((prevState) => ({
      ...prevState,
      [field]: value,
    }));

    setValidity((prevState) => ({
      ...prevState,
      isSalaryRadio: value !== "",
      isEducationArrear: value !== "",
      isRotationalShift: value !== "",
      isAccomodation: value !== "",
      isCvResume: value !== "",
    }));
  };

  const handleGetDepartment = (value) => {
    let end_url;

    if (value === "Below 10" || value === "10th Pass and Above") {
      setArrayofData({ DepartmentList: [] });
      return;
    }

    switch (value) {
      case "Diploma":
        end_url = "diplomaCourses";
        break;
      case "ITI":
        end_url = "ITICourses";
        break;
      case "UG":
        end_url = "UGCourses";
        break;
      case "PG":
        end_url = "PGCourses";
        break;
      default:
        end_url = null;
    }

    if (end_url) {
      GetDepartmentdata(end_url);
    }
  };

  const GetDepartmentdata = async (end_url) => {
    try {
      const response = await GetDepartments(end_url);
      const data = response.results;

      setArrayofData({
        ...arrayofData,
        DepartmentList: data,
      });
    } catch (error) {
      console.error("Failed to fetch departments:", error);
      setArrayofData({ ...arrayofData, DepartmentList: [] });
    }
  };
  const handleotherDetilsRadio = (fieldName, value) => {
    console.log(value, "radio value");
    setfresherWorkingField({
      ...fresherWorkingField,
      [fieldName]: value,
    });
    setValidity((prevState) => ({
      ...prevState,

      isRotationalShift: value !== null,
      isAccomodation: value !== null,
      isCvResume: value !== null,
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobRolesResponse = await QualifyJobRole();
        const jobRolesData = jobRolesResponse.results;

        const industriesResponse = await getJobIndustries();
        const industriesData = industriesResponse.results;

        const KeySkillResponse = await getKeySkills();
        const KeySkillsData = KeySkillResponse.results;

        const CertificationResponsedata = await GetCourses();
        const CertififcationCourseData = CertificationResponsedata.results;

        const stateId = 1; // Replace with the actual state ID
        const PreferredCities = await GetPreferredCities(stateId);

        const CandidateSourceResponse = await GetCandidateSources();
        const CadidateSourceData = CandidateSourceResponse;

        setArrayofData({
          ...arrayofData,
          jobRoles: jobRolesData,
          industry: industriesData.map((industry) => ({
            value: industry.industry,
            label: industry.industry,
          })),
          KeySkills: KeySkillsData.map((skill) => ({
            value: skill.id,
            label: skill.skill,
          })),
          Certification: CertififcationCourseData.map((courses) => ({
            value: courses.id,
            label: courses.courses,
          })),
          CandidateSource: CadidateSourceData.map((source) => ({
            value: source.source,
            label: source.source,
          })),
          city: PreferredCities.data.map((city) => ({
            value: city.id,
            label: city.city,
          })),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const mapSpecialization = arrayofData.DepartmentList
    ? arrayofData.DepartmentList.map((data) => ({
        value: data.courses,
        label: data.courses,
      }))
    : [];
  const handleSpecializationChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : null;

    setfresherWorkingField((prevState) => ({
      ...prevState,
      Specialization: selectedValue,
    }));

    setValidity((prevState) => ({
      ...prevState,
      isSpecialization: selectedValue !== null,
    }));
  };
  const handleMultiSelectChange = (field, selectedValues) => {
    setfresherWorkingField((prevState) => ({
      ...prevState,
      [field]: selectedValues,
    }));

    const isValid = selectedValues && selectedValues.length > 0;
    console.log(isValid, "sfhjshfdgui");
    if (field === "KeySkills") {
      setValidity((prevState) => ({
        ...prevState,
        isKeySkills: isValid,
      }));
    }
    console.log(selectedValues, "selectedValues", selectedValues);
    if (isValid) {
      setStepCompleted((prev) => ({
        ...prev,
        step4: isValid,
      }));
    } else {
      setStepCompleted((prev) => ({
        ...prev,
        step4: false,
      }));
    }
    const isPreferredCityValid = selectedValues && selectedValues.length > 0;
    //  console.log(isPreferredCityValid, "sfhjshfdgui");
    if (field === "CandidatePreferredCity") {
      setValidity((prevState) => ({
        ...prevState,
        isCandidatePreferredCity: isPreferredCityValid,
      }));
    }

    if (isPreferredCityValid) {
      setStepCompleted((prev) => ({
        ...prev,
        step5: isPreferredCityValid,
      }));
    } else {
      setStepCompleted((prev) => ({
        ...prev,
        step5: false,
      }));
    }
  };

  useEffect(() => {
    // const isCompletedYearValid =
    //   fresherWorkingField.CompletedYear.trim() !== "";
    // const isspecializationValid = fresherWorkingField.Specialization !== null;
    const shouldValidateEducation =
      fresherWorkingField.Education === "10th Pass and Above";
    const shouldValidateEducation1 =
      fresherWorkingField.Education === "Below 10";
    const isCompletedYearValid =
      shouldValidateEducation && shouldValidateEducation1
        ? fresherWorkingField.CompletedYear &&
          fresherWorkingField.CompletedYear.trim() !== ""
        : true;
    const isSpecializationValid =
      shouldValidateEducation && shouldValidateEducation1
        ? fresherWorkingField.Specialization !== null
        : true;
    const isExpectedSalaryValid =
      fresherWorkingField.ExpectedSalary &&
      fresherWorkingField.ExpectedSalary.trim() !== "";

    const step6Valid =
      fresherWorkingField.CandidateFirstName &&
      fresherWorkingField.CandidateLastName &&
      fresherWorkingField.CandidateDOB &&
      fresherWorkingField.CandidateMobileNumber &&
      fresherWorkingField.CandidateWhtsappNumber &&
      fresherWorkingField.CandidateCurrentLocation &&
      fresherWorkingField.CandidateFirstName !== "" &&
      fresherWorkingField.CandidateLastName !== "" &&
      fresherWorkingField.CandidateDOB.trim() !== "" &&
      fresherWorkingField.CandidateMobileNumber.toString().trim() !== "" &&
      fresherWorkingField.CandidateMobileNumber.length <= 10 &&
      fresherWorkingField.CandidateWhtsappNumber.toString().trim() !== "" &&
      fresherWorkingField.CandidateWhtsappNumber.length <= 10 &&
      fresherWorkingField.CandidateCurrentLocation.trim() !== "";

    const Step7valid =
      fresherWorkingField &&
      fresherWorkingField.EmergencyName &&
      fresherWorkingField.EmergencyNumber &&
      fresherWorkingField.EmergencyNumber.trim() !== "" &&
      fresherWorkingField.EmergencyNumber.length <= 10;

    const isKeySkillsValid = fresherWorkingField.KeySkills.length > 0;
    const ispreferredcityValid =
      fresherWorkingField.CandidatePreferredCity.length > 0;

    if (!isExpectedSalaryValid && stepCompleted.step2) {
      setStepCompleted((prev) => ({
        ...prev,
        step2: false,
      }));
      setStepSuccess((prev) => ({
        ...prev,
        s2Success: false,
      }));
    }
    if (
      (!isCompletedYearValid || !isSpecializationValid) &&
      stepCompleted.step3
    ) {
      setStepCompleted((prev) => ({ ...prev, step3: false }));
      setStepSuccess((prev) => ({ ...prev, s3Success: false }));
    }
    // if (!isCompletedYearValid && stepCompleted.step3) {
    //   setStepCompleted((prev) => ({
    //     ...prev,
    //     step3: false,
    //   }));
    //   setStepSuccess((prev) => ({
    //     ...prev,
    //     s3Success: false,
    //   }));
    // }
    // if (!isspecializationValid && stepCompleted.step3) {
    //   setStepCompleted((prev) => ({
    //     ...prev,
    //     step3: false,
    //   }));
    //   setStepSuccess((prev) => ({
    //     ...prev,
    //     s3Success: false,
    //   }));
    // }
    if (!isKeySkillsValid && !stepCompleted.step4) {
      setStepCompleted((prev) => ({
        ...prev,
        step4: false,
      }));
      setStepSuccess((prev) => ({
        ...prev,
        s4Success: false,
      }));
    }
    if (!ispreferredcityValid && !stepCompleted.step5) {
      setStepCompleted((prev) => ({
        ...prev,
        step5: false,
      }));
      setStepSuccess((prev) => ({
        ...prev,
        s5Success: false,
      }));
    }
    if (
      !fresherWorkingField.CandidatePreferredCity.length > 0 &&
      !stepCompleted.step5
    ) {
      setStepCompleted((prev) => ({
        ...prev,
        step5: false,
      }));
      setStepSuccess((prev) => ({
        ...prev,
        s5Success: false,
      }));
    }
    if (!step6Valid && stepCompleted.step6) {
      setStepCompleted((prev) => ({
        ...prev,
        step6: false,
      }));
      setStepSuccess((prev) => ({
        ...prev,
        s6Success: false,
      }));
    }
    if (!Step7valid && stepCompleted.step7) {
      setStepCompleted((prev) => ({
        ...prev,
        step7: false,
      }));
      setStepSuccess((prev) => ({
        ...prev,
        s7Success: false,
      }));
    }
  }, [
    fresherWorkingField.CandidateFirstName,
    fresherWorkingField.CandidateLastName,
    fresherWorkingField.CandidateDOB,
    fresherWorkingField.CandidateMobileNumber,
    fresherWorkingField.CandidateWhtsappNumber,
    fresherWorkingField.CandidateCurrentLocation,
    fresherWorkingField.EmergencyName,
    fresherWorkingField.EmergencyNumber,
    fresherWorkingField.ExpectedSalary,
    fresherWorkingField.CompletedYear,
    fresherWorkingField.Specialization,
    fresherWorkingField.KeySkills,
    fresherWorkingField.Education,
    fresherWorkingField.CandidatePreferredCity,
  ]);
  // const scrollToElement = (elementId) => {
  //   const element = document.getElementById(elementId);
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  // };
  const handleNextStep = async (currentStep) => {
    switch (currentStep) {
      case 0:
        if (!fresherWorkingField.PostionApply) {
          setValidity((prevState) => ({
            ...prevState,
            isPositionValid: false,
          }));
          return;
        }

        try {
          const response = await PutFresherStatus(
            fresherWorkingField.PostionApply,
            mobilenumber
          );

          if (response.statuscode !== 200) {
            console.error("response status code 400");
            setStepCompleted({ ...stepCompleted, step1: false });
            setSelected(0);
            setStepSuccess({ ...stepSuccess, s1Success: false });
          }
          setStepCompleted({ ...stepCompleted, step1: true });
          setSelected(1);
          setStepSuccess({ ...stepSuccess, s1Success: true });
          // scrollToElement("test1");
        } catch (error) {
          console.error("Error making API call:", error);
        }
        break;

      case 1:
        let isStep2Valid = true;

        if (!fresherWorkingField.ExpectedSalary.trim()) {
          setValidity((prevState) => ({
            ...prevState,
            // isCurrentSalary: false,
            isExpectedSalary: false,
          }));
          isStep2Valid = false;
        }

        if (!fresherWorkingField.SalaryRadio) {
          setValidity((prevState) => ({
            ...prevState,
            isSalaryRadio: false,
          }));
          isStep2Valid = false;
        }
        if (!isStep2Valid) {
          return;
        }
        const object = {
          expectedSalary: fresherWorkingField.ExpectedSalary,
          expectedSalaryIs: fresherWorkingField.SalaryRadio,
        };
        try {
          const response = await putFresherSalarayDetails(object, mobilenumber);

          if (response.statuscode !== 200) {
            console.error("response status code 400");
            setStepCompleted({ ...stepCompleted, step2: false });
            setSelected(1);
            setStepSuccess({ ...stepSuccess, s2Success: false });
          }
          setStepCompleted({ ...stepCompleted, step2: true });
          setSelected(2);
          setStepSuccess({ ...stepSuccess, s2Success: true });
          // scrollToElement("test2");
        } catch (error) {
          console.error("Error making API call:", error);
        }

        break;

      case 2:
        let isStep3Valid = true;
        // if (fresherWorkingField.Education === "") {
        //   setValidity((prevState) => ({
        //     ...prevState,
        //     isEducation: false,
        //   }));
        //   isStep3Valid = false;
        // }
        if (
          fresherWorkingField.Education === "Below 10" ||
          fresherWorkingField.Education === "10th Pass and Above"
        ) {
          // Skip validation for Specialization and CompletedYear
          isStep3Valid = true;
        } else {
          if (!fresherWorkingField.Specialization) {
            setValidity((prevState) => ({
              ...prevState,
              isSpecialization: false,
            }));
            isStep3Valid = false;
          }

          if (!fresherWorkingField.CompletedYear) {
            setValidity((prevState) => ({
              ...prevState,
              isCompletedYear: false,
            }));
            isStep3Valid = false;
          }
          if (!fresherWorkingField.EducationArrear) {
            setValidity((prevState) => ({
              ...prevState,
              isEducationArrear: false,
            }));
            isStep3Valid = false;
          }
        }

        if (!isStep3Valid) {
          return;
        }
        const obj = {
          qualification: fresherWorkingField.Education,
          specification: fresherWorkingField.Specialization,
          passed_out_year: fresherWorkingField.CompletedYear,
          isHavingArrear: fresherWorkingField.EducationArrear,
        };
        try {
          const response = await PutFresherEducationalDetails(
            obj,
            mobilenumber
          );

          if (response.statuscode !== 200) {
            console.error("response status code 400");
            setStepCompleted({ ...stepCompleted, step3: false });
            setSelected(2);
            setStepSuccess({ ...stepSuccess, s3Success: false });
          }
          setStepCompleted({ ...stepCompleted, step3: true });
          setSelected(3);
          setStepSuccess({ ...stepSuccess, s3Success: true });
          // scrollToElement("test3");
        } catch (error) {
          console.error("Error making API call:", error);
        }
        // setStepCompleted((prev) => ({ ...prev, step3: true }));
        // setSelected(3);
        // setStepSuccess((prev) => ({ ...prev, s3Success: true }));
        break;

      case 3:
        let isStep4Valid = true;
        if (fresherWorkingField.KeySkills.length <= 0) {
          setValidity((prevState) => ({
            ...prevState,
            isKeySkills: false,
          }));
          isStep4Valid = false;
        }

        if (!isStep4Valid) {
          return;
        }

        const Expertiseobject = {
          keySkill: fresherWorkingField.KeySkills,
          courses: fresherWorkingField.CertificationCourse,
        };
        try {
          const response = await PutFresherExpertise(
            Expertiseobject,
            mobilenumber
          );

          if (response.statuscode !== 200) {
            console.error("response status code 400");
            setStepCompleted({ ...stepCompleted, step4: false });
            setSelected(3);
            setStepSuccess({ ...stepSuccess, s4Success: false });
          }
          setStepCompleted({ ...stepCompleted, step4: true });
          setSelected(4);
          setStepSuccess({ ...stepSuccess, s4Success: true });
          // scrollToElement("test4");
        } catch (error) {
          console.error("Error making API call:", error);
        }

        break;
      case 4:
        let isStep5Valid = true;

        if (fresherWorkingField.CandidatePreferredCity.length <= 0) {
          setValidity((prevState) => ({
            ...prevState,
            isCandidatePreferredCity: false,
          }));
          isStep5Valid = false;
        }
        if (!isStep5Valid) {
          return;
        }
        try {
          const response = await PutFresherJobLocation(
            fresherWorkingField.CandidatePreferredCity,
            mobilenumber
          );

          if (response.statuscode !== 200) {
            console.error("response status code 400");
            setStepCompleted({ ...stepCompleted, step5: false });
            setSelected(4);
            setStepSuccess({ ...stepSuccess, s5Success: false });
          }
          setStepCompleted({ ...stepCompleted, step5: true });
          setSelected(5);
          setStepSuccess({ ...stepSuccess, s5Success: true });
          // scrollToElement("test5");
        } catch (error) {
          console.error("Error making API call:", error);
        }

        break;

      case 5:
        let isBasicDetailsValid = true;
        const isValidNumber = (number) => {
          const numStr = number.toString().trim();
          return numStr.length === 10 && /^\d+$/.test(numStr); // Checks for 10 digits only
        };

        if (!fresherWorkingField.CandidateFirstName) {
          setValidity((prevState) => ({
            ...prevState,
            isCandidateFirstName: false,
          }));
          isBasicDetailsValid = false;
        }
        if (!fresherWorkingField.CandidateLastName) {
          setValidity((prevState) => ({
            ...prevState,
            isCandidateLastName: false,
          }));
          isBasicDetailsValid = false;
        }
        const currentDate = new Date();
        const minDOBDate = new Date(
          currentDate.getFullYear() - 18,
          currentDate.getMonth(),
          currentDate.getDate()
        );
        const candidateDOB = new Date(fresherWorkingField.CandidateDOB);

        if (
          !fresherWorkingField.CandidateDOB.trim() ||
          candidateDOB > minDOBDate
        ) {
          setValidity((prevState) => ({
            ...prevState,
            isCandidateDOB: false,
          }));
          isBasicDetailsValid = false;
        }
        // const candidateMobileNumber =
        //   fresherWorkingField.CandidateMobileNumber.toString().trim();
        if (!isValidNumber(fresherWorkingField.CandidateMobileNumber)) {
          setValidity((prevState) => ({
            ...prevState,
            isCandidateMobileNumber: false,
          }));
          isBasicDetailsValid = false;
        }
        // const CandidateWhtsappNumber =
        //   fresherWorkingField.CandidateWhtsappNumber.toString().trim();
        if (!isValidNumber(fresherWorkingField.CandidateWhtsappNumber)) {
          setValidity((prevState) => ({
            ...prevState,
            isCandidateWhtsappNumber: false,
          }));
          isBasicDetailsValid = false;
        }
        if (!fresherWorkingField.CandidateCurrentLocation) {
          setValidity((prevState) => ({
            ...prevState,
            isCandidateCurrentLocation: false,
          }));
          isBasicDetailsValid = false;
        }

        if (!isBasicDetailsValid) {
          return;
        }
        const basicDetailsObj = {
          name: capitalizeWord(fresherWorkingField.CandidateFirstName),
          lastName: capitalizeWord(fresherWorkingField.CandidateLastName),
          dateOfBirth: fresherWorkingField.CandidateDOB,
          whatsappNumber: fresherWorkingField.CandidateWhtsappNumber,
          city: fresherWorkingField.CandidateCurrentLocation,
        };
        try {
          const response = await PutFresherBasicDetails(
            basicDetailsObj,
            mobilenumber
          );

          if (response.statuscode !== 200) {
            console.error("response status code 400");
            setStepCompleted({ ...stepCompleted, step6: false });
            setSelected(5);
            setStepSuccess({ ...stepSuccess, s6Success: false });
          }
          setStepCompleted({ ...stepCompleted, step6: true });
          setSelected(6);
          setStepSuccess({ ...stepSuccess, s6Success: true });
          // scrollToElement("test6");
        } catch (error) {
          console.error("Error making API call:", error);
        }

        break;

      case 6:
        let isemergencyDetails = true;
        if (!fresherWorkingField.EmergencyName.trim()) {
          setValidity((prevState) => ({
            ...prevState,
            isEmergencyName: false,
          }));
          isemergencyDetails = false;
        }
        const EmergencyNumber = fresherWorkingField.EmergencyNumber.trim();
        if (EmergencyNumber.length !== 10) {
          setValidity((prevState) => ({
            ...prevState,
            isEmergencyNumber: false,
          }));
          isemergencyDetails = false;
        }
        if (!isemergencyDetails) {
          return;
        }
        const emergencyDetailsObj = {
          emergencyContactNumber: fresherWorkingField.EmergencyNumber,
          relationName: fresherWorkingField.EmergencyName,
        };
        try {
          const response = await PutFresherEmergencyDetails(
            emergencyDetailsObj,
            mobilenumber
          );

          if (response.statuscode !== 200) {
            console.error("response status code 400");
            setStepCompleted({ ...stepCompleted, step7: true });
            setSelected(6);
            setStepSuccess({ ...stepSuccess, s7Success: true });
          }
          setStepCompleted({ ...stepCompleted, step7: true });
          setSelected(7);
          setStepSuccess({ ...stepSuccess, s7Success: true });
          // scrollToElement("test7");
        } catch (error) {
          console.error("Error making API call:", error);
        }

        break;
      case 7:
        let isOtherDetails = true;

        if (
          fresherWorkingField.RotationalShift === null ||
          fresherWorkingField.RotationalShift === ""
        ) {
          setValidity((prevState) => ({
            ...prevState,
            isRotationalShift: false,
          }));
          isOtherDetails = false;
        }
        if (
          fresherWorkingField.Accomodation === null ||
          fresherWorkingField.Accomodation === ""
        ) {
          setValidity((prevState) => ({
            ...prevState,
            isAccomodation: false,
          }));
          isOtherDetails = false;
        }
        if (
          fresherWorkingField.CvResume === null ||
          fresherWorkingField.CvResume === ""
        ) {
          setValidity((prevState) => ({
            ...prevState,
            isCvResume: false,
          }));
          isOtherDetails = false;
        }
        if (!fresherWorkingField.Refference) {
          setValidity((prevState) => ({
            ...prevState,
            isRefference: false,
          }));
          isOtherDetails = false;
        }
        // if (selectedDate.tentativeInterviewDate === null) {
        //   setValidity((prevState) => ({
        //     ...prevState,
        //     isFollowDate1: false,
        //   }));
        //   isOtherDetails = false;
        // }
        // if (dateDiff >= 4 && selectedDate.followUpDate1 === null) {
        //   setValidity((prevState) => ({
        //     ...prevState,
        //     isFollowDate2: false,
        //   }));
        //   isOtherDetails = false;
        // }
        if (!isOtherDetails) {
          return;
        }
        try {
          const response = await PutFresherOtherDetails(
            fresherWorkingField.RotationalShift,
            fresherWorkingField.Accomodation,
            fresherWorkingField.CvResume,
            fresherWorkingField.Refference,
            // selectedDate.tentativeInterviewDate == "Invalid date"
            //   ? ""
            //   : selectedDate.tentativeInterviewDate,
            // selectedDate.followUpDate1 == "Invalid date"
            //   ? ""
            //   : selectedDate.followUpDate1,
            fresherWorkingField.notes,
            mobilenumber
          );

          if (response.statuscode !== 200) {
            console.error("response status code 400");
            setStepCompleted({ ...stepCompleted, step8: false });
            setSelected(7);

            setStepSuccess({ ...stepSuccess, s8Success: false });
          }
          const candidateDetailID = response.success.id;
          console.log(candidateDetailID, "candidateDetailID");
          setStepCompleted({ ...stepCompleted, step8: true });
          setSelected(8);
          setStepSuccess({ ...stepSuccess, s8Success: true });
          Reloadpage();
          Dispatch(CandidatePipelineActions.setRefreshCount());
          handleCandidateDetails(candidateDetailID, "RegisterCandidate");
          // scrollToElement("test7");
        } catch (error) {
          console.error("Error making API call:", error);
        }
        // setStepCompleted({ ...stepCompleted, step8: true });
        // setSelected(8);
        // setStepSuccess({ ...stepSuccess, s8Success: true });
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetCandidateQualifyDetials(mobilenumber);
        console.log(data.canLeadDetails, "data of object");

        if (data.canLeadDetails) {
          const {
            jobCategory,
            expectedSalary,
            expectedSalaryIs,
            qualification,
            specification,
            passed_out_year,
            isHavingArrear,
            keySkill,
            courses,
            prefLocation,
            name,
            lastName,
            dateOfBirth,
            whatsappNumber,
            city,
            relationName,
            emergencyContactNumber,
            // readyForShifts,
            // needAccommodation,
            // reference,
            // havingUpdatedCv,
            // notes,
          } = data.canLeadDetails;
          let keySkillsArray = [];
          let coursesArray = [];
          let PrfLocationArray = [];

          if (keySkill && keySkill !== "") {
            keySkillsArray = keySkill.split(",").map((skill) => {
              return { value: skill, label: skill };
            });
          }
          if (courses && courses !== "") {
            coursesArray = courses.split(",").map((course) => {
              return { value: course, label: course };
            });
          }
          if (prefLocation && prefLocation !== "") {
            PrfLocationArray = prefLocation.split(",").map((prefLocation) => {
              return { value: prefLocation, label: prefLocation };
            });
          }
          console.log(keySkillsArray, "keySkillsArray");
          // Update state based on retrieved values
          setfresherWorkingField((prevState) => ({
            ...prevState,
            PostionApply: jobCategory,
            ExpectedSalary: expectedSalary,
            SalaryRadio: expectedSalaryIs,
            Education: qualification,
            Specialization: specification,
            CompletedYear: passed_out_year,
            EducationArrear: isHavingArrear,
            KeySkills: keySkillsArray,
            CertificationCourse: coursesArray,
            CandidatePreferredCity: PrfLocationArray,
            CandidateFirstName: name,
            CandidateLastName: lastName,
            CandidateDOB: dateOfBirth,
            // CandidateMobileNumber: mobilenumber,
            CandidateWhtsappNumber: whatsappNumber.toString(),
            CandidateCurrentLocation: city,
            EmergencyName: relationName,
            EmergencyNumber: emergencyContactNumber,
            // RotationalShift: readyForShifts,
            // Accomodation: needAccommodation,
            // Refference: reference,
            // CvResume: havingUpdatedCv,
            // notes: notes,
          }));

          let nextStep = 0;
          let successStatus = {};

          if (jobCategory) {
            nextStep = 1;
            successStatus = { ...successStatus, s1Success: true };
          }

          if (expectedSalary && expectedSalaryIs) {
            nextStep = 2;
            successStatus = { ...successStatus, s2Success: true };
          }

          if (qualification) {
            if (
              qualification === "Below 10" ||
              qualification === "10th Pass and Above"
            ) {
              // Skip validation for Specialization and CompletedYear
              nextStep = 3;
              successStatus = { ...successStatus, s3Success: true };
            } else if (
              qualification !== "Below 10" ||
              qualification !== "10th Pass and Above"
            ) {
              setShowEducationDetials(true);
              if (specification && passed_out_year && isHavingArrear) {
                nextStep = 3;
                successStatus = { ...successStatus, s3Success: true };
              }
            } else {
              setShowEducationDetials(false);
            }
          }

          if (keySkill || courses) {
            nextStep = 4;
            successStatus = { ...successStatus, s4Success: true };
          }

          if (prefLocation) {
            nextStep = 5;
            successStatus = { ...successStatus, s5Success: true };
          }
          if (name && lastName && whatsappNumber && dateOfBirth && city) {
            nextStep = 6;
            successStatus = { ...successStatus, s6Success: true };
          }
          if (relationName && emergencyContactNumber) {
            nextStep = 7;
            successStatus = { ...successStatus, s7Success: true };
          }
          // Update step success states
          setStepSuccess((prevState) => ({
            ...prevState,
            ...successStatus,
          }));

          handleNextStep(nextStep);
          toggle(nextStep);
        } else {
          console.log("No data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [mobilenumber]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetCandidateQualifyForm(mobilenumber);
        console.log(data.canLeadDetails, "data of object");

        if (data) {
          const {
            jobCategory,
            expectedSalary,
            expectedSalaryIs,
            qualification,
            specification,
            passed_out_year,
            isHavingArrear,
            keySkill,
            courses,
            prefLocation,
            firstName,
            lastName,
            dateOfBirth,
            whatsappNumber,
            city,
            relationName,
            emergencyContactNumber,
            readyForShifts,
            needAccommodation,
            reference,
            havingUpdatedCv,
            notes,
            // tentativeInterviewDate,
            // followUpDate1,
          } = data;
          let keySkillsArray = [];
          let coursesArray = [];
          let PrfLocationArray = [];

          if (keySkill && keySkill !== "") {
            keySkillsArray = keySkill.split(",").map((skill) => {
              return { value: skill, label: skill };
            });
          }
          if (courses && courses !== "") {
            coursesArray = courses.split(",").map((course) => {
              return { value: course, label: course };
            });
          }
          if (prefLocation && prefLocation !== "") {
            PrfLocationArray = prefLocation.split(",").map((prefLocation) => {
              return { value: prefLocation, label: prefLocation };
            });
          }
          console.log(keySkillsArray, "keySkillsArray");
          // Update state based on retrieved values
          setfresherWorkingField((prevState) => ({
            ...prevState,
            PostionApply: jobCategory,
            ExpectedSalary: expectedSalary,
            SalaryRadio: expectedSalaryIs,
            Education: qualification,
            Specialization: specification,
            CompletedYear: passed_out_year,
            EducationArrear: isHavingArrear,
            KeySkills: keySkillsArray,
            CertificationCourse: coursesArray,
            CandidatePreferredCity: PrfLocationArray,
            CandidateFirstName: firstName,
            CandidateLastName: lastName,
            CandidateDOB: dateOfBirth,
            // CandidateMobileNumber: mobilenumber,
            CandidateWhtsappNumber: whatsappNumber.toString(),
            CandidateCurrentLocation: city,
            EmergencyName: relationName,
            EmergencyNumber: emergencyContactNumber,
            RotationalShift: readyForShifts,
            Accomodation: needAccommodation,
            Refference: reference,
            CvResume: havingUpdatedCv,
            notes: notes,
          }));
          // setSelectedDate((prev) => ({
          //   ...prev,
          //   tentativeInterviewDate: tentativeInterviewDate,
          //   followUpDate1: followUpDate1,
          // }));

          let nextStep = 0;
          let successStatus = {};

          if (jobCategory) {
            nextStep = 1;
            successStatus = { ...successStatus, s1Success: true };
          }

          if (expectedSalary && expectedSalaryIs) {
            nextStep = 2;
            successStatus = { ...successStatus, s2Success: true };
          }

          if (qualification) {
            if (
              qualification === "Below 10" ||
              qualification === "10th Pass and Above"
            ) {
              // Skip validation for Specialization and CompletedYear
              nextStep = 3;
              successStatus = { ...successStatus, s3Success: true };
            } else if (
              qualification !== "Below 10" ||
              qualification !== "10th Pass and Above"
            ) {
              setShowEducationDetials(true);
              if (specification && passed_out_year && isHavingArrear) {
                nextStep = 3;
                successStatus = { ...successStatus, s3Success: true };
              }
            } else {
              setShowEducationDetials(false);
            }
          }

          if (keySkill || courses) {
            nextStep = 4;
            successStatus = { ...successStatus, s4Success: true };
          }

          if (prefLocation) {
            nextStep = 5;
            successStatus = { ...successStatus, s5Success: true };
          }
          if (firstName && lastName && whatsappNumber && dateOfBirth && city) {
            nextStep = 6;
            successStatus = { ...successStatus, s6Success: true };
          }
          if (relationName && emergencyContactNumber) {
            nextStep = 7;
            successStatus = { ...successStatus, s7Success: true };
          }
          if (
            havingUpdatedCv !== "" &&
            needAccommodation !== "" &&
            readyForShifts !== "" &&
            reference !== ""
          ) {
            nextStep = 8;
            successStatus = { ...successStatus, s8Success: true };
          }
          // Update step success states
          setStepSuccess((prevState) => ({
            ...prevState,
            ...successStatus,
          }));

          handleNextStep(nextStep);
          toggle(nextStep);
        } else {
          console.log("No data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [mobilenumber]);

  // const handleQualifyFormSubmit = async () => {
  //   Reloadpage();
  //   ReloadupdatePage();
  //   Dispatch(CandidatePipelineActions.setRefreshCount());
  // };
  return (
    <div>
      {/* <div className="btn btn-danger" onClick={}>Close</div> */}
      <div className={`${accordionstyle.Container}`}>
        <div className={`mt-2 ${accordionstyle.wrapper}`}>
          <div className={`${accordionstyle.accordion}`}>
            {/* Your accordion content */}
            <div
              className={`${accordionstyle.item}  ${
                stepSuccess.s1Success && accordionstyle.selected
              }`}
            >
              <div
                className={` ${accordionstyle.title}`}
                onClick={() => toggle(0)}
              >
                <h4>Current Status</h4>
                <span>
                  {selected === 0 ? (
                    <b className="fs-1">-</b>
                  ) : (
                    <b className="fs-2">+</b>
                  )}
                </span>
              </div>
              <div
                className={`${
                  selected === 0
                    ? `${accordionstyle.content} ${accordionstyle.show}`
                    : `${accordionstyle.content}`
                }`}
              >
                <div>
                  <div className="row" id="test1">
                    <div className="col-sm-6">
                      <label htmlFor="positionapplyfor" className="form-label">
                        <b>Position applying for?</b>
                      </label>
                      <Select
                        className={`react-select-container ${
                          !validity.isPositionValid && "is-invalid"
                        }`}
                        classNamePrefix="react-select"
                        id="positionDropdown"
                        value={
                          fresherWorkingField.PostionApply
                            ? {
                                value: fresherWorkingField.PostionApply,
                                label: fresherWorkingField.PostionApply,
                              }
                            : null
                        }
                        options={arrayofData.jobRoles.map((jobRole) => ({
                          value: jobRole.jobRoles,
                          label: jobRole.jobRoles,
                        }))}
                        onChange={(selectedOption) =>
                          handleSelectChange("PostionApply", selectedOption)
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
                      {!validity.isPositionValid && (
                        <div style={{ color: "red" }} className="error-message">
                          Please select a option.
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 mb-2">
                    {/* <div
              className={`btn btn-success
              ${
                !stepCompleted.step1 && "disabled"
              }
              `}
              onClick={handleNxetstep1}
            > */}
                    <div
                      className={`btn btn-success 
                    ${
                      selected === 0 && !stepCompleted.step1 ? "disabled" : ""
                    } `}
                      onClick={() => handleNextStep(0)}
                    >
                      Next
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${accordionstyle.item} ${
                stepSuccess.s2Success && accordionstyle.selected
              }`}
            >
              <div
                className={`${accordionstyle.title}`}
                onClick={() => toggle(1)}
              >
                <h4>Salary Details</h4>
                <span>
                  {selected === 1 ? (
                    <b className="fs-1">-</b>
                  ) : (
                    <b className="fs-2">+</b>
                  )}
                </span>
              </div>
              <div
                className={`${
                  selected === 1
                    ? `${accordionstyle.content} ${accordionstyle.show}`
                    : `${accordionstyle.content}`
                }`}
              >
                <div className="row" id="test2">
                  <div className="col-sm-6">
                    <label htmlFor="currentcompany" className="form-label">
                      <strong>Expected salary?</strong>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        !validity.isExpectedSalary && "is-invalid"
                      }`}
                      id="ExpectedSalary"
                      value={fresherWorkingField.ExpectedSalary}
                      onChange={(e) =>
                        handleInputChange("ExpectedSalary", e.target.value)
                      }
                      maxLength={5}
                      onKeyPress={(e) => {
                        // Allow only numbers
                        if (!/\d/.test(e.key)) {
                          e.preventDefault(); // Prevent the input of non-numeric characters
                        }
                      }}
                    />
                    {!validity.isExpectedSalary && (
                      <div style={{ color: "red" }} className="error-message">
                        Please enter the expected salary.
                      </div>
                    )}
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label">
                      <strong>Salary expectation is?</strong>
                    </label>
                    <div className={`d-flex`}>
                      <div
                        className={`me-2 d-flex ${accordionstyle.radioInput}`}
                      >
                        {/* <label className="form-check-label me-3"> */}
                        <input
                          type="radio"
                          name="salaryexpectation"
                          id="salaryexpectationYes"
                          value="Average"
                          className={`form-check-input ${
                            !validity.isExpectedSalary && "is-invalid"
                          }`}
                          checked={
                            fresherWorkingField.SalaryRadio === "Average"
                          }
                          onChange={(e) =>
                            handleRadioChange("SalaryRadio", e.target.value)
                          }
                        />
                        <label for="salaryexpectationYes">Average</label>
                        {/* </label> */}
                      </div>
                      <div
                        className={`me-2 d-flex ${accordionstyle.radioInput}`}
                      >
                        <label className="form-check-label">
                          <input
                            type="radio"
                            name="salaryexpectation"
                            id="salaryexpectationNo"
                            value="High"
                            className={`form-check-input ${
                              !validity.isExpectedSalary && "is-invalid"
                            }`}
                            checked={fresherWorkingField.SalaryRadio === "High"}
                            onChange={(e) =>
                              handleRadioChange("SalaryRadio", e.target.value)
                            }
                          />
                          <label for="salaryexpectationNo">High</label>
                        </label>
                      </div>
                    </div>

                    {!validity.isSalaryRadio && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select a option.
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3 mb-2">
                  <div
                    className={`btn btn-success 
                    ${
                      selected === 1 && !stepCompleted.step2 ? "disabled" : ""
                    }`}
                    onClick={() => handleNextStep(1)}
                  >
                    Next
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${accordionstyle.item} ${
                stepSuccess.s3Success && accordionstyle.selected
              }`}
            >
              <div
                className={`${accordionstyle.title}`}
                onClick={() => toggle(2)}
              >
                <h4>Education Details</h4>

                <span>
                  {selected === 2 ? (
                    <b className="fs-1">-</b>
                  ) : (
                    <b className="fs-2">+</b>
                  )}
                </span>
              </div>
              <div
                className={`${
                  selected === 2
                    ? `${accordionstyle.content} ${accordionstyle.show}`
                    : `${accordionstyle.content}`
                }`}
              >
                <div className="row" id="test3">
                  <div className="col-sm-6">
                    <label htmlFor="educationDropdown" className="form-label">
                      <strong>Education</strong>
                    </label>
                    <select
                      className={`form-control ${
                        !validity.isEducation && "is-invalid"
                      }`}
                      id="educationDropdown"
                      value={fresherWorkingField.Education}
                      onChange={(e) => {
                        handleSelectChange("Education", e.target.value);
                        // handleEducationInput(e, e.target.value);
                      }}
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
                    {!validity.isEducation && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select the education.
                      </div>
                    )}
                  </div>
                  {showEducationDetials && (
                    <>
                      <div className="col-md-6 mb-3">
                        <label
                          htmlFor="positionDropdown"
                          className="form-label"
                        >
                          <strong>Specialization</strong>
                        </label>
                        <Select
                          className={`react-select-container ${
                            !validity.isSpecialization && "is-invalid"
                          }`}
                          classNamePrefix="react-select"
                          id="positionDropdown"
                          value={
                            fresherWorkingField.Specialization
                              ? {
                                  value: fresherWorkingField.Specialization,
                                  label: fresherWorkingField.Specialization,
                                }
                              : null
                          }
                          // options={arrayofData.DepartmentList}
                          options={mapSpecialization}
                          onChange={(value) =>
                            handleSpecializationChange(value)
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
                        {!validity.isSpecialization && (
                          <div
                            style={{ color: "red" }}
                            className="error-message"
                          >
                            Please select a Specialization.
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="completedYear" className="form-label">
                          <strong>Degree completed Year?</strong>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            !validity.isCompletedYear && "is-invalid"
                          }`}
                          id="completedYear"
                          value={fresherWorkingField.CompletedYear}
                          onChange={(e) =>
                            handleInputChange("CompletedYear", e.target.value)
                          }
                          maxLength={4}
                          onKeyPress={(e) => {
                            // Allow only numbers
                            if (!/\d/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {!validity.isCompletedYear && (
                          <div
                            style={{ color: "red" }}
                            className="error-message"
                          >
                            Please enter completed year
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label">
                          <b>Do you have any arrear(s)?</b>
                        </label>
                        <div className={`d-flex`}>
                          <div
                            className={`me-2 d-flex ${accordionstyle.radioInput}`}
                          >
                            {/* <label className="form-check-label me-3"> */}
                            <input
                              type="radio"
                              name="EducationArrear"
                              id="EducationArrearYes"
                              value="Yes"
                              className={`form-check-input ${
                                !validity.isEducationArrear && "is-invalid"
                              }`}
                              checked={
                                fresherWorkingField.EducationArrear === "Yes"
                              }
                              onChange={(e) =>
                                handleRadioChange(
                                  "EducationArrear",
                                  e.target.value
                                )
                              }
                            />
                            <label for="EducationArrearYes">Yes</label>
                            {/* </label> */}
                          </div>
                          <div
                            className={`me-2 d-flex ${accordionstyle.radioInput}`}
                          >
                            <label className="form-check-label">
                              <input
                                type="radio"
                                name="EducationArrear"
                                id="EducationArrearNo"
                                value="No"
                                className={`form-check-input ${
                                  !validity.isEducationArrear && "is-invalid"
                                }`}
                                checked={
                                  fresherWorkingField.EducationArrear === "No"
                                }
                                onChange={(e) =>
                                  handleRadioChange(
                                    "EducationArrear",
                                    e.target.value
                                  )
                                }
                              />
                              <label for="EducationArrearNo">No</label>
                            </label>
                          </div>
                        </div>

                        {!validity.isEducationArrear && (
                          <div
                            style={{ color: "red" }}
                            className="error-message"
                          >
                            Please select a option.
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  {/* )} */}
                </div>
                <div className="mt-3 mb-2">
                  {/* ${selected === 4 && !stepCompleted.step5 ? "disabled" : ""}` */}
                  <div
                    className={`btn btn-success ${
                      selected === 2 && !stepCompleted.step3 ? "disabled" : ""
                    }`}
                    onClick={() => handleNextStep(2)}
                  >
                    Next
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${accordionstyle.item} ${
                stepSuccess.s4Success ? accordionstyle.selected : ""
              }`}
            >
              <div
                className={`${accordionstyle.title}`}
                onClick={() => toggle(3)}
              >
                <h4>Expertise Details</h4>
                <span>
                  {selected === 3 ? (
                    <b className="fs-1">-</b>
                  ) : (
                    <b className="fs-2">+</b>
                  )}
                </span>
              </div>
              <div
                className={`${
                  selected === 3
                    ? `${accordionstyle.content} ${accordionstyle.show}`
                    : `${accordionstyle.content}`
                }`}
              >
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="anotherDropdown" className="form-label">
                      <strong>Skills</strong>
                    </label>
                    <Select
                      isMulti
                      className={`react-select-container ${
                        !validity.isKeySkills && "is-invalid"
                      }`}
                      classNamePrefix="react-select"
                      id="KeySkills"
                      value={fresherWorkingField.KeySkills}
                      options={arrayofData.KeySkills}
                      onChange={(selectedValues) =>
                        handleMultiSelectChange("KeySkills", selectedValues)
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
                    {!validity.isKeySkills && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select at least one option.
                      </div>
                    )}
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="anotherDropdown" className="form-label">
                      <strong>Certification(optional)</strong>
                    </label>
                    <Select
                      isMulti
                      className={`react-select-container`}
                      classNamePrefix="react-select"
                      id="CertificationCourse"
                      value={fresherWorkingField.CertificationCourse}
                      options={arrayofData.Certification}
                      onChange={(selectedValues) =>
                        handleMultiSelectChange(
                          "CertificationCourse",
                          selectedValues
                        )
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
                  </div>
                </div>
                <div className="mt-3 mb-2" id="test4">
                  <div
                    className={`btn btn-success 
                    ${
                      selected === 3 && !stepCompleted.step4 ? "disabled" : ""
                    }`}
                    onClick={() => handleNextStep(3)}
                  >
                    Next
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${accordionstyle.item} ${
                stepSuccess.s5Success ? accordionstyle.selected : ""
              }`}
            >
              <div
                className={`${accordionstyle.title}`}
                onClick={() => toggle(4)}
              >
                <h4>Job Location Details</h4>
                <span>
                  {selected === 4 ? (
                    <b className="fs-1">-</b>
                  ) : (
                    <b className="fs-2">+</b>
                  )}
                </span>
              </div>
              <div
                className={`${
                  selected === 4
                    ? `${accordionstyle.content} ${accordionstyle.show}`
                    : `${accordionstyle.content}`
                }`}
              >
                <div className="row" id="test5">
                  <div className="col-sm-6">
                    {" "}
                    <label
                      htmlFor="CandidatePreferredCity"
                      className="form-label"
                    >
                      <b>Preferred job city?</b>
                    </label>
                    <Select
                      isMulti
                      className={`react-select-container ${
                        !validity.isCandidatePreferredCity && "is-invalid"
                      }`}
                      classNamePrefix="react-select"
                      id="CandidatePreferredCity"
                      value={fresherWorkingField.CandidatePreferredCity}
                      options={arrayofData.city}
                      onChange={(selectedValues) =>
                        handleMultiSelectChange(
                          "CandidatePreferredCity",
                          selectedValues
                        )
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
                    {!validity.isCandidatePreferredCity && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select at least one option.
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-3 mb-2">
                  <div
                    className={`btn btn-success 
                    ${
                      selected === 4 && !stepCompleted.step5 ? "disabled" : ""
                    }`}
                    onClick={() => handleNextStep(4)}
                  >
                    Next
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${accordionstyle.item} ${
                stepSuccess.s6Success ? accordionstyle.selected : ""
              }`}
            >
              <div
                className={`${accordionstyle.title}`}
                onClick={() => toggle(5)}
              >
                <h4>Basic Details</h4>
                <span>
                  {selected === 5 ? (
                    <b className="fs-1">-</b>
                  ) : (
                    <b className="fs-2">+</b>
                  )}
                </span>
              </div>
              <div
                className={`${
                  selected === 5
                    ? `${accordionstyle.content} ${accordionstyle.show}`
                    : `${accordionstyle.content}`
                }`}
              >
                <div className="row">
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
                            !validity.isCandidateFirstName && "is-invalid"
                          }`}
                          id="CandidateFirstName"
                          placeholder="Enter candidate name"
                          value={fresherWorkingField.CandidateFirstName}
                          onChange={(e) =>
                            handleInputChange(
                              "CandidateFirstName",
                              e.target.value
                            )
                          }
                          onKeyPress={(e) => {
                            // Check if the pressed key is a number
                            if (/\d/.test(e.key)) {
                              e.preventDefault(); // Prevent the input of numbers
                            }
                          }}
                        />
                        {!validity.isCandidateFirstName && (
                          <div
                            style={{ color: "red" }}
                            className="error-message"
                          >
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
                            !validity.isCandidateLastName && "is-invalid"
                          }`}
                          id="candidateInitial"
                          value={fresherWorkingField.CandidateLastName}
                          placeholder="Initial"
                          onChange={(e) =>
                            handleInputChange(
                              "CandidateLastName",
                              e.target.value
                            )
                          }
                          onKeyPress={(e) => {
                            // Check if the pressed key is a number
                            if (/\d/.test(e.key)) {
                              e.preventDefault(); // Prevent the input of numbers
                            }
                          }}
                        />
                        {!validity.isCandidateLastName && (
                          <div
                            style={{ color: "red" }}
                            className="error-message"
                          >
                            please enter initial
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="name" className="form-label">
                      <strong>Date of birth</strong>
                    </label>
                    <input
                      type="date"
                      name="candidateDOB"
                      id=""
                      value={fresherWorkingField.CandidateDOB}
                      className={`form-control ${
                        !validity.isCandidateDOB && "is-invalid"
                      }`}
                      max={getMaxDate()}
                      onChange={(e) =>
                        handleInputChange("CandidateDOB", e.target.value)
                      }
                    />
                    {!validity.isCandidateDOB && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select a date of birth (age above 18 only).
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-sm-6">
                    <label htmlFor="mobilenumber" className="form-label">
                      <strong>Mobile number</strong>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        !validity.isCandidateMobileNumber && "is-invalid"
                      }`}
                      id="mobilenumber"
                      value={fresherWorkingField.CandidateMobileNumber}
                      placeholder="Enter mobile number"
                      onChange={(e) =>
                        handleInputChange(
                          "CandidateMobileNumber",
                          e.target.value
                        )
                      }
                      maxLength={10}
                      onKeyPress={(e) => {
                        // Allow only numbers
                        if (!/\d/.test(e.key)) {
                          e.preventDefault(); // Prevent the input of non-numeric characters
                        }
                      }}
                    />
                    {!validity.isCandidateMobileNumber && (
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
                        !validity.isCandidateWhtsappNumber && "is-invalid"
                      }`}
                      id="mobilenumber"
                      placeholder="Enter whatsapp number"
                      value={fresherWorkingField.CandidateWhtsappNumber}
                      // defaultValue={onmobileNumber}
                      onChange={(e) =>
                        handleInputChange(
                          "CandidateWhtsappNumber",
                          e.target.value
                        )
                      }
                      maxLength={10}
                      onKeyPress={(e) => {
                        // Allow only numbers
                        if (!/\d/.test(e.key)) {
                          e.preventDefault(); // Prevent the input of non-numeric characters
                        }
                      }}
                    />
                    {!validity.isCandidateWhtsappNumber && (
                      <div style={{ color: "red" }} className="error-message">
                        Please enter the whatsapp number.
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-sm-6">
                    {" "}
                    <label htmlFor="staylocation" className="form-label">
                      <strong>Current stay location?</strong>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        !validity.isCandidateCurrentLocation && "is-invalid"
                      }`}
                      id="staylocation"
                      placeholder="Enter current stay location"
                      value={fresherWorkingField.CandidateCurrentLocation}
                      onChange={(e) =>
                        handleInputChange(
                          "CandidateCurrentLocation",
                          e.target.value
                        )
                      }
                      onKeyPress={(e) => {
                        // Check if the pressed key is a number
                        if (/\d/.test(e.key)) {
                          e.preventDefault(); // Prevent the input of numbers
                        }
                      }}
                    />
                    {!validity.isCandidateCurrentLocation && (
                      <div style={{ color: "red" }} className="error-message">
                        Please enter the stay location.
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-3 mb-2">
                  <div
                    className={`btn btn-success 
                    ${
                      selected === 5 && !stepCompleted.step6 ? "disabled" : ""
                    }`}
                    onClick={() => handleNextStep(5)}
                  >
                    Next
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${accordionstyle.item} ${
                stepSuccess.s7Success ? accordionstyle.selected : ""
              }`}
            >
              <div
                className={`${accordionstyle.title}`}
                onClick={() => toggle(6)}
              >
                <h4>Emergency Contact Details</h4>
                <span>
                  {selected === 6 ? (
                    <b className="fs-1">-</b>
                  ) : (
                    <b className="fs-2">+</b>
                  )}
                </span>
              </div>
              <div
                className={`${
                  selected === 6
                    ? `${accordionstyle.content} ${accordionstyle.show}`
                    : `${accordionstyle.content}`
                }`}
              >
                <div className="row">
                  <div className="col-sm-6 ">
                    <label htmlFor="name" className="form-label">
                      <strong>Relation Name</strong>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        !validity.isEmergencyName && "is-invalid"
                      }`}
                      id="name"
                      placeholder="Enter relation name"
                      // style={{ height: "60px" }}
                      value={fresherWorkingField.EmergencyName}
                      onChange={(e) =>
                        handleInputChange("EmergencyName", e.target.value)
                      }
                      onKeyPress={(e) => {
                        // Check if the pressed key is a number
                        if (/\d/.test(e.key)) {
                          e.preventDefault(); // Prevent the input of numbers
                        }
                      }}
                    />
                    {!validity.isEmergencyName && (
                      <div style={{ color: "red" }} className="error-message">
                        Please enter relation name.
                      </div>
                    )}
                  </div>

                  <div className="col-sm-6 ">
                    <label htmlFor="mobilenumber" className="form-label">
                      <strong>Emergency number</strong>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        !validity.isEmergencyNumber && "is-invalid"
                      }`}
                      id="mobilenumber"
                      placeholder="Enter emergency number"
                      value={fresherWorkingField.EmergencyNumber}
                      // defaultValue={onmobileNumber}
                      onChange={(e) =>
                        handleInputChange("EmergencyNumber", e.target.value)
                      }
                      maxLength={10}
                      onKeyPress={(e) => {
                        // Allow only numbers
                        if (!/\d/.test(e.key)) {
                          e.preventDefault(); // Prevent the input of non-numeric characters
                        }
                      }}
                    />
                    {!validity.isEmergencyNumber && (
                      <div style={{ color: "red" }} className="error-message">
                        Please enter the emergency number.
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-3 mb-2">
                  <div
                    className={`btn btn-success 
                    ${
                      selected === 6 && !stepCompleted.step7 ? "disabled" : ""
                    }`}
                    onClick={() => handleNextStep(6)}
                  >
                    Next
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${accordionstyle.item} ${
                stepSuccess.s8Success ? accordionstyle.selected : ""
              }`}
            >
              <div
                className={`${accordionstyle.title}`}
                onClick={() => toggle(7)}
              >
                <h4>Other Details</h4>
                <span>
                  {selected === 7 ? (
                    <b className="fs-1">-</b>
                  ) : (
                    <b className="fs-2">+</b>
                  )}
                </span>
              </div>
              <div
                className={`${
                  selected === 7
                    ? `${accordionstyle.content} ${accordionstyle.show}`
                    : `${accordionstyle.content}`
                }`}
              >
                <div className="row">
                  <div className="col-sm-6">
                    <label className="form-label">
                      <b>Willing to work in rotational shift?</b>
                    </label>
                    <div className={`d-flex`}>
                      <div
                        className={`me-2 d-flex ${accordionstyle.radioInput}`}
                      >
                        <input
                          type="radio"
                          name="RotationalShift"
                          id="RotationalShiftYes"
                          value={true}
                          className={`form-check-input ${
                            !validity.isRotationalShift && "is-invalid"
                          }`}
                          checked={fresherWorkingField.RotationalShift === true}
                          onChange={(e) =>
                            handleotherDetilsRadio("RotationalShift", true)
                          }
                        />
                        <label htmlFor="RotationalShiftYes">Yes</label>
                      </div>
                      <div
                        className={`me-2 d-flex ${accordionstyle.radioInput}`}
                      >
                        <input
                          type="radio"
                          name="RotationalShift"
                          id="RotationalShiftNo"
                          value={false}
                          className={`form-check-input ${
                            !validity.isRotationalShift && "is-invalid"
                          }`}
                          checked={
                            fresherWorkingField.RotationalShift === false
                          }
                          onChange={(e) =>
                            handleotherDetilsRadio("RotationalShift", false)
                          }
                        />
                        <label htmlFor="RotationalShiftNo">No</label>
                      </div>
                    </div>

                    {!validity.isRotationalShift && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select a option.
                      </div>
                    )}
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label">
                      <b>Accomodation Required?</b>
                    </label>
                    <div className={`d-flex`}>
                      <div
                        className={`me-2 d-flex ${accordionstyle.radioInput}`}
                      >
                        {/* <label className="form-check-label me-3"> */}
                        <input
                          type="radio"
                          name="Accomodation"
                          id="AccomodationYes"
                          value={true}
                          className={`form-check-input ${
                            !validity.isAccomodation && "is-invalid"
                          }`}
                          checked={fresherWorkingField.Accomodation === true}
                          onChange={(e) =>
                            handleotherDetilsRadio("Accomodation", true)
                          }
                        />
                        <label for="AccomodationYes">Yes</label>
                        {/* </label> */}
                      </div>
                      <div
                        className={`me-2 d-flex ${accordionstyle.radioInput}`}
                      >
                        <label className="form-check-label">
                          <input
                            type="radio"
                            name="Accomodation"
                            id="AccomodationNo"
                            value={false}
                            className={`form-check-input ${
                              !validity.isAccomodation && "is-invalid"
                            }`}
                            checked={fresherWorkingField.Accomodation === false}
                            onChange={(e) =>
                              handleotherDetilsRadio("Accomodation", false)
                            }
                          />
                          <label for="AccomodationNo">No</label>
                        </label>
                      </div>
                    </div>

                    {!validity.isAccomodation && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select a option.
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-sm-6">
                    <label
                      htmlFor="currentpositionDropdown"
                      className="form-label"
                    >
                      <strong>How do you hear about ?</strong>
                    </label>
                    <Select
                      isMulti={false} // Set isMulti to false for single selection
                      className={`react-select-container ${
                        !validity.isRefference && "is-invalid"
                      }`}
                      classNamePrefix="react-select"
                      id="qualificationDropdown"
                      name="Refference"
                      value={
                        fresherWorkingField.Refference
                          ? {
                              value: fresherWorkingField.Refference,
                              label: fresherWorkingField.Refference,
                            }
                          : null
                      }
                      options={arrayofData.CandidateSource}
                      onChange={(selectedValue) =>
                        handleSelectChange("Refference", selectedValue)
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
                    {!validity.isRefference && (
                      <div style={{ color: "red" }} className="error-message">
                        Please Select a option
                      </div>
                    )}
                  </div>{" "}
                  <div className="col-sm-6">
                    <label className="form-label">
                      <b>Updated CV/Resume?</b>
                    </label>
                    <div className={`d-flex`}>
                      <div
                        className={`me-2 d-flex ${accordionstyle.radioInput}`}
                      >
                        <input
                          type="radio"
                          name="CvResume"
                          id="CvResumeYes"
                          value={true}
                          className={`form-check-input ${
                            !validity.isCvResume && "is-invalid"
                          }`}
                          checked={fresherWorkingField.CvResume === true}
                          onChange={(e) =>
                            handleotherDetilsRadio("CvResume", true)
                          }
                        />
                        <label htmlFor="CvResumeYes">Yes</label>
                      </div>
                      <div
                        className={`me-2 d-flex ${accordionstyle.radioInput}`}
                      >
                        <input
                          type="radio"
                          name="CvResume"
                          id="CvResumeNo"
                          value={false}
                          className={`form-check-input ${
                            !validity.isCvResume && "is-invalid"
                          }`}
                          checked={fresherWorkingField.CvResume === false}
                          onChange={(e) =>
                            handleotherDetilsRadio("CvResume", false)
                          }
                        />
                        <label htmlFor="CvResumeNo">No</label>
                      </div>
                    </div>

                    {!validity.isCvResume && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select a option.
                      </div>
                    )}
                  </div>
                </div>
                {/* <div className="row mt-2">
                  <div className="col-sm-6">
                    <label
                      htmlFor="currentpositionDropdown"
                      className="form-label"
                    >
                      <strong>Interview Date</strong>
                    </label>
                    <div>
                      <DatePicker
                        selected={selectedDate.tentativeInterviewDate}
                        onChange={(date) =>
                          handleDateChange(date, "tentativeInterviewDate")
                        }
                        minDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                      />
                      {/* {validity.isFollowDate1 ? null : (
                        <div className="" style={{ color: "red" }}>
                          Please select a date.
                        </div>
                      )} 
                     </div>
                  </div>
                  {dateDiff >= 4 && (
                    <div className="col-sm-6">
                      <label
                        htmlFor="currentpositionDropdown"
                        className="form-label"
                      >
                        <strong>Follow up Date 1</strong>
                      </label>
                      <div>
                        <DatePicker
                          selected={selectedDate.followUpDate1}
                          onChange={(date) =>
                            handleDateChange(date, "followUpDate1")
                          }
                          minDate={new Date()}
                          maxDate={
                            new Date(
                              selectedDate.tentativeInterviewDate.getTime() -
                                2 * 24 * 60 * 60 * 1000
                            )
                          }
                          dateFormat="dd/MM/yyyy"
                          className="form-control"
                        />
                         {validity.isFollowDate2 ? null : (
                          <div className="" style={{ color: "red" }}>
                            Please select a date.
                          </div>
                        )} 
                      </div>
                    </div>
                  )}
                </div> */}
                <div className="row mt-2">
                  <div className="col-sm-12 ">
                    <label htmlFor="">
                      <b>Notes</b>
                    </label>
                    <textarea
                      name="notes"
                      id="notes"
                      cols="30"
                      rows="2"
                      value={fresherWorkingField.notes}
                      className="form-control mt-1"
                      onChange={(e) =>
                        handleInputChange("notes", e.target.value)
                      }
                    ></textarea>
                  </div>
                </div>
                <div className="mt-3 mb-2">
                  <div
                    className={`btn btn-success 
                    ${
                      selected === 7 && !stepCompleted.step8 ? "disabled" : ""
                    }`}
                    onClick={() => handleNextStep(7)}
                  >
                    Submit
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container">
        <div className="mt-2 mb-2 d-flex justify-content-end align-itmes-center">
          <button
            className="btn btn-success"
            disabled={enableSubmit}
            onClick={handleQualifyFormSubmit}
          >
            Submit
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default QualifyFresherform;
