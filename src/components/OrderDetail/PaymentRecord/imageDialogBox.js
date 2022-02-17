import React from "react";

//images
import BackArrowIcon from "../../../assets/common/back_arrow.svg";

export const ProductImage = ({Image}) => {
  return (
    <>
      <div className="">
          <img
            src={Image}
            className="w-full h-full"
            alt="Payment Image"
          />
      </div>
    </>
  );
};

const ProductImageDialogBox = ({
  PaymentImage,
  closeVariantBox
}) => {
  return (
    <>
      <div className="h-auto max-w-screen-sm md:mx-auto backdrop-filter backdrop-blur-sm">
            <div className="bg-transparent rounded-lg">
                <div className="w-3 h-auto cursor-pointer mx-2 pt-2" onClick={closeVariantBox}>
                    {/* <img src={BackArrowIcon} className="w-full h-full" alt="Back Arrow Icon" /> */}
                </div>
                <div className="grid justify-items-center pb-6">
                    <ProductImage Image={PaymentImage} />
                </div>
            </div>
     </div>
    </>
  );
};

export default ProductImageDialogBox;
