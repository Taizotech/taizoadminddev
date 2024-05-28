import style from "./side_nav.module.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { PageStatus } from "../routes";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { webConsoleBaseUrl } from "../App";

const SideNavBar = () => {
  const { activeTab } = useContext(PageStatus);

  const sideBar = useSelector((state) => state.navBar.showSidebar);
  const [expanded, setExpanded] = useState(null);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleLinkClick = (panel) => (event) => {
    event.stopPropagation();
    setExpanded(panel);
  };

  // const [showSideBar, setShowSidebar] = useState();

  return (
    <>
      <div className={`${style.side_bar_wrp} ${!sideBar ? "d-none" : ""} `}>
        <div className={`${style.nav_link_wrp}`}>
          <Accordion
            className={`ms-2 `}
            expanded={expanded === "isCandiFilter"}
            onChange={handleAccordionChange("isCandiFilter")}
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
              borderRadius: "8px 0px",
              color: "white",
              marginTop: 10,

              "&:hover": {
                backgroundColor: " rgba(0, 0, 0, 0.679)",
                border: "none",
                color: "#1cb260",
                cursor: "pointer",
                marginTop: 10,
              },
              "&.Mui-expanded": {
                backgroundColor: " rgba(0, 0, 0, 0.679)",
                color: "#1cb260",
                borderRadius: "8px 10px ",
              },
            }}
          >
            <AccordionSummary
              // className={`${style.bg_danger}`}
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                "&.Mui-expanded": {
                  backgroundColor: "black",
                  color: "#1cb260",
                  borderRadius: "0px ",
                  textDecoration: "none",
                },
              }}
            >
              <Typography>Filter</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                borderRadius: "8px 10px",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.679)",
                  border: "none",
                  color: "#1cb260",
                  cursor: "pointer",
                  borderRadius: "8px 10px",
                },
                "&.Mui-expanded": {
                  backgroundColor: " green",
                  color: "#1cb260",
                  borderRadius: "8px 10px",
                },
              }}
            // onClick={handleLinkClick("job_filter")}
            >
              <Link to={"/job_filter"} className={` ${style.link}`}>
                <Typography>Job Filter</Typography>
              </Link>
            </AccordionDetails>
            <AccordionDetails
              sx={{
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                borderRadius: "8px 10px",
                "&:hover": {
                  backgroundColor: " rgba(0, 0, 0, 0.679)",
                  border: "none",
                  color: "#1cb260",
                  cursor: "pointer",
                  borderRadius: "8px 10px",
                },
                "&.Mui-expanded": {
                  backgroundColor: "black",
                  color: "#1cb260",
                  borderRadius: "8px  10px ",
                },
              }}
            // onClick={handleLinkClick("isKyc")}
            >
              <Link
                to={"/candidate_Job"}
                className={` ${style.link} ${activeTab.isCandidate
                    ? `${style.active} ${style.activeLink}`
                    : ""
                  }`}
              >
                <Typography>Candidate Filter</Typography>
              </Link>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "isKyc"}
            onChange={handleAccordionChange("isKyc")}
            className={`ms-2 ${activeTab.isKyc && style.active}`}
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
              borderRadius: "8px 10px",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.679)",
                border: "none",
                color: "#1cb260",
                cursor: "pointer",
                borderRadius: "8px 10px",
              },
              "&.Mui-expanded": {
                backgroundColor: "rgba(0, 0, 0, 0.679)",
                color: "#1cb260",
                borderRadius: "8px 10px ",
              },
            }}
          >
            <AccordionSummary
              // className={`${style.bg_danger}`}
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                "&.Mui-expanded": {
                  backgroundColor: "rgba(0, 0, 0, 0.679)",
                  color: "#1cb260",
                  borderRadius: "0px ",
                },
              }}
            >
              <Typography>Employer</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                borderRadius: "8px 10px",
                "&:hover": {
                  backgroundColor: " rgba(0, 0, 0, 0.679)",
                  border: "none",
                  color: "#1cb260",
                  cursor: "pointer",
                  borderRadius: "8px 10px",
                },
                "&.Mui-expanded": {
                  backgroundColor: "black",
                  color: "#1cb260",
                  borderRadius: "8px  10px ",
                },
              }}
            // onClick={handleLinkClick("isKyc")}
            >
              <Link
                to={"/Kyc_verify"}
                className={` ${style.link} ${activeTab.isKyc ? `${style.active} ${style.activeLink}` : ""
                  }`}
              >
                <Typography>KYC</Typography>
              </Link>
            </AccordionDetails>
            <AccordionDetails
              sx={{
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                borderRadius: "8px 10px",
                "&:hover": {
                  backgroundColor: "black",
                  border: "none",
                  color: "#1cb260",
                  cursor: "pointer",
                  borderRadius: "8px 10px",
                },
                "&.Mui-expanded": {
                  backgroundColor: "black",
                  color: "#1cb260",
                  borderRadius: "8px 10px",
                },
              }}
            >
              <a
                href={`${webConsoleBaseUrl}/waNotifications/customCompanyDetails.html`}
                target="_blank"
                className={` ${style.link}`}
              >
                <Typography>
                  Registeration <OpenInNewIcon />
                </Typography>
              </a>
            </AccordionDetails>
            <AccordionDetails
              sx={{
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                borderRadius: "8px 10px",
                "&:hover": {
                  backgroundColor: "black",
                  border: "none",
                  color: "#1cb260",
                  cursor: "pointer",
                  borderRadius: "8px 10px",
                },
                "&.Mui-expanded": {
                  backgroundColor: "black",
                  color: "#1cb260",
                  borderRadius: "8px 10px",
                },
              }}
            >
              <a
                href={`${webConsoleBaseUrl}/waNotifications/customPostJobPage.html`}
                target="_blank"
                className={` ${style.link}`}
              >
                <Typography>
                  Job Post <OpenInNewIcon />
                </Typography>
              </a>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "isCandidate"}
            onChange={handleAccordionChange("isCandidate")}
            className={`ms-2 ${activeTab.isCandidate && style.active}`}
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
              borderRadius: "8px 0px",
              color: "white",

              "&:hover": {
                backgroundColor: " rgba(0, 0, 0, 0.679)",
                border: "none",
                color: "#1cb260",
                cursor: "pointer",
              },
              "&.Mui-expanded": {
                backgroundColor: " rgba(0, 0, 0, 0.679)",
                color: "#1cb260",
                borderRadius: "8px 10px ",
              },
            }}
          >
            <AccordionSummary
              // className={`${style.bg_danger}`}
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                "&.Mui-expanded": {
                  backgroundColor: "black",
                  color: "#1cb260",
                  borderRadius: "0px ",
                  textDecoration: "none",
                },
              }}
            >
              <Typography>Candidate</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                borderRadius: "8px 10px",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.679)",
                  border: "none",
                  color: "#1cb260",
                  cursor: "pointer",
                  borderRadius: "8px 10px",
                },
                "&.Mui-expanded": {
                  backgroundColor: " rgba(0, 0, 0, 0.679)",
                  color: "#1cb260",
                  borderRadius: "8px 10px",
                },
              }}
              onClick={handleLinkClick("isCandidate")}
            >
              <Link
                to={"/candidate"}
                // className=
                className={` ${style.link} ${activeTab.isCandidate
                    ? `${style.active} ${style.activeLink}`
                    : ""
                  }`}
              // onClick={handleLinkClick}
              >
                <Typography>Interview Schedule</Typography>
              </Link>
            </AccordionDetails>
            <AccordionDetails
              expanded={true}
              // onClick={handleLinkClick("isAlert")}
              // onChange={handleAccordionChange("isAlert")}
              sx={{
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                borderRadius: "8px 10px",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.679)",
                  border: "none",
                  color: "#1cb260",
                  cursor: "pointer",
                  borderRadius: "8px 10px",
                },
                "&.Mui-expanded": {
                  backgroundColor: " rgba(0, 0, 0, 0.679)",
                  color: "#1cb260",
                  borderRadius: "8px 10px",
                },
              }}
            >
              <Link
                to={"/Alert"}
                // className=
                className={` ${style.link} ${activeTab.isAlert ? `${style.active} ${style.activeLink}` : ""
                  }`}
              // onClick={handleLinkClick}
              >
                <Typography>Job alert</Typography>
              </Link>
            </AccordionDetails>
            <AccordionDetails
              sx={{
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                borderRadius: "8px 10px",
                "&:hover": {
                  backgroundColor: "black",
                  border: "none",
                  color: "#1cb260",
                  cursor: "pointer",
                  borderRadius: "8px 10px",
                },
                "&.Mui-expanded": {
                  backgroundColor: "black",
                  color: "#1cb260",
                  borderRadius: "8px 10px",
                },
              }}
            >
              <a
                href={`${webConsoleBaseUrl}/waNotifications/customCandidate.html`}
                target="_blank"
                className={` ${style.link}`}
              >
                <Typography>
                  Registeration <OpenInNewIcon />
                </Typography>
              </a>
            </AccordionDetails>
          </Accordion>
          <Link
            to={"/payment"}
            className={`${activeTab.isPayment ? `${style.active} ${style.activeLink}` : ""
              } ${style.link}`}
            onClick={() => setExpanded(null)}
          >
            <Typography>Payment</Typography>{" "}
          </Link>

          <Link
            to={"/job_link"}
            className={`${activeTab.isJobLink && style.active}`}
            onClick={() => setExpanded(null)}
          >
            <Typography>Job Link</Typography>
          </Link>
          <a
            href={`${webConsoleBaseUrl}/waNotifications/customNotification.html`}
            target="_blank"
          >
            <Typography>Notifications <OpenInNewIcon /></Typography>
          </a>
        </div>
      </div>
    </>
  );
};

export default SideNavBar;
