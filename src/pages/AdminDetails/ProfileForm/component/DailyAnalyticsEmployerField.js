import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { PostDailyReports } from "../../../../apiServices";
import { MyModal, numbersOnlyTest } from "../../../../utility";
import ModalContainer from "../../../../components/modal_popup";
import SuccessTick from "../../../../components/success_tick";

function DailyAnalyticsEmployerField() {
  const adminDetails = useSelector((state) => state.adminDetails);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    adminId: { val: "", err: "" },
    // module: { val: "", err: "" },
    empFieldFollowUpCount: { val: "", err: "" },
    empFieldFollowUpVisitCount: { val: "", err: "" },
    empFieldNewVisitCount: { val: "", err: "" },
    empFieldNewLeadCount: { val: "", err: "" },
    empFieldNoOfPaymentCount: { val: "", err: "" },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    // const sanitizedValue = value.replace(/e|-|\+/gi, "");
    if (numbersOnlyTest(value)) {
      setFormData({
        ...formData,
        [name]: {
          val: value,
          err: "", // Reset error when the input changes
        },
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation here
    let formIsValid = true;

    const updatedFormData = { ...formData };
    if (formData.empFieldFollowUpCount.val === "") {
      updatedFormData.empFieldFollowUpCount.err = "This field is required";
      formIsValid = false;
    } else {
      updatedFormData.empFieldFollowUpCount.err = "";
    }

    if (formData.empFieldFollowUpVisitCount.val === "") {
      updatedFormData.empFieldFollowUpVisitCount.err = "This field is required";
      formIsValid = false;
    } else {
      updatedFormData.empFieldFollowUpVisitCount.err = "";
    }

    if (formData.empFieldNewVisitCount.val === "") {
      updatedFormData.empFieldNewVisitCount.err = "This field is required";
      formIsValid = false;
    } else {
      updatedFormData.empFieldNewVisitCount.err = "";
    }
    if (formData.empFieldNewLeadCount.val === "") {
      updatedFormData.empFieldNewLeadCount.err = "This field is required";
      formIsValid = false;
    } else {
      updatedFormData.empFieldNewLeadCount.err = "";
    }
    if (formData.empFieldNoOfPaymentCount.val === "") {
      updatedFormData.empFieldNoOfPaymentCount.err = "This field is required";
      formIsValid = false;
    } else {
      updatedFormData.empFieldNoOfPaymentCount.err = "";
    }

    if (formIsValid) {
      setEnableSubmit(true);
      PostDailyReports(formData).then((data) => {
        console.log("Form data submitted:", data);
        setEnableSubmit(false);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
        setFormData((prev) => ({
          ...prev,
          adminId: { val: "", err: "" },
          module: { val: "", err: "" },
          empFieldFollowUpCount: { val: "", err: "" },
          empFieldFollowUpVisitCount: { val: "", err: "" },
          empFieldNewVisitCount: { val: "", err: "" },
          empFieldNewLeadCount: { val: "", err: "" },
          empFieldNoOfPaymentCount: { val: "", err: "" },
        }));
      });
    }
    // Update the state to reflect any error messages
    setFormData(updatedFormData);
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      module: { val: adminDetails.module },
    }));

    // PostDailyReports(formData).then((data) => {
    //   console.log(data, "shjhsjhjshdj");
    // });
  }, [adminDetails.module]);
  return (
    <div className="">
      {/* <div
        className={`container p-3 ${style.form_wrp}`}
        style={{
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
        }}
      >
        <div className="text-center mt-4 mb-3">
          <h3>Daily Analytics</h3>
        </div>

        <> */}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="row">
          <div className="col-sm-6 mt-4">
            <input
              type="text"
              inputMode="numeric"
              name="empFieldFollowUpCount"
              id="followUp"
              value={formData.empFieldFollowUpCount.val}
              onChange={(e) => {
                e.target.value.length <= 4 && handleChange(e);
              }}
              className="form-control"
              placeholder="Follow up count"
            />
            {formData.empFieldFollowUpCount.err && (
              <div className="text-danger">
                {formData.empFieldFollowUpCount.err}
              </div>
            )}
          </div>
          <div className="col-sm-6 mt-4">
            <input
              type="text"
              inputMode="numeric"
              name="empFieldFollowUpVisitCount"
              id="totalCalls"
              value={formData.empFieldFollowUpVisitCount.val}
              onChange={(e) => {
                e.target.value.length <= 4 && handleChange(e);
              }}
              className="form-control"
              placeholder="Follow up visit count"
            />
            {formData.empFieldFollowUpVisitCount.err && (
              <div className="text-danger">
                {formData.empFieldFollowUpVisitCount.err}
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 mt-4">
            <input
              type="text"
              inputMode="numeric"
              name="empFieldNoOfPaymentCount"
              id="employerQualified"
              onChange={(e) => {
                e.target.value.length <= 4 && handleChange(e);
              }}
              value={formData.empFieldNoOfPaymentCount.val}
              className="form-control"
              placeholder="Payment count"
            />
            {formData.empFieldNoOfPaymentCount.err && (
              <div className="text-danger">
                {formData.empFieldNoOfPaymentCount.err}
              </div>
            )}
          </div>
          <div className="col-sm-6 mt-4">
            <input
              type="text"
              inputMode="numeric"
              name="empFieldNewVisitCount"
              id="employerNotQualified"
              onChange={(e) => {
                e.target.value.length <= 4 && handleChange(e);
              }}
              value={formData.empFieldNewVisitCount.val}
              className="form-control"
              placeholder="New visit count"
            />
            {formData.empFieldNewVisitCount.err && (
              <div className="text-danger">
                {formData.empFieldNewVisitCount.err}
              </div>
            )}
          </div>
          <div className="col-sm-6 mt-4">
            <input
              type="text"
              inputMode="numeric"
              name="empFieldNewLeadCount"
              id="newLeads"
              onChange={(e) => {
                e.target.value.length <= 4 && handleChange(e);
              }}
              value={formData.empFieldNewLeadCount.val}
              className="form-control"
              placeholder="New leads count"
            />
            {formData.empFieldNewLeadCount.err && (
              <div className="text-danger">
                {formData.empFieldNewLeadCount.err}
              </div>
            )}
          </div>
        </div>

        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "end",
            marginTop: "10px",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color=""
            style={{ backgroundColor: "#169C50", color: "white" }}
            disabled={enableSubmit}
          >
            Submit
          </Button>
        </div>
      </form>
      {showSuccess && (
        <MyModal>
          <ModalContainer
            childComponent={<SuccessTick HeadText="Successfully" />}
          />
        </MyModal>
      )}
      {/* </>
      </div> */}
    </div>
  );
}

export default DailyAnalyticsEmployerField;
