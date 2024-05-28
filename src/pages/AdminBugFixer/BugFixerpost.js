import React, { useState, useRef } from "react";
import ProbelmSolver from "../../../src/assets/images/ProbelmSolver.jpg";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { PostBugFixer, UploadBugFixerImage } from "../../apiServices";
import { MyModal } from "../../utility";
import ModalContainer from "../../components/modal_popup";
import SuccessTick from "../../components/success_tick";

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
      //   width: "300px", // Set the default width as per your requirement
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
            src={ProbelmSolver} // Replace with your dummy image URL
            alt="pic"
            style={{
              width: "75px",
              height: "75px", // Set to the desired height
            }}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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

function BugFixerpost({ id, onclose }) {
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    photo: null,
    issueName: "",
    issueDescription: "",
    priority: "",
  });
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [successTick, setSuccessTick] = useState(false);
  const [errors, setErrors] = useState({
    issueName: "",
    issueDescription: "",
    priority: "",
  });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/png", "image/jpeg"]; // Allowed file types
    const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB in bytes

    if (file) {
      // Check file type
      if (allowedTypes.includes(file.type)) {
        // Check file size
        if (file.size <= maxSizeInBytes) {
          // Proceed with file upload
          setCompanyInfo({ ...companyInfo, photo: file });
          setSelectedFileName(file.name);

          const fileUrl = URL.createObjectURL(file);
          setImageUrl(fileUrl);

          try {
            const uploadResponse = await UploadBugFixerImage(file, id);
            console.log("Image upload response:", uploadResponse);
          } catch (error) {
            console.error("Error occurred while uploading the image:", error);
          }
        } else {
          alert("File size exceeds the allowed limit of 2MB.");
          e.target.value = null;
        }
      } else {
        alert("Please upload a .png or .jpg file.");
        e.target.value = null;
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo({ ...companyInfo, [name]: value });

    // Resetting errors when user types in the field
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (companyInfo.issueName.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        issueName: "Issue name is required",
      }));
      return;
    } else if (companyInfo.issueDescription.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        issueDescription: "Issue description is required",
      }));
      return;
    } else if (companyInfo.priority.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        priority: "Priority is required",
      }));
      return;
    }

    try {
      // API call
      setSuccessTick(true);
      const response = await PostBugFixer(
        companyInfo.issueDescription,
        companyInfo.issueName,
        companyInfo.priority
      );
      console.log("API response:", response);

      const id = response.data.id;
      if (companyInfo.photo !== null) {
        const uploadResponse = await UploadBugFixerImage(companyInfo.photo, id);
        console.log("Image upload response:", uploadResponse);
      }
      // Reset the form after successful submission
      setTimeout(() => {
        setSuccessTick(false);
        onclose();
      }, 1000);
      setCompanyInfo({
        companyName: "",
        photo: null,
        issueName: "",
        issueDescription: "",
        priority: "",
      });
      setSelectedFileName("");
      setImageUrl("");
      setErrors({
        issueName: "",
        issueDescription: "",
        priority: "",
      });
    } catch (error) {
      console.error("Error occurred while submitting the form:", error);
      //   alert(
      //     "An error occurred while submitting the form. Please try again later."
      //   );
    }
  };

  return (
    <div
    // style={{
    //   display: "flex",
    //   alignItems: "center",
    //   justifyContent: "center",
    //   height: "100vh",
    // }}
    >
      <div
      // style={{
      //   padding: "20px",
      //   border: "1px solid #ccc",
      //   borderRadius: "5px",
      //   //   marginTop: "-100px",
      //   textAlign: "left", // Align the form to the left
      // }}
      >
        {/* <Typography style={{ color: "black" }} variant="h5" gutterBottom>
          New features and issue solver
        </Typography> */}
        <form onSubmit={handleSubmit}>
          <YourComponent
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            selectedFileName={selectedFileName}
            imageUrl={imageUrl}
          />
          <br />
          <TextField
            label="Issue Name"
            variant="outlined"
            name="issueName"
            style={{ marginBottom: "16px" }}
            fullWidth
            value={companyInfo.issueName}
            onChange={handleChange}
            error={Boolean(errors.issueName)}
            helperText={errors.issueName}
          />
          <br />
          <TextField
            label="Issue Description"
            variant="outlined"
            name="issueDescription"
            style={{ marginBottom: "16px" }}
            multiline
            rows={4}
            fullWidth
            value={companyInfo.issueDescription}
            onChange={handleChange}
            error={Boolean(errors.issueDescription)}
            helperText={errors.issueDescription}
          />
          <br />
          <FormControl fullWidth style={{ marginBottom: "16px" }}>
            <InputLabel id="priority-label">Requires For</InputLabel>
            <Select
              labelId="priority-label"
              label="Requires For"
              variant="outlined"
              fullWidth
              name="priority"
              value={companyInfo.priority}
              onChange={handleChange}
              error={Boolean(errors.priority)}
            >
              <MenuItem value={"New Feature"}>New Feature</MenuItem>
              <MenuItem value={"Report Bug"}>Report Bug</MenuItem>
            </Select>
          </FormControl>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button type="submit" variant="outlined" color="success">
              Submit
            </Button>
          </div>
        </form>
      </div>
      {successTick && (
        <MyModal>
          <ModalContainer
            childComponent={
              <>
                <SuccessTick HeadText="Successfully " />
              </>
            }
          />
        </MyModal>
      )}
    </div>
  );
}

export default BugFixerpost;
