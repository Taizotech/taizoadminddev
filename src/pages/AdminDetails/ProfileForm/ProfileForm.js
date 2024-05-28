import React from "react";
import style from "./profile_form.module.scss";
import { useSelector } from "react-redux";
import DailyAnalyticsEmployer from "./component/DailyAnalyticsEmployer";
import DailyAnalyticsJobSeeker from "./component/DailyAnalyticsJobSeeker";
import DailyAnalyticsEmployerField from "./component/DailyAnalyticsEmployerField";
// import style from "../../Filter/Jobs/job_link.module.scss";

function ProfileForm() {
  const adminDetails = useSelector((state) => state.adminDetails);

  return (
    <div className="">
      <div
        className={`container p-3 ${style.form_wrp}`}
        style={{
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
        }}
      >
        <div className="text-center mt-4 mb-3">
          <h3>Daily Analytics</h3>
        </div>
        {adminDetails.module === "Employer" && (
          <>
            <DailyAnalyticsEmployer />
          </>
        )}
        {adminDetails.module === "JobSeeker" && (
          <>
            <DailyAnalyticsJobSeeker />
          </>
        )}
        {adminDetails.module === "EmployerField" && (
          <>
            <DailyAnalyticsEmployerField />
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileForm;
