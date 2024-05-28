import CallDetailsDrawer from "./callDetailsDrawer";
import DenseTable from "./callList";

const CallsContainer = () => {
  return (
    <>
      <div>
        <h3>Call Details</h3>
        <DenseTable />
      </div>
      <CallDetailsDrawer />
    </>
  );
};

export default CallsContainer;
