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

// src/domain/enterprise/entities/value-objects/period-type.ts
var period_type_exports = {};
__export(period_type_exports, {
  WorkspaceValue: () => WorkspaceValue
});
module.exports = __toCommonJS(period_type_exports);
var WorkspaceValue = class _WorkspaceValue {
  constructor(props) {
    this.value = props;
  }
  toValue() {
    return this.value;
  }
  toString() {
    return `R$ ${this.value.value} por ${this.value.period_type}`;
  }
  static create(props) {
    const workspaceValue = new _WorkspaceValue(props);
    return workspaceValue;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WorkspaceValue
});
