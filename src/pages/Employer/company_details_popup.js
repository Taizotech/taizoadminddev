/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable eqeqeq */
import commonStyle from "../../assets/common.module.scss";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import companylogo from "../../assets/images/Company-Logo.png";

import styled from "styled-components";

const CompanyDetailsWrp = styled.div`
  width: 500px;
  height: auto;
  padding: 5px 20px;
`;

const CloseBtn = styled.div`
  margin-bottom: -20px;
`;

const CompanyLogo = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 10px;
  margin: 8px;
`;

export function KycVerifyPopup(props) {
  try {
    // console.log(props);
    return (
      <>
        <div>
          <h6>
            Do you want to {props.status == "reject" ? "Reject" : "Verify"}
            <br />
            {props.data.row.companyName}
          </h6>
          <div className="row">
            <div className="col-6 d-grid justify-content-center">
              <button
                className={`${commonStyle.cancel_btn} mt-3`}
                onClick={() => {
                  props.handle_popup(true);
                }}
              >
                No
              </button>
            </div>
            <div className="col-6">
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={() => {
                  props.action(props.data.row.id);
                }}
                sx={{ mt: 2 }}
              >
                yes
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    // console.log(error);
  }
}

export default function PopupBody(props) {
  //
  try {
    // console.log(props.content.data.companyName);
    let data = props.content.data;

    return (
      <>
        <CompanyDetailsWrp>
          <CloseBtn className=" d-grid justify-content-end ">
            <span
              className={`${commonStyle.close_btn}`}
              onClick={() => {
                props.handle_popup(true);
              }}
            ></span>
          </CloseBtn>
          <div className="d-grid justify-content-center">
            <h5 className="text-center">
              <strong>{data.companyName}</strong>
            </h5>
            <CompanyLogo
              className="d-block mx-auto"
              src={data.companyLogo != null ? data.companyLogo : companylogo}
              alt="Company Logo"
            />
          </div>
          <div>
            <div className="row">
              <div className="col-4">
                <strong>Employer Id</strong>
              </div>
              <div className="col-8">
                <p>{data.id}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <strong>Created Time</strong>
              </div>
              <div className="col-8">
                <p>{data.createdTime.replace("T", " ").split(".").shift()}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <strong>GST Number</strong>
              </div>
              <div className="col-8">
                <a
                  href={`https://services.gst.gov.in/services/searchtp?GstInNo=${data.regProofNumber}&PanNum=AECFS8992M`}
                  target="_blank"
                >
                  {" "}
                  <p>{data.regProofNumber}</p>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <strong>Name</strong>
              </div>
              <div className="col-8">
                <p>{data.contactPersonName}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <strong>Email</strong>
              </div>
              <div className="col-8">
                <p>{data.emailId}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <strong>Location</strong>
              </div>
              <div className="col-8">
                <p>{data.address}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4"></div>
              <div className="col-8">
                <div className="row">
                  <div className="col-6">
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        data.kycStatus != "R" && props.action.reject(data.id);
                      }}
                    >
                      {data.kycStatus != "R" ? "Reject" : "Rejected"}
                    </Button>
                  </div>
                  <div className="col-6">
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      startIcon={<VerifiedUserIcon />}
                      onClick={() => {
                        props.action.verify(data.id);
                      }}
                    >
                      verify
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CompanyDetailsWrp>
      </>
    );
  } catch (err) {
    // console.log(err);
  }
}
