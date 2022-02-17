/** @format */

import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

//components
import * as sortType from '../../../constant/search';

//images
import LowToHighPriceIcon from '../../../assets/productSearch/low_high_price.svg';
import HighToLowPriceIcon from '../../../assets/productSearch/high_low_price.svg';
import LatestIcon from '../../../assets/productSearch/latest.svg';
import BestSellingIcon from '../../../assets/productSearch/best_selling.svg';

export function Hook(sortProduct, sortvalue, SelectedCategory) {
  const popUpRef = useRef();
  const sortedOptionButtonRef = useRef();

  const location = useLocation();
  //   alert(sortvalue);
  //   const propsState = location.state;
  //   alert(propsState);
  var sortindex = 0;
  if (sortvalue) {
    if (sortvalue > 0 || sortvalue < 5) {
      sortindex = sortvalue - 1;
    }
  } else {
    sortindex = 0;
  }

  const sortOption = [
    {
      label: 'ProductSearch.sort-low-to-high',
      value: sortType.SORT_PRICE_LOW_TO_HIGH,
      image: LowToHighPriceIcon,
    },
    {
      label: 'ProductSearch.sort-high-to-low',
      value: sortType.SORT_PRICE_HIGH_TO_LOW,
      image: HighToLowPriceIcon,
    },
    {
      label: 'ProductSearch.sort-by-latest',
      value: sortType.SORT_LATEST_PRODUCT,
      image: LatestIcon,
    },
    {
      label: 'ProductSearch.sort-by-bestselling',
      value: sortType.SORT_BEST_SELLING,
      image: BestSellingIcon,
    },
    // {
    //     label: "ProductSearch.sort-promotion",
    //     value: sortType.SORT_BEST_SELLING,
    //     image: BestSellingIcon
    // }
  ];

  //#region - clicking outside of Sorted Option Pop Up, close pop up
  useEffect(() => {
    function handler(event) {
      if (
        !popUpRef.current?.contains(event.target) &&
        !sortedOptionButtonRef.current?.contains(event.target)
      ) {
        setIsShowSortedOption(false);
      }
    }
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);
  //#endregion

  // useEffect(() => {
  //   if (sortvalue != '') {
  //     sortProduct(sortvalue);
  //   } else {
  //     sortProduct(0);
  //     return;
  //   }
  // }, [sortvalue]);

  const [selectedSortedOption, setSelectedSortedOption] = useState(
    sortOption[sortindex]
  );
  const [isShowSortedOption, setIsShowSortedOption] = useState(false);

  const clickOnSortedList = () => {
    setIsShowSortedOption(true);
  };

  const clickOnSortedOption = (option) => {
    setSelectedSortedOption(_.cloneDeep(option));
    sortProduct(option.value, SelectedCategory);
    setIsShowSortedOption(false);
  };

  return [
    sortOption,
    selectedSortedOption,
    isShowSortedOption,
    popUpRef,
    sortedOptionButtonRef,
    /**
     * action
     */
    clickOnSortedList,
    clickOnSortedOption,
  ];
}
