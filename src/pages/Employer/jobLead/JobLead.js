/* eslint-disable react/jsx-pascal-case */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { CircularProgress, Pagination, Stack, TextField } from "@mui/material";
import styled from "../../Filter/Jobs/components/jobList.module.scss";
import style from "../../Candidate/Call Registry/callRegistry.module.scss";
import NoLead from "./NoDraft";
import { useDispatch } from "react-redux";
import { GetJobLeadtable } from "../../../apiServices";
import { commonPopupActions } from "../../../redux-store/store";
import { Ddmmmyyyy_date } from "../../../utility";

function JobLead() {
  const [JobLead, setJobLead] = useState("");
  const [JobLeadList, setJobLeadList] = useState([]);
  const [pageCount, setPageCount] = useState({ totalPages: 0, totalCount: 0 });
  const [loading, setLoading] = useState(false);
  const handleJobLead = (e) => {
    let val = e.target.value;
    // console.log(val)

    if (!isNaN(val)) {
      setJobLead(val);
    }
  };

  const Dispatch = useDispatch();

  useEffect(() => {
    const debounceJobLead = debounce(() => {
      setLoading(true);
      GetJobLeadtable(JobLead, 0).then((data) => {
        console.log(data.code);
        if (data.code == 404) {
          setJobLeadList([]);
        }

        setLoading(false);
        console.log(data.data.content, "records");
        const TotalPageCount = data.data.totalPages;
        const totalElements = data.data.totalElements;

        setJobLeadList(data.data.content);
        console.log(data.data.content, "Employer draft content");
        setPageCount((prev) => ({
          ...prev,
          totalCount: totalElements,
          totalPages: TotalPageCount,
        }));
      });
    }, 300);

    debounceJobLead();
    return () => {
      debounceJobLead.cancel();
    };
  }, [JobLead]);
  useEffect(() => {
    GetJobLeadtable(JobLead, 0).then((data) => {
      const TotalPageCount = data.data.totalPages;
      const totalElements = data.data.totalElements;
      setPageCount((prev) => ({
        ...prev,
        totalCount: totalElements,
        totalPages: TotalPageCount,
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function employerPagination(event, page) {
    const currentPage = page - 1;
    GetJobLeadtable(JobLead, currentPage).then((data) => {
      const totalPageCount = data.data.totalPages;
      const totalElements = data.data.totalElements;

      setJobLeadList(data.data.content);
      setPageCount((prev) => ({
        ...prev,
        totalCount: totalElements,
        totalPages: totalPageCount,
      }));
    });
  }

  const handleEmployersDetails = (id) => {
    console.log(id);
    Dispatch(
      commonPopupActions.setShowPopup({
        name: "employerDetails",
        id: id,
      })
    );
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 d-flex justify-content-end">
            {/* <div className="col-sm-10 d-flex justify-content-center align-items-center">
              <h3 className="text-center">
                <b>Job Lead</b>
              </h3>
            </div> */}
            <div className="col-sm-2 ">
              <TextField
                fullWidth
                label="Employer Id"
                id="fullWidth"
                placeholder="Employer Id"
                value={JobLead}
                type="number"
                onChange={handleJobLead}
              />
              {/* <div>
              <br />
              <h5 className="px-3">
                <b>Total Count:</b>
                {pageCount.totalCount}
              </h5>
            </div> */}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className={` ${styled.payment_list}`}>
              {loading ? (
                <div
                  className={`${style.loader_wrp} mt-1 d-grid justify-content-center align-items-center`}
                >
                  <CircularProgress />
                </div>
              ) : (
                <>
                  {JobLeadList.length > 0 ? (
                    JobLeadList.map((employer, i) => (
                      <div className="container-fluid">
                        <div
                          onClick={() => {
                            handleEmployersDetails(employer.employerId);
                          }}
                          key={employer.id}
                          className={`p-1 card mt-2`}
                        >
                          <div className="row p-1">
                            <div className="col-lg-12 col-md-8 col-sm-4 ">
                              <div className="row">
                                <div className="col-lg-4 col-md-3 col-sm-12 d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-1">
                                  <div>
                                    <b>Employer Id:</b> {employer.employerId}{" "}
                                    {/* {window.innerWidth >= 992 && (
                                      <span className="d-none d-md-inline">
                                        |
                                      </span>
                                    )} */}
                                  </div>
                                  {/* <div><b>Job Id:</b> {employer.empJobId}</div> */}
                                  {/* <div>
                                    <b>Id:</b> {employer.id}
                                  </div> */}
                                </div>

                                <div className="col-lg-8 col-md-3 col-sm-12 d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-1 justify-content-sm-start justify-content-lg-end">
                                  <div>
                                    {" "}
                                    <b>Register Time:</b>{" "}
                                    {
                                      <Ddmmmyyyy_date
                                        dateValue={employer.createdTime}
                                      />
                                    }{" "}
                                    {/* {window.innerWidth >= 992 && (
                                      <span className="d-none d-md-inline">
                                        |
                                      </span>
                                    )} */}
                                  </div>
                                  {/* <div>
                                    <b>Update Time:</b>{" "}
                                    {
                                      <Ddmmmyyyy_date
                                        dateValue={
                                          employer.updatedTime
                                            ? employer.updatedTime
                                            : "NILL"
                                        }
                                      />
                                    }
                                  </div> */}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-12 col-md-6 col-sm-12  flex-sm-row align-items-start align-items-sm-center gap-2">
                                  <div>
                                    <b>Job category:</b> {employer.jobCategory}{" "}
                                  </div>
                                  <div>
                                    <b>Job industry:</b>{" "}
                                    {employer.jobIndustry
                                      ? employer.jobIndustry
                                      : "NILL"}
                                  </div>
                                  <div>
                                    <b>No.of openings:</b>{" "}
                                    {employer.noOfOpenings}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <NoLead />
                  )}
                </>
              )}
            </div>
            <div className="row">
              <div className="col-sm-12 d-flex justify-content-center ">
                <div className="">
                  <Stack spacing={2}>
                    <Pagination
                      count={pageCount.totalPages}
                      color="success"
                      onChange={employerPagination}
                    />
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobLead;
