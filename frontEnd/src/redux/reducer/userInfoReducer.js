import {
    GET_USER_INFO_BEGIN,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAIL,
    FOLLOW_USER_BEGIN,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_FAIL,
} from '../action/userInfoAction'

const initialState = {
    loading: null,
    info: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        // get list project
        case GET_USER_INFO_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                label: action.payload.data
            }
        case GET_USER_INFO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data
            }

        // get list project
        case FOLLOW_USER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case FOLLOW_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                fileContent: action.payload.data,
                fileName: action.fileName
            }
        case FOLLOW_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data
            }

        default:
            return state
    }
}
