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

// src/domain/application/usecases/fetch-time-tracks-per-day/index.ts
var fetch_time_tracks_per_day_exports = {};
__export(fetch_time_tracks_per_day_exports, {
  FetchTimeTracksPerDayUseCase: () => FetchTimeTracksPerDayUseCase
});
module.exports = __toCommonJS(fetch_time_tracks_per_day_exports);
var import_dayjs2 = __toESM(require("dayjs"));

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

// src/domain/application/rules/separate-time-tracks-per-days.ts
var import_dayjs = __toESM(require("dayjs"));
function separateTimeTracksPerDays(timeTracks) {
  return timeTracks.reduce((result, timeTrack) => {
    const currentDate = (0, import_dayjs.default)(timeTrack.registeredAt).second(0).format("YYYY-MM-DD");
    if (!result[currentDate]) {
      result[currentDate] = [timeTrack];
    } else {
      result[currentDate].push(timeTrack);
    }
    return result;
  }, {});
}

// src/domain/application/usecases/fetch-time-tracks-per-day/index.ts
var FetchTimeTracksPerDayUseCase = class {
  constructor(timeTrackRepository) {
    this.timeTrackRepository = timeTrackRepository;
  }
  async execute({
    userId,
    workspaceId,
    startRange,
    endRange
  }) {
    const timeTracks = await this.timeTrackRepository.findManyByOwnerAndWorkspace({
      ownerId: userId,
      workspaceId,
      range: {
        start: startRange ?? /* @__PURE__ */ new Date(),
        end: endRange ?? (0, import_dayjs2.default)(/* @__PURE__ */ new Date()).subtract(4, "days").toDate()
      }
    });
    return right({
      timeTracks: separateTimeTracksPerDays(timeTracks)
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FetchTimeTracksPerDayUseCase
});
