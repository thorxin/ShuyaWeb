import React, { useEffect, useState } from "react";

//components
import ToastBox from "./DialogBox/toast_box";

export const ErrorBox = ({ message = "" }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (message) {
        document.getElementById("hide").style.display = "none";
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [message]);

  if (message) {
    return (
      <div
        id="hide"
        className="inline-block fixed top-0 text-color-white caption-font bg-red-700 rounded-sm p-3 mt-3 w-full h-auto"
      >
        <p> {message.message} </p>
      </div>
    );
  }

  return null;
};

export const ErrorMessageBoxValidation = ({ errorMessage = "" }) => {
  if (errorMessage)
    return (
      <span className="caption-font text-color-danger ml-2 mt-1">
        {errorMessage}
      </span>
    );
  return null;
};

export const ToastMessageBox = ({ isShowToast, message = "" }) => {
  if (message) {
    return (
      <ToastBox isShowing={isShowToast}>
        <div id="hide" className="fixed top-5 w-full z-20">
          <div className="default-margin-layout bg-red-500 p-2 rounded-lg">
            <p className="secondary-font text-color-white text-center font-medium">
              {message}
            </p>
          </div>
        </div>
      </ToastBox>
    );
  }
  return null;
};
