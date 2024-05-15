import { loadEnvConfig } from '@next/env'

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const BASE_URL = process.env.BASE_URL!;

export const SIGNUP_URL = `${BASE_URL}vendors/register/`;

export const PHONE_SIGNIN_URL = `${BASE_URL}vendors/login-with-phonenumber/`;

export const EMAIL_SIGNIN_URL = `${BASE_URL}vendors/login-with-email/`;