/* eslint-disable no-unused-vars */
import React from "react";
import EmployerProfileDashboard from "./EmployerProfileDashboard";
import JobseekerProfileDashboard from "./JobseekerProfileDashboard";
import EmployerFieldDashboard from "./EmployerFieldDashborad";
import { useSelector } from "react-redux";
import SuperAdminDashboard from "./superAdmin/SuperAdminDashboard";
import style from "./profile.module.scss";
function ProfileDashboard() {
  const adminDetails = useSelector((state) => state.adminDetails);

  return (
    <div className={`${style.bodyColor}`}>
      <div className="">
        <div className={`container-fluid ${style.height}`}>
          {adminDetails.module === "Employer" && <EmployerProfileDashboard />}
          {adminDetails.module === "JobSeeker" && <JobseekerProfileDashboard />}
          {adminDetails.module === "EmployerField" && (
            <EmployerFieldDashboard />
          )}
          {/* {adminDetails.module === "" && <SuperAdminDashboard />} */}
        </div>
      </div>
    </div>
  );
}

export default ProfileDashboard;
