import {
  LAST_ROUTE_NAME,
  getLocalStorage,
  removeLocalStorage,
  ADD_TO_CART,
  ACCESS_TOKEN,
  SHOPPING_CART_TYPE,
  PRODUCT_ID,
  PRODUCT_OFFER_ID,
} from "./storage";
import {
  HOME_DEFAULT,
  PRODUCT_SEARCH_RESULT,
  QUESTION_AND_ANSWER,
  SHOPPING_CART,
} from "../constant/locationPathName";
import { addToCart } from "../services/service.productdetails";
import { POST_CONFIG_WITH_TOKEN } from "../constant/header";
import { ADD_TO_SHOP_CART, BUY_NOW } from "../components/ProductDetails/util";

/**
 *
 * @param {*} history
 * @param {*} path_name
 */
export function goToSpecificPathName(history, path_name = "") {
  history.push({
    pathname: path_name,
  });
}

/**
 *
 * @param {*} history
 * @param {*} path_name
 * @param {*} data
 */
export function goToSpecificPathNameWithData(history, path_name = "", data) {
  history.push({
    pathname: path_name,
    state: data,
  });
}

export async function goToSpecificAfterAuth() {
  const cartInfo = getLocalStorage(ADD_TO_CART);
  const accessToken = getLocalStorage(ACCESS_TOKEN);
  const shoppingCartType = getLocalStorage(SHOPPING_CART_TYPE);
  const productId = getLocalStorage(PRODUCT_ID);
  const productOfferId = getLocalStorage(PRODUCT_OFFER_ID);

  if (cartInfo) {
    switch (shoppingCartType) {
      case ADD_TO_SHOP_CART:
        const response = await addToCart(
          POST_CONFIG_WITH_TOKEN(cartInfo, accessToken)
        );
        if (response.ok) {
          removeLocalStorage(ADD_TO_CART);
          removeLocalStorage(LAST_ROUTE_NAME);
          window.location.replace(SHOPPING_CART);
        } else {
          alert("Something went wrong!");
        }
        break;
      case BUY_NOW:
        removeLocalStorage(LAST_ROUTE_NAME);
        removeLocalStorage(SHOPPING_CART_TYPE);
        window.location.replace(SHOPPING_CART);
        break;
      default:
        break;
    }

    return;
  }
  const lastRoute = await getLocalStorage(LAST_ROUTE_NAME);

  if (productId > 0) {
    removeLocalStorage(LAST_ROUTE_NAME);
    removeLocalStorage(PRODUCT_ID);
    window.location.replace(`${QUESTION_AND_ANSWER}?productId=${productId}`);

    return;
  }

  if (productOfferId) {
    window.location.replace(`${lastRoute}?id=${productOfferId}`);
    removeLocalStorage(LAST_ROUTE_NAME);
    removeLocalStorage(PRODUCT_OFFER_ID);
    return;
  }

  if (lastRoute) {
    // window.location.replace(lastRoute);
    window.location.replace(HOME_DEFAULT);
    removeLocalStorage(LAST_ROUTE_NAME);
    return;
  }
  window.location.replace(HOME_DEFAULT);
}

/**
 *
 * @param {*} history
 * @param {*} productID
 * @param {*} backToHome
 */
export const goProductDetails = (history, productID = 0, backToHome = false) => {
  if (productID > 0)
    history.push({
      pathname: "/productdetails",
      search: `?productId=${productID}`,
      state: productID,
      backToHome: backToHome,
    });
};

/**
 * Going to product search result page
 * @param {*} history
 * @param {*} propsState
 */
export const goToProductSearchResult = (history, propsState) => {
  if (propsState) {
    history.push({
      pathname: PRODUCT_SEARCH_RESULT,
      state: propsState,
    });
  }
};
export const goBack = (history) => {
  history.goBack();
};
