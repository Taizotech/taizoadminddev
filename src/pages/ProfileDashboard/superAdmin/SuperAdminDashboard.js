/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import superAdminStyle from "./SuperAdminDashboard.module.scss";
import { BiFilter } from "react-icons/bi";
import { AiOutlineArrowDown } from "react-icons/ai";
import { MyModal } from "../../../utility";
import ModalContainer from "../../../components/modal_popup";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { RxCross1 } from "react-icons/rx";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Getdashboard } from "../../../apiServices";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
  Title,
  Tooltip,
  Legend
);
function SuperAdminDashboard() {
  const [showFilteroption, setShowFilteroption] = useState(false);
  const [showJobseeker, setshowJobseeker] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Employer");
  const [selectedDuration, setSelectedDuration] = useState("daily");
  const [filterDot, setFilterDot] = useState(false);
  //   const adminDetails = useSelector((state) => state.adminDetails);

  const createInitialDataStructure = () => ({
    daily: {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: "#169C50",
          // borderColor: "rgb(255, 99, 132)",
          borderWidth: 1,
          fontSize: "20px",
        },
      ],
    },
    weekly: {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: "#169C50",
          // borderColor: "rgb(255, 99, 132)",
          borderWidth: 1,
        },
      ],
    },
    monthly: {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: "#169C50",
          // borderColor: "rgb(255, 99, 132)",
          borderWidth: 1,
        },
      ],
    },
  });
  const initialDataByDuration = {
    Incomplete: createInitialDataStructure(),
    Registration: createInitialDataStructure(),
    noOfPayment: createInitialDataStructure(),
    planCanceled: createInitialDataStructure(),
    noOfCalls: createInitialDataStructure(),
    totalPayment: createInitialDataStructure(),
    feedback: createInitialDataStructure(),
    interviewScheduled: createInitialDataStructure(),
    Ratings: createInitialDataStructure(),
    TotalJobs: createInitialDataStructure(),
    ActiveJobs: createInitialDataStructure(),
    ClosedJobs: createInitialDataStructure(),
    JobLead: createInitialDataStructure(),
    Response: createInitialDataStructure(),
    JobRatings: createInitialDataStructure(),
  };
  const [dataByDuration, setDataByDuration] = useState(initialDataByDuration);

  useEffect(() => {
    Getdashboard(selectedDuration, selectedOption).then((data) => {
      const dailyTimePeriod = data.data.map((item) => item.Time);
      const Incomplete = data.data.map(
        (item) => item["Incomplete_Registration"]
      );
      // const stage2Count = data.data.map((item) => item["Stage 2"]);
      const Registration = data.data.map((item) => item.Registration);
      const noOfPayment = data.data.map((item) => item["No_of_Payment"]);
      // const noOfPayment = data.data.map((item) => item["No of Payment"]);

      const planCanceled = data.data.map(
        (item) => item["No_of_Plan_Cancelled"]
      );
      const noOfCalls = data.data.map((item) => item["No_of_Calls "]);
      // const noOfCallss = data.data.map((item) => item["No of Calls"]);
      const totalPayment = data.data.map((item) => item["Total_Amount"]);
      const feedback = data.data.map((item) => item.Feedback);
      const Ratings = data.data.map((item) => item["No_of_Ratings"]);
      const interviewScheduled = data.data.map(
        (item) => item["No_of_Interviews_Scheduled"]
      );
      const TotalJobs = data.data.map((item) => item["Total_Job_Posted"]);
      const ActiveJobs = data.data.map((item) => item["No_of_Active_Jobs"]);
      const ClosedJobs = data.data.map((item) => item["No_of_Closed_Jobs"]);
      const JobLead = data.data.map((item) => item["No_of_Job_Lead"]);
      const Response = data.data.map((item) => item["No_of_Job_Can_Response"]);
      const JobRatings = data.data.map((item) => item["No_of_Job_Ratings"]);

      // console.log(stage1Count, "stage1Count count");

      setDataByDuration((prev) => ({
        ...prev,
        Incomplete: {
          ...prev.Incomplete,
          [selectedDuration]: {
            //  [selectedDuration],
            labels: [...dailyTimePeriod.slice().reverse()],
            datasets: [
              {
                ...prev.Incomplete[selectedDuration].datasets[0],
                data: [...Incomplete.slice().reverse()],
                // label: ["Incomplete Registration"],
              },
            ],
          },
        },
        Registration: {
          ...prev.Registration,
          [selectedDuration]: {
            labels: [...dailyTimePeriod.slice().reverse()],
            datasets: [
              {
                ...prev.Registration[selectedDuration].datasets[0],
                data: [...Registration.slice().reverse()],
                // label: ["Registration"],
              },
            ],
          },
        },
        noOfPayment: {
          ...prev.noOfPayment,
          [selectedDuration]: {
            labels: [...dailyTimePeriod.slice().reverse()],
            datasets: [
              {
                ...prev.noOfPayment[selectedDuration].datasets[0],
                data: [...noOfPayment.slice().reverse()],
                // label: ["No  of Payment"],
              },
            ],
          },
        },
        planCanceled: {
          ...prev.planCanceled,
          [selectedDuration]: {
            labels: [...dailyTimePeriod.slice().reverse()],
            datasets: [
              {
                ...prev.planCanceled[selectedDuration].datasets[0],
                data: [...planCanceled.slice().reverse()],
                // label: ["No  of  Plan  Cancelled"],
              },
            ],
          },
        },
        noOfCalls: {
          ...prev.noOfCalls,
          [selectedDuration]: {
            labels: [...dailyTimePeriod.slice().reverse()],
            datasets: [
              {
                ...prev.noOfCalls[selectedDuration].datasets[0],
                data: [...noOfCalls.slice().reverse()],
                // label: ["No  of  Calls"],
              },
            ],
          },
        },
        totalPayment: {
          ...prev.totalPayment,
          [selectedDuration]: {
            labels: [...dailyTimePeriod.slice().reverse()],
            datasets: [
              {
                ...prev.totalPayment[selectedDuration].datasets[0],
                data: [...totalPayment.slice().reverse()],
                // label: ["Total Payment"],
              },
            ],
          },
        },
        feedback: {
          ...prev.feedback,
          [selectedDuration]: {
            labels: [...dailyTimePeriod.slice().reverse()],
            datasets: [
              {
                ...prev.feedback[selectedDuration].datasets[0],
                data: [...feedback.slice().reverse()],
                // label: ["feedback"],
              },
            ],
          },
        },
        interviewScheduled: {
          ...prev.interviewScheduled,
          [selectedDuration]: {
            labels: [...dailyTimePeriod.slice().reverse()],
            datasets: [
              {
                ...prev.interviewScheduled[selectedDuration].datasets[0],
                data: [...interviewScheduled.slice().reverse()],
                // label: ["feedback"],
              },
            ],
          },
        },
        Ratings: {
          ...prev.Ratings,
          [selectedDuration]: {
            labels: [...dailyTimePeriod.slice().reverse()],
            datasets: [
              {
                ...prev.Ratings[selectedDuration].datasets[0],
                data: [...Ratings.slice().reverse()],
                // label: ["feedback"],
              },
            ],
          },
        },
        TotalJobs: {
          ...prev.TotalJobs,
          [selectedDuration]: {
            labels: [...dailyTimePeriod.slice().reverse()],
            datasets: [
              {
                ...prev.TotalJobs[selectedDuration].datasets[0],
                data: [...TotalJobs.slice().reverse()],
                // label: ["feedback"],
              },
            ],
          },
        },
        ActiveJobs: {
          ...prev.ActiveJobs,
          [selectedDuration]: {
            labels: [...dailyTimePeriod.slice().reverse()],
            datasets: [
              {
                ...prev.ActiveJobs[selectedDuration].datasets[0],
                data: [...ActiveJobs.slice().reverse()],
                // label: ["feedback"],
              },
            ],
          },
        },
        ClosedJobs: {
          ...prev.ClosedJobs,
          [selectedDuration]: {
            labels: [...dailyTimePeriod.slice().reverse()],
            datasets: [
              {
                ...prev.ClosedJobs[selectedDuration].datasets[0],
                data: [...ClosedJobs.slice().reverse()],
                // label: ["feedback"],
              },
            ],
          },
        },
        JobLead: {
          ...prev.JobLead,
          [selectedDuration]: {
            labels: [...dailyTimePeriod.slice().reverse()],
            datasets: [
              {
                ...prev.JobLead[selectedDuration].datasets[0],
                data: [...JobLead.slice().reverse()],
                // label: ["feedback"],
              },
            ],
          },
        },
        Response: {
          ...prev.Response,
          [selectedDuration]: {
            labels: [...dailyTimePeriod.slice().reverse()],
            datasets: [
              {
                ...prev.Response[selectedDuration].datasets[0],
                data: [...Response.slice().reverse()],
                // label: ["feedback"],
              },
            ],
          },
        },
        JobRatings: {
          ...prev.JobRatings,
          [selectedDuration]: {
            labels: [...dailyTimePeriod.slice().reverse()],
            datasets: [
              {
                ...prev.JobRatings[selectedDuration].datasets[0],
                data: [...JobRatings.slice().reverse()],
                // label: ["feedback"],
              },
            ],
          },
        },
      }));
    });
  }, [selectedDuration, selectedOption]);
  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);
  return (
    <div>
      <div className="container-fluid">
        <div className="d-flex justify-content-end">
          <button className={`btn mb-1 ${superAdminStyle.Filter}`}>
            <span
              onClick={() => setShowFilteroption(true)}
              className="d-flex align-items-center"
            >
              Filter{" "}
              <b>
                <BiFilter />
              </b>{" "}
              <p
                style={{
                  backgroundColor: "red",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                }}
              ></p>
            </span>
          </button>
        </div>
        {showFilteroption && (
          <>
            <MyModal>
              <ModalContainer
                childComponent={
                  <>
                    <div className={`${superAdminStyle.Box}`}>
                      <div className="container">
                        <div className="text-end m-2">
                          <button
                            className="btn "
                            style={{
                              backgroundColor: "#c91804",
                              color: "#fff",
                            }}
                            onClick={() => setShowFilteroption(false)}
                          >
                            {" "}
                            <RxCross1 />
                          </button>
                        </div>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Module
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Select module"
                            // onChange={(e) => {
                            //   setSelectModule(e.target.value);
                            // }}
                            // value={selectModule}
                          >
                            <MenuItem value={"Employer"}>Employer</MenuItem>

                            <MenuItem value={"Jobseeker"}>Job seeker</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth className="mt-3">
                          <InputLabel id="demo-simple-select-label">
                            Time
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Time"
                            // onChange={handleDurationChange}
                            // value={selectedDuration}
                          >
                            <MenuItem value={"daily"}>Daily</MenuItem>
                            <MenuItem value={"weekly"}>Weekly</MenuItem>
                            <MenuItem value={"monthly"}>Monthly</MenuItem>
                            {/* <MenuItem value={30}>Thirty</MenuItem> */}
                          </Select>
                        </FormControl>

                        <FormControl fullWidth className="mt-3">
                          <InputLabel id="demo-simple-select-label">
                            Employee
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Employee"
                            // onChange={handleDurationChange}
                            // value={selectedDuration}
                          >
                            <MenuItem value={"daily"}>Sowmiya</MenuItem>
                            <MenuItem value={"weekly"}>Anees</MenuItem>
                            <MenuItem value={"monthly"}>sangeetha</MenuItem>
                            {/* <MenuItem value={30}>Thirty</MenuItem> */}
                          </Select>
                        </FormControl>
                        {/* <TextField
                          type="date"
                          label="Start Date"
                          variant="outlined"
                          fullWidth
                          className="mt-3"
                          //   value={dateValue.startDate}
                          // onChange={(e) => setDateValue}
                          //   onChange={(e) =>
                          //     setDateValue((prev) => ({
                          //       ...prev,
                          //       startDate: e.target.value,
                          //     }))
                          //   }
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <TextField
                          type="date"
                          label="End Date"
                          variant="outlined"
                          fullWidth
                          className="mt-3"
                          //   value={dateValue.endDate}
                          //   // onChange={(e) => handleEndDateChange(e)}
                          //   onChange={(e) =>
                          //     setDateValue((prev) => ({
                          //       ...prev,
                          //       endDate: e.target.value,
                          //     }))
                          //   }
                          InputLabelProps={{
                            shrink: true,
                          }}
                        /> */}

                        <div className="d-flex justify-content-end mt-5 ">
                          <button
                            className={`btn me-2 ${superAdminStyle.Filter}`}
                          >
                            Apply
                          </button>
                          <button className={`btn ${superAdminStyle.clear}`}>
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                }
              />
            </MyModal>
          </>
        )}
        {/* /** card of view for profile dashboard*/}
        <div className={`container-fluid ${superAdminStyle.scroll}`}>
          <div className="row mt-4">
            <div className="col-sm-4 mt-2">
              {" "}
              <Bar
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "none",
                    },
                    title: {
                      display: true,
                      text: "Payment",
                      padding: {
                        top: 0,
                        bottom: 30,
                      },
                      fontSize: 16,
                      // fontSize: 40,
                    },
                    datalabels: {
                      anchor: "end",
                      align: "end",
                      display: (context) => {
                        const value = context.dataset.data[context.dataIndex];
                        return value > 0;
                      },
                      formatter: (value) => {
                        return value > 0 ? value : "";
                      },
                    },
                  },
                }}
                data={dataByDuration.totalPayment[selectedDuration]}
              />
            </div>
            <div className="col-sm-4 mt-2">
              {" "}
              <Bar
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "none",
                    },
                    title: {
                      display: true,
                      text: "New lead",
                      padding: {
                        top: 0,
                        bottom: 30,
                      },
                      fontSize: 16,
                      // fontSize: 40,
                    },
                    datalabels: {
                      anchor: "end",
                      align: "end",
                      display: (context) => {
                        const value = context.dataset.data[context.dataIndex];
                        return value > 0;
                      },
                      formatter: (value) => {
                        return value > 0 ? value : "";
                      },
                    },
                  },
                }}
                data={dataByDuration.Incomplete[selectedDuration]}
              />
            </div>
            <div className="col-sm-4 mt-2">
              {" "}
              <Bar
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "none",
                    },
                    title: {
                      display: true,
                      text: "Follow up",
                      padding: {
                        top: 0,
                        bottom: 30,
                      },
                      fontSize: 16,
                      // fontSize: 40,
                    },
                    datalabels: {
                      anchor: "end",
                      align: "end",
                      display: (context) => {
                        const value = context.dataset.data[context.dataIndex];
                        return value > 0;
                      },
                      formatter: (value) => {
                        return value > 0 ? value : "";
                      },
                    },
                  },
                }}
                data={dataByDuration.Incomplete[selectedDuration]}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-4 mt-3">
              {" "}
              <Bar
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "none",
                    },
                    title: {
                      display: true,
                      text: "Total calls",
                      padding: {
                        top: 0,
                        bottom: 30,
                      },
                      fontSize: 16,
                      // fontSize: 40,
                    },
                    datalabels: {
                      anchor: "end",
                      align: "end",
                      display: (context) => {
                        const value = context.dataset.data[context.dataIndex];
                        return value > 0;
                      },
                      formatter: (value) => {
                        return value > 0 ? value : "";
                      },
                    },
                  },
                }}
                data={dataByDuration.Incomplete[selectedDuration]}
              />
            </div>
            <div className="col-sm-4 mt-3">
              {" "}
              <Bar
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "none",
                    },
                    title: {
                      display: true,
                      text: "Employer qualified",
                      padding: {
                        top: 0,
                        bottom: 30,
                      },
                      fontSize: 16,
                      // fontSize: 40,
                    },
                    datalabels: {
                      anchor: "end",
                      align: "end",
                      display: (context) => {
                        const value = context.dataset.data[context.dataIndex];
                        return value > 0;
                      },
                      formatter: (value) => {
                        return value > 0 ? value : "";
                      },
                    },
                  },
                }}
                data={dataByDuration.noOfPayment[selectedDuration]}
              />
            </div>
            <div className="col-sm-4 mt-3">
              {" "}
              <Bar
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "none",
                    },
                    title: {
                      display: true,
                      text: "Employer notqualified",
                      padding: {
                        top: 0,
                        bottom: 30,
                      },
                      fontSize: 16,
                      // fontSize: 40,
                    },
                    datalabels: {
                      anchor: "end",
                      align: "end",
                      display: (context) => {
                        const value = context.dataset.data[context.dataIndex];
                        return value > 0;
                      },
                      formatter: (value) => {
                        return value > 0 ? value : "";
                      },
                    },
                  },
                }}
                data={dataByDuration.Incomplete[selectedDuration]}
              />
            </div>
          </div>

          {showJobseeker && (
            <>
              <div className="row mt-4">
                <div className="col-sm-4 mt-2">
                  {" "}
                  <Bar
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "none",
                        },
                        title: {
                          display: true,
                          text: "Total chat",
                          padding: {
                            top: 0,
                            bottom: 30,
                          },
                          fontSize: 16,
                          // fontSize: 40,
                        },
                        datalabels: {
                          anchor: "end",
                          align: "end",
                          display: (context) => {
                            const value =
                              context.dataset.data[context.dataIndex];
                            return value > 0;
                          },
                          formatter: (value) => {
                            return value > 0 ? value : "";
                          },
                        },
                      },
                    }}
                    data={dataByDuration.totalPayment[selectedDuration]}
                  />
                </div>
                <div className="col-sm-4 mt-2">
                  {" "}
                  <Bar
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "none",
                        },
                        title: {
                          display: true,
                          text: "Total calls",
                          padding: {
                            top: 0,
                            bottom: 30,
                          },
                          fontSize: 16,
                          // fontSize: 40,
                        },
                        datalabels: {
                          anchor: "end",
                          align: "end",
                          display: (context) => {
                            const value =
                              context.dataset.data[context.dataIndex];
                            return value > 0;
                          },
                          formatter: (value) => {
                            return value > 0 ? value : "";
                          },
                        },
                      },
                    }}
                    data={dataByDuration.Incomplete[selectedDuration]}
                  />
                </div>
                <div className="col-sm-4 mt-2">
                  {" "}
                  <Bar
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "none",
                        },
                        title: {
                          display: true,
                          text: "Interview schedule",
                          padding: {
                            top: 0,
                            bottom: 30,
                          },
                          fontSize: 16,
                          // fontSize: 40,
                        },
                        datalabels: {
                          anchor: "end",
                          align: "end",
                          display: (context) => {
                            const value =
                              context.dataset.data[context.dataIndex];
                            return value > 0;
                          },
                          formatter: (value) => {
                            return value > 0 ? value : "";
                          },
                        },
                      },
                    }}
                    data={dataByDuration.Incomplete[selectedDuration]}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-sm-4 mt-3">
                  {" "}
                  <Bar
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "none",
                        },
                        title: {
                          display: true,
                          text: "Interview attended",
                          padding: {
                            top: 0,
                            bottom: 30,
                          },
                          fontSize: 16,
                          // fontSize: 40,
                        },
                        datalabels: {
                          anchor: "end",
                          align: "end",
                          display: (context) => {
                            const value =
                              context.dataset.data[context.dataIndex];
                            return value > 0;
                          },
                          formatter: (value) => {
                            return value > 0 ? value : "";
                          },
                        },
                      },
                    }}
                    data={dataByDuration.Incomplete[selectedDuration]}
                  />
                </div>
                <div className="col-sm-4 mt-3">
                  {" "}
                  <Bar
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "none",
                        },
                        title: {
                          display: true,
                          text: "Selected candidate",
                          padding: {
                            top: 0,
                            bottom: 30,
                          },
                          fontSize: 16,
                          // fontSize: 40,
                        },
                        datalabels: {
                          anchor: "end",
                          align: "end",
                          display: (context) => {
                            const value =
                              context.dataset.data[context.dataIndex];
                            return value > 0;
                          },
                          formatter: (value) => {
                            return value > 0 ? value : "";
                          },
                        },
                      },
                    }}
                    data={dataByDuration.noOfPayment[selectedDuration]}
                  />
                </div>
                <div className="col-sm-4 mt-3">
                  {" "}
                  <Bar
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "none",
                        },
                        title: {
                          display: true,
                          text: "Joined candidate",
                          padding: {
                            top: 0,
                            bottom: 30,
                          },
                          fontSize: 16,
                          // fontSize: 40,
                        },
                        datalabels: {
                          anchor: "end",
                          align: "end",
                          display: (context) => {
                            const value =
                              context.dataset.data[context.dataIndex];
                            return value > 0;
                          },
                          formatter: (value) => {
                            return value > 0 ? value : "";
                          },
                        },
                      },
                    }}
                    data={dataByDuration.Incomplete[selectedDuration]}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-sm-4 mt-3">
                  {" "}
                  <Bar
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "none",
                        },
                        title: {
                          display: true,
                          text: "Rejected candidate",
                          padding: {
                            top: 0,
                            bottom: 30,
                          },
                          fontSize: 16,
                          // fontSize: 40,
                        },
                        datalabels: {
                          anchor: "end",
                          align: "end",
                          display: (context) => {
                            const value =
                              context.dataset.data[context.dataIndex];
                            return value > 0;
                          },
                          formatter: (value) => {
                            return value > 0 ? value : "";
                          },
                        },
                      },
                    }}
                    data={dataByDuration.Incomplete[selectedDuration]}
                  />
                </div>
                <div className="col-sm-4 mt-3">
                  {" "}
                  <Bar
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "none",
                        },
                        title: {
                          display: true,
                          text: "Candidate qualified",
                          padding: {
                            top: 0,
                            bottom: 30,
                          },
                          fontSize: 16,
                          // fontSize: 40,
                        },
                        datalabels: {
                          anchor: "end",
                          align: "end",
                          display: (context) => {
                            const value =
                              context.dataset.data[context.dataIndex];
                            return value > 0;
                          },
                          formatter: (value) => {
                            return value > 0 ? value : "";
                          },
                        },
                      },
                    }}
                    data={dataByDuration.noOfPayment[selectedDuration]}
                  />
                </div>
                <div className="col-sm-4 mt-3">
                  {" "}
                  <Bar
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "none",
                        },
                        title: {
                          display: true,
                          text: "Candidate notqualified",
                          padding: {
                            top: 0,
                            bottom: 30,
                          },
                          fontSize: 16,
                          // fontSize: 40,
                        },
                        datalabels: {
                          anchor: "end",
                          align: "end",
                          display: (context) => {
                            const value =
                              context.dataset.data[context.dataIndex];
                            return value > 0;
                          },
                          formatter: (value) => {
                            return value > 0 ? value : "";
                          },
                        },
                      },
                    }}
                    data={dataByDuration.Incomplete[selectedDuration]}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-sm-4 mt-3">
                  {" "}
                  <Bar
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "none",
                        },
                        title: {
                          display: true,
                          text: "Closed jobs",
                          padding: {
                            top: 0,
                            bottom: 30,
                          },
                          fontSize: 16,
                          // fontSize: 40,
                        },
                        datalabels: {
                          anchor: "end",
                          align: "end",
                          display: (context) => {
                            const value =
                              context.dataset.data[context.dataIndex];
                            return value > 0;
                          },
                          formatter: (value) => {
                            return value > 0 ? value : "";
                          },
                        },
                      },
                    }}
                    data={dataByDuration.Incomplete[selectedDuration]}
                  />
                </div>
                <div className="col-sm-4 mt-3">
                  {" "}
                  <Bar
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "none",
                        },
                        title: {
                          display: true,
                          text: "Retension jobs",
                          padding: {
                            top: 0,
                            bottom: 30,
                          },
                          fontSize: 16,
                          // fontSize: 40,
                        },
                        datalabels: {
                          anchor: "end",
                          align: "end",
                          display: (context) => {
                            const value =
                              context.dataset.data[context.dataIndex];
                            return value > 0;
                          },
                          formatter: (value) => {
                            return value > 0 ? value : "";
                          },
                        },
                      },
                    }}
                    data={dataByDuration.noOfPayment[selectedDuration]}
                  />
                </div>
              </div>
            </>
          )}
          {!showJobseeker && (
            <div className="text-end mt-2 ">
              <span
                className={`${superAdminStyle.ArrowDown}`}
                onClick={() => setshowJobseeker(true)}
              >
                <AiOutlineArrowDown />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
