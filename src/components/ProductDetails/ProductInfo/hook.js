import _, { update } from "lodash";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

//components
import {
  fetch_VariantValue,
  add_ToCart,
} from "../../../modules/action.productdetails";
import {
  composeVariantData,
  composeAddToCartData,
  gettingCurrentVariantId,
  selectingVariantValue,
  INITIAL_VARIANT_VALUE,
  creatingSelectedVariantList,
  ADD_TO_SHOP_CART,
  BUY_NOW,
} from "../util";
import {
  GET_STORED_ACCESS_TOKEN,
  saveShopCartInfo,
  saveLastRoute,
  saveShoppingCartType,
} from "../../../util/storage";

import { goToSpecificPathName } from "../../../util/goToSpecificPathName";
import { LOGIN, SHOPPING_CART } from "../../../constant/locationPathName";
import { useTranslation } from "react-i18next";

export function Hook(productDetail) {
  const dispatch = useDispatch();
  const variantValue = useSelector(
    (state) => state.productDetails.variantValue
  );

  const history = useHistory();
  const {t} = useTranslation();

  const [updatedVariantList, setUpdatedVariantList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState({
    currentVariantIndex: 0,
    currentVariantValueIndex: 0,
  });
  const [selectedVariantList, setSelectedVariantList] = useState([]);
  const [selectedSku, setSelectedSku] = useState([]);
  const [isOpenVariantBox, setIsOpenVariantBox] = useState(false);
  const [isImageOpenVariantBox, setIsImageOpenVariantBox] = useState(false);
  const [variantConfigType, setVariantConfigType] = useState("");
  const [itemCount, setItemCount] = useState(1);
  const [isShowShareBox, setIsShowShareBox] = useState(false);

  //#region - For No Variant Product - Default Variant
  useEffect(() => {
    if (productDetail?.variant[0].name === "Default") {
      let clone_selectedSku = _.cloneDeep(selectedSku || []);
      clone_selectedSku.push(productDetail.skuValue[0]);
      setSelectedSku(clone_selectedSku);
    }
  }, [productDetail?.variant[0].name]);
  const actionForDefaultVariant = (config = "") => {
    if (config === BUY_NOW) {
      buyNow();
      return;
    }
    if (config === ADD_TO_SHOP_CART) {
      addToCart();
      return;
    }
  };
  //#endregion

  const openVariantBox = (variant_config = "") => {
    if (productDetail.variant[0].name === "Default") {
      actionForDefaultVariant(variant_config);
      return;
    }

    setIsOpenVariantBox(!isOpenVariantBox);
    setVariantConfigType(variant_config);
  };

  const openImageVariantBox = () => {
    setIsImageOpenVariantBox(!isImageOpenVariantBox);
  };
  //#region - life cycle

  /**
   * Create Array including variant and variant value
   */
  useEffect(() => {
    if (
      Object.keys(productDetail).length === 0 &&
      productDetail.constructor === Object
    )
      return;
    let clone_variant = _.cloneDeep(productDetail?.variant || []);
    let clone_variant_value = _.cloneDeep(productDetail?.variantValues || []);
    let clone_selectedVariantList = _.cloneDeep([]);

    for (let i = 0; i < clone_variant.length; i++) {
      clone_selectedVariantList.push(INITIAL_VARIANT_VALUE);
    }
    if (clone_variant.length > 0) {
      clone_variant = clone_variant.map((v) => ({
        ...v,
        show: false,
        variantValue: [],
      }));
    }
    if (clone_variant_value.length > 0) {
      clone_variant_value = clone_variant_value.map((v_value) => ({
        ...v_value,
      }));
    }

    let startOfIndex = 0;
    clone_variant[startOfIndex].variantValue = clone_variant_value;
    clone_variant[startOfIndex].show = true;
    setUpdatedVariantList(clone_variant);
    setSelectedVariantList(clone_selectedVariantList);
  }, [productDetail]);

  /**
   * After fetching new variant value, set variant value into variant array
   */
  useEffect(() => {
    if (variantValue.length <= 0) return;
    let clone_variantValue = _.cloneDeep(variantValue);
    let clone_currentIndex = _.cloneDeep(currentIndex);
    let clone_updatedVariantList = _.cloneDeep(updatedVariantList || []);
    let next_idx = clone_currentIndex.currentVariantIndex + 1;
    let clone_selectedVariantList = _.cloneDeep(selectedVariantList);

    if (clone_updatedVariantList.length <= 0) return;
    clone_updatedVariantList[next_idx] = {
      ...clone_updatedVariantList[next_idx],
      variantValue: clone_variantValue,
      show: true,
    };
    for (let i = next_idx + 1; i < clone_updatedVariantList.length; i++) {
      clone_updatedVariantList[i] = {
        ...clone_updatedVariantList[i],
        variantValue: [],
        show: false,
      };
    }
    for (let j = next_idx; j < clone_selectedVariantList.length; j++) {
      clone_selectedVariantList[j] = {
        ...clone_selectedVariantList[j],
        value_id: 0,
        value_name: "",
      };
    }
    setSelectedVariantList(clone_selectedVariantList);
    changePriceBySku(clone_selectedVariantList);
    setItemCount(1);
    setUpdatedVariantList(clone_updatedVariantList);
  }, [variantValue]);
  //#endregion

  /**
   * match sku value with selected variant
   */
  const changePriceBySku = (selected_variant = []) => {
    const selected_v = _.cloneDeep(selected_variant || []);
    const skuValue = _.cloneDeep(productDetail.skuValue) || [];

    let size = selected_v.length;
    let i = 0;
    let sku = new Array();
    for (; i < size; i++) {
      sku.push(selected_v[i].value_name);
      let sku_value = sku.join(",");
      const filter_data = skuValue.filter((sku) => sku.value === sku_value);
      setSelectedSku(filter_data);
    }
  };
  /**
   * checking select or not variant and product qty exceed. - clicking on Plus, Minus, BuyNow or AddToCart Buttons. - fun:
   */
  const checkQtyCount = (count) => {
    let selected_sku_qty = _.cloneDeep(selectedSku[0]?.qty);
    if (count > selected_sku_qty) {
      toast.error(t("ProductDetails.exceed-qty"), {
        theme: "colored",
      });
      return true;
    }

    if (productDetail.variant[0].name === "Default") {
      setItemCount(count);
      return false;
    }

    if (selectedSku.length <= 0) {
      toast.error(t("ProductDetails.pls-select-variant"), {
        theme: "colored",
      });
      return true;
    }
    setItemCount(count);
    return false;
  };
  /**
   * Increasing Product Qty - clicking on Plus Icon - fun:
   */
  const increaseItemCount = () => {
    let count = _.cloneDeep(itemCount);
    count += 1;
    if (checkQtyCount(count)) return;
  };
  /**
   * Decreasing Product Qty - clicking on Minus Icon - fun:
   */
  const decreaseItemCount = () => {
    let count = _.cloneDeep(itemCount);
    count -= 1;
    if (count <= 0) return;
    setItemCount(count);
  };

  const changeOnCountTextBox = (e) => {
    if (!e.target.value) {
      setItemCount(1);
      return;
    }
    setItemCount(e.target.value);
  };

  /**
   * choose or select variant - clicking on Variant Badge - fun:
   */
  const clickingVariantItem = (
    variant,
    variant_value,
    variant_index,
    variant_value_index
  ) => {
    let productId = _.cloneDeep(productDetail?.id);
    let clone_updatedVariantList = _.cloneDeep(updatedVariantList || []);
    let clone_currentIndex = _.cloneDeep(currentIndex || null);
    let clone_selectedVariantList = _.cloneDeep(selectedVariantList || []);

    let current_variant_id = gettingCurrentVariantId(
      variant_index,
      clone_updatedVariantList
    );

    let result_selected_variant = creatingSelectedVariantList(
      clone_selectedVariantList,
      variant_value,
      variant_index
    );
    changePriceBySku(result_selected_variant);
    setSelectedVariantList(result_selected_variant);

    if (current_variant_id <= 0) return;

    clone_currentIndex = {
      currentVariantIndex: variant_index,
      currentVariantValueIndex: variant_value_index,
    };
    setCurrentIndex(clone_currentIndex);

    let postData = composeVariantData(
      productId,
      variant.variantId,
      variant_value.valueId,
      current_variant_id
    );
    dispatch(fetch_VariantValue(postData));
  };

  /**
   * Add Product To Shopping Cart - fun:
   */
  const addToCart = () => {
    let productId = _.cloneDeep(productDetail?.id);
    let clone_itemQty = _.cloneDeep(itemCount || 0);
    let clone_skuValue = _.cloneDeep(selectedSku || []);
    if (checkQtyCount(clone_itemQty)) return;

    const postData = composeAddToCartData(
      productId,
      clone_skuValue[0].skuId,
      Number(clone_itemQty)
    );
    if (!GET_STORED_ACCESS_TOKEN) {
      saveShopCartInfo(JSON.stringify(postData));
      saveShoppingCartType(ADD_TO_SHOP_CART);
      saveLastRoute("/productdetails");
      goToSpecificPathName(history, "/login");
      return;
    }
    dispatch(add_ToCart(postData));
    setIsOpenVariantBox(false);
  };
  /**
   * Buy Now Product - fun:
   */
  const buyNow = () => {
    let productId = _.cloneDeep(productDetail?.id);
    let clone_itemQty = _.cloneDeep(itemCount || 0);
    let clone_skuValue = _.cloneDeep(selectedSku || []);
    let clone_itemCount = _.cloneDeep(itemCount);
    if (checkQtyCount(clone_itemCount)) return;
    const postData = composeAddToCartData(
      productId,
      clone_skuValue[0].skuId,
      clone_itemQty
    );
    
    if (!GET_STORED_ACCESS_TOKEN) {
      saveShopCartInfo(JSON.stringify(postData));
      saveShoppingCartType(BUY_NOW);
      saveLastRoute("/productdetails");
      goToSpecificPathName(history, LOGIN);

      return;
    }
    saveShoppingCartType(BUY_NOW);
    saveShopCartInfo(JSON.stringify(postData));
    dispatch(add_ToCart(postData));
    goToSpecificPathName(history, SHOPPING_CART);
  };

  const clickOnShopCart = () => {
    if (!GET_STORED_ACCESS_TOKEN) {
      saveLastRoute(SHOPPING_CART);
      goToSpecificPathName(history, LOGIN);
      return;
    }
    goToSpecificPathName(history, SHOPPING_CART);
  };

  return [
    isOpenVariantBox,
    setIsOpenVariantBox,
    isImageOpenVariantBox,
    setIsImageOpenVariantBox,
    variantConfigType,
    updatedVariantList,
    selectedVariantList,
    selectedSku,
    itemCount,
    currentIndex,
    isShowShareBox,
    setIsShowShareBox,
    /**
     * action
     */
    openVariantBox,
    openImageVariantBox,
    clickingVariantItem,
    increaseItemCount,
    decreaseItemCount,
    addToCart,
    buyNow,
    changeOnCountTextBox,
    clickOnShopCart,
  ];
}
