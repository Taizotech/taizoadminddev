import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import { CircularProgress } from "@mui/material";
import { green } from "@mui/material/colors";
import {
  GetCanTimeLineEvents,
  PostFacebookLeadTimeLine,
} from "../../../apiServices";

export default function AddNotesFBLead({ facebookId, close }) {
  const [formData, setFormData] = useState({
    facebookId: facebookId,
    eventType: "",
    notes: "",
  });
  const [eventTypeOptions, setEventTypeOptions] = useState([]);
  const [responseDetails, setResponseDetails] = useState({
    isLoading: false,
    completed: false,
    failed: false,
  });

  const buttonSx = {
    ...(responseDetails.completed && {
      bgcolor: "#169c50",
      color: "white",
      "&:hover": {
        bgcolor: "#169c50",
        color: "white",
      },
    }),
  };
  console.log(facebookId, "gjgj");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    GetCanTimeLineEvents(false).then((res) => {
      setEventTypeOptions(res);

      console.log("Event type", res);
    });
  }, []);
  const activeEvents = eventTypeOptions.filter((event) => event.active);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data:", formData);
    setResponseDetails((prev) => {
      return { ...prev, isLoading: true };
    });
    PostFacebookLeadTimeLine(formData).then(() => {
      setFormData({
        facebookId: facebookId,
        eventType: "",
        notes: "",
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
        close();
      }, 3000);

      // Handle success logic here
    });

    // You can send the form data to your server or perform any other actions
  };

  return (
    <>
      <div>
        <div>
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              {" "}
              {/* <h4 className="text-center">Add Notes</h4> */}
            </div>
          </div>
        </div>
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
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Add Notes"
              required={
                ![
                  "Not attended",
                  "Not reachable",
                  "Switch off",
                  "Number blocked",
                  "Wrong Person",
                ].includes(formData.eventType)
              }
              inputProps={{ maxLength: 250 }}
              multiline
              helperText={formData.notes.length + "/250"}
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
      </div>
    </>
  );
}
