import React from "react";
import { useTranslation } from "react-i18next";

//components
import DialogBox from "../../CommonComponent/DialogBox/dialog_box";

export const RemovedCartBox = ({
  isOpenBox,
  boxMessage,
  /**
   * action
   */
  cancelBox,
  confirmBox,
}) => {
  const { t } = useTranslation();
  return (
    <DialogBox isOpen={isOpenBox} closeModal={cancelBox}>
      <div className="w-10/12 h-auto max-w-sm mx-auto">
        <div className="bg-white rounded-lg shadow-lg backdrop-filter backdrop-blur-sm py-10">
          <div className="default-margin-layout space-y-10">
            <p className="tertiary-font text-center text-color-default">{boxMessage}</p>
            <div className="grid grid-cols-2 gap-x-2 md:mx-auto mx-4">
              <div>
                <button className="secondary-btn tertiary-font py-2" onClick={cancelBox}>
                  {t("Common.not-do")}
                </button>
              </div>
              <div>
                <button className="primary-btn tertiary-font py-2" onClick={confirmBox}>
                  {t("Common.do")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogBox>
  );
};
