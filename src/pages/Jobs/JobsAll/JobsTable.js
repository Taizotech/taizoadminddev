/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Backdrop,
  CircularProgress,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import FBinterviewFilter from "../../Candidate/FacebookMeta/FBinterviewFilter";
import { LuRefreshCcw } from "react-icons/lu";
import FBstyle from "../../Candidate/FacebookMeta/candidateFacebookMeta.module.scss";
import styled from "styled-components";
import { tableCellClasses } from "@mui/material/TableCell";
import whiteCollar from "../../../assets/images/whiteCollar.png";
import blueCollar from "../../../assets/images/blueCollar.png";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredJobs } from "../../../apiServices";
import {
  JobsDetailsActions,
  commonPopupActions,
} from "../../../redux-store/store";
import JobsFilter from "./JobsFilter";
import {
  DDMMYYYY_formate,
  capitalizeWords,
  convertDateYYYYMMDD,
  textTruncate,
} from "../../../utility";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#d2d2d2",
    color: "#545454f0",
    // Adjust the width as needed
    "@media (max-width: 992px)": {},
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    // width: "300px", // Adjust the width as needed
    "@media (max-width: 992px)": {},
  },
}));
function JobsTable() {
  const JobFilterList = useSelector(
    (state) => state.JobsDetailsDetails.JobsList
  );
  const Dispatch = useDispatch();
  const [pageCount, setpageCount] = useState();
  const [showLoader, setShowLoader] = useState(false); // New state for loader

  const JobFilter = useSelector((state) => state.JobsDetailsDetails.JobsData);

  useEffect(() => {
    console.log(JobFilterList);
  }, [JobFilterList]);

  useEffect(() => {
    getFilteredJobs(JobFilter).then((data) => {
      console.log(data, "data");
      Dispatch(JobsDetailsActions.setJobList(data));

      setpageCount(
        Math.ceil((data.length > 0 ? data[0].total_count : 10) / JobFilter.size)
      );
    });
  }, [JobFilter]);
  function candidatePagination(event, page) {
    const currentPage = page;

    Dispatch(JobsDetailsActions.setJobsDataPage(currentPage));
  }
  function candidateSize(size) {
    Dispatch(JobsDetailsActions.setJobsDatasize(size));
  }

  function handleJobDetails(job_id) {
    Dispatch(
      commonPopupActions.setShowPopup({
        name: "jobDetails",
        id: job_id,
      })
    );
    // ReloadPage();
  }
  const handleReset = () => {
    setShowLoader(true); // Set loader to true

    Dispatch(
      JobsDetailsActions.setJobList({
        assignTo: localStorage.getItem("adminID"),
        priority: null,
        companyName: "",
        area: [],
        benefits: [],
        gender: null,
        industry: [],
        jobCategory: [],
        jobExp: -1,
        jobMaxExp: -1,
        jobLocation: [],
        keyskills: [],
        qualification: [],
        employerId: -1,
        salary: -1,
        maxSalary: -1,
        pages: 1,
        size: 10,
        createdTime: "2021-01-01",
        endDate: convertDateYYYYMMDD(new Date()),
      })
    );

    // Fetch data after resetting
    getFilteredJobs(JobFilter)
      .then((data) => {
        console.log(data, "data");
        Dispatch(JobsDetailsActions.setJobList(data));

        setpageCount(
          Math.ceil(
            (data.length > 0 ? data[0].total_count : 10) / JobFilter.size
          )
        );
      })
      .finally(() => {
        setShowLoader(false);
      });
  };
  return (
    <>
      {" "}
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
        <div
          className="p-1 success me-2 mx-2 ms-auto"
          onClick={handleReset}
          // style={{ : "#169C50", color: "white" }}
        >
          <LuRefreshCcw />
        </div>
        <JobsFilter />
      </div>
      <div>
        <div className={`${FBstyle.Container}`}>
          <div className={`table-responsive-sm ${FBstyle.responsive}`}>
            <div style={{ minWidth: 300 }}>
              <TableContainer className={`${FBstyle.TableContainer}`}>
                <Table stickyHeader aria-label="sticky table" className={``}>
                  <TableHead className={`${FBstyle.Header}`}>
                    <TableRow>
                      <StyledTableCell>Company Name</StyledTableCell>
                      <StyledTableCell>Mobile Number</StyledTableCell>
                      <StyledTableCell>Job Category</StyledTableCell>
                      {/* <StyledTableCell>Experience</StyledTableCell> */}
                      <StyledTableCell>Qualification</StyledTableCell>
                      {/* <StyledTableCell>KeySkills</StyledTableCell> */}
                      <StyledTableCell>City</StyledTableCell>
                      <StyledTableCell>Area</StyledTableCell>{" "}
                      <StyledTableCell>Created on</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                      {/* <StyledTableCell>Status</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {JobFilterList.length > 0 ? (
                      <>
                        {JobFilterList.map((jobsdata, i) => {
                          return (
                            <>
                              <TableRow
                                key={i}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                                // onClick={(e) => {
                                //   // alert(candidate.facebookMetaLead.id);
                                //   setCurrentMetaDetail(
                                //     candidate.facebookMetaLead
                                //   );
                                // }}
                              >
                                <StyledTableCell
                                  style={{ cursor: "pointer" }}
                                  className="text-primary "
                                  title={jobsdata.company_name}
                                  onClick={() => {
                                    handleJobDetails(jobsdata.job_id);
                                  }}
                                >
                                  {jobsdata.company_name
                                    ? textTruncate(
                                        capitalizeWords(jobsdata.company_name),
                                        20
                                      )
                                    : "-"}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {jobsdata.mobile_number
                                    ? String(jobsdata.mobile_number).slice(
                                        0,
                                        10
                                      )
                                    : "-"}
                                </StyledTableCell>
                                <StyledTableCell title={jobsdata.job_category}>
                                  {jobsdata.job_category
                                    ? textTruncate(
                                        capitalizeWords(jobsdata.job_category),
                                        20
                                      )
                                    : "-"}
                                </StyledTableCell>
                                {/* <StyledTableCell>
                                  {`${jobsdata.job_min_exp} year(s)`}
                                </StyledTableCell> */}
                                <StyledTableCell
                                  title={jobsdata.pref_qualification}
                                >
                                  {jobsdata.pref_qualification
                                    ? textTruncate(
                                        capitalizeWords(
                                          jobsdata.pref_qualification
                                        ),
                                        20
                                      )
                                    : "-"}
                                </StyledTableCell>
                                {/* <StyledTableCell title={jobsdata.keyskills}>
                                  {jobsdata.keyskills
                                    ? textTruncate(
                                        capitalizeWords(jobsdata.keyskills),
                                        20
                                      )
                                    : "-"}
                                </StyledTableCell> */}

                                <StyledTableCell>
                                  {jobsdata.job_city}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {jobsdata.area}
                                </StyledTableCell>
                                <StyledTableCell>
                                  <DDMMYYYY_formate
                                    dateValue={jobsdata.created_time}
                                  />
                                </StyledTableCell>
                                <StyledTableCell>
                                  {jobsdata.job_status === "C" ? (
                                    <span className="text-danger">
                                      <b>Closed</b>
                                    </span>
                                  ) : (
                                    <span className="text-success">
                                      <b>Open</b>
                                    </span>
                                  )}
                                   {jobsdata.collar_type ===
                                    "MidSenior Category" && (
                                    <img
                                      src={whiteCollar}
                                      alt=""
                                      style={{ width: "30px", height: "30px", marginLeft: "15px" }}
                                      title="MidSenior Category"
                                    />
                                  )}
                                   {jobsdata.collar_type ===
                                    "Operator Category" && (
                                    <img
                                      src={blueCollar}
                                      alt=""
                                      style={{ width: "30px", height: "30px", marginLeft: "15px" }}
                                      title="Operator Category"
                                    />
                                  )}
                                </StyledTableCell>
                              </TableRow>
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} align="center">
                          <p className="text-danger">Not found</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={showLoader}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-3 position-absolute bottom-0 start-50 translate-middle-x">
          <Stack spacing={2}>
            <Pagination
              count={pageCount}
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
    </>
  );
}

export default JobsTable;
