/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { GetAllsdminDetails, GetAnalyticsFunnel } from "../../apiServices";
import { useSelector } from "react-redux";
import { MyModal } from "../../utility";
import ModalContainer from "../../components/modal_popup";
import SuperAdminFunnelPage1 from "./Admin2Funnel";
import { AiOutlineClose } from "react-icons/ai";
import funnelimg from "../../assets/images/Screenshot 2024-01-31 155124.png";
import FunnelFilter from "./FunnelFilter";
import SuperAdminFunnelPage from "./SuperAdminFunnelPage";
import LeadToRegister from "./LeadToRegister";
import ScheduledToAttending from "./ScheduledToAttending";
import OfferRejectToJoined from "./OfferRejectToJoined";
import { useDispatch } from "react-redux";
import { CandidateFunnelActions } from "../../redux-store/store";

function CandidateFunnel() {
  const Dispatch = useDispatch("");

  const filterDetails = useSelector(
    (state) => state.CandidateFunnelDetails.CandidateFunnelFilter
  );
  const StageFunnel = useSelector(
    (state) => state.CandidateFunnelDetails.CandidateFunnelFilter.stage
  );
  const [adminList, setAdminList] = useState([]);
  const [adminStageList, setAdminStageList] = useState({});
  const [adminName, setAdminName] = useState({
    id: "",
    AdminName: "",
  });
  const adminId = localStorage.getItem("adminID");
  const adminDetailsRole = useSelector((state) => state.adminDetails);
  let isSuperAdmin = adminDetailsRole.roleID == 1;

  useEffect(() => {}, [filterDetails]);
  useEffect(() => {
    if (isSuperAdmin && StageFunnel === 0) {
      GetAnalyticsFunnel(" ", filterDetails).then((data) => {
        setAdminList(data);
      });
      return;
    } else {
      GetAnalyticsFunnel(" ", filterDetails).then((data) => {
        setAdminStageList(data);
        console.log(data, "stage converstion");
      });
    }

    GetAllsdminDetails().then((data) => {
      console.log(data, "All admin details");
      const adminNames = data.map((item) => item.userName);
      const adminIds = data.map((item) => item.id);
      setAdminName((prev) => ({
        ...prev,
        id: adminIds,
        AdminName: adminNames,
      }));
      // setAdminId(adminIds);
    });
  }, [isSuperAdmin, filterDetails, StageFunnel]);

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (adminId != 1) {
      GetAnalyticsFunnel(adminId, filterDetails).then((data) => {
        setAdminList(data, "setadmin");
        setAdminStageList(data);
        console.log("----------------data-------------------", data);
        // Process the data if needed
      });
    }
    GetAllsdminDetails().then((data) => {
      console.log(data, "All admin details");
      const adminNames = data.map((item) => item.userName);
      const adminIds = data.map((item) => item.id);
      setAdminName((prev) => ({
        ...prev,
        id: adminIds,
        AdminName: adminNames,
      }));
      // setAdminId(adminIds);
    });
  }, [adminId, filterDetails]);
  const [showFunnel, setShowFunnel] = useState({ show: false, data: {} });
  function ShowFunnel(data) {
    setShowFunnel((prev) => ({ ...prev, show: true, data: data }));
    console.log(data, "unais");
  }
  function CloseFunnel(data) {
    setShowFunnel((prev) => ({ ...prev, show: false, data: data }));
  }
  function fetchDataByAdminId(adminId) {
    GetAnalyticsFunnel(adminId, filterDetails).then((data) => {
      setAdminList(data, "setadmin");
      setAdminStageList(data);
      ShowFunnel(data);
      console.log("----------------data-------------------", data);
      // Process the data if needed
    });
  }

  return (
    <div>
      <div>
        {" "}
        <div className="mb-3 ms-2 " style={{ backgroundColor: "#e7e4e4d6" }}>
          <FunnelFilter />
        </div>{" "}
        {isSuperAdmin && (
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-8 d-flex align-items-center justify-content-center">
                {StageFunnel === 0 && <SuperAdminFunnelPage />}
                {StageFunnel === 1 && <LeadToRegister />}
                {StageFunnel === 2 && <ScheduledToAttending />}
                {StageFunnel === 3 && <OfferRejectToJoined />}
              </div>

              <div className="col-sm-4">
                <div
                  className="container-fluid"
                  style={{ height: "70vh", overflow: "auto" }}
                >
                  <div className="row ">
                    {StageFunnel === 0
                      ? (adminList || []).map((el, i) => (
                          <div
                            key={i}
                            className="card col-sm-5 mb-2 me-2"
                            onClick={() => {
                              ShowFunnel(el);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="px-3 text-center">
                              <p className="mt-1">
                                {/* Admin {i} */}
                                <b className={``}>
                                  {
                                    adminName.AdminName[
                                      adminName.id.indexOf(el.adminId)
                                    ]
                                  }
                                </b>
                              </p>
                              <img src={funnelimg} alt="" width={120} />
                            </div>
                          </div>
                        ))
                      : Array.isArray(adminName.id) &&
                        adminName.id.map((el, i) => (
                          <>
                            <div
                              key={i}
                              className="card col-sm-5 mb-2 me-2"
                              onClick={() => {
                                fetchDataByAdminId(el);
                                Dispatch(
                                  CandidateFunnelActions.setAdminIDName(
                                    adminName.AdminName[i]
                                  )
                                );
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="px-3 text-center">
                                <p className="mt-1">
                                  {/* Admin {i} */}
                                  <b className={``}>{adminName.AdminName[i]}</b>
                                </p>
                                <img src={funnelimg} alt="" width={120} />
                              </div>
                            </div>
                          </>
                        ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {adminId != 1 && (
          <div>
            {/* <SuperAdminFunnelPage1  /> */}
            {StageFunnel === 0 ? (
              <SuperAdminFunnelPage1 data={adminList} />
            ) : (
              <SuperAdminFunnelPage1 data={adminStageList} />
            )}
          </div>
        )}
      </div>
      {showFunnel.show && (
        <>
          <MyModal>
            <ModalContainer
              childComponent={
                <>
                  <div className="d-flex justify-content-end">
                    <div
                      className="btn btn-danger "
                      onClick={() => CloseFunnel()}
                    >
                      <AiOutlineClose />
                    </div>
                  </div>
                  <SuperAdminFunnelPage1 data={showFunnel.data} />
                  {/* <SuperAdminFunnelPage1 data={showFunnel.data} /> */}
                </>
              }
            />
          </MyModal>
        </>
      )}
    </div>
  );
}

export default CandidateFunnel;
