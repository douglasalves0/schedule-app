require('dotenv').config()

export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
export const googleClientId = process.env.GOOGLE_CLIENT_ID;
export const googleRedirectURL = process.env.GOOGLE_REDIRECT_URL;

export const moorseUrl = process.env.MOORSE_URL;
export const moorseToken = process.env.MOORSE_TOKEN;
export const moorseIntegration = process.env.MOORSE_INTEGRATION;
export const applicationPort = process.env.APPLICATION_PORT;