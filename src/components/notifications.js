/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import style from "./notifications.module.css";
import commonStyle from "./commonStyles.module.css";
import { useState, useRef } from "react";
import { UserNotificationDtails, SetNotiReadStatus } from "../apiServices";
import { useDispatch } from "react-redux";
import { notiDetailsActions } from "../redux-store/store";
import notificationSound from "../assets/audio/notificationSound.wav";
import { useEffect } from "react";
import { TimeAgo } from "../utility";
import refreshIcon from "../assets/images/refresh-page-option.png";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import { debounce } from "lodash";
import { BsFillBellFill } from "react-icons/bs";

const Notification = () => {
  const notificationCount = localStorage.getItem("newNotiCount");
  const Dispatch = useDispatch();
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationDetails, setNotificationList] = useState({
    notificationList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const notificationLength = useRef(
    notificationCount != null ? notificationCount : 0
  );
  const [showNotiRedDot, setShowNotiRedDot] = useState(false);
  // let showRedDot = false;
  // const showNotiRedDot = useRef(false);

  // document.onclick = function (event) {
  //   // console.log(event.target.classList.contains("notificationsBtn"));
  //   if (
  //     !event.target.classList.contains("notificationsBtn") &&
  //     openNotification
  //   ) {
  //     setOpenNotification(!openNotification);
  //     setShowNotiRedDot(false);
  //   }
  // };

  const audio = new Audio(notificationSound);
  const notificationCallBack = () => {
    UserNotificationDtails(notificationDetails.currentPage).then((data) => {
      notificationLength.current = data.data.totalElements;

      if (localStorage.getItem("newNotiCount") < notificationLength.current) {
        // audio.autoplay = true;
        audio.play();

        setTimeout(() => {
          audio.pause();
        }, 5000);

        audio.addEventListener("error", (event) => {
          console.log("Error loading audio file:", event);
        });
        localStorage.setItem("newNotiCount", notificationLength.current);
        setShowNotiRedDot(true);
        // console.log(showNotiRedDot);
      }

      localStorage.setItem("newNotiCount", notificationLength.current);

      setNotificationList((prev) => ({
        ...prev,
        totalPage: data.data.totalPages,
      }));
    });
  };

  // useEffect(() => {
  //   // console.log([...modalFilterObj.current] == [...filterObj]);
  //   // debounce is used to prevent frequent API calls
  //   // it only call after 300 ms
  //   const debouncedGetNotifications = debounce(() => {
  //     setInterval(() => {
  //       notificationCallBack();
  //     }, 10000);
  //   }, 300);

  //   debouncedGetNotifications();

  //   return () => {
  //     // Cleanup function to cancel the debounce timer
  //     debouncedGetNotifications.cancel();
  //   };
  // }, []);

  function HandleOpen(e) {
    UserNotificationDtails(0).then((data) => {
      // console.log(data);
      setNotificationList((prev) => ({
        ...prev,
        notificationList: data.data.content,
        totalPage: data.data.totalPages,
      }));
    });
    // console.log("heooo");

    setOpenNotification(!openNotification);
    setShowNotiRedDot(false);
    localStorage.setItem("newNotiCount", notificationLength.current);
  }

  function refreshNotification() {
    UserNotificationDtails(0).then((data) => {
      setNotificationList((prev) => ({
        ...prev,
        notificationList: data.data.content,
        totalPage: data.data.totalPages,
      }));
    });
    setShowNotiRedDot(false);
  }

  function HandleShowNoti(id) {
    SetNotiReadStatus(id);
    Dispatch(notiDetailsActions.setNotiDetail(id));
    Dispatch(notiDetailsActions.showDetails(id));
  }
  function changePage(event, value) {
    // to set page number

    setNotificationList((prev) => ({
      ...prev,
      currentPage: value - 1,
    }));
  }

  // useEffect(() => {
  //   UserNotificationDtails(notificationDetails.currentPage).then((data) => {
  //     setNotificationList((prev) => ({
  //       ...prev,
  //       notificationList: data.data.content,
  //       totalPage: data.data.totalPages,
  //       currentPage: data.data.pageable.pageNumber,
  //     }));
  //   });
  // }, [notificationDetails.currentPage]);

  // console.log(notificationList);

  return (
    <>
      <div className="d-inline" style={{ position: "relative" }}>
        <span
          onClick={() => {
            HandleOpen();
          }}
          className={`notificationsBtn ${showNotiRedDot ? style.redDot : ""}`}
          id="notificationBell"
        >
          {/* <img width={20} className={`notificationsBtn`} src={bell} alt="" />
           */}
          <BsFillBellFill className="" style={{ color: "#bbb" }} />
        </span>

        {openNotification && (
          <div className={`${style.notification_container} `}>
            <div className={`${style.noti_list_wrp}`}>
              <div
                style={{}}
                className="d-flex flex-row justify-content-between pt-2 px-2"
              >
                <h4 className="text-white">Notifications</h4>

                <span className={``}>
                  <img
                    onClick={() => {
                      refreshNotification();
                    }}
                    width="20px"
                    className={` me-4  notificationsRefresh notificationsBtn ${
                      showNotiRedDot ? style.redDot : ""
                    }`}
                    src={refreshIcon}
                    alt="Refresh"
                  />
                  <span
                    onClick={() => {
                      HandleOpen();
                    }}
                  >
                    <CloseIcon></CloseIcon>
                  </span>
                </span>
              </div>

              <div
                className={`${commonStyle.scrollbar_primary}  `}
                style={{ maxHeight: "450px" }}
              >
                <div className={`${commonStyle.force_overflow} `}>
                  {notificationDetails.notificationList.length == 0 &&
                    "No notifications"}
                  {notificationDetails.notificationList.length != 0 && (
                    <div>
                      {notificationDetails.notificationList.map((el, index) => (
                        <div
                          onClick={() => {
                            HandleOpen();
                            HandleShowNoti(el.id);
                          }}
                          className={` ${style.notification_item} ${
                            el.notificationRead ? style.readed : ""
                          }`}
                          key={index}
                        >
                          <div
                            className="d-grid justify-content-end"
                            style={{
                              marginTop: "-5px",
                              marginBottom: "-20px",
                            }}
                          >
                            <TimeAgo dateValue={el.callTime} /> ago
                          </div>

                          <div className="mt-3">
                            New <strong>{el.eventType}</strong> !!
                            <br />
                            Contact Number: <strong>{el.mobileNumber}</strong>
                          </div>
                          <div
                            style={{
                              marginTop: "-20px",
                              marginBottom: "7px",
                            }}
                            className="d-grid justify-content-end"
                          >
                            {el.notificationRead && <span>Seen</span>}
                            {!el.notificationRead && (
                              <span className={`${style.newNotiDot}`}>New</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-light">
                <div className="row">
                  <div className="col-sm-12 d-flex justify-content-center">
                    <Stack spacing={1}>
                      <Pagination
                        onChange={changePage}
                        count={notificationDetails.totalPage}
                      />
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
