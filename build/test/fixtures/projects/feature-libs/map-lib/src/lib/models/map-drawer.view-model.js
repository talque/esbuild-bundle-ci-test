"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMapDrawerViewModel = void 0;
const room_lib_1 = require("@repo/room-lib");
const vendor_lib_1 = require("@repo/vendor-lib");
const floor_switcher_view_model_1 = require("../controls/floor-switcher/floor-switcher.view-model");
const sidebar_header_view_model_1 = require("./sidebar-header.view-model");
const map_data_lib_1 = require("map-data-lib");
function makeMapDrawerViewModel(orgMapLayerId, isOpen, activeMapEntity, org, floors, isFavorite) {
    const vendorIdWithRole = (activeMapEntity instanceof vendor_lib_1.VendorProjection)
        ? (0, map_data_lib_1.makeVendorIdWithRole)(isOpen, activeMapEntity)
        : undefined;
    const vendor = vendorIdWithRole
        ? { vendorIdWithRole, isFavorite: !!isFavorite }
        : undefined;
    return {
        orgMapLayerId: orgMapLayerId,
        isOpen: isOpen,
        overviewMap: makeOverviewMap(orgMapLayerId, org),
        vendor: vendor,
        room: (activeMapEntity instanceof room_lib_1.OrgRoomModel)
            ? activeMapEntity.orgRoomId
            : undefined,
        floorSwitcher: (0, floor_switcher_view_model_1.makeFloorSwitcherViewModel)(floors, orgMapLayerId),
        header: makeHeader(orgMapLayerId, activeMapEntity, isFavorite),
    };
}
exports.makeMapDrawerViewModel = makeMapDrawerViewModel;
function makeHeader(orgMapLayerId, activeMapEntity, isFavorite) {
    if (activeMapEntity instanceof vendor_lib_1.VendorProjection)
        return (0, sidebar_header_view_model_1.makeVendorSideBarHeaderViewModel)(orgMapLayerId, activeMapEntity, isFavorite);
    if (activeMapEntity instanceof room_lib_1.OrgRoomModel)
        return (0, sidebar_header_view_model_1.makeRoomSideBarHeaderViewModel)(orgMapLayerId, activeMapEntity);
    return undefined;
}
function makeOverviewMap(orgMapLayerId, org) {
    if (!org)
        return undefined;
    if (org.mapConfig.initialLayerId === orgMapLayerId)
        return undefined; // we are currently looking at the overview map
    return org.mapConfig.initialLayerId;
}
