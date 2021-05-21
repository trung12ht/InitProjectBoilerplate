import {
    GET_INFO_BEGIN,
    GET_INFO_SUCCESS,
    GET_INFO_FAIL,
    UPDATE_PROFILE_BEGIN,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
} from '../action/userProfileAction'

const initialState = {
    loading: null,
    info: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        // get list project
        case GET_INFO_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case GET_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                label: action.payload.data
            }
        case GET_INFO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data
            }

        // get list project
        case UPDATE_PROFILE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                fileContent: action.payload.data,
                fileName: action.fileName
            }
        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data
            }

        default:
            return state
    }
}
