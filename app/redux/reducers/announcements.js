export function announcementsHasErrored(state = false, action) {
    switch(action.type) {
        case 'ANNOUNCEMENTS_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    };
};

export function announcementsIsLoading(state = false, action) {
    switch(action.type) {
        case 'ANNOUNCEMENTS_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    };
};

export function announcements(state = [], action) {
    switch(action.type) {
        case 'ANNOUNCEMENTS_FETCH_DATA_SUCCESS':
            return action.announcements;
        default:
            return state;
    };
};