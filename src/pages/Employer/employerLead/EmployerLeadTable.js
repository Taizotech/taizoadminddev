/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useEffect, useRef, useState } from "react";
import {
  Backdrop,
  CircularProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import styled from "styled-components";
import FBstyle from "../../Candidate/FacebookMeta/candidateFacebookMeta.module.scss";
import canLeadStyle from "../../Candidate/CandidateLeadTable/candidateLead.module.scss";
import { useDispatch, useSelector } from "react-redux";
import EmployerLeadFilter from "./EmployerLeadFilter";
import EmployerSendSLA from "./sendSLA";
import {
  GetAllsdminDetails,
  GetEmployerLeadList,
  PutEmployerLeadCheck,
} from "../../../apiServices";
import RegisterCandidateStyle from "../../Candidate/CandidateRegistered/RegisteredCandidate.module.scss";
import {
  DDMMYYYY_formate,
  MyModal,
  capitalizeWords,
  textTruncate,
} from "../../../utility";
import { Stack } from "rsuite";
import {
  EmployerLeadActions,
  employerTimelineActions,
} from "../../../redux-store/store";
import { GoDotFill } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose, AiOutlineUserAdd } from "react-icons/ai";
import ModalContainer from "../../../components/modal_popup";
import ConfirmationPopup from "../../../components/ModalPopups/confirmationPopup";
import EmployerLeadTimeline from "./LeadTimeLine/TimelineView";
import EmployerLeadDetailsView from "../../../components/ModalPopups/EmployerPopup/EmployerLeadDetailsView";
import EmployerLeadPost from "./EmployerLeadPost";
import EmployerLeadUpdate from "./EmployerLeadUpdate";
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#d2d2d2",
    color: "#545454f0",
    padding: "8px",
    "@media (max-width: 992px)": {},
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "8px",
    "@media (max-width: 992px)": {},
  },
}));

function EmployerLeadTable() {
  const EmployerLead = useSelector(
    (state) => state.EmployerLeadDetails.EmployerLeadFilter
  );
  const timelineDetails = useSelector(
    (state) => state.employerTimeline.employerLeadTimeline
  );
  const totalPage = useRef(0);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [EmployerLeadList, setEmployerLeadList] = useState([]);
  const [showEmployerSendSLA, setShowEmployerSendSLA] = useState(false);
  const [currentCandidateDetail, setCurrentCandidateDetails] = useState();
  const [leadCount, setLeadCount] = useState("");
  const [showLoader, setShowLoader] = useState(false); // New state for loader
  const [addnewleadopen, setAddnewLeadOpen] = useState(false);
  const [addnewupdateopen, setAddnewUpdateOpen] = useState(false);
  const [showConfirmationPopup, setShowConfirmPopup] = useState(false);
  const [putLead, setputLead] = useState({
    empLeadId: "",
    qualified: false,
    notQualified: false,
  });
  const [selectedId, setSelectedId] = useState();
  const [leadDetails, setLeadDetails] = useState({
    show: false,
    date: {},
  });
  const adminDetails = useSelector((state) => state.adminDetails);
  const passMobileNumberToAnotherFile = (mobileNumber) => {
    // Your logic to pass the mobile number to another file
    console.log("Mobile Number:", mobileNumber);
  };

  let isSuperAdmin = adminDetails.roleID == 1;
  const [adminName, setAdminName] = useState([]);
  const [adminid, setAdminId] = useState([]);
  useEffect(() => {
    GetAllsdminDetails().then((data) => {
      console.log(data, "All admin details");
      const adminNames = data.map((item) => item.userName);
      const adminIds = data.map((item) => item.id);
      setAdminName(adminNames);
      setAdminId(adminIds);
    });
  }, []);
  useEffect(() => {
    console.log(EmployerLead);
  }, [EmployerLead]);
  const showLeadDetails = (data, show) => {
    setLeadDetails((prev) => ({ ...prev, data: data, show: show }));
  };
  const Dispatch = useDispatch();
  useEffect(() => {
    GetEmployerLeadList(EmployerLead)
      .then((data) => {
        console.log(data, "metaLeadsList data");
        setEmployerLeadList(data.data.content);
        setLeadCount(data.data.totalElements);
        totalPage.current = data.data.totalPages;
      })
      .catch(() => {
        setEmployerLeadList([]);
        totalPage.current = 1;
      });
  }, [EmployerLead]);
  function candidatePagination(event, page) {
    const currentPage = page - 1;
    console.log(currentPage, "current page");
    Dispatch(EmployerLeadActions.setEmployerLeadFilterPage(currentPage));
  }
  function candidateSize(size) {
    Dispatch(EmployerLeadActions.setEmployerLeadFilterSize(size));
  }

  const closeSLA = () => {
    setShowEmployerSendSLA(false);
  };

  const inputRef = {
    qualified: useRef(),
    notQualified: useRef(),
    // rescheduled: useRef(),
  };
  const handleButtonClick = (refName) => {
    const ref = inputRef[refName];
    if (ref && ref.current) {
      ref.current.click();
      // console.log(employerId, "refcurrent");
    }
  };

  const handleClicklead = () => {
    setAddnewUpdateOpen(true);
    // setCurrentCandidateDetails(data);
    // console.log(currentCandidateDetail)
  };

  let prefillData = {};

  if (currentCandidateDetail) {
    const mobileNumber = currentCandidateDetail.mobileNumber;
    const companyName = currentCandidateDetail.companyName;
    const emailId = currentCandidateDetail.emailId;
    const contactPersonName = currentCandidateDetail.contactPersonName;

    prefillData = {
      mobileNumber: currentCandidateDetail.mobileNumber,
      companyName: currentCandidateDetail.companyName,
      emailId: currentCandidateDetail.emailId,
      contactPersonName: currentCandidateDetail.contactPersonName,

      // Add other fields as needed
    };
  }

  function currentCanDetails(data) {
    // console.log(data, "Current Dataaaaaa");
    setCurrentCandidateDetails(data);
  }

  function handleConfirmationClose() {
    setShowConfirmPopup(false);
  }

  function handleConfirmationOpen() {
    setShowConfirmPopup(true);
  }
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxClick = () => {
    // event.stopPropagation();
    setIsChecked(!isChecked);
  };
  const handleIsQualified = (empLeadId, status, event) => {
    let isChecked = event.target.checked;
    console.log(event.target.checked, "target");

    if (isChecked) {
      if (status === "qualified") {
        setputLead({
          empLeadId: currentCandidateDetail.id,
          qualified: true,
          notQualified: false,
        });
      } else {
        setputLead((prev) => ({
          ...prev,
          empLeadId: currentCandidateDetail.id,
          qualified: false,
          notQualified: true,
        }));
      }
    }
  };

  function ConfirmFormSubmit() {
    console.log(putLead.empLeadId, "sjadj");
    if (putLead.empLeadId) {
      setEnableSubmit(true);
      PutEmployerLeadCheck(putLead).then(() => {
        setShowConfirmPopup(false);
        setEnableSubmit(false);
        GetEmployerLeadList(EmployerLead)
          .then((res) => {
            // setLoading(false);
            // console.log(res, "response Data");
            setEmployerLeadList(res.data.content);
            totalPage.current = res.data.totalPages;
          })
          .catch(() => {
            setEmployerLeadList([]);
          });
      });
    }
  }
  function handleTimelineOpen(el) {
    // setTimeline((prev) => ({ ...prev, empLeadId: el.id, showTimeline: true }));
    setSelectedId(el.id);
    Dispatch(employerTimelineActions.setShowEmpLeadTimeline(true));
  }
  const Reloadresponse = () => {
    GetEmployerLeadList(EmployerLead)
      .then((res) => {
        // setLoading(false);
        // console.log(res, "response Data");
        setEmployerLeadList(res.data.content);
        totalPage.current = res.data.totalPages;
      })
      .catch(() => {
        setEmployerLeadList([]);
      });
  };
  return (
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
          <div className="mt-2 me-2">Total Count : {leadCount}</div>
          <EmployerLeadFilter />
          {/* <Link
            style={{ textDecoration: "none" }}
            to={{ pathname: "/Employer_lead" }}
          > */}
          <button
            className={`ms-2 ${canLeadStyle.NewLead}`}
            onClick={() => setAddnewLeadOpen(true)}
          >
            <AiOutlineUserAdd /> Add New Lead
          </button>
          {/* </Link> */}
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
                    {/* <StyledTableCell>Area</StyledTableCell> */}
                    <StyledTableCell>City</StyledTableCell>
                    {isSuperAdmin && (
                      <StyledTableCell>Assigned By</StyledTableCell>
                    )}
                    <StyledTableCell>Created on</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {EmployerLeadList.length > 0 ? (
                    <>
                      {EmployerLeadList.map((Employer, i) => {
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
                                currentCanDetails(Employer);
                              }}
                            >
                              <StyledTableCell
                                sx={{ color: "#0b7af0", cursor: "pointer" }}
                                title={Employer.contactPersonName}
                                // onClick={(e) => {
                                //   setIsPopupOpenEmpLead(true);
                                //   handleCandidateClick(Employer.id);
                                // }}
                                onClick={() => {
                                  showLeadDetails(Employer, true);
                                }}
                              >
                                {Employer.titles != null ? Employer.titles : ""}{" "}
                                {Employer.contactPersonName
                                  ? textTruncate(Employer.contactPersonName, 20)
                                  : "-"}
                              </StyledTableCell>

                              <StyledTableCell
                                // sx={{ color: "#0b7af0", cursor: "pointer" }}
                                title={Employer.companyName}
                                // onClick={() => {
                                //   handlePopupDetails(
                                //     Employer.id,
                                //     "employerDetails"
                                //   );
                                // }}
                              >
                                {Employer.companyName
                                  ? textTruncate(
                                      capitalizeWords(Employer.companyName),
                                      20
                                    )
                                  : "-"}
                              </StyledTableCell>
                              <StyledTableCell>
                                {Employer.mobileNumber
                                  ? String(Employer.mobileNumber).slice(0, 10)
                                  : ""}
                              </StyledTableCell>
                              <StyledTableCell title={Employer.industry}>
                                {Employer.industry
                                  ? textTruncate(Employer.industry, 20)
                                  : "-"}
                              </StyledTableCell>
                              {/* <StyledTableCell>
                                {Employer.city ? Employer.city : "-"}
                              </StyledTableCell> */}
                              <StyledTableCell>
                                {Employer.city ? Employer.city : "-"}
                              </StyledTableCell>
                              {isSuperAdmin && (
                                <StyledTableCell align="left">
                                  <>
                                    {
                                      adminName[
                                        adminid.indexOf(Employer.assignTo)
                                      ]
                                    }
                                  </>
                                </StyledTableCell>
                              )}
                              <StyledTableCell>
                                <DDMMYYYY_formate
                                  dateValue={Employer.createdTime}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <div
                                  className={`${RegisterCandidateStyle.Status}`}
                                >
                                  <div>
                                    {Employer.qualified === true && (
                                      <>
                                        <div
                                          className={`${RegisterCandidateStyle.qualified}`}
                                        >
                                          Qualified
                                        </div>
                                      </>
                                    )}

                                    {Employer.notQualified === true && (
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
                                        onClick={() =>
                                          handleButtonClick("qualified")
                                        }
                                      >
                                        <a className="dropdown-item" href="#">
                                          <div
                                            className={`${FBstyle.select_wrp}`}
                                          >
                                            <input
                                              ref={inputRef.qualified}
                                              type="radio"
                                              checked={Employer.qualified}
                                              name={`status_${Employer.id}`}
                                              id={`qualified_${Employer.id}`}
                                              onChange={(event) => {
                                                handleConfirmationOpen(true);
                                                handleIsQualified(
                                                  Employer.id,
                                                  "qualified",
                                                  event
                                                );
                                              }}
                                              onClick={(event) => {
                                                handleCheckboxClick(event);
                                              }}
                                            />
                                            <label
                                              htmlFor={`qualified_${Employer.id}`}
                                            >
                                              <GoDotFill
                                                style={{
                                                  color: "#169C50",
                                                  fontSize: 20,
                                                }}
                                              />{" "}
                                              Qualified
                                            </label>
                                          </div>
                                        </a>
                                      </li>
                                      <li
                                        onClick={() =>
                                          handleButtonClick("notQualified")
                                        }
                                      >
                                        <a className="dropdown-item" href="#">
                                          <div
                                            className={`${FBstyle.select_wrp}`}
                                          >
                                            <input
                                              ref={inputRef.notQualified}
                                              type="radio"
                                              checked={Employer.notQualified}
                                              name={`status_${Employer.id}`}
                                              id={`notQualified_${Employer.id}`}
                                              onChange={(event) => {
                                                handleConfirmationOpen(true);
                                                handleIsQualified(
                                                  Employer.id,
                                                  "notQualified",
                                                  event
                                                );
                                              }}
                                              onClick={(event) => {
                                                handleCheckboxClick(event);
                                              }}
                                            />
                                            <label
                                              htmlFor={`notQualified_${Employer.id}`}
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
                                      {/* <li
                                        onClick={() =>
                                          handleTimelineOpen(Employer)
                                        }
                                      >
                                        {/* <a href=""> 
                                        <div className="dropdown-item">
                                          <label htmlFor="">
                                            <GoDotFill
                                              style={{
                                                color: "#16617b",
                                                fontSize: 20,
                                              }}
                                            />{" "}
                                            Show TimeLine
                                          </label>
                                        </div>
                                        {/* </a> 
                                      </li> */}
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
                                            Send SLA
                                          </label>
                                        </div>
                                      </li>
                                      <li
                                        //  onClick={() => setAddnewLeadOpen(true,currentCandidateDetail.mobileNumber)}
                                        onClick={handleClicklead}
                                      >
                                        <div className="dropdown-item">
                                          <label htmlFor="">
                                            <GoDotFill
                                              style={{
                                                color: "#cfd914",
                                                fontSize: 20,
                                              }}
                                            />{" "}
                                            Update
                                          </label>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </StyledTableCell>
                            </TableRow>
                            {showEmployerSendSLA && (
                              <EmployerSendSLA
                                Id={currentCandidateDetail.id}
                                onClose={closeSLA}
                                onSuccess={closeSLA}
                                toEmail={currentCandidateDetail.emailId}
                                companyName={currentCandidateDetail.companyName}
                              />
                            )}
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <h6 className="text-danger">Not Found</h6>
                    </>
                  )}
                </TableBody>
                {showConfirmationPopup && (
                  <MyModal>
                    <ModalContainer
                      // zIndex={2}
                      childComponent={
                        <>
                          <ConfirmationPopup
                            heading={"Confirmation"}
                            headingText={`Are you sure you want to update <b> ${currentCandidateDetail.companyName}</b>`}
                            onConfirm={ConfirmFormSubmit}
                            enableSubmit={enableSubmit}
                            onRequestClose={handleConfirmationClose}
                          />
                        </>
                      }
                    />
                  </MyModal>
                )}
              </Table>
              {/* {isPopupOpenEmpLead && selectedEmployerId && (
                <MyModal>
                  <ModalContainer
                    childComponent={
                      <>
                        <EmployerLeadPopup
                          id={selectedEmployerId}
                          onClose={handleClose}
                        />
                      </>
                    }
                  />
                </MyModal>
              )} */}
            </TableContainer>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-3 position-absolute bottom-0 start-50 translate-middle-x">
          <Stack spacing={2}>
            <Pagination
              count={totalPage.current}
              variant="outlined"
              shape="rounded"
              color="success"
              boundaryCount={1}
              siblingCount={0}
              size="medium"
              onChange={candidatePagination}
            />
          </Stack>
        </div>
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={showLoader}
          onClick={() => {}} // Prevent closing on backdrop click
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {addnewleadopen && (
          <MyModal>
            <ModalContainer
              childComponent={
                <>
                  <div className="p-2" style={{ width: "800px" }}>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="fs-4">
                        <b>Employer Lead Generation</b>
                      </div>
                      <div
                        className="btn btn-outline-danger"
                        onClick={() => {
                          setAddnewLeadOpen(false);
                        }}
                      >
                        <AiOutlineClose />
                      </div>
                    </div>
                    <div
                      className=""
                      style={{ height: "65vh", overflow: "auto" }}
                    >
                      <EmployerLeadPost
                        oncloseLead={() => setAddnewLeadOpen(false)}
                        reloeadpage={Reloadresponse}
                      />
                    </div>
                  </div>
                </>
              }
            />
          </MyModal>
        )}
        {addnewupdateopen && (
          <MyModal>
            <ModalContainer
              childComponent={
                <>
                  <div className="p-2" style={{ width: "800px" }}>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="fs-4">
                        <b>Employer Lead Update</b>
                      </div>
                      <div
                        className="btn btn-outline-danger"
                        onClick={() => {
                          setAddnewUpdateOpen(false);
                        }}
                      >
                        <AiOutlineClose />
                      </div>
                    </div>
                    <div
                      className=""
                      style={{ height: "58vh", overflow: "auto" }}
                    >
                      <EmployerLeadUpdate
                        oncloseLead={() => setAddnewUpdateOpen(false)}
                        reloeadpage={Reloadresponse}
                        mobileNumber={currentCandidateDetail.mobileNumber}
                      />
                    </div>
                  </div>
                </>
              }
            />
          </MyModal>
        )}
        {timelineDetails.showTimeline && (
          <MyModal>
            <ModalContainer
              childComponent={
                <>
                  <div>
                    <EmployerLeadTimeline id={selectedId} />
                  </div>
                </>
              }
            />
          </MyModal>
        )}
        {leadDetails.show && (
          <MyModal>
            <ModalContainer
              // zIndex={2}
              childComponent={
                <>
                  <EmployerLeadDetailsView
                    onClose={() => {
                      setShowLoader(true);
                      setLeadDetails((prev) => ({ ...prev, show: false }));
                      setShowLoader(false);
                    }}
                    employerDetails={leadDetails.data}
                  />
                </>
              }
            />
          </MyModal>
        )}
      </div>
    </>
  );
}

export default EmployerLeadTable;
