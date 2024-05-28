/* eslint-disable no-useless-concat */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import ModalContainer from "../../components/modal_popup";
import PopupBody from "./company_details_popup";
import { KycVerifyPopup } from "./company_details_popup";
import { TimeAgo } from "../../utility";
import companylogo from "../../assets/images/Company-Logo.png";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { base_url } from "../../App";
import { styled } from "@mui/system";

const StyledTableHead = styled(TableHead)({
  position: "relative",
  zIndex: 1,
  backgroundColor: "blue",
  color: "gray",
  padding: "10px !important",
});

const columns = [
  { id: "company_logo", label: "Logo", width: 10 },
  { id: "company_name", label: "Company Name", width: 10 },
  {
    id: "Mobile number",
    label: "Mobile number",
    width: 10,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "kyc_number",
    label: "KYC number",
    width: 30,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  // {
  //   id: "kyc_status",
  //   label: "KYC status",
  //   width: 10,
  //   align: "right",
  //   format: (value) => value.toLocaleString("en-US"),
  // },
  {
    id: "kyc_verify",
    label: "Action",
    width: 30,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

export default function StickyHeadTable() {
  const [company_details, setCompany_details] = useState([]);

  const [refreshComponent, setRefreshComponent] = useState(0);

  const [company_data, setCompany_data] = useState({
    data: null,
  });
  const [filterPage, setFilterPage] = React.useState({
    page: 0,
    startDate: "2000-01-01",
    endDate: "2030-01-01",
  });

  const pageCount = useRef(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const [showPopup, setShowPopup] = useState(false);
  const [showVerifyKycPopup, setShowVerifyKycPoppup] = useState({
    show: false,
    status: "",
    data: {},
  });

  const rows = company_details;
  let adminID = localStorage.getItem("adminID");
  function GetCompanyDetails() {
    fetch(
      `${base_url}/viewKYCDocuments?page=${filterPage.page}&start_date=${filterPage.startDate}&end_date=${filterPage.endDate}&size=10`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setTotalRecords(Math.floor(data.recordsTotal / 10));
        setCompany_details(data.data);
      });
  }

  useEffect(() => {
    // GetKycDetailsLis(filterPage).then((data) => {
    //   setTotalRecords(Math.floor(data.recordsTotal / 10));
    //   setCompany_details(data.data);
    // });
    GetCompanyDetails();
  }, [refreshComponent, filterPage]);

  // console.log(company_details);

  const handleChangePage = (data) => {
    // console.log();
    let totalPages = totalRecords;
    if (data == "next" && pageCount.current < totalPages) {
      pageCount.current = pageCount.current + 1;
      setFilterPage((val) => ({ ...val, page: pageCount.current }));
    } else if (data == "prev" && !pageCount.current == 0) {
      pageCount.current = pageCount.current - 1;
      setFilterPage((val) => ({ ...val, page: pageCount.current }));
    }
  };

  function Handle_company(data) {
    setCompany_data((val) => ({ ...val, data }));
    setShowPopup(true);
    GetCompanyDetails();
    // console.log(data.companyName);
  }

  function handle_popup(data) {
    setShowPopup(!data);
    setShowVerifyKycPoppup((val) => ({
      ...val,
      show: !data,
    }));
  }

  function HandleVerifyKyc(emp_id) {
    let settings = {
      method: "POST",
    };

    fetch(
      `${base_url}/verifyKyc?eid=${emp_id}&admin_id=${adminID}`,
      settings
    ).then(() => {
      // console.log(data);
      setRefreshComponent(refreshComponent + 1);
      setShowVerifyKycPoppup((val) => ({
        ...val,
        show: false,
      }));
      setShowPopup(false);
    });
  }

  function HandleRejectKyc(emp_id) {
    let settings = {
      method: "POST",
    };

    fetch(`${base_url}/rejectKyc?eid=${emp_id}`, settings).then(() => {
      // console.log(data);
      setRefreshComponent(refreshComponent + 1);
      setShowVerifyKycPoppup((val) => ({
        ...val,
        show: false,
      }));
      setShowPopup(false);
    });
  }

  useEffect(() => {
    // console.log(company_data);
  }, [company_data]);

  return (
    <>
      {/* <Paper sx={{ width: "100%", overflow: "hidden", zIndex: 1 }}> */}
      <TableContainer
        sx={{
          maxHeight: "65vh",
          // "@media (max-width: 600px)": {
          //   maxHeight: "50vh",
          // },
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <StyledTableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  // align={column.align}
                  style={{
                    width: column.width,
                    // fontWeight: 200,
                    backgroundColor: "rgb(219, 219, 219)",
                    color: "gray",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow
                  onClick={() => {
                    Handle_company(row);
                  }}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                >
                  <TableCell style={{ cursor: "pointer" }}>
                    <img
                      style={{ width: "50px", height: "50px" }}
                      src={
                        row.companyLogo != null ? row.companyLogo : companylogo
                      }
                      alt="Company Logo"
                    />
                  </TableCell>
                  <TableCell
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      Handle_company(row);
                    }}
                  >
                    {row.companyName}
                  </TableCell>
                  <TableCell>{row.mobileNumber}</TableCell>
                  <TableCell>
                    <a
                      href={`https://services.gst.gov.in/services/searchtp?GstInNo=${row.regProofNumber}&PanNum=AECFS8992M`}
                      target="_blank"
                    >
                      {row.regProofNumber}
                    </a>
                  </TableCell>
                  {/* <TableCell align="center">{row.kycStatus}</TableCell> */}
                  <TableCell>
                    <div
                      className="d-grid justify-content-end mb-2"
                      style={{ marginTop: -10 }}
                    >
                      <TimeAgo dateValue={row.createdTime} /> ago
                    </div>
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      // startIcon={<VerifiedUserIcon />}
                      onClick={(event) => {
                        // HandleVerifyKyc(row.id);
                        event.stopPropagation();
                        setShowVerifyKycPoppup((val) => ({
                          ...val,
                          show: true,
                          status: "verify",
                          data: { row },
                        }));
                      }}
                    >
                      verify
                    </Button>

                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      // startIcon={<DeleteIcon />}
                      sx={{ mx: 2 }}
                      onClick={(event) => {
                        // HandleRejectKyc(row.id);
                        event.stopPropagation();

                        row.kycStatus != "R" &&
                          setShowVerifyKycPoppup((val) => ({
                            ...val,
                            show: true,
                            status: "reject",
                            data: { row },
                          }));
                      }}
                    >
                      {row.kycStatus != "R" ? "Reject" : "Rejected"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="d-flex justify-content-end my-2 align-items-center ">
        <div>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            startIcon={<NavigateBeforeIcon />}
            sx={{ mx: 3, pr: 2 }}
            onClick={() => {
              handleChangePage("prev");
            }}
          >
            Prev
          </Button>
          <span className="mt-2">
            {pageCount.current + " " + "of" + " " + totalRecords}
          </span>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            endIcon={<NavigateNextIcon />}
            sx={{ mx: 3, pl: 2 }}
            onClick={() => {
              handleChangePage("next");
            }}
          >
            Next
          </Button>
        </div>
      </div>
      {/* </Paper> */}
      {showPopup && (
        <ModalContainer
          childComponent={
            <PopupBody
              handle_popup={handle_popup}
              content={company_data}
              action={{ reject: HandleRejectKyc, verify: HandleVerifyKyc }}
            />
          }
        />
      )}

      {showVerifyKycPopup.show && (
        <ModalContainer
          childComponent={
            <KycVerifyPopup
              handle_popup={handle_popup}
              data={showVerifyKycPopup.data}
              status={showVerifyKycPopup.status}
              action={
                showVerifyKycPopup.status === "reject"
                  ? HandleRejectKyc
                  : HandleVerifyKyc
              }
            />
          }
        />
      )}
    </>
  );
}
