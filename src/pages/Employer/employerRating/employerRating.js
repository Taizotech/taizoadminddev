/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { CircularProgress, Pagination, Stack, TextField } from "@mui/material";
import styled from "../../Filter/Jobs/components/jobList.module.scss";
import style from "../../Candidate/Call Registry/callRegistry.module.scss";
import NoRating from "./NoRating";
import { useDispatch } from "react-redux";
import { commonPopupActions } from "../../../redux-store/store";
import { Ddmmmyyyy_date } from "../../../utility";
import { GetemployerRating } from "../../../apiServices";

function EmployerRating() {
  const [EmployerRating, setEmployerRating] = useState("");
  const [EmployerRatingList, setEmployerRatingList] = useState([]);
  const [pageCount, setPageCount] = useState({ totalPages: 0, totalCount: 0 });
  const [loading, setLoading] = useState(false);

  const Dispatch = useDispatch();

  const handleEmployerRating = (e) => {
    let val = e.target.value.replace(/\\D/g, "");
    setEmployerRating(val);
  };

  useEffect(() => {
    const debounceEmployerRating = debounce(() => {
      setLoading(true);
      GetemployerRating(EmployerRating, 0).then((data) => {
        console.log(data.code);
        if (data.code == 404) {
          setEmployerRatingList([]);
        }

        setLoading(false);
        console.log(data.data.content, "records");
        const TotalPageCount = data.data.totalPages;
        const totalElements = data.data.totalElements;

        setEmployerRatingList(data.data.content);
        console.log(data.data.content, "Employer rating content");
        setPageCount((prev) => ({
          ...prev,
          totalCount: totalElements,
          totalPages: TotalPageCount,
        }));
      });
    }, 300);

    debounceEmployerRating();
    return () => {
      debounceEmployerRating.cancel();
    };
  }, [EmployerRating]);
  useEffect(() => {
    GetemployerRating(EmployerRating, 0).then((data) => {
      const TotalPageCount = data.data.totalPages;
      const totalElements = data.data.totalElements;
      setPageCount((prev) => ({
        ...prev,
        totalCount: totalElements,
        totalPages: TotalPageCount,
      }));
    });
  }, []);
  function employerPagination(event, page) {
    const currentPage = page - 1;
    GetemployerRating(EmployerRating, currentPage).then((data) => {
      const totalPageCount = data.data.totalPages;
      const totalElements = data.data.totalElements;

      setEmployerRatingList(data.data.content);
      setPageCount((prev) => ({
        ...prev,
        totalCount: totalElements,
        totalPages: totalPageCount,
      }));
    });
  }

  const handlePopupDetails = (id, type) => {
    console.log(id);

    Dispatch(
      commonPopupActions.setShowPopup({
        name: type,
        id: id,
      })
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 d-flex d-flex flex-column flex-sm-row ">
          <div className="col-sm-10 d-flex justify-content-center align-items-center">
            <h3>Employer Ratings</h3>
          </div>
          <div className="col-sm-2 d-flex jusitfy-content-end">
            <TextField
              fullWidth
              label="Rating number"
              id="fullWidth"
              placeholder="Rating number"
              value={EmployerRating}
              onChange={handleEmployerRating}
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
        <div className="col-md-12">
          <div className={` ${styled.payment_list}`}>
            {loading ? (
              <div
                className={`${style.loader_wrp} mt-1 d-grid justify-content-center align-items-center`}
              >
                <CircularProgress />
              </div>
            ) : (
              <>
                {EmployerRatingList.length > 0 ? (
                  EmployerRatingList.map((employer, i) => (
                    <div className="container-fluid">
                      <div
                        // onClick={() => {
                        //     // handleemployersDetails(employer);
                        // }}
                        key={employer.id}
                        className={`p-1 ${styled.employerRating_list_item}`}
                      >
                        <div className="row">
                          <div className="col-sm-6">
                            <b>Rating count:</b>
                            {employer.ratingCount} <b>|</b> <b>Rating Id :</b>
                            {employer.ratingId}
                          </div>
                          {/* <div className='col'><b>Job Id:</b>{employer.jobId} <b>|</b> <b>employer Id :</b>{employer.empId}</div> */}
                          <div className="col-sm-6 d-flex justify-content-end">
                            <b>From:</b>{" "}
                            <div className="text-success">
                              {" "}
                              <b>{employer.fromWeb ? "Web" : "App"}</b>{" "}
                            </div>{" "}
                            <b className="mx-1">|</b> <b>Register Time:</b>
                            {
                              <Ddmmmyyyy_date
                                dateValue={employer.createdTime}
                              />
                            }
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-4">
                            <div className="row">
                              <div className="col">
                                <span
                                  onClick={() => {
                                    handlePopupDetails(
                                      employer.jobId,
                                      "jobDetails"
                                    );
                                  }}
                                >
                                  <b>Job Id:</b>
                                  {employer.jobId} |{" "}
                                </span>
                                <span
                                  onClick={() => {
                                    handlePopupDetails(
                                      employer.empId,
                                      "employerDetails"
                                    );
                                  }}
                                >
                                  <b>employer Id :</b>
                                  {employer.empId}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="col-sm-7">
                            <div className="row">
                              <div className="col-sm-12">
                                <b>
                                  {employer.question
                                    ? employer.question
                                    : "Nill"}
                                </b>{" "}
                                <>
                                  {employer.reasons ? employer.reasons : "Nill"}
                                </>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <NoRating />
                )}
              </>
            )}
          </div>
          <div className="row">
            <div className="col-sm-12 d-flex justify-content-center ">
              <div className="bg-light position-fixed">
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
  );
}

export default EmployerRating;
