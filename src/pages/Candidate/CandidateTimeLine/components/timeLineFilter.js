/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "@mui/icons-material/Close";
import { GetCanTimeLineEvents } from "../../../../apiServices";

const initialValues = {
  selectedOption: "",
  startDate: null,
  endDate: null,
};

const TimeLineFilter = ({
  close,
  updateFilter,
  filterData,
  onSubmit,
  resetFilter,
}) => {
  const [formValues, setFormValues] = useState(initialValues);

  const [eventTypeOptions, setEventTypeOptions] = useState([]);

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    // setFormValues({ ...formValues, [name]: value });
    updateFilter(name, value);
  };

  const handleStartDateChange = (date) => {
    console.log(date);

    let { value } = date.target;

    // setFormValues({ ...formValues, startDate: date });
    updateFilter("startDate", value);
  };

  useEffect(() => {
    GetCanTimeLineEvents().then((res) => {
      setEventTypeOptions(res);
    });
  }, []);

  const handleEndDateChange = (date) => {
    console.log(date);

    let { value } = date.target;
    // setFormValues({ ...formValues, endDate: date });
    updateFilter("endDate", value);
  };

  console.log(
    dayjs("Sun Oct 01 2023 00:00:00 GMT+0530 (India Standard Time)"),
    "dateeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit();

    // Perform validation here, e.g., check if start date is before end date
    // if (formValues.startDate > formValues.endDate) {
    //   alert("End date must be after start date");
    //   return;
    // }

    // Submit your form data or perform other actions here
    console.log("Form values:", formValues);
  };

  return (
    <>
      <Card style={{ maxWidth: 500, margin: "0 auto" }}>
        <CardContent>
          <div className="d-grid justify-content-end mx-sm-4">
            <button className=" btn btn-outline-danger p-1" onClick={close}>
              <CloseIcon />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <div className="mt-2">
                <InputLabel id="eventType-label">Event Type </InputLabel>
                <Select
                  labelId="eventType-label"
                  sx={{ width: "100%" }}
                  label="Event Type"
                  name="eventType"
                  onChange={handleEventChange}
                  value={filterData.eventType}
                >
                  {eventTypeOptions.map((el, i) => {
                    return (
                      <MenuItem key={i} value={el.eventName}>
                        {el.eventName}
                      </MenuItem>
                    );
                  })}

                  <MenuItem value=""></MenuItem>
                </Select>
              </div>

              <div className="mt-2">
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      fullWidth
                      label="Basic date picker "
                      value={dayjs(filterData.startDate)}
                    />
                  </DemoContainer>
                </LocalizationProvider> */}

                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    fullWidth
                    label="Start Date"
                    // value={filterData.startDate}
                    onChange={(value) => {
                      handleStartDateChange(value);
                    }}
                    // onChange={(newValue) => setValue(newValue)}
                  />
                </LocalizationProvider> */}

                <input
                  className="form-control"
                  style={{ width: "100%" }}
                  type="date"
                  id="start"
                  onChange={(value) => {
                    handleStartDateChange(value);
                  }}
                  name="trip-start"
                  value={filterData.startDate}
                  min="2020-01-01"
                  // max="2018-12-31"
                />
              </div>
              <div className="mt-2">
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    fullWidth
                    label="End Date"
                    value={filterData.endDate}
                    onChange={(value) => {
                      handleEndDateChange(value);
                    }}
                    // onChange={(newValue) => setValue(newValue)}
                  />
                </LocalizationProvider> */}

                <input
                  className="form-control"
                  style={{ width: "100%" }}
                  type="date"
                  id="start"
                  onChange={(value) => {
                    handleEndDateChange(value);
                  }}
                  name="trip-start"
                  value={filterData.endDate}
                  min="2020-01-01"
                  // max="2018-12-31"
                />
              </div>

              <div className="d-flex justify-content-end flex-row">
                <Button
                  className="mt-3 mx-3"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    resetFilter();
                  }}
                >
                  Clear
                </Button>
                <Button
                  type="submit"
                  className="mx-3 mt-3"
                  variant="contained"
                  color="primary"
                >
                  Apply
                </Button>
              </div>
            </FormControl>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default TimeLineFilter;
