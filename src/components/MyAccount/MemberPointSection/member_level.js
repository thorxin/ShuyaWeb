import React from "react";
import { useTranslation } from "react-i18next";

//images
import GoldLevelIcon from "../../../assets/myaccount/gold_level_icon.svg";
import PointHistoryIcon from "../../../assets/myaccount/point_history_icon.svg";

const MemberPointSection = () => {

  const { t } = useTranslation();

  return (
    <>
      {/* Showing your Member Level Part */}
        <div className="border md:border-0 rounded-lg md:rounded-none shadow-lg md:shadow-none bg-white -mt-28 md:mt-0">
          <div className="default-margin-layout md:w-full py-3">
            <div className="flex justify-between">
              <div>
                <p className="tertiary-font text-color-secondary">
                  {t("MyAccount.your")} Member Level
                </p>
              </div>
              <div className="bg-yellow-400 rounded-md px-1">
                <p className="tertiary-font text-color-white">Gold</p>
              </div>
            </div>
            <div className="flex items-center space-x-5 border-b-2">
              <div>
                <img
                  src={GoldLevelIcon}
                  className="w-9 h-auto"
                  alt="LevelIcon"
                />
              </div>
              <div className="w-full h-auto mt-3 mb-6">
                <div className="flex justify-between tertiary-font my-1">
                  <p className="text-color-primary">
                    4,590{" "}
                    <span className="text-color-default">
                      {t("MemberPoint.points")}
                    </span>
                  </p>
                  <p>12,000 {t("MemberPoint.points")}</p>
                </div>
                <div className="bg-gray-200 w-auto h-2 rounded-md" />
              </div>
            </div>
            <div className="flex justify-center space-x-3 mt-2">
              <img
                src={PointHistoryIcon}
                className="w-5 h-auto"
                alt="PointHistoryIcon"
              />
              <p className="tertiary-font">
                {" "}
                {t("MemberPoint.point-history")}{" "}
              </p>
            </div>
          </div>
        </div>
    </>
  );
};

export default MemberPointSection;

