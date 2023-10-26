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

// src/domain/enterprise/entities/value-objects/slug.ts
var slug_exports = {};
__export(slug_exports, {
  Slug: () => Slug
});
module.exports = __toCommonJS(slug_exports);
var Slug = class _Slug {
  constructor(value) {
    this.value = value;
  }
  static create(slug) {
    return new _Slug(slug);
  }
  /**
   * Receives a string and normalize it as a slug
   *
   * Example: "An example title" => "an-example-title"
   *
   * @param text
   */
  static createFromText(text) {
    const slugText = text.normalize("NFKD").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/_/g, "-").replace(/--+/g, "-").replace(/-$/g, "");
    return new _Slug(slugText);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Slug
});
