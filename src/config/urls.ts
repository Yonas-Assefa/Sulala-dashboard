import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export const BASE_URL = process.env.BACKEND_BASE_URL!;
const API_URL = `${BASE_URL}api/v1/`;
const VENDOR_BASE_URL = `${API_URL}vendors/`;

// VENDOR BASED URLS
export const SIGNUP_URL = `${VENDOR_BASE_URL}register/`;
export const SETUP_URL = `${VENDOR_BASE_URL}update_profile/`;
export const PHONE_SIGNIN_URL = `${VENDOR_BASE_URL}login-with-phonenumber/`;
export const EMAIL_SIGNIN_URL = `${VENDOR_BASE_URL}login-with-email/`;
export const FORGOT_PASSWORD = `${VENDOR_BASE_URL}forgot-password/`;
export const VERIFY_PHONE = `${VENDOR_BASE_URL}verify-phonenumber/`;
export const RESEND_OTP = `${VENDOR_BASE_URL}resendOtp/`;
export const RESEND_VERIFICATION_LINK = `${VENDOR_BASE_URL}resend_verification_link/`;
export const CONFIRM_PHONE = `${VENDOR_BASE_URL}confirm_phonenumber_login/`;
export const VERIFY_EMAIL = `${VENDOR_BASE_URL}verify-email/`;
export const CREATE_PASSWORD = `${VENDOR_BASE_URL}set-password/`;
export const SHOP_ACCOUNT = `${VENDOR_BASE_URL}shop_account_setup/`;
export const GET_VENDOR_ACCOUNT = `${VENDOR_BASE_URL}get_vendor_profile/`;
export const GET_SHOP_ACCOUNT = `${VENDOR_BASE_URL}get_shop_info/`;
export const UPDATE_VENDOR_ACCOUNT = `${VENDOR_BASE_URL}update_profile/`;
export const UPDATE_SHOP_ACCOUNT = `${VENDOR_BASE_URL}update_shop_info/`;
export const UPDATE_BILLING_ACCOUNT = `${VENDOR_BASE_URL}update_profile/`;
export const ADD_BILLING_INFO = `${VENDOR_BASE_URL}add_payment_method/`;
export const DELETE_BILLING_INFO = `${VENDOR_BASE_URL}delete_payment_method/`;
export const SET_PRIMARY_BILLING = `${VENDOR_BASE_URL}set_payment_method_primary/`;
export const CHANGE_PASSWORD = `${VENDOR_BASE_URL}change_password/`;
export const LOGOUT = `${API_URL}logout/`;
export const GET_BILLING_ACCOUNT = `${VENDOR_BASE_URL}get_payment_method/`;
export const GOOGLE_SIGNIN_URL = `${VENDOR_BASE_URL}google_signin_signup_vendor/`;

// CATEGORY URLS
export const CATEGORIES = `${API_URL}categories/`;

// PRODUCT URLS
export const PRODUCTS = `${API_URL}products/`;
export const PRODUCT_TAGS = `${API_URL}product_tags/`;

// PROMOTION URLS
export const PROMOTIONS = `${API_URL}promotions/`;
export const REMOVE_PROMOTION_FILE = `${API_URL}remove_promotion_file/`;

//ORDERS URLS
export const ORDERS_URL = `${API_URL}orders/vendor-orders/`;

//SHOP URLS
export const SHOP_REVENUE_URL = `${VENDOR_BASE_URL}get_order_analysis/`;
// OTHERS
export const INSTAGRAM_BASE_URL = "https://www.instagram.com/";
export const FACEBOOK_BASE_URL = "https://www.facebook.com/";
