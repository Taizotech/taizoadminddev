/* eslint-disable react/jsx-pascal-case */
/* eslint-disable eqeqeq */
import { useState, useEffect } from "react";
import { GetEmployerCallRegistry } from "../../../apiServices";
import { CircularProgress, Pagination, Stack, TextField } from "@mui/material";
import style from "../../Candidate/Call Registry/callRegistry.module.scss";
import { debounce } from "lodash";
import { Ddmmmyyyy_date } from "../../../utility";
import { useDispatch } from "react-redux";
import { commonPopupActions } from "../../../redux-store/store";
function EmployerRegistry() {
  const [jobId, setJobId] = useState("");
  const [callRegistryList, setCallRegistryList] = useState({
    data: {},
    show: false,
    showLoader: false,
    totalDataCount: 0,
  });

  const [pageDetails, setPageDetails] = useState({
    currentPage: 0,
    totalPages: 1,
  });
  const Dispatch = useDispatch();

  const handleJobIdChange = (event) => {
    const newValue = event.target.value.replace(/\D/g, "").slice(0, 5); // Restrict to numbers and limit to 5 characters
    setJobId(newValue);
    setPageDetails((prev) => {
      return { ...prev, currentPage: 0 };
    });
  };

  const handlePaginationChange = (event, value) => {
    setPageDetails((prev) => {
      return { ...prev, currentPage: value - 1 };
    });
  };

  useEffect(() => {
    let debouncedAPICall = debounce(() => {
      setCallRegistryList((prev) => {
        return { ...prev, showLoader: true };
      });
      if (jobId !== "") {
        GetEmployerCallRegistry(pageDetails.currentPage, jobId).then((data) => {
          // to hide loader
          setCallRegistryList((prev) => {
            return { ...prev, showLoader: false };
          });

          if (data.code == "400") {
            // to show no jobs and hide loader
            setCallRegistryList((prev) => {
              return { ...prev, show: false, totalDataCount: 0 };
            });

            return false;
          }
          console.log(data);
          setCallRegistryList((prev) => {
            return {
              ...prev,
              data: data,
              show: true,
              totalDataCount: data.data.totalElements,
            };
          });
          setPageDetails((prev) => {
            return { ...prev, totalPages: data.data.totalPages };
          });
        });
      } else {
        GetEmployerCallRegistry(pageDetails.currentPage).then((data) => {
          // to hide loader
          setCallRegistryList((prev) => {
            return { ...prev, showLoader: false };
          });
          if (data.code == "400") {
            // to show no jobs
            setCallRegistryList((prev) => {
              return {
                ...prev,
                show: false,
                totalDataCount: 0,
              };
            });

            return false;
          }

          // to set data
          console.log(data);
          setCallRegistryList((prev) => {
            return {
              ...prev,
              data: data,
              show: true,
              totalDataCount: data.data.totalElements,
            };
          });
          setPageDetails((prev) => {
            return { ...prev, totalPages: data.data.totalPages };
          });
        });
      }
    }, [300]);

    debouncedAPICall();
  }, [jobId, pageDetails.currentPage]);

  useEffect(() => {
    console.log(callRegistryList);
  }, [callRegistryList]);

  function NoList() {
    const containerStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh", // Adjust the height as needed
    };

    return (
      <div style={containerStyle}>
        <div className={`text-center text-danger`}>
          <b className="mt-5">No calls for this job</b>
        </div>
      </div>
    );
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
    <>
      <div className="container-fluid">
        <div className="">
          <div className="row mb-2">
            <div className="col-sm-10 d-flex justify-content-center align-items-center">
              {/* <h4 className="">
                <b>Employer Call Registry</b>
              </h4> */}
            </div>
            <div className="col-sm-2">
              <div className="d-flex justify-content-end ">
                <TextField
                  name="jobseekerKeskills"
                  color="primary"
                  label="Job ID"
                  variant="outlined"
                  placeholder="Job ID"
                  fullWidth
                  multiline
                  helperText=""
                  value={jobId}
                  onChange={handleJobIdChange}
                />
              </div>
            </div>
          </div>
        </div>
        {/* d-flex flex-row justify-content-center mt-4 */}
        <div className="">
          <div className="row">
            <div className="col-sm-12">
              {callRegistryList.showLoader && (
                <div
                  className={`${style.loader_wrp} mt-1 d-grid justify-content-center align-items-center`}
                >
                  <CircularProgress />
                </div>
              )}
              {callRegistryList.show && !callRegistryList.showLoader && (
                <>
                  <div className={`${style.call_list_wrp}`}>
                    {callRegistryList.data.data.content.map((can, i) => (
                      <div key={i} className={`${style.call_list_item}`}>
                        <div className="row">
                          <div className="col">
                            <p>
                              {" "}
                              <b>Call Time: </b>
                              <Ddmmmyyyy_date dateValue={can.callTime} />
                            </p>
                            <span
                              onClick={() => {
                                handlePopupDetails(
                                  can.empId,
                                  "employerDetails"
                                );
                              }}
                            >
                              <p>
                                {" "}
                                <b>Employer ID: </b> {can.empId}
                              </p>
                            </span>
                          </div>
                          <div className="col">
                            <span
                              onClick={() => {
                                handlePopupDetails(can.cId, "candidateDetails");
                              }}
                            >
                              <p>
                                {" "}
                                <b>Candidate ID: </b> {can.cId}{" "}
                              </p>
                            </span>
                            <span
                              onClick={() => {
                                handlePopupDetails(can.jid, "jobDetails");
                              }}
                            >
                              <p>
                                {" "}
                                <b>Job ID: </b> {can.jid}
                              </p>
                            </span>
                          </div>
                          <div className="col-sm-2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {!callRegistryList.show && !callRegistryList.showLoader && (
                <NoList />
              )}

              <div className="d-flex justify-content-center mt-4">
                <Stack spacing={2}>
                  <Pagination
                    count={pageDetails.totalPages}
                    onChange={handlePaginationChange}
                  />
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployerRegistry;
