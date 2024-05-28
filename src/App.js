/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";

import RoutesWrp from "./routes";
import ModalContainer from "./components/modal_popup";

import "./App.css";
import { RolesAndAccessActions, notiDetailsActions } from "./redux-store/store";
import { useDispatch, useSelector } from "react-redux";
import { GetNotificationDetail, GetRolesAndAccess } from "./apiServices";
import GetNotificationComponent from "./components/notiDetailTemplate";

import DetailsPopups from "./components/Details_popups";

import AdminAccess from "./pages/AdminDetails/accessControl";

export const clevertap_id = process.env.REACT_APP_CleverTap_id;
console.log(clevertap_id);

export const profileBaseUrl =
  process.env.REACT_APP_CANDIDATE_REGISTARTION_BASE_URL;

export const base_url = process.env.REACT_APP_BASE_URL_ADMIN;
export const base_url_taizo = process.env.REACT_APP_BASE_URL;
export const base_url_node = process.env.REACT_APP_NODE_BASE_URL;
export const interview_channeltype =
  process.env.REACT_APP_INTERVIEW_SCHEDULE_channelType;
export const interview_channelid =
  process.env.REACT_APP_INTERVIEW_SCHEDULE_channelId;
console.log(base_url_taizo);
console.log(base_url);
console.log(interview_channeltype);
console.log(interview_channelid);

export const webConsoleBaseUrl =
  process.env.REACT_APP_EMPLOYER_CONSOLE_BASE_URL;

function App() {
  // const [showNotiDetails, setshowNotiDetails] = useState(true);

  const Dispatch = useDispatch();

  const showNotiData = useSelector(
    (state) => state.notifications.showNotiDetails
  );
  const notificationId = useSelector((state) => state.notifications.notiId);

  const adminAccess = useSelector((state) => state.RolesAndAccessDetails);

  useEffect(() => {
    console.log(adminAccess, "adminAccess------------------------------");
  }, [adminAccess]);

  useEffect(() => {
    GetRolesAndAccess().then((res) => {
      let roleName = res.role_name;
      let accessName = res.access_names;
      Dispatch(
        RolesAndAccessActions.setRoleAndAccess({
          roleName: roleName,
          accessNames: accessName,
        })
      );
    });
  }, []);

  const notificationDetail = useSelector(
    (state) => state.notifications.notificationDetail
  );

  useEffect(() => {
    GetNotificationDetail(notificationId)
      .then((data) => {
        if (data && data.data !== undefined) {
          console.log(data, "notiDetailsActions");
          Dispatch(notiDetailsActions.setNotiDetail(data.data));
        } else {
          console.error("Invalid data structure or missing 'data' property");
        }
      })
      .catch((error) => {
        console.error("Error in API call:", error);
      });
  }, [showNotiData]);

  return (
    <>
      <div className="">
        <div>
          <AdminAccess />
          <BrowserRouter>
            <RoutesWrp />
          </BrowserRouter>
        </div>
      </div>
      <div className="popUp_container">
        <div className={`${!showNotiData ? "d-none" : ""}`}>
          <ModalContainer
            childComponent={
              <GetNotificationComponent
                notificationDetail={notificationDetail}
              />
            }
          />
        </div>
        <div>
          {/* common details popup */}
          <DetailsPopups />
        </div>
      </div>
    </>
  );
}

export default App;
