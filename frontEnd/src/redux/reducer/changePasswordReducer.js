import {
    CHANGE_PASSWORD_BEGIN,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
} from '../action/changePasswordAction'

const initialState = {
    loading: null,
    info: null
}

export default (state = initialState, action) => {
    switch (action.type) {

        // get list project
        case CHANGE_PASSWORD_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data
            }

        default:
            return state
    }
}
