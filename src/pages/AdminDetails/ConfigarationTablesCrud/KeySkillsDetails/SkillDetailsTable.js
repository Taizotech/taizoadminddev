/* eslint-disable no-unused-vars */
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
// import { showHideDetailsActions } from "../../../redux-store/store";
import style from "./keySkillsTable.module.scss";
import {
  UpdateJobRoles,
  UpdateKeySkills,
  getJobRole,
  DeleteKeySkills,
  getKeySkillss,
} from "../../../../apiServices";
import { useEffect } from "react";
import { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ModalContainer from "../../../../components/modal_popup";
import { MyModal } from "../../../../utility";
import ConfirmationPopup from "../../../../components/ModalPopups/confirmationPopup";
import EditKeySkills from "./editKeySkills";
import AddKeySkills from "./addKeySkills";

function SkillAddTable() {
  const [jobRoles, setJobRoles] = useState([]);
  const [allJobRoles, setAllJobRoles] = useState([]);

  const [selectedRole, setSelectedRole] = useState({
    jobRole: "",
    id: "",
  });

  const [enableSubmit, setEnableSubmit] = useState(false);

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  function SelectJobRoleDetails(data) {
    setSelectedRole({
      jobRole: data.skill,
      id: data.id,
    });
  }
  const SkillID = selectedRole.id;
  console.log(selectedRole.id, "fhgfhfhhjghjghrtdggggdelete");
  function ShowConfirmPopup(val) {
    setShowConfirmPopup(val);
  }

  //   function ConfirmFormSubmit() {
  //     // delete job role
  //     console.log(selectedRole.id);
  //     UpdateKeySkills(selectedRole).then((res) => {
  //       console.log(res);

  //       getJobRole(1).then((res) => {
  //         setJobRoles(res.results);
  //       });

  //       setEnableSubmit(false);
  //       setSelectedRole({
  //         jobRole: "",
  //         id: "",
  //       });
  //       setShowConfirmPopup(false);
  //       console.log(res);
  //       alert("Job Role Deleted Successfully");
  //     });
  //   }

  function ConfirmFormSubmit() {
    DeleteKeySkills(SkillID)
      .then((res) => {
        console.log(res);
        // Handle success response
        alert("Job Role Deleted Successfully");
        // Refresh job roles after deletion
        getJobRoles();
      })
      .catch((error) => {
        console.error("Error deleting key skills:", error);
        // Handle error if needed
      })
      .finally(() => {
        // Reset states and close popup
        setEnableSubmit(false);
        setSelectedRole({
          jobRole: "",
          id: "",
        });
        setShowConfirmPopup(false);
      });
  }

  function getJobRoles() {
    getKeySkillss().then((res) => {
      console.log(res, "skill");
      setJobRoles(res);
      setAllJobRoles(res);
    });
  }

  useEffect(() => {
    getJobRoles();
  }, []);

  function filterJobRoles(e) {
    const { value } = e.target;
    let filteredArray = allJobRoles.filter((el) => {
      return el.skill.toLowerCase().includes(value.toLowerCase());
    });
    setJobRoles(filteredArray);
  }

  return (
    <>
      <div className={`container mt-3  ${style.table_container}`}>
        <div className="d-flex justify-content-end my-2">
          {/* to add new job Role */}

          <div style={{ width: "200px" }} className="mx-3">
            <input
              className="me-5 form-control "
              type="text"
              onInput={(e) => {
                filterJobRoles(e);
              }}
              placeholder="Search....."
            />
          </div>
          <AddKeySkills
            onSuccess={() => {
              getJobRoles();
            }}
          />
        </div>
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{ maxHeight: "70vh", maxWidth: "1000%" }}
        >
          <Table
            stickyHeader
            sx={{ cursor: "pointer" }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: "#169c50", color: "#fff" }}>
                  <h5>
                    <b>ID</b>
                  </h5>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ backgroundColor: "#169c50", color: "#fff" }}
                >
                  <h5>
                    <b>Key Skills</b>
                  </h5>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ backgroundColor: "#169c50", color: "#fff" }}
                >
                  <h5>
                    <b>Edit</b>
                  </h5>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ backgroundColor: "#169c50", color: "#fff" }}
                >
                  <h5>
                    <b>Delete</b>
                  </h5>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobRoles ? (
                jobRoles.map((row, index) => (
                  <TableRow
                    className={`${style["table-row"]}`}
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {/* {row.id} */}
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">{row.skill}</TableCell>
                    <TableCell align="center">
                      <span className="text-success">
                        <EditKeySkills getJobRoles={getJobRoles} data={row} />
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span
                        onClick={() => {
                          ShowConfirmPopup(true);
                          SelectJobRoleDetails(row, "delete");
                        }}
                        className="text-danger"
                      >
                        <DeleteForeverIcon />
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <div>
          {showConfirmPopup && (
            <MyModal>
              <ModalContainer
                childComponent={
                  <ConfirmationPopup
                    heading={"Confirmation"}
                    headingText={`Are you sure you want to delete ${selectedRole.jobRole}?`}
                    onConfirm={ConfirmFormSubmit}
                    enableSubmit={enableSubmit}
                    onRequestClose={() => {
                      ShowConfirmPopup(false);
                    }}
                    //</br> with <b>${contactPersonName}</b>
                  />
                }
              />
            </MyModal>
          )}
        </div>
      </div>
    </>
  );
}
export default SkillAddTable;
