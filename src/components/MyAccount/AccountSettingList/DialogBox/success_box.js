import React from "react";
import { useTranslation } from "react-i18next";

//components
import DialogBox from "./dialog_box";

const SuccessBox = ({
  isOpenBox,
  SuccessMessage,
  SuccessImage = "",
  /**
   * action
   */
  continueProcess,
  cancelBox,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <DialogBox isOpen={isOpenBox} closeModal={cancelBox}>
        <div className="w-10/12 h-auto max-w-sm mx-auto bg-white rounded-lg shadow-lg backdrop-filter backdrop-blur-sm py-10">
          <div className="space-y-10 px-4">
            {SuccessImage && (
              <div className="w-full h-auto">
                <img
                  src={SuccessImage}
                  className="w-20 h-auto mx-auto"
                  alt="Successful Image"
                />
              </div>
            )}
            <p className=" tertiary-font text-color-default text-center">
              {SuccessMessage}
            </p>
            <div className="w-full h-auto mx-auto">
              <button
                className="primary-btn tertiary-font py-2"
                onClick={continueProcess}
              >
                {t("Common.do")}
              </button>
            </div>
          </div>
        </div>
      </DialogBox>
    </>
  );
};

export default SuccessBox;
