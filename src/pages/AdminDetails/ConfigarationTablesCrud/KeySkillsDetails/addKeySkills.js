import React, { useEffect, useState } from "react";
import { Stack, TextField, Button } from "@mui/material";

import ModalContainer from "../../../../components/modal_popup";
import { MyModal, numbersOnlyTest } from "../../../../utility";
import { PostKeySkillsInCfgTable } from "../../../../apiServices";
import SuccessTick from "../../../../components/success_tick";
import styles from "../JobRoleDetails/jobRolesTable.module.scss";
export default function AddKeySkills({ onSuccess }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    skill: "",
    showPopup: false,
    completed: false,
    failed: false,
    loading: false,
  });

  const [errors, setErrors] = useState({
    skill: "",
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.skill) {
      newErrors.skill = "skill is required";
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
    setErrors({
      ...errors,
      skill: "",
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Submit the form or handle the action
      console.log("Form submitted:", formData);
      setFormData((prev) => ({ ...prev, loading: true }));
      PostKeySkillsInCfgTable(formData)
        .then(() => {
          setShowSuccess(true);
          setFormData({ ...formData, loading: false });
          setFormData({ ...formData, completed: true });
          setTimeout(() => {
            setShowSuccess(false);
            setFormData({
              skill: "",
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
          onClick={(event) =>
            setFormData({
              ...formData,
              showPopup: true,
            })
          }
        >
          + Add key Skill
        </button>
      </div>
      {formData.showPopup && (
        <MyModal>
          <ModalContainer
            zIndex={1001}
            childComponent={
              <>
                <h4 className="text-center mb-2">Add New Key Skills</h4>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={2}>
                    <TextField
                      id="skill"
                      label="Key Skills"
                      name="skill"
                      value={formData.skill}
                      onChange={(event) =>
                        handleFieldChange("skill", event.target.value)
                      }
                      error={Boolean(errors.skill)}
                      helperText={errors.skill}
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
