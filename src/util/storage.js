import { FONT_UNICODE, FONT_ZAW_GYI } from "../constant/languageConfig";

export const ACCESS_TOKEN = "AccessToken";
export const REFRESH_TOKEN = "RefreshToken";
export const USER_INFO = "UserInfo";
export const USER_ID = "UserId";
export const LAST_ROUTE_NAME = "LastRouteName";
export const ADD_TO_CART = "ShopCartItemInfo";
export const SHOPPING_CART_TYPE = "ShoppingCartType";
export const PRODUCT_ID = "ProductId";
export const SEARCH_HISTORY = "SearchHistory";
export const PRODUCT_OFFER_ID = "ProductOfferId";
export const LANGUAGE_TYPE = "i18nextLng";
export const SAVE_FACEBOOK_LOGIN = "SaveFacebookLogin";
/**
 * history type
 */
export const HISTORY_ITEM = 1;
export const HISTORY_CATEGORY = 2;

//#region - Set LocalStorage
export function saveLocalStorage(key, data) {
  if (!data) return;
  localStorage.setItem(key, data);
}
/**
 *
 * @param {*} accessToken
 * @param {*} refreshToken
 * @param {*} user
 */
export function setLocalStorageTokenAndUserInfo(
  accessToken,
  refreshToken,
  user = null
) {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
  if (user) {
    localStorage.setItem(USER_INFO, JSON.stringify(user));
    localStorage.setItem(USER_ID, user?.id);
  }
}
export function saveShopCartInfo(info) {
  if (getLocalStorage(ADD_TO_CART)) {
    removeLocalStorage(ADD_TO_CART);
  }
  if (info) {
    localStorage.setItem(ADD_TO_CART, info);
  }
}
export function saveShoppingCartType(type) {
  if (type) {
    localStorage.setItem(SHOPPING_CART_TYPE, type);
  }
}
export function saveLastRoute(routeName) {
  if (routeName) {
    localStorage.setItem(LAST_ROUTE_NAME, routeName);
  }
}
export function setSearchHistory(searchHistory, type = HISTORY_ITEM) {
  const oldHistory = getHistory();

  oldHistory.push({
    type: type,
    id: searchHistory.id,
    name: searchHistory.name,
    imageUrl: searchHistory.imageUrl || "",
  });

  if (oldHistory.length > 7) {
    const result = oldHistory.slice(Math.max(oldHistory.length - 7, 0));
    localStorage.setItem(SEARCH_HISTORY, JSON.stringify(result));
  } else localStorage.setItem(SEARCH_HISTORY, JSON.stringify(oldHistory));
}
//#endregion

//#region - Clear Local Storage
export function clearLocalStorageForLogOut() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(USER_INFO);
  localStorage.removeItem(USER_ID);
  // localStorage.removeItem(SEARCH_HISTORY);
}

export function clearLocalStorage() {
  window.localStorage.clear();
}
export function removeLocalStorage(key) {
  return localStorage.removeItem(key);
}
export function clearHistory(index) {
  if (index >= 0) {
    const history = localStorage.getItem(SEARCH_HISTORY);
    const temp = JSON.parse(history);
    temp.splice(index, 1);
    localStorage.setItem(SEARCH_HISTORY, JSON.stringify(temp));
    return;
  }

  localStorage.removeItem(SEARCH_HISTORY);
}
//#endregion

//#region  - Get LocalStorage
export function getLocalStorage(key) {
  return localStorage.getItem(key);
}
export function getHistory() {
  const history = localStorage.getItem(SEARCH_HISTORY);
  const temp = JSON.parse(history);
  if (!history || !Array.isArray(temp)) {
    localStorage.removeItem(SEARCH_HISTORY);
    return [];
  } else {
    return temp;
  }
}
export function getLanguageTypeForAuth() {
  const lang = localStorage.getItem(LANGUAGE_TYPE);
  if (lang === FONT_UNICODE || lang === FONT_ZAW_GYI) {
    return 2;
  }
  return 1;
}
//#endregion

export function saveFacebookLogin(save) {
  if (save) {
    localStorage.setItem(SAVE_FACEBOOK_LOGIN, save);
  }
}

/**
 * local Storage
 */
export const GET_STORED_ACCESS_TOKEN = getLocalStorage(ACCESS_TOKEN);
export const GET_STORED_REFRESH_TOKEN = getLocalStorage(REFRESH_TOKEN);
export const GET_STORED_USER_ID = getLocalStorage(USER_ID);
export const GET_STORED_USER_INFO = getLocalStorage(USER_INFO);
export const GET_LAST_ROUTE_NAME = getLocalStorage(LAST_ROUTE_NAME);
