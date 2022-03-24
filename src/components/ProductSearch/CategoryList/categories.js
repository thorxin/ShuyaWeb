/** @format */

import React from "react";
import PlaceHolderImage from "../../CommonComponent/placeholder_image";

export default function Category({
  CategoryName = "",
  CategoryUrl = "",
  CategoryId = 0,
  selectedCategory,
  /**
   * action
   */
  onChangeCategoryList,
  onClickCategory,
}) {
  let category_image;
  if (CategoryUrl) {
    category_image = (
      <img
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "http://mypage.shopdoora.com/static/media/app_logo.5009884d.svg";
        }}
        src={CategoryUrl}
        className="w-full h-auto rounded-lg"
        alt="CategoryImage"
      />
    );
  } else {
    category_image = <PlaceHolderImage />;
  }

  return (
    <>
      {/* For Web View */}
      <div className="hidden md:block">
        <div
          className={`flex items-center space-x-3 group py-2 cursor-pointer ${
            selectedCategory === CategoryId
              ? "bg-custom-primary text-color-white"
              : ""
          }`}
          onClick={onChangeCategoryList}
        >
          <input
            type="radio"
            className="cursor-pointer block md:hidden"
            name="CategoryRadioButton"
            id={CategoryId}
            onChange={onChangeCategoryList}
          />
          <div>
            <div className="w-8 h-auto rounded-full">{category_image}</div>
          </div>

          <label htmlFor={CategoryId} className="secondary-font">
            {CategoryName}
          </label>
        </div>
      </div>
      {/* For Mobile View */}
      <div
        className="inline-block w-20 h-auto md:hidden mx-auto"
        onClick={onClickCategory}
      >
        <div className="w-full h-auto">{category_image}</div>
        <p className="tertiary-font custom-font-bold text-center line-clamp-2">
          {CategoryName}
        </p>
      </div>
    </>
  );
}
