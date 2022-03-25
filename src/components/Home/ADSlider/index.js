import React from "react";
import { useHistory } from "react-router";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// component
import { goToProductSearchResult } from "../../../util/goToSpecificPathName";
import {
  SEARCH_BEST_SELLING,
  SEARCH_LATEST,
  SEARCH_PROMOTION,
} from "../../../constant/search";
import {
  BEST_SELLING_BANNER_LINK,
  DISCOUNT_PRODUCT_BANNER_LINK_ID,
  LATEST_PRODUCT_BANNER_LINK_ID,
} from "../../../constant/bannerConfig";

const ADSlider = ({
  ADListArray = [],
  /**
   * action
   */
}) => {
  const history = useHistory();
  // let WebBanner = ADListArray;
  // let MobileBanner = ADListArray;
  let WebBanner = ADListArray.filter((banner) => banner.isWeb === 1);
  let MobileBanner = ADListArray.filter((banner) => banner.isWeb !== 1);
  const goToProductSearch = (banner_link_id = 0) => {
    let propsData;
    switch (banner_link_id) {
      case DISCOUNT_PRODUCT_BANNER_LINK_ID:
        propsData = {
          searchType: SEARCH_PROMOTION,
        };
        break;
      case LATEST_PRODUCT_BANNER_LINK_ID:
        propsData = {
          searchType: SEARCH_LATEST,
        };
        break;
      case BEST_SELLING_BANNER_LINK:
        propsData = {
          searchType: SEARCH_BEST_SELLING,
        };
        break;
      default:
        break;
    }

    goToProductSearchResult(history, propsData);
  };

  return (
    <>
      <div className="mx-auto hidden md:block w-full">
        <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}>
          {WebBanner.length > 0 &&
            WebBanner.map((ad, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => goToProductSearch(ad.bannerLinkId)}
              >
                <div>
                  <img src={ad.url} alt="ADSlider" />
                </div>
              </div>
            ))}
        </Carousel>
      </div>
      <div className="mx-auto block md:hidden">
        <Carousel
          showArrows={false}
          showIndicators={false}
          infiniteLoop={true}
          autoPlay={true}
        >
          {MobileBanner.length > 0 &&
            MobileBanner.map((ad, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => goToProductSearch(ad.bannerLinkId)}
              >
                <div className="block md:hidden">
                  <img
                    src={ad.url}
                    alt="ADSlider"
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            ))}
        </Carousel>
      </div>
    </>
  );
};

export default ADSlider;
