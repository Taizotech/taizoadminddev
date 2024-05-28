/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import EmployerFieldLeadForm from "./addLeadForm";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import CompanyLogo from "../../../../src/assets/images/Company-Logo.png";
import { useEffect, useState } from "react";
import { PostEmpFieldLeadsFilter } from "../../../apiServices";
import { capitalizeWords, textTruncate } from "../../../utility";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";
import FBstyle from "../../Candidate/FacebookMeta/candidateFacebookMeta.module.scss";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
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
const EmployerFieldLeads = () => {
  const [leadListData, setLeadListData] = useState({
    list: [],
  });
  const [pageDetails, setPageDetails] = useState({
    page: 1,
    totalPage: "",
    size: 10,
    totalCount: "",
  });

  const [open, setOpen] = useState(false);
  const handleLoaderClose = () => {
    setOpen(false);
  };
  const handleLoaderOpen = () => {
    setOpen(true);
  };

  const filterObj = useSelector(
    (state) => state.FieldEmpLeads.FieldEmpLeadFilter
  );

  function ChangePageSize(Type, value) {
    setPageDetails((prev) => ({ ...prev, [Type]: value }));
  }

  useEffect(() => {
    console.log(filterObj, "dtaa");
  }, [leadListData]);

  const debouncedApiCall = debounce((filter, pageDetails) => {
    handleLoaderOpen();
    PostEmpFieldLeadsFilter(filter, pageDetails).then((res) => {
      setTimeout(() => {
        handleLoaderClose();
        setLeadListData((prev) => ({ ...prev, list: res.employerFieldList }));
        setPageDetails((prev) => ({
          ...prev,
          totalPage: Math.ceil(res.totalCount / pageDetails.size),
        }));
      }, 500);
    });
  }, 500);

  useEffect(() => {
    debouncedApiCall(filterObj, pageDetails);
  }, [filterObj, pageDetails.page, pageDetails.size]);

  return (
    <>
      <div>
        <div className="d-grid justify-content-end my-2">
          <EmployerFieldLeadForm
            onSuccess={() => {
              debouncedApiCall(filterObj, pageDetails);
            }}
          />
        </div>
        <div>
          <div>
            <div className={`${FBstyle.Container}`}>
              <div className={`table-responsive-sm ${FBstyle.responsive}`}>
                <TableContainer className={`${FBstyle.TableContainer}`}>
                  <Table stickyHeader aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">Photo</StyledTableCell>
                        <StyledTableCell>Company Name</StyledTableCell>
                        <StyledTableCell align="left">City</StyledTableCell>
                        <StyledTableCell align="left">Area</StyledTableCell>
                        <StyledTableCell align="left">
                          Mobile Number
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          Whatsapp Number
                        </StyledTableCell>
                        <StyledTableCell align="left">Email ID</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {leadListData.list.map((row) => (
                        <TableRow
                          key={row.employerFieldLead.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            align="left"
                            scope="row"
                            // title={row.employerFieldLead.leadImageLink}
                            title={row.employerFieldLead.leadImageLink}
                          >
                            {" "}
                            <a
                              href={row.employerFieldLead.leadImageLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={
                                  row.employerFieldLead.leadImageLink != null
                                    ? row.employerFieldLead.leadImageLink
                                    : CompanyLogo
                                } // Replace with your dummy image URL
                                alt="pic"
                                style={{
                                  // marginRight: "10px",
                                  width: "60px",
                                  height: "60px", // Set to the desired height
                                }}
                              />
                            </a>
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            title={row.employerFieldLead.companyName}
                          >
                            {textTruncate(
                              capitalizeWords(
                                row.employerFieldLead.companyName
                              ),
                              30
                            )}
                          </TableCell>
                          <TableCell
                            align="left"
                            title={row.employerFieldLead.city}
                          >
                            {textTruncate(
                              capitalizeWords(row.employerFieldLead.city),
                              30
                            )}
                          </TableCell>
                          <TableCell
                            align="left"
                            title={row.employerFieldLead.area}
                          >
                            {textTruncate(
                              capitalizeWords(row.employerFieldLead.area),
                              30
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {row.employerFieldLead.mobileNumber != ""
                              ? "+91" +
                                " " +
                                String(
                                  row.employerFieldLead.mobileNumber
                                ).slice(0, 10)
                              : "-"}
                          </TableCell>
                          <TableCell align="left">
                            {row.employerFieldLead.whatsappNumber != ""
                              ? "+91" +
                                " " +
                                String(
                                  row.employerFieldLead.whatsappNumber
                                ).slice(0, 10)
                              : "-"}
                          </TableCell>
                          <TableCell
                            align="left"
                            title={row.employerFieldLead.emailId}
                          >
                            {textTruncate(row.employerFieldLead.emailId, 25)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>

          <div>
            <div className="d-flex justify-content-center align-items-center mb-3 position-absolute bottom-0 start-50 translate-middle-x">
              <Stack spacing={1}>
                <Pagination
                  count={pageDetails.totalPage}
                  shape="rounded"
                  onChange={(e, value) => ChangePageSize("page", value)}
                  variant="outlined"
                  color="success"
                  boundaryCount={1}
                  siblingCount={0}
                />
              </Stack>
            </div>
          </div>
        </div>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleLoaderClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
};

export default EmployerFieldLeads;
