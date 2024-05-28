/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { GetEmpTimelineEvents } from "../../../../apiServices";
import { MyModal } from "../../../../utility";
import ModalContainer from "../../../../components/modal_popup";
import { useDispatch, useSelector } from "react-redux";
import { employerTimelineActions } from "../../../../redux-store/store";

// import styled from "styled-components";

// const RedDot = styled.div`
//   width: 8px;
//   height: 8px;
//   background-color: red;
//   border-radius: 50%;
//   position: relative;
//   top: -7px;
// `;

const TimeLineFilter = ({}) => {
  const timelineFilter = useSelector(
    (state) => state.employerTimeline.employerTimeline.filter
  );

  const initialValues = {
    eventName: timelineFilter.eventName,
    startDate: timelineFilter.startDate ? timelineFilter.startDate : "",
    endDate: timelineFilter.endDate ? timelineFilter.endDate : "",
  };

  const [formValues, setFormValues] = useState(initialValues);

  const [eventTypeOptions, setEventTypeOptions] = useState([]);

  const Dispatch = useDispatch();

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const showRedDote =
    timelineFilter.startDate ||
    timelineFilter.endDate ||
    timelineFilter.eventName;

  const [showFilter, setShowFilter] = useState(false);

  const handleStartDateChange = (date) => {
    let { value } = date.target;

    setFormValues({ ...formValues, startDate: value });
  };

  useEffect(() => {}, [formValues]);

  //    function GetTimelineEvents() {
  //      GetEmpTimelineEvents().then((data) => {
  //     //    setEventOptions(data);
  //      });
  //    }

  useEffect(() => {
    GetEmpTimelineEvents(false).then((res) => {
      setEventTypeOptions(res);

      console.log("ksssssssssssssssssssssssssssssss", res);
    });
  }, []);

  const handleEndDateChange = (date) => {
    let { value } = date.target;
    setFormValues({ ...formValues, endDate: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formValues, "filtervaluess");

    Dispatch(
      employerTimelineActions.setEmployerTimelineFilter({
        ...formValues,
        page: 0,
      })
    );

    setShowFilter(false);

    // Submit your form data or perform other actions here
    console.log("Form values:", formValues);
  };

  function resetFilter() {
    setFormValues({
      eventName: "",
      startDate: "",
      endDate: "",
    });
    Dispatch(
      employerTimelineActions.setEmployerTimelineFilter({
        ...initialValues,
        page: 0,
      })
    );
  }

  return (
    <>
      <div>Filter</div>
      {showFilter && (
        <MyModal>
          <ModalContainer
            zIndex={1005}
            childComponent={
              <>
                <div>
                  <div style={{ minWidth: "320px" }} className="row">
                    <div className="col-2"></div>
                    <div className="col">
                      <h5 className="text-center">Timeline Filter</h5>
                    </div>
                    <div className="col-2">
                      <Button
                        color="error"
                        size="small"
                        className="pe-5"
                        sx={{ pe: 4 }}
                        onClick={() => {
                          setShowFilter(false);
                        }}
                      >
                        <CloseIcon />
                      </Button>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <FormControl fullWidth>
                      <div className="mt-2">
                        <InputLabel id="eventType-label">
                          Event Type{" "}
                        </InputLabel>
                        <Select
                          labelId="eventType-label"
                          sx={{ width: "100%" }}
                          label="Event Type"
                          name="eventName"
                          onChange={handleEventChange}
                          value={formValues.eventName}
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
                        <input
                          className="form-control"
                          style={{ width: "100%" }}
                          type="date"
                          id="start"
                          onChange={(value) => {
                            handleStartDateChange(value);
                          }}
                          name="trip-start"
                          value={formValues.startDate}
                          min="2020-01-01"
                          // max="2018-12-31"
                        />
                      </div>
                      <div className="mt-2">
                        <input
                          className="form-control"
                          style={{ width: "100%" }}
                          type="date"
                          id="start"
                          onChange={(value) => {
                            handleEndDateChange(value);
                          }}
                          name="trip-start"
                          value={formValues.endDate}
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
                </div>
              </>
            }
          />
        </MyModal>
      )}
    </>
  );
};

export default TimeLineFilter;
