import React from "react";
import { BiFilterAlt } from "react-icons/bi";
import tablestyle from "./RecruitmentLeads.module.scss";

function LeadFilter() {
  return (
    // function handleClickCross(e) {
    //   e.preventDefault();

    // }
    <div>
      <div className="d-flex justify-content-end">
        <button
          className={`rounded-pill d-flex align-items-center ${tablestyle.Filterbutton}`}
          variant="contained"
          //   onClick={() => setShowFilter(true)}
        >
          <BiFilterAlt />{" "}
          {/* <p
            style={{
              backgroundColor: JoinedListRedDot ? "red" : "transparent",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
            }}
          ></p>{" "} */}
          Filter
        </button>
      </div>
      {/* {showFilter && ( */}
      {/* <MyModal>
        <ModalContainer
          zIndex={1001}
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
              <div className={`${registercandidatestyle.BoxContainerWidth}`}>
                <form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  <>
                    <div className="row">
                      <div className="col-md-3 mt-1 mt-sm-0">
                        <TextField
                          id="outlined-basic"
                          label="Mobile number"
                          variant="outlined"
                          fullWidth
                          value={filteredObj.mobileNumber}
                          defaultValue={filterDetails.mobileNumber}
                          onChange={handleCandidateIDChange}
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
                      <div className="col-md-3 mt-1 mt-sm-0">
                          <Autocomplete
                            limitTags={1}
                            name="industries"
                            multiple
                            id="tags-outlined"
                            onChange={(event, value) => {
                              updateIndustry(value);
                            }}
                            options={(options.Industries || []).map(
                              (option) => option
                            )}
                            getOptionLabel={(option) => `${option.options}`}
                            filterSelectedOptions
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Job industries"
                                placeholder="Favorites"
                              />
                            )}
                          />
                        </div>
                    </div>
                    <div className="d-flex flex-row gap-2 justify-content-end mt-4">
                      <button
                        className={`rounded-pill ${FBStyle.Filterbutton}`}
                        variant="outlined"
                        type="button"
                        onClick={(e) => {
                          onClearFilter(e);
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
                  </>
                </form>
              </div>
            </>
          }
        />
      </MyModal> */}
      {/* )} */}
    </div>
  );
}

export default LeadFilter;
