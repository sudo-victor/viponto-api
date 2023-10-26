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

// src/domain/application/usecases/register-time-track/index.ts
var register_time_track_exports = {};
__export(register_time_track_exports, {
  RegisterTimeTrackUseCase: () => RegisterTimeTrackUseCase
});
module.exports = __toCommonJS(register_time_track_exports);

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

// src/domain/application/usecases/register-time-track/index.ts
var RegisterTimeTrackUseCase = class {
  constructor(timeTrackRepository) {
    this.timeTrackRepository = timeTrackRepository;
  }
  async execute({
    ownerId,
    workspaceId,
    description
  }) {
    const timeTrackAlreadyExists = await this.timeTrackRepository.findByOwnerAndTime({
      ownerId,
      time: /* @__PURE__ */ new Date()
    });
    if (timeTrackAlreadyExists) {
      return left(new ResourceAlreadyExistsError());
    }
    const timeTrack = TimeTrack.create({
      owner_id: new UniqueId(ownerId),
      workspace_id: new UniqueId(workspaceId),
      description
    });
    await this.timeTrackRepository.create(timeTrack);
    return right({ timeTrack });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RegisterTimeTrackUseCase
});
