import React from "react";

export default function OrderHistoryItemFrame(props) {
  const toggle = () => {
    if (props.loading && !props.isLoadMore) return true;

    return false;
  };

  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="mt-3 pb-20 md:pb-4 md:mt-4 space-y-3 md:space-y-4">
      {toggle()
        ? arr.map((index) => (
            <div
              key={index}
              className="w-11/12 md:w-full h-auto mx-auto bg-white py-4 md:py-5"
            >
              <div className="mx-4 md:mx-8">
                <div className="flex space-x-2">
                  <div className="w-32 md:w-24 h-20 skeleton-loading-animation" />
                  <div className="w-full h-auto space-y-5">
                    <div className="w-40 h-5 skeleton-loading-animation" />
                    <div className="grid grid-cols-2 justify-items-stretch gap-x-3 w-full h-5">
                      <div className="w-24 h-auto skeleton-loading-animation justify-self-start" />
                      <div className="w-20 h-auto skeleton-loading-animation justify-self-end" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        : props.children}
    </div>
  );
}
