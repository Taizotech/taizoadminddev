/* eslint-disable react/jsx-pascal-case */
/* eslint-disable eqeqeq */
import React, { useEffect, useRef, useState } from "react";
import style from "./employerLeadList.module.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  GetEmployerLeadList,
  PutEmployerLeadCheck,
} from "../../../apiServices";
import { DDMMYYYY_formate, MyModal, emailValidation } from "../../../utility";
import { debounce } from "lodash";
import candidateStyle from "../../../components/ModalPopups/Candidatedetails.module.scss";
import ModalContainer from "../../../components/modal_popup";
import ConfirmationPopup from "../../../components/ModalPopups/confirmationPopup";
import candidateFBmeta from "../../Candidate/FacebookMeta/candidateFacebookMeta.module.scss";
import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import EmployerLeadTimeline from "./LeadTimeLine/TimelineView";
import { employerTimelineActions } from "../../../redux-store/store";
import { useDispatch, useSelector } from "react-redux";
import EmployerSendSLA from "./sendSLA";

const EmployerLeadList = () => {
  const [formData, setFormData] = useState({
    page: 0,
    size: 10,
    number: "",
    email: "",
  });

  const timelineDetails = useSelector(
    (state) => state.employerTimeline.employerLeadTimeline
  );

  const Dispatch = useDispatch();

  const totalPage = useRef(1);
  const [loading, setLoading] = useState(true);
  const [showConfirmationPopup, setShowConfirmPopup] = useState(false);
  const [result, setResult] = useState([]);

  const [selectedId, setSelectedId] = useState();

  const [putLead, setputLead] = useState({
    empLeadId: "",
    qualified: false,
    notQualified: false,
  });

  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (event, value) => {
    console.log(event, value);
    handleFieldChange("page", value - 1);
  };

  function handleTimelineOpen(el) {
    // setTimeline((prev) => ({ ...prev, empLeadId: el.id, showTimeline: true }));
    setSelectedId(el.id);
    Dispatch(employerTimelineActions.setShowEmpLeadTimeline(true));
  }

  const handleEmailNumberChange = (event) => {
    const { value } = event.target;
    if (!isNaN(value) && value.length == 10) {
      handleFieldChange("number", value);
      setFormData((prev) => ({ ...prev, number: value, email: "", page: 0 }));
    } else if (emailValidation(value)) {
      setFormData((prev) => ({ ...prev, number: "", email: value, page: 0 }));
      handleFieldChange("page", 0);
    } else if (value.length == 0) {
      setFormData((prev) => ({ ...prev, number: "", email: "", page: 0 }));
    }
  };

  useEffect(() => {
    setLoading(true);
    let debouncedGetLead = debounce(() => {
      GetEmployerLeadList(formData)
        .then((res) => {
          setLoading(false);
          // console.log(res, "response Data");
          setResult(res.data.content);
          totalPage.current = res.data.totalPages;
        })
        .catch((err) => {
          setResult([]);
        });
    }, 1000);

    debouncedGetLead();

    console.log(formData);

    return () => {
      // Cleanup function to cancel the debounce timer
      debouncedGetLead.cancel();
    };
  }, [formData]);

  function handleConfirmationClose() {
    setShowConfirmPopup(false);
  }

  function handleConfirmationOpen() {
    setShowConfirmPopup(true);
  }
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxClick = (event) => {
    // event.stopPropagation();
    setIsChecked(!isChecked);
  };
  const handleIsQualified = (empLeadId, status, event) => {
    let isChecked = event.target.checked;
    console.log(event.target.checked, "target");

    if (isChecked) {
      if (status === "notQualified") {
        setputLead({
          empLeadId: empLeadId,
          qualified: false,
          notQualified: true,
        });
      } else {
        setputLead((prev) => ({
          ...prev,
          empLeadId: empLeadId,
          qualified: true,
          notQualified: false,
        }));
      }
    }
  };

  function getEmpLeadList() {
    GetEmployerLeadList(formData)
      .then((res) => {
        setLoading(false);
        // console.log(res, "response Data");
        setResult(res.data.content);
        totalPage.current = res.data.totalPages;
      })
      .catch((err) => {
        setResult([]);
      });
  }

  function ConfirmFormSubmit() {
    if (putLead.empLeadId) {
      PutEmployerLeadCheck(putLead).then((data) => {
        setShowConfirmPopup(false);

        GetEmployerLeadList(formData)
          .then((res) => {
            setLoading(false);
            // console.log(res, "response Data");
            setResult(res.data.content);
            totalPage.current = res.data.totalPages;
          })
          .catch((err) => {
            setResult([]);
          });
      });
    }
  }

  return (
    <>
      <div className={`${style.body}`}>
        <div className="py-4">
          {/* <h3 className="text-center ">
            <b></b>
          </h3> */}
        </div>
        <div className={` ${style.filter_wrp}`}>
          <div className="d-grid justify-content-end">
            <div
              className=" d-flex flex-row "
              style={{ minWidth: "380px", width: "400px" }}
            >
              <div className="d-inline-block px-2 pt-3 ">
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/Employer_lead"
                >
                  <Button
                    // style={{ width: "50%" }}
                    variant="contained"
                    color="primary"
                  >
                    + Add Lead
                  </Button>{" "}
                </Link>
              </div>
              <div className="d-inline-block px-2 " style={{ width: "60%" }}>
                <TextField
                  fullWidth
                  // sx={{ width: "550px" }}
                  id="standard-basic"
                  label="Filter by email / number"
                  variant="standard"
                  onChange={(e, value) => {
                    handleEmailNumberChange(e, value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`container mt-1 Lead_list_wrp ps-4 ps-sm-2 ${style.Lead_list_wrp}`}
          >
            {loading && (
              <div
                style={{ height: "50vh" }}
                className="d-grid justify-content-center align-items-center mt-5"
              >
                <CircularProgress />
              </div>
            )}
            {!loading && result.length == 0 && (
              <div className="d-grid justify-content-center align-items-center mt-5">
                <h4 className="text-danger text-center">No Leads Found</h4>
              </div>
            )}
            {!loading &&
              result.map((el) => (
                <>
                  <div key={el.id}>
                    <Card sx={{ minWidth: 275, marginTop: 1 }}>
                      <CardContent>
                        <div className="row ">
                          <div className="col-sm-4">
                            <p>
                              {" "}
                              <strong> Contact Name</strong> : {el.companyName}
                            </p>

                            <p>
                              {" "}
                              <strong>Email :</strong> {el.emailId}
                            </p>

                            <p>
                              {" "}
                              <strong>Mobile Number</strong>: {el.mobileNumber}
                            </p>
                            <p>
                              <strong> Industry</strong> :{el.industry}
                            </p>
                          </div>
                          <div className="col-sm-4">
                            <p>
                              {" "}
                              <strong> Company Name</strong> : {el.companyName}
                            </p>

                            <p>
                              <strong> City</strong> :{el.city}
                            </p>

                            <p>
                              <strong> Address</strong> :{el.address}
                            </p>
                          </div>
                          <div className="col-sm-4">
                            <p>
                              <strong>Created Time: </strong>{" "}
                              <DDMMYYYY_formate dateValue={el.createdTime} />
                            </p>

                            <div className="d-flex flex-row">
                              <p className="mx-1">
                                <strong> Intro Mail</strong> :{" "}
                                {el.emailNotification ? (
                                  <>
                                    <strong className="text-success">
                                      Sent
                                    </strong>
                                  </>
                                ) : (
                                  <>
                                    <strong className="text-danger">
                                      Not Sent
                                    </strong>
                                  </>
                                )}
                              </p>{" "}
                              ||{" "}
                              <p>
                                <strong> SLA Mail</strong> :{" "}
                                {el.slaEmailNotification ? (
                                  <>
                                    <strong className="text-success">
                                      Sent
                                    </strong>
                                  </>
                                ) : (
                                  <>
                                    <strong className="text-danger">
                                      Not Sent
                                    </strong>
                                  </>
                                )}
                              </p>
                            </div>
                            <div className={`${candidateStyle.chips_wrp}`}>
                              {(el.notQualified || el.qualified) && (
                                <>
                                  {el.notQualified != true && (
                                    <>
                                      <input
                                        type="radio"
                                        name={`status_${el.id}`}
                                        checked={el.qualified}
                                        id={`qualified_${el.id}`}
                                        onChange={(event) => {
                                          handleConfirmationOpen(true);
                                          handleIsQualified(
                                            el.id,
                                            "qualified",
                                            event
                                          );
                                        }}
                                        onClick={(event) => {
                                          handleCheckboxClick(event);
                                        }}
                                      />
                                      <label htmlFor={`qualified_${el.id}`}>
                                        Qualified
                                      </label>
                                    </>
                                  )}
                                  {el.qualified != true && (
                                    <>
                                      <input
                                        type="radio"
                                        checked={el.notQualified}
                                        name={`status_${el.id}`}
                                        id={`notQualified_${el.id}`}
                                        onChange={(event) => {
                                          handleConfirmationOpen(true);
                                          handleIsQualified(
                                            el.id,
                                            "notQualified",
                                            event
                                          );
                                        }}
                                        onClick={(event) => {
                                          //

                                          handleCheckboxClick(event);
                                        }}
                                      />
                                      <label htmlFor={`notQualified_${el.id}`}>
                                        Not Qualified
                                      </label>
                                    </>
                                  )}
                                </>
                              )}
                              {!(el.notQualified || el.qualified) && (
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">
                                    select status
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="select status"
                                  >
                                    <MenuItem>
                                      <>
                                        <div
                                          className={`${candidateFBmeta.select_wrp}`}
                                        >
                                          <input
                                            type="radio"
                                            name={`status_${el.id}`}
                                            checked={el.qualified}
                                            id={`qualified_${el.id}`}
                                            onChange={(event) => {
                                              handleConfirmationOpen(true);
                                              handleIsQualified(
                                                el.id,
                                                "qualified",
                                                event
                                              );
                                            }}
                                            onClick={(event) => {
                                              handleCheckboxClick(event);
                                            }}
                                          />
                                          <label htmlFor={`qualified_${el.id}`}>
                                            Qualified
                                          </label>
                                        </div>
                                      </>
                                    </MenuItem>
                                    <MenuItem>
                                      <>
                                        <div
                                          className={`${candidateFBmeta.select_wrp}`}
                                        >
                                          <input
                                            type="radio"
                                            checked={el.notQualified}
                                            name={`status_${el.id}`}
                                            id={`notQualified_${el.id}`}
                                            onChange={(event) => {
                                              handleConfirmationOpen(true);
                                              handleIsQualified(
                                                el.id,
                                                "notQualified",
                                                event
                                              );
                                            }}
                                            onClick={(event) => {
                                              handleCheckboxClick(event);
                                            }}
                                          />
                                          <label
                                            htmlFor={`notQualified_${el.id}`}
                                          >
                                            Not Qualified
                                          </label>
                                        </div>
                                      </>
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              )}
                            </div>
                          </div>
                          {/* <div className="col-sm-2">hai</div> */}
                        </div>
                        <div>
                          <div className="d-flex justify-content-end my-1 my-sm-0 ">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleTimelineOpen(el)}
                              size="small"
                              sx={{ mx: 2 }}
                            >
                              Show timeline
                            </Button>
                            <div className="mx-2">
                              <EmployerSendSLA
                                onSuccess={() => {
                                  getEmpLeadList(formData);
                                }}
                                Id={el.id}
                                type={"empLead"}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row"></div>
                        {showConfirmationPopup && (
                          <MyModal>
                            <ModalContainer
                              // zIndex={2}
                              childComponent={
                                <>
                                  <ConfirmationPopup
                                    heading={"Confirmation"}
                                    headingText={`Are you sure you want to confirm Employer status`}
                                    onConfirm={ConfirmFormSubmit}
                                    onRequestClose={handleConfirmationClose}
                                  />
                                </>
                              }
                            />
                          </MyModal>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </>
              ))}
          </div>

          <div>
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
          </div>

          <div className="mt-4 d-grid justify-content-center">
            <>
              <Stack spacing={1}>
                <Pagination
                  variant="outlined"
                  shape="rounded"
                  onChange={(e, value) => handlePageChange(e, value)}
                  color="primary"
                  count={totalPage.current}
                  hidePrevButton
                  hideNextButton
                  page={formData.page + 1}
                />
              </Stack>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerLeadList;
