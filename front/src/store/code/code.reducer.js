export const SET_CODEBLOCKS = "SET_CODEBLOCKS"
export const ADD_CODEBLOCK = "ADD_CODEBLOCK"
export const UPDATE_CODEBLOCK = "UPDATE_CODEBLOCK"
export const REMOVE_CODEBLOCK = "REMOVE_CODEBLOCK"
export const SET_FILTER_BY = "SET_FILTER_BY"

const initialState = {
    codeBlocks:[], 
    filterBy: {
        title: '',
    }
}

export function codeReducer(state = initialState, action) {
    let codeBlocks
    switch (action.type) {
        case SET_CODEBLOCKS:
            return {...state, codeBlocks: action.codeBlocks}
        case ADD_CODEBLOCK:
            return {...state, codeBlocks: [...state.codeBlocks, action.codeBlock]}
        case UPDATE_CODEBLOCK:
            codeBlocks = state.codeBlocks.map(codeBlock => 
                (codeBlock._id === action.codeBlock._id) ? action.codeBlock : codeBlock)
            return {...state, codeBlocks}       
        case REMOVE_CODEBLOCK:
            codeBlocks = state.codeBlocks.filter(codeBlock => codeBlock._id !== action.codeBlockId)
            return {...state, codeBlocks}
        case SET_FILTER_BY:
            return {...state, filterBy: action.filterBy}
        default:
            return state
    }
}