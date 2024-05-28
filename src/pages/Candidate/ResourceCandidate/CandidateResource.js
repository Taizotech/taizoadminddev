/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import {
  TextField,
  Box,
  Button,
  Backdrop,
  CircularProgress,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import SuccessTick from "../../../components/success_tick";
import { LuRefreshCcw } from "react-icons/lu";
import { useEffect } from "react";
import {
  GetAllsdminDetails,
  PutCandidateIsQualified,
  getCandidateLead,
  getcandidateDetails,
  postCandidate,
  PostFollowup,
  GetFollowUpEvents,
} from "../../../apiServices";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import canLeadStyle from "../CandidateLeadTable/candidateLead.module.scss";
import RegisterCandidateFilter from "./CandidateResourceFilter";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  CandidateRegisteredActions,
  commonPopupActions,
} from "../../../redux-store/store";
import {
  DMMMYYYY_formate,
  MyModal,
  capitalizeWords,
  textTruncate,
} from "../../../utility";
import { GoDotFill } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import FBStyle from "../FacebookMeta/candidateFacebookMeta.module.scss";
import { useRef } from "react";
import ModalContainer from "../../../components/modal_popup";
import RegisterCandidateStyle from "../CandidateRegistered/RegisteredCandidate.module.scss";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#d2d2d2",
    color: "#545454f0",
    padding: "8px",
    "@media (max-width: 992px)": {},
  },
  [`&.${tableCellClasses.body}`]: {
    padding: "8px",
    fontSize: 14,
    "@media (max-width: 992px)": {},
  },
}));
function CandidateResource() {
  //     const CandidateResource = ({ Id }) => {
  //   const candidateId = Id;
  const CandidateRegisterFilter = useSelector(
    (state) => state.CandidateRegistered.filterData
  );

  const CanList = useSelector(
    (state) => state.CandidateRegistered.RegisterCandidateList
  );

  const [currentCandidateDetail, setCurrentCandidateDetails] = useState();

  // Using the find method to get the candidate with the specified ID
  // const desiredCandidate = CanList.find((candidate) => candidate.candidate_id);
  const [showConfirmationPopup, setShowConfirmPopup] = useState(false);
  const [showConfirmationqualifiedPopup, setShowConfirmQualifiedPopup] =
    useState(false);
  const [isQualifiedDetails, setIsQualifiedDetails] = useState({
    confirmtext: "",
    notes: "",
    isQualified: "",
    openPopup: false,
    candidateId: "",
  });
  const [pageCount, setPageCount] = useState({
    totalPages: 0,
    totalCount: 0,
    currentPage: 1,
  });
  const [followupError, setFollowupError] = useState({
    dateTime: false,
    addNotes: false,
    selectEvent: false,
  });
  const openFollowup = () => {
    setFollowupOpen(true);
  };
  const [size, setSize] = useState(10);
  const [totalCount, setTotalCount] = useState();
  const [Follownotes, setFollownotes] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [eventData, setEventData] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [dateTimeError, setDateTimeError] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [formattedDate, setFormattedDate] = useState(null);
  const [followupopen, setFollowupOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false); // New state for loader
  const adminDetails = useSelector((state) => state.adminDetails);
  let isSuperAdmin = adminDetails.roleID == 1;
  const [adminName, setAdminName] = useState([]);
  const [adminid, setAdminId] = useState([]);
  // const handleFollowSubmit = async () => {
  //   if (!formattedDate) {
  //     setFollowupError((prev) => ({
  //       ...prev,
  //       dateTime: true,
  //     }));
  //     return;
  //   } else if (Follownotes.trim() === "") {
  //     setFollowupError((prev) => ({
  //       ...prev,
  //       addNotes: true,
  //     }));
  //     return;
  //   }
  //   // else if (!selectedValue) {
  //   //   setFollowupError((prev) => ({
  //   //     ...prev,
  //   //     selectEvent: true,
  //   //   }));
  //   //   return;
  //   // }
  //   else {
  //     try {
  //       // const formattedDate = dateTime.toISOString();
  //       await PostFollowup(
  //         null,
  //         null,
  //         currentCandidateDetail.candidate_id,
  //         formattedDate,
  //         Follownotes,
  //         "Candidate"
  //       );

  //       setFormattedDate("");
  //       setSelectedValue("");
  //       setFollownotes("");
  //       setShowSuccess(true);
  //       setTimeout(() => {
  //         setShowSuccess(false);
  //         setShowConfirmPopup(false);
  //       }, 3000);
  //       closeFollowup();
  //     } catch (error) {
  //       console.error("There was a problem with the API call:", error);
  //     }
  //   }
  // };
  const handleFollowSubmit = async () => {
    if (!formattedDate) {
      setFollowupError((prev) => ({
        ...prev,
        dateTime: true,
      }));
      return;
    } else if (Follownotes.trim() === "") {
      setFollowupError((prev) => ({
        ...prev,
        addNotes: true,
      }));
      return;
    } else {
      try {
        const formattedDateTime = dayjs(dateTime);
        const formattedDate = formattedDateTime.format("YYYY-MM-DD");
        const followUpTime = formattedDateTime.format("hh:mm A");

        console.log("Formatted Date:", formattedDate);
        console.log("Follow-Up Time:", followUpTime);

        await PostFollowup(
          null,
          null,
          currentCandidateDetail.candidate_id,
          formattedDate,
          followUpTime,
          Follownotes,
          "Candidate"
        );

        setFormattedDate("");
        setSelectedValue("");
        setFollownotes("");
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setShowConfirmPopup(false);
        }, 3000);
        closeFollowup();
      } catch (error) {
        console.error("There was a problem with the API call:", error);
      }
    }
  };
  const closeFollowup = () => {
    setFollowupOpen(false);
    setFollowupError((prev) => ({
      ...prev,
      dateTime: false,
      addNotes: false,
      selectEvent: false,
    }));
    setFormattedDate("");
    setFollownotes("");
    setSelectedValue("");
    postCandidate(CandidateRegisterFilter).then((data) => {
      console.log(data, "meta data");
      Dispatch(CandidateRegisteredActions.setRegisterCandidateList(data));

      setPageCount((prev) => ({
        ...prev,
        totalPages: Math.ceil(
          (data.length > 0 ? data[0].total_count : 10) / size
        ),
      }));
    });
  };
  useEffect(() => {
    // Fetch follow-up events data when component mounts
    async function fetchEventData() {
      try {
        const data = await GetFollowUpEvents();
        setEventData(data);
      } catch (error) {
        console.error("Error fetching follow-up events:", error);
      }
    }

    fetchEventData();
  }, []);
  useEffect(() => {
    GetAllsdminDetails().then((data) => {
      console.log(data, "All admin details");
      const adminNames = data.map((item) => item.userName);
      const adminIds = data.map((item) => item.id);
      setAdminName(adminNames);
      setAdminId(adminIds);
    });

    let adminId = isSuperAdmin ? -1 : localStorage.getItem("adminID");
    Dispatch(
      CandidateRegisteredActions.setRegisterCandidateListFilterAdminId(adminId)
    );
  }, [adminDetails]);
  useEffect(() => {
    console.log(CanList, "candidateListedjobs");
  }, [CanList]);

  const Dispatch = useDispatch();

  function currentCanDetails(data) {
    // console.log(data,"Current Dataaaaaa");
    setCurrentCandidateDetails(data);
  }

  const handleReset = () => {
    setShowLoader(true); // Set loader to true

    Dispatch(
      CandidateRegisteredActions.setRegisterCandidateList({
        gender: null,
        mobileNumber: -1,
        assignTo: null,
        status: null,
        industry: null,
        jobCategory: null,
        qualification: null,
        candidateType: null,
        skills: null,
        prefLocation: null,
        eligibility: null,
        passed_out_year: -1,
        specification: null,
        maxExperience: -1,
        experience: -1,
        endDate: null,
        createdTime: null,
        page: 1,
        size: 10,
      })
    );

    // Fetch data after resetting
    postCandidate(CandidateRegisterFilter)
      .then((data) => {
        console.log(data, "meta data");
        Dispatch(CandidateRegisteredActions.setRegisterCandidateList(data));

        setPageCount((prev) => ({
          ...prev,
          totalPages: Math.ceil(
            (data.length > 0 ? data[0].total_count : 10) / size
          ),
        }));
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  // useEffect(() => {
  //   setShowLoader(true); // Set loader to true

  //   // console.log(CandidateRegisterFilter, "CandidateRegisterFilter");

  //   postCandidate(CandidateRegisterFilter)
  //     .then((data) => {
  //       // console.log(data, "dataaa");
  //       if (data) {
  //         Dispatch(CandidateRegisteredActions.setRegisterCandidateList(data));
  //         setTotalCount(data[0].total_count);
  //         setPageCount((prev) => ({
  //           ...prev,
  //           totalPages: Math.ceil(
  //             (data.length > 0 ? data[0].total_count : 10) / size
  //           ),
  //         }));
  //       } else {
  //         console.error(
  //           "Data received from postCandidate is undefined or null."
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       alert("Something went wrong" + err);
  //     })
  //     .finally(() => {
  //       setShowLoader(false);
  //     });
  // }, [CandidateRegisterFilter]);
  useEffect(() => {
    setShowLoader(true); // Set loader to true

    postCandidate(CandidateRegisterFilter)
      .then((data) => {
        // console.log(data, "dataaa");
        if (data) {
          Dispatch(CandidateRegisteredActions.setRegisterCandidateList(data));

          // Check if total_count is available in the response data
          if (data[0] && data[0].total_count !== undefined) {
            setTotalCount(data[0].total_count);
            setPageCount((prev) => ({
              ...prev,
              totalPages: Math.ceil(
                (data.length > 0 ? data[0].total_count : 10) / size
              ),
            }));
          } else {
            // If total_count is not available, set totalCount and totalPages to default values
            setTotalCount(0);
            setPageCount((prev) => ({
              ...prev,
              totalPages: 0,
            }));
            // Dispatch an empty array to CandidateRegisteredActions
            Dispatch(CandidateRegisteredActions.setRegisterCandidateList([]));
          }
        } else {
          console.error(
            "Data received from postCandidate is undefined or null."
          );
        }
      })
      .catch((err) => {
        alert("Something went wrong" + err);
      })
      .finally(() => {
        setShowLoader(false);
      });
  }, [CandidateRegisterFilter]);

  function candidatePagination(event, page) {
    const currentPage = page;

    Dispatch(
      CandidateRegisteredActions.setRegisterCandidateListFilterPage(currentPage)
    );
  }

  function handleConfirmationOpenQualify() {
    setShowConfirmQualifiedPopup(true);
  }

  function handleConfirmationOpen() {
    setShowConfirmPopup(true);
  }

  const handleCancelClick = () => {
    setShowConfirmQualifiedPopup(false);
  };

  const handleCancelClicknotqualify = () => {
    setShowConfirmPopup(false);
  };

  function candidateSize(size) {
    setSize(size);
    Dispatch(
      CandidateRegisteredActions.setRegisterCandidateListFiltersize(size)
    );
  }
  const handleCandidateDetails = async (candidateId, type) => {
    let data;
    if (type === "RegisterCandidate") {
      data = await getcandidateDetails(candidateId);
    } else if (type === "CandidateLead") {
      data = await getCandidateLead(candidateId);
    }

    // Dispatch action to show the popup and pass the fetched data
    Dispatch(
      commonPopupActions.setShowPopup({
        name: "candidateDetails",
        id: candidateId,
        type: type,
        data: data,
      })
    );
  };

  const inputRef = {
    qualified: useRef(),
    notQualified: useRef(),
    followup: useRef(),
    // rescheduled: useRef(),
  };
  const handleButtonClick = (refName) => {
    const ref = inputRef[refName];
    if (ref.current) {
      ref.current.click();
    }
  };
  function openIsQualifyPopup(status) {
    // console.log(candidate_id, "idd");
    let confirmText = "";
    let isQualified;
    if (status == "qualify") {
      confirmText = `Are you sure you want to qualify ${currentCandidateDetail.first_name} `;
      isQualified = true;
    } else {
      confirmText = `Are you sure you want to not qualify ${currentCandidateDetail.first_name} `;
      isQualified = false;
    }

    setIsQualifiedDetails((prev) => ({
      ...prev,
      openPopup: true,
      isQualified: isQualified,
      notes: "",
      confirmtext: confirmText,
      candidateId: currentCandidateDetail.candidate_id,
    }));
  }

  function handleConfirmationClose() {
    setIsQualifiedDetails((prev) => ({
      ...prev,
      openPopup: false,
    }));
  }
  function ConfirmFormSubmit() {
    PutCandidateIsQualified(isQualifiedDetails)
      .then(() => {
        const updatedCanList = CanList.map((candidate) => {
          if (candidate.candidate_id === currentCandidateDetail.candidate_id) {
            return {
              ...candidate,
              qualified: isQualifiedDetails.isQualified ? 1 : 0,
              not_qualified: isQualifiedDetails.isQualified ? 0 : 1,
            };
          }
          return candidate;
        });
        Dispatch(
          CandidateRegisteredActions.setRegisterCandidateList(updatedCanList)
        );
        setShowConfirmPopup(false);
        setShowConfirmQualifiedPopup(false);
        setIsQualifiedDetails((prev) => ({
          ...prev,
          openPopup: false,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div>
        <div className={`${canLeadStyle.Topcontainer}`}>
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
            <div className="mt-1 me-2">Total Count : {totalCount}</div>
            <div
              className="p-1 success  me-2 mx-2 ms-auto"

              // style={{ : "#169C50", color: "white" }}
            >
              <LuRefreshCcw onClick={handleReset} />
            </div>
            <RegisterCandidateFilter />
          </div>
        </div>
        <div className="" style={{ maxWidth: "100vw", overflowX: "auto" }}>
          <TableContainer style={{ height: "64vh", overflowY: "auto" }}>
            <Table stickyHeader aria-label="sticky table" className={``}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Mobile Number</StyledTableCell>
                  <StyledTableCell>Job Category</StyledTableCell>
                  <StyledTableCell>Experience</StyledTableCell>
                  <StyledTableCell>Qualification</StyledTableCell>
                  <StyledTableCell>Preferred City</StyledTableCell>
                  {isSuperAdmin && (
                    <StyledTableCell>Assigned To</StyledTableCell>
                  )}
                  <StyledTableCell>Registered on</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {CanList.length > 0 &&
                  CanList.map((data, i) => {
                    return (
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                        onClick={() => {
                          currentCanDetails(data);
                        }}
                      >
                        <StyledTableCell>
                          <span
                            onClick={() => {
                              handleCandidateDetails(
                                data.candidate_id,
                                "RegisterCandidate"
                              );
                            }}
                            style={{ cursor: "pointer" }}
                            className="text-primary "
                            title={data.first_name}
                          >
                            {data.first_name
                              ? textTruncate(
                                  capitalizeWords(data.first_name),
                                  15
                                ) +
                                " " +
                                (data.last_name
                                  ? textTruncate(
                                      capitalizeWords(data.last_name),
                                      15
                                    ) + ""
                                  : "")
                              : "-"}
                          </span>
                        </StyledTableCell>
                        <StyledTableCell>{data.mobile_number}</StyledTableCell>{" "}
                        <StyledTableCell title={data.job_category}>
                          {data.job_category &&
                            textTruncate(data.job_category, 20)}
                          {!data.job_category && <>-</>}
                        </StyledTableCell>{" "}
                        <StyledTableCell>
                          {data.exp_in_years} Year(s)
                        </StyledTableCell>{" "}
                        <StyledTableCell title={data.qualification}>
                          {textTruncate(data.qualification, 20)}
                        </StyledTableCell>{" "}
                        <StyledTableCell title={data.city}>
                          {data.city && textTruncate(data.city, 20)}
                          {!data.city && <>-</>}
                        </StyledTableCell>{" "}
                        {isSuperAdmin && (
                          <StyledTableCell align="left">
                            <>{adminName[adminid.indexOf(data.assign_to)]}</>
                          </StyledTableCell>
                        )}
                        <StyledTableCell>
                          {<DMMMYYYY_formate dateValue={data.created_time} />}
                        </StyledTableCell>{" "}
                        <StyledTableCell>
                          <div className={`${RegisterCandidateStyle.Status}`}>
                            <div>
                              {data.qualified === 1 && (
                                <>
                                  <div
                                    className={`${RegisterCandidateStyle.qualified}`}
                                  >
                                    Qualified
                                  </div>
                                </>
                              )}

                              {data.not_qualified === 1 && (
                                <>
                                  <div
                                    className={`${RegisterCandidateStyle.Notqualified}`}
                                  >
                                    Not Qualified
                                  </div>
                                </>
                              )}
                              {data.is_daily_task === 1 && (
                                <>
                                  <div
                                    className={`${RegisterCandidateStyle.Followup}`}
                                  >
                                    Follow Up
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
                                    openIsQualifyPopup("qualify");
                                  }}
                                >
                                  <a className="dropdown-item" href="#">
                                    <div
                                      className={`${FBStyle.select_wrp}`}
                                      onClick={() => {
                                        handleButtonClick("qualified");
                                        handleConfirmationOpenQualify(true);
                                      }}
                                    >
                                      <input
                                        type="radio"
                                        // ref={inputRef.qualified}
                                        name={`status_${data.user_id}`}
                                        checked={data.qualified}
                                        id={`qualified_${data.user_id}`}
                                      />

                                      <label
                                        htmlFor={`qualified_${data.user_id}`}
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
                                  onClick={() => {
                                    openIsQualifyPopup("notQualify");
                                  }}
                                >
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => {
                                      handleButtonClick("notQualified");
                                      handleConfirmationOpen(true);
                                    }}
                                  >
                                    <div className={`${FBStyle.select_wrp}`}>
                                      <input
                                        // ref={inputRef.notQualified}
                                        type="radio"
                                        checked={data.notQualified}
                                        name={`status_${data.user_id}`}
                                        id={`notQualified_${data.user_id}`}
                                      />
                                      <label
                                        htmlFor={`notQualified_${data.user_id}`}
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
                                  onClick={() => {
                                    openFollowup(true);
                                    //  openIsQualifyPopup("notQualify");
                                  }}
                                >
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() =>
                                      handleButtonClick("followup")
                                    }
                                  >
                                    <div className={`${FBStyle.select_wrp}`}>
                                      <input
                                        // ref={inputRef.notQualified}
                                        type="radio"
                                        checked={data.followup}
                                        name={`status_${data.user_id}`}
                                        id={`followup_${data.user_id}`}
                                      />
                                      <label
                                        htmlFor={`followup_${data.user_id}`}
                                      >
                                        <GoDotFill
                                          style={{
                                            color: "#430CBA",
                                            fontSize: 20,
                                          }}
                                        />{" "}
                                        Follow up
                                      </label>
                                    </div>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </StyledTableCell>
                      </TableRow>
                    );
                  })}

                <div>
                  {!CanList.length > 0 && (
                    <>
                      <div className="m-3 text-danger">Not Found</div>
                    </>
                  )}
                </div>
              </TableBody>
            </Table>
          </TableContainer>

          <>
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
          </>

          <div className="d-flex justify-content-center mt-2">
            <Stack spacing={2}>
              <Pagination
                // count={10}
                shape="rounded"
                siblingCount={1}
                boundaryCount={1}
                count={pageCount.totalPages}
                variant="outlined"
                color="success"
                onChange={candidatePagination}
              />
            </Stack>
          </div>
        </div>
      </div>
      {/* {isQualifiedDetails.openPopup && (
        <MyModal>
          <ModalContainer
            childComponent={
              <ConfirmationPopup
                heading={"Confirmation"}
                headingText={isQualifiedDetails.confirmtext}
                onConfirm={ConfirmFormSubmit}
                // enableSubmit={enableSubmit}
                onRequestClose={handleConfirmationClose}
                //</br> with <b>${contactPersonName}</b>
              />
            }
          />
        </MyModal>
      )} */}
      {showConfirmationqualifiedPopup && (
        <MyModal>
          <ModalContainer
            zIndex={2000}
            childComponent={
              <>
                <div>
                  <div className="text-center mb-3">Qualify Candidate</div>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Add Notes"
                    multiline
                    required
                    onChange={(event) => {
                      setIsQualifiedDetails((prev) => ({
                        ...prev,
                        notes: event.target.value,
                      }));
                    }}
                    maxRows={4}
                    fullWidth
                  />
                </div>
                <div className="d-flex justify-content-end gap-1 mt-4">
                  <button
                    className="btn text-white me-3"
                    onClick={handleCancelClick}
                    style={{ backgroundColor: "#d00a0a" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn text-white"
                    onClick={ConfirmFormSubmit}
                    // disabled={enableSubmit}
                    style={{ backgroundColor: "#169C50" }}
                  >
                    Qualify
                  </button>
                </div>
              </>
            }
          />
        </MyModal>
      )}

      {showConfirmationPopup && (
        <MyModal>
          <ModalContainer
            zIndex={2000}
            childComponent={
              <>
                <div>
                  <div className="text-center mb-3">Disqualify Candidate</div>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Add Notes"
                    multiline
                    required
                    onChange={(event) => {
                      setIsQualifiedDetails((prev) => ({
                        ...prev,
                        notes: event.target.value,
                      }));
                    }}
                    maxRows={4}
                    fullWidth
                  />
                </div>
                <div className="d-flex justify-content-end gap-1 mt-4">
                  <button
                    className="btn text-white me-3"
                    onClick={handleCancelClicknotqualify}
                    style={{ backgroundColor: "#d00a0a" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn text-white"
                    onClick={ConfirmFormSubmit}
                    // disabled={enableSubmit}
                    style={{ backgroundColor: "#169C50" }}
                  >
                    Disqualify
                  </button>
                </div>
              </>
            }
          />
        </MyModal>
      )}

      {followupopen && (
        <MyModal>
          <ModalContainer
            zIndex={1001}
            childComponent={
              <div
                style={{
                  width: "350px",
                  // height: "800px",
                  position: "relative",
                }}
              >
                <FormControl
                  fullWidth
                  error={followupError.dateTime}
                  style={{ marginBottom: "16px" }}
                >
                  {" "}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker", "TextField"]}>
                      <DateTimePicker
                        label="select date and time"
                        error={Boolean(dateTimeError)}
                        // helperText={dateTi/meError}
                        // value={dateTime}
                        onChange={(date) => {
                          setDateTime(date);
                          setFollowupError((prev) => ({
                            ...prev,
                            dateTime: false,
                          }));
                          const formattedDate =
                            dayjs(date).format("YYYY-MM-DD hh:mm A");
                          setFormattedDate(formattedDate);
                        }}
                      />
                      {/* {followupError.dateTime && (
                        <FormHelperText error>
                          Please select a date and time
                        </FormHelperText>
                      )} */}
                      {followupError.dateTime && (
                        <span style={{ color: "#d44349" }}>
                          Please select a date and time
                        </span>
                      )}
                    </DemoContainer>
                  </LocalizationProvider>
                </FormControl>
                <TextField
                  style={{ marginBottom: "16px" }}
                  id="outlined-multiline-flexible"
                  label="Add Notes"
                  multiline
                  onChange={(event) => {
                    setFollownotes(event.target.value);
                    setFollowupError((prev) => ({
                      ...prev,
                      addNotes: false,
                    }));
                  }}
                  maxRows={4}
                  fullWidth
                  error={followupError.addNotes}
                  // helperText={
                  //   followupError.addNotes ? "Notes cannot be empty" : ""
                  // }
                />
                {followupError.addNotes && (
                  <span style={{ color: "#d44349" }}>
                    Notes cannot be empty
                  </span>
                )}
                {/* <FormControl fullWidth style={{ marginBottom: "16px" }}>
                  <InputLabel id="demo-simple-select-label">
                    Follow up for
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Follow up for"
                    value={selectedValue}
                    style={{ marginBottom: "16px", minWidth: "120px" }}
                    error={followupError.selectEvent}
                    onChange={(event) => {
                      setSelectedValue(event.target.value);
                      setFollowupError((prev) => ({
                        ...prev,
                        selectEvent: false,
                      }));
                    }}
                  >
                    {eventData.map((event) => (
                      <MenuItem key={event.id} value={event.eventName}>
                        {event.eventName}
                      </MenuItem>
                    ))}
                  </Select>
                  {followupError.selectEvent && (
                    <span style={{ color: "#d44349" }}>
                      Select event is empty
                    </span>
                  )}
                </FormControl> */}

                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{
                      color: "red",
                      borderColor: "red",
                      marginRight: "8px",
                    }}
                    onClick={closeFollowup}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ color: "green", borderColor: "green" }}
                    onClick={handleFollowSubmit}
                  >
                    Submit
                  </Button>
                </Box>
              </div>
            }
          />
        </MyModal>
      )}
      {showSuccess && (
        <MyModal>
          <ModalContainer
            zIndex="5000"
            childComponent={<SuccessTick HeadText="Successfully Updated" />}
          />
        </MyModal>
      )}
    </>
  );
}

export default CandidateResource;
