/* eslint-disable no-param-reassign */
import Crypto from "crypto";

const { SECRET_KEY, SECRET_IV } = process.env;

const encryptionMethod = "aes-256-gcm";
const KEY = Crypto.createHash("sha512")
  .update(SECRET_KEY, "utf-8")
  .digest("hex")
  .substring(0, 32);
const IV = Crypto.createHash("sha512")
  .update(SECRET_IV, "utf-8")
  .digest("hex")
  .substring(0, 16);

const Encrypt = (text) => {
  const encryptor = Crypto.createCipheriv(encryptionMethod, KEY, IV);
  const Encrypted =
    encryptor.update(text, "utf8", "base64") + encryptor.final("base64");
  return Buffer.from(Encrypted).toString("base64");
};

const Decrypt = (encryptedData) => {
  const buff = Buffer.from(encryptedData, "base64");
  encryptedData = buff.toString("utf-8");
  const decryptor = Crypto.createDecipheriv(encryptionMethod, KEY, IV);
  return (
    decryptor.update(encryptedData, "base64", "utf8") + decryptor.final("utf8")
  );
};

export { Encrypt, Decrypt };
