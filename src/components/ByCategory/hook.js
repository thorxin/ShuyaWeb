/** @format */
import { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { SEARCH_BEST_SELLING } from './../../constant/search'
import { PRODUCT_SEARCH_RESULT } from './../../constant/locationPathName'
import { goToSpecificPathNameWithData } from './../../util/goToSpecificPathName'

const initalCategory = {
  id: 0,
  name: '',
}

export function Hook({
  isLoading,
  errorMessage,
  CategoryList,
  mainCategoryDetail,
  mainCategory,
  currentCategory,
  fetchCategory,
  ProductSearch,
  fetchSubCategory,
  SubCategoryList,
  fetchMainCategoryDetail,
  CategoryDetailList,
  fetchProductByBrand,
}) {
  const location = useLocation()
  const history = useHistory()
  const historyCategory = location.state || initalCategory

  /**
   * state and values
   */
  const [initialList, setInitialList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(historyCategory)

  /**
   * actions
   */

   const onSelectCategory = (category) => {
    let propsData = {
      id: category.id,
      name: category.name,
    };
    history.replace({
      state: propsData,
    });
    if (selectedCategory.id === category.id) return;
    setSelectedCategory(category);
    fetchSubCategory(category.id);
  };

  const goToSearch = (category, history_path) => {
    let propsState = {
      productName: category.name,
      categoryId: category.id,
      searchType: SEARCH_BEST_SELLING,
      history_path,
    }
    goToSpecificPathNameWithData(history, PRODUCT_SEARCH_RESULT, propsState)
  }

  const goBack = () => {
    history.goBack()
  }

  /**
   * life cycle
   */
  useEffect(() => {
    if (Array.isArray(CategoryList) && CategoryList.length > 0) {
      setInitialList(CategoryList.slice(0, 3))
    }
  }, [CategoryList])

  useEffect(() => {
    fetchCategory()
    fetchMainCategoryDetail()
    window.scrollTo(0, 0) //
  }, [])

  useEffect(() => {
    if (historyCategory.id > 0) fetchSubCategory(historyCategory.id)
  }, [historyCategory])

  // const byBrandid = (brandid) => {
  //   history.push({
  //     pathname: '/bybrand',
  //     state: {
  //       type: brandid,
  //     },
  //   });
  // };

  return [
    isLoading,
    mainCategory,
    mainCategoryDetail,
    selectedCategory,
    /**
     * actions
     */
    onSelectCategory,
    goToSearch,
    CategoryDetailList,
    goBack,
  ]
}
