/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React from "react";
import "./candidatePayment.css";
import style from "./UserPayment.module.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

function CandidatePayment() {
  //  const {register,handleSubmit,formState:{errors},trigger}=useForm();
  //  console.log(errors);
  // const initialValues = { username: "", email: "", password: "" };
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderid, setOrderid] = useState("");
  const [paymentid, setPaymentid] = useState("");
  const [Pusrchase, setPusrchase] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userIdError, setuserIdError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [orderidError, setOrderidError] = useState("");
  const [paymentidError, setPaymentidError] = useState("");
  const [PusrchaseError, setPusrchaseError] = useState("");
  //  const handleChange = (e) => {
  //    e.preventDefault();

  // };

  async function postCandidatePayment() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      amount: amount,
      emailId: email,
      mobileNumber: phone,
      orderId: orderid,
      paymentId: paymentid,
      status: "payment successfull",
      typeOfPurchase: Pusrchase,
      userId: userId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setLoading(true);

    fetch("h/ttps://dev.taizo.in/adminuserPayment", requestOptions)
      // .then((response) => response.text())
      .then((response) => {
        if (response.ok) {
          setSuccess(true);

          // Reset form fields
          setUserId("");
          setAmount("");
          setEmail("");
          setPhone("");
          setOrderid("");
          setPaymentid("");
          setPusrchase("");
        }
      })
      // .then((result) => console.log(result))
      // .catch((error) => console.log("error", error));
      .catch((error) => {
        console.error("API Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postCandidatePayment();
    if (
      userIdError ||
      amountError ||
      emailError ||
      phoneError ||
      orderidError ||
      paymentidError ||
      PusrchaseError
    ) {
      // Validation failed, do not submit
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setSubmissionStatus("success");
      setIsLoading(false);
    }, 2000);

    setUserId("");
    setAmount("");
    setEmail("");
    setPhone("");
    setOrderid("");
    setPaymentid("");
    setPusrchase("");
    //   setFormErrors(validate(formValues));
    // setIsSubmit(true);
  };

  const validateuserId = () => {
    if (userId.length < 1 || userId.length > 5) {
      setuserIdError("please Enter 1 to 5 numbers");
    } else {
      setuserIdError("");
    }
  };
  const validateamount = () => {
    if (!amount.match(/^\d+$/)) {
      setAmountError("Please Enter your amount");
    } else {
      setAmountError("");
    }
  };
  const validateEmail = () => {
    if (!email.match(/^[A-Za-z\\._\-0-9]*[@][A-Za-z]*[\\.][a-z]{2,4}$/)) {
      setEmailError("Please Enter a valid email");
    } else {
      setEmailError("");
    }
  };
  const validatephone = () => {
    if (
      !phone.match(/^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
    ) {
      setPhoneError("Please Enter a valid mobile number");
    } else {
      setPhoneError("");
    }
  };
  const validateorderId = () => {
    if (orderid.length == 0) {
      setOrderidError("Please Enter a order id");
    } else {
      setOrderidError("");
    }
  };
  const validatepaymentid = () => {
    if (paymentid.length == 0) {
      setPaymentidError("Please Enter a payment id");
    } else {
      setPaymentidError("");
    }
  };
  const validatePurchase = () => {
    if (Pusrchase.length == 0) {
      setPusrchaseError("Please Enter a purchase");
    } else {
      setPusrchaseError("");
    }
  };

  return (
    <div className={`${style.payment_form_wrp}`}>
      <div>
        {/*Loder*/}
        {isLoading && (
          <div className="modal">
            <div className="modal-content">
              <div className="loading-spinner"></div>
              <h3 className="mt-2">Loading...</h3>
            </div>
          </div>
        )}
        {submissionStatus === "success" && (
          <div className="modal">
            <div className="modal-content text-center">
              <h3 className="text-success">Success!</h3>
              <div className="success-icon">
                <FontAwesomeIcon icon={faCircleCheck} />
              </div>
              <p className="para" assName="text-dark">
                Payment submitted successfully!
              </p>
              <button
                className="btn btn-success w-50 text-center"
                onClick={() => setSubmissionStatus(null)}
              >
                ok
              </button>
            </div>
          </div>
        )}
        {/* <div className='d-flex justify-content-center align-items-center'> */}
        <form onSubmit={handleSubmit}>
          {/* {submissionStatus === 'success' && (
        <div className="success-message">
          Form submitted successfully!
          </div>
      )} */}
          <div className="container ms-5 me-5">
            <div class="row ">
              <div className="col-sm-6">
                <label>Jobseeker User ID</label>
                <input
                  type="number"
                  placeholder="Userid"
                  aria-label="Userid"
                  name="userid"
                  className="form-control"
                  required
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  onBlur={validateuserId}
                />
                {/* <p className="para">{formErrors.userid}</p> */}
                {userIdError && <p className="para">{userIdError}</p>}
              </div>

              <div className="col-sm-6">
                <label>Amount</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Amount"
                  aria-label="amount"
                  name="amount"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onBlur={validateamount}
                />
                {amountError && <p className="para">{amountError}</p>}
                {/* <p className="para">{formErrors.amount}</p> */}
              </div>
            </div>
            <div class="row mt-1">
              <div className="col-sm-6">
                <label>Email ID</label>
                <input
                  type="text"
                  placeholder="EmailId"
                  aria-label="emailId"
                  className="form-control"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validateEmail}
                />
                {emailError && <p className="para">{emailError}</p>}
                {/* <p className="para">{formErrors.email}</p> */}
              </div>

              <div className="col-sm-6">
                <label>Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="MobileNumber"
                  aria-label="mobileNumber"
                  name="phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={validatephone}
                />
                {phoneError && <p className="para">{phoneError}</p>}
                {/* <p className="para">{formErrors.Mnumber}</p> */}
              </div>
            </div>
            <div class="row mt-1">
              <div className="col-sm-6">
                <label>Order ID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="OrderId"
                  aria-label="orderId"
                  name="orderId"
                  required
                  value={orderid}
                  onChange={(e) => setOrderid(e.target.value)}
                  onBlur={validateorderId}
                />
                {orderidError && <p className="para">{orderidError}</p>}
                {/* <p className="para">{formErrors.orderId}</p> */}
              </div>

              <div className="col-sm-6">
                <label>Payment ID</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="PaymentId"
                  aria-label="paymentId"
                  name="paymentId"
                  required
                  value={paymentid}
                  onChange={(e) => setPaymentid(e.target.value)}
                  onBlur={validatepaymentid}
                />
                {paymentidError && <p className="para">{paymentidError}</p>}
                {/* <p className="para">{formErrors.paymentId}</p> */}
              </div>
            </div>
            <div class="row mt-1">
              <div className="col-sm-6">
                <label>Type Of Purchase</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Purchase"
                  aria-label="Purchase"
                  name="Purchase"
                  required
                  value={Pusrchase}
                  onChange={(e) => setPusrchase(e.target.value)}
                  onBlur={validatePurchase}
                />
                {PusrchaseError && <p className="para">{PusrchaseError}</p>}
                {/* <p className="para">{formErrors.Purchase}</p> */}
              </div>

              <div className="col-sm-6 mt-4">
                <input
                  type="radio"
                  // onChange={input_handler}
                  className=""
                  name="payment_status"
                  id="payment_status_success"
                  value="Payment Successfull"
                  checked
                  // ={
                  //   formValues.payment_status === "Payment Successfull"
                  // }
                />
                <label
                  className="me-4 text-success"
                  htmlFor="payment_status_success"
                >
                  Payment Success
                </label>
                <input
                  type="radio"
                  // onChange={input_handler}
                  className=""
                  name="payment_status"
                  id="payment_status_failure"
                  value="Payment Failed"
                  // checked={
                  //   paymentInputs.payment_status.val === "Payment Failed"
                  // }
                />
                <label className="text-danger" htmlFor="payment_status_failure">
                  Payment Failure
                </label>
              </div>
            </div>

            <div className="row  d-grid justify-content-end mt-1 mr-5">
              <div className="col-sm-12">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    // </div>
  );
}

export default CandidatePayment;
