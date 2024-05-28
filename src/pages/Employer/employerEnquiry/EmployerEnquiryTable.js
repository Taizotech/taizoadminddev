/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import FBstyle from "../../Candidate/FacebookMeta/candidateFacebookMeta.module.scss";
import EmployerEnquiryFilter from "./EmployerEnquiryFilter";
import styled from "styled-components";
import {
  IconButton,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { GetEmployerEnquiry } from "../../../apiServices";
import { useDispatch, useSelector } from "react-redux";
import {
  DDMMYYYY_formate,
  capitalizeWords,
  textTruncate,
} from "../../../utility";
import { EmployerEnquiryActions } from "../../../redux-store/store";
import canLeadStyle from "../../Candidate/CandidateLeadTable/candidateLead.module.scss";
import { MdOutlineContentCopy } from "react-icons/md";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#d2d2d2",
    color: "#545454f0",
    "@media (max-width: 992px)": {},
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    "@media (max-width: 992px)": {},
  },
}));
function EmployerEnquiryTable() {
  const [EmployerEnquiryList, setEmployerEnquiryList] = useState([]);
  const [pageCount, setpageCount] = useState();
  const [enquiryCount, setEnquiryCount] = useState("");
  const [isTooltipOpen, setTooltipOpen] = useState({});
  const [isCompanyTooltipOpen, setCompanyTooltipOpen] = useState({});
  const EmployerFilter = useSelector(
    (state) => state.EmployerEnquiryDetails.EmployerEnquiryFilter
  );
  const Dispatch = useDispatch();
  useEffect(() => {
    console.log(EmployerFilter);
  }, [EmployerFilter]);

  useEffect(() => {
    GetEmployerEnquiry(EmployerFilter).then((data) => {
      console.log(data.empEnquiryList, "workingprogress");
      setEmployerEnquiryList(data.empEnquiryList);
      setEnquiryCount(data.totalCount);
      setpageCount(Math.ceil(data.totalCount / EmployerFilter.size));
    });
  }, [EmployerFilter]);
  function candidatePagination(event, page) {
    const currentPage = page;
    console.log(event, "current page");
    Dispatch(EmployerEnquiryActions.setEmployerEnquiryFilterPage(currentPage));
  }
  function candidateSize(size) {
    Dispatch(EmployerEnquiryActions.setEmployerEnquiryFilterSize(size));
  }
  const handleCopyClickcompany = (text, candidateId) => {
    navigator.clipboard.writeText(text);

    setCompanyTooltipOpen((prevState) => ({
      ...prevState,
      [candidateId]: true,
    }));
    setTimeout(() => {
      setCompanyTooltipOpen((prevState) => ({
        ...prevState,
        [candidateId]: false,
      }));
    }, 1500);
  };
  const handleCopyClick = (text, candidateId) => {
    navigator.clipboard.writeText(text);

    setTooltipOpen((prevState) => ({
      ...prevState,
      [candidateId]: true,
    }));
    setTimeout(() => {
      setTooltipOpen((prevState) => ({
        ...prevState,
        [candidateId]: false,
      }));
    }, 1500);
  };
  return (
    <div>
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
        <div className={`${canLeadStyle.filterAdduser}`}>
          {" "}
          <div className="mt-1 me-2">Total Count : {enquiryCount}</div>
          <EmployerEnquiryFilter />
        </div>
      </div>
      <div>
        <div className={`${FBstyle.Container}`}>
          <div className={`table-responsive-sm ${FBstyle.responsive}`}>
            <TableContainer className={`${FBstyle.TableContainer}`}>
              <Table stickyHeader aria-label="sticky table" className={``}>
                <TableHead className={`${FBstyle.Header}`}>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Company Name</StyledTableCell>
                    <StyledTableCell>Mobile Number</StyledTableCell>
                    <StyledTableCell>Email Id</StyledTableCell>
                    <StyledTableCell>Industry</StyledTableCell>
                    <StyledTableCell>City</StyledTableCell>
                    {/* <StyledTableCell>Area</StyledTableCell> */}
                    <StyledTableCell>Created on</StyledTableCell>
                    {/* <StyledTableCell>Status</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {EmployerEnquiryList.length > 0 ? (
                    <>
                      {EmployerEnquiryList.map((Employer, i) => {
                        return (
                          <>
                            <TableRow
                              key={i}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <StyledTableCell
                                title={
                                  Employer.empEnquiryModel.contactPersonName
                                }
                              >
                                {Employer.empEnquiryModel.contactPersonName
                                  ? textTruncate(
                                      capitalizeWords(
                                        Employer.empEnquiryModel
                                          .contactPersonName
                                      ),
                                      15
                                    )
                                  : "-"}
                              </StyledTableCell>
                              <StyledTableCell
                                title={Employer.empEnquiryModel.companyName}
                              >
                                {Employer.empEnquiryModel.companyName !=
                                null ? (
                                  <>
                                    <Tooltip
                                      key={Employer.empEnquiryModel.id}
                                      open={
                                        isCompanyTooltipOpen[
                                          Employer.empEnquiryModel.id
                                        ] || false
                                      }
                                      className="ms-0"
                                      title="Company name copied!"
                                      placement="top"
                                      id={Employer.empEnquiryModel.id}
                                    >
                                      <IconButton
                                        onClick={() =>
                                          handleCopyClickcompany(
                                            Employer.empEnquiryModel
                                              .companyName,
                                            Employer.empEnquiryModel.id
                                          )
                                        }
                                        aria-label="Copy Email ID"
                                      >
                                        <MdOutlineContentCopy />
                                      </IconButton>
                                    </Tooltip>{" "}
                                    {textTruncate(
                                      Employer.empEnquiryModel.companyName,
                                      15
                                    )}
                                  </>
                                ) : (
                                  <span>-</span>
                                )}
                              </StyledTableCell>

                              <StyledTableCell
                                title={Employer.empEnquiryModel.mobileNumber}
                              >
                                {Employer.empEnquiryModel.mobileNumber
                                  ? "+91" +
                                    " " +
                                    String(
                                      Employer.empEnquiryModel.mobileNumber
                                    ).slice(0, 10)
                                  : ""}
                              </StyledTableCell>
                              <StyledTableCell
                                title={Employer.empEnquiryModel.emailId}
                              >
                                {Employer.empEnquiryModel.emailId != null ? (
                                  <>
                                    <Tooltip
                                      key={Employer.empEnquiryModel.id}
                                      open={
                                        isTooltipOpen[
                                          Employer.empEnquiryModel.id
                                        ] || false
                                      }
                                      className="ms-0"
                                      title="Email ID copied!"
                                      placement="top"
                                      id={Employer.empEnquiryModel.id}
                                    >
                                      <IconButton
                                        onClick={() =>
                                          handleCopyClick(
                                            Employer.empEnquiryModel.emailId,
                                            Employer.empEnquiryModel.id
                                          )
                                        }
                                        aria-label="Copy Email ID"
                                      >
                                        <MdOutlineContentCopy />
                                      </IconButton>
                                    </Tooltip>{" "}
                                    {textTruncate(
                                      Employer.empEnquiryModel.emailId,
                                      25
                                    )}
                                  </>
                                ) : (
                                  <span>-</span>
                                )}
                                {/* {Employer.empEnquiryModel.emailId
                                  ? textTruncate(
                                      capitalizeWords(
                                        Employer.empEnquiryModel.emailId
                                      ),
                                      15
                                    )
                                  : "-"} */}
                              </StyledTableCell>
                              <StyledTableCell
                                title={Employer.empEnquiryModel.industry}
                              >
                                {Employer.empEnquiryModel.industry
                                  ? textTruncate(
                                      capitalizeWords(
                                        Employer.empEnquiryModel.industry
                                      ),
                                      15
                                    )
                                  : "-"}
                              </StyledTableCell>
                              <StyledTableCell
                                title={Employer.empEnquiryModel.city}
                              >
                                {Employer.empEnquiryModel.city
                                  ? textTruncate(
                                      capitalizeWords(
                                        Employer.empEnquiryModel.city
                                      ),
                                      15
                                    )
                                  : "-"}
                              </StyledTableCell>
                              <StyledTableCell>
                                <DDMMYYYY_formate
                                  dateValue={
                                    Employer.empEnquiryModel.createdTime
                                  }
                                />
                              </StyledTableCell>
                            </TableRow>
                          </>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}
                </TableBody>
              </Table>
            </TableContainer>
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
    </div>
  );
}

export default EmployerEnquiryTable;
