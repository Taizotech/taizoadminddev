import logo from "../assets/images/brand-logo.png";
import styles from "./top_nav.module.css";
import { Link } from "react-router-dom";
import Notification from "./notifications";
// import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { navBarActions } from "../redux-store/store";
// import stylejob from "../../src/pages/Filter/Jobs/components/jobList.module.scss";
// import JobFilterCointainer from "../pages/Filter/Jobs/jobFilterContainer";
const TopNavBar = (props) => {
  const Dispatch = useDispatch();
  const sideBar = useSelector((state) => state.navBar.showSidebar);
  // console.log(sideBar);
  function HandleLogOUt() {
    localStorage.removeItem("logged_in");
    props.handleLogin();
  }

  function handelSideBar() {
    Dispatch(navBarActions.showSideBar(!sideBar));
  }
  const logged_in = localStorage.getItem("logged_in");
  return (
    <>
      <div className={`${styles.top_nav}`}>
        {/* ${JobFilterCointainer ? stylejob.moveContent : ""} */}
        <div className="container-fluid">
          <div className="row">
            <div className={`col-2 col-md-1 ${styles.content_left}`}>
              {logged_in && (
                <IconButton
                  onClick={() => {
                    handelSideBar();
                  }}
                  // data-bs-toggle="offcanvas"
                  // data-bs-target="#staticBackdrop"
                  // aria-controls="staticBackdrop"
                >
                  {/* <MenuIcon fontSize="large" /> */}
                  {sideBar ? (
                    <CloseIcon fontSize="large" />
                  ) : (
                    <MenuIcon fontSize="large" />
                  )}
                </IconButton>
              )}

              {/* {logged_in && (
                <div className="img_wrp">
                  <img src={logo} alt="logo" />
                </div>
              )} */}
            </div>
            <div className={`col-10 col-md-11 ${styles.content_right}`}>
              <ul className=" d-flex flex-row">
                {/* <li>{logged_in && <Link to="/home">Home</Link>}</li> */}
                {logged_in && (
                  <>
                    <li className={`${styles.Notification} me-4`}>
                      <Notification />
                    </li>
                    <li
                      onClick={HandleLogOUt}
                      className={`rounded-3 ${styles.log_out1}`}
                    >
                      <button className="btn btn-danger">Log out</button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNavBar;
