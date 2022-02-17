/** @format */

import { useEffect, useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

//components
import {
  PAGE_NUMBER,
  PAGE_SIZE,
  SEARCH_BY_NAME,
  SEARCH_CATEGORY,
  SEARCH_LATEST,
  SEARCH_PROMOTION,
  SEARCH_TAG,
  SEARCH_SUB_CATEGORY,
  SEARCH_BEST_SELLING,
  SEARCH_BUY_ONE_GET_ONE,
} from '../../../constant/search';
import { goToSpecificPathNameWithData } from '../../../util/goToSpecificPathName';
import { PRODUCT_SEARCH } from '../../../constant/locationPathName';

export function Hook({
  isLoading,
  searchProductList,
  searchProductCount,
  /**
   * action
   */
  searchProduct,
  clearDataList,
}) {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const propsState = location.state;
  const isShowTextBox = propsState?.isSearchByText || false;
  const sortvalue = propsState?.value || '';

  // alert(propsState.history_path);

  const [name, setName] = useState('');
  const [searchOption, setSearchOption] = useState();

  const [pageNumber, setPageNumber] = useState(PAGE_NUMBER);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [filterId, setFilterId] = useState(1);
  /**
   * life cycle
   */
  useEffect(() => {
    clearDataList();
  }, []);

  useEffect(() => {
    fetchSearchedProduct(PAGE_NUMBER);
  }, [propsState?.searchType, propsState?.productName]);

  /**
   * Fetching Search Product List
   */
  const fetchSearchedProduct = (
    page_number,
    product_name = propsState?.productName,
    is_remove = false
  ) => {
    let option = null;
    switch (propsState?.searchType) {
      case SEARCH_BY_NAME:
        if (!product_name) return;
        option = {
          searchType: propsState?.searchType,
          ProductName: product_name,
          isRemoveProductListState: is_remove,
          pageNumber: page_number,
          pageSize: PAGE_SIZE,
        };
        if (!is_remove) {
          setName(product_name);
        }

        break;
      case SEARCH_CATEGORY:
        if (propsState?.categoryId <= 0) return;
        option = {
          searchType: propsState?.searchType,
          ProductCategoryId: propsState?.categoryId,
          pageNumber: page_number,
          pageSize: PAGE_SIZE,
        };
        if (propsState?.categoryName) {
          setName(propsState?.categoryName);
        }
        if (propsState?.productName) {
          setName(propsState?.productName);
        }
        break;
      case SEARCH_PROMOTION:
        option = {
          searchType: propsState?.searchType,
          pageNumber: page_number,
          pageSize: PAGE_SIZE,
        };
        setName(t('Home.promotion'));
        break;
      case SEARCH_LATEST:
        option = {
          searchType: propsState?.searchType,
          pageNumber: page_number,
          pageSize: PAGE_SIZE,
        };
        setName(t('Home.new-arrival'));
        break;
      case SEARCH_BEST_SELLING:
        option = {
          searchType: propsState?.searchType,
          pageNumber: page_number,
          pageSize: PAGE_SIZE,
          ProductCategoryId: propsState?.categoryId || '',
          ProductName: product_name || '',
        };
        if (product_name) {
          setName(product_name);
        } else {
          setName(t('Best Selling'));
        }
        break;
      case SEARCH_TAG:
        option = {
          searchType: SEARCH_TAG,
          tagList: propsState?.tagList,
          pageNumber: page_number,
          pageSize: PAGE_SIZE,
        };
        if (product_name.includes(t('ProductDetails.bought-together'))) {
          setName(`${product_name}`);
        } else {
          setName(`${product_name} ${t('ProductDetails.bought-together')}`);
        }
        break;
      case SEARCH_BUY_ONE_GET_ONE:
        option = {
          searchType: SEARCH_BUY_ONE_GET_ONE,
          pageNumber: page_number,
          pageSize: PAGE_SIZE,
        };
        setName(`${t('Home.buy-one-get-one')}`);
        break;
      default:
        break;
    }
    if (option) {
      searchProduct({
        ...option,
        sortType: parseInt(filterId),
      });
      setSearchOption(option);
    }
  };

  const onBack = () => {
    history.goBack();
  };

  const sortProduct = (sorted_id) => {
    if (sorted_id) {
      setFilterId(sorted_id);
      searchProduct({
        ...searchOption,
        sortType: sorted_id,
        isRemoveProductListState: true,
        pageNumber: PAGE_NUMBER,
      });
      setIsLoadMore(false);
      setPageNumber(PAGE_NUMBER);
    }
  };

  useEffect(() => {
    setPageNumber(PAGE_NUMBER);
  }, [propsState?.productName]);

  const clickOnLoadMore = () => {
    let temp_pageNumber = pageNumber + 1;
    fetchSearchedProduct(temp_pageNumber, name);
    setPageNumber(temp_pageNumber);
    setIsLoadMore(true);
  };

  //need to refactor code - MK
  const delaySearchByText = useCallback(
    _.debounce((query) => {
      fetchSearchedProduct(PAGE_NUMBER, query, true);
    }, 500),
    []
  );
  const changeOnSearchText = (e) => {
    delaySearchByText(e.target.value);
    setName(e.target.value);
  };

  return [
    isLoading,
    searchProductList,
    searchProductCount,
    name,
    isLoadMore,
    isShowTextBox,
    sortvalue,
    /**
     * action
     */
    onBack,
    sortProduct,
    clickOnLoadMore,
    changeOnSearchText,
  ];
}
