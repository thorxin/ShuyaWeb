import React from "react";

//images
import PlaceHolderImage from "../../../../assets/common/placeholder_icon.svg";

const SizeChart = ({ ChartArray = [] }) => {
  let arr = [0, 1, 2, 3, 4];

  if (ChartArray.length > 0)
    return (
      <>
        <div className="bg-white py-4  border-b-2 border-gray-200">
          <div className="mx-4 space-y-4">
            <p className="primary-font custom-font-bold text-color-secondary">Size Chart</p>
            <div className="grid grid-cols-5 gap-x-2">
              {ChartArray.map((item, index) => (
                <img
                  key={index}
                  src={item.url}
                  className="w-full h-auto"
                  alt="Size Chart Image"
                />
              ))}
            </div>
          </div>
        </div>
      </>
    );

  return null;
};

export default SizeChart;
