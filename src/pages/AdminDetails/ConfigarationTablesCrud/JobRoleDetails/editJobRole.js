/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Stack, TextField, Button } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

// import { MyModal, dateFormate,  } from "../../../utility";

import { UpdateJobRoles } from "../../../../apiServices";
import ModalContainer from "../../../../components/modal_popup";
import { MyModal, numbersOnlyTest } from "../../../../utility";

export default function EditJobRole({ data, getJobRoles }) {
  const [formData, setFormData] = useState({
    id: data.id,
    active: true,
    jobRole: data.jobRoles,
    showPopup: false,
    completed: false,
    failed: false,
    loading: false,
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, jobRole: data.jobRoles, id: data.id }));
  }, [formData.showPopup]);

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
      UpdateJobRoles(formData)
        .then(() => {
          setFormData({ ...formData, loading: false });
          setFormData({ ...formData, completed: true });
          setTimeout(() => {
            setFormData({
              id: "",
              jobRole: "",
              active: true,
              showPopup: false,
              completed: false,
              failed: false,
              loading: false,
            });
            getJobRoles();
          }, [1000]);
        })
        .catch(() => {
          alert("Something went wrong, Please try again later.");
        });
    }
  };

  return (
    <div>
      <div>
        <span
          onClick={(event) => {
            setFormData({
              ...formData,
              showPopup: true,
            });
          }}
        >
          <EditIcon />{" "}
        </span>
      </div>
      {formData.showPopup && (
        <MyModal>
          <ModalContainer
            zIndex={1001}
            childComponent={
              <>
                <h4 className="text-center mb-2">Edit Job Role</h4>
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
                      required
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
    </div>
  );
}
