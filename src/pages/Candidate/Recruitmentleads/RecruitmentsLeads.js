/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import tablestyle from "./RecruitmentLeads.module.scss";
import FBStyle from "../FacebookMeta/candidateFacebookMeta.module.scss";
import { LuRefreshCcw } from "react-icons/lu";
import LeadFilter from "./LeadFilter";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import {
  DMMMYYYY_formate,
  MyModal,
  capitalizeWords,
  textTruncate,
} from "../../../utility";
import ModalContainer from "../../../components/modal_popup";
import { useSelector } from "react-redux";
import { GetAllsdminDetails, postCandidate } from "../../../apiServices";
import {
  CandidateRecruitmentLeadsActions,
  CandidateRegisteredActions,
} from "../../../redux-store/store";
import { useDispatch } from "react-redux";

function RecruitmentsLeads() {
  const Dispatch = useDispatch();
  const RecruitmentLeadsFilter = useSelector(
    (state) => state.RecruitmentLeads.RecruitmentfilterData
  );

  const CandidateRecruitmentList = useSelector(
    (state) => state.RecruitmentLeads.RegisterCandidateList
  );
  const adminDetails = useSelector((state) => state.adminDetails);
  let isSuperAdmin = adminDetails.roleID === 1;
  const [adminName, setAdminName] = useState([]);
  const [adminid, setAdminId] = useState([]);
  const [size, setSize] = useState(10);
  const [pageCount, setPageCount] = useState({
    totalPages: 0,
    totalCount: 0,
    currentPage: 1,
  });
  const [showConfirmationqualifiedPopup, setShowConfirmQualifiedPopup] =
    useState(false);
  const [showConfirmationPopup, setShowConfirmPopup] = useState(false);
  // useEffect(() => {
  //   postCandidate(RecruitmentLeadsFilter).then((data) => {
  //     Dispatch(CandidateRecruitmentLeadsActions.setRegisterCandidateList(data));
  //   });
  // }, [RecruitmentLeadsFilter]);

  useEffect(() => {
    //  setShowLoader(true);

    postCandidate(RecruitmentLeadsFilter)
      .then((data) => {
        // console.log(data, "dataaa");
        if (data) {
          Dispatch(
            CandidateRecruitmentLeadsActions.setRegisterCandidateList(data)
          );
          if (data[0] && data[0].total_count !== undefined) {
            //  setTotalCount(data[0].total_count);
            setPageCount((prev) => ({
              ...prev,
              totalPages: Math.ceil(
                (data.length > 0 ? data[0].total_count : 10) / size
              ),
            }));
          } else {
            //  setTotalCount(0);
            setPageCount((prev) => ({
              ...prev,
              totalPages: 0,
            }));
            Dispatch(
              CandidateRecruitmentLeadsActions.setRegisterCandidateList([])
            );
          }
        } else {
          console.error(
            "Data received from postCandidate is undefined or null."
          );
        }
      })
      .catch((err) => {
        alert("Something went wrong" + err);
      })
      .finally(() => {
        //  setShowLoader(false);
        console.log("hai finished");
      });
  }, [RecruitmentLeadsFilter]);
  useEffect(() => {
    console.log(CandidateRecruitmentList, "candidateListedjobs");
  }, [CandidateRecruitmentList]);
  useEffect(() => {
    console.log(CandidateRecruitmentList, "candidateListedjobs");
  }, [CandidateRecruitmentList]);
  useEffect(() => {
    GetAllsdminDetails().then((data) => {
      console.log(data, "All admin details");
      const adminNames = data.map((item) => item.userName);
      const adminIds = data.map((item) => item.id);
      setAdminName(adminNames);
      setAdminId(adminIds);
    });

    let adminId = isSuperAdmin ? -1 : localStorage.getItem("adminID");
    Dispatch(
      CandidateRecruitmentLeadsActions.setRegisterCandidateListFilterAdminId(
        adminId
      )
    );
  }, [adminDetails]);
  const handleCancelClick = () => {
    setShowConfirmQualifiedPopup(false);
  };
  const handleCancelClicknotqualify = () => {
    setShowConfirmPopup(false);
  };
  function handleConfirmationOpen() {
    setShowConfirmPopup(true);
  }
  function handleConfirmationOpenQualify() {
    setShowConfirmQualifiedPopup(true);
  }
  const handleButtonClick = (refName) => {
    // const ref = inputRef[refName];
    // if (ref.current) {
    //   ref.current.click();
    // }
  };
  return (
    <>
      <div>
        <div className={`${tablestyle.FilterHead}`}>
          {" "}
          <div className="d-flex ">
            Show {"  "}
            <select
              name=""
              id=""
              className="px-1 py-1 mx-2"
              // onChange={(event) => candidateSize(event.target.value)}
            >
              <option selected value="10">
                10
              </option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
            {"   "}
            Entries
          </div>
          <div className={`${tablestyle.filterAdduser}`}>
            {/* <div className="mt-1 me-2 ">Total Count : {totalCount}</div> */}
            {/* <div
              className="btn btn-danger p-1 me-2 mx-2 ms-auto mt-1"
                          onClick={handleXlsxDownload.bind(
                null,
                currentJoningDate?.candidateInterview?.id
              )}
            >
              download
            </div> */}
            <div
              className="p-1 success me-2 mx-2 ms-auto mt-1"
              // onClick={handleReset}
            >
              <LuRefreshCcw />
            </div>

            <LeadFilter />
          </div>
        </div>{" "}
        <div className={tablestyle.tableSection}>
          <table className={tablestyle.table}>
            <thead>
              <tr className={tablestyle.tableHead}>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Job Category</th>
                <th>Experience</th>
                {/* <th>Email ID</th> */}
                <th>Qualification</th>
                <th>Preferred City</th>
                <th>Assigned To</th>
                <th>Registered On</th>
                <th style={{ textAlign: "right" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {CandidateRecruitmentList.map((data, i) => (
                <>
                  <tr
                    key={i}
                    className={tablestyle.tableRow}
                    style={{ borderBottom: "1px solid #7676767c" }}
                  >
                    <td>
                      {data.first_name
                        ? textTruncate(capitalizeWords(data.first_name), 15) +
                          " " +
                          (data.last_name
                            ? textTruncate(
                                capitalizeWords(data.last_name),
                                15
                              ) + ""
                            : "")
                        : "-"}
                    </td>
                    <td>{data.mobile_number}</td>
                    <td title={data.job_category}>
                      {" "}
                      {data.job_category && textTruncate(data.job_category, 20)}
                      {!data.job_category && <>-</>}
                    </td>
                    <td>{data.exp_in_years} Year(s)</td>
                    {/* <td>{data.emailID}</td> */}
                    <td>{textTruncate(data.qualification, 20)}</td>
                    <td title={data.city}>
                      {data.city && textTruncate(data.city, 20)}
                      {!data.city && <>-</>}
                    </td>
                    {isSuperAdmin && (
                      <td>{adminName[adminid.indexOf(data.assign_to)]}</td>
                    )}{" "}
                    <td>
                      {" "}
                      {<DMMMYYYY_formate dateValue={data.created_time} />}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div className="btn-group dropstart">
                        <button
                          type="button"
                          // className={`btn btn-light `}

                          data-bs-toggle="dropdown"
                          data-bs-no-caret="true"
                          aria-expanded="false"
                          style={{
                            border: "none",
                            background: "none",
                            color: "#000",
                            cursor: "pointer",
                            outline: "none",
                            position: "relative",
                            right: "5px",
                            // backgroundColor: "red",
                            fontSize: 20,
                            zIndex: 1,
                          }}
                        >
                          <span className="">
                            {" "}
                            <BsThreeDotsVertical />{" "}
                          </span>
                        </button>{" "}
                        <ul
                          className="dropdown-menu"
                          style={{ textAlign: "left" }}
                          // ref={dropdownRef}
                        >
                          <li
                          // onClick={() => {
                          //   openIsQualifyPopup("qualify");
                          // }}
                          >
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() => {
                                // handleButtonClick("qualified");
                                handleConfirmationOpenQualify(true);
                              }}
                            >
                              <div className={`${FBStyle.select_wrp}`}>
                                <input
                                  // ref={inputRef.notQualified}
                                  type="radio"
                                  checked={data.notQualified}
                                  name={`status_${data.user_id}`}
                                  id={`notQualified_${data.user_id}`}
                                />
                                <label htmlFor={`notQualified_${data.user_id}`}>
                                  <GoDotFill
                                    style={{
                                      color: "#169C50",
                                      fontSize: 20,
                                    }}
                                  />{" "}
                                  Qualified
                                </label>
                              </div>
                            </a>
                          </li>
                          <li
                          // onClick={() => {
                          //   openIsQualifyPopup("notQualify");
                          // }}
                          >
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() => {
                                handleButtonClick("notQualified");
                                handleConfirmationOpen(true);
                              }}
                            >
                              <div className={`${FBStyle.select_wrp}`}>
                                <input
                                  // ref={inputRef.notQualified}
                                  type="radio"
                                  checked={data.notQualified}
                                  name={`status_${data.user_id}`}
                                  id={`notQualified_${data.user_id}`}
                                />
                                <label htmlFor={`notQualified_${data.user_id}`}>
                                  <GoDotFill
                                    style={{
                                      color: "#b2261c",
                                      fontSize: 20,
                                    }}
                                  />{" "}
                                  Not Qualified
                                </label>
                              </div>
                            </a>
                          </li>

                          <li
                          // onClick={() => {
                          //   openIsQualifyPopup("notQualify");
                          // }}
                          >
                            <a
                              className="dropdown-item"
                              href="#"
                              // onClick={() => {
                              //   handleButtonClick("notQualified");
                              //   handleConfirmationOpen(true);
                              // }}
                            >
                              <div className={`${FBStyle.select_wrp}`}>
                                <input
                                  // ref={inputRef.notQualified}
                                  type="radio"
                                  checked={data.notQualified}
                                  name={`status_${data.user_id}`}
                                  id={`notQualified_${data.user_id}`}
                                />
                                <label htmlFor={`notQualified_${data.user_id}`}>
                                  <GoDotFill
                                    style={{
                                      color: "#430CBA",
                                      fontSize: 20,
                                    }}
                                  />{" "}
                                  Move To Resource
                                </label>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
        {showConfirmationqualifiedPopup && (
          <MyModal>
            <ModalContainer
              zIndex={2000}
              childComponent={
                <>
                  <div>
                    <div className="text-center mb-3">Qualify Candidate</div>
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Add Notes"
                      multiline
                      required
                      // onChange={(event) => {
                      //   setIsQualifiedDetails((prev) => ({
                      //     ...prev,
                      //     notes: event.target.value,
                      //   }));
                      // }}
                      maxRows={4}
                      fullWidth
                    />
                  </div>
                  <div className="d-flex justify-content-end gap-1 mt-4">
                    <button
                      className="btn text-white me-3"
                      onClick={handleCancelClick}
                      style={{ backgroundColor: "#d00a0a" }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn text-white"
                      // onClick={ConfirmFormSubmit}
                      // disabled={enableSubmit}
                      style={{ backgroundColor: "#169C50" }}
                    >
                      Qualify
                    </button>
                  </div>
                </>
              }
            />
          </MyModal>
        )}
        {showConfirmationPopup && (
          <MyModal>
            <ModalContainer
              zIndex={2000}
              childComponent={
                <>
                  <div>
                    <div className="text-center mb-3">Disqualify Candidate</div>
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Add Notes"
                      multiline
                      required
                      // onChange={(event) => {
                      //   setIsQualifiedDetails((prev) => ({
                      //     ...prev,
                      //     notes: event.target.value,
                      //   }));
                      // }}
                      maxRows={4}
                      fullWidth
                    />
                  </div>
                  <div className="d-flex justify-content-end gap-1 mt-4">
                    <button
                      className="btn text-white me-3"
                      onClick={handleCancelClicknotqualify}
                      style={{ backgroundColor: "#d00a0a" }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn text-white"
                      // onClick={ConfirmFormSubmit}
                      // disabled={enableSubmit}
                      style={{ backgroundColor: "#169C50" }}
                    >
                      Disqualify
                    </button>
                  </div>
                </>
              }
            />
          </MyModal>
        )}
      </div>

      <div className="d-flex align-items-center justify-content-center position-relative mt-3">
        <nav aria-label="Page navigation example" className="">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">«</span>
              </a>
            </li>
            <li class="page-item">
              <a class="page-link " href="#">
                1
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                2
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                3
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">»</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

const data = [
  {
    name: "sivaranjani",
    mobileNumber: "8056690492",
    jobcategory: "trainee1",
    experience: "0 years",
    // emailID: "sivranjanithiyagarajan12@gmail.com",
    qualify: "B.E",
    preferredciy: "chennai",
    assignedto: "zia",
    registeredon: "30-Mar-2024",
  },
  {
    name: "Sharmi",
    mobileNumber: "8052390492",
    jobcategory: "trainee2",
    experience: "1 years",
    // emailID: "Sharmi2001@gmail.com",
    qualify: "B.sc",
    preferredciy: "chennai",
    assignedto: "adthiya",
    registeredon: "29-Mar-2024",
  },
  {
    name: "Kirupa",
    mobileNumber: "4432390492",
    jobcategory: "trainee3",
    experience: "2 years",
    // emailID: "Kirupa2001@gmail.com",
    qualify: "M.sc",
    preferredciy: "chennai",
    assignedto: "ranjini",
    registeredon: "28-Mar-2024",
  },
];

export default RecruitmentsLeads;
