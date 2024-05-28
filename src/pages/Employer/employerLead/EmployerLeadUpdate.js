import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import employerLeadStyle from "./EmployerLead.module.scss";
import React, { useEffect, useState } from "react";
import {
  GetEmployerLead,
  getJobFilterOptions,
  getJobIndustries,
  postEmployerLead,
} from "../../../apiServices";
import { MyModal } from "../../../utility";
import ModalContainer from "../../../components/modal_popup";
import SuccessTick from "../../../components/success_tick";
// import {  useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

const EmployerLeadUpdate = ({ reloeadpage, oncloseLead, mobileNumber }) => {
  // const Navigate = useNavigate();

  const adminId = localStorage.getItem("adminID");

  const adminDetails = useSelector((state) => state.adminDetails);

  let isSuperAdmin = adminDetails.roleID === 1;

  const [leadData, setLeadData] = useState({
    fromAdminId: { val: adminId == 1 ? "" : adminId, err: false },
    emailId: { val: "", err: false },
    title: { val: "", err: false },
    mobileNumber: { val: mobileNumber, err: false },
    // mobileNumber: { val: "", err: false },
    mobileCountryCode: "+91",
    fromAdmin: true,
    companyName: { val: "", err: false },
    industry: { val: "", err: false },
    city: { val: "", err: false },
    contactPersonName: { val: "", err: false },
    designation: { val: "", err: false },
    notes: { val: "", err: false },
    ccMail: { val: "", err: false },
    paymentDays: { val: "", err: false },
    address: { val: "", err: false },
  });

  const [options, setOptions] = useState({
    industry: [],
    city: [],
  });
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  // const [updateMode, setUpdateMode] = useState(false);
  const [confirmationSubmit, setconfirmationSubmit] = useState(false);

  useEffect(() => {
    getJobIndustries().then((data) => {
      setOptions((prev) => ({
        ...prev,
        industry: data.results,
      }));
    });
    getJobFilterOptions().then((data) => {
      console.log(data, "city");
      setOptions((prev) => ({
        ...prev,
        city: data.filter((element) => element.category === "city"),
      }));
    });
  }, []);

  // useEffect(() => {
  //   postEmployerLead(leadData).then((data) => {
  //     console.log(data, "lead data");
  //   });
  // }, [leadData]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[0-9]{10}$/;
  const paymentDaysRegex = /^[0-9]{2}$/;
  const textInputRegex = /^[a-zA-Z, ]+$/;
  const selectInputRegex = /^[a-zA-Z. ]+$/;
  const AdressInputRegex = /^[a-zA-Z0-9.,/()&  ]+$/;
  const companynameInputRegex =
    /^[a-zA-Z0-9 !@#$%^&*()_+{}\\[\]:;<>,.?~\\/`|="-]+$/;

  const handleFromAdminChange = (e) => {
    let { value } = e.target;
    setLeadData((prev) => ({
      ...prev,
      fromAdminId: { val: value, err: false },
    }));
  };
  // const handleChange = (field, regex) => (event) => {
  //   const newValue = event.target.value;
  //   const isValid = regex.test(newValue);

  //   setLeadData((prev) => ({
  //     ...prev,
  //     [field]: { val: newValue, err: !isValid },
  //   }));

  //   if (field === "mobileNumber") {
  //     if (newValue.length === 10) {
  //       GetEmployerLead(newValue).then((data) => {
  //         if (data.code === 200) {
  //           const {
  //             companyName,
  //             industry,
  //             city,
  //             title,
  //             contactPersonName,
  //             notes,
  //             emailId,
  //             ccMail,
  //             paymentDays,
  //             address,
  //           } = data.data;

  //           setLeadData((prev) => ({
  //             ...prev,
  //             companyName: { val: companyName || "", err: false },
  //             industry: { val: industry || "", err: false },
  //             city: { val: city || "", err: false },
  //             contactPersonName: { val: contactPersonName || "", err: false },
  //             title: { val: title || "", err: false },
  //             notes: { val: notes || "", err: false },
  //             ccMail: { val: ccMail || "", err: false },
  //             paymentDays: { val: paymentDays || "", err: false },
  //             address: { val: address || "", err: false },
  //             emailId: { val: emailId || "", err: false },
  //           }));
  //           // setUpdateMode(true);
  //         } else {
  //           // Set update mode to false if the mobile number does not exist
  //           // setLeadData((prev) => ({
  //           //   ...prev,
  //           //   companyName: { val: "", err: false },
  //           //   industry: { val: "", err: false },
  //           //   city: { val: "", err: false },
  //           //   contactPersonName: { val: "", err: false },
  //           //   notes: { val: "", err: false },
  //           //   ccMail: { val: "", err: false },
  //           //   address: { val: "", err: false },
  //           //   emailId: { val: "", err: false },
  //           // }));
  //           // setUpdateMode(false);
  //         }
  //       });
  //     } else {
  //       // Set update mode to false if the mobile number length is not 10
  //       // setUpdateMode(false);
  //     }
  //   }
  // };
  useEffect(() => {
    console.log("Mobile Number:", mobileNumber);
    GetEmployerLead(mobileNumber).then((data) => {
      if (data.code === 200) {
        const {
          assignTo,
          companyName,
          industry,
          city,
          titles,
          contactPersonName,
          notes,
          emailId,
          ccMail,
          paymentDays,
          address,
        } = data.data;
        console.log("data.dataufrgthjk:", data.data);
        setLeadData((prev) => ({
          ...prev,
          fromAdminId: { val: assignTo || "", err: false },
          companyName: { val: companyName || "", err: false },
          industry: { val: industry || "", err: false },
          city: { val: city || "", err: false },
          contactPersonName: { val: contactPersonName || "", err: false },
          title: { val: titles || "", err: false },
          notes: { val: notes || "", err: false },
          ccMail: { val: ccMail || "", err: false },
          paymentDays: { val: paymentDays || "", err: false },
          address: { val: address || "", err: false },
          emailId: { val: emailId || "", err: false },
        }));
        console.log("fromAdminId:", assignTo);
        // setUpdateMode(true);
      } else {
        // Clear other fields if the mobile number does not exist
        setLeadData((prev) => ({
          ...prev,
          fromAdminId: { val: "", err: false },
          companyName: { val: "", err: false },
          industry: { val: "", err: false },
          city: { val: "", err: false },
          contactPersonName: { val: "", err: false },
          title: { val: "", err: false },
          notes: { val: "", err: false },
          ccMail: { val: "", err: false },
          paymentDays: { val: "", err: false },
          address: { val: "", err: false },
          emailId: { val: "", err: false },
        }));

        // setUpdateMode(false);
      }
    });
  }, []);

  const handleChange = (field, regex) => (event) => {
    const newValue = event.target.value;
    const isValid = regex.test(newValue);

    setLeadData((prev) => ({
      ...prev,
      [field]: { val: newValue, err: !isValid },
    }));

    // if (field === "mobileNumber") {
    //   if (newValue.length === 10) {
    //     GetEmployerLead(newValue).then((data) => {
    //       if (data.code === 200) {
    //         const {
    //           companyName,
    //           industry,
    //           city,
    //           title,
    //           contactPersonName,
    //           notes,
    //           emailId,
    //           ccMail,
    //           paymentDays,
    //           address,
    //         } = data.data;

    //         setLeadData((prev) => ({
    //           ...prev,
    //           companyName: { val: companyName || "", err: false },
    //           industry: { val: industry || "", err: false },
    //           city: { val: city || "", err: false },
    //           contactPersonName: { val: contactPersonName || "", err: false },
    //           title: { val: title || "", err: false },
    //           notes: { val: notes || "", err: false },
    //           ccMail: { val: ccMail || "", err: false },
    //           paymentDays: { val: paymentDays || "", err: false },
    //           address: { val: address || "", err: false },
    //           emailId: { val: emailId || "", err: false },
    //         }));
    //         // setUpdateMode(true);
    //       } else {
    //         // Clear other fields if the mobile number does not exist
    //         setLeadData((prev) => ({
    //           ...prev,
    //           companyName: { val: "", err: false },
    //           industry: { val: "", err: false },
    //           city: { val: "", err: false },
    //           contactPersonName: { val: "", err: false },
    //           title: { val: "", err: false },
    //           notes: { val: "", err: false },
    //           ccMail: { val: "", err: false },
    //           paymentDays: { val: "", err: false },
    //           address: { val: "", err: false },
    //           emailId: { val: "", err: false },
    //         }));
    //         // setUpdateMode(false);
    //       }
    //     });
    //   } else {
    //     // Clear other fields if the mobile number length is not 10
    //     setLeadData((prev) => ({
    //       ...prev,
    //       companyName: { val: "", err: false },
    //       industry: { val: "", err: false },
    //       city: { val: "", err: false },
    //       contactPersonName: { val: "", err: false },
    //       title: { val: "", err: false },
    //       notes: { val: "", err: false },
    //       ccMail: { val: "", err: false },
    //       paymentDays: { val: "", err: false },
    //       address: { val: "", err: false },
    //       emailId: { val: "", err: false },
    //     }));
    //     // setUpdateMode(false);
    //   }
    // }
  };

  const checkfield = (e) => {
    let isValidMobile = true;
    if (
      !leadData.mobileNumber.val ||
      leadData.mobileNumber.val.length === 0 ||
      !mobileRegex.test(leadData.mobileNumber.val)
    ) {
      isValidMobile = false;
      setLeadData((prev) => ({
        ...prev,
        mobileNumber: { val: prev.mobileNumber.val, err: true },
      }));
    }

    let isValidCompanyName = true;
    if (!companynameInputRegex.test(leadData.companyName.val)) {
      isValidCompanyName = false;
      setLeadData((prev) => ({
        ...prev,
        companyName: { val: prev.companyName.val, err: true },
      }));
    }

    // let isValidPaymentDays = true;
    // if (!paymentDaysRegex.test(leadData.paymentDays.val)) {
    //   isValidPaymentDays = false;
    //   setLeadData((prev) => ({
    //     ...prev,
    //     paymentDays: { val: prev.paymentDays.val, err: true },
    //   }));
    // }

    let isValidEmail = true;
    if (!emailRegex.test(leadData.emailId.val)) {
      isValidEmail = false;
      setLeadData((prev) => ({
        ...prev,
        emailId: { val: prev.emailId.val, err: true },
      }));
    }

    let isValidContactPersonName = true;
    if (!textInputRegex.test(leadData.contactPersonName.val)) {
      isValidContactPersonName = false;
      setLeadData((prev) => ({
        ...prev,
        contactPersonName: { val: prev.contactPersonName.val, err: true },
      }));
    }

    let isValidTitle = true;
    if (!selectInputRegex.test(leadData.title.val)) {
      isValidTitle = false;
      setLeadData((prev) => ({
        ...prev,
        title: { val: prev.title.val, err: true },
      }));
    }

    //   let isValidIntro = true;
    //   if (isSuperAdmin) {
    //     if (leadData.fromAdminId.val == "") {
    //       isValidIntro = false;
    //       setLeadData((prev) => ({
    //         ...prev,
    //         fromAdminId: { val: prev.fromAdminId.val, err: true },
    //       }));
    //     }
    //   }

    if (
      !isValidMobile ||
      !isValidCompanyName ||
      // !isValidPaymentDays ||
      !isValidEmail ||
      !isValidContactPersonName ||
      !isValidTitle
      // !isValidIntro
    ) {
      console.log("One or more fields are invalid.");
      return;
    }

    setconfirmationSubmit(true);
  };

  const handleSubmit = () => {
    // event.preventDefault();

    setEnableSubmit(true);

    postEmployerLead(leadData)
      .then((data) => {
        if (data.code === 400) {
          alert("Already registered employer");
        } else {
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            setconfirmationSubmit(false);
            oncloseLead();
            // Navigate("/EmployerTabsview#leads");
          }, 3000);
          reloeadpage();
        }
      })
      .finally(() => {
        setEnableSubmit(false);
        setLeadData({
          // fromAdminId: { val: adminId === 1 ? "" : adminId, err: false },
          emailId: { val: "", err: false },
          mobileNumber: { val: "", err: false },
          mobileCountryCode: "+91",
          fromAdmin: true,
          companyName: { val: "", err: false },
          industry: { val: "", err: false },
          city: { val: "", err: false },
          contactPersonName: { val: "", err: false },
          title: { val: "", err: false },
          notes: { val: "", err: false },
          ccMail: { val: "", err: false },
          paymentDays: { val: "", err: false },
          address: { val: "", err: false },
        });

        // Reset update mode
        // setUpdateMode(false);
      });
  };

  const handleIndustryChange = (event, value) => {
    setLeadData((prev) => ({
      ...prev,
      industry: { val: value, err: false },
    }));
  };

  const handleCityChange = (event, value) => {
    setLeadData((prev) => ({
      ...prev,
      city: { val: value, err: false },
    }));
  };

  return (
    <div>
      {/* <div className="container position-fixed">
          <header className="d-flex">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={"/employer_leads"}
            >
              <div
                className="btn rounded-circle"
                style={{
                  border: "2px solid #169c50",
                  color: "#169c50",
                  padding: "10px",
                }}
              >
                <AiOutlineArrowLeft style={{ fontSize: 30 }} />
              </div>
            </Link>
          </header>
        </div> */}
      <div className={`container ${employerLeadStyle.postEmployerLead}`}>
        <div className="p-2">
          {/* <h2 className="text-center">Employer Lead</h2> */}
          {/* <div className="row mt-3">
              {(isSuperAdmin) && (
                <div className="col-lg-12 col-md-12 col-sm-12 ">
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl
                      fullWidth
                      error={leadData.fromAdminId && leadData.fromAdminId.err}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Intro Mail From *
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="fromAdminId"
                        value={leadData.fromAdminId && leadData.fromAdminId.val}
                        label="Intro Mail From"
                        onChange={(e) => {
                          handleFromAdminChange(e);
                        }}
                        error={leadData.fromAdminId.err}
                        required
                      >
                        <MenuItem selected value="">
                          -Select-
                        </MenuItem>
                        <MenuItem value={1}>Joe</MenuItem>
                        <MenuItem value={2}>Sowmiya</MenuItem>
                        <MenuItem value={4}>Anees</MenuItem>
                        <MenuItem value={7}>Saravanan</MenuItem>
                        <MenuItem value={13}>Nirmala</MenuItem>
                        <MenuItem value={19}>Dinesh</MenuItem>
                      </Select>
                      {leadData.fromAdminId.err && (
                        <FormHelperText>
                          Intro mail from is required.
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                </div>
              )}
            </div> */}
          <div className="row mt-3">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <TextField
                fullWidth
                label="Mobile Number *"
                id="fullWidth"
                value={leadData.mobileNumber && leadData.mobileNumber.val}
                onChange={handleChange("mobileNumber", mobileRegex)}
                inputProps={{ maxLength: 10 }}
                error={leadData.mobileNumber && leadData.mobileNumber.err}
                helperText={
                  leadData.mobileNumber && leadData.mobileNumber.err
                    ? "Invalid mobile number"
                    : ""
                }
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <TextField
                fullWidth
                label="Email ID *"
                id="fullWidth"
                value={leadData.emailId && leadData.emailId.val}
                onChange={handleChange("emailId", emailRegex)}
                error={leadData.emailId && leadData.emailId.err}
                helperText={
                  leadData.emailId && leadData.emailId.err
                    ? "Invalid email id"
                    : ""
                }
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-2 col-md-2 col-sm-2">
              <FormControl fullWidth>
                <InputLabel id="title-label">Title</InputLabel>
                <Select
                  labelId="title-label"
                  id="title-select"
                  label="Title"
                  value={leadData.title && leadData.title.val}
                  onChange={handleChange("title", selectInputRegex)}
                  error={leadData.title && leadData.title.err}
                >
                  <MenuItem value="Mr.">Mr</MenuItem>
                  <MenuItem value="Ms.">Ms</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4">
              <TextField
                fullWidth
                label="Contact Person Name *"
                id="fullWidth"
                value={
                  leadData.contactPersonName && leadData.contactPersonName.val
                }
                error={
                  leadData.contactPersonName && leadData.contactPersonName.err
                }
                onChange={handleChange("contactPersonName", textInputRegex)}
                helperText={
                  leadData.contactPersonName && leadData.contactPersonName.err
                    ? "Invalid name"
                    : ""
                }
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <TextField
                fullWidth
                label="Company Name *"
                id="fullWidth"
                value={leadData.companyName && leadData.companyName.val}
                error={leadData.companyName && leadData.companyName.err}
                onChange={handleChange("companyName", companynameInputRegex)}
                helperText={
                  leadData.companyName && leadData.companyName.err
                    ? "Invalid company name"
                    : ""
                }
              />
            </div>
          </div>
          {/* <div className="row mt-3">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <TextField
                  fullWidth
                  label="Company Name *"
                  id="fullWidth"
                  value={leadData.companyName && leadData.companyName.val}
                  error={leadData.companyName && leadData.companyName.err}
                  onChange={handleChange("companyName", companynameInputRegex)}
                  helperText={
                    leadData.companyName && leadData.companyName.err
                      ? "Invalid company name"
                      : ""
                  }
                />
              </div>
            </div> */}

          <div className="row mt-3">
            <div className="">
              {/* <TextField
                    fullWidth
                    label="Designation *"
                    id="fullWidth"
                    value={leadData.designation && leadData.designation.val}
                    error={leadData.designation && leadData.designation.err}
                    onChange={handleChange("designation", textInputRegex)}
                    helperText={
                      leadData.designation && leadData.designation.err
                        ? "Invalid designation"
                        : ""
                    }
                  /> */}
            </div>
            {/* <div className="col-lg-12 col-md-6 col-sm-6">
              <TextField
                fullWidth
                label="ccMail"
                id="fullWidth"
                value={leadData.ccMail && leadData.ccMail.val}
                error={leadData.ccMail && leadData.ccMail.err}
                onChange={handleChange("ccMail", emailRegex)}
                helperText={
                  leadData.ccMail && leadData.ccMail.err
                    ? "Invalid cc mail"
                    : ""
                }
              />
            </div> */}
            {/* <div className="col-lg-6 col-md-6 col-sm-6">
                <TextField
                  fullWidth
                  label="Payment Policy (in days)*"
                  id="fullWidth"
                  value={leadData.paymentDays && leadData.paymentDays.val}
                  error={leadData.paymentDays && leadData.paymentDays.err}
                  onChange={handleChange("paymentDays", paymentDaysRegex)}
                  helperText={
                    leadData.paymentDays && leadData.paymentDays.err
                      ? "Enter payment days"
                      : ""
                  }
                  inputProps={{ maxLength: 2 }}
                />
              </div> */}
          </div>

          <div className="row mt-3">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <TextField
                fullWidth
                label="Notes"
                id="fullWidth"
                value={leadData.notes && leadData.notes.val}
                error={leadData.notes && leadData.notes.err}
                onChange={handleChange("notes", textInputRegex)}
                helperText={
                  leadData.notes && leadData.notes.err ? "Not required" : ""
                }
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <Autocomplete
                id="industry"
                name="industry"
                options={
                  options.industry &&
                  options.industry.map((industry) => industry.industry)
                }
                value={leadData.industry && leadData.industry.val}
                onChange={handleIndustryChange}
                renderInput={(params) => (
                  <TextField {...params} label="Industry" />
                )}
                helperText={
                  leadData.industry && leadData.industry.err
                    ? "Select industry"
                    : ""
                }
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <Autocomplete
                id="free-solo-demo"
                value={leadData.city && leadData.city.val}
                onChange={handleCityChange}
                options={
                  options.city && options.city.map((city) => city.options)
                }
                helperText={
                  leadData.city && leadData.city.err ? "Select city" : ""
                }
                renderInput={(params) => <TextField {...params} label="City" />}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <TextField
                fullWidth
                label="Address"
                id="fullWidth"
                value={leadData.address && leadData.address.val}
                onChange={handleChange("address", AdressInputRegex)}
                error={leadData.address && leadData.address.err}
                helperText={
                  leadData.address && leadData.address.err ? "Not required" : ""
                }
              />
            </div>
          </div>

          <div className="row mt-3"></div>

          <div className="d-flex justify-content-end mt-1">
            <button
              type="submit"
              // disabled={enableSubmit}
              className="btn btn-success px-5"
              onClick={() => {
                checkfield();
              }}
            >
              {/* {updateMode ? "Update" : "Submit"} */}
              Submit
            </button>
          </div>
          {confirmationSubmit && (
            <MyModal>
              <ModalContainer
                childComponent={
                  <>
                    <div>
                      <p>Are you sure you want to submit ? </p>
                    </div>
                    <div className="d-flex justify-content-end gap-3">
                      <div
                        className="btn btn-danger "
                        onClick={() => {
                          setconfirmationSubmit(false);
                        }}
                      >
                        Cancel
                      </div>
                      <div>
                        <button
                          className="btn btn-success"
                          onClick={(event) => handleSubmit()}
                          disabled={enableSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </>
                }
              />{" "}
            </MyModal>
          )}
        </div>

        {showSuccess && (
          <MyModal>
            <ModalContainer
              zIndex={10000}
              childComponent={
                <>
                  <SuccessTick HeadText="Successfully" />
                  {/* <div className="text-center">
                      <button
                        className="btn btn-success w-50 text-center"
                        onClick={() => {
                          setShowSuccess(false);
                          setconfirmationSubmit(false);
                        }}
                      >
                        ok
                      </button>
                    </div> */}
                </>
              }
            />
          </MyModal>
        )}
      </div>
    </div>
  );
};

export default EmployerLeadUpdate;
