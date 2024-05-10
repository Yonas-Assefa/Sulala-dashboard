import { loadEnvConfig } from '@next/env'

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const BASE_URL = process.env.BASE_URL!;
export const SIGNUP_URL = `${BASE_URL}vendors/register/`;