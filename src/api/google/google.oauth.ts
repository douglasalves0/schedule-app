import { google } from "googleapis";
import { clientId, clientSecret, redirectURL } from "src/config/configs";

export const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectURL
);

export const scope = [
  'https://www.googleapis.com/auth/calendar'
];

export const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scope
}) + "&state=";