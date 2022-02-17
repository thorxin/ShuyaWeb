import React from "react";
import { useTranslation } from "react-i18next";
import ProductCart from "../../Common/ProductCart";

//components
import VariantItems from "./variant_items";

const ProductVariation = ({
  VariationArray = [],
  SelectedVariantList = [],
  /**
   * action
   */
  OpenVariantBox
}) => {
  const { t } = useTranslation();

  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (VariationArray.length > 0)
    return (
      <>
        <div className={`bg-white mt-1 ${(VariationArray.length === 1 && VariationArray[0].valueName === "Default") && 'hidden'}`}>
          <div className="mx-2 md:ml-8 space-y-3 mb-4">
            <p className="primary-font  custom-font-bold text-color-secondary">Variation</p>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                {VariationArray.map((v_value, index) => (
                  <VariantItems
                    key={index}
                    value={v_value}
                    isSelected={
                      SelectedVariantList[0]?.value_id === v_value.valueId
                    }
                    /**
                     * action
                     */
                    ConfirmSelectedVariant={OpenVariantBox}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );

  return null;
};

export default ProductVariation;
