import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import ProductCardHeading from "../CommonUI/productCardHeading";
import ProductCard from "./productCard_Latest";
import { SEARCH_LATEST } from "../../../constant/search";
import { goToProductSearchResult } from "../../../util/goToSpecificPathName";

const LatestProducts = ({ productArray = [] }) => {

  const { t } = useTranslation();
  const history = useHistory();

  const clickOnViewMore = () => {
    let propsData = {
      searchType: SEARCH_LATEST
    }
    goToProductSearchResult(history, propsData);
  }

  return (
    <>
      <ProductCardHeading
        Heading={t("Home.new-arrival")}
        ViewAll={productArray?.length > 5 ? t("Common.view-more") : ""}
        /**
         * action
         */
        onClickViewMore={clickOnViewMore}
      />
      <div className="bg-white pb-4 md:py-4 md:mt-1">
        <div className="w-full h-auto mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-4 gap-x-5">
            {Array.isArray(productArray) &&
              productArray.slice(0, 5).map((products) => (
                <ProductCard key={products.productId} productData={products} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default LatestProducts;
