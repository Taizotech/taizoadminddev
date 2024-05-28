import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { PostDailyReports } from "../../../../apiServices";
import { MyModal, numbersOnlyTest } from "../../../../utility";
import ModalContainer from "../../../../components/modal_popup";
import SuccessTick from "../../../../components/success_tick";
function DailyAnalyticsEmployer() {
  const adminDetails = useSelector((state) => state.adminDetails);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    adminId: { val: "", err: "" },
    module: { val: "", err: "" },
    empFollowUpCount: { val: "", err: "" },
    empQualifiedCount: { val: "", err: "" },
    empNotQualifiedCount: { val: "", err: "" },
    canQualifiedCount: { val: "", err: "" },
    canNotQualifiedCount: { val: "", err: "" },
    canTotalChatCount: { val: "", err: "" },
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
    if (formData.empFollowUpCount.val === "") {
      updatedFormData.empFollowUpCount.err = "This field is required";
      formIsValid = false;
    } else {
      updatedFormData.empFollowUpCount.err = "";
    }

    if (formData.empQualifiedCount.val === "") {
      updatedFormData.empQualifiedCount.err = "This field is required";
      formIsValid = false;
    } else {
      updatedFormData.empQualifiedCount.err = "";
    }
    if (formData.empNotQualifiedCount.val === "") {
      updatedFormData.empNotQualifiedCount.err = "This field is required";
      formIsValid = false;
    } else {
      updatedFormData.empNotQualifiedCount.err = "";
    }
    if (formData.canQualifiedCount.val === "") {
      updatedFormData.canQualifiedCount.err = "This field is required";
      formIsValid = false;
    } else {
      updatedFormData.canQualifiedCount.err = "";
    }

    if (formData.canNotQualifiedCount.val === "") {
      updatedFormData.canNotQualifiedCount.err = "This field is required";
      formIsValid = false;
    } else {
      updatedFormData.canNotQualifiedCount.err = "";
    }
    if (formData.canTotalChatCount.val === "") {
      updatedFormData.canTotalChatCount.err = "This field is required";
      formIsValid = false;
    } else {
      updatedFormData.canTotalChatCount.err = "";
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
          // module: { val: "", err: "" },
          empFollowUpCount: { val: "", err: "" },
          empQualifiedCount: { val: "", err: "" },
          empNotQualifiedCount: { val: "", err: "" },
          canQualifiedCount: { val: "", err: "" },
          canNotQualifiedCount: { val: "", err: "" },
          canTotalChatCount: { val: "", err: "" },
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
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="row">
          <div className="col-sm-6 mt-4">
            <label htmlFor="">Employer Follow Up</label>
            <input
              type="text"
              inputMode="numeric"
              name="empFollowUpCount"
              id="followUp"
              value={formData.empFollowUpCount.val}
              onChange={(e) => {
                e.target.value.length <= 4 && handleChange(e);
              }}
              className="form-control"
              placeholder="Follow up count"
            />
            {formData.empFollowUpCount.err && (
              <div className="text-danger">{formData.empFollowUpCount.err}</div>
            )}
          </div>
          {/* <div className="col-sm-6 mt-4">
            <input
              type="text"
              inputMode="numeric"
              name="noOfCalls"
              id="totalCalls"
              value={formData.noOfCalls.val}
              onChange={(e) => {
                e.target.value.length <= 4 && handleChange(e);
              }}
              maxLength={3}
              className="form-control"
              placeholder="No of calls count"
            />
            {formData.noOfCalls.err && (
              <div className="text-danger">{formData.noOfCalls.err}</div>
            )}
          </div> */}
          <div className="col-sm-6 mt-4">
            <label htmlFor="">Employer qualified</label>
            <input
              type="text"
              inputMode="numeric"
              name="empQualifiedCount"
              id="employerQualified"
              onChange={(e) => {
                e.target.value.length <= 4 && handleChange(e);
              }}
              value={formData.empQualifiedCount.val}
              className="form-control"
              placeholder="Qualified count"
            />
            {formData.empQualifiedCount.err && (
              <div className="text-danger">
                {formData.empQualifiedCount.err}
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 mt-4">
            <label htmlFor="">Employer not qualified </label>
            <input
              type="text"
              inputMode="numeric"
              name="empNotQualifiedCount"
              id="employerNotQualified"
              onChange={(e) => {
                e.target.value.length <= 4 && handleChange(e);
              }}
              value={formData.empNotQualifiedCount.val}
              className="form-control"
              placeholder="Not qualified count"
            />
            {formData.empNotQualifiedCount.err && (
              <div className="text-danger">
                {formData.empNotQualifiedCount.err}
              </div>
            )}
          </div>
          <div className="col-sm-6 mt-4">
            <label htmlFor="">Jobseeker qualified</label>
            <input
              type="text"
              inputMode="numeric"
              name="canQualifiedCount"
              id="canQualifiedCount"
              value={formData.canQualifiedCount.val}
              onChange={(e) => {
                e.target.value.length <= 4 && handleChange(e);
              }}
              className="form-control"
              placeholder="Qualified count"
            />
            {formData.canQualifiedCount.err && (
              <div className="text-danger">
                {formData.canQualifiedCount.err}
              </div>
            )}
          </div>
        </div>
        <div className="row">
          {/* <div className="col-sm-6 mt-4">
            <input
              type="text"
              inputMode="numeric"
              name="noOfCalls"
              id="noOfCalls"
              value={formData.noOfCalls.val}
              onChange={(e) => {
                e.target.value.length <= 4 && handleChange(e);
              }}
              className="form-control"
              placeholder="Total calls count"
            />
            {formData.noOfCalls.err && (
              <div className="text-danger">{formData.noOfCalls.err}</div>
            )}
          </div> */}

          <div className="col-sm-6 mt-4">
            <label htmlFor="">Jobseeker not qualified</label>
            <input
              type="text"
              inputMode="numeric"
              name="canNotQualifiedCount"
              id="canNotQualifiedCount"
              onChange={(e) => {
                e.target.value.length <= 4 && handleChange(e);
              }}
              value={formData.canNotQualifiedCount.val}
              className="form-control"
              placeholder="Not qualified count"
            />
            {formData.canNotQualifiedCount.err && (
              <div className="text-danger">
                {formData.canNotQualifiedCount.err}
              </div>
            )}
          </div>
          <div className="col-sm-6 mt-4">
            <label htmlFor="">Jobseeker total chat</label>
            <input
              type="text"
              inputMode="numeric"
              name="canTotalChatCount"
              id="totalChat"
              onChange={(e) => {
                e.target.value.length <= 4 && handleChange(e);
              }}
              value={formData.canTotalChatCount.val}
              className="form-control"
              placeholder="Total chat count"
            />
            {formData.canTotalChatCount.err && (
              <div className="text-danger">
                {formData.canTotalChatCount.err}
              </div>
            )}
          </div>
        </div>

        {/* <div className="row">
          <div className="col-sm-6 mt-4">
            <input
              type="text"
              inputMode="numeric"
              name="newLeadCount"
              id="newLeads"
              onChange={(e) => {
                e.target.value.length <= 4 && handleChange(e);
              }}
              value={formData.newLeadCount.val}
              className="form-control"
              placeholder="New leads count"
            />
            {formData.newLeadCount.err && (
              <div className="text-danger">{formData.newLeadCount.err}</div>
            )}
          </div>
          <div className="col-sm-6 mt-4">
            <input
              type="text"
              inputMode="numeric"
              name="noOfPayment"
              id="payment"
              onChange={(e) => {
                e.target.value.length <= 4 && handleChange(e);
              }}
              value={formData.noOfPayment.val}
              className="form-control"
              placeholder="Payment count"
            />
            {formData.noOfPayment.err && (
              <div className="text-danger">{formData.noOfPayment.err}</div>
            )}
          </div>
        </div> */}
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

export default DailyAnalyticsEmployer;
