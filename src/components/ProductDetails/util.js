import _ from "lodash";

export const BUY_NOW = "BUY_NOW";
export const ADD_TO_SHOP_CART = "ADD_TO_SHOP_CART";
export const NO_VARIANT_CONFIG = "NO_VARIANT_CONFIG";

export const INITIAL_VARIANT_VALUE = {
  value_id: 0,
  value_name: ''
}

export const gettingCurrentVariantId = (index, variant_list) => {
  let current_index = _.cloneDeep(index);
  let clone_variant_list = _.cloneDeep(variant_list);
  let current_variant_id;

  //prevent getting at last IndexOf Array
  let size = clone_variant_list.length;
  if (size > 0 && current_index === size - 1) {
    current_variant_id = 0;
    return current_variant_id;
  }

  if (size > 0) {
    current_variant_id = clone_variant_list[current_index + 1].variantId;
  }
  return current_variant_id;
};

export const creatingSelectedVariantList = (selected_variant_list, variant_value, variant_idx) => {
  let clone_selected_variant_list = _.cloneDeep(selected_variant_list || []);
  let clone_variant_value = _.cloneDeep(variant_value || {});
  let clone_variant_idx = _.cloneDeep(variant_idx);
  clone_selected_variant_list[clone_variant_idx] = {
    ...clone_selected_variant_list[clone_variant_idx],
    value_id: clone_variant_value.valueId,
    value_name: clone_variant_value.valueName
  }
  return clone_selected_variant_list;
}

export const composeVariantData = (
  product_id = 0,
  selected_variant_id = 0,
  selected_value_id = 0,
  current_variant_id = 0
) => {
  return {
    productId: product_id,
    selectedVariantId: selected_variant_id,
    selectedValueId: selected_value_id,
    currentVariantId: current_variant_id,
  };
};

export const composeAddToCartData = (product_id = 0, sku_id = 0, qty = 0) => {
  return {
    productId: product_id,
    skuId: sku_id,
    qty: qty
  };
};
