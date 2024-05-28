import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import companylogo from "../../assets/images/Company-Logo.png";
import jobDetailsStyle from "../../components/ModalPopups/jobDetail.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import candidatestyle from "../ModalPopups/Candidatedetails.module.scss";
import jobListStyle from "../../pages/Filter/Jobs/components/jobList.module.scss";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import { useDispatch } from "react-redux";
import { Ddmmmyyyy_date, MyModal } from "../../utility";
import { webConsoleBaseUrl } from "../../App";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { commonPopupActions } from "../../redux-store/store";
import {
  GetEmployerDetailsByid,
  PutEmployerIsQualified,
} from "../../apiServices";
import ConfirmationPopup from "./confirmationPopup";
import ModalContainer from "../modal_popup";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import EmployerTimeline from "../../pages/Employer/EmployerTimeLine/employerTimeLine";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  // width: "100%",
  bgcolor: "background.paper",
  border: "2px solid gray",
  boxShadow: 24,
  mt: 5,
  py: 4,
  px: 4,
  overflow: "auto",
};

export default function EmployerDetailspopup(props) {
  const [open, setOpen] = React.useState(false);
  const [employerDetails, setEmployerDetails] = useState({
    data: {},
    show: false,
  });
  const [activeTab, setActiveTab] = useState("tab1");
  const Dispatch = useDispatch();
  const EmpId = props.Id;

  const [isQualifiedDetails, setIsQualifiedDetails] = useState({
    confirmtext: "",
    isQualified: "",
    openPopup: false,
    empId: "",
  });

  function openIsQualifyPopup(status) {
    let confirmText = "";
    let isQualified;
    if (status == "qualify") {
      confirmText = `Are you sure you want to qualify ${employerDetails.data.data.companyName} `;
      isQualified = true;
    } else {
      confirmText = `Are you sure you want to not qualify ${employerDetails.data.data.companyName} `;
      isQualified = false;
    }
    setIsQualifiedDetails((prev) => ({
      ...prev,
      openPopup: true,
      isQualified: isQualified,
      confirmtext: confirmText,
      empId: EmpId,
    }));
  }

  function handleConfirmationClose() {
    setIsQualifiedDetails((prev) => ({
      ...prev,
      openPopup: false,
    }));
  }

  function ConfirmFormSubmit() {
    PutEmployerIsQualified(isQualifiedDetails)
      .then(() => {
        setIsQualifiedDetails((prev) => ({
          ...prev,
          openPopup: false,
        }));
        GetEmployerDetailsByid(EmpId).then((data) => {
          setEmployerDetails((prev) => ({ ...prev, data: data, show: true }));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleClose() {
    Dispatch(
      commonPopupActions.setShowPopup({
        name: "hide",
      })
    );
  }

  useEffect(() => {
    GetEmployerDetailsByid(EmpId).then((data) => {
      setEmployerDetails((prev) => ({ ...prev, data: data, show: true }));
    });
  }, []);
  const handleClick = (tab) => {
    setActiveTab(tab);
  };
  const handlePhoneIconClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  function getEmployerStatus(employer) {
    console.log(employer);
    if (employer.contactDetailsFilled && employer.regProofNumber != null) {
      return <span className="text-success"> Completed</span>;
    } else if (!employer.contactDetailsFilled) {
      return <span className="text-danger"> Step 2</span>;
    } else if (
      employer.contactDetailsFilled &&
      employer.regProofNumber == null
    ) {
      return <span className="text-warning"> Step 3</span>;
    } else {
    }
  }
  return (
    <div>
      <div className="">
        {employerDetails.show && (
          <>
            <MyModal>
              <ModalContainer
                zIndex={1005}
                childComponent={
                  <>
                    <Box sx={style} className={`${jobDetailsStyle.box}`}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      ></Typography>
                      <div id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className=" ">
                          <div className={`d-grid justify-content-center`}>
                            <div className=" ">
                              <div className="d-grid justify-content-end">
                                <button
                                  className=" btn btn-outline-danger p-1"
                                  onClick={() => {
                                    handleClose();
                                  }}
                                >
                                  <CloseIcon />
                                </button>
                              </div>

                              <h5 className="text-bold ms-1">
                                Employer Details
                              </h5>
                              <div className="row">
                                <div className="col-lg-12 col-md-5 col-sm-12 d-flex flex-column flex-sm-row align-items-start gap-2  text-black ms-3 ">
                                  <b>
                                    Employer id:{employerDetails.data.data.id}
                                  </b>
                                  <br />
                                  <div className="d-flex flex-row">
                                    <b>No.of Employees :</b>
                                    {employerDetails.data.data.noOfEmployees
                                      ? employerDetails.data.data.noOfEmployees
                                      : 0}
                                  </div>
                                  <div className="d-flex flex-row">
                                    <b>Status: </b>
                                    {getEmployerStatus(
                                      employerDetails.data.data
                                    )}
                                  </div>
                                  <div className="d-flex flex-row">
                                    <b> From:</b>
                                    {employerDetails.data.data.fromWeb
                                      ? "Web"
                                      : employerDetails.data.data.fromApp
                                      ? "App"
                                      : employerDetails.data.data.fromAdmin
                                      ? "Admin"
                                      : "NULL"}{" "}
                                  </div>
                                  {window.innerWidth >= 992 && (
                                    <span className="d-none d-md-inline">
                                      |
                                    </span>
                                  )}{" "}
                                  <div className="d-flex flex-row">
                                    <b>Registered: </b>{" "}
                                    {
                                      <Ddmmmyyyy_date
                                        dateValue={
                                          employerDetails.data.data.createdTime
                                        }
                                      />
                                    }
                                  </div>
                                </div>
                              </div>
                              <div className="row  mt-3 mb-3">
                                <div className="col-sm-12 d-flex flex-column flex-sm-row">
                                  <div className="col-sm-2">
                                    <div className=" rounded-3 p-3">
                                      {employerDetails.data.data.companyLogo ? (
                                        <img
                                          src={
                                            employerDetails.data.data
                                              .companyLogo
                                          }
                                          alt="employer Profile"
                                          width={80}
                                        />
                                      ) : (
                                        <img
                                          src={companylogo}
                                          alt="Profile"
                                          width={80}
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    className={`col-sm-10 mt-3  ${candidatestyle.Line_height}`}
                                  >
                                    <div className="row">
                                      <div className="col-sm-5 d-felx">
                                        <div className="row  ">
                                          <div className="col-sm-12 d-flex flex-row">
                                            <div className="col-sm-4">
                                              <p className="text-secondary mt-1">
                                                Name
                                              </p>
                                            </div>
                                            <div className="col-sm-1">:</div>
                                            <div
                                              className={`col-sm-7 ${candidatestyle.custom_line_height}`}
                                            >
                                              {
                                                employerDetails.data.data
                                                  .companyName
                                              }
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-sm-12 d-flex flex-row">
                                            <div className="col-sm-4">
                                              <p className="text-secondary mt-1">
                                                Industry
                                              </p>
                                            </div>
                                            <div className="col-sm-1">:</div>
                                            <div
                                              className={`col-sm-7 ${candidatestyle.custom_line_height}`}
                                            >
                                              {
                                                employerDetails.data.data
                                                  .industry
                                              }
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-sm-12 d-flex flex-row">
                                            <div className="col-sm-4">
                                              <p className="text-secondary mt-1">
                                                Area
                                              </p>
                                            </div>
                                            <div className="col-sm-1">:</div>
                                            <div
                                              className={`col-sm-7 ${candidatestyle.custom_line_height}`}
                                            >
                                              {employerDetails.data.data.area}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-sm-7">
                                        <div className="row">
                                          {/* <div className="col-sm-4 mt-2">
                                      <div
                                        className={`btn rounded-4  ${jobListStyle.buttom_candi_list1}`}
                                        onClick={() =>
                                          handleWhatsAppIconClick(
                                            employerDetails.data.data
                                              .whatsappNumber
                                          )
                                        }
                                      >
                                        <WhatsAppIcon sx={{ color: "green" }} />
                                        <span>
                                          {
                                            employerDetails.data.data
                                              .whatsappNumber
                                          }
                                        </span>
                                      </div>
                                    </div> */}
                                          <div className="col-sm-6 mt-2">
                                            <div
                                              className={`btn rounded-4 ${jobListStyle.buttom_candi_list1}`}
                                              onClick={() =>
                                                handlePhoneIconClick(
                                                  employerDetails.data.data
                                                    .mobileNumber
                                                )
                                              }
                                            >
                                              <LocalPhoneRoundedIcon
                                                sx={{ color: "green" }}
                                              />{" "}
                                              {
                                                employerDetails.data.data
                                                  .mobileNumber
                                              }
                                            </div>
                                          </div>
                                          <div className="col-sm-4 mt-2">
                                            <div
                                              className={`btn rounded-4 ${jobListStyle.buttom_candi_list1}`}
                                            >
                                              <a
                                                href={`${webConsoleBaseUrl}/waNotifications/customCompanyDetailsUpload.html?empId=${employerDetails.data.data.id}`}
                                                target="_blank"
                                                style={{
                                                  textDecoration: "none",
                                                }}
                                              >
                                                update
                                              </a>
                                            </div>
                                          </div>
                                          <p
                                            className="d-flex justify-content-end mt-3"
                                            style={{ marginLeft: "-100px" }}
                                          >
                                            <a
                                              href={`${webConsoleBaseUrl}/waNotifications/customPostJobPage.html?employer_id=${
                                                employerDetails.data.data.id
                                              }&adminId=${localStorage.getItem(
                                                "adminID"
                                              )}`}
                                              target="_blank"
                                            >
                                              {/* https://console.taizo.in/waNotifications/customPostJobPage.html?employer_id=2&placement_id=278 */}
                                              <div
                                                className="btn btn-success px-3"
                                                style={{
                                                  backgroundColor: "#169C50",
                                                }}
                                              >
                                                <BsFileEarmarkPostFill
                                                  className="me-3"
                                                  // textAnchor=""
                                                />
                                                Job post
                                              </div>
                                            </a>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <div className="d-grid justify-content-end  my-2 ">
                                  <div
                                    className="d-flex flex-row align-items-center "
                                    // style={{ width: "200px" }}
                                  >
                                    {!(
                                      employerDetails.data.data.notQualified ||
                                      employerDetails.data.data.qualified
                                    ) && (
                                      <div>
                                        <>
                                          <FormControl
                                            fullWidth
                                            sx={{ width: "200px" }}
                                          >
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
                                                  // className={`${candidateFBmeta.select_wrp}`}
                                                  >
                                                    <div
                                                      onClick={() => {
                                                        openIsQualifyPopup(
                                                          "qualify"
                                                        );
                                                      }}
                                                      sx={{ mr: 5 }}
                                                      variant="contained"
                                                      color="primary"
                                                    >
                                                      {/* <CheckCircleIcon /> */}
                                                      Qualify
                                                    </div>
                                                  </div>
                                                </>
                                              </MenuItem>
                                              <MenuItem>
                                                <>
                                                  <div
                                                  // className={`${candidateFBmeta.select_wrp}`}
                                                  >
                                                    <div
                                                      onClick={() => {
                                                        openIsQualifyPopup(
                                                          "notQualify"
                                                        );
                                                      }}
                                                      variant="contained"
                                                      color="error"
                                                    >
                                                      {/* <NotInterestedIcon /> */}
                                                      Not Qualify
                                                    </div>
                                                  </div>
                                                </>
                                              </MenuItem>
                                            </Select>
                                          </FormControl>{" "}
                                          {""}
                                        </>
                                      </div>
                                    )}

                                    {(employerDetails.data.data.notQualified ||
                                      employerDetails.data.data.qualified) && (
                                      <>
                                        {employerDetails.data.data
                                          .qualified && (
                                          <>
                                            <Button
                                              variant="contained"
                                              color="primary"
                                            >
                                              {/* <CheckCircleIcon /> */}
                                              Qualified
                                            </Button>
                                          </>
                                        )}
                                        {employerDetails.data.data
                                          .notQualified && (
                                          <>
                                            <Button
                                              variant="contained"
                                              color="error"
                                            >
                                              {/* <NotInterestedIcon /> */}
                                              Not Qualified
                                            </Button>
                                          </>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <ul
                                  className={`nav nav-tabs ${jobDetailsStyle.nav_tabr}`}
                                >
                                  <li
                                    className={`nav-item ${
                                      jobDetailsStyle.nav_items
                                    } ${
                                      activeTab === "tab1"
                                        ? jobDetailsStyle.active
                                        : ""
                                    }`}
                                  >
                                    <button
                                      className={`nav-link ${jobDetailsStyle.nav_links}`}
                                      onClick={() => handleClick("tab1")}
                                    >
                                      Details
                                    </button>
                                  </li>

                                  <li
                                    className={`nav-item ${
                                      jobDetailsStyle.nav_items
                                    } ${
                                      activeTab === "tab2"
                                        ? jobDetailsStyle.active
                                        : ""
                                    }`}
                                  >
                                    <button
                                      className={`nav-link ${jobDetailsStyle.nav_links}`}
                                      onClick={() => handleClick("tab2")}
                                    >
                                      Timeline
                                    </button>
                                  </li>
                                </ul>
                              </div>
                              <div className={`${candidatestyle.tab_content1}`}>
                                {activeTab === "tab1" && (
                                  <div className={`tab-pane ${style.active}`}>
                                    <div className="row">
                                      <div className="col-sm-6">
                                        <b>Employer Details</b>
                                        <div className="row">
                                          <div className="col-sm-12">
                                            <div className="row">
                                              <div className="d-flex flex-row">
                                                <div className="col-sm-4">
                                                  Contact Person :
                                                </div>
                                                <div className="col-sm-8">
                                                  {
                                                    employerDetails.data.data
                                                      .contactPersonName
                                                  }
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="d-flex flex-row">
                                                <div className="col-sm-4">
                                                  Email Id:
                                                </div>
                                                <div className="col-sm-8">
                                                  {
                                                    employerDetails.data.data
                                                      .emailId
                                                  }
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="d-flex flex-row">
                                                <div className="col-sm-4">
                                                  Loaction :
                                                </div>
                                                <div className="col-sm-8">
                                                  {
                                                    employerDetails.data.data
                                                      .city
                                                  }
                                                  ,
                                                  {employerDetails.data.data
                                                    .state
                                                    ? employerDetails.data.data
                                                        .state
                                                    : "null"}
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="d-flex flex-row">
                                                <div className="col-sm-4">
                                                  used Free Trial :
                                                </div>
                                                <div className="col-sm-8">
                                                  {
                                                    employerDetails.data.data
                                                      .usedFreeTrial
                                                  }
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-sm-6">
                                        <b>Company Details</b>
                                        <div className="row">
                                          <div className="col-sm-12">
                                            <div className="row">
                                              <div className="d-flex flex-row">
                                                <div className="col-sm-4">
                                                  Reg.proof No.:
                                                </div>
                                                <div className="col-sm-8">
                                                  {
                                                    employerDetails.data.data
                                                      .regProofNumber
                                                  }
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="d-flex flex-row">
                                                <div className="col-sm-4">
                                                  KYC status:
                                                </div>
                                                <div className="col-sm-8">
                                                  {
                                                    employerDetails.data.data
                                                      .kycStatus
                                                  }
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="d-flex flex-row">
                                                <div className="col-sm-4">
                                                  Year Founded:
                                                </div>
                                                <div className="col-sm-8">
                                                  {
                                                    employerDetails.data.data
                                                      .yearFounded
                                                  }
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="d-flex flex-row">
                                                <div className="col-sm-4">
                                                  Reference:
                                                </div>
                                                <div className="col-sm-8">
                                                  {
                                                    employerDetails.data.data
                                                      .reference
                                                  }
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="">
                                                <div className="col-sm-4">
                                                  Address :
                                                </div>
                                                <div className="col-sm-8">
                                                  {
                                                    employerDetails.data.data
                                                      .address
                                                  }
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {activeTab === "tab2" && (
                                  <EmployerTimeline id={EmpId} />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Box>
                  </>
                }
              />
            </MyModal>
          </>
        )}

        <div>
          {isQualifiedDetails.openPopup && (
            <MyModal>
              <ModalContainer
                zIndex={10000}
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
          )}
        </div>
      </div>
    </div>
  );
}
