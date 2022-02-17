/** @format */

import * as endpoints from '../constant/api';

/**
 * LogIn
 */
export async function logInUser(data) {
  return await fetch(endpoints.Login, data);
}

/**
 * Registration
 */
export async function registrationUser(data) {
  return await fetch(endpoints.registration, data);
}
export async function registrationVerify(data) {
  return await fetch(endpoints.VerifyRegister, data);
}
export async function resendCode(data) {
  return await fetch(endpoints.ResendCode, data);
}
/**
 * RegistrationAddress
 */
export async function getCity(data) {
  return await fetch(endpoints.GetCity, data);
}
export async function getTownship(cityId, data) {
  return await fetch(`${endpoints.GetTownship}${cityId}`, data);
}
export async function addAndChangeUserAddress(data) {
  return await fetch(endpoints.AddAndChangeUserAddress, data);
}

/**
 * Forgot Password
 */
export async function forgotPassword(data) {
  return await fetch(endpoints.ForgotPassword, data);
}
export async function resetPassword(data) {
  return await fetch(endpoints.ResetPassword, data);
}

/**
 * Order Detail
 */

export async function refreshToken(data) {
  return await fetch(endpoints.RefreshToken, data);
}

export async function LoginWithFaceBook(data) {
  return await fetch(endpoints.FaceBookLogin, data);
}
