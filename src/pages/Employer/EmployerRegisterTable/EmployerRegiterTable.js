/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import {
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import FBstyle from "../../Candidate/FacebookMeta/candidateFacebookMeta.module.scss";
import EmployerRegisterFilter from "./EmployerRegisterFilter";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllsdminDetails,
  GetEmployerFilterDetails,
  PutEmployerIsQualified,
} from "../../../apiServices";
import RegisterCandidateStyle from "../../Candidate/CandidateRegistered/RegisteredCandidate.module.scss";
import canLeadStyle from "../../Candidate/CandidateLeadTable/candidateLead.module.scss";
import {
  DDMMYYYY_formate,
  MyModal,
  capitalizeWords,
  textTruncate,
} from "../../../utility";
import {
  EmployerRegisterActions,
  commonPopupActions,
} from "../../../redux-store/store";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import ConfirmationPopup from "../../../components/ModalPopups/confirmationPopup";
import ModalContainer from "../../../components/modal_popup";
import { webConsoleBaseUrl } from "../../../App";
import EmployerEmailSendSLA from "./EmployerSendEmail";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#d2d2d2",
    color: "#545454f0",
    padding: "8px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "8px",
  },
}));
export default function EmployerRegiterTable(props) {
  const EmployerRegister = useSelector(
    (state) => state.EmployerRegisterDetails.EmployerRegisterFilter
  );
  const page = useSelector(
    (state) => state.EmployerRegisterDetails.EmployerRegisterFilter.page
  );
  const size = useSelector(
    (state) => state.EmployerRegisterDetails.EmployerRegisterFilter.size
  );
  console.log(page, "skdklklpage");
  const Dispatch = useDispatch();
  const [currentCandidateDetail, setCurrentCandidateDetails] = useState();
  const [pageCount, setPageCount] = useState();
  const [EmployerRegisterList, setEmployerRegisterList] = useState([]);
  const [pagesCount, setPagesCount] = useState({
    totalPages: 0,
    totalCount: 0,
    currentPage: 1,
  });
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [showConfirmationPopup, setShowConfirmPopup] = useState(false);
  const adminDetails = useSelector((state) => state.adminDetails);
  const [showEmployerSendSLA, setShowEmployerSendSLA] = useState(false);
  let isSuperAdmin = adminDetails.roleID == 1;
  const [adminName, setAdminName] = useState([]);
  const [adminid, setAdminId] = useState([]);
  const [regisercount, setRegisercount] = useState();

  useEffect(() => {
    GetAllsdminDetails().then((data) => {
      console.log(data, "All admin details");
      const adminNames = data.map((item) => item.userName);
      const adminIds = data.map((item) => item.id);
      setAdminName(adminNames);
      setAdminId(adminIds);
    });
  }, []);
  const inputRef = {
    qualified: useRef(),
    notQualified: useRef(),
    // rescheduled: useRef(),
  };
  const handleButtonClick = (refName, employerId) => {
    const ref = inputRef[refName];
    if (ref && ref.current) {
      ref.current.click();
      console.log(employerId, "refcurrent");
    }
  };
  function currentCanDetails(data) {
    console.log(data, "Current Dataaaaaa");
    setCurrentCandidateDetails(data);
  }

  //   const EmpId = currentCandidateDetail.id;
  //   console.log(EmpId, "EmpId");

  const [isQualifiedDetails, setIsQualifiedDetails] = useState({
    confirmtext: "",
    isQualified: "",
    openPopup: false,
    empId: "",
  });

  function openIsQualifyPopup(status, id) {
    console.log(status, "staus");
    let confirmText = "";
    let isQualified;
    if (status == "qualify") {
      confirmText = `Are you sure you want to qualify <b>${currentCandidateDetail.contactPersonName}</b> `;
      isQualified = true;
    } else {
      confirmText = `Are you sure you want to not qualify <b>${currentCandidateDetail.contactPersonName}</b> `;
      isQualified = false;
    }
    setIsQualifiedDetails((prev) => ({
      ...prev,
      openPopup: true,
      isQualified: isQualified,
      confirmtext: confirmText,
      empId: currentCandidateDetail.id,
    }));
  }

  function handleConfirmationClose() {
    setIsQualifiedDetails((prev) => ({
      ...prev,
      openPopup: false,
    }));
  }

  function ConfirmFormSubmit() {
    setEnableSubmit(true);
    PutEmployerIsQualified(isQualifiedDetails)
      .then((data) => {
        setIsQualifiedDetails((prev) => ({
          ...prev,
          openPopup: false,
        }));
        GetEmployerFilterDetails(EmployerRegister).then((data) => {
          setEmployerRegisterList(data.employerList);
          setPageCount(Math.ceil(data.totalCount / EmployerRegister.size));
          setPagesCount({
            totalPages: Math.ceil(data.totalCount / EmployerRegister.size),
            totalCount: data.totalCount,
            currentPage: EmployerRegister.page,
          });
        });
        setEnableSubmit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    console.log(EmployerRegister, "Employerrrrrr");
  }, [EmployerRegister]);
  //   useEffect(() => {
  //     GetEmployerFilterDetails(EmployerRegister).then((data) => {
  //       //   setLoading(false);
  //       console.log(data);
  //       if (data.code === 400) {
  //         setEmployerRegisterList([]);
  //       } else {
  //         setEmployerRegisterList(data.employerList);
  //         setPageCount(data.totalCount); // Set totalCount directly
  //       }
  //     });
  //   }, [EmployerRegister]);
  useEffect(() => {
    GetEmployerFilterDetails(EmployerRegister).then((data) => {
      setEmployerRegisterList(data.employerList);
      setRegisercount(data.totalCount);
      setPageCount(Math.ceil(data.totalCount / EmployerRegister.size));
    });
  }, [EmployerRegister]);

  // function candidatePagination(event, page) {
  //   Dispatch(EmployerRegisterActions.setEmployerRegisterFilterPage(page));
  // }
  //   function currentCanDetails(data) {
  //     console.log(data, "Current Dataaaaaa");
  //     setCurrentCandidateDetails(data);
  //   }
  function candidatePagination(event, page) {
    const currentPage = page;
    console.log(event, "current page");
    Dispatch(
      EmployerRegisterActions.setEmployerRegisterFilterPage(currentPage)
    );
  }
  function candidateSize(size) {
    Dispatch(EmployerRegisterActions.setEmployerRegisterFilterSize(size));
  }
  const handlePopupDetails = (id, type) => {
    console.log(id);

    Dispatch(
      commonPopupActions.setShowPopup({
        name: type,
        id: id,
      })
    );
  };
  const closeSLA = () => {
    setShowEmployerSendSLA(false);
  };
  return (
    <div>
      <>
        <div className={`${FBstyle.FilterHead}`}>
          {" "}
          <div className="d-flex ">
            Show {"  "}
            <select
              name=""
              id=""
              className="px-1 py-1 mx-2"
              onChange={(event) => candidateSize(event.target.value)}
            >
              <option selected value="10">
                10
              </option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
            {"   "}
            Entries
          </div>
          <div className={`${canLeadStyle.filterAdduser}`}>
            <div className="mt-2 me-2">Total Count : {regisercount}</div>
            <EmployerRegisterFilter />
            <a
              style={{ textDecoration: "none" }}
              href={`https://www.taizo.in/waNotifications/customCompanyDetails.html?admin_id=${localStorage.getItem(
                "adminID"
              )}`}
              target="_blank"
            >
              <button className={`ms-2 ${canLeadStyle.NewLead}`}>
                <AiOutlineUserAdd /> Add New Employer
              </button>
            </a>
          </div>
        </div>
        <div>
          <div className={`${FBstyle.Container}`}>
            <div className={`table-responsive-sm ${FBstyle.responsive}`}>
              <TableContainer className={`${FBstyle.TableContainer}`}>
                <Table stickyHeader aria-label="sticky table" className={``}>
                  <TableHead className={`${FBstyle.Header}`}>
                    <TableRow>
                      <StyledTableCell>Contact Person Name</StyledTableCell>
                      <StyledTableCell>Company Name</StyledTableCell>
                      <StyledTableCell>Mobile Number</StyledTableCell>
                      <StyledTableCell>Industry</StyledTableCell>
                      <StyledTableCell>City</StyledTableCell>
                      <StyledTableCell>Area</StyledTableCell>
                      {isSuperAdmin && (
                        <StyledTableCell>Assigned By</StyledTableCell>
                      )}
                      <StyledTableCell>Registered on</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {EmployerRegisterList.length > 0 ? (
                      <>
                        {EmployerRegisterList.map((Employer, i) => {
                          return (
                            <>
                              <TableRow
                                key={i}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                                onClick={() => {
                                  currentCanDetails(Employer.employer);
                                }}
                              >
                                <StyledTableCell
                                  title={Employer.employer.contactPersonName}
                                >
                                  {Employer.employer.contactPersonName
                                    ? textTruncate(
                                        capitalizeWords(
                                          Employer.employer.contactPersonName
                                        ),
                                        15
                                      )
                                    : "-"}
                                </StyledTableCell>
                                <StyledTableCell
                                  sx={{ color: "#0b7af0", cursor: "pointer" }}
                                  title={Employer.employer.companyName}
                                  onClick={() => {
                                    handlePopupDetails(
                                      Employer.employer.id,
                                      "employerDetails"
                                    );
                                  }}
                                >
                                  {Employer.employer.companyName
                                    ? textTruncate(
                                        capitalizeWords(
                                          Employer.employer.companyName
                                        ),
                                        20
                                      )
                                    : "-"}
                                </StyledTableCell>
                                <StyledTableCell
                                  title={Employer.employer.mobileNumber}
                                >
                                  {Employer.employer.mobileNumber
                                    ? String(
                                        Employer.employer.mobileNumber
                                      ).slice(0, 10)
                                    : ""}
                                </StyledTableCell>
                                <StyledTableCell
                                  title={Employer.employer.industry}
                                >
                                  {Employer.employer.industry
                                    ? textTruncate(
                                        capitalizeWords(
                                          Employer.employer.industry
                                        ),
                                        15
                                      )
                                    : "-"}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {Employer.employer.city}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {Employer.employer.area}
                                </StyledTableCell>
                                {isSuperAdmin && (
                                  <StyledTableCell align="left">
                                    <>
                                      {
                                        adminName[
                                          adminid.indexOf(
                                            Employer.employer.assignTo
                                          )
                                        ]
                                      }
                                    </>
                                  </StyledTableCell>
                                )}
                                <StyledTableCell>
                                  <DDMMYYYY_formate
                                    dateValue={Employer.employer.createdTime}
                                  />
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div
                                    className={`${RegisterCandidateStyle.Status}`}
                                  >
                                    <div>
                                      {Employer.employer.qualified === true && (
                                        <>
                                          <div
                                            className={`${RegisterCandidateStyle.qualified}`}
                                          >
                                            Qualified
                                          </div>
                                        </>
                                      )}

                                      {Employer.employer.notQualified ===
                                        true && (
                                        <>
                                          <div
                                            className={`${RegisterCandidateStyle.Notqualified}`}
                                          >
                                            Not Qualified
                                          </div>
                                        </>
                                      )}
                                    </div>
                                    <div className="btn-group dropstart">
                                      <button
                                        type="button"
                                        // className={`btn btn-light `}

                                        data-bs-toggle="dropdown"
                                        data-bs-no-caret="true"
                                        aria-expanded="false"
                                        style={{
                                          border: "none",
                                          background: "none",
                                          color: "#000",
                                          cursor: "pointer",
                                          outline: "none",
                                          position: "relative",
                                          right: "5px",
                                          // backgroundColor: "red",
                                          fontSize: 20,
                                          zIndex: 1,
                                        }}
                                      >
                                        <span className="">
                                          {" "}
                                          <BsThreeDotsVertical />{" "}
                                        </span>
                                        {/* <AiOutlineEdit /> */}
                                      </button>{" "}
                                      <ul
                                        className="dropdown-menu"
                                        style={{ textAlign: "left" }}
                                        // ref={dropdownRef}
                                      >
                                        <li
                                          onClick={() => {
                                            handleButtonClick(
                                              "qualified",
                                              Employer.employer.id
                                            );
                                          }}
                                        >
                                          <a className="dropdown-item" href="#">
                                            <div
                                              className={`${FBstyle.select_wrp}`}
                                            >
                                              <input
                                                type="radio"
                                                ref={inputRef.qualified}
                                                name={`status_${Employer.employer.id}`}
                                                checked={
                                                  Employer.employer.qualified
                                                }
                                                id={`qualified_${Employer.employer.id}`}
                                                // onClick={(event) => {
                                                //   handleCheckboxClick(event);
                                                // }}
                                                // onChange={(event) => {
                                                //   handleConfirmationOpen(true);
                                                //   handleIsQualified(
                                                //     Employer.employer.id,
                                                //     "qualified",
                                                //     event
                                                //   );
                                                // }}
                                                onClick={() => {
                                                  openIsQualifyPopup(
                                                    "qualify",
                                                    Employer.employer.id
                                                  );
                                                }}
                                              />

                                              <label
                                                htmlFor={`qualified_${Employer.employer.id}`}
                                              >
                                                {" "}
                                                <GoDotFill
                                                  style={{
                                                    color: "#169C50",
                                                    fontSize: 20,
                                                  }}
                                                />
                                                Qualified
                                              </label>
                                            </div>
                                          </a>
                                        </li>
                                        <li
                                          // onClick={() => {
                                          //   openIsQualifyPopup("notQualify");
                                          // }}
                                          onClick={() =>
                                            handleButtonClick(
                                              "notQualified",
                                              Employer.employer.id
                                            )
                                          }
                                        >
                                          <a className="dropdown-item" href="#">
                                            <div
                                              className={`${FBstyle.select_wrp}`}
                                            >
                                              <input
                                                ref={inputRef.notQualified}
                                                type="radio"
                                                checked={
                                                  Employer.employer.notQualified
                                                }
                                                onClick={() => {
                                                  openIsQualifyPopup(
                                                    "notQualify",
                                                    Employer.employer.id
                                                  );
                                                }}
                                                name={`status_${Employer.employer.id}`}
                                                id={`notQualified_${Employer.employer.id}`}
                                                // onChange={(event) => {
                                                //   handleConfirmationOpen(true);
                                                //   handleIsQualified(
                                                //     Employer.employer.id,
                                                //     "notQualified",
                                                //     event
                                                //   );
                                                // }}
                                                // onClick={(event) => {
                                                //   handleCheckboxClick(event);
                                                // }}
                                              />
                                              <label
                                                htmlFor={`notQualified_${Employer.employer.id}`}
                                              >
                                                <GoDotFill
                                                  style={{
                                                    color: "#b2261c",
                                                    fontSize: 20,
                                                  }}
                                                />{" "}
                                                Not Qualified
                                              </label>
                                            </div>
                                          </a>
                                        </li>
                                        <li
                                          onClick={() =>
                                            setShowEmployerSendSLA(
                                              !showEmployerSendSLA
                                            )
                                          }
                                        >
                                          <div className="dropdown-item">
                                            <label htmlFor="">
                                              <GoDotFill
                                                style={{
                                                  color: "#16617b",
                                                  fontSize: 20,
                                                }}
                                              />{" "}
                                              SLA Email
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </StyledTableCell>
                              </TableRow>
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <h6 className="text-danger">Not found</h6>
                      </>
                    )}
                  </TableBody>
                  {showEmployerSendSLA && (
                    <EmployerEmailSendSLA
                      Id={currentCandidateDetail.id}
                      onClose={closeSLA}
                      onSuccess={closeSLA}
                      toEmail={currentCandidateDetail.emailId}
                    />
                  )}
                  {showConfirmationPopup && (
                    <MyModal>
                      <ModalContainer
                        zIndex={1005}
                        childComponent={
                          <>
                            <ConfirmationPopup
                              heading={"Confirmation"}
                              headingText={`Are you sure you want to update <b> ${currentCandidateDetail.contactPersonName}</b>`}
                              onConfirm={ConfirmFormSubmit}
                              enableSubmit={enableSubmit}
                              onRequestClose={handleConfirmationClose}
                            />
                          </>
                        }
                      />
                    </MyModal>
                  )}
                  {isQualifiedDetails.openPopup && (
                    <MyModal>
                      <ModalContainer
                        zIndex={10000}
                        childComponent={
                          <ConfirmationPopup
                            heading={"Confirmation"}
                            headingText={isQualifiedDetails.confirmtext}
                            onConfirm={ConfirmFormSubmit}
                            enableSubmit={enableSubmit}
                            onRequestClose={handleConfirmationClose}
                            //</br> with <b>${contactPersonName}</b>
                          />
                        }
                      />
                    </MyModal>
                  )}
                </Table>
              </TableContainer>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center mb-3 position-absolute bottom-0 start-50 translate-middle-x">
            <Stack spacing={2}>
              <Pagination
                count={pageCount}
                // page={page}
                onChange={candidatePagination}
                variant="outlined"
                shape="rounded"
                color="success"
                size="medium"
              />
            </Stack>
          </div>
        </div>
      </>
    </div>
  );
}
