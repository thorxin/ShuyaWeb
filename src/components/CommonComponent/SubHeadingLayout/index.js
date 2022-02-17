import React from "react";

const SubHeadingLayout = ({
    SubHeadingName = '',
    ViewMore = '',
    /**
     * action
     */
    onClickViewMore
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="sub-heading-font font-medium truncate w-10/12"> {SubHeadingName} </p>
        <p
          className="caption-font text-color-secondary">
          {ViewMore}
        </p>
      </div>
    </>
  );
};

export default SubHeadingLayout;
