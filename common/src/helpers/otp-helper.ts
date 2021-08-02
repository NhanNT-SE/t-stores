import qrcode from "qrcode";
import { authenticator } from "otplib";

const generateQRCode = async (
  username: string,
  serviceName: string,
  secret: string
) => {
  try {
    const otpAuth = authenticator.keyuri(username, serviceName, secret);
    const qrCode = await qrcode.toDataURL(otpAuth);
    return qrCode;
  } catch (error) {
    throw error;
  }
};

const generateSecretOTP = () => {
  return authenticator.generateSecret();
};
const verifyOTPToken = (token: string, secret: string) => {
  return authenticator.verify({ token, secret });
};
export { generateQRCode, generateSecretOTP, verifyOTPToken };
export const OTPHelper = {
  generateQRCode,
  generateSecretOTP,
  verifyOTPToken
}