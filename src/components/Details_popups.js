import { useSelector } from "react-redux";
import { MyModal } from "../utility";
import ModalContainer from "./modal_popup";
import JobDetailsPopup from "./ModalPopups/jobDetailsPopup";
import CandidateDetailsview from "./ModalPopups/CandidateDetails/CandidateDetailsview";
import CandidateLeadDetailsview from "./ModalPopups/CandidateDetails/CandidateLeadDetailsview";
import EmployerDetailsView from "./ModalPopups/EmployerPopup/EmployerDetailsview";

const DetailsPopups = () => {
  const detailsPopup = useSelector((state) => state.commonPopup);
  console.log(detailsPopup);
  return (
    <>
      <div>
        {detailsPopup.candidateDetails.showPopup && (
          <MyModal>
            <ModalContainer
              childComponent={
                detailsPopup.candidateDetails.type === "RegisterCandidate" ? (
                  <CandidateDetailsview
                    Id={detailsPopup.candidateDetails.Id}
                    type={detailsPopup.candidateDetails.type}
                    textHeading={"Candidate"}
                  />
                ) : (
                  <CandidateLeadDetailsview
                    Id={detailsPopup.candidateDetails.Id}
                    type={detailsPopup.candidateDetails.type}
                    textHeading={"Candidate Lead"}
                  />
                )
              }
            />
          </MyModal>
        )}
        {detailsPopup.jobDetails.showPopup && (
          <MyModal>
            {/* <JobsDetailsView Id={detailsPopup.jobDetails.Id} /> */}
            <JobDetailsPopup Id={detailsPopup.jobDetails.Id} />
          </MyModal>
        )}

        {detailsPopup.employerDetails.showPopup && (
          <MyModal>
            <EmployerDetailsView Id={detailsPopup.employerDetails.Id} />
          </MyModal>
        )}

        {/* {detailsPopup.FBleadDetails.showPopup && (
          <MyModal>
            <FBLeadPopup Id={detailsPopup.FBleadDetails.Id} />
          </MyModal>
        )} */}
      </div>
    </>
  );
};

export default DetailsPopups;
