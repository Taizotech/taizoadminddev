import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import Button from "@mui/material/Button";
import { GetAdminDeveloper, PutBugFixerForm } from "../../apiServices";
import { MyModal, dateFormate } from "../../utility";
import ModalContainer from "../../components/modal_popup";
import SuccessTick from "../../components/success_tick";

function BugFixerput({ bugId, onclose }) {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [priority, setPriority] = useState("");
  const [successTick, setSuccessTick] = useState(false);
  const [errors, setErrors] = useState({
    selectedUserId: "",
    date1: "",
    date2: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await GetAdminDeveloper();
        setUsers(data.AdminDetails);
        console.log(data.AdminDetails, "data.AdminDetails");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // const handleChange = (event) => {
  //   const { value } = event.target;
  //   setSelectedUserId(value);
  //   setErrors({
  //     ...errors,
  //     selectedUserId: value ? "" : "Please select a assigned to",
  //   });
  // };

  const handlePriority = (event) => {
    const { value } = event.target;
    setPriority(value);
    setErrors({
      ...errors,
      priority: value ? "" : "Please select a priority",
    });
  };

  const handleChange = (event, newValue) => {
    setSelectedUserId(newValue);
    setErrors({
      ...errors,
      selectedUserId:
        newValue.length > 0 ? "" : "Please select an assigned user",
    });
  };

  const handleDateChange1 = (date) => {
    console.log(date, "data");
    setDate1(date.$d);
    setErrors({ ...errors, date1: date ? "" : "Please select a date" });
  };

  const handleDateChange2 = (date) => {
    setDate2(date.$d);
    console.log(date, "date2");
    setErrors({ ...errors, date2: date ? "" : "Please select a date" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any fields are empty
    const newErrors = {
      selectedUserId: !selectedUserId ? "Please select a assigned to" : "",
      date1: !date1 ? "Please select a date" : "",
      date2: !date2 ? "Please select a date" : "",
      priority: !priority ? "Please select a priority" : "",
    };

    setErrors(newErrors);

    if (
      !newErrors.selectedUserId &&
      !newErrors.date1 &&
      !newErrors.date2 &&
      !newErrors.priority
    ) {
      const formattedDate1 = dateFormate(date1);
      const formattedDate2 = dateFormate(date2);

      const requestBody = {
        id: bugId,
        assignedTo: selectedUserId.join(","),
        endDate: formattedDate2,
        startDate: formattedDate1,
        priority: priority,
        verified: true,
      };

      try {
        setSuccessTick(true);
        const response = await PutBugFixerForm(requestBody);
        console.log(response);
        setSuccessTick(true);
        setTimeout(() => {
          setSuccessTick(false);
          onclose();
        }, 1000);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div>
      <div>
        <FormControl style={{ width: "100%" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={date1}
              onChange={handleDateChange1}
            />
            {errors.date1 && <p style={{ color: "red" }}>{errors.date1}</p>}
          </LocalizationProvider>
        </FormControl>

        <br />
        <br />
        <FormControl style={{ width: "100%" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={date2}
              onChange={handleDateChange2}
            />
            {errors.date2 && <p style={{ color: "red" }}>{errors.date2}</p>}
          </LocalizationProvider>
        </FormControl>

        <br />
        <br />
        {/* <FormControl className="mt-3" style={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-label">
            Task Assigned To
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedUserId}
            onChange={handleChange}
            fullWidth
            error={!!errors.selectedUserId}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.userName}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

        <Autocomplete
          multiple
          id="tags-outlined"
          filterSelectedOptions
          options={users.map((option) => option.userName)}
          getOptionLabel={(user) => user}
          // value={selectedUserId || []} // Ensure selectedUserId is in correct format
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Task Assigned To"
              placeholder="Select assigned users"
              error={!!errors.selectedUserId}
            />
          )}
        />

        {errors.selectedUserId && (
          <p style={{ color: "red" }}>{errors.selectedUserId}</p>
        )}

        <FormControl className="mt-3" style={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-label">Task Priority</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={priority}
            onChange={handlePriority}
            fullWidth
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
          {errors.priority && <p style={{ color: "red" }}>{errors.priority}</p>}
        </FormControl>
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            type="submit"
            variant="outlined"
            color="success"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
      {successTick && (
        <MyModal>
          <ModalContainer
            childComponent={
              <>
                <SuccessTick HeadText="Successfully Verified" />
              </>
            }
          />
        </MyModal>
      )}
    </div>
  );
}

export default BugFixerput;
