import * as endpoints from "../constant/api";
import { APPLICATION_CONFIG_ID } from "../constant/applicationConfig";

export async function getMyAccount(userId = 0, data) {
  return await fetch(
    `${endpoints.MyAccount}?Id=${userId}&ApplicationConfigId=${APPLICATION_CONFIG_ID}`,
    data
  );
}

export async function changeNameAndLogo(data) {
  return await fetch(endpoints.ChangeNameAndLogo, data);
}

export async function changePhoneNumber(data) {
  return await fetch(endpoints.ChangePhoneNumber, data);
}

export async function verifyChangedPhoneNumber(data) {
  return await fetch(endpoints.VerifyChangedPhoneNumber, data);
}

export async function changePassword(data) {
  return await fetch(endpoints.GetChangePassword, data);
}

export async function updateWishList(product_id = 0, is_fav = false, data) {
  return await fetch(
    `${endpoints.UpdateWishlist}?productId=${product_id}&isFav=${is_fav}`,
    data
  );
}

export async function getTermsAndConditions(data) {
  return await fetch(`${endpoints.GetTermsAndConditions}?ApplicationConfigId=${APPLICATION_CONFIG_ID}`, data);
}
