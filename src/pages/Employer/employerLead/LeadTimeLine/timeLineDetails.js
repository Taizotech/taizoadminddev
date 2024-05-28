/* eslint-disable react/jsx-pascal-case */
import CloseIcon from "@mui/icons-material/Close";
import { Ddmmmyyyy_date } from "../../../../utility";

const TimeLineDetails = ({ dataObject, close }) => {
  console.log(dataObject);
  let data = dataObject.details;
  return (
    <>
      <div>
        <div
          className="d-grid justify-content-end mx-sm-4"
          style={{ marginTop: -20 }}
        >
          <button className=" btn btn-outline-danger p-1" onClick={close}>
            <CloseIcon />
          </button>
        </div>
        <p>
          <strong>Event:</strong>
          &nbsp;{data.eventName}
        </p>
        <p>
          <strong>Description:&nbsp;</strong>
          <div
            className="d-inline"
            dangerouslySetInnerHTML={{
              __html: data.eventDescription,
            }}
          />{" "}
        </p>

        {data.notes && (
          <p>
            <strong>Notes:</strong>
            &nbsp;{data.notes}
          </p>
        )}
        <p>
          {" "}
          <strong>Posted On:</strong>
          &nbsp;{<Ddmmmyyyy_date dateValue={data.createdTime} />}
        </p>
      </div>
    </>
  );
};

export default TimeLineDetails;
