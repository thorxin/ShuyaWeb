import React from "react";

//components
import { BankListFrame } from "./bank_list_frame";

export const BankList = ({
  IsLoading,
  BankListArray = [],
  SelectedBank,
  /**
   * action
   */
  onClickBank,
}) => {
  const selectingBank = (bank_id) => {
    if (bank_id === SelectedBank?.id) {
      return true;
    }

    return false;
  };

  return (
    <>
      <BankListFrame data={BankListArray} loading={IsLoading}>
        {BankListArray.map((list) => (
          <div key={list.id} onClick={() => onClickBank(list)}>
            <img
              src={selectingBank(list.id) ? list.selectUrl : list.url}
              className="w-full h-auto"
              alt="BankLogo"
            />
          </div>
        ))}
      </BankListFrame>
    </>
  );
};
