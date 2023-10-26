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

// src/domain/application/usecases/create-company/index.ts
var create_company_exports = {};
__export(create_company_exports, {
  CreateCompanyUseCase: () => CreateCompanyUseCase
});
module.exports = __toCommonJS(create_company_exports);

// src/core/entities/value-objects/unique-id.ts
var import_node_crypto = require("crypto");
var UniqueId = class {
  get toString() {
    return this._value;
  }
  get toValue() {
    return this._value;
  }
  constructor(value) {
    this._value = value ?? (0, import_node_crypto.randomUUID)();
  }
};

// src/core/entities/entity.ts
var Entity = class {
  get id() {
    return this._id;
  }
  constructor(props, id) {
    this._id = id ?? new UniqueId(id);
    this.props = props;
  }
};

// src/domain/enterprise/entities/company.ts
var Company = class _Company extends Entity {
  get name() {
    return this.props.name;
  }
  set name(value) {
    this.props.name = value;
  }
  get managerId() {
    return this.props.manager_id;
  }
  static create(props, id) {
    const company = new _Company(props, id);
    return company;
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

// src/core/errors/not-allowed-error.ts
var NotAllowedError = class extends Error {
  constructor() {
    super("Not allowed");
  }
};

// src/domain/application/usecases/create-company/index.ts
var CreateCompanyUseCase = class {
  constructor(companyRepository, managerRepository) {
    this.companyRepository = companyRepository;
    this.managerRepository = managerRepository;
  }
  async execute({
    name,
    managerId
  }) {
    const manager = await this.managerRepository.findById(managerId);
    if (!manager) {
      return left(new NotAllowedError());
    }
    const company = Company.create({
      name,
      manager_id: new UniqueId(managerId)
    });
    await this.companyRepository.create(company);
    return right({
      company
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateCompanyUseCase
});
