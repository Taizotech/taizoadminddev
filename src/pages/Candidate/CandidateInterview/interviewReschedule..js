/* eslint-disable default-case */
import { Button, TextField } from "@mui/material";
import { MyModal, dateFormate, numbersOnlyTest } from "../../../utility";
import ModalContainer from "../../../components/modal_popup";
import { useState } from "react";

import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PostRescheduleInterviews } from "../../../apiServices";
import SuccessTick from "../../../components/success_tick";

const InterviewReschedule = ({ interviewId, onSuccess, onClose }) => {
  const [rescheduleDetails, setRescheduleDetails] = useState({
    // showPopup: true,
    reScheduledOn: "",
    interviewId: interviewId,
    notes: "",
  });
  const [errors, setErrors] = useState({
    interviewId: "",
    reScheduledOn: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const showCandidateId = interviewId != null;
  const validateForm = () => {
    const newErrors = {};
    if (!rescheduleDetails.interviewId) {
      newErrors.interviewId = "Candidate ID is required";
    }

    if (!rescheduleDetails.reScheduledOn) {
      newErrors.reScheduledOn = "Date is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // useEffect(() => {
  //   showPopup(true);
  // }, []);
  function handleFieldChange(field, value) {
    console.log(numbersOnlyTest(value));
    switch (field) {
      case "interviewId":
        if (numbersOnlyTest(value)) {
          setRescheduleDetails((prev) => ({ ...prev, [field]: value }));
        }
        break;
      case "reScheduledOn":
        setRescheduleDetails((prev) => ({ ...prev, [field]: value }));
        setRescheduleDetails((prev) => ({
          ...prev,
          [field]: dateFormate(value.$d).trim(),
        }));
        setErrors((prev) => ({ ...prev, reScheduledOn: "" }));
        break;
    }
  }
  // useEffect(() => {
  //   showPopup(true);
  // }, [rescheduleDetails]);
  // useEffect(() => {
  //   showPopup(true);
  // }, [rescheduleDetails]);
  const handleSubmit = (event) => {
    event.preventDefault();
    // showPopup(true);
    if (validateForm()) {
      console.log("Form submitted:", rescheduleDetails);
      // setRescheduleDetails((prev) => ({ ...prev, loading: true }));
      PostRescheduleInterviews(rescheduleDetails)
        .then(() => {
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            // showPopup(false);
            setRescheduleDetails({
              // showPopup: false,
              reScheduledOn: "",
              interviewId: interviewId,
              // notes: notes,
              notes: "",
            });
          }, [1000]);

          onSuccess();
          onClose();
          // showPopup(false);
        })

        .catch(() => {
          alert("Something went wrong, Please try again later.");
        });
    }
  };
  return (
    <>
      <div>
        {/* <div className="">
          <span
            // // // className="btn btn-primary"
            onClick={() => {
              showPopup(true);
            }}
            color="primary"
            size="small"
          >
            Reschedule
          </span>
        </div> */}
        <div>
          {rescheduleDetails && (
            <MyModal>
              <ModalContainer
                // zIndex={1001}
                childComponent={
                  <>
                    <div className="d-flex flex-row   ">
                      <h4 className="text-center">Interview Reschedule</h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                      {!showCandidateId && (
                        <TextField
                          id="interviewId"
                          label="Interview ID"
                          name="interviewId"
                          value={rescheduleDetails.interviewId}
                          onChange={(event) =>
                            handleFieldChange("interviewId", event.target.value)
                          }
                          error={Boolean(errors.interviewId)}
                          helperText={errors.interviewId}
                          fullWidth
                          required
                          inputProps={{ maxLength: 10 }}
                        />
                      )}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date"
                          value={rescheduleDetails.reScheduledOn}
                          name="reScheduledOn"
                          onChange={(value) =>
                            handleFieldChange("reScheduledOn", value)
                          }
                          minDate={dayjs(new Date())}
                          fullWidth
                          required
                          slotProps={{
                            textField: {
                              helperText: errors.date,
                              error: Boolean(errors.date),
                            },
                          }}
                        />
                      </LocalizationProvider>

                      <div style={{ marginTop: "16px" }}>
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Add Notes"
                          multiline
                          // error={isNotesEmpty}
                          // helperText={isNotesEmpty ? "Notes cannot be empty" : ""}
                          // required
                          onChange={(event) => {
                            setRescheduleDetails((prev) => ({
                              ...prev,
                              notes: event.target.value,
                            }));
                            // setIsNotesEmpty(false);
                          }}
                          maxRows={4}
                          fullWidth
                        />
                      </div>

                      <div className="mt-3 d-flex justify-content-end gap-2 flex-wrap align-items-center ">
                        <Button
                          onClick={() => {
                            onClose();
                          }}
                          variant="outlined"
                          color="error"
                          size="small"
                        >
                          Close
                        </Button>
                        <Button type="submit" variant="contained" size="small">
                          Reschedule
                        </Button>
                      </div>
                    </form>
                  </>
                }
              />
            </MyModal>
          )}

          {showSuccess && (
            <MyModal>
              <ModalContainer
                childComponent={<SuccessTick HeadText="Successfully" />}
              />
            </MyModal>
          )}
        </div>
      </div>
    </>
  );
};

export default InterviewReschedule;
