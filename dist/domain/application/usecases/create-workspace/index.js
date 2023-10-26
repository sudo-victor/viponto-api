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

// src/domain/application/usecases/create-workspace/index.ts
var create_workspace_exports = {};
__export(create_workspace_exports, {
  CreateWorkspaceUseCase: () => CreateWorkspaceUseCase
});
module.exports = __toCommonJS(create_workspace_exports);

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

// src/domain/enterprise/entities/value-objects/slug.ts
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

// src/domain/enterprise/entities/workspace.ts
var Workspace = class _Workspace extends Entity {
  get name() {
    return this.props.name;
  }
  get description() {
    return this.props.description;
  }
  get slug() {
    return this.props.slug;
  }
  get value() {
    return this.props.value;
  }
  get companyId() {
    return this.props.company_id;
  }
  static create(props, id) {
    const workspace = new _Workspace({
      ...props,
      slug: props.slug ?? Slug.createFromText(props?.name ?? "teste"),
      created_at: props.created_at ?? /* @__PURE__ */ new Date()
    }, id);
    return workspace;
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

// src/core/errors/resource-already-exists-error.ts
var ResourceAlreadyExistsError = class extends Error {
  constructor() {
    super("Resource already exists");
  }
};

// src/domain/enterprise/entities/value-objects/period-type.ts
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

// src/domain/application/usecases/create-workspace/index.ts
var CreateWorkspaceUseCase = class {
  constructor(workspaceRepository, companyRepository) {
    this.workspaceRepository = workspaceRepository;
    this.companyRepository = companyRepository;
  }
  async execute({
    name,
    description,
    companyId,
    userId,
    periodType,
    value
  }) {
    const company = await this.companyRepository.findById(companyId);
    if (!company) {
      return left(new ResourceNotFoundError());
    }
    if (company.managerId.toString !== userId) {
      return left(new NotAllowedError());
    }
    const workspace = Workspace.create({
      name,
      description,
      value: WorkspaceValue.create({ period_type: periodType, value }),
      company_id: new UniqueId(companyId)
    });
    const workspaceAlreadyExists = await this.workspaceRepository.findBySlug(workspace.slug.value);
    if (workspaceAlreadyExists) {
      return left(new ResourceAlreadyExistsError());
    }
    await this.workspaceRepository.create(workspace);
    return right({
      workspace
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateWorkspaceUseCase
});
