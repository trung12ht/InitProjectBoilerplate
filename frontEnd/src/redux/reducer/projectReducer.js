import {
    GET_PROJECT_BEGIN,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_FAIL,
    RATING_BEGIN,
    RATING_SUCCESS,
    RATING_FAIL,
    GET_COMMENT_BEGIN,
    GET_COMMENT_SUCCESS,
    GET_COMMENT_FAIL,
    COMMENT_BEGIN,
    COMMENT_SUCCESS,
    COMMENT_FAIL,
    DOWNLOAD_BEGIN,
    DOWNLOAD_SUCCESS,
    DOWNLOAD_FAIL,
} from '../action/projectAction'

const initialState = {
    project: null,
    loading: false,
    comment: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        // get list project
        case GET_PROJECT_BEGIN:
            // alert("GET_PROJECT_BEGIN")
            return {
                ...state,
                loading: true,
                error: null,
            }
        case GET_PROJECT_SUCCESS:
            console.log(action.payload.data)
            return {
                ...state,
                loading: false,
                project: action.payload.data
            }
        case GET_PROJECT_FAIL:
            // alert("GET_PROJECT_FAIL")
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data
            }

        // Rating project
        case RATING_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case RATING_SUCCESS:
            return {
                ...state,
                project: {
                    ...state.project, // copy the nested object (level 1)
                    userStar: action.payload.data.userStar,
                    starRating: action.payload.data.starRating,
                    numberVote: action.payload.data.numberVote
                }
            }
        case RATING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response
            }

        // Rating project
        case GET_COMMENT_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case GET_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                comment: action.payload.data.comments
            }
        case GET_COMMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response
            }

        // comment
        case COMMENT_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case COMMENT_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case COMMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response
            }

        // download
        case DOWNLOAD_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case DOWNLOAD_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case DOWNLOAD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response
            }

        default:
            return state
    }
}
