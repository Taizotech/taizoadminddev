/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { PostSlaMail } from "../../../apiServices";
import ModalContainer from "../../../components/modal_popup";
import { MyModal } from "../../../utility";
import { CircularProgress } from "@mui/material";
import { green } from "@mui/material/colors";
import { useSelector } from "react-redux";
import SLADocument from "../../../SlaFile/SLADocument";
import { AiOutlineClose } from "react-icons/ai";

export default function EmployerSendSLA({
  onSuccess,
  Id,
  type,
  onClose,
  toEmail,
  companyName,
}) {
  const adminDetails = useSelector((state) => state.adminDetails);
  // console.log(adminDetails);

  const adminId = localStorage.getItem("adminID");
  let isSuperAdmin = adminDetails.roleID == 1;

  const [formData, setFormData] = useState({
    type: type,
    empId: null,
    empLeadId: Id,
    fromAdminId: { val: adminId == 1 ? "" : adminId, err: false },
    RecruitmentFeePercentage: "",
    ReplacementPolicy: "",
    PaymentTerms: "",
    PaymentType: "",
    ccEmailId: {},
    toEmail: toEmail,
    companyName: companyName,
  });

  const [showForm, setShowForm] = useState(true);
  const [adminSignaturenot, setadminSignaturenot] = useState(false);
  const [displaySlaComponent, setDisplaySlaComponent] = useState(false);

  const [responseDetails, setResponseDetails] = useState({
    isLoading: false,
    completed: false,
    failed: false,
  });

  function handleFromAdminChange(e) {
    let { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      fromAdminId: { val: value, err: false },
    }));
  }
  const buttonSx = {
    ...(responseDetails.completed && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  function handleClose(e) {
    e.preventDefault();
    console.log("hiii");
    onClose();
    setResponseDetails((prev) => {
      return { ...prev, completed: false };
    });
    setFormData({
      type: type,
      empId: null,
      empLeadId: Id,
      fromAdminId: { val: adminId == 1 ? "" : adminId, err: false },
      RecruitmentFeePercentage: "",
      ReplacementPolicy: "",
      PaymentTerms: "",
    });
  }

  const handleInputChange = (event, type) => {
    const { name, value } = event.target;
    if (type == "RecruitmentFeePercentage") {
      const regex = /^[0-9]*\.?[0-9]*$/;
      if (regex.test(value)) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handCloseSLA = () => {
    setDisplaySlaComponent(false);
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form Data:", formData);
  //   const ccEmailArray = formData.ccEmailId
  //     .split(",")
  //     .map((email) => email.trim());

  //   // const updatedFormData = { ...formData, ccEmailArray };
  //   setResponseDetails((prev) => {
  //     return { ...prev, isLoading: true };
  //   });
  //   PostSlaMail({ ...formData, ccEmailArray })
  //     .then((data) => {
  //       if (data.statusCode === 400) {
  //         setadminSignaturenot(true);
  //         return;
  //       }
  //       setTimeout(() => {
  //         setResponseDetails((prev) => {
  //           return { ...prev, isLoading: false, completed: true };
  //         });
  //       }, 1000);
  //       setTimeout(() => {
  //         onClose();
  //         setResponseDetails((prev) => {
  //           return { ...prev, completed: false };
  //         });
  //         setShowForm(false);
  //         onSuccess();
  //         setFormData({
  //           type: type,
  //           empId: null,
  //           empLeadId: Id,
  //           fromAdminId: { val: adminId == 1 ? "" : adminId, err: false },
  //           RecruitmentFeePercentage: "",
  //           ReplacementPolicy: "",
  //           PaymentTerms: "",
  //           PaymentType: "",
  //         });
  //       }, 3000);

  //       // Handle success logic here
  //     })
  //     .catch((err) => {
  //       alert("something went wrong:" + err);
  //     });

  //   // You can send the form data to your server or perform any other actions
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplaySlaComponent(true);
    // const ccEmailArray = formData.ccEmailId
    //   .split(",")
    //   .map((email) => email.trim());
    //   setFormData({
    //     ...formData,
    //     ccEmailId: ccEmailArray
    //   });
    console.log("Form Data:", formData);
  };

  const hanldecloseSLA = (e) => {
    setDisplaySlaComponent(false);
    onSuccess();
  };

  return (
    <>
      <div>
        <MyModal>
          <ModalContainer
            zIndex={2000}
            childComponent={
              <>
                <h5 className="text-center"> Send SLA Mail </h5>
                <form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  {isSuperAdmin && (
                    <>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            SLA Mail From
                          </InputLabel>
                          <Select
                            MenuProps={{
                              style: {
                                zIndex: 2000,
                              },
                            }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="fromAdminId"
                            value={formData.fromAdminId.val}
                            label="SLA Mail From"
                            onChange={(e) => {
                              handleFromAdminChange(e);
                            }}
                            required
                            autoComplete="off"
                          >
                            <MenuItem value={2}>Sowmiya</MenuItem>
                            <MenuItem value={4}>Anees</MenuItem>
                            <MenuItem value={7}>Saravanan</MenuItem>
                            <MenuItem value={13}>Nirmala</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </>
                  )}
                  <FormControl fullWidth style={{ marginTop: "16px" }}>
                    {" "}
                    <TextField
                      id="employerToEmail"
                      label="To Email"
                      variant="outlined"
                      value={formData.toEmail}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          toEmail: e.target.value,
                        }))
                      }
                      fullWidth
                      // required
                      type="email"
                      margin="normal"
                    />
                  </FormControl>
                  <FormControl fullWidth style={{ marginTop: "16px" }}>
                    <InputLabel>Replacement policy Months</InputLabel>
                    <Select
                      MenuProps={{
                        style: {
                          zIndex: 2000,
                        },
                      }}
                      name="ReplacementPolicy"
                      value={formData.ReplacementPolicy}
                      onChange={handleInputChange}
                      label="Replacement policy Months"
                      required
                      autoComplete="off"
                    >
                      <MenuItem value="1 Month">1 Month</MenuItem>
                      <MenuItem value="2 Months">2 Months</MenuItem>
                      <MenuItem value="3 Months">3 Months</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth style={{ marginTop: "16px" }}>
                    <InputLabel>Payment Terms Days</InputLabel>
                    <Select
                      MenuProps={{
                        style: {
                          zIndex: 2000,
                        },
                      }}
                      name="PaymentTerms"
                      value={formData.PaymentTerms}
                      onChange={handleInputChange}
                      label="Payment Terms Days"
                      required
                      autoComplete="off"
                    >
                      <MenuItem value="15 Days">15 Days</MenuItem>
                      <MenuItem value="30 Days">30 Days</MenuItem>
                      <MenuItem value="45 Days">45 Days</MenuItem>
                      <MenuItem value="60 Days">60 Days</MenuItem>
                      <MenuItem value="90 Days">90 Days</MenuItem>

                      {/* Add more event types as needed */}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth style={{ marginTop: "16px" }}>
                    <InputLabel> Payment Type </InputLabel>
                    <Select
                      MenuProps={{
                        style: {
                          zIndex: 2000,
                        },
                      }}
                      name="PaymentType"
                      value={formData.PaymentType}
                      onChange={(e) => {
                        handleInputChange(e, "PaymentType");
                      }}
                      label="Payment Terms Days"
                      required
                      autoComplete="off"
                    >
                      <MenuItem value="CTC">CTC</MenuItem>
                      <MenuItem value="Gross Salary">Gross Salary</MenuItem>
                      <MenuItem value="Gross Wages">Gross Wages</MenuItem>

                      {/* Add more event types as needed */}
                    </Select>
                  </FormControl>

                  <FormControl
                    fullWidth
                    style={{ marginTop: "25px", zIndex: "10001" }}
                  >
                    <TextField
                      name="RecruitmentFeePercentage"
                      id="outlined-textarea"
                      label="Recruitment fee %"
                      value={formData.RecruitmentFeePercentage}
                      onChange={(e) => {
                        handleInputChange(e, "RecruitmentFeePercentage");
                      }}
                      autoComplete="off"
                      placeholder="Percentage"
                      required
                      inputProps={{ maxLength: 5 }}

                      // helperText={formData.notes.length + "/250"}
                    />
                  </FormControl>
                  <FormControl fullWidth style={{ marginTop: "16px" }}>
                    {" "}
                    <TextField
                      id="employerEmail"
                      label="CC Mail"
                      variant="outlined"
                      // value={formData.ccEmailId}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          ccEmailId: e.target.value,
                        }))
                      }
                      fullWidth
                      // required
                      type=""
                      margin="normal"
                    />
                  </FormControl>

                  <Box mt={2}>
                    <Box sx={{ m: 1, position: "relative" }}>
                      <div className=" d-flex justify-content-end gap-2">
                        <Button
                          variant="outlined"
                          color="error"
                          // sx={buttonSx}
                          onClick={(e) => {
                            handleClose(e);
                          }}
                        >
                          Close
                        </Button>
                        {/* <Button
                          type="submit"
                          variant="contained"
                          sx={buttonSx}
                          disabled={
                            responseDetails.isLoading ||
                            responseDetails.completed
                          }
                        >
                          {responseDetails.completed && "Success"}
                          {responseDetails.failed && "Failed"}
                          {responseDetails.isLoading && "Loading"}
                          {!responseDetails.completed &&
                            !responseDetails.isLoading &&
                            "Submit"}
                          {responseDetails.isLoading && (
                            <CircularProgress
                              size={24}
                              sx={{
                                color: green[500],
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                marginTop: "-12px",
                                marginLeft: "-12px",
                              }}
                            />
                          )}
                        </Button> */}
                        <Button type="submit" variant="contained" sx={buttonSx}>
                          PREVIEW
                        </Button>
                      </div>
                    </Box>
                  </Box>
                </form>
              </>
            }
          />
        </MyModal>

        {adminSignaturenot && (
          <MyModal>
            <ModalContainer
              zIndex={5000}
              childComponent={
                <>
                  <div style={{ width: "300px" }}>
                    <div className="">This admin has no signature </div>
                    <div className="d-flex justify-content-end mt-2">
                      <div
                        className="btn btn-danger "
                        onClick={() => {
                          setadminSignaturenot(false);
                        }}
                      >
                        Ok
                      </div>
                    </div>
                  </div>
                </>
              }
            />
          </MyModal>
        )}
        {/* {responseDetails.completed && (
          <MyModal>
            <ModalContainer
              childComponent={<SuccessTick HeadText="Successfully" />}
            />
          </MyModal>
        )} */}
        {displaySlaComponent && (
          <MyModal>
            <ModalContainer
              zIndex={5000}
              childComponent={
                <>
                  <div className="d-flex justify-content-end mb-2">
                    {" "}
                    <div className="btn btn-danger" onClick={handCloseSLA}>
                      <AiOutlineClose />
                    </div>
                  </div>
                  <SLADocument
                    replacementmonth={formData.ReplacementPolicy}
                    empLeadId={formData.empLeadId}
                    toEmail={formData.toEmail}
                    paymentType={formData.PaymentType}
                    recruitmentFeePercentage={formData.RecruitmentFeePercentage}
                    paymentTerms={formData.PaymentTerms}
                    ccEmailArray={formData.ccEmailId}
                    fromAdminId={formData.fromAdminId.val}
                    companyName={formData.companyName}
                    oncloseSLA={hanldecloseSLA}
                  />
                </>
              }
            />
          </MyModal>
        )}
      </div>
    </>
  );
}
