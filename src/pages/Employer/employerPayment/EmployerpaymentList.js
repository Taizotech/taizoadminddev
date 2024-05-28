/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetemployerPayment, PostInvoiceSend } from "../../../apiServices";
import { CircularProgress, Pagination, Stack, TextField } from "@mui/material";
import { DDMMYYYY_formate, MyModal } from "../../../utility";
import styled from "../../Filter/Jobs/components/jobList.module.scss";
import { debounce } from "lodash";
import { commonPopupActions } from "../../../redux-store/store";
import NoPayment from "./NoPayment";
import ModalContainer from "../../../components/modal_popup";
import ConfirmationPopup from "../../../components/ModalPopups/confirmationPopup";
function EmployerpaymentList() {
  const [EmployerPayment, setEmployerpayment] = useState("");
  const [paymentId, setPaymentId] = useState();
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [PaymentListed, setPaymentListed] = useState([]);
  const [contactPersonName, setContactPersonName] = useState("");

  const [pageCount, setPageCount] = useState({
    totalPages: 0,
    totalCount: 0,
  });
  const [loading, setLoading] = useState(false);

  const Dispatch = useDispatch();

  const handleEmployer = (e) => {
    let val = e.target.value.replace(/\\D/g, "");
    setEmployerpayment(val);
  };

  useEffect(() => {
    const debounceEmployerRating = debounce(() => {
      setLoading(true);
      GetemployerPayment(EmployerPayment, 0).then((data) => {
        console.log(data.code);
        if (data.code == 400) {
          setPaymentListed([]);
        }

        setLoading(false);
        console.log(data.data.content, "records");
        const TotalPageCount = data.data.totalPages;
        const totalElements = data.data.totalElements;

        setPaymentListed(data.data.content);
        console.log(data.data.content, "Employer rating content");
        setPageCount((prev) => ({
          ...prev,
          totalCount: totalElements,
          totalPages: TotalPageCount,
        }));
      });
    }, 300);

    debounceEmployerRating();
    return () => {
      debounceEmployerRating.cancel();
    };
  }, [EmployerPayment]);
  useEffect(() => {
    GetemployerPayment(EmployerPayment, 0).then((data) => {
      const TotalPageCount = data.data.totalPages;
      const totalElements = data.data.totalElements;
      setPageCount((prev) => ({
        ...prev,
        totalCount: totalElements,
        totalPages: TotalPageCount,
      }));
    });
  }, []);
  function employerPagination(event, page) {
    const currentPage = page - 1;
    GetemployerPayment(EmployerPayment, currentPage).then((data) => {
      const totalPageCount = data.data.totalPages;
      const totalElements = data.data.totalElements;

      setPaymentListed(data.data.content);
      setPageCount((prev) => ({
        ...prev,
        totalCount: totalElements,
        totalPages: totalPageCount,
      }));
    });
  }
  const handleEmployerDetailPopup = (id) => {
    Dispatch(
      commonPopupActions.setShowPopup({
        name: "employerDetails",
        id: id,
      })
    );
  };
  function handleConfirmationClose() {
    setShowConfirmPopup(false);
    setEnableSubmit(false);
  }

  function handleConfirmationOpen(e) {
    setShowConfirmPopup(true);
  }
  function ConfirmFormSubmit() {
    // to post details
    setEnableSubmit(true);

    PostInvoiceSend(paymentId).then((data) => {
      setEnableSubmit(false);
      setShowConfirmPopup(false);
      console.log(data, "hshjk");
    });
  }
  function handleInvoiceSend(e, paymentId) {
    console.log(paymentId, "payment");
    setPaymentId(paymentId);
    handleConfirmationOpen();
    const selectedemployer = PaymentListed.find(
      (employer) => employer.id === paymentId
    );
    if (selectedemployer) {
      setContactPersonName(selectedemployer.emailId);
    }
    console.log(selectedemployer.employerId, "contactperson");
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex mt-1">
          {/* <div className="col-md-10 d-flex justify-content-center align-items-center">
            <h3 className="text-center">Employer Payment</h3>
          </div> */}

          <div className="col-sm-12 d-flex justify-content-end">
            <div className="">
              <TextField
                fullWidth
                label="Employer"
                id="fullWidth"
                placeholder="Employer ID or Mobile No."
                type="number"
                value={EmployerPayment}
                onChange={handleEmployer}
                inputProps={{
                  maxLength: 10,
                }}
              />
              {/* <div>
            <br />
            <h5 className="px-3">
              <b>Total Count:</b>
              {pageCount.totalCount}
            </h5>
          </div> */}
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 mt-1">
              <div
                className="card bg-white"
                style={{ height: "70vh", overflowY: "auto" }}
              >
                {loading ? (
                  <div
                    className={`${styled.loader_wrp} mt-1 d-grid justify-content-center align-items-center`}
                  >
                    <CircularProgress />
                  </div>
                ) : (
                  <>
                    {PaymentListed.length > 0 ? (
                      PaymentListed.map((employer, i) => {
                        return (
                          <div className="">
                            {" "}
                            <div
                              // onClick={() => {
                              //   handleEmployersDetails(employer.employerId);
                              // }}
                              key={employer.id}
                              // className={`${styled.employer_list_item}`}
                              className="card bg-white border-0  mb-2 ms-2 me-2 mt-2"
                              style={{
                                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
                                cursor: "pointer",
                              }}
                            >
                              <div className="container-fluid">
                                <div className="row">
                                  <div
                                    onClick={() => {
                                      handleEmployerDetailPopup(
                                        employer.employerId
                                      );
                                    }}
                                    className="col-md-6 col-12  mt-2  d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-1"
                                  >
                                    <p>
                                      <b>Employer ID :</b> {employer.employerId}
                                    </p>
                                    {/* <p>
                                    {window.innerWidth >= 992 && (
                                      <span className="d-none d-md-inline">
                                        |
                                      </span>
                                    )}
                                  </p>
                                  <p>
                                    {" "}
                                    <b>ID :</b> {employer.id}
                                  </p> */}
                                    <p>
                                      {window.innerWidth >= 992 && (
                                        <span className="d-none d-md-inline">
                                          |
                                        </span>
                                      )}
                                    </p>
                                    <p>
                                      {" "}
                                      <b className="mt-md-1">Status:</b>{" "}
                                      {employer.status}
                                    </p>
                                  </div>
                                  <div className="col-md-6 col-12 mt-2 d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-end gap-1">
                                    <p>
                                      <b>From : </b>
                                      {employer.fromWeb ? "Web " : "App "}
                                    </p>{" "}
                                    <p>
                                      {window.innerWidth >= 992 && (
                                        <span className="d-none d-md-inline">
                                          |
                                        </span>
                                      )}
                                    </p>{" "}
                                    <p>
                                      <b className="ms-1"> Registered Time:</b>{" "}
                                      {
                                        <DDMMYYYY_formate
                                          dateValue={employer.createdTime}
                                        />
                                      }
                                    </p>
                                  </div>
                                </div>
                                <div className="row  mb-3">
                                  <div className="col-sm-4">
                                    <div className="row ">
                                      <div className="col-sm-12">
                                        <b>Email ID :</b> {employer.emailId}
                                      </div>
                                    </div>
                                    <div className="row mt-2">
                                      <div className="col-sm-12">
                                        <b>Mobile number :</b>{" "}
                                        {employer.mobileNumber}
                                      </div>
                                    </div>
                                    <div className="row mt-2 ">
                                      <div className="col-sm-12">
                                        <b>Payment ID :</b> {employer.paymentId}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-4">
                                    <div className="row ">
                                      <div className="col-sm-12">
                                        <b>Amount :</b> {employer.amount}
                                      </div>
                                    </div>
                                    <div className="row mt-2">
                                      <div className="col-sm-12">
                                        <b>Invoice Number :</b>{" "}
                                        {employer.invoiceNo}
                                      </div>
                                    </div>
                                    <div className="row mt-2">
                                      <div className="col-sm-12">
                                        <b>Order ID :</b> {employer.orderId}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-4 d-flex justify-content-end align-items-center">
                                    {/* <div className="row">
                                  <div className="col-sm-12">
                                    Paln Id : {employer.planId}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12">
                                    No.of openings : {employer.numberOfOpenings}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12">
                                    No.of JobCategory. :{" "}
                                    {employer.numberOfJobCategory}
                                  </div>
                                </div> */}
                                    {employer.status === "captured" ? (
                                      <button
                                        className="btn btn-primary"
                                        onClick={(e) =>
                                          handleInvoiceSend(e, employer.id)
                                        }
                                        disabled={enableSubmit}
                                      >
                                        Send Invoice
                                      </button>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <NoPayment />
                    )}
                  </>
                )}
              </div>
              <div className="row">
                <div className="col-sm-12 d-flex justify-content-center ">
                  <div className="bg-light position-fixed">
                    <Stack spacing={2}>
                      <Pagination
                        count={pageCount.totalPages}
                        color="success"
                        onChange={employerPagination}
                      />
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {showConfirmPopup && (
          <MyModal>
            <ModalContainer
              childComponent={
                <ConfirmationPopup
                  heading={"Confirmation"}
                  headingText={`Are you sure you want to send Invoice by <b>${contactPersonName}</b>?`}
                  onConfirm={ConfirmFormSubmit}
                  enableSubmit={enableSubmit}
                  onRequestClose={handleConfirmationClose}
                />
              }
            />
          </MyModal>
        )}
      </div>
    </>
  );
}

export default EmployerpaymentList;
