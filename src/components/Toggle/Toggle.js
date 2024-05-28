import React, { useEffect, useState } from "react";
import styles from "./Toggle.module.scss";
import { GetAdminDetailsByID, PutAdminAvailability } from "../../apiServices";
const ToggleSwitch = ({ label }) => {
  // const Dispatch = useDispatch();
  // const adminDetails = useSelector(
  //   (state) => state.adminDetails.adminPrivilages
  // );
  const [checkAdmin, setCheckAdmin] = useState({
    emailId: "",
    available: true,
  });
  useEffect(() => {
    // Fetch the email using GetAdminDetailsByID and update checkAdmin
    let adminID = localStorage.getItem("adminID");
    GetAdminDetailsByID(adminID).then((data) => {
      console.log(data, "jkjhgfhgfghfgfgfgfg");
      console.log(data.admin.emailId, "emailid");
      setCheckAdmin({
        emailId: data.admin.emailId,
        available: data.admin.isAvailable,
      });
    });
  }, []); // Replace adminID with the actual value or variable you want to use

  const handleToggleChange = () => {
    setCheckAdmin((prevState) => ({
      ...prevState,
      available: !prevState.available,
    }));

    // Call the PutAdminAvailability API here with the updated 'checkAdmin' object
    PutAdminAvailability({
      emailId: checkAdmin.emailId,
      available: !checkAdmin.available,
    }).then((data) => {
      console.log(data, "available");
    });
  };

  // useEffect(() => {
  //   let adminID = localStorage.getItem("adminID");
  //   GetAdminDetailsByID(adminID).then((data) => {
  //     console.log(data, "AdminnnnIddddddddddd");
  //     let individualAdminPrivileges = data.roles[0].privileges;

  //     Dispatch(
  //       adminDetailsActions.setAdminLoginDetails({
  //         //  adminID: data.admin.id,
  //         //  privileges: data.roles[0].privileges,
  //         //  roleID: data.roles[0].roleId,
  //         emailID: data.roles[0].emailID,
  //         isActive: data.roles[0].isActive,
  //       })
  //     );
  //   });
  // }, []);
  // useEffect(() => {
  //   GetAdminAvailability(emailID).then((data) => {
  //     console.log(data, "available");
  //   });
  // }, []);
  return (
    <div className={styles.container}>
      {" "}
      {/* Use the CSS module class name */}
      {label}{" "}
      <div className={styles["toggle-switch"]}>
        {" "}
        <input
          type="checkbox"
          className={styles.checkbox}
          name={label}
          id={label}
          checked={checkAdmin.available}
          onChange={handleToggleChange}
        />
        <label className={styles.label} htmlFor={label}>
          <span className={styles.inner} />
          <span className={styles.switch} />
        </label>
      </div>
    </div>
  );
};
export default ToggleSwitch;
