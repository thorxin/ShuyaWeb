import _ from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";

//components
import {
  fetch_ProductSuggestionList,
  clear_DataList,
} from "../../../../modules/action.productsearch";
import { goToSpecificPathNameWithData } from "../../../../util/goToSpecificPathName";
import { PRODUCT_SEARCH_RESULT } from "../../../../constant/locationPathName";
import { SEARCH_BY_NAME } from "../../../../constant/search";
import { setSearchHistory } from "../../../../util/storage";

export function Hook() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const productName = location.state?.productName;
  //#region - Shop Cart Count
  const [cartCount, setCartCount] = useState(0);
  const shoppingCart = useSelector(
    (state) => state.shoppingCart.shopCartDetail
  );

  useEffect(() => {
    if (Object.keys(shoppingCart).length === 0) return;
    let count = 0;
    shoppingCart.productInfo.forEach((i) => {
      count += Number(i.qty);
      setCartCount(count);
    });
  }, [shoppingCart]);
  //#endregion

  //#region - Noti Cart
  const store = useStore();
  const [notiCount, setNotiCount] = useState(0);

  useEffect(() => {
    const temp_count = store.getState().notifications.notiCount;
    if (temp_count > 0) setNotiCount(temp_count);
  }, [store.getState().notifications.notiCount]);
  //#endregion

  //#region - Product Search Section
  const searchPopUp = useRef();
  const searchInputBox = useRef();

  const [inputValue, setInputValue] = useState(null);
  const [isInputValue, setIsInputValue] = useState(false);

  const [isFocus, setIsFocus] = useState(false);

  const onFocus = () => setIsFocus(true);

  /**
   * When clicking outside of pop up, close pop up
   */
  useEffect(() => {
    let handler = (event) => {
      if (
        !searchPopUp.current.contains(event.target) &&
        searchInputBox.current !== event.target
      ) {
        setIsFocus(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const productSuggestionList = useSelector(
    (state) => state.productSearch.productSuggestionList
  );
  const isLoading = useSelector(
    (state) => state.productSearch.isSecondaryLoading
  );

  const delaySearchByText = useCallback(
    _.debounce((q) => {
      dispatch(fetch_ProductSuggestionList(q));
    }, 500),
    []
  );

  const dispatchClearDataList = () => {
    dispatch(clear_DataList());
  }

  const onChangeText = (value) => {
    if (value) {
      setIsFocus(true);
      setInputValue(value);
      setIsInputValue(true);
      delaySearchByText(value);
      return;
    }
    // dispatchClearDataList();
    setIsInputValue(false);
  };

  const onSearchText = (query) => {
    let propsState = {
      productName: query,
      category: null,
      searchType: SEARCH_BY_NAME,
    };
    goToSpecificPathNameWithData(history, PRODUCT_SEARCH_RESULT, propsState);
    let history_state = {
      name: query,
    };
    setSearchHistory(history_state);
  };

  /**
   * When clicking Enter-Key - trigger
   */
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      setIsFocus(false);
      if (productName !== inputValue) {
        dispatchClearDataList();
      }
      onSearchText(inputValue);
    }
  };
  //#endregion

  return [
    cartCount,
    notiCount,
    isFocus,
    searchInputBox,
    searchPopUp,
    isLoading,
    productSuggestionList,
    isInputValue,
    /**
     * action
     */
    onFocus,
    onChangeText,
    handleKeyPress,
    setIsFocus,
    dispatchClearDataList
  ];
}
