/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import companylogo from "../../../assets/images/Company-Logo.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Autocomplete from "@mui/material/Autocomplete";
import style from "./Candidateupdate.module.scss";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {
  GetCandidateSources,
  GetCourses,
  GetDepartments,
  GetStates,
  Getlanguages,
  getKeySkills,
  updateCandidateform,
} from "../../../apiServices";
function CandidateUpdate() {
  const [candidateOptions, setCandidateOptions] = useState({
    eduQualification: { val: "", err: false },
    department: { val: "", err: false, show: false },
    completeYear: { val: "", err: false, show: false },
    departmentOptions: { val: [] },
    Language: { val: [], err: false },
    skills: { val: [], err: false },
    courses: { val: [], err: false },
    preferdLocation: { val: "", err: false },
    reference: { val: "", err: false },
    states: { val: "" },
  });
  const [profilePicture, setProfilePicture] = useState(companylogo);
  const fileInputRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [profileFile, setProfileFile] = useState(null);

  const [candidateUpdateObj, setCandidateupdateObj] = useState({
    profile: "",
    Name: "",
    date: "",
    states: { val: "" },
    city: "",
    gender: "null",
    eduQualification: { val: "" },
    department: { val: "", show: false },
    completeYear: { val: "", show: false },
    departmentOptions: { val: [] },
    qualification: { val: "", err: false },
    Language: { val: [], err: false },
    skills: { val: [], err: false },
    courses: { val: [], err: false },
    preferdLocation: { val: "", err: false },
    reference: { val: "", err: false },
    student: "",
    arrear: "",
    PfAccount: "",
    // // PreferdLocation: [],
    // reference: '',
    WhatsappNumber: "",
    MobileNumber: "",
    miniExperience: -1,
    maxExperience: -1,
  });
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfileFile(file);

    if (file) {
      // Read the file and set it as the profile picture
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePhotoClick = () => {
    fileInputRef.current.click();
  };

  const salary = [
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

  const handleUserInput = (name, val) => {
    setCandidateupdateObj((prevDetails) => ({
      ...prevDetails,
      [name]: { val, err: false, show: true },
    }));
  };

  const handleEducationInput = (e, value) => {
    handleGetDepartment(value);
  };

  const resetAllFields = () => {
    setCandidateupdateObj({
      eduQualification: { val: "", err: false },
      department: { val: "", err: false, show: false },
      completeYear: { val: "", err: false, show: false },
      departmentOptions: { val: [] },
    });
  };

  const handleGetDepartment = (value) => {
    let end_url;
    resetAllFields();

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
        break;
    }

    if (end_url != null) {
      GetDepartments(end_url).then((data) => {
        setCandidateupdateObj((prevDetails) => ({
          ...prevDetails,
          departmentOptions: { val: data.results },
        }));
        setCandidateupdateObj((prevDetails) => ({
          ...prevDetails,
          department: { ...prevDetails.department, show: true },
          completeYear: { ...prevDetails.department, show: true },
        }));
      });
    } else {
      setCandidateupdateObj((prevDetails) => ({
        ...prevDetails,
        department: { ...prevDetails.department, show: false },
        completeYear: { ...prevDetails.department, show: false },
      }));
    }
  };

  const translate = {
    educationQualfication: {
      en: "Education Qualification",
    },
    department: {
      en: "Department",
    },
  };

  const Lang = "en";

  useEffect(() => {
    // getKeySkills().then((data) => {
    //   setCandidateOptions(data.results);
    // });

    getKeySkills().then((data) => {
      console.log(data);
      setCandidateOptions((prev) => ({
        ...prev,
        skills: { val: data.results, loaded: true },
      }));
    });
    Getlanguages().then((data) => {
      console.log(data);
      setCandidateOptions((prev) => ({
        ...prev,
        Language: { val: data.results, loaded: true },
      }));
    });
    GetCourses().then((data) => {
      console.log(data);
      setCandidateOptions((prev) => ({
        ...prev,
        courses: { val: data.results, loaded: true },
      }));
    });

    GetCandidateSources().then((data) => {
      console.log(data);
      let options = data.map((item) => {
        return item.source;
      });
      setCandidateOptions((prev) => ({
        ...prev,
        reference: { val: options, loaded: true },
      }));
      console.log(options);
    });
    GetStates().then((data) => {
      console.log(data);
      let options = data.map((item) => {
        return item.state;
      });
      setCandidateOptions((prev) => ({
        ...prev,
        states: { val: options, loaded: true },
      }));
      console.log(options);
    });
    // GetStates().then((data) => {
    //   console.log(data);
    //   setCandidateOptions((prev) => ({
    //     ...prev,
    //     state: { val: data.results, loaded: true },
    //   }));

    // });
  }, []);

  console.log(candidateOptions);

  useEffect(() => {
    console.log("filtered object", candidateUpdateObj);

    if (
      JSON.stringify(candidateOptions.current) !==
      JSON.stringify(candidateUpdateObj)
    ) {
      updateCandidateform(candidateUpdateObj).then((data) => {
        // Dispatch(filteredJobsActions.setFilteredJobs(data));
        console.log(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateUpdateObj]);

  const updateSkills = (value) => {
    // to update skills
    setCandidateupdateObj((prev) => ({
      ...prev,
      skills: { ...prev.skills, val: value },
    }));
    console.log(value);
  };
  const updateLanguage = (value) => {
    setCandidateupdateObj((pre) => ({
      ...pre,
      Language: { ...pre.Language, val: value },
    }));
    console.log(value);
  };
  const updateCourses = (value) => {
    setCandidateupdateObj((pre) => ({
      ...pre,
      courses: { ...pre.courses, val: value },
    }));
    console.log(value);
  };
  const updatereference = (value) => {
    setCandidateupdateObj((pre) => ({
      ...pre,
      reference: { ...pre.reference, val: value },
    }));
    console.log(value);
  };
  const updatestate = (value) => {
    setCandidateupdateObj((prev) => ({
      ...prev,
      states: { ...prev.states, val: value },
    }));
    console.log(value);
  };
  const handleTextFieldChange = (event) => {
    const { name, value } = event.target;
    setCandidateupdateObj((prevDetails) => ({
      ...prevDetails,
      [name]: { val: value, err: false },
    }));
  };

  const handleRadioBtn = (e) => {
    const { value } = e.target;
    setCandidateupdateObj((prev) => ({ ...prev, gender: value }));
  };
  return (
    <div>
      <div className="container-fluid Update_content">
        <h2 className="text-center mt-3 mb-3">Candidate Update Form </h2>
        <div className="shadow p-3 mb-5 bg-body rounded col-sm-9">
          <Box component="form" noValidate autoComplete="off">
            <form>
              <div className="row">
                <div className="col-md-12 col-sm-4 mb-4">
                  {profilePicture && (
                    <img
                      src={profilePicture}
                      width={80}
                      alt="Profile"
                      className={style.avatarDefaultSvgrepoCom1Icon}
                      onClick={() => {
                        handleProfilePhotoClick();
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  )}

                  {!profilePicture && (
                    <img
                      className={style.avatarDefaultSvgrepoCom1Icon}
                      alt=""
                      onClick={() => {
                        handleProfilePhotoClick();
                      }}
                      src="/avatardefaultsvgrepocom-1.svg"
                    />
                  )}

                  <input
                    name="profile"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleProfilePictureChange}
                  />

                  <button className={style.addPictureBtn}>
                    <img
                      onClick={() => {
                        handleProfilePhotoClick();
                      }}
                      className={style.addButtonIcon}
                      alt=""
                      src="/add-button.svg"
                    />
                  </button>
                </div>
                <div className="col-sm-6 mt-3">
                  <TextField
                    fullWidth
                    label="Name"
                    name="Name"
                    id="fullWidth"
                    // value={candidateUpdateObj.Name.val}
                    onChange={handleTextFieldChange}
                  />
                </div>
                <div className="col-sm-6 mt-1">
                  {/* <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer components={['DatePicker', 'StaticDatePicker',]}>
                      <DatePicker label="Date" fullWidth id="fullWidth"
                        value={candidateUpdateObj.date.toDate()}
                        onChange={handleDateChange}
                      />
                    </DemoContainer>
                  </LocalizationProvider> */}
                  <TextField
                    fullWidth
                    type="date"
                    label="Date"
                    name="date"
                    id="fullWidth"
                    value={candidateUpdateObj.date}
                    onChange={handleTextFieldChange}
                  />
                </div>
                <div className="col-sm-6 mt-3">
                  <TextField
                    fullWidth
                    label="Your current Location"
                    id="fullWidth"
                    name="CLocation"
                  />
                  {/* <Autocomplete
                    multiple
                    id="tags-outlined"
                    name='states'
                    options={candidateOptions.states.val}
                    getOptionLabel={(option => option)}
                    filterSelectedOptions
                    onChange={(event, value) => {
                      updatestate(value);
                      // console.log(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="known Languages"
                        placeholder="Ex.English"
                      />
                    )}
                  /> */}
                </div>
                <div className="col-sm-6 mt-1">
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                        name="gender"
                        onChange={(e) => {
                          handleRadioBtn(e);
                        }}
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                        name="gender"
                        onChange={(e) => {
                          handleRadioBtn(e);
                        }}
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                        name="gender"
                        onChange={(e) => {
                          handleRadioBtn(e);
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="col-sm-6">
                  <Autocomplete
                    disablePortal
                    name="eduQualification"
                    options={[
                      "Below 10th",
                      "10th Pass and Above",
                      "Diploma",
                      "ITI",
                      "UG",
                      "PG",
                    ]}
                    onChange={(e, value) => {
                      handleEducationInput(e, value);
                      handleUserInput("eduQualification", value);
                    }}
                    value={candidateUpdateObj.eduQualification.val}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="experienceYear"
                        color="primary"
                        label={translate.educationQualfication[Lang]}
                        variant="outlined"
                        placeholder="e.g., Diploma"
                        // error={candidateUpdateObj.eduQualification.err}
                        helperText=""
                        fullWidth
                      />
                    )}
                    size="medium"
                    fullWidth
                  />
                </div>
                <div className="col-sm-6">
                  {candidateUpdateObj.department.show && (
                    <Autocomplete
                      disablePortal
                      options={candidateUpdateObj.departmentOptions.val.map(
                        (el) => el.courses
                      )}
                      name="department"
                      onChange={(e, val) => {
                        handleUserInput("department", val);
                      }}
                      value={candidateUpdateObj.department.val}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="department"
                          color="primary"
                          label={translate.department[Lang]}
                          variant="outlined"
                          placeholder="e.g., Diploma "
                          // error={candidateUpdateObj.department.err}
                          helperText=""
                          fullWidth
                        />
                      )}
                      size="medium"
                      fullWidth
                    />
                  )}
                </div>
                <div className="col-sm-6 mt-3">
                  {candidateUpdateObj.completeYear.show && (
                    <TextField
                      fullWidth
                      label="Compeletion Year"
                      name="completeYear"
                      id="fullWidth"
                      type="number"
                    />
                  )}
                </div>
                <div className="col-sm-6 mt-1">
                  <FormControl>
                    <label id="demo-row-radio-buttons-group-label">
                      Are you a student ?
                    </label>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                        name="Student"
                        aria-label="female"
                      >
                        Yes
                      </FormControlLabel>
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                        name="Student"
                        aria-label="male"
                      >
                        No
                      </FormControlLabel>
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="col-sm-6 mt-1">
                  <FormControl>
                    <label id="demo-row-radio-buttons-group-label ">
                      Do you have any arrears?
                    </label>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                        name="Student"
                        aria-label="female"
                      >
                        Yes
                      </FormControlLabel>
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                        name="Student"
                        aria-label="male"
                      >
                        No
                      </FormControlLabel>
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="col-sm-6 mt-1">
                  <FormControl>
                    <label id="demo-row-radio-buttons-group-label">
                      Do you already have a PF/ESI account?
                    </label>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                        name="Student"
                        aria-label="female"
                      >
                        Yes
                      </FormControlLabel>
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                        name="Student"
                        aria-label="male"
                      >
                        No
                      </FormControlLabel>
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="col-sm-6 mt-3">
                  {/* <TextField fullWidth label=" " id="fullWidth" /> */}
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={candidateOptions.Language.val.map(
                      (option) => option.languages
                    )}
                    name="Language"
                    getOptionLabel={(option) => option}
                    // defaultValue={[LanguageKonwn[0]]}
                    filterSelectedOptions
                    onChange={(event, value) => {
                      updateLanguage(value);
                      // console.log(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="known Languages"
                        placeholder="Ex.English"
                      />
                    )}
                  />
                </div>
                <div className="col-sm-6 mt-3">
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    name="skills"
                    options={candidateOptions.skills.val.map(
                      (option) => option.skill
                    )}
                    getOptionLabel={(option) => option}
                    // defaultValue={[LanguageKonwn[1]]}
                    filterSelectedOptions
                    onChange={(event, value) => {
                      updateSkills(value);
                      // console.log(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Key Skills"
                        placeholder=""
                      />
                    )}
                  />
                </div>
                <div className="col-sm-6 mt-3">
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    name="courses"
                    options={candidateOptions.courses.val.map(
                      (option) => option.courses
                    )}
                    getOptionLabel={(option) => option}
                    filterSelectedOptions
                    onChange={(event, value) => {
                      updateCourses(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=" Certification Course (Optional)"
                        placeholder=""
                      />
                    )}
                  />
                </div>
                <div className="col-sm-6 mt-1">
                  <FormControl>
                    <label id="demo-row-radio-buttons-group-label">
                      Do you have experience working in a manufacturing unit?
                    </label>
                    <div>
                      <Button
                        value="female"
                        className="border border-2 border-outline-black me-2"
                        aria-label="female"
                      >
                        Yes
                      </Button>
                      <Button
                        value="male"
                        className="border border-2 border-outline-black me-2"
                        aria-label="male"
                      >
                        No
                      </Button>
                    </div>
                  </FormControl>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6 mt-5">
                  <TextField
                    fullWidth
                    label="which job role you are interested in"
                    id="fullWidth"
                  />
                </div>
                <div className="col-sm-6">
                  <label>
                    How many years of experience do you have as a VMC Operator
                    cum Setter cum Programmer ?
                  </label>
                  <div className="row">
                    <div className="col-sm-3">
                      <TextField
                        // onChange={(e) => handleExperienceChange(e)}
                        name="minimum"
                        fullWidth
                        id="fullWidth"
                        select
                        label="Year(s) "
                      >
                        {salary.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className="col-sm-3">
                      <TextField
                        // onChange={(e) => handleExperienceChange(e)}
                        name="maximum"
                        fullWidth
                        id="fullWidth"
                        select
                        label="Month(s) "
                      >
                        {salary.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6 ">
                  <TextField
                    fullWidth
                    label="Select Preferred job location(s)"
                    name="PLocation"
                    id="fullWidth"
                  />
                </div>
                <div className="col-sm-6">
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    name="reference"
                    options={candidateOptions.reference.val}
                    getOptionLabel={(option) => option}
                    // onChange={(e, value) => {
                    //   updatereference("referrence", value);
                    // }}
                    // value={candidateOptions.reference.val}
                    filterSelectedOptions
                    onChange={(event, value) => {
                      updatereference(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="How did you hear about Taizo jobs app"
                        placeholder=""
                      />
                    )}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6 ">
                  <TextField
                    fullWidth
                    label="Whatsapp Number"
                    id="fullWidth"
                    type="number"
                    name="WNumber"
                  />
                </div>
                <div className="col-sm-6 ">
                  <TextField
                    fullWidth
                    label="Mobile Number"
                    id="fullWidth"
                    type="number"
                    name="MNumber"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center mt-5 mb-3">
                <button type="submit" className="btn btn-success">
                  Update
                </button>
              </div>
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
}
export default CandidateUpdate;
const LanguageKonwn = [
  { Language: "தமிழ்" },
  { Language: "English" },
  { Language: "हिन्दी " },
  { Language: "ಕನ್ನಡ  " },
  { Language: "മലയാളം " },
  { Language: "తెలుగు " },
  { Language: "ગુજરાતી " },
  { Language: "ଓଡ଼ିଆ " },
  { Language: "मराठी" },
  { Language: "ਪੰਜਾਬੀ" },
  { Language: "বাংলা" },
  { Language: "اردو " },
  { Language: "भोजपुरी" },
  { Language: "كٲشُر" },
];
