import React, { useState } from "react";
import SLAPage1 from "./SlaDocument1";
import SLAPage2 from "./SlaDocument2";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { MyModal } from "../utility";
import ModalContainer from "../components/modal_popup";
import { PostSla } from "../../src/apiServices";
import SuccessTick from "../components/success_tick";

const SLADocument = ({
  companyName,
  empLeadId,
  replacementmonth,
  paymentType,
  recruitmentFeePercentage,
  paymentTerms,
  ccEmailArray,
  replacementPolicy,
  fromAdminId,
  toEmail,
  oncloseSLA,
}) => {
  const [showsuccess, setShowSuccess] = useState(false);
  const [enableSubmit, setenableSubmit] = useState(false);
  const [showError, setShowError] = useState(false);
  const captureSLA = async () => {
    setenableSubmit(true);
    const containers = document.querySelectorAll(
      ".slaContainer1, .slaContainer2"
    );

    const doc = new jsPDF("p", "mm", "a4");
    let yOffset = 0;

    for (let index = 0; index < containers.length; index++) {
      const container = containers[index];
      const containerWidth = doc.internal.pageSize.getWidth();
      const containerHeight = doc.internal.pageSize.getHeight();

      if (index > 0) {
        doc.addPage();
        yOffset = 0;
      }

      const canvas = await html2canvas(container, { scale: 2.5 });
      const imageData = canvas.toDataURL("image/jpeg", 5.0);

      doc.addImage(
        imageData,
        "JPEG",
        0,
        yOffset,
        containerWidth,
        containerHeight
      );
      yOffset += containerHeight;

      if (index === containers.length - 1) {
        const formData = {
          fromAdminId: fromAdminId,
          empLeadId: empLeadId,
          toEmail: toEmail,
          paymentType: paymentType,
          recruitmentFeePercentage: recruitmentFeePercentage,
          paymentTerms: paymentTerms,
          replacementPolicy: replacementPolicy,
          ccEmailId: ccEmailArray,
          paymentDuration: replacementmonth,
        };

        const pdfBlob = doc.output("blob");

        PostSla(formData, pdfBlob).then((data) => {
          if (
            data.message == "An error occurred while processing the request" ||
            data.code == 500
          ) {
            setShowError(true);
            setTimeout(() => {
              setShowError(false);
              setenableSubmit(false);
            }, 1000);
            return;
          } else {
            setShowSuccess(true);
            setTimeout(() => {
              setShowSuccess(false);
              oncloseSLA();
              setenableSubmit(false);
            }, 3000);
          }
        });
      }
    }
  };

  return (
    <>
      <div style={{ height: "80vh", overflow: "auto" }}>
        <div className="slaContainer1">
          <SLAPage1 companyName={companyName} />
        </div>
        <div className="slaContainer2">
          <SLAPage2
            replacementmonth={replacementmonth}
            paymentType={paymentType}
            recruitmentFeePercentage={recruitmentFeePercentage}
            paymentTerms={paymentTerms}
            companyName={companyName}
          />
        </div>

        <button
          className="btn btn-success mt-5"
          onClick={captureSLA}
          disabled={enableSubmit}
        >
          Send SLA
        </button>
      </div>
      {/* <div>
        <div className="slaContainer1">
          <SLAPage1 />
        </div>
        <div className="slaContainer2">
          <SLAPage2 />
        </div>

        <div className="btn btn-success mt-5" onClick={captureSLA}>
          Download
        </div>
      </div> */}
      {showsuccess && (
        <MyModal>
          <ModalContainer
            zIndex={5500}
            childComponent={
              <>
                <SuccessTick HeadText="Successfully" />
              </>
            }
          />
        </MyModal>
      )}
      {showError && (
        <MyModal>
          <ModalContainer
            zIndex={5500}
            childComponent={
              <>
                <p className="p-2">Something went wrong</p>
              </>
            }
          />
        </MyModal>
      )}
    </>
  );
};

export default SLADocument;
