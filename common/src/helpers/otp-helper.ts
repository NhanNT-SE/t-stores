import qrcode from "qrcode";
import { authenticator } from "otplib";
import { ISecretEncrypt } from "../interfaces";
const crypto = require("crypto");
const algorithm = "aes-256-ctr";
const iv = crypto.randomBytes(16);
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

const encryptSecretOTP = (
  secretKey: string,
  otpVersion: number
): ISecretEncrypt => {
  const secretOTP = JSON.stringify({
    secretMFA: authenticator.generateSecret(),
    otpVersion,
  });
  const key_in_bytes = crypto
    .createHash("sha256")
    .update(String(secretKey))
    .digest("base64")
    .substr(0, 32);
  const cipher = crypto.createCipheriv(algorithm, key_in_bytes, iv);
  const encrypted = Buffer.concat([cipher.update(secretOTP), cipher.final()]);
  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};
const decryptSecretOTP = (hash: any, secretKey: string) => {
  const key_in_bytes = crypto
    .createHash("sha256")
    .update(String(secretKey))
    .digest("base64")
    .substr(0, 32);
  const decipher = crypto.createDecipheriv(
    algorithm,
    key_in_bytes,
    Buffer.from(hash.iv, "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);
  return decrpyted;
};
const verifyOTPToken = (token: string, secret: string) => {
  return authenticator.verify({ token, secret });
};
export const OTPHelper = {
  generateQRCode,
  encryptSecretOTP,
  decryptSecretOTP,
  verifyOTPToken,
};
