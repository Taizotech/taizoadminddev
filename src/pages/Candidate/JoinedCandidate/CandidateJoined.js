/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import canLeadStyle from "../CandidateLeadTable/candidateLead.module.scss";
import interviewStyle from "../Candidate interview schedule list/candidateInterviewSchedule.module.scss";
import {
  Box,
  FormControl,
  FormHelperText,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  tableCellClasses,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { LuRefreshCcw } from "react-icons/lu";
import {
  GetAllsdminDetails,
  GetJoinedCandidate,
  PutInterviewStatus,
  getCandidateLead,
  getcandidateDetails,
} from "../../../apiServices";
import Nojoid from "../Candidate interview schedule list/Nojoid";
import {
  DMMMYYYY_formate,
  MyModal,
  capitalizeWords,
  formatDate,
  textTruncate,
} from "../../../utility";
import { useDispatch, useSelector } from "react-redux";
import {
  CandidateJoinedListActions,
  commonPopupActions,
} from "../../../redux-store/store";
import CandidateJoinedFilter from "./CandidateJoinedFilter";
import SendInvoiceToEmployer from "./SendInvoiceToEmployer";
import { MdSendToMobile } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ModalContainer from "../../../components/modal_popup";
import SuccessTick from "../../../components/success_tick";
import downloadExcelFile from "../../../components/xlsxSheetDownLoad/xlsxDownload";
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e2dedeed",
    color: "#545454f0",
    maxWidth: "350px",
    padding: "8px",
    "@media (max-width: 992px)": {
      // backgroundColor: "red",
      // padding: "5px 50px",
      // textAlign: "left",
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "8px",
    "@media (max-width: 992px)": {
      // backgroundColor: "red",
      // padding: "5px 50px",
      // textAlign: "center",
    },
  },
}));

function CandidateJoined() {
  //   const [formData, setFormDate] = useState({
  //     page: 1,
  //     size: 10,
  //   });
  const adminDetails = useSelector((state) => state.adminDetails);
  let isSuperAdmin = adminDetails.roleID == 1;
  const JoinedList = useSelector(
    (state) => state.CandidateJoinedListDetails.CandidateJoinedFilter
  );
  const size = useSelector(
    (state) => state.CandidateJoinedListDetails.CandidateJoinedFilter.size
  );
  const [currentMetaDetail, setCurrentMetaDetail] = useState();
  const [currentJoningDate, setCurrenJoningDate] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const [pageCount, setpageCount] = useState();
  const [openInvoiceSend, setOpenInvoiceSend] = useState(false);
  const Dispatch = useDispatch();
  const [joinedCandidateList, setJoinedCandidateList] = useState([]);
  const [adminName, setAdminName] = useState([]);
  const [adminid, setAdminId] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [isNotesEmpty, setIsNotesEmpty] = useState(false);
  const [currentInterviewId, setCurrentInterviewId] = useState("");
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [interviewStatus, setInterviewStatus] = useState({
    caninterviewid: "",
    statusfield: "",
    date: "",
    notes: "",
  });
  const handleClick = (id) => {
    setCurrentInterviewId(id);
  };

  useEffect(() => {
    GetAllsdminDetails().then((data) => {
      console.log(data, "All admin details");
      const adminNames = data.map((item) => item.userName);
      const adminIds = data.map((item) => item.id);
      setAdminName(adminNames);
      setAdminId(adminIds);
    });

    let adminId = isSuperAdmin ? 0 : localStorage.getItem("adminID");
    Dispatch(CandidateJoinedListActions.setJoinedFilterAdminId(adminId));
  }, [adminDetails]);
  useEffect(() => {}, [JoinedList]);
  useEffect(() => {
    GetJoinedCandidate(JoinedList).then((data) => {
      console.log(data, "Candidate Joinded response");
      setJoinedCandidateList(data.candidateList);
      setpageCount(Math.ceil(data.totalCount / size));
    });
  }, [JoinedList]);
  const calculateDuration = (joinedOn) => {
    const joinedDate = new Date(joinedOn);
    const currentDate = new Date();
    const timeDifference = currentDate - joinedDate;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };
  const handleReset = () => {
    // setShowLoader(true);

    setJoinedCandidateList({
      page: 1,
      size: 10,
    });

    // Fetch data after resetting
    GetJoinedCandidate(JoinedList).then((data) => {
      console.log(data, "Candidate Joinded response");
      setJoinedCandidateList(data.candidateList);
      setpageCount(Math.ceil(data.totalCount / size));
    });
  };
  function candidatePagination(event, page) {
    const currentPage = page;

    Dispatch(CandidateJoinedListActions.setJoinedFilterPage(currentPage));
  }
  function candidateSize(size) {
    Dispatch(CandidateJoinedListActions.setJoinedFilterSize(size));

    console.log(size);
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
  const handlePopupDetails = (id, type) => {
    console.log(id);

    Dispatch(
      commonPopupActions.setShowPopup({
        name: type,
        id: id,
      })
    );
  };
  function handleCloseNotes() {
    setShowConfirmPopup(false);
    setIsNotesEmpty(false);
  }

  function handleConfirmationOpen() {
    setShowConfirmPopup(true);
  }
  const handleRadioBtn = (candidateId, statusFieldName, event) => {
    // let isChecked = event.target.checked;
    console.log(candidateId, "candidateId");
    if (!event || event) {
      handleConfirmationOpen();
      setInterviewStatus((prev) => ({
        ...prev,
        caninterviewid: currentInterviewId,
        statusfield: statusFieldName,
      }));

      // Retrieve contactPersonName from CandidateInterviewList
      const selectedCandidate = joinedCandidateList.find(
        (candidate) => candidate.candidateInterview.id === currentInterviewId
      );
      // if (selectedCandidate) {
      //   setContactPersonName(selectedCandidate.CandidateModel.firstName);
      // }
      // if (selectedCandidate) {
      //   setcontactID(selectedCandidate.candidateInterview.id);
      // }
    }
  };
  const ConfirmFormSubmit = (e) => {
    e.preventDefault();
    // if (interviewStatus.notes.trim() === "") {
    //   setIsNotesEmpty(true);
    //   return;
    // }
    if (interviewStatus.notes.trim() === "") {
      setIsNotesEmpty(true);
      return;
    } else {
      PutInterviewStatus(
        interviewStatus.caninterviewid,
        interviewStatus.statusfield,
        interviewStatus.date,
        interviewStatus.notes
      ).then(() => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setShowConfirmPopup(false);
        }, 3000);
      });
    }
  };
  function handleCloseNotes() {
    setShowConfirmPopup(false);
    setIsNotesEmpty(false);
  }

  function handleConfirmationOpen() {
    setShowConfirmPopup(true);
  }
  useEffect(() => {
    console.log("Checked Values:", selectedCheckboxes);
  }, [selectedCheckboxes]);

  const data = [
    {
      candidateid: currentJoningDate?.candidateInterview?.id,
      "Candidate Name": capitalizeWords(
        (currentMetaDetail?.firstName || "N/A") +
          " " +
          (currentMetaDetail?.lastName || "")
      ),
      "Mobile Number": currentMetaDetail?.mobileNumber || "N/A",
      "Job Category":
        capitalizeWords(currentJoningDate?.JobsModel?.jobCategory) || "N/A",
      "Company Name":
        capitalizeWords(currentJoningDate?.candidateInterview?.companyName) ||
        "N/A",
      "Joining Date": formatDate(
        currentJoningDate?.candidateInterview?.joinedOn
      ),
    },
  ];
  const handleCheckboxChange = (id) => {
    setSelectedCheckboxes((prevSelectedCheckboxes) => {
      const existingIndex = prevSelectedCheckboxes.findIndex(
        (item) => item.id === id
      );

      if (existingIndex !== -1) {
        return [
          ...prevSelectedCheckboxes.slice(0, existingIndex),
          ...prevSelectedCheckboxes.slice(existingIndex + 1),
        ];
      } else {
        // Add new checkbox with associated data
        return [...prevSelectedCheckboxes, { id, data }];
      }
    });
  };
  const getDataForId = (id) => {
    const selectedData = selectedCheckboxes.flatMap((checkbox) => {
      return checkbox.data.map((data) => ({
        "Candidate Name": data["Candidate Name"],
        "Mobile Number": data["Mobile Number"],
        "Company Name": data["Company Name"],
        "Job Category": data["Job Category"],
        "Joining Date": data["Joining Date"],
        // "candidate id": data["candidate id"],
      }));
    });

    console.log(selectedData, "hgh");
    return selectedData;
  };

  const handleXlsxDownload = (id) => {
    downloadExcelFile(getDataForId(), "example.xlsx");
  };

  return (
    <div>
      <>
        <div className={`${interviewStyle.FilterHead}`}>
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
            {/* <div className="mt-1 me-2 ">Total Count : {totalCount}</div> */}
            {/* <div
              className="btn btn-danger p-1 me-2 mx-2 ms-auto mt-1"
                          onClick={handleXlsxDownload.bind(
                null,
                currentJoningDate?.candidateInterview?.id
              )}
            >
              download
            </div> */}
            <div
              className="p-1 success me-2 mx-2 ms-auto mt-1"
              onClick={handleReset}
            >
              <LuRefreshCcw />
            </div>
            <button
              className={`me-2 ${canLeadStyle.NewLead}`}
              onClick={() => setOpenInvoiceSend(true)}
            >
              <MdSendToMobile /> Send Invoice
            </button>
            <CandidateJoinedFilter />
          </div>
        </div>
        <div className={`${interviewStyle.Container}`}>
          {/* <Paper sx={{ width: "100%", overflow: "hidden" }}> */}
          <div className={`table-responsive-sm ${interviewStyle.responsive}`}>
            <TableContainer className={`${interviewStyle.TableContainer}`}>
              <Table
                stickyHeader
                aria-label="sticky table"
                // size={isSmallScreen ? "medium" : "small"}
                className={`${interviewStyle.TableDetails}`}
                // style={{ width: "1600px", overflowX: "auto" }}
              >
                <TableHead>
                  <TableRow>
                    {/* <StyledTableCell>Select</StyledTableCell> */}
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell style={{ width: "auto" }} align="left">
                      Mobile&nbsp;Number
                    </StyledTableCell>
                    <StyledTableCell style={{ width: "auto" }} align="left">
                      Job&nbsp;Category
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      Company&nbsp;Name
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      CTC&nbsp;(in rupees)
                    </StyledTableCell>
                    {isSuperAdmin && (
                      <StyledTableCell>Assigned To</StyledTableCell>
                    )}
                    <StyledTableCell align="left">
                      Joining&nbsp;Date
                    </StyledTableCell>
                    <StyledTableCell align="left">Duration</StyledTableCell>
                    <StyledTableCell align="left">Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {joinedCandidateList.length > 0 ? (
                    <>
                      {joinedCandidateList.map((candidate, i) => (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          key={i}
                          onClick={() => {
                            setCurrentMetaDetail(candidate.CandidateModel);
                            setCurrenJoningDate(candidate);
                          }}
                        >
                          {/*<StyledTableCell>
                            <input
                              type="checkbox"
                              checked={selectedCheckboxes.some(
                                (item) =>
                                  item.id ===
                                    candidate.candidateInterview?.id &&
                                  item.data === data.candidateId // Compare data as well
                              )}
                              onChange={() =>
                                handleCheckboxChange(
                                  candidate.candidateInterview?.id,
                                  data
                                )
                              }
                            /> 
                          </StyledTableCell>*/}
                          <StyledTableCell
                            sx={{ color: "#0b7af0", cursor: "pointer" }}
                            title={
                              candidate.CandidateModel?.firstName +
                                " " +
                                candidate.CandidateModel?.lastName || null
                            }
                            onClick={() => {
                              handleCandidateDetails(
                                candidate.CandidateModel.id,
                                "RegisterCandidate"
                              );
                            }}
                          >
                            {candidate.CandidateModel?.firstName
                              ? textTruncate(
                                  capitalizeWords(
                                    candidate.CandidateModel.firstName
                                  ),
                                  15
                                ) +
                                " " +
                                (candidate.CandidateModel?.lastName
                                  ? textTruncate(
                                      capitalizeWords(
                                        candidate.CandidateModel.lastName
                                      ),
                                      15
                                    ) + ""
                                  : "")
                              : "-"}
                          </StyledTableCell>
                          <StyledTableCell>
                            {candidate?.CandidateModel &&
                            candidate.CandidateModel.mobileNumber != null
                              ? " " +
                                String(
                                  candidate.CandidateModel.mobileNumber
                                ).slice(0, 10)
                              : "-"}
                          </StyledTableCell>

                          <StyledTableCell
                            title={candidate.JobsModel?.jobCategory || null}
                            sx={{ color: "#0b7af0", cursor: "pointer" }}
                            onClick={() => {
                              handlePopupDetails(
                                candidate.candidateInterview.jobId,
                                "jobDetails"
                              );
                            }}
                          >
                            {candidate.JobsModel?.jobCategory
                              ? textTruncate(
                                  capitalizeWords(
                                    candidate.JobsModel.jobCategory
                                  ),
                                  15
                                )
                              : "-"}
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{ color: "#0b7af0", cursor: "pointer" }}
                            title={
                              candidate.candidateInterview?.companyName || null
                            }
                            onClick={() => {
                              handlePopupDetails(
                                candidate.EmployerModel.id,
                                "employerDetails"
                              );
                            }}
                          >
                            {candidate.candidateInterview?.companyName
                              ? textTruncate(
                                  capitalizeWords(
                                    candidate.candidateInterview.companyName
                                  ),
                                  15
                                )
                              : "-"}
                          </StyledTableCell>
                          <StyledTableCell>
                            {candidate.candidateInterview.ctc != null &&
                            candidate.candidateInterview.ctc != ""
                              ? candidate.candidateInterview.ctc
                              : "-"}
                          </StyledTableCell>
                          {isSuperAdmin && (
                            <StyledTableCell align="left">
                              <>
                                {
                                  adminName[
                                    adminid.indexOf(
                                      candidate.CandidateModel?.assignTo
                                    )
                                  ]
                                }
                              </>
                            </StyledTableCell>
                          )}
                          <StyledTableCell>
                            {
                              <DMMMYYYY_formate
                                dateValue={
                                  candidate.candidateInterview.joinedOn
                                }
                              />
                            }
                          </StyledTableCell>
                          <StyledTableCell>
                            {calculateDuration(
                              candidate.candidateInterview.joinedOn
                            )}{" "}
                            day(s)
                          </StyledTableCell>
                          <StyledTableCell>
                            <div className="d-flex justify-content-between">
                              <div className={interviewStyle.LeftCompany_wrp}>
                                {candidate.candidateInterview
                                  .leftTheCompany && (
                                  <>
                                    <input
                                      type="checkbox"
                                      name={`statusfield_${candidate.candidateInterview.id}`}
                                      id={`leftCompany${candidate.candidateInterview.id}`}
                                      checked={
                                        candidate.candidateInterview
                                          .leftTheCompany
                                      }
                                    />
                                    {candidate.candidateInterview
                                      .leftTheCompany ? (
                                      <Tooltip title="Already candidate LeftCompany">
                                        <label
                                          htmlFor={`leftCompany${candidate.candidateInterview.id}`}
                                        >
                                          Left Company
                                        </label>
                                      </Tooltip>
                                    ) : (
                                      <label
                                        htmlFor={`leftCompany${candidate.candidateInterview.id}`}
                                      >
                                        Left Company
                                      </label>
                                    )}
                                  </>
                                )}
                              </div>
                              <div className="btn-group dropstart">
                                <button
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  data-bs-no-caret="true"
                                  aria-expanded="false"
                                  onClick={(e) => {
                                    handleClick(
                                      candidate.candidateInterview.id,
                                      e
                                    );
                                  }}
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
                                  }}
                                >
                                  <BsThreeDotsVertical />
                                  {/* <AiOutlineEdit /> */}
                                </button>
                                <ul
                                  className="dropdown-menu"
                                  style={{ textAlign: "left" }}
                                  // ref={dropdownRef}
                                >
                                  {candidate.candidateInterview.joined ===
                                    true && (
                                    <li
                                      onClick={(event) =>
                                        handleRadioBtn(
                                          candidate.candidateInterview.id,
                                          "isLeftCompany",
                                          event.target.checked
                                        )
                                      }
                                    >
                                      <a className="dropdown-item" href="#">
                                        <div
                                          className={`${interviewStyle.select_wrp}`}
                                        >
                                          <input
                                            // ref={inputRef.leftCompany}
                                            type="checkbox"
                                            name={`statusfield_${candidate.candidateInterview.id}`}
                                            id={`leftCompany_${candidate.candidateInterview.id}`}
                                            checked={
                                              candidate.candidateInterview
                                                .leftCompany
                                            }
                                            // onChange={(event) =>

                                            // }
                                          />

                                          <label
                                            htmlFor={`leftCompany_${candidate.candidateInterview.id}`}
                                          >
                                            <GoDotFill
                                              style={{
                                                color: "#fa9e0a",
                                                fontSize: 20,
                                              }}
                                            />{" "}
                                            Left Company
                                          </label>
                                        </div>
                                      </a>
                                    </li>
                                  )}
                                </ul>
                              </div>
                            </div>
                          </StyledTableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center">
                      {" "}
                      <Nojoid />
                    </div>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-3 position-absolute bottom-0 start-50 translate-middle-x">
          <Stack spacing={2}>
            <Pagination
              count={pageCount}
              variant="outlined"
              shape="rounded"
              color="success"
              boundaryCount={1}
              siblingCount={0}
              onChange={candidatePagination}
            />
          </Stack>
        </div>
        {openInvoiceSend && (
          <>
            <SendInvoiceToEmployer close={() => setOpenInvoiceSend(false)} />
          </>
        )}
        {showConfirmPopup && (
          <MyModal>
            <ModalContainer
              childComponent={
                <>
                  <div
                    style={{
                      width: "400px",
                    }}
                  >
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "390px" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <>
                        <div className="text-center mb-2">Add Notes</div>

                        <>
                          <TextField
                            id="outlined-multiline-flexible"
                            label="Add Notes"
                            multiline
                            // style={{ width: "100%" }}
                            error={isNotesEmpty}
                            helperText={
                              isNotesEmpty ? "Notes cannot be empty" : ""
                            }
                            required
                            onChange={(event) => {
                              setInterviewStatus((prev) => ({
                                ...prev,
                                notes: event.target.value,
                              }));
                              setIsNotesEmpty(false);
                            }}
                            maxRows={4}
                            fullWidth
                          />
                          <>
                            {" "}
                            {interviewStatus.statusfield ===
                              "isLeftCompany" && (
                              <>
                                <label htmlFor="" className="mt-3 ms-2">
                                  Select the date on which the candidate left ?
                                </label>
                                <FormControl fullWidth error={isNotesEmpty}>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DatePicker
                                      label="Date"
                                      sx={{ width: "100%" }}
                                      // value={dayjs(interviewStatus.date)}

                                      onChange={(datefeild) => {
                                        setInterviewStatus((prev) => ({
                                          ...prev,
                                          date: datefeild.$d,
                                        }));
                                        setIsNotesEmpty(false);
                                      }}
                                      fullWidth
                                      required
                                    />
                                    {isNotesEmpty && (
                                      <FormHelperText error>
                                        Please select the date on which the
                                        candidate left
                                      </FormHelperText>
                                    )}
                                  </LocalizationProvider>
                                </FormControl>
                              </>
                            )}
                          </>
                          <div className="d-flex justify-content-end gap-1 mt-2">
                            <button
                              className="btn text-white"
                              onClick={handleCloseNotes}
                              style={{ backgroundColor: "#d00a0a" }}
                            >
                              Close
                            </button>
                            <button
                              className="btn text-white"
                              onClick={ConfirmFormSubmit}
                              style={{ backgroundColor: "#169C50" }}
                            >
                              Submit
                            </button>
                          </div>{" "}
                        </>
                      </>
                    </Box>
                  </div>
                </>
              }
            />
          </MyModal>
        )}
        {showSuccess && (
          <MyModal>
            <ModalContainer
              childComponent={<SuccessTick HeadText="Successfully Updated" />}
            />
          </MyModal>
        )}
      </>
    </div>
  );
}

export default CandidateJoined;
