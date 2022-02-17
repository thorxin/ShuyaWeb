import React from "react";
import { useTranslation } from "react-i18next";
import HistoryItem from "./history_item";

//components
import { Hook } from "./hook";

export default function History() {
  const { t } = useTranslation();
  const [
    SearchHistoryList,
    /**
     * action
     */
    clearSearchHistory,
    clickingOnHistory,
  ] = Hook();

  if (SearchHistoryList.length > 0)
    return (
      <div className="md:mx-auto mx-4 space-y-5">
        <div className="flex justify-between">
          <p className="primary-font text-color-secondary font-normal">
            {t("ProductSearch.recent-search")}
          </p>
          <p
            className="primary-font text-color-default"
            onClick={clearSearchHistory}
          >
            {t("Common.clear-all")}
          </p>
        </div>
        <div className="space-y-4">
          {SearchHistoryList.map((list, index) => (
            <HistoryItem
              key={index}
              Index={index}
              type={list.type}
              CategoryId={list.id}
              name={list.name}
              imageUrl={list.imageUrl}
              /**
               * action
               */
              clickOn={clearSearchHistory}
              onClickHistory={clickingOnHistory}
            />
          ))}
        </div>
      </div>
    );

  return null;
}
