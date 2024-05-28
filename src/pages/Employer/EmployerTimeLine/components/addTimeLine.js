/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import {
  GetEmpTimelineEvents,
  PostEmployerTimeLine,
} from "../../../../apiServices";
import { Card, CardContent, CircularProgress } from "@mui/material";
import { green } from "@mui/material/colors";

export default function EmployerAddTimeLineForm({ empId, onSuccess }) {
  const [formData, setFormData] = useState({
    empId: empId,
    eventType: "",
    notes: "",
  });

  const [showForm, setShowForm] = useState(false);

  const [eventOptions, setEventOptions] = useState([]);

  function GetTimelineEvents() {
    GetEmpTimelineEvents(true).then((data) => {
      setEventOptions(data);
    });
  }

  useEffect(() => {
    GetTimelineEvents();
  }, []);

  const [responseDetails, setResponseDetails] = useState({
    isLoading: false,
    completed: false,
    failed: false,
  });

  const buttonSx = {
    ...(responseDetails.completed && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  function handleClose() {
    setResponseDetails((prev) => {
      return { ...prev, completed: false };
    });
    setFormData({
      empId: empId,
      eventType: "",
      notes: "",
    });

    setShowForm(false);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data:", formData);
    setResponseDetails((prev) => {
      return { ...prev, isLoading: true };
    });
    PostEmployerTimeLine(formData).then(() => {
      setTimeout(() => {
        setResponseDetails((prev) => {
          return { ...prev, isLoading: false, completed: true };
        });
      }, 1000);
      setTimeout(() => {
        setResponseDetails((prev) => {
          return { ...prev, completed: false };
        });
        // setShowForm(false);
        // onSuccess();
      }, 3000);
      setFormData({
        empId: empId,
        eventType: "",
        notes: "",
      });
      // Handle success logic here
    });

    // You can send the form data to your server or perform any other actions
  };

  return (
    <>
      <div>
        {/* <div className="">
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => {
              setShowForm(true);
            }}
          >
            + Add Notes
          </Button>
        </div> */}
        {/* {showForm && ( */}
        <Card style={{ maxWidth: 700, margin: "0 auto" }}>
          <CardContent>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <FormControl fullWidth style={{ marginTop: "16px" }}>
                <InputLabel>Event Type</InputLabel>
                <Select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  label="Event Type"
                  required
                >
                  {eventOptions.map((el) => {
                    return (
                      <MenuItem value={el.eventName}>{el.eventName}</MenuItem>
                    );
                  })}

                  {/* Add more event types as needed */}
                </Select>
              </FormControl>

              <FormControl
                fullWidth
                style={{ marginTop: "25px", zIndex: "10001" }}
              >
                <TextField
                  name="notes"
                  id="outlined-textarea"
                  label="Notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Add Notes"
                  required
                  inputProps={{ maxLength: 250 }}
                  multiline
                  helperText={formData.notes.length + "/250"}
                />
              </FormControl>

              <Box mt={2}>
                <Box sx={{ m: 1, position: "relative" }}>
                  <div className=" d-flex justify-content-end gap-2">
                    {/* <Button
                      variant="outlined"
                      color="error"
                      // sx={buttonSx}
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      Close
                    </Button> */}
                    <Button
                      type="submit"
                      variant="contained"
                      sx={buttonSx}
                      disabled={
                        responseDetails.isLoading || responseDetails.completed
                      }
                    >
                      {responseDetails.completed && "Success"}
                      {responseDetails.failed && "Failed"}
                      {responseDetails.isLoading && "Loading"}
                      {!responseDetails.completed &&
                        !responseDetails.isLoading &&
                        "Submit"}
                    </Button>
                    {responseDetails.isLoading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: green[500],
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-12px",
                          marginLeft: "-12px",
                        }}
                      />
                    )}
                  </div>
                </Box>
              </Box>
            </form>
          </CardContent>
        </Card>
        {/* <MyModal>
          <ModalContainer
            zIndex={1006}
            childComponent={
              <>
                <h5 className="text-center"> Add Notes </h5>
              
              </>
            }
          />
        </MyModal> */}
        {/* )} */}
        {/* {responseDetails.completed && (
          <MyModal>
            <ModalContainer
              childComponent={<SuccessTick HeadText="Successfully" />}
            />
          </MyModal>
        )} */}
      </div>
    </>
  );
}
