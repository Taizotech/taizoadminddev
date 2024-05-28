
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import accordionstyle from "../CandidateQualifyForm/QualifyForm.module.scss";
import DatePicker from "react-datepicker";
import Select from "react-select";
import {
  GetCandidateSources,
  GetCourses,
  GetDepartments,
  GetPreferredCities,
  QualifyJobRole,
  getJobIndustries,
  getKeySkills,
  PutUpdateExperiencecurrentStatus,
  PutUpdateExperiencedetails,
  PutUpdateExperienceWorkDetails,
  PutUpdateExperienceSalaryDetails,
  PutUpdateEducationalDetails,
  PutUpdateExperienceExpertiseDetails,
  PutUpdateexperienceJobLocationDetails,
  PutUpdateexperienceBasicDetails,
  PutUpdateexperienceEmergencyDetails,
  PutUpdateexperienceOtherDetails,
  GetCandidateQualifyDetials,
  GetCandidateQualifyForm,
} from "../../../apiServices";

import { capitalizeWord } from "../../../utility";

export function UpdateExperinenceWorkingform({
  mobilenumber,
  whatsappNumber,
  Reloadpage,
  candidateStatus,
}) {
  console.log(candidateStatus, "candidateStatus");
  const [experienceWorkingField, setExperienceWorkingField] = useState({
    ReasonForJobchange: "",
    ReasonForUnEmployee: "",
    PostionApply: null,
    JobIndustry: null,
    ExperienceYear: "",
    ExperienceMonth: "",
    CompanyName: "",
    CompanyLocation: "",
    JobType: "",
    Workinghour: "",
    NoticePeriod: "",
    CurrentSalary: "",
    SalaryProof: "",
    ExpectedSalary: "",
    SalaryRadio: "",
    Education: "",
    Specialization: null,
    CompletedYear: "",
    EducationArrear: "",
    KeySkills: "",
    CertificationCourse: "",
    CandidatePreferredCity: "",
    PfEsiAccountRadio: "",
    CandidateFirstName: "",
    CandidateLastName: "",
    CandidateDOB: "",
    CandidateMobileNumber: mobilenumber.toString(),
    CandidateWhtsappNumber: whatsappNumber.toString(),
    CandidateCurrentLocation: "",
    EmergencyName: "",
    EmergencyNumber: "",
    RotationalShift: null,
    Accomodation: null,
    Refference: "",
    CvResume: null,
    notes: "",
  });
  const [validity, setValidity] = useState({
    isPositionValid: true,
    isReasonJobChangeValid: true,
    isReasonForUnEmployee: true,
    isindustryValid: true,
    isExperienceYear: true,
    isExperienceMonth: true,
    isCompanyName: true,
    isCompanyLocation: true,
    isJobType: true,
    isWorkinghour: true,
    isNoticePeriod: true,
    isCurrentSalary: true,
    isSalaryProof: true,
    isExpectedSalary: true,
    isSalaryRadio: true,
    isEducation: true,
    isSpecialization: true,
    isCompletedYear: true,
    isEducationArrear: true,
    isKeySkills: true,
    isCertificationCourse: true,
    isCandidatePreferredCity: true,
    isPfEsiAccountRadio: true,
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
  const [selected, setSelected] = useState(null);
  const [enableSubmit, setEnableSubmit] = useState(false);
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
    step9: false,
    step10: false,
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
    s9Success: false,
    s10Success: false,
  });
  const toggle = (index) => {
    if (
      index === 1 &&
      !stepSuccess.s1Success
      // !(
      //   experienceWorkingField.ReasonForJobchange &&
      //   experienceWorkingField.PostionApply
      // )
    ) {
      return;
    }
    if (
      index === 2 &&
      !stepSuccess.s2Success
      // !(
      //   experienceWorkingField.JobIndustry &&
      //   experienceWorkingField.ExperienceYear &&
      //   experienceWorkingField.ExperienceMonth
      // )
    ) {
      return;
    }
    if (
      index === 3 &&
      !stepSuccess.s3Success
      // !experienceWorkingField.CompanyLocation &&
      // !experienceWorkingField.JobType &&
      // !experienceWorkingField.Workinghour &&
      // !experienceWorkingField.NoticePeriod
    ) {
      return;
    }
    if (
      index === 4 &&
      !stepSuccess.s4Success
      // !experienceWorkingField.SalaryProof &&
      // !experienceWorkingField.SalaryRadio &&
      // !experienceWorkingField.CurrentSalary &&
      // !experienceWorkingField.ExpectedSalary
    ) {
      return;
    }
    if (
      index === 5 &&
      !stepSuccess.s5Success
      // !experienceWorkingField.Education
    ) {
      return;
    }
    if (
      index === 6 &&
      !stepSuccess.s6Success
      // !experienceWorkingField.KeySkills
    ) {
      return;
    }
    if (
      index === 7 &&
      !stepSuccess.s7Success
      // !experienceWorkingField.CandidatePreferredCity &&
      // !experienceWorkingField.PfEsiAccountRadio
    ) {
      return;
    }
    if (
      index === 8 &&
      !stepSuccess.s8Success
      // !experienceWorkingField.CandidateFirstName &&
      // !experienceWorkingField.CandidateLastName &&
      // !experienceWorkingField.CandidateDOB &&
      // !experienceWorkingField.CandidateCurrentLocation
    ) {
      return;
    }
    if (
      index === 9 &&
      !stepSuccess.s9Success
      // !experienceWorkingField.EmergencyName &&
      // !experienceWorkingField.EmergencyNumber
    ) {
      return;
    }
    setSelected(index);

    setSelected(index === selected ? null : index);
  };
  useEffect(() => {
    setExperienceWorkingField({
      ReasonForJobchange: "",
      ReasonForUnEmployee: "",
      PostionApply: null,
      JobIndustry: null,
      ExperienceYear: "",
      ExperienceMonth: "",
      CompanyName: "",
      CompanyLocation: "",
      JobType: "",
      Workinghour: "",
      NoticePeriod: "",
      CurrentSalary: "",
      SalaryProof: "",
      ExpectedSalary: "",
      SalaryRadio: "",
      Education: "",
      Specialization: null,
      CompletedYear: "",
      EducationArrear: "",
      KeySkills: "",
      CertificationCourse: "",
      CandidatePreferredCity: "",
      PfEsiAccountRadio: "",
      CandidateFirstName: "",
      CandidateLastName: "",
      CandidateDOB: "",
      CandidateMobileNumber: mobilenumber,
      CandidateWhtsappNumber: whatsappNumber,
      CandidateCurrentLocation: "",
      EmergencyName: "",
      EmergencyNumber: "",
      RotationalShift: null,
      Accomodation: null,
      Refference: "",
      CvResume: null,
      notes: "",
    });
    setStepCompleted({
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      step5: false,
      step6: false,
      step7: false,
      step8: false,
      step9: false,
      step10: false,
    });
    setStepSuccess({
      s1Success: false,
      s2Success: false,
      s3Success: false,
      s4Success: false,
      s5Success: false,
      s6Success: false,
      s7Success: false,
      s8Success: false,
      s9Success: false,
      s10Success: false,
    });
    toggle(-1);
  }, [candidateStatus]);

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
  const dateDiff = Math.ceil(
    (selectedDate.tentativeInterviewDate - new Date()) / (1000 * 60 * 60 * 24)
  );
  const handleSelectChange = (field, selectedValue) => {
    const selectedoption = selectedValue.value;
    if (field === "ReasonForJobchange") {
      setExperienceWorkingField((prevState) => ({
        ...prevState,
        ReasonForJobchange: selectedValue,
      }));
      setValidity((prevState) => ({
        ...prevState,
        isReasonJobChangeValid: true,
      }));
      setStepCompleted((prev) => ({ ...prev, step1: true }));
    } else if (field === "ReasonForUnEmployee") {
      setExperienceWorkingField((prevState) => ({
        ...prevState,
        ReasonForUnEmployee: selectedValue,
      }));
      setValidity((prevState) => ({
        ...prevState,
        isReasonForUnEmployee: true,
      }));
      setStepCompleted((prev) => ({ ...prev, step1: true }));
    } else if (field === "PostionApply") {
      setExperienceWorkingField((prevState) => ({
        ...prevState,
        PostionApply: selectedoption,
      }));
      setValidity((prevState) => ({
        ...prevState,
        isPositionValid: true,
      }));
      setStepCompleted((prev) => ({ ...prev, step1: true }));
    } else if (field === "JobIndustry") {
      setExperienceWorkingField((prevState) => ({
        ...prevState,
        JobIndustry: selectedValue,
      }));
      setValidity((prevState) => ({
        ...prevState,
        isindustryValid: true,
      }));
      setStepCompleted((prev) => ({ ...prev, step2: true }));
    } else if (field === "JobType") {
      setExperienceWorkingField((prevState) => ({
        ...prevState,
        JobType: selectedValue,
      }));
      setValidity((prevState) => ({
        ...prevState,
        isJobType: true,
      }));
      setStepCompleted((prev) => ({ ...prev, step3: true }));
    } else if (field === "Workinghour") {
      setExperienceWorkingField((prevState) => ({
        ...prevState,
        Workinghour: selectedValue,
      }));
      setValidity((prevState) => ({
        ...prevState,
        isWorkinghour: true,
      }));
      setStepCompleted((prev) => ({ ...prev, step3: true }));
    } else if (field === "NoticePeriod") {
      setExperienceWorkingField((prevState) => ({
        ...prevState,
        NoticePeriod: selectedValue,
      }));
      setValidity((prevState) => ({
        ...prevState,
        isNoticePeriod: true,
      }));
      setStepCompleted((prev) => ({ ...prev, step3: true }));
    } else if (field === "SalaryProof") {
      setExperienceWorkingField((prevState) => ({
        ...prevState,
        SalaryProof: selectedValue,
      }));
      setValidity((prevState) => ({
        ...prevState,
        isSalaryProof: true,
      }));
      setStepCompleted((prev) => ({ ...prev, step4: true }));
    } else if (field === "Education") {
      setExperienceWorkingField((prevState) => ({
        ...prevState,
        Education: selectedValue,
        Specialization: null,
        CompletedYear: null,
        EducationArrear: null,
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

      setStepCompleted((prev) => ({ ...prev, step5: true }));
    } else if (field === "Refference") {
      setExperienceWorkingField((prevState) => ({
        ...prevState,
        Refference: selectedValue,
      }));
      setValidity((prevState) => ({
        ...prevState,
        isRefference: true,
      }));
      setStepCompleted((prev) => ({ ...prev, step10: true }));
    }
  };

  const handleChange = (type, value) => {
    if (type === "years") {
      setExperienceWorkingField({
        ...experienceWorkingField,
        ExperienceYear: value,
      });
      setValidity({
        ...validity,
        isExperienceYear: true,
        isExperienceMonth: true,
      });
    } else if (type === "months") {
      setExperienceWorkingField({
        ...experienceWorkingField,
        ExperienceMonth: value,
      });
      setValidity({
        ...validity,
        isExperienceYear: true,
        isExperienceMonth: true,
      });
    } else if (type === "SalaryRadio") {
      setExperienceWorkingField({
        ...experienceWorkingField,
        SalaryRadio: value,
      });
      setValidity({
        ...validity,
        isSalaryRadio: true,
      });
    }
  };

  const handleInputChange = (field, value) => {
    switch (field) {
      case "CompanyName":
        setExperienceWorkingField((prevState) => ({
          ...prevState,
          CompanyName: value,
        }));
        // console.log(value, "Company name value");
        setValidity((prevState) => ({
          ...prevState,
          isCompanyName: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step3: true }));
        break;
      case "CompanyLocation":
        setExperienceWorkingField((prevState) => ({
          ...prevState,
          CompanyLocation: value,
        }));
        // console.log(value, "Company name value");
        setValidity((prevState) => ({
          ...prevState,
          isCompanyLocation: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step3: true }));
        break;
      case "CurrentSalary":
        setExperienceWorkingField((prevState) => ({
          ...prevState,
          CurrentSalary: value,
        }));
        // console.log(value, "Company name value");
        setValidity((prevState) => ({
          ...prevState,
          isCurrentSalary: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step4: true }));
        break;
      case "ExpectedSalary":
        setExperienceWorkingField((prevState) => ({
          ...prevState,
          ExpectedSalary: value,
        }));
        // console.log(value, "Company name value");
        setValidity((prevState) => ({
          ...prevState,
          isExpectedSalary: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step4: true }));
        break;
      case "CompletedYear":
        setExperienceWorkingField((prevState) => ({
          ...prevState,
          CompletedYear: value,
        }));
        // console.log(value, "Company name value");
        setValidity((prevState) => ({
          ...prevState,
          isCompletedYear: value.trim() !== "",
        }));
        // setStepCompleted((prev) => ({ ...prev, step5: true }));
        break;
      case "CandidateFirstName":
        setExperienceWorkingField((prevState) => ({
          ...prevState,
          CandidateFirstName: value,
        }));
        // console.log(value, "CandidateFirstName");
        setValidity((prevState) => ({
          ...prevState,
          isCandidateFirstName: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step8: true }));
        break;
      case "CandidateLastName":
        setExperienceWorkingField((prevState) => ({
          ...prevState,
          CandidateLastName: value,
        }));
        // console.log(value, "CandidateLastName");
        setValidity((prevState) => ({
          ...prevState,
          isCandidateLastName: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step8: true }));
        break;
      case "CandidateDOB":
        setExperienceWorkingField((prevState) => ({
          ...prevState,
          CandidateDOB: value,
        }));
        // console.log(value, "CandidateDOB");
        setValidity((prevState) => ({
          ...prevState,
          isCandidateDOB: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step8: true }));
        break;
      case "CandidateMobileNumber":
        setExperienceWorkingField((prevState) => ({
          ...prevState,
          CandidateMobileNumber: value,
        }));
        // console.log(value, "Company name value");
        setValidity((prevState) => ({
          ...prevState,
          isCandidateMobileNumber: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step8: true }));
        break;
      case "CandidateWhtsappNumber":
        setExperienceWorkingField((prevState) => ({
          ...prevState,
          CandidateWhtsappNumber: value,
        }));
        // console.log(value, "Company name value");
        setValidity((prevState) => ({
          ...prevState,
          isCandidateWhtsappNumber: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step8: true }));
        break;
      case "CandidateCurrentLocation":
        setExperienceWorkingField((prevState) => ({
          ...prevState,
          CandidateCurrentLocation: value,
        }));
        // console.log(value, "Company name value");
        setValidity((prevState) => ({
          ...prevState,
          isCandidateCurrentLocation: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step8: true }));
        break;
      case "EmergencyName":
        setExperienceWorkingField((prevState) => ({
          ...prevState,
          EmergencyName: value,
        }));
        // console.log(value, "Company name value");
        setValidity((prevState) => ({
          ...prevState,
          isEmergencyName: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step9: true }));
        break;
      case "EmergencyNumber":
        setExperienceWorkingField((prevState) => ({
          ...prevState,
          EmergencyNumber: value,
        }));
        // console.log(value, "Company name value");
        setValidity((prevState) => ({
          ...prevState,
          isEmergencyNumber: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step9: true }));
        break;
      case "notes":
        setExperienceWorkingField((prevState) => ({
          ...prevState,
          notes: value,
        }));
        // console.log(value, "Company name value");
        setValidity((prevState) => ({
          ...prevState,
          isValidNotes: value.trim() !== "",
        }));
        setStepCompleted((prev) => ({ ...prev, step10: true }));
        break;
      default:
        break;
    }
  };
  // const handleRadioChange = (field, value) => {
  //   // Convert the value to boolean if needed
  //   const booleanValue = value === "true";

  //   setExperienceWorkingField((prevState) => ({
  //     ...prevState,
  //     [field]: booleanValue,
  //   }));

  //   // setValidity((prevState) => ({
  //   //   ...prevState,
  //   //   [field]: booleanValue, // Update the validity based on the boolean value
  //   // }));
  //   setValidity((prevState) => ({
  //     ...prevState,
  //     isSalaryRadio: value !== "",
  //     isEducationArrear: value !== "",
  //     isPfEsiAccountRadio: value !== "",
  //     isRotationalShift: value !== "",
  //     isAccomodation: value !== "",
  //     isCvResume: value !== "",
  //   }));
  // };
  const handleRadioChange = (fieldName, value) => {
    setExperienceWorkingField({
      ...experienceWorkingField,
      [fieldName]: value,
    });
    setValidity((prevState) => ({
      ...prevState,
      isSalaryRadio: value !== "",
      isEducationArrear: value !== "",
      isPfEsiAccountRadio: value !== "",
    }));
  };
  const handleotherDetilsRadio = (fieldName, value) => {
    console.log(value, "radio value");
    setExperienceWorkingField({
      ...experienceWorkingField,
      [fieldName]: value,
    });
    setValidity((prevState) => ({
      ...prevState,

      isRotationalShift: value !== null,
      isAccomodation: value !== null,
      isCvResume: value !== null,
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
            value: source.id,
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

    setExperienceWorkingField((prevState) => ({
      ...prevState,
      Specialization: selectedValue,
    }));

    setValidity((prevState) => ({
      ...prevState,
      isSpecialization: selectedValue !== null,
    }));
  };
  const handleMultiSelectChange = (field, selectedValues) => {
    setExperienceWorkingField((prevState) => ({
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

    if (isValid) {
      setStepCompleted((prev) => ({
        ...prev,
        step6: isValid,
      }));
    } else {
      setStepCompleted((prev) => ({
        ...prev,
        step6: false,
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
        step7: isPreferredCityValid,
      }));
    } else {
      setStepCompleted((prev) => ({
        ...prev,
        step7: false,
      }));
    }
  };

  useEffect(() => {
    const isCompanyLocationValid =
      experienceWorkingField.CompanyLocation &&
      experienceWorkingField.CompanyLocation.trim() !== "";
    const shouldValidateEducation =
      experienceWorkingField.Education === "10th Pass and Above";
    const shouldValidateEducation1 =
      experienceWorkingField.Education === "Below 10";
    const isCompletedYearValid =
      shouldValidateEducation && shouldValidateEducation1
        ? experienceWorkingField.CompletedYear.trim() !== ""
        : true;
    const isSpecializationValid =
      shouldValidateEducation && shouldValidateEducation1
        ? experienceWorkingField.Specialization !== null
        : true;
    const isCurrentSalaryValid =
      experienceWorkingField.CurrentSalary &&
      experienceWorkingField.CurrentSalary.trim() !== "";
    const isExpectedSalaryValid =
      experienceWorkingField.ExpectedSalary &&
      experienceWorkingField.ExpectedSalary.trim() !== "";
    const step4Valid = isCurrentSalaryValid || isExpectedSalaryValid;
    const step8Valid =
      experienceWorkingField.CandidateFirstName?.trim() !== "" &&
      experienceWorkingField.CandidateLastName?.trim() !== "" &&
      experienceWorkingField.CandidateDOB?.trim() !== "" &&
      experienceWorkingField.CandidateMobileNumber?.toString().trim() !== "" &&
      experienceWorkingField.CandidateMobileNumber?.length <= 10 &&
      experienceWorkingField.CandidateWhtsappNumber?.toString().trim() !== "" &&
      experienceWorkingField.CandidateWhtsappNumber?.length <= 10 &&
      experienceWorkingField.CandidateCurrentLocation?.trim() !== "";

    const Step9valid =
      experienceWorkingField &&
      experienceWorkingField.EmergencyName &&
      experienceWorkingField.EmergencyNumber &&
      experienceWorkingField.EmergencyNumber.trim() !== "" &&
      experienceWorkingField.EmergencyNumber.length <= 10;

    const isKeySkillsValid = experienceWorkingField.KeySkills.length > 0;
    const validYearsandmonth =
      experienceWorkingField.ExperienceYear === 0 &&
      experienceWorkingField.ExperienceMonth === 0;
    if (validYearsandmonth && stepCompleted.step2) {
      setStepCompleted((prev) => ({
        ...prev,
        step2: false,
      }));
      setStepSuccess((prev) => ({
        ...prev,
        s2Success: false,
      }));
    }
    if (!isCompanyLocationValid && stepCompleted.step3) {
      setStepCompleted((prev) => ({
        ...prev,
        step3: false,
      }));
      setStepSuccess((prev) => ({
        ...prev,
        s3Success: false,
      }));
    }
    if (!step4Valid && stepCompleted.step4) {
      setStepCompleted((prev) => ({
        ...prev,
        step4: false,
      }));
      setStepSuccess((prev) => ({
        ...prev,
        s4Success: false,
      }));
    }
    if (
      (!isCompletedYearValid || !isSpecializationValid) &&
      stepCompleted.step5
    ) {
      setStepCompleted((prev) => ({ ...prev, step5: false }));
      setStepSuccess((prev) => ({ ...prev, s5Success: false }));
    }
    // if (!isCompletedYearValid && stepCompleted.step5) {
    //   setStepCompleted((prev) => ({
    //     ...prev,
    //     step5: false,
    //   }));
    //   setStepSuccess((prev) => ({
    //     ...prev,
    //     s5Success: false,
    //   }));
    // }
    // if (!isspecializationValid && stepCompleted.step5) {
    //   setStepCompleted((prev) => ({
    //     ...prev,
    //     step5: false,
    //   }));
    //   setStepSuccess((prev) => ({
    //     ...prev,
    //     s5Success: false,
    //   }));
    // }
    if (!isKeySkillsValid && !stepCompleted.step6) {
      setStepCompleted((prev) => ({
        ...prev,
        step6: false,
      }));
      setStepSuccess((prev) => ({
        ...prev,
        s6Success: false,
      }));
    }
    if (
      !experienceWorkingField.CandidatePreferredCity.length > 0 &&
      !stepCompleted.step7
    ) {
      setStepCompleted((prev) => ({
        ...prev,
        step7: false,
      }));
      setStepSuccess((prev) => ({
        ...prev,
        s7Success: false,
      }));
    }
    if (!step8Valid && stepCompleted.step8) {
      setStepCompleted((prev) => ({
        ...prev,
        step8: false,
      }));
      setStepSuccess((prev) => ({
        ...prev,
        s8Success: false,
      }));
    }
    if (!Step9valid && stepCompleted.step9) {
      setStepCompleted((prev) => ({
        ...prev,
        step9: false,
      }));
      setStepSuccess((prev) => ({
        ...prev,
        s9Success: false,
      }));
    }
  }, [
    experienceWorkingField.CompanyName,
    experienceWorkingField.CompanyLocation,
    experienceWorkingField.CompletedYear,
    experienceWorkingField.Specialization,
    experienceWorkingField.ExpectedSalary,
    experienceWorkingField.CurrentSalary,
    experienceWorkingField.KeySkills,
    experienceWorkingField.CandidatePreferredCity,
    experienceWorkingField.CandidateDOB,
    experienceWorkingField.CandidateWhtsappNumber,
    experienceWorkingField.CandidateLastName,
    experienceWorkingField.CandidateFirstName,
    experienceWorkingField.EmergencyName,
    experienceWorkingField.Education,
    experienceWorkingField.EmergencyNumber,
    experienceWorkingField.ExperienceYear,
    experienceWorkingField.ExperienceMonth,
    stepSuccess.s6Success,
  ]);

  const handleNextStep = async (currentStep) => {
    switch (currentStep) {
      case 0:
        if (
          candidateStatus === "Yes" &&
          !experienceWorkingField.ReasonForJobchange
        ) {
          setValidity((prevState) => ({
            ...prevState,
            isReasonJobChangeValid: false,
          }));
          return;
        }
        if (
          candidateStatus === "No" &&
          !experienceWorkingField.ReasonForUnEmployee
        ) {
          setValidity((prevState) => ({
            ...prevState,
            isReasonForUnEmployee: false,
          }));
          return;
        }
        if (!experienceWorkingField.PostionApply) {
          setValidity((prevState) => ({
            ...prevState,
            isPositionValid: false,
          }));
          return;
        }
        const object = {
          reason_for_jobchange: experienceWorkingField.ReasonForJobchange,
          reason_for_unemployment: experienceWorkingField.ReasonForUnEmployee,
          jobCategory: experienceWorkingField.PostionApply,
        };
        try {
          const response = await PutUpdateExperiencecurrentStatus(
            object,
            mobilenumber
          );

          // console.log(response.code);
          if (response.message === "CanLead not found or not experienced") {
            console.log("response status code 400", response.code);
            setStepCompleted({ ...stepCompleted, step1: false });
            toggle(0);
            setSelected(0);
            setStepSuccess({ ...stepSuccess, s1Success: false });
            return;
          } else {
            setStepCompleted({ ...stepCompleted, step1: true });
            setSelected(1);
            setStepSuccess({ ...stepSuccess, s1Success: true });
          }
        } catch (error) {
          console.error("Error making API call:", error);
        }
        break;

      case 1:
        if (!experienceWorkingField.JobIndustry) {
          setValidity((prevState) => ({
            ...prevState,
            isindustryValid: false,
          }));
          return;
        }
        if (
          experienceWorkingField.ExperienceYear == 0 &&
          experienceWorkingField.ExperienceMonth == 0
        ) {
          setValidity((prevState) => ({
            ...prevState,
            isExperienceYear: false,
            isExperienceMonth: false,
          }));
          return;
        } else if (experienceWorkingField.ExperienceYear < -1) {
          setValidity((prevState) => ({
            ...prevState,
            isExperienceYear: false,
            isExperienceMonth: true,
          }));
          return;
        } else if (experienceWorkingField.ExperienceMonth < -1) {
          setValidity((prevState) => ({
            ...prevState,
            isExperienceYear: true,
            isExperienceMonth: false,
          }));
          return;
        } else {
          setValidity((prevState) => ({
            ...prevState,
            isExperienceYear: true,
            isExperienceMonth: true,
          }));
        }

        // if (!experienceWorkingField.ExperienceYear) {
        //   setValidity((prevState) => ({
        //     ...prevState,
        //     isExperienceYear: false,
        //     // isExperienceMonth: false,
        //   }));
        //   return;
        // }
        // if (!experienceWorkingField.ExperienceMonth) {
        //   setValidity((prevState) => ({
        //     ...prevState,
        //     // isExperienceYear: false,
        //     isExperienceMonth: false,
        //   }));
        //   return;
        // }

        // setStepCompleted({ ...stepCompleted, step2: true });
        // setSelected(2);
        // setStepSuccess({ ...stepSuccess, s2Success: true });
        const obj = {
          industry: experienceWorkingField.JobIndustry,
          expMonths: experienceWorkingField.ExperienceMonth,
          expYears: experienceWorkingField.ExperienceYear,
        };
        try {
          const response = await PutUpdateExperiencedetails(obj, mobilenumber);

          if (response.status !== 200) {
            console.error("response status code 400");
            setStepCompleted({ ...stepCompleted, step2: false });
            setSelected(1);
            setStepSuccess({ ...stepSuccess, s2Success: false });
          }
          setStepCompleted({ ...stepCompleted, step2: true });
          setSelected(2);
          setStepSuccess({ ...stepSuccess, s2Success: true });
        } catch (error) {
          console.error("Error making API call:", error);
        }
        break;
      case 2:
        let isValid = true;

        if (!experienceWorkingField.CompanyLocation.trim()) {
          setValidity((prevState) => ({
            ...prevState,
            isCompanyLocation: false,
          }));
          isValid = false;
        }

        // Check if job type is not selected
        if (!experienceWorkingField.JobType) {
          setValidity((prevState) => ({
            ...prevState,
            isJobType: false,
          }));
          isValid = false;
        }
        if (!experienceWorkingField.Workinghour) {
          setValidity((prevState) => ({
            ...prevState,
            isWorkinghour: false,
          }));
          isValid = false;
        }
        if (!experienceWorkingField.NoticePeriod) {
          setValidity((prevState) => ({
            ...prevState,
            isNoticePeriod: false,
          }));
          isValid = false;
        }

        // If either is invalid, stop the function here
        if (!isValid) {
          return;
        }

        // setStepCompleted({ ...stepCompleted, step3: true });
        // setSelected(3);
        // setStepSuccess({ ...stepSuccess, s3Success: true });
        const ob = {
          companyName: experienceWorkingField.CompanyName,
          companyLocation: experienceWorkingField.CompanyLocation,
          jobTypeMode: experienceWorkingField.JobType,
          jobWorkHours: experienceWorkingField.Workinghour,
          noticePeriod: experienceWorkingField.NoticePeriod,
        };
        try {
          const response = await PutUpdateExperienceWorkDetails(ob, mobilenumber);

          if (response.status !== 200) {
            console.error("response status code 400");
            setStepCompleted({ ...stepCompleted, step3: false });
            setSelected(2);
            setStepSuccess({ ...stepSuccess, s3Success: false });
          }
          setStepCompleted({ ...stepCompleted, step3: true });
          setSelected(3);
          setStepSuccess({ ...stepSuccess, s3Success: true });
        } catch (error) {
          console.error("Error making API call:", error);
        }
        break;
      case 3:
        let isStep4Valid = true;
        if (!experienceWorkingField.CurrentSalary.trim()) {
          setValidity((prevState) => ({
            ...prevState,
            isCurrentSalary: false,
            // isExpectedSalary: false,
          }));
          isStep4Valid = false;
        }
        if (!experienceWorkingField.ExpectedSalary.trim()) {
          setValidity((prevState) => ({
            ...prevState,
            // isCurrentSalary: false,
            isExpectedSalary: false,
          }));
          isStep4Valid = false;
        }
        if (!experienceWorkingField.SalaryProof) {
          setValidity((prevState) => ({
            ...prevState,
            isSalaryProof: false,
          }));
          isStep4Valid = false;
        }
        if (!experienceWorkingField.SalaryRadio) {
          setValidity((prevState) => ({
            ...prevState,
            isSalaryRadio: false,
          }));
          isStep4Valid = false;
        }
        if (!isStep4Valid) {
          return;
        }
        // setStepCompleted({ ...stepCompleted, step4: true });
        // setSelected(4);
        // setStepSuccess({ ...stepSuccess, s4Success: true });
        const objc = {
          takeHomeSalary: experienceWorkingField.CurrentSalary,
          salaryProofDocumentType: experienceWorkingField.SalaryProof,
          expectedSalary: experienceWorkingField.ExpectedSalary,
          expectedSalaryIs: experienceWorkingField.SalaryRadio,
        };
        try {
          const response = await PutUpdateExperienceSalaryDetails(objc, mobilenumber);

          if (response.status !== 200) {
            console.error("response status code 400");
            setStepCompleted({ ...stepCompleted, step4: false });
            setSelected(3);
            setStepSuccess({ ...stepSuccess, s4Success: false });
          }
          setStepCompleted({ ...stepCompleted, step4: true });
          setSelected(4);
          setStepSuccess({ ...stepSuccess, s4Success: true });
        } catch (error) {
          console.error("Error making API call:", error);
        }
        break;

      case 4:
        let isStep5Valid = true;

        // Validate Education field presence
        if (!experienceWorkingField.Education) {
          setValidity((prevState) => ({
            ...prevState,
            isEducation: false,
          }));
          isStep5Valid = false;
        } else if (
          experienceWorkingField.Education === "Below 10" ||
          experienceWorkingField.Education === "10th Pass and Above"
        ) {
          // If education is one of the lower levels, skip further checks
          isStep5Valid = true;
        } else {
          // Validate Specialization, CompletedYear, and EducationArrear for higher education levels
          if (!experienceWorkingField.Specialization) {
            setValidity((prevState) => ({
              ...prevState,
              isSpecialization: false,
            }));
            isStep5Valid = false;
          }

          if (!experienceWorkingField.CompletedYear) {
            setValidity((prevState) => ({
              ...prevState,
              isCompletedYear: false,
            }));
            isStep5Valid = false;
          }

          if (!experienceWorkingField.EducationArrear) {
            setValidity((prevState) => ({
              ...prevState,
              isEducationArrear: false,
            }));
            isStep5Valid = false;
          }
        }

        // Proceed only if all checks are passed
        if (!isStep5Valid) {
          return;
        }

        // Create object to send in the API request
        const objce = {
          qualification: experienceWorkingField.Education,
          specification: experienceWorkingField.Specialization,
          passed_out_year: experienceWorkingField.CompletedYear,
          isHavingArrear: experienceWorkingField.EducationArrear,
        };

        // Making the API call
        try {
          const response = await PutUpdateEducationalDetails(objce, mobilenumber);
          if (response.code === "200") {
            // Update state to reflect success
            setStepCompleted({
              ...stepCompleted,
              step5: true,
            });
            setSelected(5);
            setStepSuccess({
              ...stepSuccess,
              s5Success: true,
            });
          } else {
            // Handle non-200 status
            console.error("response status code 400");
            setStepCompleted((stepCompleted) => ({
              ...stepCompleted,
              step5: false,
            }));
            setSelected(4);
            setStepSuccess((stepSuccess) => ({
              ...stepSuccess,
              s5Success: false,
            }));
          }
        } catch (error) {
          console.error("Error making API call:", error);
        }
        break;

      case 5:
        let isStep6Valid = true;
        if (experienceWorkingField.KeySkills.length <= 0) {
          setValidity((prevState) => ({
            ...prevState,
            isKeySkills: false,
          }));
          isStep6Valid = false;
        }

        if (!isStep6Valid) {
          return;
        }
        // setStepCompleted({ ...stepCompleted, step6: true });
        // setSelected(6);
        // setStepSuccess({ ...stepSuccess, s6Success: true });
        const objct = {
          keySkill: experienceWorkingField.KeySkills,
          courses: experienceWorkingField.CertificationCourse,
        };
        try {
          const response = await PutUpdateExperienceExpertiseDetails(
            objct,
            mobilenumber
          );

          if (response.status !== 200) {
            console.error("response status code 400");
            setStepCompleted({ ...stepCompleted, step6: false });
            setSelected(5);
            setStepSuccess({ ...stepSuccess, s6Success: false });
          }
          setStepCompleted({ ...stepCompleted, step6: true });
          setSelected(6);
          setStepSuccess({ ...stepSuccess, s6Success: true });
        } catch (error) {
          console.error("Error making API call:", error);
        }
        break;
      case 6:
        let isStep7Valid = true;
        if (experienceWorkingField.CandidatePreferredCity.length <= 0) {
          setValidity((prevState) => ({
            ...prevState,
            isCandidatePreferredCity: false,
          }));
          isStep7Valid = false;
        }
        if (!experienceWorkingField.PfEsiAccountRadio) {
          setValidity((prevState) => ({
            ...prevState,
            isPfEsiAccountRadio: false,
          }));
          isStep7Valid = false;
        }
        if (!isStep7Valid) {
          return;
        }
        // setStepCompleted({ ...stepCompleted, step7: true });
        // setSelected(7);
        // setStepSuccess({ ...stepSuccess, s7Success: true });

        try {
          const response = await PutUpdateexperienceJobLocationDetails(
            experienceWorkingField.CandidatePreferredCity,
            experienceWorkingField.PfEsiAccountRadio,
            mobilenumber
          );

          if (response.status !== 200) {
            console.error("response status code 400");
            setStepCompleted({ ...stepCompleted, step7: false });
            setSelected(6);
            setStepSuccess({ ...stepSuccess, s7Success: false });
          }
          setStepCompleted({ ...stepCompleted, step7: true });
          setSelected(7);
          setStepSuccess({ ...stepSuccess, s7Success: true });
        } catch (error) {
          console.error("Error making API call:", error);
        }
        break;

      case 7:
        let isBasicDetailsValid = true;
        const isValidNumber = (number) => {
          const numStr = number.toString().trim();
          return numStr.length === 10 && /^\d+$/.test(numStr); // Checks for 10 digits only
        };
        if (!experienceWorkingField.CandidateFirstName.trim()) {
          setValidity((prevState) => ({
            ...prevState,
            isCandidateFirstName: false,
          }));
          isBasicDetailsValid = false;
        }
        if (!experienceWorkingField.CandidateLastName.trim()) {
          setValidity((prevState) => ({
            ...prevState,
            isCandidateLastName: false,
          }));
          isBasicDetailsValid = false;
        }
        if (!experienceWorkingField.CandidateDOB.trim()) {
          setValidity((prevState) => ({
            ...prevState,
            isCandidateDOB: false,
          }));
          isBasicDetailsValid = false;
        }
        // const candidateMobileNumber =
        //   experienceWorkingField.CandidateMobileNumber.toString();
        if (!isValidNumber(experienceWorkingField.CandidateMobileNumber)) {
          setValidity((prevState) => ({
            ...prevState,
            isCandidateMobileNumber: false,
          }));
          isBasicDetailsValid = false;
        }
        // const CandidateWhtsappNumber =
        //   experienceWorkingField.CandidateWhtsappNumber.toString();
        if (!isValidNumber(experienceWorkingField.CandidateMobileNumber)) {
          setValidity((prevState) => ({
            ...prevState,
            isCandidateWhtsappNumber: false,
          }));
          isBasicDetailsValid = false;
        }
        if (!experienceWorkingField.CandidateCurrentLocation) {
          setValidity((prevState) => ({
            ...prevState,
            isCandidateCurrentLocation: false,
          }));
          isBasicDetailsValid = false;
        }

        if (!isBasicDetailsValid) {
          return;
        }
        // setStepCompleted({ ...stepCompleted, step8: true });
        // setSelected(8);
        // setStepSuccess({ ...stepSuccess, s8Success: true });
        const basicDetailsObj = {
          name: capitalizeWord(experienceWorkingField.CandidateFirstName),
          lastName: capitalizeWord(experienceWorkingField.CandidateLastName),
          dateOfBirth: experienceWorkingField.CandidateDOB,
          mobileNumber: experienceWorkingField.CandidateMobileNumber,
          whatsappNumber: experienceWorkingField.CandidateWhtsappNumber,
          city: experienceWorkingField.CandidateCurrentLocation,
        };
        try {
          const response = await PutUpdateexperienceBasicDetails(
            basicDetailsObj,
            mobilenumber
          );

          if (response.status !== 200) {
            console.error("response status code 400");
            setStepCompleted({ ...stepCompleted, step8: false });
            setSelected(7);
            setStepSuccess({ ...stepSuccess, s8Success: false });
          }
          setStepCompleted({ ...stepCompleted, step8: true });
          setSelected(8);
          setStepSuccess({ ...stepSuccess, s8Success: true });
        } catch (error) {
          console.error("Error making API call:", error);
        }
        break;

      case 8:
        let isemergencyDetails = true;
        if (!experienceWorkingField.EmergencyName.trim()) {
          setValidity((prevState) => ({
            ...prevState,
            isEmergencyName: false,
          }));
          isemergencyDetails = false;
        }
        const EmergencyNumber = experienceWorkingField.EmergencyNumber.trim();
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
        // setStepCompleted({ ...stepCompleted, step9: true });
        // setSelected(9);
        // setStepSuccess({ ...stepSuccess, s9Success: true });
        const emergencyDetailsObj = {
          emergencyContactNumber: experienceWorkingField.EmergencyNumber,
          relationName: experienceWorkingField.EmergencyName,
        };
        try {
          const response = await PutUpdateexperienceEmergencyDetails(
            emergencyDetailsObj,
            mobilenumber
          );

          if (response.status !== 200) {
            console.error("response status code 400");
            setStepCompleted({ ...stepCompleted, step9: true });
            setSelected(8);
            setStepSuccess({ ...stepSuccess, s9Success: true });
          }
          setStepCompleted({ ...stepCompleted, step9: true });
          setSelected(9);
          setStepSuccess({ ...stepSuccess, s9Success: true });
        } catch (error) {
          console.error("Error making API call:", error);
        }
        break;
      case 9:
        let isOtherDetails = true;

        if (
          experienceWorkingField.RotationalShift === null ||
          experienceWorkingField.RotationalShift === ""
        ) {
          setValidity((prevState) => ({
            ...prevState,
            isRotationalShift: false,
          }));
          isOtherDetails = false;
        }
        if (
          experienceWorkingField.Accomodation === null ||
          experienceWorkingField.Accomodation === ""
        ) {
          setValidity((prevState) => ({
            ...prevState,
            isAccomodation: false,
          }));
          isOtherDetails = false;
        }
        if (
          experienceWorkingField.CvResume === null ||
          experienceWorkingField.CvResume === ""
        ) {
          setValidity((prevState) => ({
            ...prevState,
            isCvResume: false,
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
        // Use isOtherDetails variable as needed

        if (!experienceWorkingField.Refference) {
          setValidity((prevState) => ({
            ...prevState,
            isRefference: false,
          }));
          isStep4Valid = false;
        }

        if (!isOtherDetails) {
          return;
        }
        // setStepCompleted({ ...stepCompleted, step10: true });
        // setSelected(10);
        // setStepSuccess({ ...stepSuccess, s10Success: true });
        try {
          const response = await PutUpdateexperienceOtherDetails(
            experienceWorkingField.RotationalShift,
            experienceWorkingField.Accomodation,
            experienceWorkingField.CvResume,
            experienceWorkingField.Refference,
            // selectedDate.tentativeInterviewDate == "Invalid date"
            //   ? ""
            //   : selectedDate.tentativeInterviewDate,
            // selectedDate.followUpDate1 == "Invalid date"
            //   ? ""
            //   : selectedDate.followUpDate1,
            experienceWorkingField.notes,
            mobilenumber
          );

          if (response.status !== 200) {
            console.error("response status code 400");
            setStepCompleted({ ...stepCompleted, step10: false });
            setSelected(9);
            setStepSuccess({ ...stepSuccess, s10Success: false });
          }
          setStepCompleted({ ...stepCompleted, step10: true });
          setSelected(10);
          setEnableSubmit(false);
          setStepSuccess({ ...stepSuccess, s10Success: true });
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
        const data = await GetCandidateQualifyForm(mobilenumber);
        console.log(data.canLeadDetails, "data of object");

        if (data) {
          const {
            reason_for_jobchange,
            reason_for_unemployment,
            jobCategory,
            industry,
            experience,
            expMonths,
            companyName,
            companyLocation,
            jobTypeMode,
            jobWorkHours,
            noticePeriod,
            salaryProofDocumentType,
            expectedSalary,
            takeHomeSalary,
            expectedSalaryIs,
            qualification,
            specification,
            passed_out_year,
            isHavingArrear,
            keySkill,
            courses,
            prefLocation,
            pfEsiAccount,
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
          } = data;
          let keySkillsArray = [];
          let coursesArray = [];
          let PrfLocationArray = [];
          let ReasonForUnEmployeearray = [];
          let ReasonForJobchangearray = [];
          let jobCategoryarray = [];
          let industryarray = [];

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
          if (jobCategory && jobCategory !== "") {
            jobCategoryarray = jobCategory.split(",").map((jobCategory) => {
              return { value: jobCategory, label: jobCategory };
            });
          }
          if (industry && industry !== "") {
            industryarray = industry.split(",").map((industry) => {
              return { value: industry, label: industry };
            });
          }
          if (reason_for_jobchange && reason_for_jobchange !== "") {
            ReasonForJobchangearray = reason_for_jobchange
              .split(",")
              .map((reason_for_jobchange) => {
                return {
                  value: reason_for_jobchange,
                  label: reason_for_jobchange,
                };
              });
          }
          if (reason_for_unemployment && reason_for_unemployment !== "") {
            ReasonForUnEmployeearray = reason_for_unemployment
              .split(",")
              .map((reason_for_unemployment) => {
                return {
                  value: reason_for_unemployment,
                  label: reason_for_unemployment,
                };
              });
          }
          console.log(keySkillsArray, "keySkillsArray");
          // Update state based on retrieved values
          setExperienceWorkingField((prevState) => ({
            ...prevState,
            ReasonForJobchange: ReasonForJobchangearray,
            ReasonForUnEmployee: ReasonForUnEmployeearray,
            PostionApply: jobCategory,
            JobIndustry: industryarray,
            ExperienceYear: experience,
            ExperienceMonth: expMonths,
            CompanyName: companyName,
            CompanyLocation: companyLocation,
            JobType: jobTypeMode,
            Workinghour: jobWorkHours,
            NoticePeriod: noticePeriod,
            SalaryProof: salaryProofDocumentType,
            CurrentSalary: takeHomeSalary,
            ExpectedSalary: expectedSalary,
            SalaryRadio: expectedSalaryIs,
            Education: qualification,
            Specialization: specification,
            CompletedYear: passed_out_year,
            EducationArrear: isHavingArrear,
            KeySkills: keySkillsArray,
            CertificationCourse: coursesArray,
            CandidatePreferredCity: PrfLocationArray,
            PfEsiAccountRadio: pfEsiAccount,
            CandidateFirstName: firstName,
            CandidateLastName: lastName,
            CandidateDOB: dateOfBirth,
            // CandidateMobileNumber: mobilenumber,
            CandidateWhtsappNumber: whatsappNumber,
            CandidateCurrentLocation: city,
            EmergencyName: relationName,
            EmergencyNumber: emergencyContactNumber,
            RotationalShift: readyForShifts,
            Accomodation: needAccommodation,
            Refference: reference,
            CvResume: havingUpdatedCv,
            notes: notes,
          }));

          let nextStep = 0;
          let successStatus = {};

          if (
            jobCategory &&
            (reason_for_jobchange || reason_for_unemployment)
          ) {
            nextStep = 1;
            successStatus = { ...successStatus, s1Success: true };
          }

          if (industry && experience && expMonths) {
            nextStep = 2;
            successStatus = { ...successStatus, s2Success: true };
          }
          if (
            companyName ||
            (companyLocation && jobTypeMode, jobWorkHours && noticePeriod)
          ) {
            nextStep = 3;
            successStatus = { ...successStatus, s3Success: true };
          }

          if (
            takeHomeSalary &&
            expectedSalary &&
            expectedSalaryIs &&
            salaryProofDocumentType
          ) {
            nextStep = 4;
            successStatus = { ...successStatus, s4Success: true };
          }

          if (qualification) {
            if (
              qualification === "Below 10" ||
              qualification === "10th Pass and Above"
            ) {
              // Skip validation for Specialization and CompletedYear
              nextStep = 5;
              successStatus = { ...successStatus, s5Success: true };
            } else if (
              qualification !== "Below 10" ||
              qualification !== "10th Pass and Above"
            ) {
              setShowEducationDetials(true);
              if (specification && passed_out_year && isHavingArrear) {
                nextStep = 5;
                successStatus = { ...successStatus, s5Success: true };
              }
            } else {
              setShowEducationDetials(false);
            }
          }

          if (keySkill || courses) {
            nextStep = 6;
            successStatus = { ...successStatus, s6Success: true };
          }

          if (prefLocation && pfEsiAccount) {
            nextStep = 7;
            successStatus = { ...successStatus, s7Success: true };
          }
          if (firstName && lastName && whatsappNumber && dateOfBirth && city) {
            nextStep = 8;
            successStatus = { ...successStatus, s8Success: true };
          }
          if (relationName && emergencyContactNumber) {
            nextStep = 9;
            successStatus = { ...successStatus, s9Success: true };
          }
          if (
            havingUpdatedCv !== "" &&
            needAccommodation !== "" &&
            readyForShifts !== "" &&
            reference !== ""
          ) {
            nextStep = 10;
            successStatus = { ...successStatus, s10Success: true };
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

  function handleQualifyFormSubmit() {
    Reloadpage();
  }
  return (
    <div>
      {/* <div className="btn btn-danger" onClick={}>Close</div> */}
      <div className={`${accordionstyle.Container}`}>
        <div className={`${accordionstyle.wrapper}`}>
          <div className={`${accordionstyle.accordion}`}>
            {/* Your accordion content */}
            <div
              className={`${accordionstyle.item}  ${
                stepSuccess.s1Success && accordionstyle.selected
              }`}
            >
              <div
                className={`${accordionstyle.title}`}
                onClick={() => toggle(0)}
              >
                <h4> Current Status</h4>
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
                  <div className="row">
                    {candidateStatus === "Yes" && (
                      <div className="col-sm-6">
                        <label
                          htmlFor="ReasonForJobChange"
                          className="form-label"
                        >
                          <b> Reason for job change?</b>
                        </label>
                        <Select
                          isMulti={false}
                          className={`react-select-container ${
                            !validity.isReasonJobChangeValid && "is-invalid"
                          }`}
                          classNamePrefix="react-select"
                          id="qualificationDropdown"
                          value={experienceWorkingField.ReasonForJobchange}
                          options={[
                            { value: "Higher salary", label: "Higher salary" },
                            {
                              value: "Higher position",
                              label: "Higher position",
                            },
                            {
                              value: "Contract ending soon",
                              label: "Contract ending soon",
                            },
                            { value: "Job location", label: "Job location" },
                            { value: "Shift timings", label: "Shift timings" },
                            { value: "Work hours", label: "Work hours" },
                            {
                              value: "No company accommodation",
                              label: "No company accommodation",
                            },
                            {
                              value: "Other reason is not listed",
                              label: "Other reason is not listed",
                            },
                          ]}
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              border: "1px solid #ced4da",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }),
                          }}
                          onChange={(selectedValue) => {
                            handleSelectChange(
                              "ReasonForJobchange",
                              selectedValue
                            );
                            // console.log(selectedValue.value);
                          }}
                        />
                        {!validity.isReasonJobChangeValid && (
                          <div
                            style={{ color: "red" }}
                            className="error-message"
                          >
                            Please select a option.
                          </div>
                        )}
                      </div>
                    )}
                    {candidateStatus === "No" && (
                      <div className="col-sm-6">
                        <label
                          htmlFor="ReasonForUnEmployee"
                          className="form-label"
                        >
                          <b> Reason for unemployment?</b>
                        </label>
                        <Select
                          isMulti={false}
                          className={`react-select-container ${
                            !validity.isReasonForUnEmployee && "is-invalid"
                          }`}
                          classNamePrefix="react-select"
                          id="qualificationDropdown"
                          value={experienceWorkingField.ReasonForUnEmployee}
                          options={[
                            // { value: "", label: "" },
                            {
                              value: " Contract/Project Ended",
                              label: " Contract/Project Ended",
                            },
                            { value: "Job Location", label: "Job Location" },
                            {
                              value: "Health Issues",
                              label: "Health Issues",
                            },
                            {
                              value: " Company Closed",
                              label: " Company Closed",
                            },
                            { value: "Other Reason", label: "Other Reason" },
                          ]}
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              border: "1px solid #ced4da",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }),
                          }}
                          onChange={(selectedValue) => {
                            handleSelectChange(
                              "ReasonForUnEmployee",
                              selectedValue
                            );
                            // console.log(selectedValue.value);
                          }}
                        />
                        {!validity.isReasonForUnEmployee && (
                          <div
                            style={{ color: "red" }}
                            className="error-message"
                          >
                            Please select a option.
                          </div>
                        )}
                      </div>
                    )}

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
                          experienceWorkingField.PostionApply
                            ? {
                                value: experienceWorkingField.PostionApply,
                                label: experienceWorkingField.PostionApply,
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
                <h4>Experience Details</h4>
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
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="jobindustry">
                      {/* <b>Current industry?</b> */}
                      {candidateStatus === "Yes" ? (
                        <strong>Current industry?</strong>
                      ) : (
                        <strong>Previous industry?</strong>
                      )}
                    </label>
                    <Select
                      isMulti={false} // Set isMulti to false for single selection
                      className={`react-select-container mt-3 ${
                        !validity.isindustryValid && "is-invalid"
                      }`}
                      classNamePrefix="react-select"
                      id="industryDropdown"
                      name="industry"
                      value={experienceWorkingField.JobIndustry}
                      onChange={(
                        selectedValue // Handle single selected value
                      ) => handleSelectChange("JobIndustry", selectedValue)}
                      options={arrayofData.industry}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: "1px solid #ced4da",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }),
                      }}
                    />
                    {!validity.isindustryValid && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select a option.
                      </div>
                    )}
                  </div>
                  <div className="col-sm-6">
                    <div className=" ">
                      <label htmlFor="">
                        <b>Experience in year(s) and month(s)</b>
                      </label>
                      <div className="d-flex gap-3 w-100">
                        <div className="flex-grow-1 mb-3 ">
                          <label
                            htmlFor="monthsDropdown"
                            className="form-label"
                          >
                            {/* <strong>Months</strong> */}
                          </label>
                          <select
                            className={`form-control ${
                              !validity.isExperienceYear && "is-invalid"
                            }`}
                            id="yearsDropdown"
                            value={experienceWorkingField.ExperienceYear}
                            onChange={(e) =>
                              handleChange("years", e.target.value)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <option value="">Select year</option>
                            <option value="0">0 year</option>
                            <option value="1">1 year</option>
                            <option value="2">2 year(s)</option>
                            <option value="3">3 year(s)</option>
                            <option value="4">4 year(s)</option>
                            <option value="5">5 year(s)</option>
                            <option value="6">6 year(s)</option>
                            <option value="7">7 year(s)</option>
                            <option value="8">8 year(s)</option>
                            <option value="9">9 year(s)</option>
                            <option value="10">10 year(s)</option>
                            <option value="11">11 year(s)</option>
                            <option value="12">12 year(s)</option>
                          </select>
                          {!validity.isExperienceYear && (
                            <div
                              style={{ color: "red" }}
                              className="error-message"
                            >
                              Please select the years.
                            </div>
                          )}
                        </div>
                        <div className="flex-grow-1 mb-3 ">
                          <label
                            htmlFor="monthsDropdown"
                            className="form-label"
                          >
                            {/* <strong>Months</strong> */}
                          </label>
                          <select
                            className={`form-control ${
                              !validity.isExperienceMonth && "is-invalid"
                            }`}
                            id="monthsDropdown"
                            value={experienceWorkingField.ExperienceMonth}
                            onChange={(e) =>
                              handleChange("months", e.target.value)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <option value="">Select month</option>
                            <option value="0">0 month</option>
                            <option value="1">1 month</option>
                            <option value="2">2 month(s)</option>
                            <option value="3">3 month(s)</option>
                            <option value="4">4 month(s)</option>
                            <option value="5">5 month(s)</option>
                            <option value="6">6 month(s)</option>
                            <option value="7">7 month(s)</option>
                            <option value="8">8 month(s)</option>
                            <option value="9">9 month(s)</option>
                            <option value="10">10 month(s)</option>
                            <option value="11">11 month(s)</option>
                            <option value="12">12 month(s)</option>
                          </select>
                          {!validity.isExperienceMonth && (
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
                </div>
                <div className="mt-3 mb-2">
                  {/* <div
              className={`btn btn-success ${
                !stepCompleted.step2 && "disabled"
              }`}
              onClick={handleNxetstep2}
            > */}
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
                <h4>
                  {candidateStatus === "Yes"
                    ? " Current Work Details"
                    : "Previous Work Details "}
                </h4>
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
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="companyname" className="form-label">
                      {candidateStatus === "Yes" ? (
                        <strong>Current company name?</strong>
                      ) : (
                        <strong>Previous company name?</strong>
                      )}
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        !validity.isCompanyName && "is-invalid"
                      }`}
                      id="companyname"
                      value={experienceWorkingField.CompanyName}
                      onChange={(e) =>
                        handleInputChange("CompanyName", e.target.value)
                      }
                      onKeyPress={(e) => {
                        // Check if the pressed key is a number
                        if (/\d/.test(e.key)) {
                          e.preventDefault(); // Prevent the input of numbers
                        }
                      }}
                    />
                    {!validity.isCompanyName && (
                      <div style={{ color: "red" }} className="error-message">
                        Please enter the company name.
                      </div>
                    )}
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="currentcompany" className="form-label">
                      {/* <strong>Current company work location?</strong> */}
                      {candidateStatus === "Yes" ? (
                        <strong>Current company work location?</strong>
                      ) : (
                        <strong>Previous company work location?</strong>
                      )}
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        !validity.isCompanyLocation && "is-invalid"
                      }`}
                      id="currentcompany"
                      value={experienceWorkingField.CompanyLocation}
                      onChange={(e) =>
                        handleInputChange("CompanyLocation", e.target.value)
                      }
                      onKeyPress={(e) => {
                        // Check if the pressed key is a number
                        if (/\d/.test(e.key)) {
                          e.preventDefault(); // Prevent the input of numbers
                        }
                      }}
                    />
                    {!validity.isCompanyLocation && (
                      <div style={{ color: "red" }} className="error-message">
                        Please enter the company location.
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-sm-6">
                    <label htmlFor="currentDropdown" className="form-label">
                      {/* <strong>Current job type?</strong> */}
                      {candidateStatus === "Yes" ? (
                        <strong>Current job type?</strong>
                      ) : (
                        <strong>Previous job type?</strong>
                      )}
                    </label>
                    <select
                      className={`form-control ${
                        !validity.isJobType && "is-invalid"
                      }`}
                      id="currentDropdown"
                      value={experienceWorkingField.JobType}
                      onChange={(e) =>
                        handleSelectChange("JobType", e.target.value)
                      }
                    >
                      <option value="">Select job type</option>
                      <option value="On Roll">On Roll</option>
                      <option value="Contract">Contract</option>
                      <option value="Temporary">Temporary</option>
                      <option value="Apprenticeship">Apprenticeship</option>
                    </select>
                    {!validity.isJobType && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select a option.
                      </div>
                    )}
                  </div>
                  <div className="col-sm-6">
                    {" "}
                    <label htmlFor="currentDropdown" className="form-label">
                      {/* <strong>Current work hours?</strong> */}
                      {candidateStatus === "Yes" ? (
                        <strong>Current work hours?</strong>
                      ) : (
                        <strong>Previous work hours?</strong>
                      )}
                    </label>
                    <select
                      className={`form-control ${
                        !validity.isWorkinghour && "is-invalid"
                      }`}
                      id="currentDropdown"
                      value={experienceWorkingField.Workinghour}
                      onChange={(e) =>
                        handleSelectChange("Workinghour", e.target.value)
                      }
                    >
                      <option value="">Select work hours</option>
                      <option value="8 Hours">8 Hours</option>
                      <option value="10 Hours">10 Hours</option>
                      <option value="12 Hours">12 Hours</option>
                    </select>
                    {!validity.isWorkinghour && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select a work hours.
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-sm-6">
                    <label htmlFor="currentDropdown" className="form-label">
                      <strong>Notice Period?</strong>
                    </label>
                    <select
                      className={`form-control ${
                        !validity.isNoticePeriod && "is-invalid"
                      }`}
                      id="currentDropdown"
                      value={experienceWorkingField.NoticePeriod}
                      onChange={(e) =>
                        handleSelectChange("NoticePeriod", e.target.value)
                      }
                    >
                      <option value="">Select Notice Period</option>
                      <option value="15 Days">15 Days</option>
                      <option value="1 Month">1 Month</option>
                      <option value="2 Months">2 Months</option>
                      <option value="3 Months">3 Months</option>
                      <option value="None">None</option>
                    </select>
                    {!validity.isNoticePeriod && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select a Notice Period.
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-3 mb-2">
                  <div
                    className={`btn btn-success 
                    ${
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
                stepSuccess.s4Success && accordionstyle.selected
              }`}
            >
              <div
                className={`${accordionstyle.title}`}
                onClick={() => toggle(3)}
              >
                <h4>Salary Details</h4>
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
                    <label htmlFor="CurrentSalary" className="form-label">
                      {/* <strong>Current take home salary?</strong> */}
                      {candidateStatus === "Yes" ? (
                        <strong>Current take home salary?</strong>
                      ) : (
                        <strong>Previous take home salary?</strong>
                      )}
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        !validity.isCurrentSalary && "is-invalid"
                      }`}
                      id="CurrentSalary"
                      value={experienceWorkingField.CurrentSalary}
                      onChange={(e) =>
                        handleInputChange("CurrentSalary", e.target.value)
                      }
                      maxLength={5}
                      onKeyPress={(e) => {
                        // Allow only numbers
                        if (!/\d/.test(e.key)) {
                          e.preventDefault(); // Prevent the input of non-numeric characters
                        }
                      }}
                    />
                    {!validity.isCurrentSalary && (
                      <div style={{ color: "red" }} className="error-message">
                        Please enter the take home salary.
                      </div>
                    )}
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="SalaryProof" className="form-label">
                      <strong>Salary proof document?</strong>
                    </label>
                    <select
                      className={`form-control ${
                        !validity.isSalaryProof && "is-invalid"
                      }`}
                      id="SalaryProof"
                      value={experienceWorkingField.SalaryProof}
                      onChange={(e) =>
                        handleSelectChange("SalaryProof", e.target.value)
                      }
                    >
                      <option value="">select a option</option>
                      <option value="Pay Slip">Pay Slip</option>
                      <option value="Bank Statement">Bank Statement</option>
                      <option value="Apprenticeship">Apprenticeship</option>
                    </select>
                    {!validity.isSalaryProof && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select a option.
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mt-2">
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
                      value={experienceWorkingField.ExpectedSalary}
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
                            experienceWorkingField.SalaryRadio === "Average"
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
                            checked={
                              experienceWorkingField.SalaryRadio === "High"
                            }
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
                stepSuccess.s5Success && accordionstyle.selected
              }`}
            >
              <div
                className={`${accordionstyle.title}`}
                onClick={() => toggle(4)}
              >
                <h4>Education Details</h4>

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
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="educationDropdown" className="form-label">
                      <strong>Education</strong>
                    </label>
                    <select
                      className={`form-control ${
                        !validity.isEducation && "is-invalid"
                      }`}
                      id="educationDropdown"
                      value={experienceWorkingField.Education}
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
                            experienceWorkingField.Specialization
                              ? {
                                  value: experienceWorkingField.Specialization,
                                  label: experienceWorkingField.Specialization,
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
                          value={experienceWorkingField.CompletedYear}
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
                                experienceWorkingField.EducationArrear === "Yes"
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
                                  experienceWorkingField.EducationArrear ===
                                  "No"
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
                      selected === 4 && experienceWorkingField.Education === ""
                        ? "disabled"
                        : ""
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
                <h4>Expertise Details</h4>
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
                      value={experienceWorkingField.KeySkills}
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
                      value={experienceWorkingField.CertificationCourse}
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
                <h4>Job Location Details</h4>
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
                      value={experienceWorkingField.CandidatePreferredCity}
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
                  <div className="col-sm-6">
                    <label className="form-label">
                      <b>Having PF/ESI Account ?</b>
                    </label>
                    <div className={`d-flex`}>
                      <div
                        className={`me-2 d-flex ${accordionstyle.radioInput}`}
                      >
                        {/* <label className="form-check-label me-3"> */}
                        <input
                          type="radio"
                          name="PfEsiAccountRadio"
                          id="PfEsiAccountRadioYes"
                          value="Yes"
                          className={`form-check-input ${
                            !validity.isPfEsiAccountRadio && "is-invalid"
                          }`}
                          checked={
                            experienceWorkingField.PfEsiAccountRadio === "Yes"
                          }
                          onChange={(e) =>
                            handleRadioChange(
                              "PfEsiAccountRadio",
                              e.target.value
                            )
                          }
                        />
                        <label for="PfEsiAccountRadioYes">Yes</label>
                        {/* </label> */}
                      </div>
                      <div
                        className={`me-2 d-flex ${accordionstyle.radioInput}`}
                      >
                        <label className="form-check-label">
                          <input
                            type="radio"
                            name="PfEsiAccountRadio"
                            id="PfEsiAccountRadioNo"
                            value="No"
                            className={`form-check-input ${
                              !validity.isPfEsiAccountRadio && "is-invalid"
                            }`}
                            checked={
                              experienceWorkingField.PfEsiAccountRadio === "No"
                            }
                            onChange={(e) =>
                              handleRadioChange(
                                "PfEsiAccountRadio",
                                e.target.value
                              )
                            }
                          />
                          <label for="PfEsiAccountRadioNo">No</label>
                        </label>
                      </div>
                    </div>

                    {!validity.isPfEsiAccountRadio && (
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
                <h4>Basic Details</h4>
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
                          value={experienceWorkingField.CandidateFirstName}
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
                          value={experienceWorkingField.CandidateLastName}
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
                      value={experienceWorkingField.CandidateDOB}
                      className={`form-control ${
                        !validity.isCandidateDOB && "is-invalid"
                      }`}
                      onChange={(e) =>
                        handleInputChange("CandidateDOB", e.target.value)
                      }
                    />
                    {!validity.isCandidateDOB && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select a date of birth.
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
                      value={experienceWorkingField.CandidateMobileNumber}
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
                      value={experienceWorkingField.CandidateWhtsappNumber}
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
                      value={experienceWorkingField.CandidateCurrentLocation}
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
                      selected === 7 && !stepCompleted.step8 ? "disabled" : ""
                    }`}
                    onClick={() => handleNextStep(7)}
                  >
                    Next
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${accordionstyle.item} ${
                stepSuccess.s9Success ? accordionstyle.selected : ""
              }`}
            >
              <div
                className={`${accordionstyle.title}`}
                onClick={() => toggle(8)}
              >
                <h4>Emergency Contact Details</h4>
                <span>
                  {selected === 8 ? (
                    <b className="fs-1">-</b>
                  ) : (
                    <b className="fs-2">+</b>
                  )}
                </span>
              </div>
              <div
                className={`${
                  selected === 8
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
                      value={experienceWorkingField.EmergencyName}
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
                      value={experienceWorkingField.EmergencyNumber}
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
                      selected === 8 && !stepCompleted.step9 ? "disabled" : ""
                    }`}
                    onClick={() => handleNextStep(8)}
                  >
                    Next
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${accordionstyle.item} ${
                stepSuccess.s10Success ? accordionstyle.selected : ""
              }`}
            >
              <div
                className={`${accordionstyle.title}`}
                onClick={() => toggle(9)}
              >
                <h4>Other Details</h4>
                <span>
                  {selected === 9 ? (
                    <b className="fs-1">-</b>
                  ) : (
                    <b className="fs-2">+</b>
                  )}
                </span>
              </div>
              <div
                className={`${
                  selected === 9
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
                          checked={
                            experienceWorkingField.RotationalShift === true
                          }
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
                            experienceWorkingField.RotationalShift === false
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
                        Please select an option.
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
                          checked={experienceWorkingField.Accomodation === true}
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
                            checked={
                              experienceWorkingField.Accomodation === false
                            }
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
                    //   value={experienceWorkingField.Refference}
                    value={
                        experienceWorkingField.Refference
                          ? {
                              value: experienceWorkingField.Refference,
                              label: experienceWorkingField.Refference,
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
                          checked={experienceWorkingField.CvResume === true}
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
                          checked={experienceWorkingField.CvResume === false}
                          onChange={(e) =>
                            handleotherDetilsRadio("CvResume", false)
                          }
                        />
                        <label htmlFor="CvResumeNo">No</label>
                      </div>
                    </div>

                    {!validity.isCvResume && (
                      <div style={{ color: "red" }} className="error-message">
                        Please select an option.
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
                      {validity.isFollowDate1 ? null : (
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
                      value={experienceWorkingField.notes}
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
                      selected === 9 && !stepCompleted.step10 ? "disabled" : ""
                    }`}
                    onClick={() => handleNextStep(9)}
                  >
                    Next
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="mt-2 mb-2 d-flex justify-content-end align-itmes-center">
          <button
            className="btn btn-success"
            disabled={enableSubmit}
            onClick={handleQualifyFormSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateExperinenceWorkingform;
