/** @format */

import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import _ from 'lodash';

//components
import {
  GET_STORED_ACCESS_TOKEN,
  PRODUCT_ID,
  saveLastRoute,
  saveLocalStorage,
} from '../../util/storage';
import { goBack, goToSpecificPathName } from '../../util/goToSpecificPathName';
import { PAGE_FROM_DETAIL, SEARCH_TAG } from '../../constant/search';
import {
  HOME_DEFAULT,
  LOGIN,
  QUESTION_AND_ANSWER,
} from '../../constant/locationPathName';

const PAGE_NUMBER = 1;
const PAGE_SIZE = 6;
const PAGE_SIZE_FOR_Q_AND_A = 2;

export function Hook({
  isLoading,
  isSecondaryLoading,
  details,
  relatedProductByCategoryList,
  boughtTogetherProductList,
  questionAndAnswerList,
  questionCount,
  shopCartDetail,
  /**
   * action
   */
  fetchProductDetails,
  fetchRelatedProductByCategory,
  fetchBoughtTogetherProduct,
  fetchQuestionAndAnswerList,
  fetchQuestionCount,
  updateProductWishList,
  clearProductDetails,
}) {
  const history = useHistory();
  const location = useLocation();

  const queryString = new URLSearchParams(window.location.search);
  const product_id = Number(queryString.get('productId'));
  const backToHome = location.backToHome || true;

  const [tagList, setTagList] = useState([]);
  const [mainCategory, setMainCategory] = useState([]);
  const [isFavWish, setIsFavWish] = useState(false);
  const [shopCartCount, setShopCartCount] = useState(0);

  /**
   * Life Cycle
   */
  useEffect(() => {
    if (product_id <= 0) return;
    clearProductDetails();
    fetchProductDetails(product_id);
    fetchQuestionAndAnswerList(
      product_id,
      PAGE_NUMBER,
      PAGE_SIZE_FOR_Q_AND_A,
      true
    );
    fetchQuestionCount(product_id);
  }, [product_id]);

  useEffect(() => {
    if (shopCartDetail?.productInfo?.length > 0) {
      let count = 0;
      shopCartDetail.productInfo.forEach((i) => {
        count += Number(i.qty);
        setShopCartCount(count);
      });
    }
  }, [shopCartDetail?.productInfo]);

  /**
   * fetching Related Product
   */
  useEffect(() => {
    let category = _.cloneDeep(details.productCategory || []);
    if (category.length > 0) {
      let getMainCategory = category.filter((c) => c.isMainCategory);
      if (getMainCategory.length > 0) {
        let mainCategory = getMainCategory[0];
        fetchRelatedProductByCategory(
          mainCategory.productCategoryId,
          PAGE_NUMBER,
          PAGE_SIZE
        );
        setMainCategory(mainCategory);
      }
    }
  }, [details.productCategory]);

  useEffect(() => {
    const clone_tagList = _.cloneDeep(details.tagsList || []);
    setTagList(clone_tagList);
    if (clone_tagList.length > 0) {
      let productTags = clone_tagList.map((tag) => tag.id);
      fetchBoughtTogetherProduct({
        searchType: SEARCH_TAG,
        frompage: PAGE_FROM_DETAIL,
        tagList: productTags,
        isRemoveProductListState: true,
        pageNumber: PAGE_NUMBER,
        pageSize: PAGE_SIZE,
      });
    }
  }, [details.tagsList]);

  useEffect(() => {
    setIsFavWish(details.isFav || false);
  }, [details?.isFav]);

  const clickOnAskQuestion = () => {
    if (!GET_STORED_ACCESS_TOKEN) {
      saveLastRoute('/productdetails');
      saveLocalStorage(PRODUCT_ID, product_id);
      goToSpecificPathName(history, LOGIN);

      return;
    }
    history.push({
      pathname: QUESTION_AND_ANSWER,
      search: `?productId=${product_id}`,
    });
  };

  const clickingOnProductWishIcon = () => {
    if (!GET_STORED_ACCESS_TOKEN) {
      goToSpecificPathName(history, LOGIN);
      return;
    }
    setIsFavWish(!isFavWish);
    updateProductWishList(product_id, !isFavWish);
  };

  const clickingOnWishList = (product_id, isFavWish) => {
    if (!GET_STORED_ACCESS_TOKEN) {
      goToSpecificPathName(history, LOGIN);
      return;
    }
    updateProductWishList(product_id, !isFavWish);
  };

  const goBackTo = () => {
    if (backToHome) {
      goToSpecificPathName(history, HOME_DEFAULT);
      return;
    }
    goBack(history);
  };

  return [
    isLoading,
    isSecondaryLoading,
    details,
    relatedProductByCategoryList,
    boughtTogetherProductList,
    tagList,
    mainCategory,
    questionAndAnswerList,
    questionCount?.ref,
    shopCartCount,
    isFavWish,
    /**
     * action
     */
    clickOnAskQuestion,
    clickingOnProductWishIcon,
    clickingOnWishList,
    goBackTo,
  ];
}
