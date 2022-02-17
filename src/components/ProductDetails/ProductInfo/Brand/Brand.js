import React from 'react'
import placeholder from "../../../../assets/common/placeholder_icon.svg"
import { useHistory } from "react-router-dom";
const Brand = ({
    BrandData
}) => {
    let history = useHistory();
    if (BrandData) {
        return (
            <div className="flex flex-col ml-4 md:ml-8 mt-4 pb-5 border-b-2 border-gray-200 md:mr-auto mr-4">
                <p className="primary-font custom-font-bold text-color-secondary">
                    About Brand
                    {/* {t("ProductDetails.product-description")} */}
                </p>
                <div className="flex mt-2">
                    <img className="w-12 h-12 object-cover" src={BrandData?.logoUrl ? BrandData?.logoUrl : placeholder} alt="ProductImg" onError={(e) => e.target.src = placeholder}
                    />
                    <p className=" text-md md:text-sm flex flex-col pl-3">
                        <p onClick={() => history.push(`/bybrand/${BrandData.id}`)} className="primary-font text-color-default cursor-pointer">{BrandData.name}</p>
                        <p className="primary-font text-color-secondary text-justify font-normal pr-3 md:pr-0">
                            {BrandData.description?.length > 400 ? `${BrandData.description.substring(0, 400)}...` : BrandData.description}
                        </p>
                    </p>
                </div>
            </div>
        )
    }
    return null;
}

export default Brand
