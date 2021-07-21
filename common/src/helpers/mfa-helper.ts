import qrcode from "qrcode";
import {authenticator} from "otplib";
const generateOTPToken = (username:string, serviceName:string, secret:string) => {
  return authenticator.keyuri(username, serviceName, secret);
};
const generateQRCode = async (otpAuth:string) => {
  try {
    const qrCode = await qrcode.toDataURL(otpAuth);
    return qrCode;
  } catch (error) {
    throw error;
  }
};

const generateSecretUser = () => {
  return authenticator.generateSecret();
};
const verifyOTPToken = (token:string, secret:string) => {
  return authenticator.verify({ token, secret });
};
export { generateOTPToken, generateQRCode, generateSecretUser, verifyOTPToken };
