/** @format */

import * as endpoints from '../constant/api';
import httpService from '../constant/httpService';

export async function getCartDetail(data) {
  return await fetch(endpoints.GetCartDetail, data);
}

export async function getCartDetailForBuyNow(postData, data) {
  return await fetch(
    `${endpoints.GetCartDetailForBuyNow}?productId=${postData.productId}&skuId=${postData.skuId}&qty=${postData.qty}`,
    data
  );
}

export async function removeItemFromCart(data) {
  return await fetch(endpoints.RemoveFromCart, data);
}

export async function removeFromCart(data) {
  return await fetch(endpoints.RemoveFromCart, data);
}

export async function postOrder(data) {
  return await fetch(endpoints.PostOrder, data);
}

export async function postOrderActivity(order_id, data) {
  return await fetch(`${endpoints.PostOrderActivity}?orderId=${order_id}`, data);
}

export async function getBank(data) {
  return await fetch(endpoints.GetBank, data);
}

export async function getPaymentServiceDetail(service_id, data) {
  return await fetch(
    `${endpoints.GetPaymentServiceDetail}?paymentServiceId=${service_id}`,
    data
  );
}

export async function getOrderHistory(request, data) {
  return await fetch(`${endpoints.GetOrderHistory}${request}`, data);
}

export async function getVoucherNoSuggestion(request, data) {
  return await fetch(`${endpoints.GetVoucherNoSuggestion}${request}`, data);
}

export async function getOrderDetail(orderId = 0) {
  return await httpService.get(`${endpoints.GetOrderDetail}${orderId}`);
}

export async function buyerOrderCancel(data) {
  return await fetch(endpoints.BuyerOrderCancel, data);
}

export async function fetchByEverything(
  userId,
  paymentStatus,
  orderStatus,
  orderdate,
  paymentDate,
  data
) {
  return await fetch(
    `${endpoints.GetOrderHistory}${userId}&PaymentStatusId=${paymentStatus}&OrderStatusId=${orderStatus}&OrderDate=${orderdate}&PaymentDate=${paymentDate}`,
    data
  );
}

export async function getPOSVoucher(orderId, data) {
  return await fetch(`${endpoints.GetPOSVoucher}${orderId}`, data);
}

export async function getPaymentServiceById(paymentServiceId, data) {
  return await fetch(
    `${endpoints.GetPaymentServiceDetailById}${paymentServiceId}`,
    data
  );
}

export async function getOrderIdByTransactionId(transactionId, data) {
  return await fetch(
    `${endpoints.GetOrderIdByTransationId}${transactionId}`,
    data
  );
}

export async function sendOrderMessage(data) {
  return await fetch(endpoints.SendOrderMessage, data);
}

export async function getOrderMessage(
  order_id = 0,
  page_number = 0,
  page_size = 0,
  data
) {
  return await fetch(
    `${endpoints.GetOrderMessage}?OrderId=${order_id}&PageNumber=${page_number}&PageSize=${page_size}`,
    data
  );
}

export async function updateProductCart(data) {
  return await fetch(endpoints.UpdateProductCart, data);
}

export async function paymentAgain(data) {
  return await fetch(endpoints.PaymentAgain, data);
}

export async function getDeliveryAddress(data) {
  return await fetch(endpoints.GetDeliveryAddress, data);
}

export async function changeSelectedDelivery(data) {
  return await fetch(endpoints.ChangeSelectedDeliveryAddress, data);
}

export async function createdReplaceDeliveryAddress(data) {
  return await fetch(endpoints.CreatedReplaceDeliveryAddress, data);
}


export async function deleteDeliveryAddress(Id, data) {
  return await fetch(`${endpoints.DeletedDeliveryAddress}?DeliveryAddressId=${Id}`, data);
}