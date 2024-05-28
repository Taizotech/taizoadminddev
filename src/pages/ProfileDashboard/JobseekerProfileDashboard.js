/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import { TextField } from "@mui/material";
import style from "./profile.module.scss";
import { useSelector } from "react-redux";
import { GetprofileDashboard } from "../../apiServices";
import { RiChatFollowUpFill, RiFileAddFill } from "react-icons/ri";
import {
  BsArrowReturnLeft,
  BsCheckLg,
  BsFileEarmarkExcelFill,
  BsTelephoneFill,
} from "react-icons/bs";
import { BiSolidSelectMultiple } from "react-icons/bi";

import { AiFillSchedule, AiOutlineClose } from "react-icons/ai";
import { FaUserAltSlash, FaUserCheck, FaWindowClose } from "react-icons/fa";
import { MdSpeakerNotesOff } from "react-icons/md";

function JobseekerProfileDashboard() {
  const adminDetails = useSelector((state) => state.adminDetails);

  console.log(adminDetails, "adminDetaollsssss");
  const [dateValue, setDateValue] = useState({
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
  });
  //   const [selectModule, setSelectModule] = useState("Jobseeker");
  const [dashboardData, setDashboardData] = useState({
    canTotalChatCount: "",
    canNoOfCalls: "",
    canQualifiedCount: "",
    canNotQualifiedCount: "",
    canInterviewScheduledCount: "",
    canInterviewAttendedCount: "",
    canInterviewNotAttendedCount: "",
    canInterviewSelectedCount: "",
    canInterviewNotSelectedCount: "",
    canInterviewJoinedCount: "",
    canInterviewRejectedCount: "",
    closedJobCount: "",
    retentionCount: "",
  });

  useEffect(() => {
    GetprofileDashboard(dateValue).then((data) => {
      console.log(data);
      if (data.code === 404) {
        setDashboardData({
          canTotalChatCount: "",
          canNoOfCalls: "",
          canQualifiedCount: "",
          canNotQualifiedCount: "",
          canInterviewScheduledCount: "",
          canInterviewAttendedCount: "",
          canInterviewNotAttendedCount: "",
          canInterviewSelectedCount: "",
          canInterviewNotSelectedCount: "",
          canInterviewJoinedCount: "",
          canInterviewRejectedCount: "",
          closedJobCount: "",
          retentionCount: "",
        });
      } else {
        const canTotalChatCount = data
          .map((item) => item.canTotalChatCount)
          .reduce((acc, current) => acc + current, 0);
        const canNoOfCalls = data
          .map((item) => item.canNoOfCalls)
          .reduce((acc, current) => acc + current, 0);
        const canQualifiedCount = data
          .map((item) => item.canQualifiedCount)
          .reduce((acc, current) => acc + current, 0);
        console.log(canQualifiedCount, "canQualifiedCount");
        const canNotQualifiedCount = data
          .map((item) => item.canNotQualifiedCount)
          .reduce((acc, current) => acc + current, 0);
        const canInterviewScheduledCount = data
          .map((item) => item.canInterviewScheduledCount)
          .reduce((acc, current) => acc + current, 0);
        const canInterviewAttendedCount = data
          .map((item) => item.canInterviewAttendedCount)
          .reduce((acc, current) => acc + current, 0);
        const canInterviewNotAttendedCount = data
          .map((item) => item.canInterviewNotAttendedCount)
          .reduce((acc, current) => acc + current, 0);
        const canInterviewSelectedCount = data
          .map((item) => item.canInterviewSelectedCount)
          .reduce((acc, current) => acc + current, 0);
        const canInterviewNotSelectedCount = data
          .map((item) => item.canInterviewNotSelectedCount)
          .reduce((acc, current) => acc + current, 0);
        const canInterviewJoinedCount = data
          .map((item) => item.canInterviewJoinedCount)
          .reduce((acc, current) => acc + current, 0);
        const canInterviewRejectedCount = data
          .map((item) => item.canInterviewOfferRejectedCount)
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
          canTotalChatCount,
          canNoOfCalls,
          canQualifiedCount,
          canNotQualifiedCount,
          canInterviewScheduledCount,
          canInterviewAttendedCount,
          canInterviewNotAttendedCount,
          canInterviewSelectedCount,
          canInterviewNotSelectedCount,
          canInterviewJoinedCount,
          canInterviewRejectedCount,
          closedJobCount,
          retentionCount,
          // empFieldNewLeadCount,
          // empFieldFollowUpCount,
          // empFieldFollowUpVisitCount,
          // empFieldNewVisitCount,
          // empFieldNoOfPaymentCount,
        });
      }
    });
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
      {/* {adminDetails.module === "Jobseeker" && ( */}
      <div className="d-flex justify-content-end">
        <div className="row">
          <div className="col-sm-6  mt-1">
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
          <div className="col-sm-6  mt-1">
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
        {/* // )} */}
      </div>

      <div className="row ">
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
              <h3>
                {dashboardData.canTotalChatCount
                  ? dashboardData.canTotalChatCount
                  : 0}
              </h3>
              <p style={{ color: "rgb(99, 89, 217)" }}>Total Chat</p>
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
                    backgroundColor: "rgba(218, 77, 176, 0.285)",
                    color: "rgb(218, 77, 176)",
                  }}
                >
                  <BsTelephoneFill />
                </div>
              </h4>
              <h3>
                {dashboardData.canNoOfCalls ? dashboardData.canNoOfCalls : 0}
              </h3>
              <p style={{ color: "rgb(218, 77, 176)" }}>Total Calls</p>
            </div>
          </div>
        </div>
        <div className="col-sm-3 mt-3">
          <div className={`card rounded-3 border-0 ${style.card} `}>
            <div className="p-3">
              <h4 className="d-flex justify-content-end ">
                <div
                  className="p-2 rounded-circle d-flex align-items-center"
                  style={{
                    backgroundColor: "rgba(154, 227, 160, 0.413)",
                    color: "#169c50",
                  }}
                >
                  <BsCheckLg />
                </div>
              </h4>
              <h3>
                {dashboardData.canQualifiedCount
                  ? dashboardData.canQualifiedCount
                  : 0}
              </h3>
              <p style={{ color: "#169c50" }}>Qualified</p>
            </div>
          </div>
        </div>
        <div className="col-sm-3 mt-3">
          <div className={`card rounded-3 border-0 ${style.card} `}>
            <div className="p-3">
              <h4 className="d-flex justify-content-end ">
                <div
                  className="p-2 rounded-circle d-flex align-items-center"
                  style={{
                    backgroundColor: "rgba(217, 89, 89, 0.217)",
                    color: "rgb(218,77,77)",
                  }}
                >
                  <AiOutlineClose />
                </div>
              </h4>
              <h3>
                {dashboardData.canNotQualifiedCount
                  ? dashboardData.canNotQualifiedCount
                  : 0}
              </h3>
              <p style={{ color: "rgb(218,77,77)" }}>Not Qualified</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-1">
        <div className="col-sm-3 mt-3">
          <div className={`card rounded-3 border-0 ${style.card} `}>
            <div className="p-3">
              {" "}
              <h4 className="d-flex justify-content-end">
                <div
                  className="p-2 rounded-circle d-flex align-items-center"
                  style={{
                    backgroundColor: "rgba(98, 200, 2, 0.171)",
                    color: "rgb(98, 200, 2)",
                  }}
                >
                  {" "}
                  <AiFillSchedule />
                </div>{" "}
              </h4>
              <h3>
                {dashboardData.canInterviewScheduledCount
                  ? dashboardData.canInterviewScheduledCount
                  : 0}
              </h3>
              <p style={{ color: "rgb(98, 200, 2)" }}>Interview Scheduled</p>
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
                    backgroundColor: "rgba(200, 2, 55, 0.263)",
                    color: "rgba(200, 2, 55)",
                  }}
                >
                  {" "}
                  <RiFileAddFill />
                </div>{" "}
              </h4>
              <h3>
                {dashboardData.canInterviewAttendedCount
                  ? dashboardData.canInterviewAttendedCount
                  : 0}
              </h3>
              <p style={{ color: "rgba(200, 2, 55)" }}>Interview Attended</p>
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
                    backgroundColor: "rgba(200, 2, 55, 0.263)",
                    color: "rgba(200, 2, 55)",
                  }}
                >
                  {" "}
                  <MdSpeakerNotesOff />
                </div>{" "}
              </h4>
              <h3>
                {dashboardData.canInterviewNotAttendedCount
                  ? dashboardData.canInterviewNotAttendedCount
                  : 0}
              </h3>
              <p style={{ color: "rgba(200, 2, 55)" }}>
                Interview Not Attended
              </p>
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
                    backgroundColor: "rgba(2, 200, 177, 0.263)",
                    color: "rgb(2, 200, 177)",
                  }}
                >
                  {" "}
                  <BiSolidSelectMultiple />
                </div>{" "}
              </h4>
              <h3>
                {dashboardData.canInterviewSelectedCount
                  ? dashboardData.canInterviewSelectedCount
                  : 0}
              </h3>
              <p style={{ color: "rgb(2, 200, 177)" }}>Selected Candidate</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-1 ">
        <div className="col-sm-3 mt-3">
          <div className={`card rounded-3 border-0 ${style.card} `}>
            <div className="p-3">
              {" "}
              <h4 className="d-flex justify-content-end">
                <div
                  className="p-2 rounded-circle d-flex align-items-center"
                  style={{
                    backgroundColor: "#fb183e4f",
                    color: "#fb183e ",
                  }}
                >
                  {" "}
                  <FaUserAltSlash />
                </div>{" "}
              </h4>
              <h3>
                {dashboardData.canInterviewNotSelectedCount
                  ? dashboardData.canInterviewNotSelectedCount
                  : 0}
              </h3>
              <p style={{ color: "#fb183e" }}>Not Selected Candidate</p>
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
                    backgroundColor: "rgba(144, 2, 200, 0.285)",
                    color: "rgb(144, 2, 200)",
                  }}
                >
                  {" "}
                  <FaUserCheck />
                </div>{" "}
              </h4>
              <h3>
                {dashboardData.canInterviewJoinedCount
                  ? dashboardData.canInterviewJoinedCount
                  : 0}
              </h3>
              <p style={{ color: "rgb(144, 2, 200)" }}>Joined Candidate</p>
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
                    backgroundColor: "#fb181833",
                    color: "#fb1818d7 ",
                  }}
                >
                  {" "}
                  <BsFileEarmarkExcelFill />
                </div>{" "}
              </h4>
              <h2>
                {dashboardData.canInterviewRejectedCount
                  ? dashboardData.canInterviewRejectedCount
                  : 0}
              </h2>
              <p style={{ color: "#fb1818d7 " }}>Offer Rejected</p>
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
                    backgroundColor: "#fd320a4f",
                    color: " #fd330a",
                  }}
                >
                  {" "}
                  <FaWindowClose />
                </div>{" "}
              </h4>
              <h3>
                {dashboardData.closedJobCount
                  ? dashboardData.closedJobCount
                  : 0}
              </h3>
              <p style={{ color: "#fd330a" }}>Closed Jobs</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-1 mb-5">
        <div className="col-sm-3 mt-3">
          <div className={`card rounded-3 border-0 ${style.card} `}>
            <div className="p-3">
              {" "}
              <h4 className="d-flex justify-content-end">
                <div
                  className="p-2 rounded-circle d-flex align-items-center"
                  style={{
                    backgroundColor: "#1d81015e",
                    color: "#1d8101",
                  }}
                >
                  {" "}
                  <BsArrowReturnLeft />
                </div>{" "}
              </h4>
              <h3>
                {dashboardData.retentionCount
                  ? dashboardData.retentionCount
                  : 0}
              </h3>
              <p style={{ color: "#1d8101" }}>Retension Jobs</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobseekerProfileDashboard;
