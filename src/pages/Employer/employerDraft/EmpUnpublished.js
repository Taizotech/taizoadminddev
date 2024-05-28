/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Get,
  GetEmployerUnpublished,
  GetEmployerUnpublishedEmployerUnpublished,
} from "../../../apiServices";
import { debounce } from "lodash";
import { CircularProgress, Pagination, Stack, TextField } from "@mui/material";
import jobListStyle from "../../Filter/Jobs/components/jobList.module.scss";
import {
  DDMMYYYY_formate,
  Ddmmmyyyy_date,
  MMMMDDYYYY_formate,
} from "../../../utility";
import style from "../../Candidate/Call Registry/callRegistry.module.scss";
import NoDraft from "./NoDraft";
import { BsFileEarmarkPostFill, BsFillCircleFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { webConsoleBaseUrl } from "../../../App";

function EmployerUnpublished() {
  const [employerUnpublished, setEmployerUnpublished] = useState("");
  const [employerUnpublishedList, setEmployerUnpublishedList] = useState([]);
  const [pageCount, setPageCount] = useState({ totalPages: 0, totalCount: 0 });
  const [loading, setLoading] = useState(false);
  const handleEmployerUnpublished = (e) => {
    let val = e.target.value;
    // console.log(val)

    if (!isNaN(val)) {
      setEmployerUnpublished(val);
    }
  };

  useEffect(() => {
    const debounceEmployerDraft = debounce(() => {
      setLoading(true);
      GetEmployerUnpublished(employerUnpublished, 0).then((data) => {
        console.log(data, "Unpublished payment List");
        if (data.code === 400) {
          setEmployerUnpublishedList([]);
          setPageCount("");
        }

        setLoading(false);
        console.log(data.data.content, "records");
        const TotalPageCount = data.data.totalPages;
        const totalElements = data.data.totalElements;

        setEmployerUnpublishedList(data.data.content);
        console.log(data.data.content, "Employer draft content");
        setPageCount((prev) => ({
          ...prev,
          totalCount: totalElements,
          totalPages: TotalPageCount,
        }));
      });
    }, 300);

    debounceEmployerDraft();
    return () => {
      debounceEmployerDraft.cancel();
    };
  }, [employerUnpublished]);
  useEffect(() => {
    GetEmployerUnpublished(employerUnpublished, 0).then((data) => {
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
    GetEmployerUnpublished(employerUnpublished, currentPage).then((data) => {
      const totalPageCount = data.data.totalPages;
      const totalElements = data.data.totalElements;

      setEmployerUnpublishedList(data.data.content);
      setPageCount((prev) => ({
        ...prev,
        totalCount: totalElements,
        totalPages: totalPageCount,
      }));
    });
  }
  return (
    <div>
      <div className="container-fluid">
        <div className="row d-flex">
          {/* <div className="col-md-10 d-flex justify-content-center align-items-center">
            <h3 className="text-center">Employer Unpublished Jobs</h3>
          </div> */}

          <div className="col-sm-12 d-flex justify-content-end">
            <div className=" ">
              <TextField
                fullWidth
                label="Employer Id"
                id="fullWidth"
                placeholder="Employer Id"
                value={employerUnpublished}
                type="number"
                onChange={handleEmployerUnpublished}
                inputProps={{ maxLength: 10 }}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className={` ${jobListStyle.payment_list}`}>
              {loading ? (
                <div
                  className={`${style.loader_wrp} mt-1 d-grid justify-content-center align-items-center`}
                >
                  <CircularProgress />
                </div>
              ) : (
                <>
                  {employerUnpublishedList.length > 0 ? (
                    employerUnpublishedList.map((employer, i) => {
                      return (
                        <div key={i}>
                          <div
                            className="card bg-white border-0  mb-2 ms-2 me-2 mt-2"
                            style={{
                              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
                              cursor: "pointer",
                            }}
                          >
                            <div className="container-fluid">
                              <div className="row  ">
                                <div className="col-sm-12 bg-white rounded-3">
                                  <div className="row mt-3 ms-1 me-2">
                                    <div className="col-sm-3">
                                      <p>
                                        <b>Employer ID :</b>{" "}
                                        {employer.employerId}
                                      </p>
                                      <p>
                                        <b>Payment ID:</b> {employer.id}
                                      </p>
                                      <p>
                                        <b>Plan ID :</b> {employer.planId}
                                      </p>
                                    </div>
                                    <div className="col-sm-4">
                                      <p>
                                        <b>Industry:</b> {employer.industry}
                                      </p>
                                      <p>
                                        <b>Job Category:</b>{" "}
                                        {employer.jobCategory}
                                      </p>
                                      <p>
                                        <b>No of Openings :</b>{" "}
                                        {employer.noOfOpenings}
                                      </p>
                                    </div>
                                    <div className="col-sm-5 ">
                                      <div className="d-flex  justify-content-end">
                                        <p className="mx-2">
                                          <b>Time : </b>{" "}
                                          <DDMMYYYY_formate
                                            dateValue={employer.createdTime}
                                          />
                                        </p>
                                        {/* {employer.active == true ? (
                                          <p className="text-success">
                                            <BsFillCircleFill />
                                          </p>
                                        ) : employer.active == false ? (
                                          <p className="text-danger">
                                            <BsFillCircleFill />
                                          </p>
                                        ) : (
                                          <p>Unknown active</p>
                                        )} */}
                                      </div>

                                      <p className="d-flex justify-content-end mt-3">
                                        <a
                                          href={`${webConsoleBaseUrl}/waNotifications/customPostJobPage.html?employer_id=${
                                            employer.employerId
                                          }&adminId=${localStorage.getItem(
                                            "adminID"
                                          )}`}
                                          target="_blank"
                                        >
                                          {/* https://console.taizo.in/waNotifications/customPostJobPage.html?employer_id=2&placement_id=278 */}
                                          <div
                                            className="btn btn-success px-3"
                                            style={{
                                              backgroundColor: "#169C50",
                                            }}
                                          >
                                            <BsFileEarmarkPostFill
                                              className="me-3"
                                              // textAnchor=""
                                            />
                                            Job post
                                          </div>
                                        </a>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <NoDraft />
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

export default EmployerUnpublished;
