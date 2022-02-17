import React from "react";

export const RegisterBankInfoFrame = (props) => {
  const toggle = () => {
    if (props.loading && props.data.length <= 0) {
      return true;
    }
    return false;
  };
  return (
    <>
      <div className="w-full md:w-8/12 lg:w-6/12 h-auto">
        <div className="space-y-4">
          {toggle() ? (
            <>
              <div className="w-8/12 h-6 bg-gray-300 animate-pulse" />
              <div className="grid grid-cols-2 gap-x-2">
                <div className="w-full h-6 bg-gray-300 animate-pulse" />
                <div className="w-full h-6 bg-gray-300 animate-pulse" />
              </div>
              <div className="grid grid-cols-2 gap-x-2">
                <div className="w-full h-6 bg-gray-300 animate-pulse" />
                <div className="w-full h-6 bg-gray-300 animate-pulse" />
              </div>
              <div className="w-full h-10 bg-gray-300 animate-pulse" />
              <div className="w-32 h-32 md:w-24 md:h-24 bg-gray-300" />
              <div className="w-full h-32 bg-gray-300 animate-pulse" />
              <div className="flex justify-between">
                <div className="w-4/12 h-5 bg-gray-300 animate-pulse" />
                <div className="w-4/12 h-5 bg-gray-300 animate-pulse" />
              </div>
              <div className="w-full h-10 bg-gray-300 animate-pulse" />
            </>
          ) : (
            props.children
          )}
        </div>
      </div>
    </>
  );
};
