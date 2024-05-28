import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { showHideDetailsActions } from "../../../redux-store/store";
import style from "./jobRolesTable.module.scss";
import AddJobRole from "./addJobRole";
import { UpdateJobRoles, getJobRole } from "../../../../apiServices";
import { useEffect } from "react";
import { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModalContainer from "../../../../components/modal_popup";
import { MyModal } from "../../../../utility";
import ConfirmationPopup from "../../../../components/ModalPopups/confirmationPopup";
import EditJobRole from "./editJobRole";

export default function JobRolesTable() {
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
      jobRole: data.jobRoles,
      id: data.id,
    });
  }

  function ShowConfirmPopup(val) {
    setShowConfirmPopup(val);
  }

  function ConfirmFormSubmit() {
    // delete job role
    console.log(selectedRole.id);
    UpdateJobRoles(selectedRole).then((res) => {
      console.log(res);

      getJobRole(1).then((res) => {
        setJobRoles(res.results);
      });

      setEnableSubmit(false);
      setSelectedRole({
        jobRole: "",
        id: "",
      });
      setShowConfirmPopup(false);
      console.log(res);
      alert("Job Role Deleted Successfully");
    });
  }

  function getJobRoles() {
    getJobRole(1).then((res) => {
      setJobRoles(res.results);
      setAllJobRoles(res.results);
    });
  }

  useEffect(() => {
    getJobRoles();
  }, []);

  function filterJobRoles(e) {
    const { value } = e.target;
    let filteredArray = allJobRoles.filter((el) => {
      return el.jobRoles.toLowerCase().includes(value.toLowerCase());
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
          <AddJobRole
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
              <TableRow sx={{ zIndex: 1000, textAlign: "center" }}>
                <TableCell
                  sx={{
                    // backgroundColor: "#02c04124",
                    backgroundColor: "#169c50",
                    color: "#fff",
                    zIndex: 1000,
                  }}
                >
                  <h5>
                    <b>SI.NO</b>
                  </h5>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ backgroundColor: "#169c50", color: "#fff" }}
                >
                  <h5>
                    <b>Job Roles</b>
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
              {jobRoles.map((row, index) => (
                <TableRow
                  className={`${style["table-row"]}`}
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {/* {row.id} */}
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{row.jobRoles}</TableCell>
                  <TableCell align="center">
                    <span
                      // className="text-success"
                      style={{
                        color: "#169c50",
                      }}
                    >
                      <EditJobRole getJobRoles={getJobRoles} data={row} />
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
              ))}
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
