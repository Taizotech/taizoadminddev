import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaUserAlt,
  // FaChartLine,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import {
  BsFillBriefcaseFill,
  BsFillBarChartFill,
  BsFillBuildingsFill,
  BsBarChartLineFill,
} from "react-icons/bs";
import { GiDiscussion } from "react-icons/gi";

// import {  } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";
import style from "./sidenavbar.module.scss";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./sidebarMenu";
// import Taizologo from "../../../assets/images/footer-logo.svg";
import Taizologo from "../../../assets/images/taizo-logo-img-_footer.svg";
import { AppBar, Tooltip, tooltipClasses } from "@mui/material";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
// import {} from '@mui/icons-material';
import { MenuItem } from "@mui/material";
import { Menu } from "@mui/material";
import Notification from "../../notifications";
import "../../commonactive.css";
// import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import ToggleSwitch from "../../Toggle/Toggle";
import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import { VscDebugConsole } from "react-icons/vsc";
import {
  PiTreeStructureBold,
  PiUserCircleBold,
  PiUserCirclePlusBold,
  PiUserListFill,
} from "react-icons/pi";
import { TbCalendarUp } from "react-icons/tb";
// const useStyles = makeStyles(() => ({
//   menuItem: {
//     "&:hover": {
//       backgroundColor: "yellow", // Green background color on hover
//       color: "white", // White text color on hover
//     },
//   },
// }));
const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip arrow {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
    padding: "10px",
    marginLeft: "15px",
    fontSize: "14px",
    backgroundColor: "#169c50",
    color: "#fff",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#169c50",
  },
});
const SideNavbar = ({ children }) => {
  const adminDetails = useSelector((state) => state.adminDetails);

  const adminAccess = useSelector((state) => state.RolesAndAccessDetails);

  let employerList = [
    "Employer Leads",
    "Employer Registered",
    "Employer KYC",
    "Employer Enquiry",
  ];

  let midSeniorList = [
    "Mid senior Candidate Sourcing",
    "Mid senior Candidate Lead",
    "Mid senior Candidate Screening",
    "Mid senior Candidate Resource",
  ];

  let jobList = ["Jobs", "Jobs Leads"];

  let candidateList = [
    "Candidate funnel",
    "Candidate Meta leads",
    "Candidate Leads",
    "Candidate Registered",
    "Candidate Interviews",
    "Candidate Joined",
  ];

  let adminAnalyticsList = ["Bar view"];

  let adminconfigList = ["Add job role,Add key skill"];

  let adminAccessList = adminAccess.accessNames;

  function arraysHaveSimilarElements(arr1, arr2) {
    // Using the some method to iterate over arr1 and check if any element is present in arr2
    return arr1.some((item) => arr2.includes(item));
  }

  // eslint-disable-next-line eqeqeq
  let isSuperAdmin = adminDetails.roleID == 1;
  let ProfilePic = adminDetails.ProfilePic;

  const routes = [
    // arraysHaveSimilarElements(adminAccessList, adminconfigList) &&
    // {
    //   // path: "/add_user",
    //   name: "Pipeline",
    //   icon: <PiTreeStructureBold style={{ rotate: "180deg" }} />,
    //   exact: true,
    //   subRoutes: [
    //     {
    //       path: "/CandidatePipeline",
    //       name: "New Lead",
    //       icon: <PiUserListFill style={{ fontSize: "18px" }} />,
    //     },
    //     {
    //       path: "/Interview_FollowUp1_Pipeline",
    //       name: "Follow Up 1",
    //       icon: <TbCalendarUp style={{ fontSize: "18px" }} />,
    //     },
    //     {
    //       path: "/Interview_FollowUp2_Pipeline",
    //       name: "Follow Up 2",
    //       icon: <TbCalendarUp style={{ fontSize: "18px" }} />,
    //     },
    //     {
    //       path: "/AttendingLead",
    //       name: "Attending Lead",
    //       icon: <GiDiscussion style={{ fontSize: "18px" }} />,
    //     },
    //     {
    //       path: "/interviewStatus",
    //       name: "Attended Lead",
    //       icon: <PiUserCirclePlusBold style={{ fontSize: "18px" }} />,
    //     },
    //   ],
    // },
    {
      path: "/CandidatePipelineTab",
      name: "Pipeline",
      icon: <PiTreeStructureBold />,
      exact: true,
    },
    isSuperAdmin && {
      path: "/superAdminTab",
      name: "Super Admin",
      icon: <RiAdminFill />,
      exact: true,
    },
    arraysHaveSimilarElements(adminAccessList, adminAnalyticsList) && {
      path: "/superAdminAnalytics",
      name: "Analytics",
      icon: <BsFillBarChartFill />,
      exact: true,
    },
    // !isSuperAdmin && {
    //   path: "/AdminAnalytics",
    //   name: "Analytics",
    //   icon: <BsFillBarChartFill />,
    // },
    // !isSuperAdmin && {
    //   path: "/profile_Dashboard",
    //   name: "Profile Dashboard",
    //   icon: <FaChartLine />,
    // },
    arraysHaveSimilarElements(adminAccessList, candidateList) && {
      path: "/CandidateTabsview",
      name: "Candidate",
      icon: <FaUserAlt />,
      exact: true,
    },
    arraysHaveSimilarElements(adminAccessList, midSeniorList) && {
      path: "/MidLevelSenior",
      name: "Mid/Senior Level",
      icon: <HiOutlineUserGroup />,
      exact: true,
    },
    arraysHaveSimilarElements(adminAccessList, employerList) && {
      path: "/EmployerTabsview",
      name: "Employer",
      icon: <BsFillBuildingsFill />,
      exact: true,
    },
    arraysHaveSimilarElements(adminAccessList, jobList) && {
      path: "/JobsTabsview",
      name: "Jobs",
      icon: <BsFillBriefcaseFill />,
      exact: true,
    },
    // arraysHaveSimilarElements(adminAccessList, jobList) &&
    {
      path: "/Bug/NewFeature",
      name: "Raise Ticket ",
      icon: <VscDebugConsole />,
      exact: true,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  // const location = useLocation();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useState(true);
  const [pageTitle, setPageTitle] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const path = location.pathname;
    const hash = location.hash;
    switch (path) {
      case "/Dashboard":
        setPageTitle("Analytics ");
        break;
      case "/profile_Dashboard":
        setPageTitle("Profile Dashboard");
        break;
      case "/job_filter":
        setPageTitle("Jobs");
        break;
      case "/CandidateTabsview":
        setPageTitle("Candidates");
        break;
      case "/EmployerTabsview":
        setPageTitle("Employers");
        break;
      case "/profile_page":
        setPageTitle("Profile Details");
        break;
      case "/fbmeta":
        setPageTitle("FB Meta Leads");
        break;
      case "/Job_lead":
        setPageTitle("Job Leads");
        break;
      case "/interview_schedule_list":
        setPageTitle("Scheduled Interviews");
        break;
      case "/Can_Lead":
        setPageTitle("Candidate Leads");
        break;
      case "/JS_Call_Registry":
        setPageTitle("Candidate Call Registry");
        break;
      case "/employer_leads":
        setPageTitle("Employer Leads");
        break;

      case "/invoice_List":
        setPageTitle("Proforma Invoice");
        break;
      case "/Employer_Payment":
        setPageTitle("Employer Payment");
        break;
      case "/EmployerUnpuplished":
        setPageTitle("Unpublished Jobs");
        break;
      case "/Emp_Registry":
        setPageTitle("Employer Call Registry");
        break;
      case "/Employer_Enquiries":
        setPageTitle("Employer Enquiry");
        break;
      case "/JobsTabsview":
        setPageTitle("Jobs");
        break;
      case "/employer_field_leads":
        setPageTitle("Employer Field Leads");
        break;
      case "/Midelevelseniorpostform":
        setPageTitle("Senior Candidate Details");
        break;
      case "/MidLevelSenior":
        setPageTitle("Senior Candidate");
        break;
      case "/Bug/NewFeature":
        setPageTitle("Raise Ticket / New Feature");
        break;
      case "/CandidatePipeline":
        setPageTitle("Candidate Pipeline");
        break;
      case "/Interview_FollowUp1_Pipeline":
        setPageTitle("Interview Followup1 Pipeline");
        break;
      case "/CandidatePipelineTab":
        setPageTitle("Candidate Pipline");
        break;
      case "/AttendingLead":
        setPageTitle("Interview Attending Pipeline");
        break;
      case "/interviewStatus":
        setPageTitle("Interview Attended Pipeline");
        break;
      case "/workingprogress":
        if (hash === "#addUser") {
          setPageTitle("Add User");
        } else if (hash === "#addRole") {
          setPageTitle("Add Role");
        } else {
          setPageTitle("Working Progress");
        }
        break;
      default:
        setPageTitle("");
        break;
    }
  }, [location.hash, location.pathname]);
  // hhi
  useEffect(() => {
    const handleKeyPress = (event) => {
      // if (event.altKey && event.key === "r") {
      //   // handleRouteChange(getRecentRoute());
      //   goBack();
      // } else
      if (event.altKey && event.key === "1") {
        handleRouteChange("/CandidateTabsview", "Candidates");
      } else if (event.altKey && event.key === "3") {
        handleRouteChange("/EmployerTabsview", "Employers");
      } else if (event.altKey && event.key === "4") {
        handleRouteChange("/JobsTabsview", "Jobs");
      } else if (event.altKey && event.key === "2") {
        handleRouteChange("/MidLevelSenior", "Senior Candidate");
      }
      // Add more cases for other shortcuts if needed
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRouteChange = (path, title) => {
    // Use Gatsby's navigate method for navigation
    navigate(path);

    // Set the page title
    setPageTitle(title);
  };

  // const handleClose = () => {
  //     setAnchorEl(null);
  // };
  function HandleLogOut() {
    localStorage.clear();
    window.location.reload();
  }

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className={`${style.main_container} `}>
      <motion.div
        //  animate={{ }}
        animate={{
          width: isOpen ? "250px" : "45px",

          transition: {
            duration: 0.5,
            type: "spring",
            damping: 10,
          },
        }}
        className={`sidebar `}
      >
        {/* <motion.div 
              animate={{  width: isOpen ? "800%" : "800%",}}> */}

        <div
          className={` vh-100 ${style.sidebar} `}
          style={{ position: "fixed" }}
        >
          <Box
            sx={
              {
                // //   flexGrow: 2,
                // zIndex: 1,
              }
            }
          >
            <AppBar
              className={`${style.AppBar}`}
              // position="fixed"
              sx={{
                // backgroundColor: "#D6D6D6",
                backgroundColor: "white",
                color: "black",
                zIndex: -1,
              }}
            >
              <Toolbar>
                <>
                  {/* <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <div className="bars">
                      <FaBars onClick={toggle} />
                    </div>
                  </IconButton> */}
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1.5 }}
                  ></Typography>
                  <Typography sx={{ flexGrow: 1, fontFamily: "sans-serif" }}>
                    <div className={`${style.pageTitle}`}>{pageTitle}</div>
                  </Typography>
                </>
                {auth && (
                  <Box sx={{ flexGrow: 0 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2, // Adjust the gap (spacing) between elements as needed
                        // padding: "20px",
                      }}
                    >
                      <ToggleSwitch label=" " />

                      <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        className="Notification"
                      >
                        <Notification />
                      </IconButton>
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar
                            src={ProfilePic}
                            // sx={{ width: 500, height: 400 }}
                          >
                            {/*  */}
                            {ProfilePic
                              ? ProfilePic
                              : adminDetails.userName.charAt(0)}
                          </Avatar>
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={{ pathname: "/profile_page" }}
                        >
                          <MenuItem
                            // className={classes.menuItem}
                            onClick={handleCloseUserMenu}
                          >
                            Profile Details
                          </MenuItem>
                        </Link>
                        {!isSuperAdmin && (
                          <Link
                            style={{ textDecoration: "none", color: "black" }}
                            to={{ pathname: "/daily-analytics" }}
                          >
                            <MenuItem
                              // className={classes.menuItem}
                              onClick={handleCloseUserMenu}
                            >
                              Daily Analytics
                            </MenuItem>
                          </Link>
                        )}
                        <MenuItem
                          // className={classes.menuItem}
                          onClick={() => HandleLogOut()}
                        >
                          Logout
                        </MenuItem>
                      </Menu>
                    </Box>
                  </Box>
                )}
              </Toolbar>
            </AppBar>
          </Box>{" "}
          <div style={{ backgroundColor: "rgb(52, 51, 51)", color: "white" }}>
            <div
              className="d-flex "
              style={{
                backgroundColor: "rgb(52, 51, 51)",
                color: "white",
                height: isOpen ? "10vh" : "5vh",
                position: "sticky",
                top: "0",
                zIndex: 1,
              }}
            >
              <div className={`mt-2 ${style.top_section}`}>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="logo"
                    >
                      <img src={Taizologo} alt="Taizo-logo" className=" mx-3" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className={style.bars} onClick={toggleSidebar}>
                {isOpen ? (
                  <FaAngleLeft className="fs-3" />
                ) : (
                  <FaAngleRight className="fs-3 ms-2" />
                )}
              </div>
            </div>
            <section className={`${style.routes}`}>
              {routes.map((route, index) => {
                if (route.subRoutes) {
                  return (
                    <SidebarMenu
                      setIsOpen={setIsOpen}
                      route={route}
                      showAnimation={showAnimation}
                      isOpen={isOpen}
                    />
                  );
                }
                return route.externalLink ? (
                  <a
                    href={route.externalLink}
                    key={index}
                    className={`text-white ${style.link}  `}
                    target={route.target || "_blank"}
                  >
                    {isOpen ? (
                      <div className={`${style.icon}`}>{route.icon}</div>
                    ) : (
                      <Tooltip title={route.name} key={index}>
                        {route.icon}
                      </Tooltip>
                    )}
                    <AnimatePresence>
                      {isOpen ? (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className={`${style.link_text} `}
                        >
                          {route.name}
                        </motion.div>
                      ) : (
                        <Tooltip title={route.name} key={index}>
                          {route.icon}
                        </Tooltip>
                      )}
                    </AnimatePresence>
                  </a>
                ) : (
                  route && (
                    <NavLink
                      to={route.path}
                      key={index}
                      className={`text-white ${style.link}
                      `}
                    >
                      {isOpen ? (
                        <div className={`${style.icon}`}>{route.icon}</div>
                      ) : (
                        ""
                      )}
                      <AnimatePresence>
                        {isOpen ? (
                          <motion.div
                            variants={showAnimation}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className={`${style.link_text} `}
                          >
                            {route.name}
                          </motion.div>
                        ) : (
                          <CustomWidthTooltip
                            title={route.name}
                            // className="p-2"

                            placement="right-start"
                            key={index}
                          >
                            {/* <NavLink
                              to={route.path}
                              className={`text-white ${style.link}`}
                            > */}
                            <div
                              className={`${style.icon}`}
                              style={{ cursor: "pointer" }}
                            >
                              {route.icon}
                            </div>
                            {/* </NavLink> */}
                          </CustomWidthTooltip>
                        )}
                      </AnimatePresence>
                    </NavLink>
                  )
                );
              })}
            </section>
          </div>
        </div>
      </motion.div>

      <main style={{ marginTop: 60, width: 1500 }}>{children} </main>
    </div>
  );
};

export default SideNavbar;
