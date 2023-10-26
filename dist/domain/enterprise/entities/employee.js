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

// src/domain/enterprise/entities/employee.ts
var employee_exports = {};
__export(employee_exports, {
  Employee: () => Employee
});
module.exports = __toCommonJS(employee_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Employee
});
