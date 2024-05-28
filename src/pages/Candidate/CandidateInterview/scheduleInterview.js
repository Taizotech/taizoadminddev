/* eslint-disable eqeqeq */
/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import { Stack, TextField, FormControl, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ModalContainer from "../../../components/modal_popup";
import {
  MyModal,
  dMMMYYYY_formate,
  dateFormate,
  numbersOnlyTest,
} from "../../../utility";
import { postInterview_schedule } from "../../../apiServices";
import "dayjs/locale/en-gb";
import { SlCalender } from "react-icons/sl";
import { CandidatePipelineActions } from "../../../redux-store/store";
import { useDispatch } from "react-redux";
export default function ScheduleInterview({
  candidateId,
  relationName,
  relationType,
  relationNumber,
}) {
  // console.log(showCandidateName);
  const [formData, setFormData] = useState({
    candidateId: candidateId,
    jobId: "",
    candidatePercentage: "",
    EmeregncyContactNumber: relationNumber,
    RelationshipName: relationName,
    Relationship: relationType,
    date: null,
    showPopup: false,
    showWhatsApp: false,
    message: "",
    whatsappnumber: "",
  });

  const [errors, setErrors] = useState({
    candidateId: "",
    candidatePercentage: "",
    Relationship: "",
    RelationshipName: "",
    EmeregncyContactNumber: "",
    jobId: "",
    date: "",
  });
  const [alertschedule, setAlertSchedule] = useState(false);
  const showCandidateId = candidateId != null;
  const Dispatch = useDispatch();
  const validateForm = () => {
    const newErrors = {};
    if (!formData.candidateId) {
      newErrors.candidateId = "Candidate ID is required";
    }
    if (!formData.jobId) {
      newErrors.jobId = "Job ID is required";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.candidatePercentage) {
      newErrors.candidatePercentage = "Candidate Percentage is required";
    }

    if (!formData.EmeregncyContactNumber) {
      newErrors.EmeregncyContactNumber = "Number is required";
    }

    if (!formData.Relationship) {
      newErrors.Relationship = "Relationship is required";
    }

    if (!formData.RelationshipName) {
      newErrors.RelationshipName = "RelationshipName is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  function handleFieldChange(field, value) {
    console.log(numbersOnlyTest(value));
    switch (field) {
      case "candidateId":
        if (numbersOnlyTest(value)) {
          setFormData((prev) => ({ ...prev, [field]: value }));
          // setErrors((prev) => ({ ...prev, date: "" }));
        }
        break;
      case "jobId":
        if (numbersOnlyTest(value)) {
          setFormData((prev) => ({ ...prev, [field]: value }));
          setErrors((prev) => ({ ...prev, jobId: "" }));
        } else {
          setErrors((prev) => ({
            ...prev,
            jobId: "Please enter valid job Id",
          }));
        }
        break;
      case "date":
        const formattedDate = dateFormate(value.$d);
        setFormData((prev) => ({ ...prev, [field]: formattedDate }));

        setErrors((prev) => ({ ...prev, date: "" }));
        break;
      case "candidatePercentage":
        setFormData((prev) => ({ ...prev, [field]: value }));

        setErrors((prev) => ({ ...prev, candidatePercentage: "" }));
        break;
      case "EmeregncyContactNumber":
        setFormData((prev) => ({ ...prev, [field]: value }));

        setErrors((prev) => ({ ...prev, EmeregncyContactNumber: "" }));
        break;
      case "Relationship":
        setFormData((prev) => ({ ...prev, [field]: value }));

        setErrors((prev) => ({ ...prev, Relationship: "" }));
        break;
      case "RelationshipName":
        setFormData((prev) => ({ ...prev, [field]: value }));

        setErrors((prev) => ({ ...prev, RelationshipName: "" }));
        break;

      case "whatsappnumber":
        setFormData((prev) => ({ ...prev, [field]: value }));

        setErrors((prev) => ({ ...prev, whatsappnumber: "" }));
        break;
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Submit the form or handle the action
      console.log("Form submitted:", formData);
      setFormData((prev) => ({ ...prev, loading: true }));

      postInterview_schedule(formData)
        .then((res) => {
          if (res.code === 400) {
            // alert("Interview already scheduled");
            setAlertSchedule(true);
            setFormData({ ...formData, loading: false });
            return;
          } else {
            const message = `
Hi *${res.candidateName}*, you have an interview scheduled with *${
              res.company_name
            }*, *${res.area} - ${res.city}* at *8:30 AM*, *${dMMMYYYY_formate(
              res.interview_date
            )}*.

Call *${res.contact_person_name}* at *${
              res.contact_person_number
            }* to confirm the interview before you leave. Do not forget to carry the necessary documents while going to the interview.

All original documents with two sets of Xerox copy
*Bio-data, All Education Certificate, Aadhaar Card, Ration Card, 2 Passport Size Photo, Bank Passbook*

*Company Location Link*: ${res.JobLocationUrl}

Thank you
*Taizo Team*
`;

            const urlEncodedMessage = encodeURIComponent(message);

            setFormData({ ...formData, loading: false });
            setFormData({ ...formData, completed: true });

            setTimeout(() => {
              setFormData({
                candidateId: candidateId,
                jobRole: "",
                date: "",
                Relationship: "",
                candidatePercentage: "",
                EmeregncyContactNumber: "",
                RelationshipName: "",
                showPopup: true,
                completed: false,
                failed: false,
                loading: false,
                showWhatsApp: true,
                message: urlEncodedMessage,
                whatsappnumber: res.candidateWhatsappNUmber,
              });
            }, [1000]);
            // Dispatch(CandidatePipelineActions.setRefreshCount());
          }
        })
        .catch(() => {
          // Handle other errors
          alert("Something went wrong, Please try again later.");
          setFormData({ ...formData, loading: false });
        });
    }
  };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     if (validateForm()) {
  //       // Submit the form or handle the action
  //       console.log("Form submitted:", formData);
  //       setFormData((prev) => ({ ...prev, loading: true }));
  //       postInterview_schedule(formData)
  //         .then((res) => {
  //           const message = `
  // Hi *${res.candidateName}*, you have an interview scheduled with *${
  //             res.company_name
  //           }*, *${res.area} - ${res.city}* at *8:30 AM*, *${dMMMYYYY_formate(
  //             res.interview_date
  //           )}*.

  // Call *${res.contact_person_name}* at *${
  //             res.contact_person_number
  //           }* to confirm the interview before you leave. Do not forget to carry the necessary documents while going to the interview.

  // All original documents with two sets of Xerox copy
  // Bio-data, All Education Certificate, Aadhaar Card, Ration Card, 2 Passport Size Photo, Bank Passbook

  // Thank you
  // *Taizo Team*
  // `;

  //           const urlEncodedMessage = encodeURIComponent(message);

  //           setFormData({ ...formData, loading: false });
  //           setFormData({ ...formData, completed: true });

  //           setTimeout(() => {
  //             setFormData({
  //               candidateId: candidateId,
  //               jobRole: "",
  //               date: "",
  //               Relationship: "",
  //               candidatePercentage: "",
  //               EmeregncyContactNumber: "",
  //               RelationshipName: "",
  //               showPopup: true,
  //               completed: false,
  //               failed: false,
  //               loading: false,
  //               showWhatsApp: true,
  //               message: urlEncodedMessage,
  //               whatsappnumber: res.candidateWhatsappNUmber,
  //             });
  //           }, [1000]);
  //         })

  //         .catch(() => {
  //           alert("Something went wrong, Please try again later.");
  //         });
  //     }
  //   };
  return (
    <div>
      <div>
        <div
          sx={{ mx: "5px" }}
          onClick={(event) =>
            setFormData({
              ...formData,
              showPopup: true,
            })
          }
        >
          Schedule Interview
        </div>
      </div>
      {formData.showPopup && (
        <>
          <MyModal>
            <ModalContainer
              zIndex={1001}
              childComponent={
                <>
                  <h4 className="text-center mb-2">Schedule Interview</h4>
                  <form
                    style={{
                      overflowY: "scroll",
                      maxHeight: "90vh",
                      minWidth: "35vw",
                    }}
                    className="py-4"
                    onSubmit={handleSubmit}
                  >
                    <Stack spacing={2}>
                      {!showCandidateId && (
                        <TextField
                          id="candidateId"
                          label="Candidate ID"
                          name="candidateId"
                          value={formData.candidateId}
                          onChange={(event, value) =>
                            handleFieldChange("candidateId", event.target.value)
                          }
                          error={Boolean(errors.candidateId)}
                          helperText={errors.candidateId}
                          fullWidth
                          required
                          inputProps={{ maxLength: 10 }}
                        />
                      )}
                      <TextField
                        id="jobId"
                        label="Job ID"
                        name="jobId"
                        value={formData.jobId}
                        onChange={(event) =>
                          handleFieldChange("jobId", event.target.value)
                        }
                        error={Boolean(errors.jobId)}
                        helperText={errors.jobId}
                        fullWidth
                        required
                        inputProps={{ maxLength: 6 }}
                      />
                      <FormControl>
                        <LocalizationProvider
                          adapterLocale="en-gb"
                          dateAdapter={AdapterDayjs}
                        >
                          <DatePicker
                            label="Date"
                            value={dayjs(formData.date)}
                            name="date"
                            minDate={dayjs(new Date())}
                            // filterDate={isDateDisabled}
                            onChange={(value) =>
                              handleFieldChange("date", value)
                            }
                            fullWidth
                            required
                            // format="DDMMYYYY"
                            slotProps={{
                              textField: {
                                helperText: errors.date,
                                error: Boolean(errors.date),
                              },
                            }}
                          />
                        </LocalizationProvider>
                      </FormControl>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Joining Possibility
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          // value={age}
                          name="candidatePercentage"
                          label="Joining Possibility"
                          // onChange={handleChange}
                          value={formData.candidatePercentage}
                          onChange={(event) =>
                            handleFieldChange(
                              "candidatePercentage",
                              event.target.value
                            )
                          }
                          required
                          slotProps={{
                            textField: {
                              helperText: errors.candidatePercentage,
                              error: Boolean(errors.candidatePercentage),
                            },
                          }}
                        >
                          {/* <MenuItem value=""></MenuItem> */}
                          <MenuItem value={0}>0%</MenuItem>
                          <MenuItem value={50}>50%</MenuItem>
                          <MenuItem value={100}>100%</MenuItem>
                        </Select>
                        {/* <FormHelperText>With label + helper text</FormHelperText> */}
                      </FormControl>
                      <TextField
                        label="Emeregncy Contact Number"
                        variant="outlined"
                        type="tel"
                        name="mobileNumber"
                        value={formData.EmeregncyContactNumber}
                        onChange={
                          (event) =>
                            handleFieldChange(
                              "EmeregncyContactNumber",
                              event.target.value
                            )
                          //  mobileNumber: numericValue,
                        }
                        // error="Please select "
                        // helperText="Please select your currency"
                        fullWidth
                        required
                        margin="normal"
                        inputProps={{
                          pattern: "[0-9]{10}",
                          maxLength: 10,
                        }}
                      />
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Relationship Type
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={formData.Relationship}
                          label="Relationship Type"
                          required
                          onChange={(event) =>
                            handleFieldChange(
                              "Relationship",
                              event.target.value
                            )
                          }
                        >
                          {/* <MenuItem value=""></MenuItem> */}
                          <MenuItem value={"Father"}>Father</MenuItem>
                          <MenuItem value={"Mother"}>Mother</MenuItem>
                          <MenuItem value={"Brother"}>Brother</MenuItem>
                          <MenuItem value={"Sister"}>Sister</MenuItem>
                          <MenuItem value={"Husband"}>Husband</MenuItem>
                          <MenuItem value={"Wife"}>Wife</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        id="outlined-basic"
                        label="Relation name"
                        value={formData.RelationshipName}
                        variant="outlined"
                        required
                        onChange={(event) =>
                          handleFieldChange(
                            "RelationshipName",
                            event.target.value
                          )
                        }
                      />

                      {formData.message != "" && (
                        <div className="d-flex flex-row gap-3">
                          <TextField
                            id="outlined-basic"
                            label="Whatsapp Number"
                            value={formData.whatsappnumber}
                            variant="outlined"
                            required
                            onChange={(event) =>
                              handleFieldChange(
                                "whatsappnumber",
                                event.target.value
                              )
                            }
                          />
                          <a
                            href={`https://wa.me/+${formData.whatsappnumber}/?text=${formData.message}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white"
                            style={{ textDecoration: "none" }}
                          >
                            <Button
                              color="primary"
                              variant="contained"
                              size="small"
                              onClick={(event) => {
                                setFormData({
                                  ...formData,
                                  showPopup: false,
                                  message: "",
                                });
                                Dispatch(
                                  CandidatePipelineActions.setRefreshCount()
                                );
                              }}
                            >
                              {" "}
                              Interview Alert
                            </Button>{" "}
                          </a>
                        </div>
                      )}

                      <div className="d-flex flex-row gap-5 justify-content-end">
                        <Button
                          color="error"
                          variant="outlined"
                          onClick={(event) => {
                            setFormData({
                              ...formData,
                              candidateId: candidateId,
                              jobId: "",
                              jobRole: "",
                              date: "",
                              Relationship: relationType,
                              candidatePercentage: "",
                              EmeregncyContactNumber: relationNumber,
                              RelationshipName: relationName,
                              showPopup: false,
                            });
                            Dispatch(
                              CandidatePipelineActions.setRefreshCount()
                            );
                          }}
                        >
                          Close
                        </Button>
                        <Button
                          disabled={formData.loading}
                          type="submit"
                          variant="contained"
                          sx={{ minWidth: "150px" }}
                        >
                          {!formData.loading && !formData.completed && "Submit"}

                          {
                            formData.loading && (
                              <div className="spinner-border spinner-border-sm text-light"></div>
                            ) // Add spinner here
                          }

                          {formData.completed && "Submitted"}
                        </Button>
                      </div>
                    </Stack>
                  </form>
                </>
              }
            />
          </MyModal>
          {alertschedule && (
            <MyModal>
              <ModalContainer
                zIndex={20002}
                childComponent={
                  <>
                    <div className="p-1">
                      <div>
                        <p>
                          {`This candidate is already scheduled for an
                          interview with this company`}
                        </p>
                      </div>
                      <div className="d-flex justify-content-end">
                        <div
                          className="btn btn-danger px-4 "
                          onClick={() => setAlertSchedule(false)}
                        >
                          Ok
                        </div>
                        {/* <HiHandThumbUp /> */}
                      </div>
                    </div>
                  </>
                }
              />
            </MyModal>
          )}
        </>
      )}
    </div>
  );
}
