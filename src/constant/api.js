/** @format */

// import { APPLICATION_CONFIG_ID } from "./applicationConfig";

import { NUMBER_OF_LATEST_PRODUCT } from './numberOfProducts';

export const auth_URL = `https://warrior.shopdoora.com/auth/api`;
export const base_URL = `https://warrior.shopdoora.com/shuya`;

/**
 * Auth
 */
export const Login = `${auth_URL}/Auth/login`;
export const registration = `${auth_URL}/Auth/registration`;
export const VerifyRegister = `${auth_URL}/Auth/verifyregister`;
export const ResendCode = `${auth_URL}/Auth/resendcode`;
export const AddAndChangeUserAddress = `${auth_URL}/Auth/addandchangeuseraddress`;
export const ForgotPassword = `${auth_URL}/Auth/forgotpassword`;
export const ResetPassword = `${auth_URL}/Auth/passwordreset`;
export const RefreshToken = `${auth_URL}/Auth/refreshtoken`;
export const FaceBookLogin = `${auth_URL}/Auth/facebookLogin`;

/**
 * Home
 */
export const GetMainCategory = `${base_URL}/api/Miscellaneous/GetMainCategory`;
export const GetLandingProductPromotion = `${base_URL}/api/Product/GetLandingProductPromotion`;
export const GetLandingProductLatest = `${base_URL}/api/Product/GetLandingProductLatest?PageNumber=1&PageSize=${NUMBER_OF_LATEST_PRODUCT}`;
export const GetAllProductListBuyer = `${base_URL}/api/Product/GetAllProductListBuyer`;
export const GetBannerList = `${base_URL}/api/Miscellaneous/GetBannerList?bannerType=`;
export const GetBestSellingProduct = `${base_URL}/api/Product/GetBestSellingProduct`;
export const GetBrand = `${base_URL}/api/Miscellaneous/GetBrand`;
export const GetLandingProductPromotionBuyOneGetOne = `${base_URL}/api/Product/GetLandingProductPromotionBuyOneGetOne`;
export const GetPopupBanner = `${base_URL}/api/Miscellaneous/GetPopupBanner`;

/**
 * MyAccount
 */
export const MyAccount = `${auth_URL}/Auth/myaccount`;
export const ChangeNameAndLogo = `${auth_URL}/Auth/changenameandlogo`;
export const ChangePhoneNumber = `${auth_URL}/Auth/changephonenumber`;
export const VerifyChangedPhoneNumber = `${auth_URL}/Auth/verifychangedphonenumber`;
export const GetChangePassword = `${auth_URL}/Auth/changepassword`;
export const UpdateWishlist = `${base_URL}/api/Product/UpdateWishlist`;
export const GetWishlist = `${base_URL}/api/Product/GetWishlist`;

/**
 * Miscellaneous
 */
export const GetCity = `${base_URL}/api/Miscellaneous/GetCity`;
export const GetTownship = `${base_URL}/api/Miscellaneous/GetTownship?CityId=`;

/**
 * ProductDetail
 */
export const GetProductDetail = `${base_URL}/api/Product/GetProductDetail_v2?ProductId=`;
export const GetVariantValue = `${base_URL}/api/Product/GetVariantValue`;
export const GetProductByRelatedCategory = `${base_URL}/api/Product/GetProductByRelatedCategry`;
export const GetQAndAByBuyer = `${base_URL}/api/Product/GetQAndAByBuyer`;
export const GetQAndAByUserId = `${base_URL}/api/Product/GetQAndAByUserId`;
export const SaveQuestion = `${base_URL}/api/Product/SaveQuestion`;
export const DeleteQuestion = `${base_URL}/api/Product/DeleteQuestion`;
export const GetTotalQuestionByProductId = `${base_URL}/api/Product/GetTotalQuestionByProductId`;

/**
 * Order
 */
export const AddToCard = `${base_URL}/api/Order/AddToCart`;
export const GetCartDetail = `${base_URL}/api/Order/GetCartDetail`;
export const GetCartDetailForBuyNow = `${base_URL}/api/Order/GetCartDetailForBuyNow`;
export const RemoveFromCart = `${base_URL}/api/Order/RemoveFromCart`;
export const PostOrder = `${base_URL}/api/Order/PostOrder`;
export const PostOrderActivity = `${base_URL}/api/Order/PostOrderActivity`;
export const GetBank = `${base_URL}/api/Miscellaneous/GetBank`;
export const GetPaymentServiceDetail = `${base_URL}/api/Miscellaneous/GetPaymentServiceDetail`;
export const GetOrderHistory = `${base_URL}/api/Order/GetOrderHistory`;
export const GetOrderDetail = `/api/Order/GetOrderDetail?orderId=`;
export const BuyerOrderCancel = `${base_URL}/api/Order/BuyerOrderCancel`;
export const GetPOSVoucher = `${base_URL}/api/Order/GetPOSVoucher?orderId=`;
export const GetVoucherNoSuggestion = `${base_URL}/api/Order/GetVoucherNoSuggestion`;
export const SendOrderMessage = `${base_URL}/api/Order/SendOrderMessage`;
export const GetOrderMessage = `${base_URL}/api/Order/GetOrderMessage`;
export const UpdateProductCart = `${base_URL}/api/Order/UpdateProductCart`;
export const PaymentAgain = `${base_URL}/api/Order/PaymentAgain`;

/**
 * Product Search
 */
export const GetTag = `${base_URL}/api/Miscellaneous/GetTag`;
export const ProductSearch = `${base_URL}/api/Product/ProductSearch?SearchType=`;
export const GetProductNameSuggestion = `${base_URL}/api/Product/GetProductNameSuggestion?SearchText=`;

/**
 * Payment Service
 */
export const PostKbzPayment = `${base_URL}/api/Order/PostOrderByKBZPay`;
export const PostWaveMoneyPayment = `${base_URL}/api/Order/PostOrderByWavePay`;
export const GetOrderIdByTransationId = `${base_URL}/api/Order/GetOrderIdByTransactionId?transactionId=`;
export const GetPaymentServiceDetailById = `${base_URL}/api/Miscellaneous/GetPaymentServiceDetail?paymentServiceId=`;

/**
 * Notification
 */
export const GetNotification = `${base_URL}/api/Order/GetNotificationBuyer`;
export const SeenNotification = `${base_URL}/api/Order/SeenNotification?Id=`;

/**
 * Shipping Warranty Policy Terms & Conditions
 */
export const GetShippingInformation = `${base_URL}/api/Miscellaneous/GetShippingInformation`;
export const GetWarranty = `${base_URL}/api/Miscellaneous/GetWarranty`;
export const GetPolicy = `${base_URL}/api/Miscellaneous/GetPolicy`;
export const GetTermsAndConditions = `${auth_URL}/Auth/GetTermsAndConditions`;
export const GetInstallation = `${base_URL}/api/Miscellaneous/GetInstallation`;
export const GetProductPreOrderTC = `${base_URL}/api/Miscellaneous/GetProductPreOrderTC`;
export const GetShippingInformationById = `${base_URL}/api/Miscellaneous/GetShippingInformationById`;
export const GetWarrantyById = `${base_URL}/api/Miscellaneous/GetWarrantyById`;
export const GetPolicyById = `${base_URL}/api/Miscellaneous/GetPolicyById`;
export const GetInstallationById = `${base_URL}/api/Miscellaneous/GetInstallationById`;
export const GetProductPreOrderTCById = `${base_URL}/api/Miscellaneous/GetProductPreOrderTCById`;

/**
 * ByCategory
 */
export const ProductSearchByCategory = `${base_URL}/api/Product/ProductSearchByCategory?ProductCategoryId=`;
export const GetMainCategoryById = `${base_URL}/api/Miscellaneous/GetMainCategoryById?productCategoryId=`;
export const GetProductByBrand = `${base_URL}/api/Product/GetProductByBrand?BrandId=`;

/**
 * Change Delivery Address
 */
export const GetDeliveryAddress = `${base_URL}/api/Order/GetDeliveryAddress`;
export const ChangeSelectedDeliveryAddress = `${base_URL}/api/Order/ConfirmSelectedAddress`;
export const CreatedReplaceDeliveryAddress = `${base_URL}/api/Order/CreateUserDeliveryAddress`;
export const DeletedDeliveryAddress = `${base_URL}/api/Order/DeleteUserDeliveryAddress`;
