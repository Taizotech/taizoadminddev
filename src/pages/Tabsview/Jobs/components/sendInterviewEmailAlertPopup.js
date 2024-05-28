/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import ModalContainer from "../../../../components/modal_popup";
import {
  DMMMYYYY_formate,
  MyModal,
  capitalizeWords,
  emailValidation,
} from "../../../../utility";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  GetInterviewListByJobId,
  PutCandidateName,
  SendInterviewAlertToEmployer,
} from "../../../../apiServices";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import SuccessTick from "../../../../components/success_tick";
import { useSelector } from "react-redux";
import { TiTick, TiTickOutline } from "react-icons/ti";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { HiPencilAlt } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const SendInterviewEmailAlert = ({ companyName, jobId, emailId, onClose }) => {
  // const [showPopup, setShowPopup] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const adminDetails = useSelector((state) => state.adminDetails);

  let isSuperAdmin = adminDetails.roleID == 1;

  const open = Boolean(anchorEl);

  const [showSuccess, setSuccess] = useState(false);
  const [showSuccessname, setshowSuccessname] = useState(false);

  const [showCustomDate, setShowCustom] = useState(false);

  const [candidateList, setCandidateList] = useState();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [updateName, setupdateName] = useState({
    candidateId: "",
    firstName: "",
    lastName: "",
  });

  let today = new Date();
  let tomorrow = new Date();

  const [formData, setFormData] = useState({
    emailId: emailId,
    selectedCandidateList: [],
    selectedRow: [],
    startDate: today.toISOString().split("T")[0],
    endDate: today.toISOString().split("T")[0],
    jobId: jobId,
    err: "",
    adminId: isSuperAdmin ? null : localStorage.getItem("adminID"),
  });

  const handleDateChange = (e) => {
    let { value } = e.target;

    tomorrow.setDate(today.getDate() + 1);

    switch (value) {
      case "Today":
        setFormData((prev) => ({
          ...prev,
          startDate: today.toISOString().split("T")[0],
          endDate: today.toISOString().split("T")[0],
        }));
        break;

      case "Tomorrow":
        setFormData((prev) => ({
          ...prev,
          startDate: tomorrow.toISOString().split("T")[0],
          endDate: tomorrow.toISOString().split("T")[0],
        }));
        break;

      case "CustomDate":
        // Handle custom date logic here if needed
        setShowCustom(true);
        break;

      default:
        break;
    }
  };

  const customDateApply = () => {
    setShowCustom(false);
  };

  const handleCustomDate = (e, type) => {
    console.log(e.target.value, type);
    setFormData((prev) => ({
      ...prev,
      [type]: e.target.value,
    }));
  };

  const handleCheckboxChange = (event, rowId) => {
    const isChecked = event.target.checked;

    setFormData((prev) => {
      let prevCandidateList = [...prev.selectedRow];

      if (isChecked) {
        if (!prevCandidateList.includes(rowId)) {
          prevCandidateList.push(rowId);
        }
      } else {
        prevCandidateList = prevCandidateList.filter((el) => el != rowId);
      }

      return {
        ...prev,
        selectedRow: [...prevCandidateList],
        err: "",
      };
    });
  };

  const handleEmailChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      emailId: value,
      err: "",
    }));
  };

  const validateForm = () => {
    let noError = 0;
    if (emailValidation(formData.emailId) && formData.selectedRow.length > 0) {
      setFormData((prev) => ({
        ...prev,
        err: "",
      }));
    }

    if (!emailValidation(formData.emailId)) {
      setFormData((prev) => ({ ...prev, err: "Please enter valid email" }));
      noError++;
    }

    if (!formData.selectedRow.length > 0) {
      setFormData((prev) => ({
        ...prev,
        err: "Please select any of the candidate",
      }));
      noError++;
    }

    if (
      !formData.selectedRow.length > 0 &&
      !emailValidation(formData.emailId)
    ) {
      setFormData((prev) => ({
        ...prev,
        err: `Please enter valid email and select any of the candidate`,
      }));
      noError++;
    }

    if (!formData.adminId) {
      setFormData((prev) => ({
        ...prev,
        err: `Please select any mail from`,
      }));
      noError++;
    }
    return noError;
  };

  const handleSubmit = (e) => {
    if (validateForm() == 0) {
      try {
        SendInterviewAlertToEmployer(formData)
          .then((res) => {
            setSuccess(true);
          })
          .catch((err) => {
            setSuccess(false);
            alert("Email not sent" + err);
          })
          .finally(() => {
            setTimeout(() => {
              setSuccess(false);
            }, [3000]);
          });
      } catch (error) {
        alert("Email not sent" + error);
      }
    }
  };

  const handleFromAdminChange = (e) => {
    let { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      adminId: value,
      err: "",
    }));
  };

  async function getCanList() {
    try {
      await GetInterviewListByJobId(formData).then((res) => {
        setCandidateList(res);
      });
    } catch (error) {
      alert("somthing went wrong GetInterviewListByJobId " + error);
    }
  }
  useEffect(() => {
    getCanList();
  }, [formData]);

  const columns = [
    { id: "name", label: "Candidate Name", minWidth: 170 },

    {
      id: "ScheduledBy",
      label: "Scheduled By",
      minWidth: 170,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "ScheduledOn",
      label: "Scheduled On",
      minWidth: 170,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];
  const startEditing = (candidate) => {
    setupdateName({
      candidateId: candidate.canInterviewsModel.canId,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
    });
    setIsEditing(true); // Show the editing interface
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setupdateName((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitNameChange = (id) => {
    const payload = {
      id: id,
      canFirstName: capitalizeWords(updateName.firstName),
      canLastName: capitalizeWords(updateName.lastName),
    };

    PutCandidateName(payload)
      .then(() => {
        setshowSuccessname(true);
        console.log(payload, "updatename");
        // return GetInterviewListByJobId(formData);
        setTimeout(() => {
          setshowSuccessname(false);
          setIsEditing(false);
        }, 1000);
        GetInterviewListByJobId(formData).then((res) => {
          setCandidateList(res);
        });
      })
      .catch((error) => {
        console.error(
          "There was an error updating the candidate name or fetching the updated list:",
          error
        );
      });
  };

  return (
    <>
      <MyModal>
        <ModalContainer
          zIndex={1500}
          childComponent={
            <>
              <div className="p-3" style={{ maxWidth: "900px", width: "90vw" }}>
                <div className="d-flex flex-row justify-content-between mb-3">
                  <h5 className="text-center">
                    Send Interview Email Alert to <b> {companyName}</b>
                  </h5>

                  <div className="d-flex flex-row gap-2">
                    <div>
                      <select
                        onChange={(e) => {
                          handleDateChange(e);
                        }}
                        className="form-control"
                        style={{ width: "auto" }}
                      >
                        <option disabled value="">
                          Interview Date
                        </option>
                        <option value="Today">Today</option>
                        <option value="Tomorrow">Tomorrow</option>
                        <option value="CustomDate">Custom date</option>
                      </select>{" "}
                    </div>

                    <Button variant="contained" color="error" onClick={onClose}>
                      <IoClose />
                    </Button>
                  </div>
                </div>
                <Paper sx={{ width: "100%" }}>
                  <TableContainer sx={{ maxHeight: 440, px: 3 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox">
                            <div className="d-grid justify-content-center"></div>
                          </TableCell>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {candidateList &&
                          candidateList.content.map((row) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.id}
                              >
                                <TableCell padding="checkbox">
                                  <div className="d-grid justify-content-center">
                                    <input
                                      style={{
                                        padding: "10px",
                                        height: "17px",
                                        width: "17px",
                                      }}
                                      type="checkbox"
                                      onInput={(event) => {
                                        handleCheckboxChange(
                                          event,
                                          row.canInterviewsModel.canId
                                        );
                                      }}
                                    />
                                  </div>
                                </TableCell>
                                {/* <TableCell>{row.candidateName} </TableCell> */}
                                <TableCell style={{ width: "400px" }}>
                                  <div>
                                    {row.firstName + " " + row.lastName}
                                    <button
                                      className="btn"
                                      onClick={() => {
                                        startEditing(row);
                                        setIsEditing(true);
                                        setEditingId(row);
                                      }}
                                      style={{
                                        borderRadius: "50%",
                                        fontSize: "20px",
                                      }}
                                    >
                                      <HiPencilAlt
                                        style={{ color: "#1b56ae" }}
                                      />
                                    </button>
                                  </div>
                                  {/* {isEditing &&
                                  updateName.candidateId ===
                                    row.canInterviewsModel.canId ? (
                                    
                                  ) : (
                                    <div>
                                      {row.firstName + " " + row.lastName}
                                      <button
                                        className="btn"
                                        onClick={() => setIsEditing(true)}
                                        style={{
                                          borderRadius: "50%",
                                          fontSize: "20px",
                                        }}
                                      >
                                        <HiPencilAlt
                                          style={{ color: "#1b56ae" }}
                                        />
                                      </button>
                                    </div>
                                  )} */}
                                </TableCell>

                                <TableCell>
                                  {row.canInterviewsModel.admin.userName}
                                </TableCell>
                                <TableCell>
                                  <DMMMYYYY_formate
                                    dateValue={
                                      row.canInterviewsModel
                                        .interviewScheduledDt
                                    }
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>

                    {candidateList && candidateList.content.length == 0 && (
                      <div className="text-danger text-center my-4   ">
                        No Interviews Schedeuled during this time
                      </div>
                    )}
                  </TableContainer>
                </Paper>

                <div className="d-flex flex-sm-row mt-3">
                  {isSuperAdmin && (
                    <>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Mail From *
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="fromAdminId"
                          // value={
                          //   leadData.fromAdminId && leadData.fromAdminId.val
                          // }
                          label="Intro Mail From"
                          onChange={(e) => {
                            handleFromAdminChange(e);
                          }}
                          MenuProps={{
                            style: { zIndex: 1600 },
                          }}
                        >
                          <MenuItem value={2}>Sowmiya</MenuItem>
                          <MenuItem value={4}>Anees</MenuItem>
                          <MenuItem value={7}>Saravanan</MenuItem>
                          <MenuItem value={13}>Nirmala</MenuItem>
                        </Select>
                      </FormControl>
                    </>
                  )}

                  <TextField
                    sx={{ mx: 5 }}
                    id="outlined-multiline-flexible"
                    label=" Company Email Id"
                    required
                    placeholder="Enter the company email id"
                    onChange={(event) => {
                      handleEmailChange(event.target.value);
                    }}
                    value={formData.emailId}
                    maxRows={4}
                    fullWidth
                  />

                  <Button
                    size="small"
                    onClick={() => {
                      handleSubmit();
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Send Alert
                  </Button>
                </div>
                {formData.err && (
                  <p className="text-danger mt-4">{formData.err}</p>
                )}
              </div>
            </>
          }
        />
      </MyModal>

      {showCustomDate && (
        <MyModal>
          <ModalContainer
            zIndex={1600}
            childComponent={
              <div
                style={{
                  minWidth: "400px",
                  width: "auto",
                }}
              >
                <>
                  <div>
                    <form>
                      <p className="text-center ">Select Custom Date </p>
                      <div className="mt-2">
                        <label htmlFor="start">From</label>
                        <input
                          // className={`form-control ${
                          //   validationErrors.start ? "is-invalid" : ""
                          // }`}
                          style={{ width: "100%" }}
                          type="date"
                          id="start"
                          onChange={(value) =>
                            handleCustomDate(value, "startDate")
                          }
                          value={formData.startDate}
                          name="trip-start"
                          min="2020-01-01"
                          max="2050-01-01"
                        />
                        {/* {validationErrors.start && (
                          <div className="invalid-feedback">
                            Start date is required.
                          </div>
                        )} */}
                      </div>
                      <div className="mt-2">
                        <label htmlFor="end">To</label>
                        <input
                          // className={`form-control ${
                          //   validationErrors.end ? "is-invalid" : ""
                          // }`}
                          value={formData.endDate}
                          style={{ width: "100%" }}
                          type="date"
                          id="end"
                          onChange={(value) =>
                            handleCustomDate(value, "endDate")
                          }
                          name="trip-end"
                          min="2020-01-01"
                          max="2050-01-01"
                        />
                        {/* {validationErrors.end && (
                          <div className="invalid-feedback">
                            End date is required.
                          </div>
                        )} */}
                      </div>
                      <div className="d-flex justify-content-end mt-3 ">
                        <button
                          onClick={customDateApply}
                          style={{
                            backgroundColor: "#b2261c",
                          }}
                          className="btn rounded-pill text-white px-4  me-2"
                        >
                          Close
                        </button>
                        <button
                          onClick={customDateApply}
                          // color="primary"
                          className="btn rounded-pill text-white px-4"
                          style={{
                            backgroundColor: "#169C50",
                          }}
                        >
                          Apply
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              </div>
            }
          />
        </MyModal>
      )}
      {showSuccessname && (
        <MyModal>
          <ModalContainer
            zIndex={1900}
            childComponent={
              <>
                <SuccessTick HeadText="Update Successfully" />
              </>
            }
          />
        </MyModal>
      )}
      {isEditing && (
        <MyModal>
          <ModalContainer
            zIndex={1700}
            childComponent={
              <>
                {" "}
                <div className="d-flex align-item-center justify-content-between">
                  <div>Candidate Name Update</div>
                  <div
                    className="btn btn-outline-danger"
                    onClick={() => {
                      setIsEditing(false);
                    }}
                  >
                    <AiOutlineClose />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="d-flex align-items-center col-sm-12">
                    <div>
                      {" "}
                      <label htmlFor="">First Name</label>
                      <input
                        name="firstName"
                        className="form-control"
                        value={updateName.firstName}
                        onChange={handleNameChange}
                        type="text"
                      />
                    </div>
                    <div>
                      {" "}
                      <label htmlFor="" className="ms-1 ">
                        Last Name
                      </label>
                      <input
                        name="lastName"
                        className="ms-1 form-control"
                        value={updateName.lastName}
                        onChange={handleNameChange}
                        type="text"
                      />
                    </div>
                    <button
                      className="btn"
                      style={{
                        borderRadius: "50%",
                        fontSize: "36px",
                        marginTop: "10px",
                      }}
                      title="Change candidate name"
                      onClick={() =>
                        submitNameChange(editingId.canInterviewsModel.canId)
                      }
                    >
                      <IoMdCheckmarkCircle style={{ color: "#169c50" }} />
                    </button>
                  </div>
                </div>
              </>
            }
          />
        </MyModal>
      )}

      {showSuccess && (
        <MyModal>
          <ModalContainer
            zIndex="1700"
            childComponent={
              <>
                <SuccessTick HeadText="Interview Alert sent" />
              </>
            }
          />
        </MyModal>
      )}
    </>
  );
};

export default SendInterviewEmailAlert;

// "content": [
//       {
//           "canInterviewsModel": {
//               "id": 169,
//               "adminId": 2,
//               "jobId": 201,
//               "canId": 111,
//               "interviewCurrentStatus": 7,
//               "status": "I",
//               "candidatePercentage": null,
//               "companyName": "Joe's Food World",
//               "contactPersonName": "John Doe",
//               "contactNumber": 8098581928,
//               "city": "San Francisco",
//               "area": "Silicon Valley",
//               "interviewDate": "2023-07-05",
//               "rescheduledDate": "2024-01-17",
//               "interviewTime": "10:00 AM - 05:00 PM",
//               "documents": "Bio-data, All Education Certificate, Aadhaar Card, Ration Card, 2 Passport Size Photo, Bank Passbook",
//               "interviewScheduledDt": "2023-07-05 00:00:00",
//               "rescheduledDateTime": "2024-01-09T06:36:56.000+0000",
//               "active": true,
//               "notSelectedOn": null,
//               "joinedOn": null,
//               "selectedOn": null,
//               "attendedOn": null,
//               "notAttendedOn": null,
//               "offerRejectedOn": null,
//               "createdTime": "2024-01-04T15:29:45.000+0000",
//               "endDate": null,
//               "candidateMobileNumber": 0,
//               "jobCategory": null,
//               "scheduledBy": null,
//               "page": 0,
//               "size": 0,
//               "admin": {
//                   "id": 2,
//                   "userName": "Sowmiya",
//                   "module": "Employer",
//                   "profilePic": "https://taizo-common.s3.ap-south-1.amazonaws.com/Admin/ProfilePictures/1696843845830-[PROXY]",
//                   "emailId": "sowmiya.g@taizo.in",
//                   "password": "55555",
//                   "mobileNo": "8056690492",
//                   "mobileCountryCode": "91",
//                   "introVideoUrl": "https://taizo-common.s3.ap-south-1.amazonaws.com/Temp+Images+Campaign/SowmiyaGunasekaran_Intro.mp4",
//                   "introGifUrl": "https://taizo-common.s3.ap-south-1.amazonaws.com/Temp+Images+Campaign/Intro_Sowmiya+Gunasekaran.gif",
//                   "emailSignature": "https://taizo-common.s3.ap-south-1.amazonaws.com/Temp+Images+Campaign/Sowmiya_EmailSignature.png",
//                   "createdOn": "2023-09-13T07:20:38.000+0000",
//                   "createdTime": "2023-09-13T07:20:38.000+0000",
//                   "deactivate": false,
//                   "available": true
//               },
//               "interviewDateNew": null,
//               "selected": false,
//               "joined": false,
//               "attended": true,
//               "notSelected": false,
//               "notAttended": false,
//               "offerRejected": false,
//               "rescheduled": true
//           },
