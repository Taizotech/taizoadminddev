/* eslint-disable react/jsx-pascal-case */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box, Button, Pagination, TextField } from "@mui/material";
import { BiFilter, BiReset } from "react-icons/bi";
import { GetEmployerEnquiry } from "../../../apiServices";
import { DDMMYYYY_formate, MyModal } from "../../../utility";
import { FaPhoneAlt } from "react-icons/fa";
import ModalContainer from "../../../components/modal_popup";
import { AiOutlineClose } from "react-icons/ai";

function EmployerEnquiry() {
  //usestate
  const [employerData, setEmployerData] = useState({
    mobileNumber: null,
    companyName: null,
    emailId: null,
    page: 1,
    size: 10,
  });
  const [modalEmployerData, setModalEmployerData] = useState({
    mobileNumber: null,
    companyName: null,
    emailId: null,
    page: 1,
    size: 10,
  });
  const [employerDataList, setEmployerDataList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [pagesCount, setPagesCount] = useState(0);

  const handleReset = () => {
    setEmployerData({
      mobileNumber: null,
      companyName: null,
      emailId: null,
      page: 1,
      size: 10,
    });
    fetchData(1);
    GetEmployerEnquiry(employerData).then((data) => {
      console.log(data, "Employer Enquiry data");
      setEmployerDataList(data.empEnquiryList);

      setPagesCount(Math.ceil(data.totalCount / employerData.size));

      // Close the dialog after submitting
    });
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = (page) => {
    GetEmployerEnquiry({ ...employerData, page }).then((data) => {
      console.log(data, "Employer Enquiry data");
      setEmployerDataList(data.empEnquiryList);

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
      GetEmployerEnquiry(employerData).then((data) => {
        console.log(data, "Employer Enquiry data");
        setEmployerDataList(data.empEnquiryList);
        console.log(data.empEnquiryList);
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
    GetEmployerEnquiry(employerData).then((data) => {
      console.log(data, "Employer Enquiry data");
      setEmployerDataList(data.empEnquiryList);
      console.log(data.totalCount, "jfhihfuiyuhihihiu");
      setPagesCount(Math.ceil(data.totalCount / employerData.size));
    });
  }, []);

  //   const handlePage = (e) => {
  //     const { name } = e.target;
  //     if (name === "prevPage" && modalEmployerData.page > 1) {
  //       setModalEmployerData((prev) => ({ ...prev, page: prev.page - 1 }));
  //     } else if (name === "nextPage") {
  //       const totalPageCount = Math.ceil(
  //         employerDataList?.totalCount / modalEmployerData.size
  //       );

  //       console.log(totalPageCount, "tottal");
  //       if (modalEmployerData.page < totalPageCount) {
  //         setModalEmployerData((prev) => ({ ...prev, page: prev.page + 1 }));
  //       }
  //     }
  //   };
  //   const handlePage = (action) => {
  //     if (action === "prev" && modalEmployerData.page > 1) {
  //       setModalEmployerData({
  //         ...modalEmployerData,
  //         page: modalEmployerData.page - 1,
  //       });
  //     } else if (action === "next" && modalEmployerData.page < pagesCount) {
  //       setModalEmployerData({
  //         ...modalEmployerData,
  //         page: modalEmployerData.page + 1,
  //       });
  //     }
  //   };
  return (
    <div>
      <div className="container-fluid">
        <div className="row p-2">
          <div className="col-sm-12  d-flex flex-column flex-sm-row ">
            <div className="col-sm-6 d-flex justify-content-end align-items-center">
              {" "}
              {/* <h3 className="text-center">Employer Enquiry</h3> */}
            </div>
            <div className="col-sm-6 d-flex justify-content-end">
              {/* <div className="d-flex justify-content-start fs-2">
                Employer Enquiry
              </div> */}
              <div className="">
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

                    <form className="form" onSubmit={handleSubmit}>
                      <div className="text-center">
                        <b>Employer Enquiry Filter</b>
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
                          <div className="col-sm-12 mt-3">
                            <TextField
                              fullWidth
                              label="Email Id"
                              id="emailId"
                              type="email"
                              value={employerData.emailId}
                              onChange={(e) =>
                                setEmployerData({
                                  ...employerData,
                                  emailId: e.target.value,
                                })
                              }
                              inputProps={{
                                pattern:
                                  "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}",
                              }}
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
                            style={{ backgroundColor: "#169C50" }}
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
                    </form>
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
          {/*Employer Enquiry List */}
          {employerDataList.length > 0 ? ( // Check if employerDataList is defined
            employerDataList.map((employer, i) => {
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
                                <p>
                                  <b>Company name :</b>{" "}
                                  {employer.empEnquiryModel.companyName}
                                </p>
                                <p>
                                  <b>Contact person :</b>{" "}
                                  {employer.empEnquiryModel.contactPersonName}
                                </p>
                                <p>
                                  <b>Mobile number :</b> +
                                  {employer.empEnquiryModel.mobileCountryCode}{" "}
                                  {employer.empEnquiryModel.mobileNumber}
                                </p>
                              </div>
                              <div className="col-sm-4">
                                <p>
                                  <b>Email ID :</b>{" "}
                                  {employer.empEnquiryModel.emailId}
                                </p>
                                <p>
                                  <b>Industry :</b>{" "}
                                  {employer.empEnquiryModel.industry}
                                </p>
                                <p>
                                  <b>City :</b> {employer.empEnquiryModel.city}
                                </p>
                              </div>
                              <div className="col-sm-5 ">
                                <p className="d-flex  justify-content-end">
                                  <b>Enquiry Time : </b>{" "}
                                  <DDMMYYYY_formate
                                    dateValue={
                                      employer.empEnquiryModel.createdTime
                                    }
                                  />
                                </p>

                                <p className="d-flex justify-content-end mt-3">
                                  <a
                                    href={`tel:+${employer.empEnquiryModel.mobileCountryCode}${employer.empEnquiryModel.mobileNumber}`}
                                  >
                                    <div
                                      className="btn btn-success px-3"
                                      style={{ backgroundColor: "#169C50" }}
                                    >
                                      <FaPhoneAlt className="" />
                                    </div>
                                  </a>
                                </p>
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
          {/* <Button
            variant="contained"
            name="prevPage"
            onClick={() => handlePage("prev")}
            disabled={modalEmployerData.page === 1}
          >
            Prev
          </Button>
          <span className="d-inline-block mt-2 mx-2">
            <b> {modalEmployerData.page} </b> of <b> {pagesCount} </b> Pages
          </span>
          <Button
            variant="contained"
            name="nextPage"
            onClick={() => handlePage("next")}
            disabled={modalEmployerData.page >= pagesCount}
          >
            Next
          </Button> */}
          {/* <Button variant="contained" name="prevPage" onClick={handlePage}>
            Prev
          </Button>
          <span className="d-inline-block mt-2 mx-2">
            <b> {modalEmployerData.page} </b>of{" "}
            <b>
              {" "}
              {Array.isArray(employerDataList) && employerDataList.length > 0
                ? Math.ceil(
                    employerDataList.totalCount / modalEmployerData.size
                  )
                : "0"}{" "}
            </b>
            Pages
          </span>
          <Button variant="contained" name="nextPage" onClick={handlePage}>
            Next
          </Button> */}

          <Pagination
            count={pagesCount}
            page={employerData.page}
            onChange={handlePageChange}
            color="success"
            size="large"
            // sx={{ color: "#169C50" }}
          />
        </div>
      </div>
    </div>
  );
}

export default EmployerEnquiry;
