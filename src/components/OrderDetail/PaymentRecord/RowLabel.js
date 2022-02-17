import React from "react";

const RowLabel = ({ label = "", value = "", text_color = 'text-color-default' }) => {
  return (
    <>
      {value && (
        <div className="grid grid-cols-2">
          <p className="tertiary-font text-color-secondary">{label} : </p>
          <p className={`tertiary-font break-all custom-font-bold ${text_color}`}>{value}</p>
        </div>
      )}
    </>
  );
};

export default RowLabel;
