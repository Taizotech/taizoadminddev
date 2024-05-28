import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { MyModal } from "../../../utility";
import ModalContainer from "../../../components/modal_popup";
import { PostAddFieldLead, getAddFieldLead } from "../../../apiServices";
import SuccessTick from "../../../components/success_tick";
import CompanyLogo from "../../../../src/assets/images/Company-Logo.png";
import canLeadStyle from "../../Candidate/CandidateLeadTable/candidateLead.module.scss";

const YourComponent = ({
  fileInputRef,
  handleFileChange,
  selectedFileName,
  imageUrl,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "300px", // Set the default width as per your requirement
    }}
  >
    <div
      style={{ position: "relative", overflow: "hidden", maxWidth: "400px" }}
    >
      <div style={{ marginLeft: "38px" }}>
        {" "}
        {/* Adjust the margin as needed */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{
              width: "75px",
              height: "75px", // Set to the desired height
            }}
          />
        ) : (
          <img
            src={CompanyLogo} // Replace with your dummy image URL
            alt="pic"
            style={{
              width: "75px",
              height: "75px", // Set to the desired height
            }}
          />
        )}
      </div>
      <div>
        <input
          type="file"
          ref={fileInputRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
          }}
          onChange={handleFileChange}
        />
        <button
          className="mx-4"
          style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Choose File
        </button>
      </div>
    </div>
  </div>
);

const EmployerFieldLeadForm = ({ onSuccess }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoader, setShowLoader] = useState(false); // New state for loader
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    area: "",
    city: "",
    mobileNumber: "",
    alternativeMobileNumber: "",
    whatsappNumber: "",
    photo: null,
    email: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    // Track the current company name separately
    const currentCompanyName = companyInfo.companyName;
    console.log("Current Company Name:", currentCompanyName);

    // Fetch data based on the current company name
    getAddFieldLead(currentCompanyName)
      .then((res) => {
        console.log(res, "completed");

        // Always update the state based on the API response
        setCompanyInfo((prevCompanyInfo) => ({
          ...prevCompanyInfo,
          area: res.results?.area || "",
          city: res.results?.city || "",
          mobileNumber: res.results?.mobileNumber || "",
          alternativeMobileNumber: res.results?.alternateMobileNumber || "",
          whatsappNumber: res.results?.whatsappNumber || "",
          email: res.results?.emailId || "",
          photo: res.results?.leadImageLink || "",
        }));
      })
      .catch((error) => {
        console.log("Error retrieving company details:", error);
        // Clear fields if there's an error (company not present)
        setCompanyInfo({
          area: "",
          city: "",
          mobileNumber: "",
          alternativeMobileNumber: "",
          whatsappNumber: "",
          email: "",
          // photo: "", // Uncomment this line if you also want to clear the 'photo' field
        });
      });
  }, [companyInfo.companyName]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate input for 'area' and 'city' to allow only alphabetic characters
    if ((name === "area" || name === "city") && !/^[a-zA-Z\s]*$/.test(value)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Only alphabetic characters and spaces are allowed",
      }));
    } else if (name === "city" && /\d/.test(value)) {
      // Validate for 'city' to disallow numbers
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "City cannot contain numbers",
      }));
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value.trim() === "" ? `${name} is required` : "",
      }));
      setCompanyInfo((prevCompanyInfo) => ({
        ...prevCompanyInfo,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCompanyInfo({ ...companyInfo, photo: file });
    setSelectedFileName(file.name);

    // Create a URL for the uploaded file
    const fileUrl = URL.createObjectURL(file);
    setImageUrl(fileUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!companyInfo.companyName) {
      errors.companyName = "Company Name is required";
    }
    if (!companyInfo.area) {
      errors.area = "Area is required";
    }
    if (!companyInfo.city) {
      errors.city = "City is required";
    }
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    setShowLoader(true);
    try {
      const response = await PostAddFieldLead(companyInfo);
      console.log(response);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setCompanyInfo({
          companyName: "",
          area: "",
          city: "",
          mobileNumber: "",
          alternativeMobileNumber: "",
          whatsappNumber: "",
          photo: null,
          email: "",
        });
        setSelectedFileName("");
        setImageUrl("");

        setShowForm(false);
        onSuccess();
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      // Hide loader after API request completes
      setShowLoader(false);
    }
    console.log(companyInfo);
  };

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setShowForm(true);
          }}
          className={`${canLeadStyle.NewLead} me-2`}
        >
          + Add New Field Lead
        </button>
      </div>

      {showForm && (
        <MyModal>
          <ModalContainer
            childComponent={
              <>
                <div>
                  <div>
                    <div className="row mb-3 px-3">
                      <div className="col-1"></div>
                      <div className="col-8 text-center">
                        <h3 className=""> Add Field Lead</h3>
                      </div>
                      <div
                        className="col-3"
                        onClick={() => {
                          setShowForm(false);
                        }}
                      >
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            setShowForm(false);
                          }}
                          size="small"
                          disableRipple
                        >
                          <CloseIcon />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      maxHeight: "500px",
                      overflowY: "auto",
                    }}
                  >
                    <form onSubmit={handleSubmit}>
                      <YourComponent
                        fileInputRef={fileInputRef}
                        handleFileChange={handleFileChange}
                        selectedFileName={selectedFileName}
                        imageUrl={imageUrl}
                      />
                      <br />
                      <TextField
                        label="Company Name"
                        variant="outlined"
                        name="companyName"
                        value={companyInfo.companyName}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        fullWidth
                        margin="normal"
                        error={!!validationErrors.companyName}
                        helperText={validationErrors.companyName}
                      />
                      <br />
                      <TextField
                        label="Area"
                        variant="outlined"
                        name="area"
                        value={companyInfo.area}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!validationErrors.area}
                        helperText={validationErrors.area}
                      />
                      <br />
                      <TextField
                        label="City"
                        variant="outlined"
                        name="city"
                        value={companyInfo.city}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!validationErrors.city}
                        helperText={validationErrors.city}
                      />
                      <br />
                      <TextField
                        label="Mobile Number"
                        variant="outlined"
                        type="tel"
                        name="mobileNumber"
                        value={companyInfo.mobileNumber}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /\D/g,
                            ""
                          );
                          setCompanyInfo({
                            ...companyInfo,
                            mobileNumber: numericValue,
                          });
                        }}
                        fullWidth
                        margin="normal"
                        inputProps={{
                          pattern: "[0-9]{10}",
                          maxLength: 10,
                        }}
                      />
                      <br />
                      <TextField
                        label="Alternative Mobile Number"
                        variant="outlined"
                        type="tel"
                        name="alternativeMobileNumber"
                        value={companyInfo.alternativeMobileNumber}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /\D/g,
                            ""
                          );
                          setCompanyInfo({
                            ...companyInfo,
                            alternativeMobileNumber: numericValue,
                          });
                        }}
                        fullWidth
                        margin="normal"
                        inputProps={{
                          pattern: "[0-9]{10}",
                          maxLength: 10,
                        }}
                      />
                      <br />
                      <TextField
                        label="WhatsApp Number"
                        variant="outlined"
                        type="tel"
                        name="whatsappNumber"
                        value={companyInfo.whatsappNumber}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /\D/g,
                            ""
                          );
                          setCompanyInfo({
                            ...companyInfo,
                            whatsappNumber: numericValue,
                          });
                        }}
                        fullWidth
                        margin="normal"
                        inputProps={{
                          pattern: "[0-9]{10}",
                          maxLength: 10,
                        }}
                      />
                      <br />
                      <TextField
                        label="Email ID"
                        variant="outlined"
                        type="email"
                        name="email"
                        value={companyInfo.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                      />
                      <br />
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </div>
                    </form>
                    {showSuccess && (
                      <MyModal>
                        <ModalContainer
                          childComponent={
                            <SuccessTick HeadText="Successfully" />
                          }
                        />
                      </MyModal>
                    )}
                    <Backdrop
                      sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                      }}
                      open={showLoader}
                      onClick={() => {}} // Prevent closing on backdrop click
                    >
                      <CircularProgress color="inherit" />
                    </Backdrop>
                  </div>
                </div>
              </>
            }
          />
        </MyModal>
      )}
    </div>
  );
};

export default EmployerFieldLeadForm;
