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

// src/domain/application/usecases/fetch-companies-by-manager/index.ts
var fetch_companies_by_manager_exports = {};
__export(fetch_companies_by_manager_exports, {
  FetchCompaniesByManagerUseCase: () => FetchCompaniesByManagerUseCase
});
module.exports = __toCommonJS(fetch_companies_by_manager_exports);

// src/core/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource not found");
  }
};

// src/core/either.ts
var Left = class {
  constructor(value) {
    this.value = value;
  }
  isRight() {
    return false;
  }
  isLeft() {
    return true;
  }
};
var Right = class {
  constructor(value) {
    this.value = value;
  }
  isRight() {
    return true;
  }
  isLeft() {
    return false;
  }
};
var left = (value) => {
  return new Left(value);
};
var right = (value) => {
  return new Right(value);
};

// src/domain/application/usecases/fetch-companies-by-manager/index.ts
var FetchCompaniesByManagerUseCase = class {
  constructor(managerRepository, companyRepository) {
    this.managerRepository = managerRepository;
    this.companyRepository = companyRepository;
  }
  async execute({ managerId }) {
    const manager = await this.managerRepository.findById(managerId);
    if (!manager) {
      return left(new ResourceNotFoundError());
    }
    const companies = await this.companyRepository.findManyByManagerId(managerId);
    return right({
      companies
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FetchCompaniesByManagerUseCase
});
