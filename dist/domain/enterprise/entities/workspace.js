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

// src/domain/enterprise/entities/workspace.ts
var workspace_exports = {};
__export(workspace_exports, {
  Workspace: () => Workspace
});
module.exports = __toCommonJS(workspace_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Workspace
});
