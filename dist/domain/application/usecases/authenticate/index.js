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

// src/domain/application/usecases/authenticate/index.ts
var authenticate_exports = {};
__export(authenticate_exports, {
  AuthenticateUseCase: () => AuthenticateUseCase
});
module.exports = __toCommonJS(authenticate_exports);

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

// src/core/errors/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("Invalid credentials");
  }
};

// src/domain/application/usecases/authenticate/index.ts
var AuthenticateUseCase = class {
  constructor(managerRepository, encrypter, hasher) {
    this.managerRepository = managerRepository;
    this.encrypter = encrypter;
    this.hasher = hasher;
  }
  async execute({
    email,
    password
  }) {
    const manager = await this.managerRepository.findByEmail(email);
    if (!manager) {
      return left(new InvalidCredentialsError());
    }
    const doesPasswordIsValid = await this.hasher.compare(password, manager.password);
    if (!doesPasswordIsValid) {
      return left(new InvalidCredentialsError());
    }
    const token = this.encrypter.encrypt({ id: manager.id.toString });
    return right({
      token,
      manager
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthenticateUseCase
});
