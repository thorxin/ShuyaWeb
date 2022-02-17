/** @format */

import React, { useEffect,useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export function Hook({
  isLoading,
  errorMessage,
  successMessage,
  WishListProduct,
  /**
   * action
   */
  fetchWishList,
  changeWishList,
  removeEverything,
}) {

  const history = useHistory();
 
  useEffect(() => {
    fetchWishList();
    }, [])
/**
   *
   * @param {integer} product_id - Id of each product in wish product list
   * clicking Heart Icon to remove product from wish product list
   */
  
  
  const deleteWishList = async (product_id = 0) => {
    if (product_id === 0) return;
    await changeWishList(product_id, false);
    fetchWishList();
  }
  
  const goBack = () => {
    history.goBack();
  };
 
  const [isShowDeleteBox, setIsShowDeleteBox] = useState(false);

  const clickingClear = () => {
    setIsShowDeleteBox(true);
  };
  const confirmDeleteAll = () => {
    removeEverything();
  };


  return [
    isLoading,
    errorMessage,
    WishListProduct,
    isShowDeleteBox,
    setIsShowDeleteBox,

    // action
    deleteWishList,
    goBack,
    confirmDeleteAll,
    clickingClear
  ];
}
