/** @format */

import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

//components
import {
  SEARCH_TAG,
  SEARCH_CATEGORY,
  SORT_PRICE_LOW_TO_HIGH,
  PAGE_NUMBER,
  PAGE_SIZE,
} from '../../constant/search';

export function Hook({
  isLoading,
  isSecondaryLoading,
  tagList,
  searchProductList,
  searchProductCount,
  productSuggestionList,
  mainCategory,
  /**
   * action
   */
  fetchTagList,
  searchProduct,
  fetchProductSuggestionList,
  clearData,
  fetchMainCategory,
}) {
  /**
   * life cycle
   */
  useEffect(() => {
    fetchTagList();
    fetchMainCategory();
  }, []);

  const [pageNumber, setPageNumber] = useState(PAGE_NUMBER);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const [sortedId, setSortedId] = useState(SORT_PRICE_LOW_TO_HIGH);

  const [isMoreTags, setIsMoreTags] = useState(false);

  const [selectedTagList, setSelectedTagList] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const delaySearchByText = useCallback(
    _.debounce((q) => {
      fetchProductSuggestionList(q);
    }, 500),
    []
  );

  const clickOnMoreTag = () => setIsMoreTags(!isMoreTags);

  const clickOnTag = (tag_id = 0) => {
    let tagList = _.cloneDeep(selectedTagList || []);

    if (tagList.includes(tag_id)) {
      tagList.splice(tagList.indexOf(tag_id), 1);
    } else tagList.push(tag_id);

    setSelectedTagList(tagList);

    delayedSearchTags(tagList, sortedId, true, PAGE_NUMBER);
    setIsLoadMore(false);
    setSelectedCategory(null);
  };

  /**
   * function
   */
  const delayedSearchTags = useCallback(
    _.debounce(
      (list, id, is_removed, page_number) =>
        searchProduct({
          searchType: SEARCH_TAG,
          tagList: list,
          sortType: id,
          isRemoveProductListState: is_removed,
          pageNumber: page_number,
          pageSize: PAGE_SIZE,
        }),
      500
    ),
    []
  );

  /**
   * Sorting Searched Product List
   */
  const sortProduct = (sorted_id, selectedCategory = '') => {
    setSortedId(sorted_id);
    searchProduct({
      searchType: SEARCH_CATEGORY,
      tagList: selectedTagList,
      ProductCategoryId: selectedCategory,
      sortType: sorted_id,
      isRemoveProductListState: true,
      pageNumber: PAGE_NUMBER,
    });
    setIsLoadMore(false);
    setPageNumber(PAGE_NUMBER);
  };

  const onSearchCategory = (category_id) => {
    setSelectedCategory(category_id);
    searchProduct({
      searchType: SEARCH_CATEGORY,
      ProductCategoryId: category_id,
      sortType: sortedId,
      isRemoveProductListState: true,
      pageNumber: PAGE_NUMBER,
    });
    setIsLoadMore(false);
    setSelectedCategory(category_id);
    setPageNumber(PAGE_NUMBER);
    setSelectedTagList([]);
  };

  const clickOnLoadMore = () => {
    let temp_pageNumber = pageNumber + 1;
    delayedSearchTags(selectedTagList, sortedId, false, temp_pageNumber);
    setIsLoadMore(true);
    setPageNumber(temp_pageNumber);
  };

  return [
    isLoading,
    isSecondaryLoading,
    tagList,
    searchProductList,
    searchProductCount,
    selectedTagList,
    isMoreTags,
    productSuggestionList,
    mainCategory,
    selectedCategory,
    isLoadMore,
    /**
     * action
     */
    searchProduct,
    clickOnMoreTag,
    clickOnTag,
    clickOnLoadMore,
    sortProduct,
    delaySearchByText,
    clearData,
    onSearchCategory,
  ];
}
