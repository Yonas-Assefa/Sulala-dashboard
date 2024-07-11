// import { loadEnvConfig } from "@next/env";

// const projectDir = process.cwd();
// loadEnvConfig(projectDir);

export const BASE_URL = process.env.BACKEND_BASE_URL!;
export const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL!;
const API_URL = `${BASE_URL}api/v1/`;

// VENDOR BASED URLS
const VENDOR_BASE_URL = `${API_URL}vendors/`;

// IMAGE BASED URLS
export const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL!;

// IMAGE UPLOAD URLS
// TODO: Change this to the correct URL
export const UPLOAD_IMAGE = `${API_URL}products/upload-image/`;

// VENDOR BASED URLS
export const SIGNUP_URL = `${VENDOR_BASE_URL}register/`;
export const SETUP_URL = `${VENDOR_BASE_URL}update_profile/`;
export const PHONE_SIGNIN_URL = `${VENDOR_BASE_URL}login-with-phonenumber/`;
export const EMAIL_SIGNIN_URL = `${VENDOR_BASE_URL}login-with-email/`;
export const FORGOT_PASSWORD = `${VENDOR_BASE_URL}reset-password/`;
export const CONTACT_SUPPORT = `${VENDOR_BASE_URL}customer-support/`;
export const CONFIRM_RESET_PASSWORD = `${VENDOR_BASE_URL}confirm-reset-password/`;
export const VERIFY_PHONE = `${VENDOR_BASE_URL}verify-phonenumber/`;
export const RESEND_OTP = `${VENDOR_BASE_URL}resendOtp/`;
export const RESEND_VERIFICATION_LINK = `${VENDOR_BASE_URL}resend_verification_link/`;
export const RESEND_PASSWORD_SETUP_LINK = `${VENDOR_BASE_URL}send-set-password-link/`;
export const CONFIRM_PASSWORD_SETUP = `${VENDOR_BASE_URL}confirm-set-password/`;
export const CONFIRM_PHONE = `${VENDOR_BASE_URL}confirm_phonenumber_login/`;
export const VERIFY_EMAIL = `${VENDOR_BASE_URL}verify-email/`;
export const CREATE_PASSWORD = `${VENDOR_BASE_URL}set-password/`;
export const SHOP_ACCOUNT = `${VENDOR_BASE_URL}shop_account_setup/`;
export const GET_VENDOR_ACCOUNT = `${VENDOR_BASE_URL}get_vendor_profile/`;
export const GET_SHOP_ACCOUNT = `${VENDOR_BASE_URL}get_shop_info/`;
export const UPDATE_VENDOR_ACCOUNT = `${VENDOR_BASE_URL}update_profile/`;
export const UPDATE_SHOP_ACCOUNT = `${VENDOR_BASE_URL}update_shop_info/`;
export const UPDATE_BILLING_ACCOUNT = `${VENDOR_BASE_URL}update_profile/`;
export const BILLING_INFO = `${API_URL}payments/`;
export const SET_PRIMARY_BILLING = `${API_URL}payments/set-default-payment-method/`;
export const CHANGE_PASSWORD = `${VENDOR_BASE_URL}change_password/`;
export const LOGOUT = `${API_URL}logout/`;
export const GOOGLE_SIGNIN_URL = `${VENDOR_BASE_URL}google_signin_signup_vendor/`;

// CATEGORY URLS
export const CATEGORIES = `${API_URL}categories/`;
export const SUBCATEGORIES = `${API_URL}get_category_by_shop/`;
export const ALL_SUBCATEGORIES = `${API_URL}sub-categories/`;

// ANIMAL URLS
export const GET_ANIMALS = `${API_URL}get_all_animal_species_for_product_search/`;

// BRAND URLS
export const GET_BRANDS = `${API_URL}brands/`;

// PRODUCT URLS
export const PRODUCTS = `${API_URL}products/`;
export const PRODUCTS_IMPORT = `${API_URL}products/import-csv/`;
export const PRODUCT_TAGS = `${API_URL}product_tags/`;

// PROMOTION URLS
export const PROMOTIONS = `${API_URL}promotions/`;
export const REMOVE_PROMOTION_FILE = `${API_URL}remove_promotion_file/`;

//ORDERS URLS
export const ORDERS_URL = `${API_URL}orders/vendor-orders/`;

//SHOP URLS
export const SHOP_REVENUE_URL = `${VENDOR_BASE_URL}shops/revenue/`;

// OTHERS
export const INSTAGRAM_BASE_URL = "https://www.instagram.com/";
export const FACEBOOK_BASE_URL = "https://www.facebook.com/";

// ADMIN URLS
export const GET_PENDING_SHOPS = `${VENDOR_BASE_URL}requests/`;
export const GET_SUPPORT_REQUESTS = `${VENDOR_BASE_URL}customer-support/`;
export const ANSWER_SUPPORT_REQUESTS = `${VENDOR_BASE_URL}customer-support/answer/`;
export const APPROVE_SHOPS = `${VENDOR_BASE_URL}approve_vendor_registration/`;
export const REJECT_SHOPS = `${VENDOR_BASE_URL}reject_vendor_registration/`;
export const ACCEPT_SHOP_APPROVAL = `${VENDOR_BASE_URL}account-access-link/`;
export const GET_PENDING_DRIVERS = `${API_URL}requests/`;
export const REJECT_DRIVER_URL = `${API_URL}reject-driver-registration/`;
export const APPROVE_DRIVER_URL = `${API_URL}approve-driver-registration/`;

// OPEN TELEMETRY URLS
export const SENTRY_DSN = process.env.SENTRY_DNS!;
export const SENTRY_AUTH_TOKEN = process.env.SENTRY_AUTH_TOKEN!;

// GOOGLE MAPS URLS
export const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!;
export const GOOGLE_MAPS_BASE_URL = "https://maps.googleapis.com/";
export const GOOGLE_MAPS_API_URL = `${GOOGLE_MAPS_BASE_URL}maps/api/`;
export const GOOGLE_MAPS_GEOCODE_URL = `${GOOGLE_MAPS_API_URL}geocode/json`;
export const GOOGLE_MAPS_AUTOCOMPLETE_URL = `${GOOGLE_MAPS_API_URL}place/autocomplete/json`;

// USER LOCATION URL
export const USER_LOCATION_URL = "https://ipapi.co/json/";
