/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  InputAdornment,
  TextField,
  Icon,
  IconButton,
  Stack,
} from "@mui/material";
import Button from "@mui/material/Button";
import { MyModal, capitalizeWord } from "../../utility";
import ModalContainer from "../../components/modal_popup";
import styles from "./CandidateEvaluationSummaryF.module.css";
import closetick from "../../assets/images/core-skill-set-matching-jd-done-ic.svg";
import closeround from "../../assets/images/closeroundicon-1.svg";
import taizologo from "../../assets/images/taizo-logonavbar.svg";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {
  GetMidSeniorReport,
  postMidSeniorReportGeneration,
  GetDownloadReport,
} from "../../apiServices";
import style from "./BasicReport.module.css";
import { LoadingButton } from "@mui/lab";
import SuccessTick from "../../components/success_tick";
import { IoClose } from "react-icons/io5";

const CandidateEvaluationSummaryF = ({ candidate, close }) => {
  const [candidateData, setCandidateData] = useState([]);
  const [candidates, setCandidates] = useState("");
  const [coreSkillSetTexts, setCoreSkillSetTexts] = useState([]);
  const [inputText, setInputText] = useState("");
  const [certifications, setCertifications] = useState([]);
  const [certificationInput, setCertificationInput] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [age, setAge] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [previousDesignation, setPreviousDesignation] = useState("");
  const [qualificetion, setqualificetion] = useState("");
  const [certificationsfield, setCertificationsfield] = useState([]);
  const [skills, setSkills] = useState("");
  const [taizosSuggestion, setTaizosSuggestion] = useState("");
  const [taizoScore, setTaizoScore] = useState("");
  const [errors, setErrors] = useState({});
  const [downloadStatus, setDownloadStatus] = useState("Download");
  const [showSuccess, setShowSuccess] = useState(false);
  const [downloadshow, setDownloadshow] = useState(false);
  let doc_Loction = window.location.href;
  let urlStatus = new URL(doc_Loction);
  let mobileNumber = urlStatus.searchParams.get("mobileNumber");
  const candidateId = candidate;
  const handleCertificationAddition = () => {
    if (certificationInput.trim() !== "") {
      setCertifications((prevCertifications) => [
        ...prevCertifications,
        certificationInput,
      ]);
      setCertificationInput("");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!candidates) {
      newErrors.candidates = "Title is required";
    }
    if (!candidateName.trim()) {
      newErrors.candidateName = "Candidate Name is required";
    }
    if (!age) {
      newErrors.age = "Age is required";
    } else if (isNaN(age) || +age <= 0 || !/^\d+$/.test(age)) {
      newErrors.age = "Please enter a valid age";
    }

    if (!lookingFor.trim()) {
      newErrors.lookingFor = "looking For is required";
    }
    if (!yearsOfExperience) {
      newErrors.yearsOfExperience = "Years of Experience is required";
    } else if (!/^\d+$/.test(yearsOfExperience)) {
      newErrors.yearsOfExperience = "Please enter a valid Year Of Experience";
    }
    if (!previousDesignation.trim()) {
      newErrors.previousDesignation = "previous Designation is required";
    }
    if (!qualificetion.trim()) {
      newErrors.qualificetion = "Qualification is required";
    }
    if (!inputText.trim() && coreSkillSetTexts.length === 0) {
      newErrors.inputText = "Core skill set matching JD is required";
    }
    if (!skills.trim()) {
      newErrors.skills = "Skills is required";
    }
    // if (!certificationInput.trim() && certifications.length === 0) {
    //   newErrors.certificationInput = "Certifications are required";
    // }
    if (!taizosSuggestion.trim()) {
      newErrors.taizosSuggestion = "Taizo suggestion is required";
    }
    if (!taizoScore) {
      newErrors.taizoScore = "Taizo score is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Collect form data
      const formData = {
        candidates,
        // candidateName,
        candidateName: capitalizeWord(candidateName),
        age,
        lookingFor: capitalizeWord(lookingFor),
        yearsOfExperience,
        previousDesignation: capitalizeWord(previousDesignation),
        certificationsfield: capitalizeWord(certificationsfield),
        qualification: capitalizeWord(qualificetion),
        // skills: coreSkillSetTexts,
        skills: capitalizeWord(skills),
        taizosSuggestion,
        taizoScore,
        // certifications: certifications.join(","),
        // coreSkillSetMatchingJd: coreSkillSetTexts.join(","),
        certifications: capitalizeWord(certifications.join(",")),
        coreSkillSetMatchingJd: capitalizeWord(coreSkillSetTexts.join(",")),
      };
      setShowSuccess(true);
      // Call the API to post the data
      await postMidSeniorReportGeneration(formData, candidate);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);

      // setDownloadshow(true);
      close();
      // Optionally, you can handle success or navigate to another page
    } catch (error) {
      // Handle error (display an error message or log it)
      console.error("Error submitting form:", error);
    }
  };

  const handleCertificationRemoval = (index) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
  };

  const handleTextAddition = () => {
    if (inputText.trim() !== "") {
      setCoreSkillSetTexts((prevTexts) => [...prevTexts, inputText]);
      setInputText("");
    }
  };

  const handleTextRemoval = (index) => {
    const updatedTexts = coreSkillSetTexts.filter((_, i) => i !== index);
    setCoreSkillSetTexts(updatedTexts);
  };

  // const handleDownload = async () => {
  //   setDownloadStatus("Downloading...");

  //   try {
  //     // Call the API to download the report
  //     const reportData = await GetDownloadReport();

  //     // Assuming 'reportData' contains the PDF content
  //     const pdfContent = reportData; // Adjust this based on the actual structure of your reportData

  //     // Convert the PDF content to a Blob
  //     const pdfBlob = new Blob([pdfContent], { type: "application/pdf" });

  //     // Create a download link
  //     const downloadLink = document.createElement("a");
  //     downloadLink.href = URL.createObjectURL(pdfBlob);
  //     downloadLink.download = "example.pdf"; // Set the desired filename

  //     // Append the link to the body and trigger the click event
  //     document.body.appendChild(downloadLink);
  //     downloadLink.click();

  //     // Remove the link from the body
  //     document.body.removeChild(downloadLink);

  //     setDownloadStatus("Downloaded");
  //   } catch (error) {
  //     console.error("Error downloading report:", error);
  //     // Handle the error (display an error message or log it)
  //     setDownloadStatus("Failed to Download");
  //   }
  // };

  const fetchData = async (candidateId) => {
    try {
      const reportData = await GetMidSeniorReport(candidateId).then(
        (response) => {
          const candidateReports = response.MidSeniorCandidateReport[0];
          console.log(
            response,
            "dataaaa----------------------------------------------"
          );
          setCandidates(candidateReports.titles);
          // setCandidates(candidateReports.candidates || "");
          setCandidateName(candidateReports.candidateName);
          setAge(candidateReports.age);
          setLookingFor(candidateReports.lookingFor);
          setYearsOfExperience(candidateReports.yearsOfExperience);
          setPreviousDesignation(candidateReports.previousDesignation);
          setqualificetion(candidateReports.qualification);
          setSkills(candidateReports.skills);
          setTaizosSuggestion(candidateReports.taizoSuggestion);
          setTaizoScore(candidateReports.taizoScore);
          setCertificationInput("");
          setInputText("");
          setCertifications(candidateReports.certifications.split(","));
          setCoreSkillSetTexts(
            candidateReports.coreSkillSetMatchingJd.split(",")
          );
        }
      );

      console.log(candidateData, "mappedData");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData(candidateId);
  }, []);

  useEffect(() => {
    if (candidateData.length > 0) {
      const firstReport = candidateData[0];
    }
  }, [candidateData]);

  return (
    <MyModal>
      <ModalContainer
        childComponent={
          <>
            <div
              className={styles.controllwidth}
              // style={{ width: "1200px" }}
            >
              <div className={styles.candidateEvaluationSummaryF}>
                <div className={styles.headerNavBar}>
                  <img
                    className={styles.taizoLogoNavbarIcon}
                    alt=""
                    src={taizologo}
                  />
                  <button className="btn btn-danger" onClick={() => close()}>
                    <IoClose />
                  </button>
                </div>
                <div className={styles.form}>
                  <div className={styles.formDiv1}>
                    <b className={styles.candidateEvaluationSummary}>
                      Candidate Evaluation Summary
                    </b>
                    <div className={styles.formDiv2}>
                      <div className={styles.formDiv3InputFields}>
                        <div className={styles.candidateNameAge}>
                          <div className={styles.candidateName}>
                            <div className={styles.coreSkillSet}>
                              Candidate Name
                            </div>
                            <div className={styles.candidateName2}>
                              <FormControl
                                className={styles.parent}
                                variant="outlined"
                                sx={{
                                  borderRadius: "0px 0px 0px 0px",
                                  width: "104px",
                                  height: "38px",
                                  m: 0,
                                  p: 0,
                                  "& .MuiInputBase-root": {
                                    m: 0,
                                    p: "10px",
                                    minHeight: "38px",
                                    justifyContent: "center",
                                    display: "inline-flex",
                                  },
                                  "& .MuiInputLabel-root": {
                                    m: 0,
                                    p: 0,
                                    minHeight: "38px",
                                    display: "inline-flex",
                                  },
                                  "& .MuiMenuItem-root": {
                                    m: 0,
                                    p: 0,
                                    height: "38px",
                                    display: "inline-flex",
                                  },
                                  "& .MuiSelect-select": {
                                    m: 0,
                                    p: 0,
                                    height: "38px",
                                    alignItems: "center",
                                    display: "inline-flex",
                                  },
                                  "& .MuiInput-input": { m: 0, p: 0 },
                                  "& .MuiInputBase-input": {
                                    textAlign: "left",
                                    p: "0 !important",
                                  },
                                }}
                              >
                                <InputLabel color="success" />
                                <Select
                                  color="success"
                                  disableUnderline
                                  displayEmpty
                                  // onChange={(e) => setCandidates(e.target.value)}
                                  onChange={(e) => {
                                    setCandidates(e.target.value);
                                    setErrors((prevErrors) => ({
                                      ...prevErrors,
                                      candidates: "",
                                    }));
                                  }}
                                  // onBlur={validateForm}
                                  error={Boolean(errors.candidates)}
                                  helperText={errors.candidates}
                                  value={candidates}
                                >
                                  <MenuItem value="Mr">Mr</MenuItem>
                                  <MenuItem value="Miss">Miss</MenuItem>
                                  <MenuItem value="Mrs">Mrs</MenuItem>
                                  <MenuItem value="Ms">Ms</MenuItem>
                                </Select>
                                <FormHelperText />
                              </FormControl>
                              <TextField
                                className={styles.candidateName3}
                                color="success"
                                placeholder="Enter candidate name"
                                variant="outlined"
                                value={candidateName}
                                error={Boolean(errors.candidateName)}
                                helperText={errors.candidateName}
                                onChange={(e) => {
                                  setCandidateName(e.target.value);
                                  setErrors((prevErrors) => ({
                                    ...prevErrors,
                                    candidateName: "",
                                  }));
                                }}
                                sx={{
                                  "& .MuiInputBase-root": { height: "38px" },
                                }}
                              />
                            </div>
                          </div>
                          <div className={styles.candidateName}>
                            <div className={styles.coreSkillSet}>Age</div>
                            <div className={styles.age2}>
                              <TextField
                                className={styles.candidateName3}
                                color="success"
                                placeholder="00"
                                variant="outlined"
                                type="text"
                                value={age}
                                onChange={(e) => {
                                  setAge(e.target.value);
                                  setErrors((prevErrors) => ({
                                    ...prevErrors,
                                    age: "", // Clear the error when the user starts typing
                                  }));
                                }}
                                // onBlur={validateForm}
                                error={Boolean(errors.age)}
                                helperText={errors.age}
                                sx={{
                                  "& .MuiInputBase-root": { height: "38px" },
                                }}
                              />
                              <div className={styles.years}>Years</div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.candidateNameAge}>
                          <div className={styles.candidateName}>
                            <div className={styles.coreSkillSet}>
                              Looking for?
                            </div>
                            <TextField
                              className={styles.lookingFor2}
                              color="success"
                              placeholder="Looking for?"
                              variant="outlined"
                              type="text"
                              value={lookingFor}
                              onChange={(e) => {
                                setLookingFor(e.target.value);
                                setErrors((prevErrors) => ({
                                  ...prevErrors,
                                  lookingFor: "",
                                }));
                              }}
                              // onBlur={validateForm}
                              error={Boolean(errors.lookingFor)}
                              helperText={errors.lookingFor}
                              sx={{
                                "& .MuiInputBase-root": { height: "38px" },
                              }}
                            />
                          </div>
                          <div className={styles.candidateName}>
                            <div className={styles.coreSkillSet}>
                              Years of Experience
                            </div>
                            <div className={styles.age2}>
                              <TextField
                                className={styles.candidateName3}
                                color="success"
                                placeholder="00"
                                variant="outlined"
                                type="text"
                                value={yearsOfExperience}
                                // onChange={(e) => setYearsOfExperience(e.target.value)}
                                onChange={(e) => {
                                  setYearsOfExperience(e.target.value);
                                  setErrors((prevErrors) => ({
                                    ...prevErrors,
                                    yearsOfExperience: "",
                                  }));
                                }}
                                // onBlur={validateForm}
                                error={Boolean(errors.yearsOfExperience)}
                                helperText={errors.yearsOfExperience}
                                sx={{
                                  "& .MuiInputBase-root": { height: "38px" },
                                }}
                              />
                              <div className={styles.years}>Years</div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.candidateNameAge}>
                          <div className={styles.candidateName}>
                            <div className={styles.coreSkillSet}>
                              Previous Designation
                            </div>
                            <TextField
                              className={styles.lookingFor2}
                              color="success"
                              placeholder="Enter Previous Designation"
                              variant="outlined"
                              type="text"
                              value={previousDesignation}
                              // onChange={(e) => setPreviousDesignation(e.target.value)}
                              onChange={(e) => {
                                setPreviousDesignation(e.target.value);
                                setErrors((prevErrors) => ({
                                  ...prevErrors,
                                  previousDesignation: "",
                                }));
                              }}
                              // onBlur={validateForm}
                              error={Boolean(errors.previousDesignation)}
                              helperText={errors.previousDesignation}
                              sx={{
                                "& .MuiInputBase-root": { height: "38px" },
                              }}
                            />
                          </div>
                          <div className={styles.candidateName}>
                            <div className={styles.coreSkillSet}>
                              Qualification
                            </div>
                            <TextField
                              className={styles.lookingFor2}
                              color="success"
                              placeholder="Enter Qualification"
                              variant="outlined"
                              type="text"
                              value={qualificetion}
                              // onChange={(e) => setqualificetion(e.target.value)}
                              onChange={(e) => {
                                setqualificetion(e.target.value);
                                setErrors((prevErrors) => ({
                                  ...prevErrors,
                                  qualificetion: "",
                                }));
                              }}
                              // onBlur={validateForm}
                              error={Boolean(errors.qualificetion)}
                              helperText={errors.qualificetion}
                              sx={{
                                "& .MuiInputBase-root": {
                                  height: "38px",
                                  width: "500px",
                                },
                              }}
                            />
                          </div>
                        </div>
                        <div className={styles.coreSkillSetMatchingJd}>
                          <div className={styles.coreSkillSet}>
                            Core skill set matching JD
                          </div>
                          <div className={styles.coreSkillSetMatchingJd1}>
                            <div className={styles.coreSkillSetMatchingJd2}>
                              <TextField
                                className={styles.lookingFor2}
                                color="success"
                                placeholder="Enter Core skill set matching JD"
                                variant="outlined"
                                type="text"
                                value={inputText}
                                onChange={(e) => {
                                  setInputText(e.target.value);
                                  setErrors((prevErrors) => ({
                                    ...prevErrors,
                                    inputText: "",
                                  }));
                                }}
                                // onBlur={() => {}}
                                error={Boolean(errors.inputText)}
                                helperText={errors.inputText}
                                sx={{
                                  "& .MuiInputBase-root": { height: "38px" },
                                }}
                              />
                              <div className={styles.coreSkillSetMatchingJdTex}>
                                {coreSkillSetTexts.map((coreSkill, index) => (
                                  <div
                                    key={index}
                                    className={
                                      styles.coreSkillSetMatchingJdTex1
                                    }
                                  >
                                    <div className={styles.coreSkillSet1}>
                                      {coreSkill}
                                    </div>
                                    <img
                                      className={styles.closeRoundIcon1}
                                      alt=""
                                      src={closeround}
                                      onClick={() => handleTextRemoval(index)}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                            <button
                              className={styles.coreSkillSetMatchingJdDon}
                              onClick={handleTextAddition}
                            >
                              <div className={styles.frameChild} />
                              <img
                                className={styles.vectorIcon}
                                alt=""
                                src={closetick}
                              />
                            </button>
                          </div>
                        </div>
                        <div className={styles.coreSkillSetMatchingJd}>
                          <div className={styles.coreSkillSet}>Skills</div>
                          <TextField
                            className={styles.lookingFor2}
                            color="primary"
                            placeholder="Enter Skills"
                            variant="outlined"
                            type="text"
                            value={skills}
                            // onChange={(e) => setSkills(e.target.value)}
                            onChange={(e) => {
                              setSkills(e.target.value);
                              setErrors((prevErrors) => ({
                                ...prevErrors,
                                skills: "",
                              }));
                            }}
                            // onBlur={validateForm}
                            error={Boolean(errors.skills)}
                            helperText={errors.skills}
                            sx={{
                              "& .MuiInputBase-root": {
                                height: "38px",
                                width: "1080px",
                              },
                            }}
                          />
                        </div>
                        <div className={styles.coreSkillSetMatchingJd}>
                          <div className={styles.coreSkillSet}>
                            Certifications
                          </div>
                          <div className={styles.coreSkillSetMatchingJd1}>
                            <div className={styles.coreSkillSetMatchingJd2}>
                              <TextField
                                className={styles.lookingFor2}
                                color="success"
                                placeholder="Enter certifications details"
                                variant="outlined"
                                type="text"
                                value={certificationInput}
                                onChange={(e) => {
                                  setCertificationInput(e.target.value);
                                  setErrors((prevErrors) => ({
                                    ...prevErrors,
                                    certificationInput: "",
                                  }));
                                }}
                                // onBlur={validateForm}
                                error={Boolean(errors.certificationInput)}
                                helperText={errors.certificationInput}
                                sx={{
                                  "& .MuiInputBase-root": { height: "38px" },
                                }}
                              />
                              <div className={styles.coreSkillSetMatchingJdTex}>
                                {certifications.map((certification, index) => (
                                  <div
                                    key={index}
                                    className={
                                      styles.coreSkillSetMatchingJdTex1
                                    }
                                  >
                                    <div className={styles.coreSkillSet1}>
                                      {certification}
                                    </div>
                                    <img
                                      className={styles.closeRoundIcon1}
                                      alt=""
                                      src={closeround}
                                      onClick={() =>
                                        handleCertificationRemoval(index)
                                      }
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                            <button
                              className={styles.coreSkillSetMatchingJdDon}
                              onClick={handleCertificationAddition}
                            >
                              <div className={styles.frameChild} />
                              <img
                                className={styles.vectorIcon}
                                alt=""
                                src={closetick}
                              />
                            </button>
                          </div>
                        </div>
                        <div className={styles.coreSkillSetMatchingJd}>
                          <div className={styles.coreSkillSet}>
                            Taizo’s suggestion
                          </div>
                          <TextField
                            className={styles.taizosSuggestion2}
                            color="success"
                            rows={3}
                            placeholder="Enter Taizo's suggestion"
                            variant="outlined"
                            value={taizosSuggestion}
                            // onChange={(e) => setTaizosSuggestion(e.target.value)}
                            onChange={(e) => {
                              setTaizosSuggestion(e.target.value);
                              setErrors((prevErrors) => ({
                                ...prevErrors,
                                taizosSuggestion: "",
                              }));
                            }}
                            // onBlur={validateForm}
                            error={Boolean(errors.taizosSuggestion)}
                            helperText={errors.taizosSuggestion}
                            sx={{
                              "& .MuiInputBase-root": {
                                height: "100px",
                                width: "1100px",
                              },
                            }}
                            multiline
                          />
                        </div>
                        <div className={styles.taizoScore}>
                          <div className={styles.coreSkillSet}>Taizo score</div>
                          <FormControl
                            className={styles.taizosSuggestion2}
                            variant="outlined"
                            sx={{
                              borderRadius: "0px 0px 0px 0px",
                              width: "387px",
                              height: "38px",
                              m: 0,
                              p: 0,
                              "& .MuiInputBase-root": {
                                m: 0,
                                p: "10px",
                                minHeight: "38px",
                                justifyContent: "center",
                                display: "inline-flex",
                              },
                              "& .MuiInputLabel-root": {
                                m: 0,
                                p: 0,
                                minHeight: "38px",
                                display: "inline-flex",
                              },
                              "& .MuiMenuItem-root": {
                                m: 0,
                                p: 0,
                                height: "38px",
                                display: "inline-flex",
                              },
                              "& .MuiSelect-select": {
                                m: 0,
                                p: 0,
                                height: "38px",
                                alignItems: "center",
                                display: "inline-flex",
                              },
                              "& .MuiInput-input": { m: 0, p: 0 },
                              "& .MuiInputBase-input": {
                                textAlign: "left",
                                p: "0 !important",
                              },
                            }}
                          >
                            <InputLabel color="success" />
                            <Select
                              color="success"
                              disableUnderline
                              displayEmpty
                              value={taizoScore}
                              // onChange={(e) => setTaizoScore(e.target.value)}
                              onChange={(e) => {
                                setTaizoScore(e.target.value);
                                setErrors((prevErrors) => ({
                                  ...prevErrors,
                                  taizoScore: "",
                                }));
                              }}
                              // onBlur={validateForm}
                              error={Boolean(errors.taizoScore)}
                              helperText={errors.taizoScore}
                            >
                              <MenuItem value="0.5">0.5</MenuItem>
                              <MenuItem value="1">1</MenuItem>
                              <MenuItem value="1.5">1.5</MenuItem>
                              <MenuItem value="2">2</MenuItem>
                              <MenuItem value="2.5">2.5</MenuItem>
                              <MenuItem value="3">3</MenuItem>
                              <MenuItem value="3.5">3.5</MenuItem>
                              <MenuItem value="4">4</MenuItem>
                              <MenuItem value="4.5">4.5</MenuItem>
                              <MenuItem value="5">5</MenuItem>
                              <MenuItem value="5.5">5.5</MenuItem>
                              <MenuItem value="6">6</MenuItem>
                              <MenuItem value="6.5">6.5</MenuItem>
                              <MenuItem value="7">7</MenuItem>
                              <MenuItem value="7.5">7.5</MenuItem>
                              <MenuItem value="8">8</MenuItem>
                              <MenuItem value="8.5">8.5</MenuItem>
                              <MenuItem value="9">9</MenuItem>
                              <MenuItem value="9.5">9.5</MenuItem>
                              <MenuItem value="10">10</MenuItem>
                            </Select>
                            <FormHelperText />
                          </FormControl>
                        </div>
                      </div>
                      <button
                        className={styles.generateReport}
                        onClick={(e) => handleSubmit(e, candidate)}
                      >
                        <div className={styles.generateReport1}>
                          <div className={styles.generateSummary}>
                            Generate Summary
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                {/* {formData.showPopup && ( */}
                {/* {downloadshow && (
                  <MyModal>
                    <ModalContainer
                      zIndex={1001}
                      childComponent={
                        <>
                          <p className="text-center mb-2 ">
                            Are You Sure You Want To Download
                          </p>
                          <div className="d-flex justify-content-end">
                            <Button variant="outlined">CLOSE</Button>
                            <Button
                              variant="contained"
                              color="success"
                              className="ms-2"
                              startIcon={<CloudDownloadIcon />}
                              onClick={handleDownload}
                            >
                              {downloadStatus}
                            </Button>
                          </div>
                        </>
                      }
                    ></ModalContainer>
                  </MyModal>
                )} */}
                {showSuccess && (
                  <MyModal>
                    <ModalContainer
                      zIndex={2000}
                      childComponent={<SuccessTick HeadText="Successfully" />}
                    />
                  </MyModal>
                )}
                {/* )} */}
              </div>
            </div>
          </>
        }
      />
    </MyModal>
  );
};

export default CandidateEvaluationSummaryF;
