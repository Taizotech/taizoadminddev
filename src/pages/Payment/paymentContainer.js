/* eslint-disable eqeqeq */
import { useState } from "react";
import PaymentFrom from "./employerPayment";
import CandidatePayment from "./candidatePayment";
import style from "../../assets/common.module.scss";

const PaymentContainer = () => {
  const [paymentType, setPaymentType] = useState({
    employer: false,
    jobseeker: false,
  });
  function handleFormChange(tab) {
    if (tab == "employer") {
      setPaymentType((prev) => ({ ...prev, employer: true, jobseeker: false }));
    } else {
      setPaymentType((prev) => ({ ...prev, employer: false, jobseeker: true }));
    }
  }

  return (
    <>
      <div className="my-4">
        <div className="text-center">
          <div>
            <h4>Custom Payment</h4>
          </div>
          <form className={`${style.chips_wrp}`}>
            <input
              onChange={() => {
                handleFormChange("employer");
              }}
              type="radio"
              name="payment_switch"
              id="employer_form_switch"
            />

            <label htmlFor="employer_form_switch">Employer</label>
          </form>
        </div>

        <div>
          {paymentType.employer && <PaymentFrom />}
          {paymentType.jobseeker && <CandidatePayment />}
        </div>
      </div>
    </>
  );
};

export default PaymentContainer;
