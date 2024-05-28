import React, { useEffect, useState } from "react";
import { Stack, TextField, Button } from "@mui/material";

import ModalContainer from "../../../../components/modal_popup";
import { MyModal, numbersOnlyTest } from "../../../../utility";
import { PostJobRoleInCfgTable } from "../../../../apiServices";
import SuccessTick from "../../../../components/success_tick";
import styles from "./jobRolesTable.module.scss";

export default function AddJobRole({ onSuccess }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    jobRole: "",
    showPopup: false,
    completed: false,
    failed: false,
    loading: false,
  });

  const [errors, setErrors] = useState({
    jobRole: "",
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.jobRole) {
      newErrors.jobRole = "Job Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  function handleFieldChange(field, value) {
    console.log(numbersOnlyTest(value));
    setFormData({
      ...formData,
      [field]: value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Submit the form or handle the action
      console.log("Form submitted:", formData);
      setFormData((prev) => ({ ...prev, loading: true }));
      PostJobRoleInCfgTable(formData)
        .then(() => {
          setShowSuccess(true);
          setFormData({ ...formData, loading: false });
          setFormData({ ...formData, completed: true });
          setTimeout(() => {
            setShowSuccess(false);
            setFormData({
              jobRole: "",
              showPopup: false,
              completed: false,
              failed: false,
              loading: false,
            });
          }, [2000]);
          onSuccess();
        })
        .catch(() => {
          alert("Something went wrong, Please try again later.");
        });
    }
  };

  return (
    <div>
      <div>
        <button
          className={`btn ${styles.AddroleButton}`}
          // style={{
          //   backgroundColor: "#02c04124",
          //   color: "#169c50",
          //   border: "1px solid #169c50",
          //   transition: "background-color 0.3s, color 0.3s",
          //   ":hover": {
          //     backgroundColor: "#169c50",
          //     color: "#fff",
          //     cursor: "pointer",
          //   },
          // }}
          onClick={(event) =>
            setFormData({
              ...formData,
              showPopup: true,
            })
          }
        >
          + Add Job Role
        </button>
      </div>
      {formData.showPopup && (
        <MyModal>
          <ModalContainer
            zIndex={1001}
            childComponent={
              <>
                <h4 className="text-center mb-2">Add New Job Role</h4>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={2}>
                    <TextField
                      id="jobRole"
                      label="Job Role"
                      name="jobRole"
                      value={formData.jobRole}
                      onChange={(event) =>
                        handleFieldChange("jobRole", event.target.value)
                      }
                      error={Boolean(errors.jobRole)}
                      helperText={errors.jobRole}
                      fullWidth
                      // required
                      inputProps={{ maxLength: 50 }}
                    />

                    <div className="d-flex flex-row gap-5 justify-content-end">
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={(event) =>
                          setFormData({
                            ...formData,
                            showPopup: false,
                          })
                        }
                      >
                        Close
                      </Button>
                      <Button
                        disabled={formData.loading}
                        type="submit"
                        variant="contained"
                        sx={{ minWidth: "150px" }}
                      >
                        {!formData.loading && !formData.completed && "Submit"}

                        {
                          formData.loading && (
                            <div className="spinner-border spinner-border-sm text-light"></div>
                          ) // Add spinner here
                        }

                        {formData.completed && "Submitted"}
                      </Button>
                    </div>
                  </Stack>
                </form>
              </>
            }
          ></ModalContainer>
        </MyModal>
      )}
      {showSuccess && (
        <MyModal>
          <ModalContainer
            zIndex={1003}
            childComponent={<SuccessTick HeadText="Successfully Added" />}
          />
        </MyModal>
      )}
    </div>
  );
}
