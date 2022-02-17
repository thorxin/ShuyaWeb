import _ from "lodash";

//components
import { APPLICATION_PLATFORM } from "../../constant/applicationConfig";
import { removeFromCart, updateProductCart } from "../../services/service.order";
import { POST_CONFIG } from "../../constant/header";

export const AVAILABLE_PRODUCT = "AVAILABLE_PRODUCT";
export const STOCK_LEFT_PRODUCT = "STOCK_LEFT_PRODUCT";
export const OUT_OF_STOCK_PRODUCT = "OUT_OF_STOCK_PRODUCT";

//Remove Product From Cart - Type - Clear one or Clear all
export const CLEAR_ONE = "CLEAR_ONE";
export const CLEAR_ALL = "CLEAR_ALL";

//Payment Type
export const SERVICE_PAYMENT_TYPE = "Service";
export const BANK_PAYMENT_TYPE = "Bank";
export const CASH_ON_DELIVERY_PAYMENT_TYPE = "Cod";

//Payment Agent Id
export const WAVE_MONEY_AGENT_ID = 13;
export const KBZ_AGENT_ID = 14;

//Payment Agent Name
export const WAVE_MONEY_AGENT_NAME = "Wave Pay";
export const KBZ_AGENT_NAME = "KBZ Pay";

export const PRODUCT_PRICE_DETAIL = {
  totalAmount: 0,
  netAmount: 0,
};

/**
 * Filter Product List from api - Available or OutOfStock or StockLeft Products
 * @param {*} productInfo
 */
export const filterProductList = (productInfo) => {
  if (productInfo.length <= 0)
    return {
      availableProductList: [],
      stockLeftProductList: [],
      outOfStockProductList: [],
    };

  let available_product = productInfo.filter(
    (product) => product.qty <= product.availableQty
  );
  let stock_left_product = productInfo.filter(
    (product) =>
      product.qty > product.availableQty && product.availableQty !== 0
  );
  let out_of_stock_product = productInfo.filter(
    (product) => product.availableQty === 0
  );
  return {
    availableProductList: available_product,
    stockLeftProductList: stock_left_product,
    outOfStockProductList: out_of_stock_product,
  };
};

//#region - Increase And Decrease Product Qty Section
/**
 * Checking Product Qty
 * @param {number} current_qty
 * @param {number} available_qty
 * @returns
 */
export const checkProductQty = (current_qty, available_qty) => {
  if (current_qty === 0) return true;
  if (current_qty > available_qty) return true;

  return false;
};
/**
 * Increasing Product Qty - clicking Plus Icon
 * @param {Array} productList
 * @param {object} propsData
 * @returns
 */
export const increaseCount = (productList, propsData) => {
  let current_idx = propsData.index;
  let updated_qty = propsData.qty + 1;

  if (checkProductQty(updated_qty, productList[current_idx].availableQty)) return true;

  productList[current_idx] = { ...productList[current_idx], qty: updated_qty };

  let update_cart_data = composeUpdateProductCartData(productList[current_idx]);
  const response = updateProductCart(POST_CONFIG(JSON.stringify(update_cart_data)));

  return false;
};
/**
 * Decreasing Product Qty - clicking Minus Icon
 * @param {Array} productList
 * @param {object} propsData
 * @returns
 */
export const decreaseCount = (productList, propsData) => {
  let current_idx = propsData.index;
  let updated_qty = propsData.qty - 1;

  if (checkProductQty(updated_qty)) return productList;

  productList[current_idx] = { ...productList[current_idx], qty: updated_qty };

  let update_cart_data = composeUpdateProductCartData(productList[current_idx]);
  const response = updateProductCart(POST_CONFIG(JSON.stringify(update_cart_data)));

  return productList;
};
//#endregion

//#region - Remove Product Section
export function removeAllProductFromCart(product) {
  removeFromCart(
    POST_CONFIG(
      JSON.stringify({ productId: product?.productId, skuId: product?.skuId })
    )
  );
}
/**
 *
 * @param {Array} product_array - Product Array of Removed Product
 * @param {object} removed_product - Removed Product React State
 */
export function removeProductFromState(
  product_array = [],
  removed_product = {}
) {
  if (product_array.length <= 0) return;

  let filter_product = product_array.filter(
    (product) =>
      product.productId !== removed_product.productId ||
      product.skuId !== removed_product.skuId
  );

  return filter_product;
}
export const composeDataRemoveFromCart = (
  product_id = 0,
  sku_id = 0,
  product_type = ""
) => {
  return {
    productId: product_id,
    skuId: sku_id,
    productType: product_type,
  };
};
//#endregion

export const calculateProductAmount = (product_list, propsData) => {
  let promote_price_total = 0;
  let normal_price_total = 0;
  for (let index = 0; index < product_list.length; index++) {
    if (product_list[index].promotePrice > 0) {
      promote_price_total +=
        product_list[index].qty * product_list[index].promotePrice;
    } else if (product_list[index].promotePrice <= 0) {
      normal_price_total += product_list[index].qty * product_list[index].price;
    }
  }
  let total_amt = promote_price_total + normal_price_total;

  return total_amt;
};

//#region - Composing Data
export const composeOrderDataPayWithOther = (
  shop_cart = {},
  payment_id = 0,
  available_product_list = [],
  total_amount = 0,
  delivery_fee = 0,
) => {
  return {
    cart_info: shop_cart,
    payment_service_id: payment_id,
    available_product: available_product_list,
    total_amount: total_amount + delivery_fee
  };
};
//#endregion

export const composePaymentInfoOther = (
  payment_id = 0,
  bank_id = 0,
  phone_no = "",
  remark = "",
  approval_image = "",
  approval_extension = "",
  selectedDeiveryInfo = {}
) => {
  return {
    paymentServiceId: payment_id,
    bankId: bank_id,
    phoNo: phone_no,
    remark: remark,
    approvalImage: {
      approvalImage: approval_image,
      approvalImageExtension: approval_extension,
    }
  };
};

export const composeUpdateProductCartData = (product = {}) => {
  let postData = {
    productId: product.productId,
    skuId: product.skuId,
    qty: product.qty
  }
  return {
    productCarts: [postData]
  }
}

export const composePostOrderDataOther = (
  shop_cart = {},
  available_product_info = [],
  payment_info = {},
  total_amount = 0,
  selectedDeliveryInfo = {}
) => {
  let order_info = _.cloneDeep(shop_cart);
  let product_info = _.cloneDeep(available_product_info || []);
  let productInfo = [];
  if (product_info.length > 0) {
    productInfo = product_info.map((product) => ({
      productId: product.productId,
      skuId: product.skuId,
      // price: product.promotePrice > 0 ? product.promotePrice : product.price,
      price:product.price,
      qty: product.qty,
    }));
  }

  let delivery_info = _.cloneDeep(order_info.deliveryInfo);
  let delivery = {
    name: delivery_info.name,
    cityId: delivery_info.cityId,
    townshipId: delivery_info.townshipId,
    phoNo: delivery_info.phoNo,
    address: delivery_info.address,
    remark: delivery_info.remark,
    deliveryDate: new Date(),
    fromTime: selectedDeliveryInfo.fromEstDeliveryDay.toString(),
    toTime: selectedDeliveryInfo.toEstDeliveryDay.toString(),
    landMark: "",
    selectedDeliveryInfo: selectedDeliveryInfo
  };

  return {
    totalAmt: total_amount,
    netAmt: total_amount + order_info?.deliveryFee,
    deliveryFee: order_info?.deliveryFee,
    platform: APPLICATION_PLATFORM,
    handlingFee: 0,
    tax: 0,
    discountPrice: 0,
    discountPercent: 0,
    productInfo: productInfo,
    deliveryInfo: delivery,
    paymentInfo: payment_info,
  };
};
