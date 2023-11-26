"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMapBottomSheetViewModel = void 0;
const room_lib_1 = require("@repo/room-lib");
const vendor_lib_1 = require("@repo/vendor-lib");
const common_lib_1 = require("common-lib");
const floor_switcher_view_model_1 = require("../controls/floor-switcher/floor-switcher.view-model");
const sidebar_header_view_model_1 = require("./sidebar-header.view-model");
const map_data_lib_1 = require("map-data-lib");
/**
 * Build the view model for the bottom sheet
 */
function makeMapBottomSheetViewModel(orgMapLayerId, isOpen, activeMapEntity, isExpanded, org, floors, features, isFavorite) {
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
        title: activeMapEntity?.name || '',
        logo: (activeMapEntity instanceof vendor_lib_1.VendorProjection)
            ? activeMapEntity?.photo
            : undefined,
        vendor: vendor,
        room: (activeMapEntity instanceof room_lib_1.OrgRoomModel)
            ? activeMapEntity.orgRoomId
            : undefined,
        floorSwitcher: (0, floor_switcher_view_model_1.makeFloorSwitcherViewModel)(floors, orgMapLayerId),
        isExpanded: isExpanded,
        feature: features[0],
        header: makeHeader(orgMapLayerId, activeMapEntity, isFavorite),
    };
}
exports.makeMapBottomSheetViewModel = makeMapBottomSheetViewModel;
function makeHeader(orgMapLayerId, activeMapEntity, isFavorite) {
    if (!activeMapEntity)
        return undefined;
    else if (activeMapEntity instanceof vendor_lib_1.VendorProjection)
        return (0, sidebar_header_view_model_1.makeVendorSideBarHeaderViewModel)(orgMapLayerId, activeMapEntity, isFavorite);
    else if (activeMapEntity instanceof room_lib_1.OrgRoomModel)
        return (0, sidebar_header_view_model_1.makeRoomSideBarHeaderViewModel)(orgMapLayerId, activeMapEntity);
    else
        throw new common_lib_1.UnreachableCaseError(activeMapEntity);
}
function makeOverviewMap(orgMapLayerId, org) {
    if (!org)
        return undefined;
    if (org.mapConfig.initialLayerId === orgMapLayerId)
        return undefined; // we are currently looking at the overview map
    return org.mapConfig.initialLayerId;
}
