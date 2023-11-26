"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRoomSideBarHeaderViewModel = exports.makeVendorSideBarHeaderViewModel = void 0;
const sidebar_header_event_model_1 = require("./sidebar-header.event-model");
const map_data_lib_1 = require("map-data-lib");
function makeVendorSideBarHeaderViewModel(orgMapLayerId, vendor, isFavorite) {
    return {
        orgMapLayerId: orgMapLayerId,
        title: vendor.name,
        detail: {
            eventType: sidebar_header_event_model_1.SidebarHeaderGoToVendorDetailEventType,
            vendorIdWithRole: (0, map_data_lib_1.makeVendorIdWithRole)(true, vendor),
            isFavorite: !!isFavorite
        },
    };
}
exports.makeVendorSideBarHeaderViewModel = makeVendorSideBarHeaderViewModel;
function makeRoomSideBarHeaderViewModel(orgMapLayerId, room) {
    return {
        orgMapLayerId: orgMapLayerId,
        title: room.name,
        detail: {
            eventType: sidebar_header_event_model_1.SidebarHeaderGoToLectureDetailEventType,
            orgRoomIdentifier: room.orgRoomId,
        }
    };
}
exports.makeRoomSideBarHeaderViewModel = makeRoomSideBarHeaderViewModel;
