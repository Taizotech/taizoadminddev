/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { MyModal } from "../../utility";
import ModalContainer from "../../components/modal_popup";
import { useNavigate } from "react-router-dom";
import { GetAdminDetailsByID } from "../../apiServices";

const AccountDeactivationMessage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminID = localStorage.getItem("adminID");

    GetAdminDetailsByID(adminID).then((data) => {
      if (!data.admin.is_deactivate) {
        navigate("/login");
      }
    });
  }, []);
  return (
    <div>
      <MyModal>
        <ModalContainer
          childComponent={
            <>
              {" "}
              <div className="text-center p-2">
                <h1>Your Account Has Been Deactivated !</h1>
                <p>
                  We're sorry to inform you that your account has been
                  deactivated. If you believe this is a mistake or have any
                  questions, please contact our support team at{" "}
                  <a href="mailto:info@taizo.in">info@taizo.in</a>.
                </p>
              </div>
            </>
          }
        />
      </MyModal>
    </div>
  );
};

export default AccountDeactivationMessage;
