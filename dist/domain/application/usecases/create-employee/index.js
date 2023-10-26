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

// src/domain/application/usecases/create-employee/index.ts
var create_employee_exports = {};
__export(create_employee_exports, {
  CreateEmployeeUseCase: () => CreateEmployeeUseCase
});
module.exports = __toCommonJS(create_employee_exports);

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

// src/domain/enterprise/entities/employee.ts
var Employee = class _Employee extends Entity {
  get name() {
    return this.props.name;
  }
  get code() {
    return this.props.code;
  }
  get companyId() {
    return this.props.company_id;
  }
  static create(props, id) {
    const employee = new _Employee({
      ...props,
      created_at: props.created_at ?? /* @__PURE__ */ new Date()
    });
    return employee;
  }
};

// src/domain/enterprise/entities/value-objects/code.ts
var Code = class {
  toString() {
    return this._value;
  }
  toValue() {
    return this._value;
  }
  constructor(value) {
    this._value = value.trim().replace(/\s/g, " ").replace(/\s/g, "_");
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

// src/core/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource not found");
  }
};

// src/core/errors/not-allowed-error.ts
var NotAllowedError = class extends Error {
  constructor() {
    super("Not allowed");
  }
};

// src/domain/application/usecases/create-employee/index.ts
var CreateEmployeeUseCase = class {
  constructor(employeeRepository, companyRepository, hasher) {
    this.employeeRepository = employeeRepository;
    this.companyRepository = companyRepository;
    this.hasher = hasher;
  }
  async execute({
    name,
    password,
    companyId,
    managerId
  }) {
    const company = await this.companyRepository.findById(companyId);
    if (!company) {
      return left(new ResourceNotFoundError());
    }
    if (company.managerId.toString !== managerId) {
      return left(new NotAllowedError());
    }
    const hashedPassword = await this.hasher.hash(password);
    const employee = Employee.create({
      name,
      code: new Code(name),
      company_id: new UniqueId(companyId),
      password_hash: hashedPassword
    });
    await this.employeeRepository.create(employee);
    return right({
      employee
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateEmployeeUseCase
});
