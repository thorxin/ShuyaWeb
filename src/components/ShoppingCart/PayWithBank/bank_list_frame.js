import React from "react";

export const BankListFrame = (props) => {

    const toggle = () => {
        if(props.loading && props.data.length <= 0) {
            return true;
        }
        return false;
    }

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-x-2">
      {toggle() ? (
        <>
          <div className="w-full h-14 md:h-20 lg:h-28 bg-gray-300 animate-pulse"></div>
          <div className="w-full h-14 md:h-20 lg:h-28 bg-gray-300 animate-pulse"></div>
          <div className="w-full h-14 md:h-20 lg:h-28 bg-gray-300 animate-pulse"></div>
          <div className="w-full h-14 md:h-20 lg:h-28 bg-gray-300 animate-pulse"></div>
        </>
      ) : (
        props.children
      )}
    </div>
  );
};
