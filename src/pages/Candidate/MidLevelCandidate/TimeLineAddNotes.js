import React, { useEffect, useState } from "react";
import {
  GetEventTypeMidSenior,
  PutCandidateSenior,
} from "../../../apiServices";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { green } from "@mui/material/colors";

function TimeLineAddNotes({ Id }) {
  const [putnotes, setPutNotes] = useState({
    canLeadId: Id,
    notes: "",
    eventType: "",
  });
  const [eventTypeOptions, setEventTypeOptions] = useState([]);
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
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPutNotes({
      ...putnotes,
      [name]: value,
    });
  };
  useEffect(() => {
    GetEventTypeMidSenior(false).then((res) => {
      setEventTypeOptions(res);

      console.log("Event type", res);
    });
  }, []);
  const activeEvents = eventTypeOptions.filter((event) => event.active);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data:", putnotes);
    setResponseDetails((prev) => {
      return { ...prev, isLoading: true };
    });
    PutCandidateSenior(putnotes).then(() => {
      setPutNotes({
        canLeadId: Id,
        notes: "",
        eventType: "",
      });

      setTimeout(() => {
        setResponseDetails((prev) => {
          return { ...prev, isLoading: false, completed: true };
        });
      }, 1000);
      setTimeout(() => {
        setResponseDetails((prev) => {
          return { ...prev, completed: false };
        });
        // close();
      }, 3000);
    });
  };
  return (
    <div>
      <div>
        <Card style={{ maxWidth: 700, minWidth: 350, margin: "0 auto" }}>
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
                  value={putnotes.eventType}
                  onChange={handleInputChange}
                  label="Event Type"
                  required
                >
                  {activeEvents.map((event) => (
                    <MenuItem key={event.id} value={event.eventName}>
                      {event.eventName}
                    </MenuItem>
                  ))}
                  {/* Add more event types as needed */}
                </Select>
              </FormControl>

              <FormControl fullWidth style={{ marginTop: "25px" }}>
                <TextField
                  name="notes"
                  id="outlined-textarea"
                  label="Notes"
                  value={putnotes.notes}
                  onChange={handleInputChange}
                  placeholder="Add Notes"
                  required
                  inputProps={{ maxLength: 250 }}
                  multiline
                  helperText={putnotes.notes.length + "/250"}
                />
              </FormControl>

              <Box mt={2}>
                <Box sx={{ m: 1, position: "relative" }}>
                  <div className="justify-content-center">
                    <Button
                      type="submit"
                      variant="contained"
                      sx={buttonSx}
                      disabled={
                        responseDetails.isLoading || responseDetails.completed
                      }
                      fullWidth
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
        {/* {responseDetails.completed && (
          <MyModal>
            <ModalContainer
              childComponent={<SuccessTick HeadText="Successfully" />}
            />
          </MyModal>
        )} */}
      </div>
    </div>
  );
}

export default TimeLineAddNotes;
