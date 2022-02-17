import React from "react";

//images
import SearchGrayIcon from "../../../assets/productSearch/search_gray_icon.svg";

export default function ProductSuggestionListFrame(props) {
  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const toggle = () => {
    if (props.loading) return true;

    return false;
  };

  return (
    <div className="space-y-5">
      {toggle()
        ? arr.map((element, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 h-10 rounded-sm skeleton-loading-animation" />
              <div className="w-full h-4 skeleton-loading-animation" />
            </div>
          ))
        : props.children}
    </div>
  );
}
