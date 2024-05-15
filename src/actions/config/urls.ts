import { loadEnvConfig } from '@next/env'

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const BASE_URL = process.env.BASE_URL!;

const VENDOR_BASE_URL = `${BASE_URL}vendors/`

export const SIGNUP_URL = `${VENDOR_BASE_URL}register/`;

export const SETUP_URL = `${VENDOR_BASE_URL}update_profile/`;

export const PHONE_SIGNIN_URL = `${VENDOR_BASE_URL}login-with-phonenumber/`;

export const EMAIL_SIGNIN_URL = `${VENDOR_BASE_URL}login-with-email/`;

export const VERIFY_PHONE = `${VENDOR_BASE_URL}verify-phonenumber/`;

export const RESEND_OTP = `${VENDOR_BASE_URL}resendOtp/`;

export const CONFIRM_PHONE = `${VENDOR_BASE_URL}confirm_phonenumber_login/`;

export const VERIFY_EMAIL = `${VENDOR_BASE_URL}verify-email/`;

export const CREATE_PASSWORD = `${VENDOR_BASE_URL}set-password/`;