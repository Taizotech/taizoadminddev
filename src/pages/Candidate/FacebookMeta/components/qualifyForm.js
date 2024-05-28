/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { UpdateMetaLeads } from "../../../../apiServices";
const QualifyForm = ({
  id,
  whatsApp,
  name,
  onConfirm,
  onRequestClose,
  updateNotes,
  handleOpenModal,
}) => {
  const [loading, setLoading] = useState(false);
  // const FbMetaleadList = useSelector(
  //   (state) => state.FbmetaLeadDetails.FBmetaList
  // );
  // useEffect(() => {
  //   console.log(FbMetaleadList, "FbMetaleadList");
  // }, []);
  useEffect(() => {
    console.log("whatsApp" + whatsApp + "name" + name);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    handleOpenModal();
    setLoading(true);

    UpdateMetaLeads(data, id)
      .then((res) => {
        onConfirm(data.notes);
      })
      .catch((err) => {
        alert("Something went wrong" + err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="px-3">
      <div>
        <h3 className="text-center">Qualify Candidate</h3>
      </div>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("whatsappNumber", {
            required: "Whatsapp Number is required",
            pattern: {
              value: /^\d{10}$/,
              message: "Invalid phone number",
            },
          })}
          inputProps={{
            maxLength: 10,
          }}
          style={{
            marginTop: "20px",
          }}
          fullWidth
          defaultValue={whatsApp}
          label="Whatsapp Number"
          type="tel"
          error={Boolean(errors.whatsappNumber)}
          helperText={errors.whatsappNumber?.message}
        />
        <br />

        <TextField
          {...register("name", {
            required: "Name is required",
          })}
          style={{
            marginTop: "20px",
          }}
          fullWidth
          defaultValue={name}
          label="Name"
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          inputProps={{
            maxLength: 30,
          }}
        />
        <br />

        <TextField
          multiline
          inputProps={{
            maxLength: 100,
          }}
          {...register("notes")}
          style={{
            marginTop: "20px",
          }}
          // defaultValue={name}
          fullWidth
          label="Notes"
          error={Boolean(errors.notes)}
          helperText={errors.notes?.message}
        />

        <div className="d-flex flex-row justify-content-end gap-2 mt-3">
          <Button
            onClick={() => {
              onRequestClose();
            }}
            type="button"
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            // onClick={handleOpenModal}
            disabled={loading} // Disable the button when loading is true
          >
            {loading ? "Qualifying..." : "Qualify"}
            {/* NEXT */}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QualifyForm;
