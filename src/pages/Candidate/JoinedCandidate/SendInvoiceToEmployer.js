/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MyModal, numbersOnlyTest } from "../../../utility";
import ModalContainer from "../../../components/modal_popup";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { PostInvoiceSendJoinedCandidate } from "../../../apiServices";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import companylogo from "../../../assets/images/uploadfile.png";
import invoiceimage from "../../../assets/images/invoice.png";
import SuccessTick from "../../../components/success_tick";
function SendInvoiceToEmployer({ close }) {
  const [invoiceData, setInvoiceData] = useState({
    empId: { val: "", err: "" },
    contactPersonName: { val: "", err: "" },
    invoiceNumber: { val: "", err: "" },
    invoiceDate: { val: null, err: "" },
    invoiceAmount: { val: "", err: "" },
    dueDate: { val: null, err: "" },
    emailId: { val: "", err: "" },
    invoiceAttachment: { val: null, err: "" },
  });
  const [showSuccess, setshowSuccess] = useState(false);
  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     setInvoiceData({
  //       ...invoiceData,
  //       invoiceAttachment: {
  //         val: {
  //           name: file,
  //           dataURL: URL.createObjectURL(file),
  //         },
  //         err: "",
  //       },
  //     });
  //   } else {
  //     setInvoiceData({
  //       ...invoiceData,
  //       invoiceAttachment: {
  //         val: null,
  //         err: "Please select a file.",
  //       },
  //     });
  //   }
  // };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setInvoiceData((prev) => ({
      ...prev,
      invoiceAttachment: { val: selectedFile, err: "" },
    }));
  };
  const resetFileInput = () => {
    // Reset the file input by setting its value to an empty string
    document.getElementById("fileInput").value = "";
    setInvoiceData({
      ...invoiceData,
      invoiceAttachment: {
        val: null,
        err: "",
      },
    });
  };

  // const handleInputChange = (field, value) => {
  //   setInvoiceData((prevData) => ({
  //     ...prevData,
  //     [field]: { val: value, err: validateField(field, value) },
  //   }));
  // };
  const handleInputChange = (field, value) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      [field]: { val: value, err: validateField(field, value) },
    }));
  };
  const validateField = (field, value) => {
    if (value === "" || value === null) {
      return `Please fill out the field`;
    }

    if (field === "empId") {
      const isValidEmpId = numbersOnlyTest(value);
      if (!isValidEmpId) {
        return "Please enter a valid 6-digit integer for Employer Id.";
      }
    }

    if (field === "invoiceAmount") {
      const amount = parseFloat(value);

      if (isNaN(amount) || amount <= 0) {
        return "Please enter a valid invoice amount.";
      }
    }

    return ""; // No validation error
  };
  const validateForm = () => {
    let hasErrors = false;

    Object.keys(invoiceData).forEach((field) => {
      const value = invoiceData[field].val;
      const error = validateField(field, value);

      if (error) {
        hasErrors = true;
        setInvoiceData((prevData) => ({
          ...prevData,
          [field]: { ...prevData[field], err: error },
        }));
      } else {
        // Reset error message to empty string if value is empty or null
        setInvoiceData((prevData) => ({
          ...prevData,
          [field]: { ...prevData[field], err: "" },
        }));
      }
    });

    return !hasErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      PostInvoiceSendJoinedCandidate(invoiceData).then((data) => {
        if (data.code == 400) return;
        setshowSuccess(true);
        console.log(data, "data");
        setTimeout(() => {
          setshowSuccess(false);
        }, 2000);
        setInvoiceData({
          empId: { val: "", err: "" },
          contactPersonName: { val: "", err: "" },
          invoiceNumber: { val: "", err: "" },
          invoiceDate: { val: null, err: "" },
          invoiceAmount: { val: "", err: "" },
          dueDate: { val: null, err: "" },
          emailId: { val: "", err: "" },
          invoiceAttachment: { val: null, err: "" },
        });
      });
    } else {
      // Form has validation errors
      console.log("Form validation failed. Please check the fields.");
    }
  };
  return (
    <div>
      <MyModal>
        <ModalContainer
          childComponent={
            <>
              <div className="d-flex justify-content-between">
                <div>
                  <h5>Invoice Attachment</h5>
                </div>
                <div>
                  {" "}
                  <button className="btn btn-danger" onClick={() => close()}>
                    <IoClose />
                  </button>
                </div>
              </div>
              <div style={{ width: "600px" }}>
                <form onSubmit={handleSubmit}>
                  <div className="">
                    <div className="row d-flex align-items-center justify-content-center">
                      <div className="col-sm-3 mt-2">
                        <FormControl
                          isInvalid={Boolean(invoiceData.invoiceAttachment.err)}
                        >
                          <label htmlFor="fileInput">
                            {invoiceData.invoiceAttachment.val ? (
                              <img
                                src={invoiceimage}
                                alt="Invoice Attachment"
                                className=""
                                style={{
                                  cursor: "pointer",
                                  width: "100px", // Adjust the width as needed
                                  height: "100px", // Adjust the height as needed
                                }}
                                onClick={resetFileInput}
                              />
                            ) : (
                              <>
                                <img
                                  className=""
                                  src={companylogo}
                                  alt="Upload Icon"
                                  style={{
                                    cursor: "pointer",
                                    width: "100px", // Adjust the width as needed
                                    height: "100px", // Adjust the height as needed
                                  }}
                                />
                                {/* Upload file */}
                              </>
                            )}
                          </label>
                          <input
                            id="fileInput"
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            accept="application/pdf, image/*"
                          />
                          <FormHelperText style={{ color: "#d44349" }}>
                            {invoiceData.invoiceAttachment.err}
                          </FormHelperText>
                        </FormControl>
                        {invoiceData.invoiceAttachment.val && (
                          <p>{invoiceData.invoiceAttachment.val.name}</p>
                        )}
                      </div>
                      <div className="col-sm-9 mt-2">
                        <TextField
                          id="outlined-basic"
                          fullWidth
                          label="Employer Id"
                          variant="outlined"
                          value={invoiceData.empId.val}
                          inputProps={{
                            maxLength: 6,
                          }}
                          onChange={(e) =>
                            handleInputChange("empId", e.target.value)
                          }
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                          }}
                          error={Boolean(invoiceData.empId.err)}
                          helperText={invoiceData.empId.err}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12 mt-2">
                      <TextField
                        id="outlined-basic"
                        fullWidth
                        label="Contact Person Name"
                        variant="outlined"
                        value={invoiceData.contactPersonName.val}
                        onChange={(e) =>
                          handleInputChange("contactPersonName", e.target.value)
                        }
                        error={Boolean(invoiceData.contactPersonName.err)}
                        helperText={invoiceData.contactPersonName.err}
                      />
                    </div>
                    <div className="col-sm-12 mt-2">
                      <TextField
                        id="outlined-basic"
                        fullWidth
                        label="EmailID"
                        variant="outlined"
                        value={invoiceData.emailId.val}
                        onChange={(e) =>
                          handleInputChange("emailId", e.target.value)
                        }
                        error={Boolean(invoiceData.emailId.err)}
                        helperText={invoiceData.emailId.err}
                      />
                    </div>
                    <div className="row mt-2 ">
                      <div className="col-sm-6 mt-2">
                        {" "}
                        <TextField
                          id="outlined-basic"
                          fullWidth
                          label="Invoice Number"
                          variant="outlined"
                          value={invoiceData.invoiceNumber.val}
                          onChange={(e) =>
                            handleInputChange("invoiceNumber", e.target.value)
                          }
                          error={Boolean(invoiceData.invoiceNumber.err)}
                          helperText={invoiceData.invoiceNumber.err}
                        />
                      </div>{" "}
                      <div className="col-sm-6 mt-2 me-0">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <FormControl
                            fullWidth
                            error={Boolean(invoiceData.invoiceDate.err)}
                          >
                            <DatePicker
                              autoFocus
                              label="Invoice Date"
                              value={
                                invoiceData.invoiceDate.val
                                  ? new Date(invoiceData.invoiceDate.val)
                                  : null
                              }
                              onChange={(date) =>
                                handleInputChange("invoiceDate", date)
                              }
                            />
                            <FormHelperText>
                              {invoiceData.invoiceDate.err}
                            </FormHelperText>
                          </FormControl>
                        </LocalizationProvider>
                      </div>
                    </div>{" "}
                    <div className="row mt-2">
                      <div className="col-sm-6">
                        <TextField
                          id="outlined-basic"
                          fullWidth
                          type="number"
                          label="Invoice Amount."
                          variant="outlined"
                          value={invoiceData.invoiceAmount.val}
                          onChange={(e) =>
                            handleInputChange("invoiceAmount", e.target.value)
                          }
                          error={Boolean(invoiceData.invoiceAmount.err)}
                          helperText={invoiceData.invoiceAmount.err}
                        />
                      </div>
                      <div className="col-sm-6">
                        {" "}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <FormControl
                            fullWidth
                            error={Boolean(invoiceData.dueDate.err)}
                          >
                            <DatePicker
                              label="Due Date"
                              value={
                                invoiceData.dueDate.val
                                  ? new Date(invoiceData.dueDate.val)
                                  : null
                              }
                              onChange={(date) =>
                                handleInputChange("dueDate", date)
                              }
                            />
                            <FormHelperText>
                              {invoiceData.dueDate.err}
                            </FormHelperText>
                          </FormControl>
                        </LocalizationProvider>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-3">
                    <button type="submit" className="btn btn-success">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </>
          }
        />
        {showSuccess && (
          <MyModal>
            <ModalContainer
              zIndex={5000}
              childComponent={
                <SuccessTick HeadText="Invoice sent Successfully " />
              }
            />
          </MyModal>
        )}
      </MyModal>
    </div>
  );
}

export default SendInvoiceToEmployer;
