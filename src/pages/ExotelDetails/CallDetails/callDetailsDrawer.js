import * as React from "react";
import Drawer from "@mui/material/Drawer";

import { showHideDetailsActions } from "../../../redux-store/store";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/CloseSharp";

export default function CallDetailsDrawer({ open, data }) {
  const callDetails = useSelector(
    (state) => state.showHideDetails.exotel.callDetails
  );

  const Dispatch = useDispatch();

  const closeDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    Dispatch(showHideDetailsActions.setExotelCallDetails(false));
  };

  return (
    <div>
      <Drawer
        anchor={"right"}
        open={callDetails.show}
        onClose={(e) => {
          closeDrawer(e);
        }}
      >
        <div style={{ maxWidth: "600px" }} className="row p-3 mt-4">
          <div className="d-grid justify-content-end ">
            <button>
              {" "}
              <CloseIcon />
            </button>
          </div>
          <div className="col-sm-6">
            <p>
              <strong>From:</strong>Akshay Suresh(07806805801)
            </p>
          </div>
          <div className="col-sm-6">
            <p>
              <strong>To :</strong> 09841019631 Virtual Number
            </p>
            <p>
              <strong>Total Talk Time:</strong> 0s Start Time: Tue, 19 Sep 2023
            </p>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
