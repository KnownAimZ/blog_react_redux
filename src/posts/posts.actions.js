import {
    SETPOSITION,
    CLEARPOSTS,
    CLEARSELECTEDPOST,
    REORDERPOSTS
} from './posts.actiontypes.js';

export const setPosition = position => {
    return {
        type: SETPOSITION,
        payload: position
    };
}

export const clearPosts = () => {
    return {
        type: CLEARPOSTS
    };    
};

export const clearSelectedPost = () => {
    return {
        type: CLEARSELECTEDPOST
    };
}

export const reorderPosts = orderedList => {
    return {
        type: REORDERPOSTS,
        payload: orderedList,
    }
};
