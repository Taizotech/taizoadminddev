import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import interviewStyle from "../Candidate/Candidate interview schedule list/candidateInterviewSchedule.module.scss";
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { MyModal } from "../../utility";
import ModalContainer from "../../components/modal_popup";
import { GetAdminDeveloper } from "../../apiServices";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import { BugFixerTableActions } from "../../redux-store/store";

function BugFixerFilter() {
  const adminDetails = useSelector((state) => state.adminDetails);
  let isSuperAdmin = adminDetails.roleID == 1;
  const BugFixerList = useSelector(
    (state) => state.BugFixerTableDetails.FieldBugFixFilter
  );
  const assignedTo = useSelector(
    (state) => state.BugFixerTableDetails.FieldBugFixFilter.assignedTo
  );
  console.log(assignedTo, "assignedTo");
  const Dispatch = useDispatch();

  const initialValues = {
    // adminId: isSuperAdmin ? 0 : localStorage.getItem("adminID"),
    
    assignedTo: BugFixerList.assignedTo,
    priority: BugFixerList.priority,
    status: BugFixerList.status,
    id: BugFixerList.id,
    // page: BugFixerList.page,
    // size: BugFixerList.size,
  };
  const [formData, setFormData] = useState(initialValues);
  const handleCloseModal = () => {
    setShowFilter(false);
  };
  useEffect(() => {}, [BugFixerList]);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await GetAdminDeveloper();
        setUsers(data.AdminDetails);
        console.log(data.AdminDetails, "data.AdminDetails");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  const size = useSelector(
    (state) => state.BugFixerTableDetails.FieldBugFixFilter.size
  );
  const BugFixerListRedDot = useSelector(
    (state) => state.BugFixerTableDetails.FieldBugFixFilter.size
  );

  const [adminList, setAdminList] = useState([]);
  const [showRedDot, setShowRedDot] = useState(false);
  const [users, setUsers] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  const handleChange = (event, newValue) => {
    // setSelectedUserId(newValue);
    console.log(newValue, "good good ");
    // const joinedValue = newValue.join(",");
    setFormData((prev) => ({
      ...prev,
      assignedTo: newValue,
    }));
    // Dispatch(BugFixerTableActions.setFieldBugFixFilterAssignTo(newValue));
  };

  const handlePriority = (event, value) => {
    // const { value } = event.target;
    // setPriority(value);
    console.log(event.value, "vlueeee");
    setFormData((prev) => ({
      ...prev,
      priority: event.value,
    }));
  };

  const handleStatus = (event, value) => {
    // const { value } = event.target;
    // setPriority(value);
    console.log(event.value, "vlueeee status");
    setFormData((prev) => ({
      ...prev,
      status: event.value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(formData, "good hel");
    Dispatch(
      BugFixerTableActions.setFieldBugFixFilter({
        ...formData,
        page: 0,
        size: size,
        // assignedTo: assignedTo,
        // assignedTo:assignedTo,
        // joinedOn: dateRange.start || joinedOn,
        // joinedEnd: dateRange.end || joinedEnd,
        // dateFilterType: dateRange.dateFilterType || "",
      })
    );

    // const isFilterApplied = JoinedList.contactNumber || JoinedList.companyName;

    // Dispatch(CandidateJoinedListActions.setJoinedFilterRedDot(isFilterApplied));

    setShowFilter(false);
  };
  function handleClear(e) {
    e.preventDefault();
    setFormData({
      id:"",
      assignedTo: [],
      priority: "",
      status: "",
    });

    setShowRedDot(false);
    Dispatch(
      BugFixerTableActions.setFieldBugFixFilter({
        ...initialValues,
        page: 0,
        size: size,
      })
    );
  }
  return (
    <div>
      <div className="d-flex justify-content-end">
        <button
          className={`rounded-pill d-flex align-items-center ${interviewStyle.Filterbutton}`}
          variant="contained"
          onClick={() => setShowFilter(true)}
        >
          <BiFilterAlt />{" "}
          {/* <p
            style={{
              backgroundColor: BugFixerListRedDot ? "red" : "transparent",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
            }}
          ></p>{" "} */}
          Filter
        </button>
      </div>
      {showFilter && (
        <MyModal>
          <ModalContainer
            zIndex={1001}
            childComponent={
              <div className={`${interviewStyle.BoxContainerWidth}`}>
                <>
                  <div className="d-flex justify-content-between">
                    <h4 className="text-center mb-2">Filter by</h4>
                    <h3>
                      <span
                        //   onClick={handleClickCross}
                        className="btn btn-outline-danger"
                        style={{ cursor: "pointer", fontSize: 15 }}
                        onClick={handleCloseModal}
                      >
                        <AiOutlineClose />
                      </span>
                    </h3>
                  </div>

                  <form
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    <div className="row">
                      <div className="col-sm-6 mb-3 ">
                        <FormControl fullWidth>
                          <InputLabel id="priority-label">Priority</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.priority}
                            onChange={(event, value) =>
                              handlePriority(event.target, value)
                            }
                            fullWidth
                          >
                            <MenuItem value="High">High</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="Low">Low</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="col-sm-6">
                        {" "}
                        <FormControl fullWidth>
                          <InputLabel id="status-label">Status</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.status}
                            onChange={(event, value) =>
                              handleStatus(event.target, value)
                            }
                            fullWidth
                          >
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Hold">Hold</MenuItem>
                            <MenuItem value="Inprogress">Inprogress</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      filterSelectedOptions
                      options={users.map((option) => option.userName)}
                      getOptionLabel={(user) => user}
                      value={formData.assignedTo}
                      // value={selectedUserId || []} // Ensure selectedUserId is in correct format
                      onChange={(event, value) => handleChange(event, value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Task Assigned To"
                          placeholder="Select assigned users"
                          // error={!!errors.selectedUserId}
                        />
                      )}
                    />

                    <div className="d-flex flex-row gap-2 justify-content-end mt-2">
                      <button
                        className={`rounded-pill ${interviewStyle.Filterbutton}`}
                        variant="outlined"
                        onClick={(e) => {
                          handleClear(e);
                        }}
                      >
                        Clear All
                      </button>
                      <button
                        className={`rounded-pill ${interviewStyle.search}`}
                        type="submit"
                        variant="contained"
                        sx={{ minWidth: "150px" }}
                      >
                        Search
                        {/* {!formData.loading && !formData.completed && "Search"}

                          {
                            formData.loading && (
                              <div className="spinner-border spinner-border-sm text-light"></div>
                            ) // Add spinner here
                          }
                          {formData.completed && "Submitted"} */}
                      </button>
                    </div>
                  </form>
                </>
              </div>
            }
          />
        </MyModal>
      )}
    </div>
  );
}

export default BugFixerFilter;
