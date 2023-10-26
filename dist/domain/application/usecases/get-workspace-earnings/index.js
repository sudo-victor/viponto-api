"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/domain/application/usecases/get-workspace-earnings/index.ts
var get_workspace_earnings_exports = {};
__export(get_workspace_earnings_exports, {
  GetWorkspaceEarnings: () => GetWorkspaceEarnings
});
module.exports = __toCommonJS(get_workspace_earnings_exports);

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

// src/domain/application/rules/accumulate-time-diff-in-hours.ts
var import_dayjs = __toESM(require("dayjs"));
function accumulateTimeDifferencesInHours(timeTracks) {
  let totalHours = 0;
  for (let i = 0; i < timeTracks.length - 1; i += 2) {
    const registeredAt1 = (0, import_dayjs.default)(timeTracks[i].registeredAt);
    const registeredAt2 = (0, import_dayjs.default)(timeTracks[i + 1].registeredAt);
    const timeDifferenceInHours = registeredAt2.diff(registeredAt1, "hour", true);
    totalHours += timeDifferenceInHours;
  }
  return totalHours;
}

// src/domain/application/usecases/get-workspace-earnings/index.ts
var GetWorkspaceEarnings = class {
  constructor(workspaceRepository, timeTracksRepository) {
    this.workspaceRepository = workspaceRepository;
    this.timeTracksRepository = timeTracksRepository;
  }
  async execute({
    workspaceId,
    userId,
    startRange,
    endRange
  }) {
    const workspace = await this.workspaceRepository.findById(workspaceId);
    if (!workspace) {
      return left(new ResourceNotFoundError());
    }
    const timeTracks = await this.timeTracksRepository.findManyByOwnerAndWorkspace({
      ownerId: userId,
      workspaceId,
      range: {
        start: startRange,
        end: endRange
      }
    });
    const { period_type: periodType, value } = workspace.value.toValue();
    const accumulateTime = accumulateTimeDifferencesInHours(timeTracks);
    const total = accumulateTime * value;
    return right({
      periodType,
      value,
      accumulateTime,
      total
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetWorkspaceEarnings
});
