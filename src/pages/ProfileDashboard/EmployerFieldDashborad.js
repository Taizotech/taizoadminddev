/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import { TextField } from "@mui/material";
import style from "./profile.module.scss";
// import { Getdashboard } from "../../apiServices";
import { useSelector } from "react-redux";
import { GetprofileDashboard } from "../../apiServices";
import { RiChatFollowUpFill } from "react-icons/ri";

import { AiFillDollarCircle, AiTwotoneFileAdd } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { HiMiniUserPlus } from "react-icons/hi2";

function EmployerFieldDashboard() {
  const adminDetails = useSelector((state) => state.adminDetails);

  console.log(adminDetails, "adminDetaollsssss");
  const [dateValue, setDateValue] = useState({
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
  });
  //   const [selectModule, setSelectModule] = useState("Jobseeker");
  const [dashboardData, setDashboardData] = useState({
    empFieldNewLeadCount: "",
    empFieldFollowUpCount: "",
    empFieldFollowUpVisitCount: "",
    empFieldNewVisitCount: "",
    empFieldNoOfPaymentCount: "",
  });

  useEffect(() => {
    GetprofileDashboard(dateValue).then((data) => {
      console.log(data);
      if (data.code === 404) {
        setDashboardData({
          empFieldNewLeadCount: "",
          empFieldFollowUpCount: "",
          empFieldFollowUpVisitCount: "",
          empFieldNewVisitCount: "",
          empFieldNoOfPaymentCount: "",
        });
      } else {
        const empFollowUpCount = data
          .map((item) => item.empFollowUpCount)
          .reduce((acc, current) => acc + current, 0);
        const empNoOfCalls = data
          .map((item) => item.empNoOfCalls)
          .reduce((acc, current) => acc + current, 0);
        const empQualifiedCount = data
          .map((item) => item.empQualifiedCount)
          .reduce((acc, current) => acc + current, 0);
        const empNotQualifiedCount = data
          .map((item) => item.empNotQualifiedCount)
          .reduce((acc, current) => acc + current, 0);
        const empNewLeadCount = data
          .map((item) => item.empNewLeadCount)
          .reduce((acc, current) => acc + current, 0);
        const empNoOfPayment = data
          .map((item) => item.empNoOfPayment)
          .reduce((acc, current) => acc + current, 0);
        const canTotalChatCount = data
          .map((item) => item.canTotalChatCount)
          .reduce((acc, current) => acc + current, 0);
        const canNoOfCalls = data
          .map((item) => item.canNoOfCalls)
          .reduce((acc, current) => acc + current, 0);
        const canQualifiedCount = data
          .map((item) => item.canQualifiedCount)
          .reduce((acc, current) => acc + current, 0);
        const canNotQualifiedCount = data
          .map((item) => item.canNotQualifiedCount)
          .reduce((acc, current) => acc + current, 0);
        const canInterviewScheduledCount = data
          .map((item) => item.canInterviewScheduledCount)
          .reduce((acc, current) => acc + current, 0);
        const canInterviewAttendedCount = data
          .map((item) => item.canInterviewAttendedCount)
          .reduce((acc, current) => acc + current, 0);
        const canInterviewSelectedCount = data
          .map((item) => item.canInterviewSelectedCount)
          .reduce((acc, current) => acc + current, 0);
        const canInterviewJoinedCount = data
          .map((item) => item.canInterviewJoinedCount)
          .reduce((acc, current) => acc + current, 0);
        const canInterviewRejectedCount = data
          .map((item) => item.canInterviewRejectedCount)
          .reduce((acc, current) => acc + current, 0);
        const closedJobCount = data
          .map((item) => item.closedJobCount)
          .reduce((acc, current) => acc + current, 0);
        const retentionCount = data
          .map((item) => item.retentionCount)
          .reduce((acc, current) => acc + current, 0);
        const empFieldNewLeadCount = data
          .map((item) => item.empFieldNewLeadCount)
          .reduce((acc, current) => acc + current, 0);
        const empFieldFollowUpCount = data
          .map((item) => item.empFieldFollowUpCount)
          .reduce((acc, current) => acc + current, 0);
        const empFieldFollowUpVisitCount = data
          .map((item) => item.empFieldFollowUpVisitCount)
          .reduce((acc, current) => acc + current, 0);
        const empFieldNewVisitCount = data
          .map((item) => item.empFieldNewVisitCount)
          .reduce((acc, current) => acc + current, 0);
        const empFieldNoOfPaymentCount = data
          .map((item) => item.empFieldNoOfPaymentCount)
          .reduce((acc, current) => acc + current, 0);
        const filteredData = data.filter((el) => {
          return el.module == adminDetails.module;
        });
        console.log(filteredData, "filterredd data");
        // setDateValue((pre) => ({
        //   ...pre,
        //   startDate: new Date().toISOString().slice(0, 10),
        //   endDate: new Date().toISOString().slice(0, 10),
        // }));
        setDashboardData({
          empFieldNewLeadCount,
          empFieldFollowUpCount,
          empFieldFollowUpVisitCount,
          empFieldNewVisitCount,
          empFieldNoOfPaymentCount,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateValue]);
  const handleStartDateChange = (event) => {
    const dateValue = new Date(event.target.value).toISOString().slice(0, 10);
    setDateValue({ ...dateValue, startDate: dateValue });
    console.log(event.target.value, "sdjfkj");
  };

  const handleEndDateChange = (event) => {
    const dateValue = new Date(event.target.value).toISOString().slice(0, 10);
    setDateValue({ ...dateValue, endDate: dateValue });
  };
  // useEffect(()=>{
  //   GetprofileDashboard()
  // })
  return (
    <>
      <div className="d-flex justify-content-end">
        <div className="row">
          <div className="col-sm-6  mt-3">
            <TextField
              type="date"
              label="Start Date"
              variant="outlined"
              fullWidth
              value={dateValue.startDate}
              // onChange={(e) => setDateValue}
              onChange={(e) =>
                setDateValue((prev) => ({
                  ...prev,
                  startDate: e.target.value,
                }))
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="col-sm-6  mt-3">
            <TextField
              type="date"
              label="End Date"
              variant="outlined"
              fullWidth
              value={dateValue.endDate}
              // onChange={(e) => handleEndDateChange(e)}
              onChange={(e) =>
                setDateValue((prev) => ({
                  ...prev,
                  endDate: e.target.value,
                }))
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
      </div>
      <div className="">
        <div className="container-fluid">
          <div className="row mt-1">
            <div className="col-sm-3 mt-3">
              <div className={`card rounded-3 border-0 ${style.card} `}>
                <div className="p-3">
                  {" "}
                  <h4 className="d-flex justify-content-end">
                    <div
                      className="p-2 rounded-circle d-flex align-items-center"
                      style={{
                        backgroundColor: "rgba(100, 89, 217, 0.217)",
                        color: "rgb(99, 89, 217)",
                      }}
                    >
                      {" "}
                      <RiChatFollowUpFill />
                    </div>{" "}
                  </h4>
                  <h2>
                    {dashboardData.empFieldFollowUpCount
                      ? dashboardData.empFieldFollowUpCount
                      : 0}
                  </h2>
                  <p style={{ color: "rgb(99, 89, 217)" }}>Follow Up</p>
                </div>
              </div>
            </div>
            <div className="col-sm-3 mt-3">
              <div className={`card rounded-3 border-0 ${style.card} `}>
                <div className="p-3">
                  {" "}
                  <h4 className="d-flex justify-content-end">
                    <div
                      className="p-2 rounded-circle d-flex align-items-center"
                      style={{
                        backgroundColor: "rgba(173, 2, 236, 0.217)",
                        color: "rgb(173, 2, 236)",
                      }}
                    >
                      {" "}
                      <HiMiniUserPlus />
                    </div>{" "}
                  </h4>
                  <h2>
                    {dashboardData.empFieldFollowUpVisitCount
                      ? dashboardData.empFieldFollowUpVisitCount
                      : 0}
                  </h2>
                  <p style={{ color: "rgb(173, 2, 236)" }}>Follow up Visit</p>
                </div>
              </div>
            </div>
            <div className="col-sm-3 mt-3">
              <div className={`card rounded-3 border-0 ${style.card} `}>
                <div className="p-3">
                  {" "}
                  <h4 className="d-flex justify-content-end ">
                    <div
                      className="p-2 rounded-circle d-flex align-items-center"
                      style={{
                        backgroundColor: "rgba(200, 71, 2, 0.24)",
                        color: "rgb(200, 71, 2)",
                      }}
                    >
                      <FaUsers />
                    </div>
                  </h4>
                  <h2>
                    {dashboardData.empFieldNewVisitCount
                      ? dashboardData.empFieldNewVisitCount
                      : 0}
                  </h2>
                  <p style={{ color: "rgb(200, 71, 2)" }}>New Visit</p>
                </div>
              </div>
            </div>
            <div className="col-sm-3 mt-3">
              <div className={`card rounded-3 border-0 ${style.card} `}>
                <div className="p-3">
                  {" "}
                  <h4 className="d-flex justify-content-end ">
                    <div
                      className="p-2 rounded-circle d-flex align-items-center"
                      style={{
                        backgroundColor: "rgba(1, 178, 39, 0.361)",
                        color: "rgb(1, 178, 39)",
                      }}
                    >
                      <AiTwotoneFileAdd />
                    </div>
                  </h4>
                  <h2>
                    {dashboardData.empFieldNewLeadCount
                      ? dashboardData.empFieldNewLeadCount
                      : 0}
                  </h2>
                  <p style={{ color: "rgb(1, 178, 39)" }}>New Lead</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-sm-3 mt-3">
              <div className={`card rounded-3 border-0 ${style.card} `}>
                <div className="p-3">
                  {" "}
                  <h4 className="d-flex justify-content-end ">
                    <div
                      className="p-2 rounded-circle d-flex align-items-center"
                      style={{
                        backgroundColor: "rgba(25, 2, 200, 0.24)",
                        color: "rgb(25, 2, 200)",
                      }}
                    >
                      <AiFillDollarCircle />
                    </div>
                  </h4>
                  <h2>
                    {dashboardData.empFieldNoOfPaymentCount
                      ? dashboardData.empFieldNoOfPaymentCount
                      : 0}
                  </h2>
                  <p style={{ color: "rgb(25, 2, 200)" }}>Payment</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            {/* <div className="col-sm-3 mt-3">
                    <div className={`card rounded-3 border-0 ${style.card} `}>
                      <div className="p-3">
                        {" "}
                        <h4 className="d-flex justify-content-end">
                          <div
                            className="p-2 rounded-circle d-flex align-items-center"
                            style={{
                              backgroundColor: "rgba(144, 2, 200, 0.285)",
                              color: "rgb(144, 2, 200)",
                            }}
                          >
                            {" "}
                            <FaUserCheck />
                          </div>{" "}
                        </h4>
                        <h2>{dashboardData.canInterviewJoinedCount}</h2>
                        <p style={{ color: "rgb(144, 2, 200)" }}>
                          Joined Candidate
                        </p>
                      </div>
                    </div>
                  </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployerFieldDashboard;
