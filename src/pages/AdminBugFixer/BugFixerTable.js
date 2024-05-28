/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import interviewStyle from "../Candidate/Candidate interview schedule list/candidateInterviewSchedule.module.scss";
import Nojoid from "../Candidate/Candidate interview schedule list/Nojoid";
import ProbelmSolver from "../../../src/assets/images/SimpleBugimage.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "@material-ui/core";
import { GoDotFill } from "react-icons/go";
import SuccessTick from "../../components/success_tick";
import { IconButton } from "@material-ui/core";
import { IoCloseSharp } from "react-icons/io5";
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
import BugFixerFilter from "./BugFixerFilter";
import { LuRefreshCcw } from "react-icons/lu";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import canLeadStyle from "../Candidate/CandidateLeadTable/candidateLead.module.scss";
import { MyModal, capitalizeWord } from "../../utility";
import ModalContainer from "../../components/modal_popup";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { BugFixerTableActions } from "../../redux-store/store";
import {
  GetBugfixerView,
  PutBugFixerStatusUpdate,
  PutBugFixerInactive,
  GetAdminDeveloper,
  PutMoveAssignBugFixer,
} from "../../apiServices";
import { Ddmmmyyyy_date, DMMMYYYY_formate } from "../../utility";
import BugFixerput from "./BugFixerput";
import BugFixerpost from "./BugFixerpost";
import EditSharp from "@mui/icons-material/EditSharp";
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
function BugFixerTable() {
  const adminDetails = useSelector((state) => state.adminDetails);
  const [isChecked, setIsChecked] = useState(false);
  const [successTick, setSuccessTick] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({
    selectedUserId: "",
  });

  const [currentIndex, setCurrentIndex] = useState();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checkbox state
  };
  let isSuperAdmin = adminDetails.roleID == 1;
  const BugFixerList = useSelector(
    (state) => state.BugFixerTableDetails.FieldBugFixFilter
  );
  const size = useSelector(
    (state) => state.BugFixerTableDetails.FieldBugFixFilter.size
  );
  const Dispatch = useDispatch();
  const [bugFixerList, setbugFixerList] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pageCount, setpageCount] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showtasktype, setShowtasktype] = useState(false);
  const [showpostclose, setShowpostclose] = useState(false);
  const [bugFixerdata, setbugFixerdata] = useState(false);
  const [bugFixerassign, setbugFixerassign] = useState(false);
  const [statusupdate, setstatusupdte] = useState({
    bugId: "",
    bugstatus: "",
  });

  const [assignToList, setAssignToList] = useState([]);
  const [OpenVerfiyForm, setOpenVerifyForm] = useState(false);
  const [showInactiveopen, setShowInactiveopen] = useState(false);
  const [OpenPostForm, setOpenPostForm] = useState(false);
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "green";
      default:
        return "black";
    }
  };

  useEffect(() => {}, [BugFixerList]);
  useEffect(() => {
    GetBugfixerView(BugFixerList).then((data) => {
      console.log(data.data, "Candidate bug fixer response");
      setbugFixerList(data.data);
      // setpageCount(Math.ceil(data.data.totalPages / size));
      //   setpageCount(data.data.totalElements);
      setpageCount(Math.ceil(data.totalElements / size));
    });
  }, [BugFixerList]);
  function candidatePagination(event, page) {
    const currentPage = page - 1;

    Dispatch(BugFixerTableActions.setFieldBugFixFilterPage(currentPage));
  }

  function candidateSize(size) {
    Dispatch(BugFixerTableActions.setFieldBugFixFilterSize(size));
  }

  const handleTickClick = async () => {
    try {
      await PutMoveAssignBugFixer(bugFixerdata.id, assignToList);
      // Update data after API call
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowModal(false);
      }, 3000);
      const data = await GetBugfixerView(BugFixerList);
      console.log(data, "Candidate bug fixer response");
      setbugFixerList(data.data);
      setbugFixerassign(data.data[currentIndex]);
      setpageCount(Math.ceil(data.totalElements / size));
    } catch (error) {
      console.error("Error:", error);
      setErrors({ selectedUserId: "Error occurred while updating." });
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await GetAdminDeveloper();
        setUsers(data.AdminDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Set initial selected users when bugFixerdata.assignedTo is available
    if (bugFixerdata.assignedTo) {
      const initialSelectedUsers = bugFixerdata.assignedTo.split(",");
      setSelectedUserId(initialSelectedUsers);
    }
  }, [bugFixerdata.assignedTo]);

  const handleChange = (event) => {
    console.log(event);
    setAssignToList(event);
  };

  useEffect(() => {
    console.log(selectedUserId, "dataaa");
  }, [selectedUserId]);

  function handleStatusUpdate(bugId, bugstatus) {
    console.log(bugId, "bugId");
    handleCompletedClick();
    setstatusupdte({
      bugId: bugId,
      bugstatus: bugstatus,
    });
  }
  const handleCompletedClick = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleClick = () => {
    setShowtasktype(true);
  };
  const handlepostformClick = () => {
    setOpenPostForm(false);
    GetBugfixerView(BugFixerList).then((data) => {
      setbugFixerList(data.data);
      setpageCount(Math.ceil(data.totalElements / size));
    });
  };
  const handleOpenverifyform = () => {
    setOpenVerifyForm(true);
  };
  const handleInactivefunction = () => {
    setShowInactiveopen(true);
  };

  const handleInactiveCancel = () => {
    setShowInactiveopen(false);
  };

  const handleCloseverifyform = () => {
    setOpenVerifyForm(false);
    GetBugfixerView(BugFixerList).then((data) => {
      setbugFixerList(data.data);
      setpageCount(Math.ceil(data.totalElements / size));
    });
  };

  function handlePutForm(bugId) {
    console.log(bugId, "bugId");
    handleOpenverifyform();
    setstatusupdte({
      bugId: bugId,
    });
  }

  function handleInactive(bugId) {
    console.log(bugId, "bugId");
    handleInactivefunction();
    setstatusupdte({
      bugId: bugId,
    });
  }

  const handleButtonClick = () => {
    setOpenPostForm(!OpenPostForm);
  };

  const handlestatusupdateSubmit = () => {
    PutBugFixerStatusUpdate(statusupdate).then((data) => {
      console.log(data, "status update data");
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowModal(false);
      }, 3000);
      GetBugfixerView(BugFixerList).then((data) => {
        console.log(data.data, "Candidate bug fixer response");
        setbugFixerList(data.data);
        setpageCount(Math.ceil(data.totalElements / size));
        // setpageCount(data.data.totalPages);
      });
    });
  };

  const handleInactiveSubmit = () => {
    PutBugFixerInactive(statusupdate.bugId).then((data) => {
      console.log(data, "status update data");
      setShowInactiveopen(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowModal(false);
      }, 3000);
      GetBugfixerView(BugFixerList).then((data) => {
        console.log(data.data, "Candidate bug fixer response");
        setbugFixerList(data.data);
        setpageCount(Math.ceil(data.totalElements / size));
        // setpageCount(data.data.totalPages);
      });
    });
  };
  function handleReset() {
    GetBugfixerView(BugFixerList).then((data) => {
      console.log(data.data, "Candidate bug fixer response");
      setbugFixerList(data.data);
      setpageCount(Math.ceil(data.totalElements / size));
    });
  }
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
            <div
              className="p-1 success me-2 mx-2 ms-auto mt-1"
              onClick={handleReset}
              style={{ cursor: "pointer" }}
            >
              <LuRefreshCcw />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                className={`rounded-pill `}
                variant="contained"
                color="success"
                sx={{ borderRadius: "60px" }}
                onClick={handleButtonClick}
              >
                Raise Issue/New Feature
              </Button>
              <div style={{ marginLeft: "8px" }}>
                {" "}
                <BugFixerFilter />
              </div>
            </div>
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

                    <StyledTableCell>Task&nbsp;Name</StyledTableCell>

                    <StyledTableCell style={{ width: "auto" }} align="left">
                      Task&nbsp;Type
                    </StyledTableCell>
                    <StyledTableCell style={{ width: "auto" }} align="left">
                      Assigned&nbsp;By
                    </StyledTableCell>
                    <StyledTableCell style={{ width: "auto" }} align="left">
                      Assigned&nbsp;To
                    </StyledTableCell>
                    <StyledTableCell style={{ width: "auto" }} align="left">
                      Start&nbsp;Date
                    </StyledTableCell>
                    <StyledTableCell style={{ width: "auto" }} align="left">
                      End&nbsp;Date
                    </StyledTableCell>
                    <StyledTableCell style={{ width: "auto" }} align="left">
                      Priority
                    </StyledTableCell>
                    <StyledTableCell align="left">Task Image</StyledTableCell>
                    <StyledTableCell align="left">Created On</StyledTableCell>
                    <StyledTableCell align="left">Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bugFixerList && bugFixerList.length > 0 ? (
                    <>
                      {bugFixerList.map((bugData, i) => (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          key={i}
                          onClick={() => {
                            console.log("bugData:", bugData);
                            setbugFixerdata(bugData.bugFixer);
                            if (bugData.bugFixer.assignedTo) {
                              setAssignToList(
                                bugData.bugFixer.assignedTo.split(",")
                              );
                            } else {
                              setAssignToList([]);
                            }
                            setbugFixerassign(bugData);
                            setCurrentIndex(i);
                          }}
                        >
                          <StyledTableCell align="left">
                            {bugData.bugFixer.taskName != null
                              ? capitalizeWord(bugData.bugFixer.taskName)
                              : "-"}
                          </StyledTableCell>

                          <StyledTableCell
                            align="left"
                            onClick={handleClick}
                            style={{
                              cursor: "pointer",
                              color: "blue",
                            }}
                            // onMouseOver={(e) =>
                            //   (e.currentTarget.style.cursor = "pointer")
                            // }
                            // onMouseOut={(e) =>
                            //   (e.currentTarget.style.color = "black")
                            // }
                          >
                            {bugData.bugFixer.taskType !== null
                              ? bugData.bugFixer.taskType
                              : "-"}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {bugData.assignedBy &&
                            bugData.assignedBy.name != null
                              ? bugData.assignedBy.name.toString()
                              : "-"}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {bugData.bugFixer.assignedTo &&
                            bugData.bugFixer.assignedTo != null
                              ? bugData.bugFixer.assignedTo.toString()
                              : "-"}
                          </StyledTableCell>

                          <StyledTableCell align="left">
                            {bugData.bugFixer.startDate !== null ? (
                              <>
                                <DMMMYYYY_formate
                                  dateValue={bugData.bugFixer.startDate}
                                />
                              </>
                            ) : (
                              "-"
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {bugData.bugFixer.endDate !== null ? (
                              <>
                                <DMMMYYYY_formate
                                  dateValue={bugData.bugFixer.endDate}
                                />
                              </>
                            ) : (
                              "-"
                            )}
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            style={{
                              color: getPriorityColor(
                                bugData.bugFixer.priority
                              ),
                            }}
                          >
                            {bugData.bugFixer.priority !== null
                              ? bugData.bugFixer.priority
                              : "-"}
                          </StyledTableCell>

                          <StyledTableCell
                            align="left"
                            scope="row"
                            title={
                              bugData.bugFixer.taskPic
                                ? bugData.bugFixer.taskPic
                                : "No image available"
                            }
                          >
                            {" "}
                            <a
                              href={bugData.bugFixer.taskPic} // Link to the original image
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Tooltip
                                title={
                                  bugData.bugFixer.taskPic
                                    ? "Click to open image"
                                    : "No image available"
                                }
                              >
                                <span>
                                  <img
                                    src={ProbelmSolver} // Default image URL
                                    data-src={bugData.bugFixer.taskPic} // Original image URL
                                    alt=""
                                    style={{
                                      borderRadius: "40%", // Make the image round
                                      width: "40px",
                                      height: "40px", // Set to the desired height
                                      cursor: bugData.bugFixer.taskPic
                                        ? "pointer"
                                        : "default", // Set cursor to pointer if there is an image, otherwise default
                                    }}
                                    onClick={(event) => {
                                      if (!bugData.bugFixer.taskPic) {
                                        event.preventDefault(); // Prevent the default action of clicking on the image
                                      }
                                      if (bugData.bugFixer.taskPic) {
                                        window.open(
                                          event.currentTarget.dataset.src,
                                          "_blank"
                                        ); // Open the original image in a new tab
                                      }
                                    }}
                                  />
                                </span>
                              </Tooltip>
                            </a>
                          </StyledTableCell>

                          <StyledTableCell align="left">
                            <DMMMYYYY_formate
                              dateValue={bugData.bugFixer.createdTime}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <div className="d-flex justify-content-between">
                              <div>
                                {" "}
                                {bugData.bugFixer.status != null ? (
                                  bugData.bugFixer.status === "Completed" ? (
                                    <div
                                      style={{
                                        borderRadius: "8px",
                                        backgroundColor: "#42f542",
                                      }}
                                      className="p-2"
                                    >
                                      Completed
                                    </div>
                                  ) : bugData.bugFixer.status === "Hold" ? (
                                    <div
                                      style={{
                                        borderRadius: "8px",
                                        backgroundColor: "#FFA500",
                                      }}
                                      className="px-4 py-2"
                                    >
                                      Hold
                                    </div>
                                  ) : bugData.bugFixer.status ===
                                    "Inprogress" ? (
                                    <div
                                      style={{
                                        borderRadius: "8px",
                                        backgroundColor: "#F9E79F",
                                      }}
                                      className="p-2"
                                    >
                                      In Progress
                                    </div>
                                  ) : (
                                    "-"
                                  )
                                ) : (
                                  "-"
                                )}
                              </div>
                              <div>
                                {" "}
                                <button
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  data-bs-no-caret="true"
                                  aria-expanded="false"
                                  //   onClick={(e) => {
                                  //     handleClick(bugFixerList, e);
                                  //   }}
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
                                >
                                  {bugData.bugFixer.verified === true && (
                                    <>
                                      <li>
                                        <a
                                          className="dropdown-item"
                                          href="#"
                                          //   onClick={handleCompletedClick}
                                          onClick={(event) =>
                                            handleStatusUpdate(
                                              bugData.bugFixer.id,
                                              "Completed"
                                              //   event.target.checked
                                            )
                                          }
                                        >
                                          <div
                                            className={`${interviewStyle.select_wrp}`}
                                          >
                                            <input
                                              type="checkbox"
                                              checked={isChecked}
                                              //   onChange={handleCheckboxChange}
                                            />
                                            <label>
                                              <GoDotFill
                                                style={{
                                                  color: "#169c50",
                                                  fontSize: 20,
                                                }}
                                              />{" "}
                                              Completed
                                            </label>
                                          </div>
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="dropdown-item"
                                          href="#"
                                          onClick={(event) =>
                                            handleStatusUpdate(
                                              bugData.bugFixer.id,
                                              "Hold"
                                              //   event.target.checked
                                            )
                                          }
                                        >
                                          <div
                                            className={`${interviewStyle.select_wrp}`}
                                          >
                                            <input
                                              type="checkbox"
                                              checked={isChecked}
                                              //   onChange={handleCheckboxChange}
                                            />
                                            <label>
                                              <GoDotFill
                                                style={{
                                                  color: "#fc0303",
                                                  fontSize: 20,
                                                }}
                                              />{" "}
                                              Hold
                                            </label>
                                          </div>
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="dropdown-item"
                                          href="#"
                                          onClick={(event) =>
                                            handleStatusUpdate(
                                              bugData.bugFixer.id,
                                              "Inprogress"
                                              //   event.target.checked
                                            )
                                          }
                                        >
                                          <div
                                            className={`${interviewStyle.select_wrp}`}
                                          >
                                            <input
                                              type="checkbox"
                                              checked={isChecked}
                                              //   onChange={handleCheckboxChange}
                                            />
                                            <label>
                                              <GoDotFill
                                                style={{
                                                  color: "#fa9e0a",
                                                  fontSize: 20,
                                                }}
                                              />{" "}
                                              In Progress
                                            </label>
                                          </div>
                                        </a>
                                      </li>
                                    </>
                                  )}

                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      onClick={(event) =>
                                        handleInactive(
                                          bugData.bugFixer.id,
                                          "Inactive"
                                          //   event.target.checked
                                        )
                                      }
                                    >
                                      <div
                                        className={`${interviewStyle.select_wrp}`}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={isChecked}
                                          //   onChange={handleCheckboxChange}
                                        />
                                        <label>
                                          <GoDotFill
                                            style={{
                                              color: "#FF00FF",
                                              fontSize: 20,
                                            }}
                                          />{" "}
                                          Inactive
                                        </label>
                                      </div>
                                    </a>
                                  </li>

                                  {bugData.bugFixer.verified === false && (
                                    <>
                                      <li>
                                        <a
                                          className="dropdown-item"
                                          href="#"
                                          onClick={(event) =>
                                            handlePutForm(
                                              bugData.bugFixer.id,
                                              "VeriFied"
                                              //   event.target.checked
                                            )
                                          }
                                        >
                                          <div
                                            className={`${interviewStyle.select_wrp}`}
                                          >
                                            <input
                                              type="checkbox"
                                              checked={isChecked}
                                              //   onChange={handleCheckboxChange}
                                            />
                                            <label>
                                              <GoDotFill
                                                style={{
                                                  color: "#fa9e0a",
                                                  fontSize: 20,
                                                }}
                                              />{" "}
                                              Verifiy
                                            </label>
                                          </div>
                                        </a>
                                      </li>
                                    </>
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

        {showSuccess && (
          <MyModal>
            <ModalContainer
              childComponent={<SuccessTick HeadText="Successfully Updated" />}
            />
          </MyModal>
        )}
        {showModal && (
          <MyModal>
            <ModalContainer
              childComponent={
                <div style={{ textAlign: "right" }}>
                  <p>Are you sure you want to submit?</p>
                  <Button
                    variant="outlined"
                    style={{
                      border: "1px solid red",
                      color: "red",
                      marginRight: "10px",
                    }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outlined"
                    style={{ border: "1px solid green", color: "green" }}
                    onClick={handlestatusupdateSubmit}
                  >
                    Submit
                  </Button>
                </div>
              }
            />
          </MyModal>
        )}

        {showtasktype && (
          <MyModal>
            <ModalContainer
              childComponent={
                <div style={{ width: "500px" }}>
                  {" "}
                  <div className="d-flex justify-content-between align-items-center">
                    {/* <div> */} {/* <p> */}
                    <b>Task Description</b>
                    {/* </p> */}
                    {/* </div> */}
                    <div>
                      <IconButton
                        style={{
                          backgroundColor: "transparent",
                          transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#a71a1a";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#a71a1a";
                        }}
                        onClick={() => setShowtasktype(false)}
                      >
                        <IoCloseSharp style={{ fontSize: "24px" }} />
                      </IconButton>
                    </div>
                  </div>
                  <div style={{ height: "auto" }}>
                    <p className="mb-1">
                      {" "}
                      {bugFixerdata.taskDescription != null
                        ? bugFixerdata.taskDescription
                        : "-"}
                    </p>

                    <br />
                    {bugFixerdata.verified === true && (
                      <>
                        <b>Task Assigned To</b>
                        <div
                          style={{
                            height: "100px",
                            overflow: "auto",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Autocomplete
                            multiple
                            id="tags-outlined"
                            filterSelectedOptions
                            className="mt-2"
                            options={users.map((option) => option.userName)}
                            getOptionLabel={(user) => user}
                            value={assignToList}
                            onChange={(event, value) => handleChange(value)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Task Assigned To"
                                placeholder="Select assigned users"
                                error={!!errors.selectedUserId}
                                style={{ width: "100%" }}
                              />
                            )}
                          />

                          <Button
                            style={{ marginLeft: "10px" }}
                            type="submit"
                            variant="outlined"
                            color="success"
                            onClick={handleTickClick}
                          >
                            Save
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              }
            />
          </MyModal>
        )}
        {OpenVerfiyForm && (
          <MyModal>
            <ModalContainer
              childComponent={
                <div
                  style={{
                    maxHeight: "90vh",
                    width: "300px",
                    overflowY: "auto",
                    position: "relative",
                  }}
                >
                  <div
                    className="d-flex justify-content-between align-items-center"
                    // style={{ padding: "px" }}
                  >
                    <div>
                      <h5 style={{ textAlign: "center" }}>Task Assign To</h5>
                    </div>
                    <div>
                      <IconButton
                        style={{
                          backgroundColor: "transparent",
                          transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#a71a1a";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#a71a1a";
                        }}
                        onClick={handleCloseverifyform}
                      >
                        <IoCloseSharp style={{ fontSize: "24px" }} />
                      </IconButton>
                    </div>
                  </div>

                  {/* Content */}
                  <BugFixerput
                    bugId={statusupdate.bugId}
                    onclose={handleCloseverifyform}
                  />
                </div>
              }
            />
          </MyModal>
        )}

        {OpenPostForm && (
          <MyModal>
            <ModalContainer
              childComponent={
                <div
                  style={{
                    maxHeight: "90vh",
                    width: "400px",
                    overflowY: "auto",
                    position: "relative",
                  }}
                >
                  <div
                    className="d-flex justify-content-between align-items-center"
                    // style={{ padding: "px" }}
                  >
                    <div>
                      <h5 style={{ textAlign: "center" }}>
                        <b> New features and issue solver </b>
                      </h5>
                    </div>
                    <div>
                      <IconButton
                        style={{
                          backgroundColor: "transparent",
                          transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#a71a1a";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#a71a1a";
                        }}
                        onClick={handlepostformClick}
                      >
                        <IoCloseSharp style={{ fontSize: "24px" }} />
                      </IconButton>
                    </div>
                  </div>

                  <BugFixerpost onclose={handlepostformClick} />
                </div>
              }
            />
          </MyModal>
        )}

        {showInactiveopen && (
          <MyModal>
            <ModalContainer
              childComponent={
                <div style={{ textAlign: "right" }}>
                  <p>Are you sure you want to Inactive?</p>
                  <Button
                    variant="outlined"
                    style={{
                      border: "1px solid red",
                      color: "red",
                      marginRight: "10px",
                    }}
                    onClick={handleInactiveCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outlined"
                    style={{ border: "1px solid green", color: "green" }}
                    onClick={handleInactiveSubmit}
                  >
                    Submit
                  </Button>
                </div>
              }
            />
          </MyModal>
        )}
      </>
    </div>
  );
}

export default BugFixerTable;
