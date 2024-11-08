import sha256 from "crypto-js/sha256";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

export const hashCode = (codeClient,codeApi,timeless) => {
    const hashDigest = sha256(codeClient,codeApi,timeless);
    return  Base64.stringify(hashDigest);
}
