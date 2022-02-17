import * as endpoints from "../constant/api";
import { APPLICATION_CONFIG_ID } from "../constant/applicationConfig";

export async function getProductDetail(product_id = 0, data) {
  return await fetch(`${endpoints.GetProductDetail}${product_id}`, data);
}

export async function getProductByRelatedCategory(
  category_id = 0,
  page_number = 0,
  page_size = 0,
  data
) {
  return await fetch(
    `${endpoints.GetProductByRelatedCategory}?CategoryId=${category_id}&PageNumber=${page_number}&PageSize=${page_size}`,
    data
  );
}

export async function getVariantValue(data) {
  return await fetch(endpoints.GetVariantValue, data);
}

export async function addToCart(data) {
  return await fetch(endpoints.AddToCard, data);
}

export async function getQAndAByBuyer(
  product_id = 0,
  page_number = 0,
  page_size = 0,
  data
) {
  return await fetch(
    `${endpoints.GetQAndAByBuyer}?ProductId=${product_id}&PageNumber=${page_number}&PageSize=${page_size}`
  );
}

export async function getQAndAByUserId(product_id = 0, data) {
  return await fetch(
    `${endpoints.GetQAndAByUserId}?productId=${product_id}`,
    data
  );
}

export async function saveQuestion(data) {
  return await fetch(endpoints.SaveQuestion, data);
}

export async function deleteQuestion(data) {
  return await fetch(endpoints.DeleteQuestion, data);
}

export async function getTotalQuestionByProductId(product_id = 0, data) {
  return await fetch(
    `${endpoints.GetTotalQuestionByProductId}?productId=${product_id}`
  );
}

export async function getTerms(data) {
    return await fetch(
        `${endpoints.GetTermsAndConditions}?ApplicationConfigId=${APPLICATION_CONFIG_ID}`, data);
}

export async function getShipping(data) {
    return await fetch(endpoints.GetShippingInformation, data);
}

export async function getWarranty(data) {
    return await fetch(endpoints.GetWarranty, data);
}

export async function getPolicy(data) {
    return await fetch(endpoints.GetPolicy, data);
}

export async function getInstallation(data) {
    return await fetch(endpoints.GetInstallation, data);
}

export async function getProductPreOrderTC(data) {
    return await fetch(endpoints.GetProductPreOrderTC, data);
}

export async function getShippingInformationById(Id, data) {
  return await fetch(`${endpoints.GetShippingInformationById}?Id=${Id}`, data);
}

export async function getWarrantyById(Id, data) {
  return await fetch(`${endpoints.GetWarrantyById}?Id=${Id}`, data);
}

export async function getPolicyById(Id, data) {
  return await fetch(`${endpoints.GetPolicyById}?Id=${Id}`, data);
}

export async function getPreOrderTCById(Id, data) {
  return await fetch(`${endpoints.GetProductPreOrderTCById}?Id=${Id}`, data);
}

export async function getInstalltionById(Id, data) {
  return await fetch(`${endpoints.GetInstallationById}?Id=${Id}`, data);
}
