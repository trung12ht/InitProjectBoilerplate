import {

    GET_LIST_PROJECT_BEGIN,
    GET_LIST_PROJECT_SUCCESS,
    GET_LIST_PROJECT_FAIL,
    DELETE_PROJECT_BEGIN,
    DELETE_PROJECT_FAIL,
    DELETE_PROJECT_SUCCESS

} from '../action/managementProjectAction'

const initialState = {
    projects: null,
    loading: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        // Rating project
        case GET_LIST_PROJECT_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case GET_LIST_PROJECT_SUCCESS:
            console.log(action.payload.data.projects)
            return {
                ...state,
                loading: false,
                projects: action.payload.data.projects
            }
        case GET_LIST_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data
            }

        // Delete project
        case DELETE_PROJECT_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                // projects: action.payload.data.projects
            }
        case DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data
            }

        default:
            return state
    }
}
