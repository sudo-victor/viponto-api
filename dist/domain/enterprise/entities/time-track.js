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

// src/domain/enterprise/entities/time-track.ts
var time_track_exports = {};
__export(time_track_exports, {
  TimeTrack: () => TimeTrack
});
module.exports = __toCommonJS(time_track_exports);

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

// src/domain/enterprise/entities/time-track.ts
var TimeTrack = class _TimeTrack extends Entity {
  get workspaceId() {
    return this.props.workspace_id;
  }
  get description() {
    return this.props.description ?? "";
  }
  set description(value) {
    this.props.description = value;
  }
  get ownerId() {
    return this.props.owner_id;
  }
  get registeredAt() {
    return this.props.registered_at;
  }
  set registeredAt(value) {
    this.props.registered_at = value;
  }
  static create(props, id) {
    const timetrack = new _TimeTrack({
      ...props,
      registered_at: props.registered_at ?? (/* @__PURE__ */ new Date()).getTime()
    }, id);
    return timetrack;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TimeTrack
});
