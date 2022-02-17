import React from "react";
import { useTranslation } from "react-i18next";

//components
import DialogBox from "../../CommonComponent/DialogBox/dialog_box";

export const CheckCartBox = ({
  isOpenBox,
  boxMessage,
  /**
   * action
   */
  closeBox,
}) => {
    const {t} = useTranslation();
  return (
    <DialogBox isOpen={isOpenBox} closeModal={closeBox}>
      <div className="w-10/12 h-auto max-w-sm mx-auto bg-white rounded-lg shadow-lg py-10">
        <div className="space-y-10 px-4">
          <p className="secondary-font text-center">{boxMessage}</p>
          <div className="w-6/12 h-auto mx-auto">
            <button className="primary-btn py-2" onClick={closeBox}>
                {t('Common.ok')}
            </button>
          </div>
        </div>
      </div>
    </DialogBox>
  );
};
