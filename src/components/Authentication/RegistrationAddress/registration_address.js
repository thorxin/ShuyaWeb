import React from "react";
import { useTranslation } from "react-i18next";

//images
import LocationPinIcon from "../../../assets/common/location_pin_icon.svg";

//components
import { Hook } from "./hook";
import DefaultAuthContainer from "../../WrapperComponents/default_auth_container";
import Box from "../../CommonComponent/AddressDropBox/box";
import { ErrorMessageBoxValidation } from "../../CommonComponent/error_box";
import ConfirmationBox from "../../CommonComponent/DialogBox/confirmation_box";
import AuthenticationLoading from "../../CommonComponent/Loading/auth_loading";
import { goToSpecificPathName } from "../../../util/goToSpecificPathName";
import { GET_LAST_ROUTE_NAME } from "../../../util/storage";
import { HOME_DEFAULT } from "../../../constant/locationPathName";
import { useHistory } from "react-router-dom";

export default function RegistrationAddress(props) {
  const [
    isLoading,
    isSecondaryLoading,
    cityList,
    isOpenCityBox,
    initialSelectedCity,
    selectedCity,
    isOpenTownshipBox,
    townshipList,
    initialTownshipName,
    selectedTownship,
    notHaveTownship,
    address,
    isRequiredAddress,
    isShowConfirmBox,
    setIsShowConfirmBox,
    isRequiredCity,
    isRequiredTownship,
    /**
     * action
     */
    openCityBox,
    closeCityBox,
    searchingCity,
    onClickCity,
    openTownshipBox,
    closeTownshipBox,
    searchingTownship,
    onClickTownship,
    onSubmit,
    onChangeAddress,
    clickingConfirmBtn,
  ] = Hook(props);

  const { t } = useTranslation();
  const history = useHistory();

  let confirmMessage = `${t("Authentication.change-address-confirm-msg-1")} ${t(
    "Authentication.city"
  )} - ${selectedCity?.name} ${!notHaveTownship
      ? `${t("Common.and")} ${t("Authentication.township")} - ${selectedTownship?.name
      }`
      : ""
    } ${t("Authentication.change-address-confirm-msg-2")}`;

  return (
    <section>
      <DefaultAuthContainer
        goTo={() =>
          goToSpecificPathName(
            history,
            GET_LAST_ROUTE_NAME ? GET_LAST_ROUTE_NAME : HOME_DEFAULT
          )
        }
      >
        <div>
          <p className="sub-heading-font text-center">
            {t("Authentication.enter-address")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-y-4">
          <div>
            <Box
              Loading={isLoading}
              AddressTypeName={t("Authentication.search-city")}
              List={cityList}
              InitialSelectedData={initialSelectedCity}
              SelectedData={selectedCity}
              IsOpenBox={isOpenCityBox}
              /**
               * action
               */
              OpenBox={openCityBox}
              CloseBox={closeCityBox}
              ClickingBoxItem={onClickCity}
              SearchingValue={searchingCity}
            />
            {isRequiredCity && (
              <ErrorMessageBoxValidation
                errorMessage={t("Authentication.add-city")}
              />
            )}
          </div>
          <div>
            <Box
              Loading={isLoading}
              AddressTypeName={t("Authentication.search-township")}
              List={townshipList}
              InitialSelectedData={initialTownshipName}
              SelectedData={selectedTownship}
              IsNotHaveTownship={notHaveTownship}
              IsOpenBox={isOpenTownshipBox}
              /**
               * action
               */
              OpenBox={openTownshipBox}
              CloseBox={closeTownshipBox}
              ClickingBoxItem={onClickTownship}
              SearchingValue={searchingTownship}
            />
          </div>
          {isRequiredTownship && (
            <ErrorMessageBoxValidation
              errorMessage={`${t("Authentication.error-message-en")} ${t(
                "Authentication.address"
              )} ${t("Authentication.error-message")}`}
            />
          )}
          <div>
            <textarea
              className="primary-font resize-y shadow-lg border w-full h-36 py-2 px-3"
              placeholder={t("Authentication.add-address")}
              onChange={(e) => onChangeAddress(e.target.value)}
              value={address}
            />
            {isRequiredAddress && (
              <ErrorMessageBoxValidation
                errorMessage={`${t("Authentication.error-message-en")} ${t(
                  "Authentication.address"
                )} ${t("Authentication.error-message")}`}
              />
            )}
          </div>
          <div className="mt-5">
            <button onClick={clickingConfirmBtn} className="auth-btn">
              {isSecondaryLoading ? (
                <AuthenticationLoading />
              ) : (
                <p>{t("Authentication.confirm")}</p>
              )}
            </button>
          </div>
        </div>
      </DefaultAuthContainer>
      <ConfirmationBox
        isOpenBox={isShowConfirmBox}
        Icon={LocationPinIcon}
        ConfirmationMessage={confirmMessage}
        /**
         * action
         */
        cancelBox={() => setIsShowConfirmBox(false)}
        confirmBox={onSubmit}
      />
    </section>
  );
}
