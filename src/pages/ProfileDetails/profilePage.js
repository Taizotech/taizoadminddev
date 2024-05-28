// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Container,
//   Grid,
//   Avatar,
// } from "@mui/material";
// import { GetAdminDetailsByID } from "../../apiServices";

// const ProfilePage = () => {
//   const [adminDetails, setAdminDetails] = useState({
//     name: "John Doe",
//     email: "johndoe@example.com",
//     mobileNumber: "555-555-5555",
//     profilePic: null, // Placeholder image URL
//     role: "User",
//     // ProfilePic: "User",
//   });

//   useEffect(() => {
//     let adminID = localStorage.getItem("adminID");
//     console.log(adminID);
//     GetAdminDetailsByID(adminID).then((data) => {
//       console.log(data);
//       setAdminDetails((prev) => ({
//         ...prev,
//         name: data.admin.userName,
//         email: data.admin.emailId,
//         mobileNumber: data.admin.mobileNo,
//         profilePic: data.admin.ProfilePic,
//         role: data.roles[0].roleName,
//       }));
//     });
//   }, []);

//   // Extract the first two letters of the name
//   // const initials = adminDetails.name
//   //   .split(" ")
//   //   .map((word) => word[0])
//   //   .join("")
//   //   .toUpperCase();
//   return (
//     <Container
//       maxWidth="xs"
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         height: "100vh",
//         padding: "20px",
//       }}
//     >
//       <Card style={{ padding: "20px" }}>
//         <CardContent
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Typography variant="h4" gutterBottom>
//             Profile Details
//           </Typography>
//           <Grid container spacing={1}>
//             <Grid
//               item
//               xs={12}
//               style={{ display: "flex", justifyContent: "center" }}
//             >
//               <Avatar
//                 // alt={adminDetails.name}
//                 src={adminDetails.profilePic}
//                 style={{ width: 75, height: 75, borderRadius: "50%" }}
//               >
//                 {/* {initials} */}
//                 {adminDetails.profilePic}
//               </Avatar>
//             </Grid>
//             <Grid
//               item
//               xs={12}
//               style={{ display: "flex", justifyContent: "center" }}
//             >
//               <Typography variant="h5">{adminDetails.name}</Typography>
//             </Grid>
//             <Grid
//               item
//               xs={12}
//               style={{ display: "flex", justifyContent: "center" }}
//             >
//               <Typography variant="body1">
//                 <strong>Email</strong>: {adminDetails.email}
//               </Typography>
//             </Grid>
//             <Grid
//               item
//               xs={12}
//               style={{ display: "flex", justifyContent: "center" }}
//             >
//               <Typography variant="body1">
//                 <strong>Mobile Number</strong> : {adminDetails.mobileNumber}
//               </Typography>
//             </Grid>
//             <Grid
//               item
//               xs={12}
//               style={{ display: "flex", justifyContent: "center" }}
//             >
//               <Typography variant="body1">
//                 {" "}
//                 <strong>Role</strong> : {adminDetails.role}
//               </Typography>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default ProfilePage;
import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Avatar,
  Button,
  TextField,
} from "@mui/material";
import { GetAdminDetailsByID, Putprofile } from "../../apiServices";

const ProfilePage = () => {
  const [adminDetails, setAdminDetails] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    mobileNumber: "555-555-5555",
    profilePic: null, // Placeholder image URL
    role: "User",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const initials = adminDetails.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  let ProfilePic = adminDetails.profilePic;
  useEffect(() => {
    let adminID = localStorage.getItem("adminID");
    GetAdminDetailsByID(adminID)
      .then((data) => {
        setAdminDetails((prev) => ({
          ...prev,
          name: data.admin.userName,
          email: data.admin.emailId,
          mobileNumber: data.admin.mobileNo,
          profilePic: data.admin.ProfilePic,
          role: data.roles.length > 0 ? data.roles[0].roleName : "",
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isEditMode]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    // alert("hiiiiiiii");
    const formData = new FormData();
    formData.append("pic", newProfilePic);

    Putprofile(newProfilePic, adminDetails).then((res) => {
      console.log(res);

      if (newProfilePic) {
        setAdminDetails((prev) => ({
          ...prev,
          profilePic: URL.createObjectURL(newProfilePic),
        }));
      }
      setIsEditMode(false);
    });
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewProfilePic(file);
  };

  const fileInputRef = useRef(null);

  // Event handler to open the file dialog
  const handleFileInputClick = () => {
    if (isEditMode) {
      fileInputRef.current.click();
    }
  };
  return (
    <Container
      maxWidth="xs"
      style={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        height: "100vh",

        padding: "20px",
      }}
    >
      <Card style={{ padding: "20px" }}>
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <Typography variant="h4" gutterBottom>
            Profile Details
          </Typography> */}
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              {/* <Avatar
                src={adminDetails.profilePic}
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: "50%",
                  border: "2px solid #169c50",
                }}
              />
              {isEditMode && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              )} */}
              <label htmlFor="fileInput">
                <Avatar
                  src={
                    newProfilePic
                      ? URL.createObjectURL(newProfilePic)
                      : ProfilePic
                      ? ProfilePic
                      : null
                  }
                  style={{
                    width: 75,
                    height: 75,
                    borderRadius: "50%",
                    border: "2px solid gray",
                    cursor: isEditMode ? "pointer" : "default",
                  }}
                  onClick={handleFileInputClick}
                >
                  {ProfilePic || newProfilePic ? null : (
                    <span
                      style={{
                        fontSize: "1.5rem",
                        lineHeight: "75px",
                        textAlign: "center",
                        display: "block",
                        border: "none",
                      }}
                    >
                      {initials}
                    </span>
                  )}
                </Avatar>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="fileInput"
                />
              </label>
            </Grid>
            <Grid item xs={12}>
              {isEditMode ? (
                <>
                  <strong className="mt-5">Name </strong>
                  <TextField
                    name="name"
                    id="standard-basic"
                    variant="standard"
                    fullWidth
                    className="mt-1"
                    value={adminDetails.name}
                    onChange={handleInputChange}
                  />
                </>
              ) : (
                <>
                  <strong className="mt-5">Name </strong>
                  <TextField
                    name="name"
                    id="standard-basic"
                    variant="standard"
                    fullWidth
                    className="mt-1"
                    value={adminDetails.name}
                    // onChange={handleInputChange}
                  />
                  {/* <Typography variant="h5">
                    <div className="text-center">{adminDetails.name}</div>
                  </Typography>
                  <div className="text-center">
                    (<b>{adminDetails.role}</b>)
                  </div> */}
                </>
              )}
            </Grid>
            <Grid item xs={12} className="mt-2">
              <strong>Email ID</strong>{" "}
              {isEditMode ? (
                // <Typography variant="body1">
                <TextField
                  id="standard-basic"
                  // label="Email"
                  name="email"
                  variant="standard"
                  className="mt-1"
                  fullWidth
                  value={adminDetails.email}
                  onChange={handleInputChange}
                />
              ) : (
                // </Typography>
                <Typography variant="" className="mt-5">
                  {/* <div className="text-center">{adminDetails.email}</div> */}
                  <TextField
                    id="standard-basic"
                    // label="Email ID"
                    variant="standard"
                    fullWidth
                    className="mt-1"
                    value={adminDetails.email}
                    // onChange={handleInputChange}
                  />
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} className="mt-2">
              <strong>Mobile Number</strong>{" "}
              {isEditMode ? (
                <TextField
                  id="standard-basic"
                  variant="standard"
                  fullWidth
                  className="mt-1"
                  name="mobileNumber"
                  value={adminDetails.mobileNumber}
                  onChange={handleInputChange}
                />
              ) : (
                <Typography variant="" className="mt-5">
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    fullWidth
                    className="mt-1"
                    value={adminDetails.mobileNumber}
                  />
                </Typography>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", flexDirection: "column" }}
              className="mt-2"
            >
              {" "}
              {/* {!isEditMode && ( */}
              <strong>Role</strong>
              <>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  fullWidth
                  value={adminDetails.role}
                />
              </>
              {/* )} */}
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ display: "flex", justifyContent: "end" }}>
            {isEditMode ? (
              <>
                <div className="mt-5">
                  {" "}
                  <Button
                    onClick={handleSaveClick}
                    variant="contained"
                    // color"
                    style={{ backgroundColor: "#169c50", marginRight: "10px" }}
                  >
                    Save
                  </Button>
                  <Button onClick={handleCancelClick} variant="contained">
                    Cancel
                  </Button>
                </div>
                {/* </Grid> */}
              </>
            ) : (
              <div className="mt-5">
                <Button
                  onClick={handleEditClick}
                  variant="contained"
                  color="primary"
                >
                  Edit
                </Button>
              </div>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
