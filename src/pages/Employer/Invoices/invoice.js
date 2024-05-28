/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";

import {
  GetEmloperByNumber,
  GetPlanDetails,
  PostProformaInvoice,
  getJobIndustries,
  getJobRole,
} from "../../../apiServices";
import style from "./invoice.module.scss";
import SuccessTick from "../../../components/success_tick";
import {
  MyModal,
  alphabetTest,
  alphabetWithSpecialCharacterTest,
  gstTest,
  numbersOnlyTest,
} from "../../../utility";
import ModalContainer from "../../../components/modal_popup";
import { Autocomplete } from "@mui/material";
import { Link } from "react-router-dom";
import ConfirmationPopup from "../../../components/ModalPopups/confirmationPopup";
import { AiOutlineArrowLeft } from "react-icons/ai";

const InvoiceForm = () => {
  const [planPrice, setPlanPrice] = useState({
    fresher: 1999,
    experienced: 2999,
  });

  const [options, setOptions] = useState({ industries: [], jobRoles: [] });

  const idCounter = useRef(0);

  const [fields, setFields] = useState([
    {
      id: idCounter.current++,
      jobRole: { val: "", err: false },
      industry: { val: "", err: false },
      openings: { val: "", err: false },
      lookingFor: { val: "", err: false },
      workHours: { val: "", err: false },
      maxSalary: { val: "", err: false },
      minSalary: { val: "", err: false },
      amount: { val: 0, err: false },
    },
  ]);

  const [jobDetails, setJobDetails] = useState([]);

  const [formData, setFormData] = useState({
    mobileNumber: "",
    email: "",
    amount: "",
    discountAmount: "",
    fresherAmount: "",
    experiencedAmount: "",
    companyName: "",
    selectedDate: null,
    address: "",
    discountPercentage: 0,
    NoOfOpenings: "",
    noOfFreshers: 0,
    noOfExperienced: 0,
    contactName: "",
    gstNumber: "",
    jobDetails: "",
    linkValidity: "",
  });

  const [enableSubmit, setEnableSubmit] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  function handleConfirmationClose() {
    setShowConfirmPopup(false);
  }

  function handleConfirmationOpen(e) {
    setShowConfirmPopup(true);
  }

  function ConfirmFormSubmit() {
    // to post details
    setEnableSubmit(true);
    PostProformaInvoice(formData).then((data) => {
      console.log(data, "proforma Invoice api data");
      setEnableSubmit(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowConfirmPopup(false);
      }, 3000);

      setFormData({
        mobileNumber: "",
        email: "",
        amount: "",
        discountAmount: "",
        fresherAmount: "",
        experiencedAmount: "",
        companyName: "",
        selectedDate: null,
        address: "",
        discountPercentage: 0,
        NoOfOpenings: "",
        noOfFreshers: 0,
        noOfExperienced: 0,
        contactName: "",
        gstNumber: "",
        jobDetails: JSON.stringify(jobDetails),
        linkValidity: "",
      });

      setFields([
        {
          id: idCounter.current++,
          jobRole: { val: "", err: false },
          industry: { val: "", err: false },
          openings: { val: "", err: false },
          lookingFor: { val: "", err: false },
          workHours: { val: "", err: false },
          maxSalary: { val: "", err: false },
          minSalary: { val: "", err: false },
          amount: { val: 0, err: false },
        },
      ]);

      setErrors({
        mobileNumber: "",
        amount: "",
        discountAmount: "",
        emailId: "",
        noOfOpenings: "",
        discountPercentage: "",
        companyName: "",
        Address: "",
        invoiceDate: "",
        gstNumber: "",
        contactName: "",
        linkValidity: "",
      });
      // noError = 0;

      // alert("Submmitted succeesfully");
    });
  }

  const [errors, setErrors] = useState({
    mobileNumber: "",
    amount: "",
    discountAmount: "",
    emailId: "",
    noOfOpenings: "",
    discountPercentage: "",
    companyName: "",
    Address: "",
    invoiceDate: "",
    gstNumber: "",
    contactName: "",
  });

  // useEffect(()=>{
  //   fields.forEach((el,index)=>{
  //     let amount = el.openings * planPrice.fresher;
  //   });
  // },[fields])

  useEffect(() => {
    getJobIndustries().then((data) => {
      let industries = data.results.map((el) => el.industry);
      setOptions((prev) => ({ ...prev, industries: [...industries] }));
    });
    getJobRole(1).then((data) => {
      let jobRoles = data.results.map((el) => el.jobRoles);
      setOptions((prev) => ({ ...prev, jobRoles: [...jobRoles] }));
    });
  }, []);

  useEffect(() => {
    // to update amount for every field changes
    let totalAmount = 0;
    fields.map((el) => {
      totalAmount = totalAmount + el.amount.val;
    });

    // console.log(totalAmount, "totalllllllllamount");
    handleFieldChange("amount", totalAmount);

    if (totalAmount > 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount: "",
      }));
    }

    // to create a job details array
    let jobdetailsArray = fields.map((el) => {
      let jobdetailsObj = {
        jobCategory: el.jobRole.val,
        industry: el.industry.val,
        noOfOpenings: el.openings.val,
        isExperienced: el.lookingFor.val !== "Fresher",
        jobMinExp:
          el.lookingFor.val !== "Fresher" ? parseInt(el.lookingFor.val) : 0,
        maxSalary: parseInt(el.maxSalary.val),
        minSalary: parseInt(el.minSalary.val),
        workHours: el.workHours.val + " hours",
        amount: el.amount.val,
      };
      return jobdetailsObj;
    });

    setJobDetails(jobdetailsArray);
  }, [fields]);

  useEffect(() => {
    // to set job details
    setFormData((prev) => ({ ...prev, jobDetails: jobDetails }));
  }, [jobDetails]);

  const validateFields = (fields) => {
    let valid = true;

    fields.forEach((field, index) => {
      const updatedField = { ...field };

      if (field.jobRole.val === "") {
        updatedField.jobRole.err = true;
        valid = false;
      } else {
        updatedField.jobRole.err = false;
      }

      if (field.openings.val === "") {
        updatedField.openings.err = true;
        valid = false;
      } else {
        updatedField.openings.err = false;
      }

      if (field.industry.val === "") {
        updatedField.industry.err = true;
        valid = false;
      } else {
        updatedField.industry.err = false;
      }

      if (field.lookingFor.val === "") {
        updatedField.lookingFor.err = true;
        valid = false;
      } else {
        updatedField.lookingFor.err = false;
      }

      if (field.workHours.val === "" || !numbersOnlyTest(field.workHours.val)) {
        updatedField.workHours.err = true;
        valid = false;
      } else {
        updatedField.workHours.err = false;
      }

      if (field.maxSalary.val === "" || !numbersOnlyTest(field.maxSalary.val)) {
        updatedField.maxSalary.err = true;
        valid = false;
      } else {
        updatedField.maxSalary.err = false;
      }

      if (field.minSalary.val === "" || !numbersOnlyTest(field.minSalary.val)) {
        updatedField.minSalary.err = true;
        valid = false;
      } else {
        updatedField.minSalary.err = false;
      }

      console.log(updatedField);

      setFields((prev) => {
        let updatedFields = [...prev];
        updatedFields[index] = updatedField;
        return updatedFields;
      });
    });

    return valid;
  };

  const addField = () => {
    if (validateFields(fields)) {
      const newField = {
        id: idCounter.current++,
        jobRole: { val: "", err: false },
        openings: { val: "", err: false },
        industry: { val: "", err: false },
        lookingFor: { val: "", err: false },
        workHours: { val: "", err: false },
        maxSalary: { val: "", err: false },
        minSalary: { val: "", err: false },
        amount: { val: 0, err: false },
      };
      setFields([...fields, newField]);
    }
  };

  const removeField = (id) => {
    let updatedFields;
    if (fields.length > 1) {
      updatedFields = fields.filter((field) => field.id !== id);
      setFields(updatedFields);
    }
  };

  const handleJobFieldChange = (id, fieldKey, value) => {
    console.log(value);
    const updatedFields = fields.map((field) =>
      field.id === id
        ? {
            ...field,
            [fieldKey]: {
              val: value != null && !value.isNaN ? value : "",
              err: value === null,
            },
          }
        : field
    );
    setFields(updatedFields);
  };

  useEffect(() => {
    GetPlanDetails("Fresher").then((data) => {
      setPlanPrice((prev) => ({ ...prev, fresher: data.data.amount }));
    });
    GetPlanDetails("Experienced").then((data) => {
      setPlanPrice((prev) => ({ ...prev, experienced: data.data.amount }));
    });
  }, []);

  function handleLookingForChange(key, value) {
    // to filter out which index should be updated
    let fieldToUpdate = fields.filter((el) => el.id == key);

    let noOfOpenings = fieldToUpdate[0].openings.val;
    if (value == "Fresher") {
      fieldToUpdate[0].amount.val = planPrice.fresher * noOfOpenings;
    } else {
      fieldToUpdate[0].amount.val = planPrice.experienced * noOfOpenings;
    }
    // console.log("hii", noOfOpenings, "Helooooooooooo");

    setFields((prev) => {
      let updatedFields = [...prev];
      updatedFields.map((el) => {
        if (el.id != key) {
          return el;
        } else {
          return fieldToUpdate;
        }
      });

      return updatedFields;
    });
  }

  function handleIndividualAmountChange(key, value, type) {
    console.log(key, value);
    // to filter out which index should be updated
    let fieldToUpdate = fields.filter((el) => el.id == key);

    let noOfOpenings = value;

    if (fieldToUpdate[0].lookingFor.val == "Fresher") {
      fieldToUpdate[0].amount.val = planPrice.fresher * noOfOpenings;
    } else {
      fieldToUpdate[0].amount.val = planPrice.experienced * noOfOpenings;
    }
    console.log(fields[key]);
    setFields((prev) => {
      let updatedFields = [...prev];
      updatedFields.map((el) => {
        if (el.id != key) {
          return el;
        } else {
          return fieldToUpdate;
        }
      });

      return updatedFields;
    });
  }

  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  function handleVerifyNumberSubmit(number) {
    // e.preventDefault();

    if (number.length == 10) {
      GetEmloperByNumber(number).then((data) => {
        // console.log(data);
        if (data.code === 404) {
          setFormData((prev) => ({
            ...prev,
            email: "",
            amount: null,
            companyName: "",
            selectedDate: null,
            address: "",
            discountPercentage: "",
            NoOfOpenings: "",
            contactName: "",
            gstNumber: "",
          }));

          return false;
        }
        setFormData((prev) => ({
          ...prev,
          mobileNumber: number || "",
          email: data.data.emailId || "",
          companyName: data.data.companyName || "",
          selectedDate: new Date(),
          address: data.data.address || "",
          contactName: data.data.contactPersonName || "",
          gstNumber: data.data.regProofNumber || "",
        }));
      });
    } else {
    }
  }

  const handleMobileNumberChange = (e) => {
    const mobileNumber = e.target.value;

    if (!isNaN(mobileNumber)) {
      // setFormData((prev) => ({ ...prev, mobileNumber: mobileNumber }));
      handleFieldChange("mobileNumber", mobileNumber);

      setFields([
        {
          id: idCounter.current++,
          jobRole: { val: "", err: false },
          industry: { val: "", err: false },
          openings: { val: "", err: false },
          lookingFor: { val: "", err: false },
          workHours: { val: "", err: false },
          maxSalary: { val: "", err: false },
          minSalary: { val: "", err: false },
          amount: { val: 0, err: false },
        },
      ]);

      setErrors({
        mobileNumber: "",
        amount: "",
        discountAmount: "",
        emailId: "",
        noOfOpenings: "",
        discountPercentage: "",
        companyName: "",
        Address: "",
        invoiceDate: "",
        gstNumber: "",
        contactName: "",
        linkValidity: "",
      });

      if (mobileNumber.length == 10) {
        handleVerifyNumberSubmit(mobileNumber);
        setErrors((prevErrors) => ({
          ...prevErrors,
          mobileNumber: "",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          email: "",
          amount: null,
          companyName: "",
          selectedDate: null,
          address: "",
          discountPercentage: "",
          NoOfOpenings: "",
          contactName: "",
          gstNumber: "",
        }));
      }
    } else {
      console.log("Form has errors. Please correct them.");
      setErrors((prevErrors) => ({
        ...prevErrors,
        mobileNumber: "Only Numbers",
      }));
    }
  };

  const handleContactNameChange = (e) => {
    const value = e.target.value;

    if (alphabetTest(value)) {
      handleFieldChange("contactName", value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        contactName: "",
      }));
    } else {
      // handleFieldChange("contactName", value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        contactName: "Contact name is required",
      }));
    }
  };

  const handleAmountChange = (event) => {
    const newValue = event.target.value;
    const type = event.target.name;

    if (!isNaN(newValue)) {
      handleFieldChange(type, newValue.trim());
      setErrors((prevErrors) => ({
        ...prevErrors,
        [type]: "", // Use computed property name
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [type]: "Invalid amount", // Use computed property name
      }));
    }
  };

  const handleSalaryChange = (event) => {
    const newValue = event.target.value;
    const type = event.target.name;

    if (!isNaN(newValue)) {
      handleFieldChange(type, newValue.trim());
      setErrors((prevErrors) => ({
        ...prevErrors,
        [type]: "", // Use computed property name
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [type]: "Invalid amount", // Use computed property name
      }));
    }
  };

  const handleValidityDays = (event) => {
    const newValue = event.target.value;
    const type = event.target.name;

    if (!isNaN(newValue) && newValue < 16) {
      handleFieldChange(type, newValue.trim());
      setErrors((prevErrors) => ({
        ...prevErrors,
        [type]: "", // Use computed property name
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [type]: "Invalid No of Days", // Use computed property name
      }));
    }
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const handleDiscountChange = (event) => {
    const newValue = event.target.value;

    if (!isNaN(newValue) && newValue < 16) {
      handleFieldChange("discountPercentage", newValue.trim());
      setErrors((prevErrors) => ({
        ...prevErrors,
        discountPercentage: "",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        discountPercentage: "Invalid discount percentage",
      }));
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    handleFieldChange("email", value);
    // Validate email
    if (value != "") {
      if (!value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          emailId: "Invalid email address",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          emailId: "",
        }));
      }
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailId: "",
      }));
    }
  };

  const handleCompanyName = (e) => {
    handleFieldChange("companyName", e.target.value);
    const value = e.target.value;

    if (alphabetWithSpecialCharacterTest(value)) {
      handleFieldChange("companyName", value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        companyName: "",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        companyName: "Invalid Company name",
      }));
    }
  };

  useEffect(() => {
    // to calculate discount
    const originalAmount = formData.amount;
    const discountPercentage = formData.discountPercentage;

    const calculatedDiscount = (originalAmount * discountPercentage) / 100;
    const calculatedDiscountedAmount = originalAmount - calculatedDiscount;
    handleFieldChange("discountAmount", Math.floor(calculatedDiscountedAmount));
    // handleFieldChange("discountAmount", calculatedDiscountedAmount);
  }, [formData.discountPercentage, formData.amount]);

  const handleAddress = (e) => {
    handleFieldChange("address", e.target.value);

    if (e.target.value == "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        address: "Address is required *",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        address: "",
      }));
    }
  };

  const handleGSTChange = (event) => {
    const newValue = event.target.value;

    handleFieldChange("gstNumber", newValue);

    if (gstTest(newValue)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        gstNumber: "",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        gstNumber: "Invalid GST number",
      }));
    }
  };

  useEffect(() => {
    if (formData.gstNumber == "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        gstNumber: "",
      }));
    }
  }, [formData.gstNumber]);

  // ...

  const handleFormSubmit = (event) => {
    event.preventDefault();

    let noError = 0;

    // Validate mobile number
    if (formData.mobileNumber.length !== 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        mobileNumber: "Mobile Number must be 10 digits",
      }));
      noError++;
    }
    // Validate email

    if (formData.email != "") {
      if (
        !formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          emailId: "Invalid email address",
        }));
        noError++;
      }
    }

    // Validate amount
    if (isNaN(formData.amount) || formData.amount == "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount: "Invalid amount",
      }));
      noError++;
    }

    // Validate amount
    if (isNaN(formData.linkValidity) || formData.linkValidity == "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        linkValidity: "Link validity is required",
      }));
      noError++;
    }

    // Validate discount percentage
    if (
      isNaN(formData.discountPercentage) ||
      formData.discountPercentage < 0 ||
      formData.discountPercentage > 100
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        discountPercentage: "Invalid discount percentage",
      }));
      noError++;
    }

    // Validate company name
    if (!formData.companyName.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        companyName: "Company name is required",
      }));
      noError++;
    }

    // Validate GST Number
    if (formData.gstNumber != "") {
      if (!gstTest(formData.gstNumber)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          gstNumber: "Invalid GST number",
        }));
        noError++;
      }
    }

    // Validate contact name
    if (!formData.contactName.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contactName: "Contact name is required",
      }));
      noError++;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contactName: "",
      }));
    }

    // Validate address
    if (!formData.address.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        address: "Address is required *",
      }));
      noError++;
    }

    if (!validateFields(fields)) {
      noError++;
    }

    // Check if any errors exist
    const hasErrors = !Object.keys(errors).every((key) => errors[key] === "");

    // If there are any errors, return early
    if (noError != 0) {
      console.log("Form has errors. Please correct them.");
      return;
    }

    handleConfirmationOpen();
  };

  // ...

  return (
    <>
      <div className="container">
        <div>
          <header className=" ">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={"/invoice_List"}
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
            <h4 className="text-center mt-3"> Proforma Invoice </h4>
          </header>
        </div>
        <div className={`${style.invoice_form_wrp}`}>
          <>
            <form onSubmit={handleFormSubmit}>
              <div className="row">
                <div className="col-sm-5">
                  <h5 className="text-center">Company Details</h5>
                  <div>
                    <TextField
                      label="Mobile Number"
                      variant="outlined"
                      value={formData.mobileNumber}
                      onChange={handleMobileNumberChange}
                      fullWidth
                      margin="normal"
                      error={Boolean(errors.mobileNumber)}
                      helperText={errors.mobileNumber}
                      inputProps={{ maxLength: 10 }}
                    />
                    <TextField
                      label="Email (Optional)"
                      variant="outlined"
                      type="email"
                      value={formData.email}
                      onChange={handleEmailChange}
                      fullWidth
                      margin="normal"
                      error={Boolean(errors.emailId)}
                      helperText={errors.emailId}
                    />
                    <TextField
                      label="Company Name"
                      variant="outlined"
                      value={formData.companyName}
                      onChange={handleCompanyName}
                      fullWidth
                      margin="normal"
                      error={Boolean(errors.companyName)}
                      helperText={errors.companyName}
                    />
                    <TextField
                      label="Contact Name"
                      variant="outlined"
                      value={formData.contactName}
                      onChange={handleContactNameChange}
                      fullWidth
                      margin="normal"
                      error={Boolean(errors.contactName)}
                      helperText={errors.contactName}
                    />
                    <TextField
                      label="GST Number (Optional)"
                      variant="outlined"
                      value={formData.gstNumber}
                      onChange={handleGSTChange}
                      fullWidth
                      margin="normal"
                      error={Boolean(errors.gstNumber)}
                      helperText={errors.gstNumber}
                    />
                    <TextField
                      label="Company Address"
                      variant="outlined"
                      value={formData.address}
                      onChange={handleAddress}
                      fullWidth
                      margin="normal"
                      multiline
                      error={Boolean(errors.address)}
                      helperText={errors.address}
                    />
                  </div>
                </div>
                <div className="col-sm-7 ">
                  <h5 className="text-center">Requirement Details</h5>
                  <div className="mt-4">
                    {fields.map((field) => (
                      <div key={field.id}>
                        <Autocomplete
                          value={field.industry.val}
                          style={{ margin: "10px 0" }}
                          onChange={(e, newValue) => {
                            handleJobFieldChange(
                              field.id,
                              "industry",
                              newValue
                            );
                          }}
                          clearIcon={null}
                          options={options.industries} // Replace industryOptions with your array of options
                          getOptionLabel={(option) => option}
                          filterSelectedOptions
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Industry"
                              variant="outlined"
                              error={field.industry.err}
                            />
                          )}
                        />

                        <div className="row">
                          <div className="col-sm-6">
                            <Autocomplete
                              value={field.jobRole.val}
                              style={{ margin: "10px 0" }}
                              onChange={(e, newValue) =>
                                handleJobFieldChange(
                                  field.id,
                                  "jobRole",
                                  newValue
                                )
                              }
                              clearIcon={null}
                              options={options.jobRoles} // Replace jobRoleOptions with your array of options
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Job Category"
                                  variant="outlined"
                                  error={field.jobRole.err}
                                />
                              )}
                            />
                          </div>
                          <div className="col-sm-6">
                            <Autocomplete
                              value={field.lookingFor.val}
                              onChange={(event, newValue) => {
                                handleJobFieldChange(
                                  field.id,
                                  "lookingFor",
                                  newValue
                                );
                                handleLookingForChange(field.id, newValue);
                              }}
                              clearIcon={null}
                              style={{ margin: "10px 0" }}
                              options={[
                                "Fresher",
                                "0-1",
                                "1",
                                "2",
                                "3",
                                "4",
                                "5",
                                "6",
                                "7",
                                "8",
                                "9",
                                "10",
                              ]}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Minimum Experience"
                                  variant="outlined"
                                  error={field.lookingFor.err}
                                />
                              )}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-6">
                            <TextField
                              label="Work Hours"
                              variant="outlined"
                              name="workHours"
                              // value={formData.amount}
                              // onChange={handleAmountChange}
                              onChange={(e) => {
                                handleJobFieldChange(
                                  field.id,
                                  "workHours",
                                  e.target.value
                                );
                              }}
                              fullWidth
                              margin="normal"
                              inputProps={{ maxLength: 2 }}
                              error={field.workHours.err}
                            />
                          </div>
                          <div className="col-sm-6 d-flex flex-row gap-1">
                            <TextField
                              label="Min Salary"
                              variant="outlined"
                              name="minSalary"
                              onChange={(e) => {
                                handleJobFieldChange(
                                  field.id,
                                  "minSalary",
                                  e.target.value
                                );
                              }}
                              // value={formData.amount}
                              // onChange={handleAmountChange}
                              fullWidth
                              margin="normal"
                              inputProps={{ maxLength: 5 }}
                              error={field.minSalary.err}
                            />
                            <TextField
                              label="Max Salary"
                              variant="outlined"
                              name="maxSalary"
                              onChange={(e) => {
                                handleJobFieldChange(
                                  field.id,
                                  "maxSalary",
                                  e.target.value
                                );
                              }}
                              // value={formData.amount}
                              // onChange={handleAmountChange}
                              fullWidth
                              margin="normal"
                              inputProps={{ maxLength: 5 }}
                              error={field.maxSalary.err}
                              // error={Boolean(errors.amount)}
                              // helperText={errors.amount}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-6">
                            <Autocomplete
                              value={field.openings.val}
                              style={{ margin: "10px 0" }}
                              onChange={(e, newValue) => {
                                handleJobFieldChange(
                                  field.id,
                                  "openings",
                                  newValue
                                );
                                handleIndividualAmountChange(
                                  field.id,
                                  newValue,
                                  "openings"
                                );
                              }}
                              clearIcon={null}
                              options={[
                                "1",
                                "2",
                                "3",
                                "4",
                                "5",
                                "6",
                                "7",
                                "8",
                                "9",
                                "10",
                                "11",
                                "12",
                                "13",
                                "14",
                                "15",
                                "16",
                                "17",
                                "18",
                                "19",
                                "20",
                                "21",
                                "22",
                                "23",
                                "24",
                                "25",
                                "26",
                                "27",
                                "28",
                                "29",
                                "30",
                                "31",
                                "32",
                                "33",
                                "34",
                                "35",
                                "36",
                                "37",
                                "38",
                                "39",
                                "40",
                                "41",
                                "42",
                                "43",
                                "44",
                                "45",
                                "46",
                                "47",
                                "48",
                                "49",
                                "50",
                                "51",
                                "52",
                                "53",
                                "54",
                                "55",
                                "56",
                                "57",
                                "58",
                                "59",
                                "60",
                                "61",
                                "62",
                                "63",
                                "64",
                                "65",
                                "66",
                                "67",
                                "68",
                                "69",
                                "70",
                                "71",
                                "72",
                                "73",
                                "74",
                                "75",
                                "76",
                                "77",
                                "78",
                                "79",
                                "80",
                                "81",
                                "82",
                                "83",
                                "84",
                                "85",
                                "86",
                                "87",
                                "88",
                                "89",
                                "90",
                                "91",
                                "92",
                                "93",
                                "94",
                                "95",
                                "96",
                                "97",
                                "98",
                                "99",
                                "100",
                              ]} // You can customize the options here
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  type="text"
                                  label="Number of Openings"
                                  variant="outlined"
                                  error={field.openings.err}
                                />
                              )}
                            />
                          </div>
                          <div className="col-sm-6">
                            <h5 className=" mt-4 px-2">
                              Amount : {field.amount.val}
                            </h5>
                          </div>
                        </div>

                        {fields.length > 1 && (
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => removeField(field.id)}
                          >
                            <DeleteIcon /> Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    <div className="mt-2">
                      <Button color="success" onClick={addField}>
                        {" "}
                        + Add Requirements
                      </Button>
                    </div>

                    <div>
                      <TextField
                        label="Total Amount"
                        variant="outlined"
                        name="amount"
                        value={formData.amount}
                        // onChange={handleAmountChange}
                        fullWidth
                        margin="normal"
                        inputProps={{ maxLength: 7 }}
                        error={Boolean(errors.amount)}
                        helperText={errors.amount}
                        readOnly
                      />
                      <div className="row">
                        <div className="col-sm-6">
                          <TextField
                            label="Discount Percentage (Optional)"
                            variant="outlined"
                            value={formData.discountPercentage}
                            onChange={handleDiscountChange}
                            fullWidth
                            margin="normal"
                            inputProps={{ maxLength: 2 }}
                            error={Boolean(errors.discountPercentage)}
                            helperText={errors.discountPercentage}
                          />
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            label="Discounted Amount (Optional)"
                            variant="outlined"
                            name="discountAmount"
                            value={formData.discountAmount}
                            // onChange={handleAmountChange}
                            fullWidth
                            readOnly
                            margin="normal"
                            inputProps={{ maxLength: 7 }}
                            error={Boolean(errors.discountAmount)}
                            helperText={errors.discountAmount}
                          />
                        </div>
                      </div>
                      <TextField
                        label="Link Validity (days)"
                        variant="outlined"
                        name="linkValidity"
                        value={formData.linkValidity}
                        onChange={handleValidityDays}
                        fullWidth
                        margin="normal"
                        inputProps={{ maxLength: 2 }}
                        error={Boolean(errors.linkValidity)}
                        helperText={errors.linkValidity}
                      />
                    </div>
                  </div>
                  <div className="d-grid justify-content-center my-3">
                    <Button
                      onClick={handleFormSubmit}
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={enableSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </>
          {showSuccess && (
            <MyModal>
              <ModalContainer
                childComponent={
                  <SuccessTick HeadText="Proforma Invoice Sent" />
                }
              />
            </MyModal>
          )}
          {showConfirmPopup && (
            <MyModal>
              <ModalContainer
                childComponent={
                  <ConfirmationPopup
                    heading={"Confirmation"}
                    headingText={
                      "Are you sure you want to submit the Proforma Invoice form?"
                    }
                    onConfirm={ConfirmFormSubmit}
                    enableSubmit={enableSubmit}
                    onRequestClose={handleConfirmationClose}
                  />
                }
              />
            </MyModal>
          )}
        </div>
      </div>
    </>
  );
};

export default InvoiceForm;
