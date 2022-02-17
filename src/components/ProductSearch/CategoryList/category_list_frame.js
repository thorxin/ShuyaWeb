import React from "react";

export default function CategoryListFrame(props) {
  const toggle = () => {
    if (props.Loading) return true;

    return false;
  };
  let arr = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <>
      {toggle() ? (
        <div className="grid grid-cols-4 md:grid-cols-1 gap-x-2 gap-y-4 mx-4">
          {arr.map((index) => (
            <div key={index} className="block md:flex md:items-center space-y-2 md:space-y-0">
              <div className="w-full h-14 md:w-6 md:h-6 md:rounded-full skeleton-loading-animation" />
              {/* <div className="w-12 md:w-60 h-2 md:h-4 mx-auto skeleton-loading-animation" /> */}
            </div>
          ))}
        </div>
      ) : (
        props.children
      )}
    </>
  );
}
