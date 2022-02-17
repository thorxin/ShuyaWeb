import React, { useState } from "react";
import { useTranslation } from "react-i18next";

//components
import dateFormatter from "../../../util/dateFormatter";
import ConfirmationBox from "../../CommonComponent/DialogBox/confirmation_box";

//images
import TrashIcon from "../../../assets/shoppingcart/Trash_icon.svg";

const ListItem = ({
  Image = "",
  Text = "",
  Name = "",
  Date = "",
  IsValid = true,
  IsMyQuestion = false,
  /**
   * action
   */
  confirmDeleteQuestion,
}) => {
  const { t } = useTranslation();
  const [isShowDeleteConfirmBox, setIsShowDeleteConfirmBox] = useState(false);
  const clickingOnTrash = () => {
    setIsShowDeleteConfirmBox(true);
  };

  return (
    <>
      {Text ? (
        <div className={`${!IsValid && "opacity-40"} space-y-2`}>
          <div className="grid grid-cols-8 md:grid-cols-12">
            <div className="col-span-1">
              <div className="w-6 h-auto">
                <img
                  src={Image}
                  className="w-full h-full"
                  alt="Question Icon"
                />
              </div>
            </div>
            <div className="col-span-7 md:col-span-11 space-y-3">
              <div className="grid grid-cols-8">
                <div className="col-span-7">
                  <p className="primary-font text-color-default text-justify font-normal">
                    {Text}{" "}
                  </p>
                </div>
                <div className="col-span-1" id="Trash">
                  <img
                    src={TrashIcon}
                    className={`w-4 h-auto float-right cursor-pointer ${
                      IsMyQuestion ? "block" : "hidden"
                    }`}
                    onClick={clickingOnTrash}
                    alt="Trash Icon"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <p className="tertiary-font text-color-secondary">{Name}</p>
                <p className="tertiary-font text-color-secondary">
                  {dateFormatter(Date)}
                </p>
              </div>
            </div>
          </div>

          {/* {!IsValid && (
            <div>
              <p className="text-color-danger tertiary-font text-right">
                Fail to send
              </p>
            </div>
          )} */}
        </div>
      ) : (
        <p className="caption-font text-color-secondary text-center">
          {t("ProductDetails.no-answer")}
        </p>
      )}
      <ConfirmationBox
        isOpenBox={isShowDeleteConfirmBox}
        ConfirmationMessage={t("ProductDetails.are-you-sure-delete-question")}
        /**
         * action
         */
         cancelBox={() => setIsShowDeleteConfirmBox(false)}
         confirmBox={confirmDeleteQuestion}
      />
    </>
  );
};

export default ListItem;
