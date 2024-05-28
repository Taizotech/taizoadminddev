// import React, { useState } from "react";
// import Select from "react-select"; // Ensure you have installed react-select
// import { GetDepartments } from "../../../apiServices";

// function EducationSpecializationForm() {
//   const [experienceWorkingField, setExperienceWorkingField] = useState({
//     Education: "",
//     Specialization: null,
//     CompletedYear: "",
//   });
//   const [validity, setValidity] = useState({
//     isEducation: true,
//     isSpecialization: true,
//     isCompletedYear: true,
//   });
//   const [arrayofData, setArrayofData] = useState({
//     DepartmentList: [],
//   });
//   const [showEducationDetials, setShowEducationDetials] = useState(false);

//   const handleSelectChange = (field, value) => {
//     setExperienceWorkingField((prevState) => ({
//       ...prevState,
//       [field]: value,
//       Specialization: null,
//     }));

//     handleGetDepartment(value);

//     // Update visibility of Specialization dropdown
//     setShowEducationDetials(
//       !(value === "Below 10" || value === "10th Pass and Above")
//     );
//   };

//   const handleGetDepartment = (value) => {
//     let end_url;

//     if (value === "Below 10" || value === "10th Pass and Above") {
//       setArrayofData({ DepartmentList: [] });
//       return;
//     }

//     switch (value) {
//       case "Diploma":
//         end_url = "diplomaCourses";
//         break;
//       case "ITI":
//         end_url = "ITICourses";
//         break;
//       case "UG":
//         end_url = "UGCourses";
//         break;
//       case "PG":
//         end_url = "PGCourses";
//         break;
//       default:
//         end_url = null;
//     }

//     if (end_url) {
//       GetDepartments(end_url)
//         .then((data) => {
//           setArrayofData({
//             DepartmentList: data.results,
//           });
//         })
//         .catch((error) => {
//           console.error("Failed to fetch departments:", error);
//           setArrayofData({ DepartmentList: [] });
//         });
//     }
//   };

//   const mapSpecialization = arrayofData.DepartmentList.map((data) => ({
//     value: data.courses,
//     label: data.courses,
//   }));

//   const handleSpecializationChange = (selectedOption) => {
//     setExperienceWorkingField((prevState) => ({
//       ...prevState,
//       Specialization: selectedOption ? selectedOption.value : null,
//     }));

//     // Reset the validity state when specialization is selected
//     setValidity((prevState) => ({
//       ...prevState,
//       isSpecialization: true,
//     }));
//   };
//   const handleInputChange = (field, value) => {
//     switch (field) {
//       case "CompletedYear":
//         setExperienceWorkingField((prevState) => ({
//           ...prevState,
//           CompletedYear: value,
//         }));
//         // console.log(value, "Company name value");
//         setValidity((prevState) => ({
//           ...prevState,
//           isCompletedYear: value.trim() !== "",
//         }));
//         // setStepCompleted((prev) => ({ ...prev, step3: true }));
//         break;

//       default:
//         break;
//     }
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Perform form validation before submission
//     if (!experienceWorkingField.Specialization) {
//       setValidity((prevState) => ({
//         ...prevState,
//         isSpecialization: false,
//       }));
//     } else {
//       // Specialization is selected, proceed with form submission logic
//       console.log("Form submitted:", experienceWorkingField);
//       // Add your form submission logic here
//     }
//   };

//   return (
//     <div className="row">
//       <form onSubmit={handleSubmit}>
//         {/* Education dropdown */}
//         <div className="col-sm-6">
//           <label htmlFor="educationDropdown" className="form-label">
//             <strong>Education</strong>
//           </label>
//           <select
//             className={`form-control ${!validity.isEducation && "is-invalid"}`}
//             id="educationDropdown"
//             value={experienceWorkingField.Education}
//             onChange={(e) => handleSelectChange("Education", e.target.value)}
//           >
//             <option value="">Select education</option>
//             <option value="Below 10">Below 10</option>
//             <option value="10th Pass and Above">10th Pass and Above</option>
//             <option value="Diploma">Diploma</option>
//             <option value="ITI">ITI</option>
//             <option value="UG">UG</option>
//             <option value="PG">PG</option>
//           </select>
//           {!validity.isEducation && (
//             <div style={{ color: "red" }} className="error-message">
//               Please select the education.
//             </div>
//           )}
//         </div>

//         {/* Specialization dropdown (conditionally rendered) */}
//         {showEducationDetials && (
//           <>
//             <div className="col-md-6 mb-3">
//               <label htmlFor="positionDropdown" className="form-label">
//                 <strong>Specialization</strong>
//               </label>
//               <Select
//                 className={`react-select-container ${
//                   !validity.isSpecialization && "is-invalid"
//                 }`}
//                 classNamePrefix="react-select"
//                 id="positionDropdown"
//                 value={
//                   experienceWorkingField.Specialization
//                     ? {
//                         value: experienceWorkingField.Specialization,
//                         label: experienceWorkingField.Specialization,
//                       }
//                     : null
//                 }
//                 options={mapSpecialization}
//                 onChange={(value) => handleSpecializationChange(value)}
//                 styles={{
//                   control: (provided) => ({
//                     ...provided,
//                     border: "1px solid #ced4da",
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                   }),
//                 }}
//               />
//               {!validity.isSpecialization && (
//                 <div style={{ color: "red" }} className="error-message">
//                   Please select a Specialization.
//                 </div>
//               )}
//             </div>
//             <div className="col-sm-6">
//               <label htmlFor="completedYear" className="form-label">
//                 <strong>Degree completed Year?</strong>
//               </label>
//               <input
//                 type="text"
//                 className={`form-control ${
//                   !validity.isCompletedYear && "is-invalid"
//                 }`}
//                 id="completedYear"
//                 value={experienceWorkingField.CompletedYear}
//                 onChange={(e) =>
//                   handleInputChange("CompletedYear", e.target.value)
//                 }
//                 maxLength={4}
//                 onKeyPress={(e) => {
//                   // Allow only numbers
//                   if (!/\d/.test(e.key)) {
//                     e.preventDefault();
//                   }
//                 }}
//               />
//               {!validity.isCompletedYear && (
//                 <div style={{ color: "red" }} className="error-message">
//                   Please enter completed year
//                 </div>
//               )}
//             </div>
//           </>
//         )}

//         <div className="col-md-12">
//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default EducationSpecializationForm;
