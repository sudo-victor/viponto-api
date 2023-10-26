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

// src/domain/application/usecases/create-manager/index.ts
var create_manager_exports = {};
__export(create_manager_exports, {
  CreateManagerUseCase: () => CreateManagerUseCase
});
module.exports = __toCommonJS(create_manager_exports);

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

// src/domain/enterprise/entities/manager.ts
var Manager = class _Manager extends Entity {
  get name() {
    return this.props.name;
  }
  get email() {
    return this.props.email;
  }
  get password() {
    return this.props.password_hash;
  }
  static create(props, id) {
    const manager = new _Manager({
      ...props,
      created_at: props.created_at ?? /* @__PURE__ */ new Date()
    }, id);
    return manager;
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

// src/core/errors/resource-already-exists-error.ts
var ResourceAlreadyExistsError = class extends Error {
  constructor() {
    super("Resource already exists");
  }
};

// src/domain/application/usecases/create-manager/index.ts
var CreateManagerUseCase = class {
  constructor(managerRepository, hasher) {
    this.managerRepository = managerRepository;
    this.hasher = hasher;
  }
  async execute({
    name,
    email,
    password
  }) {
    const managerAlreadyExists = await this.managerRepository.findByEmail(email);
    if (managerAlreadyExists) {
      return left(new ResourceAlreadyExistsError());
    }
    const hashedPassword = await this.hasher.hash(password);
    const manager = Manager.create({ name, email, password_hash: hashedPassword });
    await this.managerRepository.create(manager);
    return right({
      manager
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateManagerUseCase
});
