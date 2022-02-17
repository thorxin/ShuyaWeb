import { useHistory } from "react-router";
import { useState } from "react";

//components
import { HOME_DEFAULT } from "../../../constant/locationPathName";
import { goToSpecificPathNameWithData } from "../../../util/goToSpecificPathName";
import { clearLocalStorageForLogOut } from "../../../util/storage";

export function Hook() {
  const history = useHistory();

  const goTo = (location = "", data) => {
    goToSpecificPathNameWithData(history, location, data);
  };

  const clickOnLogout = () => {
      clearLocalStorageForLogOut();
      window.location.replace(HOME_DEFAULT);
  };

  const [isShowLogoutBox, setIsShowLogoutBox] = useState(false);

  const clickingLogout = () => {
    setIsShowLogoutBox(true);
  };
  const confirmLogout = () => {
    clickOnLogout();
  };

  return [
    /**
     * action
     */
    goTo,
    isShowLogoutBox,
    setIsShowLogoutBox,
    clickingLogout,
    confirmLogout
  ];
}
