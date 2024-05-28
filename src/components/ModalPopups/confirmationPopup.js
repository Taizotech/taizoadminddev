import { Button } from "@mui/material";

const ConfirmationPopup = (props) => {
  return (
    <>
      <div>
        <div className="confirmation-content">
          <h4>{props.heading}</h4>
          {/* <p >{props.headingText}</p> */}
          <p dangerouslySetInnerHTML={{ __html: props.headingText }}>
            {/* Use props.headingText as the source of HTML content */}
          </p>
          <div className="button-container">
            <div className="d-grid justify-content-end">
              <div>
                {" "}
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={props.onRequestClose}
                >
                  Cancel
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button
                  variant="contained"
                  color="success"
                  onClick={props.onConfirm}
                  disabled={props.enableSubmit}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationPopup;
