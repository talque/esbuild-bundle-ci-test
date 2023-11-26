

export const MapDrawerCloseButtonEventType = 'close-drawer' as const;
export const MapDrawerFavoriteEventType = 'favorite' as const;

export interface MapDrawerCloseButtonEventModel {
    readonly eventType: typeof MapDrawerCloseButtonEventType;
}

export interface MapDrawerFavoriteEventModel {
    readonly eventType: typeof MapDrawerFavoriteEventType;
    readonly isFavorite: boolean;
}
