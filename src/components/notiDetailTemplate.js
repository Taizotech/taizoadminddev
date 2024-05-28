/* eslint-disable react/jsx-pascal-case */
/* eslint-disable eqeqeq */
import { notiDetailsActions } from "../redux-store/store";
import { useDispatch } from "react-redux";
import { Ddmmmyyyy_date } from "../utility";
export default function GetNotificationComponent(props) {
  const Dispatch = useDispatch();
  const HandleClose = () => {
    // setshowNotiDetails(!showNotiDetails);
    Dispatch(notiDetailsActions.hideDetails());
  };
  const DetailsObj = props.notificationDetail;
  // console.log(DetailsObj);

  //   Object.entries(DetailsObj).forEach(function ([keys, value]) {
  //     // console.log(keys + ": " + value);
  //     let keyval = keys;
  //     details.push(`${keyval}: ${value}`);
  //   });

  // console.log(details);
  return (
    <>
      <div>
        <div
          style={{ marginTop: "-15px", minWidth: "350px" }}
          className="d-flex flex-row justify-content-between ps-2"
        >
          <h4 className="px-2 ">{DetailsObj.eventType} !!</h4>
          <button
            onClick={() => {
              HandleClose();
            }}
            type="button"
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>

        <div className="px-3">
          <div>
            {/* jobs  */}
            {DetailsObj.type == "Job" && (
              <>
                <span>
                  Company Name: <strong>{DetailsObj.companyName}</strong>
                </span>
                <br />
                <span>
                  Contact Person Name:{" "}
                  <strong>{DetailsObj.contactPersonName}</strong>
                </span>
                <br />
                <span>
                  Job Status: <strong>{DetailsObj.jobStatus}</strong>
                </span>
                <br />
                <span>
                  Experience: <strong>{DetailsObj.exp}</strong>
                </span>
                <br />
                <span>
                  Position: <strong>{DetailsObj.position}</strong>
                </span>
                <br />
                <span>
                  Location: <strong>{DetailsObj.location}</strong>
                </span>
                <br />
              </>
            )}
            {/* end of job details */}
            {/* company details */}
            {DetailsObj.type == "Employer" && (
              <>
                <span>
                  Company Name: <strong>{DetailsObj.companyName}</strong>
                </span>
                <br />
                <span>
                  Contact Person Name:
                  <strong>{DetailsObj.contactPersonName}</strong>
                </span>
                <br />
                <span>
                  Location: <strong>{DetailsObj.location}</strong>
                </span>
                <br />
              </>
            )}

            {/* end of company details */}

            {/* interview detail */}
            {DetailsObj.type == "Interview" && (
              <>
                <span>
                  Candidate Name: <strong>{DetailsObj.candidateName}</strong>
                </span>
                <br />
                <span>
                  Job Role: <strong>{DetailsObj.jobRole}</strong>
                </span>
                <br />
                <span>
                  Interview Date: <strong>{DetailsObj.interviewDate}</strong>
                </span>
                <br />
              </>
            )}
            {/* end of interview details */}

            {/* interview detail */}
            {DetailsObj.type == "Jobseeker" && (
              <>
                <span>
                  Candidate Name: <strong>{DetailsObj.candidateName}</strong>
                </span>
                <br />
                <span>
                  Job Role: <strong>{DetailsObj.jobRole}</strong>
                </span>
                <br />
              </>
            )}
            {/* end of interview details */}

            <span>
              Notification ID: <strong>{DetailsObj.id}</strong>
            </span>
            <br />

            <span>
              Mobile Number: <strong>{DetailsObj.mobileNumber}</strong>
            </span>
            <br />
            <span>
              Source: <strong>{DetailsObj.source}</strong>
            </span>
            <br />
            <span>
              {DetailsObj.idType}: <strong>{DetailsObj.referenceId}</strong>
            </span>
            <br />
            <span>
              Call Time: {DetailsObj.callTime}
              <strong>
                <Ddmmmyyyy_date dateValue={DetailsObj.callTime} />
              </strong>
            </span>
            <br />
          </div>
          {/* {details.map((el, index) => (
            <span className="d-block mt-1" key={index}>
              <strong className="text-secondary">
                {el.split(":").shift()}{" "}
              </strong>
              {" : "}
              {el.split(":").pop()}
            </span>
          ))} */}
        </div>
      </div>
    </>
  );
}
