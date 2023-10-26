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

// src/domain/application/usecases/update-time-track/index.ts
var update_time_track_exports = {};
__export(update_time_track_exports, {
  RegisterTimeTrackUseCase: () => RegisterTimeTrackUseCase
});
module.exports = __toCommonJS(update_time_track_exports);

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

// src/core/errors/time-update-to-future-date-error.ts
var TimeUpdateToFutureDateError = class extends Error {
  constructor() {
    super("Not allowed to update time to future date");
  }
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

// src/core/errors/date-conflict-error.ts
var DateConflictError = class extends Error {
  constructor() {
    super("Date conflict");
  }
};

// src/domain/application/usecases/update-time-track/index.ts
var RegisterTimeTrackUseCase = class {
  constructor(timeTrackRepository) {
    this.timeTrackRepository = timeTrackRepository;
  }
  async execute({
    timeTrackId,
    userId,
    registeredAt,
    description
  }) {
    if (new Date(registeredAt) > /* @__PURE__ */ new Date()) {
      return left(new TimeUpdateToFutureDateError());
    }
    const timeTrack = await this.timeTrackRepository.findById(timeTrackId);
    if (!timeTrack) {
      return left(new ResourceNotFoundError());
    }
    if (timeTrack.ownerId.toString !== userId) {
      return left(new NotAllowedError());
    }
    const timeTrackAlreadyExists = await this.timeTrackRepository.findByOwnerAndTime({
      ownerId: userId,
      time: new Date(registeredAt)
    });
    if (timeTrackAlreadyExists) {
      return left(new DateConflictError());
    }
    timeTrack.registeredAt = new Date(registeredAt);
    timeTrack.description = description;
    return right({ timeTrack });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RegisterTimeTrackUseCase
});
