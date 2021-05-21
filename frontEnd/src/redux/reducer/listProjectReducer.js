import {
    GET_LIST_PROJECT_BEGIN,
    GET_LIST_PROJECT_SUCCESS,
    GET_LIST_PROJECT_FAIL,

    GET_FILTER_STAR_BEGIN,
    GET_FILTER_STAR_SUCCESS,
    GET_FILTER_STAR_FAIL,

    RATING_PROJECT_BEGIN,
    RATING_PROJECT_SUCCESS,
    RATING_PROJECT_FAIL,

    GET_NUMBER_RS_BEGIN,
    GET_NUMBER_RS_SUCCESS,
    GET_NUMBER_RS_FAIL,

    GET_RESULT_BEGIN,
    GET_RESULT_SUCCESS,
    GET_RESULT_FAIL,

    SORTED_BEGIN,
    SORTED_SUCCESS,
    SORTED_FAIL,

    VIEW_MORE_BEGIN,
    VIEW_MORE_SUCCESS,
    VIEW_MORE_FAIL,

} from '../action/listProjectAction'

import {
    GET_LABEL_BEGIN,
    GET_LABEL_SUCCESS,
    GET_LABEL_FAIL,
} from '../action/postProjectAction'

const initialState = {
    projects: null,
    loading: false,
    filterStar: null,
    label: null,
    numberRs: null,
    error: null,
    lastAction: null,
    index: null,
    requestBody: null,
    quantity: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        // get list project
        case GET_LIST_PROJECT_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case GET_LIST_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                projects: action.payload.data.projects,
                quantity: action.payload.data.quantity,
                lastAction: "listProject",
                index: 0
            }
        case GET_LIST_PROJECT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data
            }

        // get list project
        case GET_RESULT_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case GET_RESULT_SUCCESS:
            return {
                ...state,
                loading: false,
                projects: action.payload.data.projects,
                quantity: action.payload.data.quantity,
                requestBody: action.requestBody,
                lastAction: "getResult",
                index: 0
            }
        case GET_RESULT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data
            }
        // get filter star
        case GET_FILTER_STAR_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
                filterStar: action.star
            }
        case GET_FILTER_STAR_SUCCESS:
            return {
                ...state,
                loading: false,
                projects: action.payload.data.projects,
                quantity: action.payload.data.quantity,
                filterStar: action.filterStar,
                lastAction: "filterStar",
                index: 0
            }
        case GET_FILTER_STAR_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data,
                filterStar: action.star
            }
        // Rating project
        case RATING_PROJECT_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case RATING_PROJECT_SUCCESS:
            const newProjects = [...state.projects];
            Object.assign(newProjects[action.index], {
                userStar: action.payload.data.userStar,
                starRating: action.payload.data.starRating,
                numberVote: action.payload.data.numberVote
            })
            return {
                ...state,
                loading: false,
                projects: newProjects
            }
        case RATING_PROJECT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data
            }

        // GET LABEL
        case GET_LABEL_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case GET_LABEL_SUCCESS:
            return {
                ...state,
                loading: false,
                label: action.payload.data
            }
        case GET_LABEL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data
            }

        // GET NUMBER RS
        case GET_NUMBER_RS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case GET_NUMBER_RS_SUCCESS:
            return {
                ...state,
                loading: false,
                numberRs: action.payload.data.number
            }
        case GET_NUMBER_RS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data
            }

        // GET NUMBER RS
        case SORTED_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case SORTED_SUCCESS:
            return {
                ...state,
                loading: false,
                projects: action.payload.data.projects,
                quantity: action.payload.data.quantity,
                requestBody: action.requestBody,
                lastAction: "sorted",
                index: 0
            }
        case SORTED_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data
            }

        // get list project
        case VIEW_MORE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case VIEW_MORE_SUCCESS:
            return {
                ...state,
                loading: false,
                projects: state.projects.concat(action.payload.data.projects),
                quantity: action.payload.data.quantity,
                index: action.index + 1
            }
        case VIEW_MORE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data
            }

        default:
            return state
    }
}
