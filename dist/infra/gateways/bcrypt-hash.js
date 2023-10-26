"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/infra/gateways/bcrypt-hash.ts
var bcrypt_hash_exports = {};
__export(bcrypt_hash_exports, {
  BcryptHasher: () => BcryptHasher
});
module.exports = __toCommonJS(bcrypt_hash_exports);
var import_bcryptjs = require("bcryptjs");
var BcryptHasher = class {
  async hash(plain) {
    return await (0, import_bcryptjs.hash)(plain, 6);
  }
  async compare(plain, hash2) {
    return await (0, import_bcryptjs.compare)(plain, hash2);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BcryptHasher
});
