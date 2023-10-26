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

// src/domain/application/usecases/fetch-time-tracks-by-date/index.ts
var fetch_time_tracks_by_date_exports = {};
__export(fetch_time_tracks_by_date_exports, {
  FetchTimeTracksByDateUseCase: () => FetchTimeTracksByDateUseCase
});
module.exports = __toCommonJS(fetch_time_tracks_by_date_exports);

// src/core/either.ts
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
var right = (value) => {
  return new Right(value);
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

// src/domain/application/usecases/fetch-time-tracks-by-date/index.ts
var FetchTimeTracksByDateUseCase = class {
  constructor(timeTrackRepository) {
    this.timeTrackRepository = timeTrackRepository;
  }
  async execute({
    userId,
    workspaceId,
    date
  }) {
    const timeTracks = await this.timeTrackRepository.findManyByDate({
      ownerId: userId,
      workspaceId,
      date
    });
    return right({
      timeTracks,
      hours: accumulateTimeDifferencesInHours(timeTracks)
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FetchTimeTracksByDateUseCase
});
