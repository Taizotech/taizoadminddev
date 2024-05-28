/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";

import {
  PostPaymentDetails,
  getJobIndustries,
  getJobRole,
} from "../../apiServices";
import style from "../Employer/Invoices/invoice.module.scss";
import SuccessTick from "../../components/success_tick";
import { MyModal } from "../../utility";
import ModalContainer from "../../components/modal_popup";
import { Autocomplete } from "@mui/material";
import ConfirmationPopup from "../../components/ModalPopups/confirmationPopup";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const EmployerPayment = () => {
  const [options, setOptions] = useState({ industries: [], jobRoles: [] });

  // const [value, setValue] = React.useState(dayjs("2022-04-17"));

  const idCounter = useRef(0);

  const [fields, setFields] = useState([
    {
      id: idCounter.current++,
      jobRole: { val: "", err: false },
      industry: { val: "", err: false },
      openings: { val: "", err: false },
      lookingFor: { val: "", err: false },
      amount: { val: 0, err: false },
    },
  ]);

  const [jobDetails, setJobDetails] = useState([]);

  const [formData, setFormData] = useState({
    jobDetails: jobDetails,
    employerID: "",
    paymentID: "",
    paymentMethod: "",
    chequeDate: new Date(),
    chequeNo: "",
    amount: "",
  });

  const [enableSubmit, setEnableSubmit] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const [errors, setErrors] = useState({
    employerID: "",
    paymentID: "",
    paymentMethod: "",
    chequeDate: null,
    chequeNo: "",
    amount: "",
  });

  function handleConfirmationClose() {
    setShowConfirmPopup(false);
  }

  function handleConfirmationOpen(e) {
    setShowConfirmPopup(true);
  }

  function ConfirmFormSubmit() {
    // to post details
    setEnableSubmit(true);

    PostPaymentDetails(formData).then((data) => {
      console.log(data, "proforma Invoice api data");

      const { statuscode } = data;

      if (data.code != 200) {
        alert("something went wrong");
        return false;
      }

      setEnableSubmit(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowConfirmPopup(false);
      }, 3000);

      setFormData((prev) => ({
        ...prev,
        jobDetails: jobDetails,
        employerID: "",
        paymentID: "",
        paymentMethod: "",
        chequeDate: new Date(),
        chequeNo: "",
        amount: "",
      }));

      setFields([
        {
          id: idCounter.current++,
          jobRole: { val: "", err: false },
          industry: { val: "", err: false },
          openings: { val: "", err: false },
          lookingFor: { val: "", err: false },
          amount: { val: 0, err: false },
        },
      ]);

      setErrors({
        employerID: "",
        paymentID: "",
        paymentMethod: "",
        chequeDate: "",
        chequeNo: "",
        amount: "",
      });
      // noError = 0;

      // alert("Submmitted succeesfully");
    });
  }

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

  const handleJobDetailsFieldChange = (id, fieldKey, value) => {
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

  function handleLookingForChange(key, value) {
    // to filter out which index should be updated
    let fieldToUpdate = fields.filter((el) => el.id == key);

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

  const handlePaymentMethodChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      chequeNo: "",
      amount: "",
      chequeDate: null,
      paymentID: "",
    }));
    setErrors((prevErrors) => ({ ...prevErrors, paymentMethod: "" }));
    console.log(name, value);
  };

  const handleAmountChange = (event) => {
    const newValue = event.target.value;
    handleFieldChange("amount", newValue);

    if (!isNaN(newValue) && newValue != "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount: "",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount: "Invalid amount",
      }));
    }
  };

  const handleChequeNoChange = (event) => {
    const newValue = event.target.value;
    handleFieldChange("chequeNo", newValue);
    if (!isNaN(newValue) && newValue != "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        chequeNo: "",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        chequeNo: "Invalid cheque no",
      }));
    }
  };

  const handleDateChange = (e, value) => {
    const newValue = value;
    handleFieldChange("chequeDate", e.$d);
    if (e.$d != null) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        chequeDate: "",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        chequeDate: "Please enter valid date",
      }));
    }
  };

  const handleEmpIdChange = (event) => {
    const newValue = event.target.value;
    handleFieldChange("employerID", newValue);
    if (!isNaN(newValue)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        employerID: "",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        employerID: "Invalid employer id",
      }));
    }
  };

  const handlePaymentIdChange = (event) => {
    const newValue = event.target.value;
    handleFieldChange("paymentID", newValue);
    if (newValue != "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        paymentID: "",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        paymentID: "Invalid employer id",
      }));
    }
  };

  useEffect(() => {
    // to create a job details array
    let jobdetailsArray = fields.map((el) => {
      let jobdetailsObj = {
        jobCategory: el.jobRole.val,
        industry: el.industry.val,
        noOfOpenings: el.openings.val,
        isExperienced: el.lookingFor.val === "Experienced",
      };
      return jobdetailsObj;
    });
    setJobDetails(jobdetailsArray);
  }, [fields]);

  // ...

  const handleFormSubmit = (event) => {
    event.preventDefault();

    let noError = 0;

    if (formData.employerID == "" || isNaN(formData.employerID)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        employerID: "Employer ID  is required *",
      }));
      noError++;
    }

    if (
      formData.paymentMethod == "cheque" ||
      formData.paymentMethod == "cash"
    ) {
      if (formData.paymentMethod == "cheque") {
        if (formData.chequeNo == "" || isNaN(formData.chequeNo)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            chequeNo: "Please enter valid cheque no",
          }));
          noError++;
        }

        if (formData.chequeDate == "" || formData.chequeDate == null) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            chequeDate: "Please enter valid Cheque date",
          }));
          noError++;
        }
      }

      if (formData.amount == "" || isNaN(formData.amount)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          amount: "Please enter valid amount",
        }));
        noError++;
      }
    }

    if (formData.paymentMethod == "payment") {
      if (formData.paymentID == "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          paymentID: "Please enter valid payment id",
        }));
        noError++;
      }
    }

    if (formData.paymentMethod == "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        paymentMethod: "Please enter payment payment method",
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
      <div className="ps-4">
        <div className={`${style.invoice_form_wrp}`}>
          <>
            <form onSubmit={handleFormSubmit}>
              <div>
                <div className="row">
                  <div className="col-sm-6">
                    <TextField
                      label="Employer ID"
                      variant="outlined"
                      value={formData.employerID}
                      onChange={handleEmpIdChange}
                      fullWidth
                      margin="normal"
                      error={Boolean(errors.employerID)}
                      helperText={errors.employerID}
                      inputProps={{ maxLength: 7 }}
                    />
                  </div>

                  <div className="col-sm-6">
                    <Autocomplete
                      value={formData.paymentMethod}
                      style={{ margin: "10px 0" }}
                      onChange={(e, newValue) =>
                        handlePaymentMethodChange("paymentMethod", newValue)
                      }
                      clearIcon={null}
                      options={["payment", "cheque", "cash"]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Payment Method"
                          variant="outlined"
                          error={Boolean(errors.paymentMethod)}
                          helperText={errors.paymentMethod}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="row">
                  {formData.paymentMethod == "cheque" && (
                    <>
                      <div className="col-sm-6">
                        <TextField
                          required
                          id="outlined-required"
                          label="Cheque No"
                          name="ChequeNo"
                          value={formData.chequeNo}
                          error={Boolean(errors.chequeNo)}
                          helperText={errors.chequeNo}
                          InputLabelProps={
                            {
                              // shrink: true,
                            }
                          }
                          sx={{ width: "100%" }}
                          fullWidth
                          onChange={(e) => {
                            handleChequeNoChange(e);
                          }}
                          inputProps={{
                            maxLength: 50,
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>

                {formData.paymentMethod == "cheque" ||
                formData.paymentMethod == "cash" ? (
                  <>
                    <div className="row mt-2">
                      {formData.paymentMethod == "cheque" && (
                        <>
                          <div className="col-sm-6">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="Cheque Date"
                                value={formData.chequeDate}
                                onChange={(e, val) => {
                                  handleDateChange(e, val);
                                }}
                                fullWidth
                                sx={{ width: "100%" }}
                                slotProps={{
                                  textField: {
                                    helperText: errors.chequeDate,
                                    error: Boolean(errors.chequeDate),
                                  },
                                }}
                              />
                            </LocalizationProvider>
                          </div>
                        </>
                      )}
                      <div className="col-sm-6">
                        <TextField
                          required
                          id="outlined-required"
                          label="Amount"
                          name="amount"
                          value={formData.amount}
                          // sx={{ width: "100%" }}
                          fullWidth
                          onChange={(e) => {
                            handleAmountChange(e);
                          }}
                          inputProps={{
                            maxLength: 7,
                          }}
                          error={Boolean(errors.amount)}
                          helperText={errors.amount}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}

                <div className="row">
                  {formData.paymentMethod == "payment" && (
                    <>
                      <div className="col-sm-6">
                        <TextField
                          label="Payment ID"
                          variant="outlined"
                          value={formData.paymentID}
                          onChange={handlePaymentIdChange}
                          fullWidth
                          margin="normal"
                          error={Boolean(errors.paymentID)}
                          helperText={errors.paymentID}
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="">
                  {fields.map((field) => (
                    <div key={field.id}>
                      <div className="row">
                        <div className="col-sm-6">
                          <Autocomplete
                            value={field.industry.val}
                            style={{ margin: "10px 0" }}
                            onChange={(e, newValue) => {
                              handleJobDetailsFieldChange(
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
                        </div>
                        <div className="col-sm-6">
                          <Autocomplete
                            value={field.jobRole.val}
                            style={{ margin: "10px 0" }}
                            onChange={(e, newValue) =>
                              handleJobDetailsFieldChange(
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
                      </div>

                      <div className="row">
                        <div className="col-sm-6">
                          <Autocomplete
                            value={field.openings.val}
                            style={{ margin: "10px 0" }}
                            onChange={(e, newValue) => {
                              handleJobDetailsFieldChange(
                                field.id,
                                "openings",
                                newValue
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
                          <Autocomplete
                            value={field.lookingFor.val}
                            onChange={(event, newValue) => {
                              handleJobDetailsFieldChange(
                                field.id,
                                "lookingFor",
                                newValue
                              );
                              handleLookingForChange(field.id, newValue);
                            }}
                            clearIcon={null}
                            style={{ margin: "10px 0" }}
                            options={["Fresher", "Experienced"]}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Looking For"
                                variant="outlined"
                                error={field.lookingFor.err}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-6"></div>
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
                    <div className="row">
                      <div className="col-sm-6"></div>
                      <div className="col-sm-6"></div>
                    </div>
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
            </form>
          </>
          {showSuccess && (
            <MyModal>
              <ModalContainer
                childComponent={
                  <SuccessTick HeadText="Payment Updated Successfully" />
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
                      "Are you sure you want to submit the Payment Update form?"
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

export default EmployerPayment;
