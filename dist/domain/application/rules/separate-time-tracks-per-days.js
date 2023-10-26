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

// src/domain/application/rules/separate-time-tracks-per-days.ts
var separate_time_tracks_per_days_exports = {};
__export(separate_time_tracks_per_days_exports, {
  separateTimeTracksPerDays: () => separateTimeTracksPerDays
});
module.exports = __toCommonJS(separate_time_tracks_per_days_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  separateTimeTracksPerDays
});
