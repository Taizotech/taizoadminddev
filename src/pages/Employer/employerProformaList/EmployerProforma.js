/* eslint-disable react/jsx-pascal-case */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Box, Button, Pagination, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BiFilter, BiReset } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { DDMMYYYY_formate, MyModal } from "../../../utility";
import ModalContainer from "../../../components/modal_popup";
import { AiOutlineClose } from "react-icons/ai";
import { GetProformaInvoice } from "../../../apiServices";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { commonPopupActions } from "../../../redux-store/store";
import { BsBoxArrowInRight } from "react-icons/bs";

function EmployerProforma() {
  const [employerData, setEmployerData] = useState({
    employerId: "",
    mobileNumber: "",
    companyName: "",
    page: 1,
    size: 10,
  });
  const [modalEmployerData, setModalEmployerData] = useState({
    employerId: "",
    mobileNumber: "",
    companyName: "",
    page: 1,
    size: 10,
  });
  const [employerProformaList, setEmployerProformaList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [pagesCount, setPagesCount] = useState(0);
  const Dispatch = useDispatch();
  const handleReset = () => {
    setEmployerData({
      employerId: "",
      mobileNumber: "",
      companyName: "",
      page: 1,
      size: 10,
    });
    fetchData(1);
    GetProformaInvoice(employerData).then((data) => {
      console.log(data, "Employer Enquiry data");
      setEmployerProformaList(data.proformaList);

      setPagesCount(Math.ceil(data.totalCount / employerData.size));

      // Close the dialog after submitting
    });
  };

  useEffect(() => {
    fetchData(1); // Fetch data for the initial page
  }, []);

  const fetchData = (page) => {
    GetProformaInvoice({ ...employerData, page }).then((data) => {
      console.log(data, "Employer Enquiry data");
      setEmployerProformaList(data.proformaList);
      setPagesCount(Math.ceil(data.totalCount / employerData.size));
      setShowForm(false);
    });
  };

  const handlePageChange = (event, page) => {
    setEmployerData({ ...employerData, page });
    fetchData(page);
  };

  useEffect(() => {
    if (JSON.stringify(employerData) == JSON.stringify(modalEmployerData)) {
      GetProformaInvoice(employerData).then((data) => {
        console.log(data, "Employer Enquiry data");
        setEmployerProformaList(data.proformaList);
        console.log(data.proformaList);
        setPagesCount(Math.ceil(data.totalCount / employerData.size));
      });
    }
  }, [employerData]);

  const handleFilterClick = () => {
    setShowForm(true);
    handleSubmit(); // Call the handleSubmit function directly
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(1);
  };

  const handleClearAll = (e) => {
    e.preventDefault();
    setEmployerData({
      mobileNumber: "",
      companyName: "",
      emailId: "",
      page: 1,
      size: 10,
    });

    // setShowForm(true);
  };

  useEffect(() => {
    console.log(employerData);
  }, [employerData]);

  // useEffect for initial data retrieval
  useEffect(() => {
    GetProformaInvoice(employerData).then((data) => {
      console.log(data, "Employer Enquiry data");
      setEmployerProformaList(data.proformaList);

      console.log(data.totalCount, "jfhihfuiyuhihihiu");
      setPagesCount(Math.ceil(data.totalCount / employerData.size));
    });
  }, []);
  const handleEmployerDetailPopup = (id) => {
    Dispatch(
      commonPopupActions.setShowPopup({
        name: "employerDetails",
        id: id,
      })
    );
  };
  function JobDetails(details) {
    console.log(details, "dkjssflkskslklklk");
    // [
    //   {
    //     jobCategory: "CNC Setter cum Operator",
    //     industry: "Tool Room",
    //     noOfOpenings: "1",
    //     isExperienced: true,
    //     amount: 2999,
    //   },
    // ];
    return (
      <>
        <div>
          {details.map((el) => {
            return (
              <>
                <div>
                  <span>Job Category {el.jobCategory}</span>
                  <span>industry{el.industry}</span>
                  <span>noOfOpenings {el.noOfOpenings}</span>
                  <span>isExperienced{el.isExperienced}</span>
                  <span>amount {el.amount}</span>
                </div>
              </>
            );
          })}
          <span></span>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="container-fluid">
        <div className="row p-2">
          <div className="col-sm-12 d-flex flex-column flex-sm-row justify-content-end">
            {/* <div className="col-sm-6 d-flex justify-content-end align-items-center">
              <h3 className="text-center">Proforma Invoice</h3>
            </div> */}
            <div className=" ">
              {/* <div className="d-flex justify-content-start fs-2">
                Employer Enquiry
              </div> */}
              <div className="">
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/add_invoice"
                >
                  <div
                    className="p-2 btn-primary btn me-2 "
                    // style={{ : "#169C50", color: "white" }}
                  >
                    <BsBoxArrowInRight
                      style={{ marginRight: 5, fontWeight: "bold" }}
                    />{" "}
                    send Proforma
                  </div>
                </Link>
                <div
                  className="p-2 btn-outline-success btn me-2"
                  onClick={handleReset}
                  // style={{ : "#169C50", color: "white" }}
                >
                  <BiReset />
                  Refresh
                </div>

                <div
                  className="p-2 btn-outline-success btn me-2"
                  onClick={handleFilterClick}
                  // style={{ : "#169C50", color: "white" }}
                >
                  <BiFilter />
                  Filter
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          {showForm && (
            <MyModal>
              <ModalContainer
                childComponent={
                  <>
                    <div
                      // className="text-danger"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        cursor: "pointer",
                        fontSize: 30,
                        color: "gray",
                      }}
                    >
                      {" "}
                      <AiOutlineClose
                        onClick={() => {
                          setShowForm(false);
                          fetchData(1);
                        }}
                      />
                    </div>
                    <Box component="form" onSubmit={handleSubmit}>
                      <div className="text-center">
                        <b>Filter by </b>
                      </div>
                      <div className="px-5 ">
                        <Box
                          sx={{
                            width: "30vw",
                          }}
                        >
                          <div className="col-sm-12 mt-3">
                            <TextField
                              fullWidth
                              label="Employer ID"
                              id="employerID"
                              type="number"
                              value={employerData.employerId}
                              onChange={(e) =>
                                setEmployerData({
                                  ...employerData,
                                  employerId: e.target.value,
                                })
                              }
                              inputProps={{
                                // maxLength: 5,
                                pattern: "/d{6}/g",
                              }}
                            />
                          </div>
                          <div className="col-sm-12 mt-3">
                            <TextField
                              fullWidth
                              label="Mobile Number"
                              id="mobileNumber"
                              type="number"
                              value={employerData.mobileNumber}
                              inputProps={{ maxLength: 10 }}
                              onChange={(e) =>
                                setEmployerData({
                                  ...employerData,
                                  mobileNumber: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="col-sm-12 mt-3">
                            <TextField
                              fullWidth
                              label="Company Name"
                              id="companyName"
                              type="text"
                              value={employerData.companyName}
                              onChange={(e) =>
                                setEmployerData({
                                  ...employerData,
                                  companyName: e.target.value,
                                })
                              }
                            />
                          </div>
                        </Box>
                        <div className="text-right mt-3 ">
                          <Button
                            variant="contained"
                            // color="success"
                            className="mb-3 "
                            onClick={(e) => {
                              handleClearAll(e);
                            }}
                            style={{ backgroundColor: "red" }}
                          >
                            Clear
                          </Button>
                          <Button
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: "#169C50" }}
                            className="mb-3 ms-1"
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    </Box>
                  </>
                }
              />
            </MyModal>
          )}
        </div>
        <div
          className="card bg-white"
          style={{ height: "70vh", overflowY: "auto" }}
        >
          {employerProformaList.length > 0 ? ( // Check if employerProformaList is defined
            employerProformaList.map((employer, i) => {
              return (
                <>
                  <div key={i}>
                    <div
                      className="card bg-white border-0  mb-2 ms-2 me-2 mt-2"
                      style={{
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
                        cursor: "pointer",
                      }}
                    >
                      <div className="container-fluid">
                        <div className="row  ">
                          <div className="col-sm-12 bg-white rounded-3">
                            <div className="row mt-3 ms-1 me-2">
                              <div className="col-sm-3">
                                <p
                                  onClick={() => {
                                    handleEmployerDetailPopup(
                                      employer.employer.employerId
                                    );
                                  }}
                                >
                                  <b>Employer ID : </b>{" "}
                                  {employer.employer.employerId}
                                </p>
                                <p>
                                  <b>Company name :</b>{" "}
                                  {employer.employer.companyName}
                                </p>
                                <p>
                                  <b>Contact person :</b>{" "}
                                  {employer.employer.contactPersonName
                                    ? employer.employer.contactPersonName
                                    : "NULL"}
                                </p>
                              </div>
                              <div className="col-sm-4">
                                <p>
                                  <b>Mobile number :</b> +91{" "}
                                  {employer.employer.mobileNumber}
                                </p>
                                <p>
                                  <b>Email ID :</b>{" "}
                                  {employer.employer.emailId
                                    ? employer.employer.emailId
                                    : "NULL"}
                                </p>

                                <p>
                                  <b>Invoice amount :</b>
                                  {employer.employer.invoiceAmount}

                                  {/* {employer.employer.jobDetails} */}
                                </p>

                                {/* <p>
                                  {employer.employer.jobDetails != null && (
                                    <>
                                      {" "}
                                      <b>Job Details :</b>
                                      <JobDetails
                                        details={JSON.parse(
                                          employer.employer.jobDetails
                                        )}
                                      />
                                    </>
                                  )}
                                </p> */}
                              </div>
                              <div className="col-sm-5 ">
                                <p className="d-flex  justify-content-end">
                                  <b>Invoice Time : </b>{" "}
                                  <DDMMYYYY_formate
                                    dateValue={employer.employer.createdTime}
                                  />
                                </p>
                                <p className="d-flex  justify-content-end">
                                  <b>Payment status : </b>{" "}
                                  {employer.employer.paid === true ? (
                                    <b className="text-success"> Paid</b>
                                  ) : (
                                    <b className="text-danger"> Unpaid</b>
                                  )}
                                </p>
                                <p className="d-flex justify-content-end mt-3">
                                  <a
                                    href={`tel:+${employer.employer.mobileNumber}`}
                                  >
                                    <div
                                      className="btn btn-success px-3"
                                      style={{ backgroundColor: "#169C50" }}
                                    >
                                      <FaPhoneAlt className="" />
                                    </div>
                                  </a>
                                </p>
                                {/* <p className="d-flex  justify-content-end">
                                  <p>
                                    <button>Job details</button>
                                  </p>
                                </p> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <p className="text-center vh-75 text-danger">
              No employer data available
            </p> // Provide a fallback if employerDataList is undefined
          )}
        </div>
        <div className="d-flex justify-content-center">
          <Pagination
            count={pagesCount}
            page={employerData.page}
            onChange={handlePageChange}
            color="success"
            size="large"
          />
        </div>
      </div>
    </div>
  );
}

export default EmployerProforma;
