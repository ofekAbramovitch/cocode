export const SET_ALERT_INFO = 'SET_ALERT_INFO'

const initialState = {
    alertInfo: { show: false, severity: '', msg: '' }
}

export function systemReducer(state = initialState, action = {}) {
    var newState = state
    switch (action.type) {
        case SET_ALERT_INFO:
            newState = { ...state, alertInfo: { ...action.alertInfo } }
            break
        default: return state
    }

    return newState
}
