/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Stack, TextField, Button } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

// import { MyModal, dateFormate,  } from "../../../utility";

import { UpdateKeySkills } from "../../../../apiServices";
import ModalContainer from "../../../../components/modal_popup";
import { MyModal, numbersOnlyTest } from "../../../../utility";

export default function EditKeySkills({ data, getJobRoles }) {
  const [formData, setFormData] = useState({
    id: data.id,
    active: true,
    skill: data.skill,
    showPopup: false,
    completed: false,
    failed: false,
    loading: false,
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, skill: data.skill, id: data.id }));
  }, [formData.showPopup]);

  const [errors, setErrors] = useState({
    skill: "",
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.skill) {
      newErrors.skill = "Key Skills is required";
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
      UpdateKeySkills(formData)
        .then(() => {
          setFormData({ ...formData, loading: false });
          setFormData({ ...formData, completed: true });
          setTimeout(() => {
            setFormData({
              id: "",
              skill: "",
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
                <h4 className="text-center mb-2">Edit Key Skills</h4>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={2}>
                    <TextField
                      id="skill"
                      label="Key Skills"
                      name="skill"
                      value={formData.skill}
                      onChange={(event) => {
                        handleFieldChange("skill", event.target.value);
                        console.log(event.target.value, "goodddd ");
                      }}
                      error={Boolean(errors.skill)}
                      helperText={errors.skill}
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
