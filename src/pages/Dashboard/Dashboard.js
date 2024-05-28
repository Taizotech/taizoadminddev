import React, { useState, useEffect } from "react";

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
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Getdashboard } from "../../apiServices";
import AdminAccess from "../AdminDetails/accessControl";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Employer");
  const [selectedDuration, setSelectedDuration] = useState("daily");
  const handleSelectChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
  };

  const handleDurationChange = (event) => {
    console.log("Duration changed:", event.target.value);
    setSelectedDuration(event.target.value);
  };
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
    <>
      <div>
        <AdminAccess />

        <div className="">
          <div className="container-fluid">
            {" "}
            <span className="row mb-2 d-flex justify-content-end">
              <span className="col-sm-3 ">
                <Box sx={{ minWidth: 20 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Module
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select module"
                      onChange={(e) => {
                        handleSelectChange(e);
                      }}
                      value={selectedOption}
                    >
                      <MenuItem value={"Employer"}>Employer</MenuItem>

                      <MenuItem value={"Jobseeker"}>Job seeker</MenuItem>

                      <MenuItem value={"Jobs"}>Jobs</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </span>
              <div className="col-sm-2">
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Time</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Time"
                      onChange={handleDurationChange}
                      value={selectedDuration}
                    >
                      <MenuItem value={"daily"}>Daily</MenuItem>
                      <MenuItem value={"weekly"}>Weekly</MenuItem>
                      <MenuItem value={"monthly"}>Monthly</MenuItem>
                      {/* <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </span>
          </div>
          {selectedOption === "Employer" && (
            <div
              className="card border-0 "
              style={{
                height: "68vh",
                overflow: "hidden",
                padding:"1spx",
                borderRadius: "8px",
                boxShadow: "0px 0px 5px 1px rgba(157, 157, 157, 0.2)",
              }}
            >
              <div className="container-fluid">
                <div style={{ display: "inline" }}>
                  <>
                    <br />
                    <br />
                    <div className="row mt-5 ms-2 mb-5 me-2 d-flex ">
                      <div className="col-sm-6">
                        <div className="me-2" style={{ cursor: "pointer" }}>
                          <Bar
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "none",
                                },
                                title: {
                                  display: true,
                                  text: " Incomplete Registration",
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
                      <div className="col-sm-6 ">
                        <div className="me-2" style={{ cursor: "pointer" }}>
                          <Bar
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "none",
                                },
                                title: {
                                  display: true,
                                  text: " Registration", // Change the title here
                                  padding: {
                                    top: 0,
                                    bottom: 30,
                                  },
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
                            data={dataByDuration.Registration[selectedDuration]}
                          />
                        </div>
                      </div>
                      {/* <div className="col-sm-4">
                        <div className="me-2" style={{ cursor: "pointer" }}>
                          <Bar
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "none",
                                },
                                title: {
                                  display: true,
                                  text: " Payment", // Change the title here
                                  padding: {
                                    top: 0,
                                    bottom: 30,
                                  },
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
                      </div> */}
                    </div>
                    <br />
                    <div className="row mt-3 ms-2  mb-2 me-2">
                      {/* <div className="col-sm-4 ">
                        <div className="me-2" style={{ cursor: "pointer" }}>
                          <Bar
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "none",
                                },
                                title: {
                                  display: true,
                                  text: " Plan Cancelled", // Change the title here
                                  padding: {
                                    top: 0,
                                    bottom: 30,
                                  },
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
                            data={dataByDuration.planCanceled[selectedDuration]}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4 ">
                        <div className="me-2" style={{ cursor: "pointer" }}>
                          <Bar
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "none",
                                },
                                title: {
                                  display: true,
                                  text: " Calls", // Change the title here
                                  padding: {
                                    top: 0,
                                    bottom: 30,
                                  },
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
                            data={dataByDuration.noOfCalls[selectedDuration]}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4 ">
                        <div className="me-2" style={{ cursor: "pointer" }}>
                          <Bar
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "none",
                                },
                                title: {
                                  display: true,
                                  text: " Total Payment", // Change the title here
                                  padding: {
                                    top: 0,
                                    bottom: 30,
                                  },
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
                      </div> */}
                      
                    </div>
                    <br />
                    <div className="row mt-3 mb-5 ms-2 me-2">
                    {/* <div className="col-sm-4 mt-5 px-3">
                        <div className="me-2" style={{ cursor: "pointer" }}>
                          <Bar
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "none",
                                },
                                title: {
                                  display: true,
                                  text: " Feedback",
                                  padding: {
                                    top: 0,
                                    bottom: 30,
                                  },
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
                            data={dataByDuration.feedback[selectedDuration]}
                          />
                        </div>
                      </div> */}
                    </div>
                  </>
                </div>
              </div>
            </div>
          )}
          {selectedOption === "Jobseeker" && (
            <div
              className="card border-0 "
              style={{
                height: "68vh",
                overflow: "auto",
                borderRadius: "8px",
                boxShadow: "0px 5px 5px 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="container-fluid">
                <div style={{ display: "inline" }}>
                  <>
                    <br />
                    <br />
                    <div className="row mt-5 ms-2 mb-5 me-2 d-flex ">
                      <div className="col-sm-4 ">
                        <div className="me-2" style={{ cursor: "pointer" }}>
                          <Bar
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "none",
                                },
                                title: {
                                  display: true,
                                  text: "Incomplete Registration", // Change the title here
                                  padding: {
                                    top: 0,
                                    bottom: 30,
                                  },
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
                      <div className="col-sm-4">
                        <div className="me-2" style={{ cursor: "pointer" }}>
                          <Bar
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "none",
                                },
                                title: {
                                  display: true,
                                  text: "Registration",
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
                            data={dataByDuration.Registration[selectedDuration]}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="me-2" style={{ cursor: "pointer" }}>
                          <Bar
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "none",
                                },
                                title: {
                                  display: true,
                                  text: " Interview Scheduled",
                                  padding: {
                                    top: 0,
                                    bottom: 30,
                                  },
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
                            data={
                              dataByDuration.interviewScheduled[
                                selectedDuration
                              ]
                            }
                          />
                        </div>
                      </div>
                      {/* <div className="col-sm-4">
                        <div className="me-2" style={{ cursor: "pointer" }}>
                          <Bar
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "none",
                                },
                                title: {
                                  display: true,
                                  text: "Calls", // Change the title here
                                  padding: {
                                    top: 0,
                                    bottom: 30,
                                  },
                                },
                                datalabels: {
                                  anchor: "end", // Position of the data count label (e.g., 'start', 'end', 'center')
                                  align: "end", // Alignment of the data count label (e.g., 'start', 'end', 'center')
                                  display: "auto", // Show data count labels automatically
                                },
                              },
                            }}
                            data={dataByDuration.noOfCalls[selectedDuration]}
                          />
                        </div>
                      </div> */}
                    </div>
                    <br />
                    <div className="row mt-3 ms-2  mb-2 me-2">
                      {/* <div className="col-sm-4 ">
                        <div className="me-2" style={{ cursor: "pointer" }}>
                          <Bar
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "none",
                                },
                                title: {
                                  display: true,
                                  text: "Ratings", // Change the title here
                                  padding: {
                                    top: 0,
                                    bottom: 30,
                                  },
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
                            data={dataByDuration.Ratings[selectedDuration]}
                          />
                        </div>
                      </div> */}
                      {/* <div className="col-sm-4 ">
                        <div className="me-2" style={{ cursor: "pointer" }}>
                          <Bar
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "none",
                                },
                                title: {
                                  display: true,
                                  text: "Payment", // Change the title here
                                  padding: {
                                    top: 0,
                                    bottom: 30,
                                  },
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
                      </div> */}
                      {/* <div className="col-sm-4 ">
                        <div className="me-2" style={{ cursor: "pointer" }}>
                          <Bar
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "none",
                                },
                                title: {
                                  display: true,
                                  text: " Total Payment", // Change the title here
                                  padding: {
                                    top: 0,
                                    bottom: 30,
                                  },
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
                      </div> */}
                    </div>
                    <br />
                    <div className="row mt-3 mb-3 ms-2 me-2">
                      
                    </div>
                  </>
                </div>
              </div>
            </div>
          )}
          {selectedOption === "Jobs" && (
            <div
              className="card border-0 "
              style={{
                height: "68vh",
                overflow: "auto",
                borderRadius: "8px",
                boxShadow: "0px 5px 5px 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="container-fluid">
                <div style={{ display: "inline" }}>
                  <>
                    <br />
                    <br />
                    <div className="row mt-5 ms-2 mb-5 me-2 d-flex ">
                      <div className="col-sm-4 ">
                        <div className="me-2" style={{ cursor: "pointer" }}>
                          <Bar
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "none",
                                },
                                title: {
                                  display: true,
                                  text: "Total Jobs", // Change the title here
                                  padding: {
                                    top: 0,
                                    bottom: 30,
                                  },
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
                            data={dataByDuration.TotalJobs[selectedDuration]}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="me-2" style={{ cursor: "pointer" }}>
                          <Bar
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "none",
                                },
                                title: {
                                  display: true,
                                  text: "Active Jobs",
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
                            data={dataByDuration.ActiveJobs[selectedDuration]}
                          />
                        </div>
                      </div>

                      <div className="col-sm-4">
                        <div className="me-2" style={{ cursor: "pointer" }}>
                          <Bar
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "none",
                                },
                                title: {
                                  display: true,
                                  text: "Closed Jobs", // Change the title here
                                  padding: {
                                    top: 0,
                                    bottom: 30,
                                  },
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
                            data={dataByDuration.ClosedJobs[selectedDuration]}
                          />
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="row mt-3 ms-2  mb-2 me-2">
                      <div className="col-sm-4 ">
                        <div className="me-2" style={{ cursor: "pointer" }}>
                          <Bar
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "none",
                                },
                                title: {
                                  display: true,
                                  text: "Job Lead ", // Change the title here
                                  padding: {
                                    top: 0,
                                    bottom: 30,
                                  },
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
                            data={dataByDuration.JobLead[selectedDuration]}
                          />
                        </div>
                      </div>
                      {/* <div className="col-sm-4 ">
                        <div className="me-2" style={{ cursor: "pointer" }}>
                          <Bar
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "none",
                                },
                                title: {
                                  display: true,
                                  text: "Response", // Change the title here
                                  padding: {
                                    top: 0,
                                    bottom: 30,
                                  },
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
                            data={dataByDuration.Response[selectedDuration]}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4 ">
                        <div className="me-2" style={{ cursor: "pointer" }}>
                          <Bar
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: "none",
                                },
                                title: {
                                  display: true,
                                  text: " Ratings", // Change the title here
                                  padding: {
                                    top: 0,
                                    bottom: 30,
                                  },
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
                            data={dataByDuration.JobRatings[selectedDuration]}
                          />
                        </div>
                      </div> */}
                    </div>
                    <br />
                  </>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
