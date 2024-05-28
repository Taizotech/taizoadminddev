/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetJobLeadtable } from "../../../apiServices";
import { JobleadsSliceActions } from "../../../redux-store/store";
import { DDMMYYYY_formate } from "../../../utility";
import FBstyle from "../../Candidate/FacebookMeta/candidateFacebookMeta.module.scss";

import { LuRefreshCcw } from "react-icons/lu";
import { Pagination, Stack, TextField } from "@mui/material";
import {
  FBmetaLeadsSliceActions,
  commonPopupActions,
} from "../../../redux-store/store";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
// import FBLeadPopup from "../../../components/ModalPopups/FBLeadPopup";
// import QualifyForm from "./components/qualifyForm";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#d2d2d2",
    color: "#545454f0",
    // Adjust the width as needed
    // overflowX: "auto",
    "@media (max-width: 992px)": {},
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    // width: "300px", // Adjust the width as needed
    // overflowX: "auto",
    "@media (max-width: 992px)": {},
  },
}));

function JobLeadTable() {
  const [pagesCount, setPagesCount] = useState({
    totalPages: 0,
    totalCount: 0,
    currentPage: 1,
  });

  const [currentMetaDetail, setCurrentMetaDetail] = useState();
  const [JobLeadListData, setJobLeadListData] = useState([]);
  // const [currentMetaDetail, setCurrentMetaDetail] = useState({});
  // console.log(currentMetaDetail);
  const [showLoader, setShowLoader] = useState(false); // New state for loader
  const JobleadList = useSelector((state) => state.JobLeadDetails.JobleadList);

  const Dispatch = useDispatch();
  const adminDetails = useSelector((state) => state.adminDetails);
  // const Dispatch = useDispatch();
  let isSuperAdmin = adminDetails.roleID == 1;
  useEffect(() => {}, [JobleadList]);
  useEffect(() => {
    // to set super admin id as 0
    let id = isSuperAdmin ? 0 : localStorage.getItem("adminID");
    Dispatch(FBmetaLeadsSliceActions.setFBmetaListFilterAdminId(id));
  }, [adminDetails]);

  const initialState = {
    employerId: JobleadList.employerId,
  };
  const [JobLead, setJobLead] = useState(initialState);

  const handleJobLeadChange = (event) => {
    const value = event.target.value;
    setJobLead({
      ...JobLead,
      employerId: value,
    });
    Dispatch(JobleadsSliceActions.setJobleadListEmployerId(value));
  };
  const handleReset = () => {
    setShowLoader(true); // Set loader to true

    setJobLeadListData({
      employerId: "",
      page: 0,
      size: 10,
    });

    // Fetch data after resetting
    GetJobLeadtable(JobleadList)
      .then((data) => {
        if (data.code === 404) {
          setJobLeadListData([]);
          setPagesCount((prev) => ({
            ...prev,
            totalPages: 1,
          }));
          return;
        }
        console.log(data, "job lead's data");
        setJobLeadListData(data.data.content);
        setPagesCount((prev) => ({
          ...prev,
          totalPages: data.data.totalPages,
        }));
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  function ReloadList() {
    GetJobLeadtable(JobleadList)
      .then((data) => {
        console.log(data, "job lead's data");
        setJobLeadListData(data.data.content);
        setPagesCount((prev) => ({
          ...prev,
          totalPages: data.data.totalPages,
        }));
      })
      .finally(() => {
        setShowLoader(false);
      });
  }

  useEffect(() => {
    setShowLoader(true);
    ReloadList();
    setShowLoader(false);
  }, []);

  useEffect(() => {
    setShowLoader(true);

    GetJobLeadtable(JobleadList)
      .then((data) => {
        if (data.code === 404) {
          // Handle 404 response
          setJobLeadListData([]);
          setPagesCount((prev) => ({
            ...prev,
            totalPages: 1,
          }));
        } else {
          // Handle successful response
          console.log(data, "job lead's data");
          setJobLeadListData(data.data.content);
          setPagesCount((prev) => ({
            ...prev,
            totalPages: data.data.totalPages,
          }));
        }
      })
      .finally(() => {
        setShowLoader(false);
      });
  }, [JobleadList]);

  const handleEmployersDetails = (id, type) => {
    console.log(id);

    Dispatch(
      commonPopupActions.setShowPopup({
        name: type,
        id: id,
      })
    );
  };

  function candidatePagination(event, page) {
    console.log(page, "Event");
    const currentPage = page - 1;

    Dispatch(JobleadsSliceActions.setJobleadListPage(currentPage));
    // Dispatch(JobLeadsSliceActions.setJobleadListPage(currentPage));
  }
  function candidateSize(size) {
    Dispatch(JobleadsSliceActions.setJobleadListSize(size));
    // Dispatch(JobLeadsSliceActions.setJobleadListSize(size));
  }
  const inputRef = {
    qualified: useRef(),
    notQualified: useRef(),
    // rescheduled: useRef(),
  };

  return (
    <>
      <div className={`${FBstyle.FilterHead}`}>
        {" "}
        <div className="d-flex ">
          Show {"  "}
          <select
            name=""
            id=""
            className="px-1 py-1 mx-2"
            onChange={(event) => candidateSize(event.target.value)}
          >
            <option selected value="10">
              10
            </option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          {"   "}
          Entries
        </div>
        <div className="d-flex align-items-center justify-content-end">
          <div
            className="p-1 success me-2 mx-2 ms-auto"
            onClick={handleReset}
            // style={{ : "#169C50", color: "white" }}
          >
            <LuRefreshCcw />
          </div>
          {/* <FBinterviewFilter /> */}
          <TextField
            label="Employer Id"
            id="standard-basic"
            variant="standard"
            placeholder="Employer Id"
            value={JobLead.employerId}
            type="number"
            onChange={handleJobLeadChange}
          />
        </div>
      </div>
      <div>
        <div className={`${FBstyle.Container}`}>
          <div className={`table-responsive-sm ${FBstyle.responsive}`}>
            <div style={{ minWidth: 300 }}>
              <TableContainer className={`${FBstyle.TableContainer}`}>
                <Table stickyHeader aria-label="sticky table" className={``}>
                  <TableHead className={`${FBstyle.Header}`}>
                    <TableRow>
                      <StyledTableCell>Employer ID</StyledTableCell>
                      <StyledTableCell>Industry</StyledTableCell>
                      {/* <StyledTableCell>Whatsapp Number</StyledTableCell> */}
                      <StyledTableCell>Job Category</StyledTableCell>
                      <StyledTableCell>Experience</StyledTableCell>
                      <StyledTableCell>No.of Openings</StyledTableCell>
                      <StyledTableCell>Work Hours</StyledTableCell>
                      <StyledTableCell>Created on</StyledTableCell>
                      {/* <StyledTableCell>Status</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {JobLeadListData.length > 0 ? (
                      JobLeadListData.map((employer, i) => (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                          key={i}
                        >
                          <StyledTableCell className="text-primary">
                            <span
                              onClick={() => {
                                handleEmployersDetails(
                                  employer.employerId,
                                  "employerDetails"
                                );
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              {employer.employerId}
                            </span>{" "}
                          </StyledTableCell>
                          <StyledTableCell>
                            {employer.jobIndustry}
                          </StyledTableCell>
                          <StyledTableCell>
                            {employer.jobCategory}
                          </StyledTableCell>
                          <StyledTableCell>
                            {`${employer.jobMinExp} -
                              ${employer.jobMaxExp}`}
                          </StyledTableCell>
                          <StyledTableCell>
                            {employer.noOfOpenings}
                          </StyledTableCell>
                          <StyledTableCell>
                            {`${employer.workHours} Hours`}
                          </StyledTableCell>
                          <StyledTableCell>
                            <DDMMYYYY_formate
                              dateValue={employer.createdTime}
                            />
                          </StyledTableCell>
                        </TableRow>
                        // </div>
                      ))
                    ) : (
                      // <NoLead />
                      <TableRow>
                        <TableCell colSpan={8} align="center">
                          <p className="text-danger">Not found</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-3 position-absolute bottom-0 start-50 translate-middle-x">
          <Stack spacing={2}>
            <Pagination
              count={pagesCount.totalPages}
              variant="outlined"
              shape="rounded"
              color="success"
              boundaryCount={1}
              siblingCount={0}
              onChange={candidatePagination}
              size="medium"
            />
          </Stack>
        </div>
      </div>

      <>
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
      </>
    </>
  );
}

export default JobLeadTable;
