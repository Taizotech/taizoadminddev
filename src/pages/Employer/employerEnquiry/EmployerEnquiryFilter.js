/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import FBStyle from "../../Candidate/FacebookMeta/candidateFacebookMeta.module.scss";
import { BiFilterAlt } from "react-icons/bi";
import { MyModal, numbersOnlyTest } from "../../../utility";
import ModalContainer from "../../../components/modal_popup";
import { AiOutlineClose, AiOutlinePhone } from "react-icons/ai";
import { Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { EmployerEnquiryActions } from "../../../redux-store/store";
function EmployerEnquiryFilter() {
  const [showFilter, setShowFilter] = useState(false);
  const EmployerFilter = useSelector(
    (state) => state.EmployerEnquiryDetails.EmployerEnquiryFilter
  );
  const size = useSelector(
    (state) => state.EmployerEnquiryDetails.EmployerEnquiryFilter.size
  );
  const Dispatch = useDispatch();
  const initialState = {
    companyName: EmployerFilter.companyName,
    mobileNumber: EmployerFilter.mobileNumber,
    emailId: EmployerFilter.emailId,
  };
  const [formData, setFormData] = useState(initialState);
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  function handleFieldChange(field, value) {
    switch (field) {
      case "mobileNumber":
        if (numbersOnlyTest(value)) {
          setFormData({ ...formData, [field]: value });
        }
        break;
      case "companyName":
        setFormData({ ...formData, [field]: value });
        break;
      case "emailId":
        setFormData({ ...formData, [field]: value });
        break;
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    Dispatch(
      EmployerEnquiryActions.setEmployerEnquiryFilter({
        ...formData,
        page: 1,
        size: size,
        // dateFilterType: dateRange.dateFilterType || "",
      })
    );

    setShowFilter(false);
  };
  function handleClear(e) {
    e.preventDefault();
    setFormData({
      companyName: "",
      mobileNumber: "",
      emailId: "",
    });
    // setSelectedValue("");
    //   setDateRange({
    //     start: null,
    //     end: null,
    //     dateFilterType: "",
    //   });

    Dispatch(
      EmployerEnquiryActions.setEmployerEnquiryFilter({
        ...initialState,
        //   createdTime: "",
        //   endDate: "",
        page: 1,
        size: size,
        //   dateFilterType: "",
      })
    );
  }
  function handleClickCross(e) {
    e.preventDefault();
    Dispatch(
      EmployerEnquiryActions.setEmployerEnquiryFilter({
        ...formData,
        page: 1,
        size: size,
        // createdTime: create,
        // endDate: ended,
        // dateFilterType: dateRange.dateFilterType,
      })
    );
    setShowFilter(false);
  }
  return (
    <>
      <div>
        <div className="d-flex justify-content-end">
          <button
            className={`rounded-pill d-flex align-items-center ${FBStyle.Filterbutton}`}
            variant="contained"
            onClick={() => setShowFilter(true)}
          >
            <BiFilterAlt style={{ marginRight: 5 }} /> Filter
          </button>
        </div>
      </div>
      {showFilter && (
        <MyModal>
          <ModalContainer
            childComponent={
              <>
                <div className="d-flex justify-content-between">
                  <h4 className="text-center mb-2">Filter by</h4>
                  <h3>
                    <span
                      onClick={handleClickCross}
                      className="btn btn-outline-danger"
                      style={{ cursor: "pointer", fontSize: 15 }}
                    >
                      <AiOutlineClose />
                    </span>
                  </h3>
                </div>
                <div className={`${FBStyle.BoxContainerEnquiry}`}>
                  <>
                    <form
                      onSubmit={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      <Stack className="mt-1">
                        {" "}
                        <div className="row">
                          <div className="col-sm-4">
                            <TextField
                              id="outlined-basic"
                              label="Mobile number"
                              variant="outlined"
                              fullWidth
                              value={formData.mobileNumber}
                              // inputProps={{ maxLenth: 10 }}
                              onChange={(event) =>
                                // event.target.value.length <= 10 &&
                                handleFieldChange(
                                  "mobileNumber",
                                  event.target.value
                                )
                              }
                              inputProps={{ maxLength: 10 }}
                              InputProps={{
                                startAdornment: (
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <AiOutlinePhone
                                      style={{ marginRight: "5px" }}
                                    />{" "}
                                    +91
                                  </span>
                                ),
                              }}
                            />
                          </div>
                          <div className="col-sm-4">
                            <TextField
                              fullWidth
                              label="Company Name"
                              id="companyName"
                              type="text"
                              value={formData.companyName}
                              onChange={(event) =>
                                handleFieldChange(
                                  "companyName",
                                  event.target.value
                                )
                              }
                            />
                          </div>
                          <div className="col-sm-4">
                            <TextField
                              fullWidth
                              label="Email Id"
                              id="emailId"
                              type="text"
                              value={formData.emailId}
                              onChange={(event) =>
                                handleFieldChange("emailId", event.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row gap-2 justify-content-end mt-4">
                          <button
                            className={`rounded-pill ${FBStyle.Filterbutton}`}
                            variant="outlined"
                            onClick={(e) => {
                              handleClear(e);
                            }}
                          >
                            Clear All
                          </button>
                          <button
                            className={`rounded-pill ${FBStyle.search}`}
                            type="submit"
                            variant="contained"
                            sx={{ minWidth: "150px" }}
                          >
                            Search
                          </button>
                        </div>
                      </Stack>
                    </form>
                  </>
                </div>
              </>
            }
          />
        </MyModal>
      )}
    </>
  );
}

export default EmployerEnquiryFilter;
