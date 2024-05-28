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

export default function EmployerEmailSendSLA({
  onSuccess,
  Id,
  type,
  onClose,
  toEmail,
}) {
  const adminDetails = useSelector((state) => state.adminDetails);
  // console.log(adminDetails);

  const adminId = localStorage.getItem("adminID");
  let isSuperAdmin = adminDetails.roleID == 1;

  const [formData, setFormData] = useState({
    type: type,
    empId: Id,
    empLeadId: null,
    fromAdminId: { val: adminId == 1 ? "" : adminId, err: false },
    RecruitmentFeePercentage: "",
    ReplacementPolicy: "",
    PaymentTerms: "",
    PaymentType: "",
    ccEmailId: [{}],
    toEmail: toEmail,
  });

  const [showForm, setShowForm] = useState(true);

  const [responseDetails, setResponseDetails] = useState({
    isLoading: false,
    completed: false,
    failed: false,
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
      empId: Id,
      empLeadId: null,
      fromAdminId: { val: adminId == 1 ? "" : adminId, err: false },
      RecruitmentFeePercentage: "",
      ReplacementPolicy: "",
      PaymentTerms: "",
      ccEmailId: {},
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data:", formData);

    // const updatedFormData = ;
    setResponseDetails((prev) => {
      return { ...prev, isLoading: true };
    });
    const ccEmailArray = formData.ccEmailId
      .split(",")
      .map((email) => email.trim());
    PostSlaMail({ ...formData, ccEmailArray })
      .then(() => {
        setTimeout(() => {
          setResponseDetails((prev) => {
            return { ...prev, isLoading: false, completed: true };
          });
        }, 1000);
        setTimeout(() => {
          onClose();
          setResponseDetails((prev) => {
            return { ...prev, completed: false };
          });
          setShowForm(false);
          onSuccess();
          setFormData({
            type: type,
            empId: Id,
            empLeadId: null,
            fromAdminId: { val: adminId == 1 ? "" : adminId, err: false },
            RecruitmentFeePercentage: "",
            ReplacementPolicy: "",
            PaymentTerms: "",
            PaymentType: "",
            ccEmailId: [{}],
          });
        }, 3000);

        // Handle success logic here
      })
      .catch((err) => {
        alert("something went wrong:" + err);
      });

    // You can send the form data to your server or perform any other actions
  };

  return (
    <>
      <div>
        <MyModal>
          <ModalContainer
            zIndex={10006}
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
                            MenuProps={{
                              style: { zIndex: 10008 },
                            }}
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
                  <FormControl
                    fullWidth
                    style={{ marginTop: "25px", zIndex: "10001" }}
                  >
                    <TextField
                      type="email"
                      name="toEmail"
                      id="outlined-textarea"
                      label="To Email"
                      value={formData.toEmail}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          toEmail: e.target.value,
                        }));
                      }}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormControl fullWidth style={{ marginTop: "16px" }}>
                    <InputLabel>Replacement policy Months</InputLabel>
                    <Select
                      name="ReplacementPolicy"
                      value={formData.ReplacementPolicy}
                      onChange={handleInputChange}
                      label="Replacement policy Months"
                      required
                      autoComplete="off"
                      MenuProps={{
                        style: { zIndex: 10008 },
                      }}
                    >
                      <MenuItem value="1 Month">1 Month</MenuItem>
                      <MenuItem value="2 Months">2 Months</MenuItem>
                      <MenuItem value="3 Months">3 Months</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth style={{ marginTop: "16px" }}>
                    <InputLabel>Payment Terms Days</InputLabel>
                    <Select
                      name="PaymentTerms"
                      value={formData.PaymentTerms}
                      onChange={handleInputChange}
                      label="Payment Terms Days"
                      required
                      autoComplete="off"
                      MenuProps={{
                        style: { zIndex: 10008 },
                      }}
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
                      name="PaymentType"
                      value={formData.PaymentType}
                      onChange={(e) => {
                        handleInputChange(e, "PaymentType");
                      }}
                      label="Payment Terms Days"
                      required
                      autoComplete="off"
                      MenuProps={{
                        style: { zIndex: 10008 },
                      }}
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
                  <FormControl
                    fullWidth
                    style={{ marginTop: "25px", zIndex: "10001" }}
                  >
                    <TextField
                      type=""
                      name="ccEmailId"
                      id="outlined-textarea"
                      label="CC Mail"
                      // value={formData.ccEmailId}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          ccEmailId: e.target.value,
                        }));
                      }}
                      autoComplete="off"
                      placeholder="CC Mail"
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
                        <Button
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
                              className="text-white"
                              size={24}
                              sx={{
                                color: "white",
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                marginTop: "-12px",
                                marginLeft: "-12px",
                              }}
                            />
                          )}
                        </Button>
                      </div>
                    </Box>
                  </Box>
                </form>
              </>
            }
          />
        </MyModal>

        {/* {responseDetails.completed && (
          <MyModal>
            <ModalContainer
              childComponent={<SuccessTick HeadText="Successfully" />}
            />
          </MyModal>
        )} */}
      </div>
    </>
  );
}
