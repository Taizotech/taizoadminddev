/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { GetAdminDetailsByID, GetTotalPrevilegesList } from "../../apiServices";
import { useDispatch } from "react-redux";
import { adminDetailsActions } from "../../redux-store/store";

export function hasAccess(dataArray, keyToFind, access) {
  // to check privilage and access
  if (dataArray && dataArray.length > 0) {
    const index = dataArray.findIndex(
      (obj) => obj[keyToFind] && obj[keyToFind][access] === true
    );
    return index !== -1;
  } else {
    return false; // Return false if dataArray is empty or null
  }
}

const AdminAccess = () => {
  let adminAccess = [];
  const Dispatch = useDispatch();

  function HasAccessToPrivilege(
    adminDetails,
    requiredPrivilegeID,
    requiredAccess
  ) {
    // To find the whether the admin has access to the required privilege
    // console.log(adminDetails);
    if (adminDetails) {
      return adminDetails.some((el) => {
        return el.privilegeId === requiredPrivilegeID && el[requiredAccess];
      });
    } else {
      return false;
    }
  }
  useEffect(() => {
    let adminID = localStorage.getItem("adminID");
    GetAdminDetailsByID(adminID).then((data) => {
      // console.log(data, "AdminnnnIddddddddddd");
      let individualAdminPrivileges = data.roles[0].privileges;

      Dispatch(
        adminDetailsActions.setAdminLoginDetails({
          adminID: data.admin.id,
          privileges: data.roles[0].privileges,
          roleID: data.roles[0].roleId,
          emailID: data.roles[0].emailID,
          isActive: data.roles[0].isActive,
          userName: data.admin.userName,
          module: data.admin.module,
          ProfilePic: data.admin.ProfilePic,
        })
      );

      GetAndSetAdminAccess(individualAdminPrivileges);

      // console.log(adminPrivileges);
    });
  }, []);

  function GetAndSetAdminAccess(individualAdminPrivileges) {
    GetTotalPrevilegesList()
      .then((data) => {
        data.privileges.forEach((privilege) => {
          // to create a fully defined access array for this admin
          const privilegeId = privilege.privilegeId;
          const privilegeFunctions = {
            create: HasAccessToPrivilege(
              individualAdminPrivileges,
              privilegeId,
              "create"
            ),
            read: HasAccessToPrivilege(
              individualAdminPrivileges,
              privilegeId,
              "read"
            ),
            update: HasAccessToPrivilege(
              individualAdminPrivileges,
              privilegeId,
              "update"
            ),
            delete: HasAccessToPrivilege(
              individualAdminPrivileges,
              privilegeId,
              "delete"
            ),
          };
          adminAccess = [...adminAccess, { [privilegeId]: privilegeFunctions }];
        });
        Dispatch(adminDetailsActions.setAdminAccess(adminAccess));
      })
      .catch((err) => {
        console.log(err);
        Dispatch(adminDetailsActions.setAdminAccess([]));
        return err;
      });
  }

  return <></>;
};

export default AdminAccess;
