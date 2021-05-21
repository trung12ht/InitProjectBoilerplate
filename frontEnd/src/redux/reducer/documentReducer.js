import {
    GET_LIST_DOCUMENT_BEGIN,
    GET_LIST_DOCUMENT_SUCCESS,
    GET_LIST_DOCUMENT_FAIL,
    GET_DOCUMENT_BEGIN,
    GET_DOCUMENT_SUCCESS,
    GET_DOCUMENT_FAIL,
} from '../action/documentAction'

const initialState = {
    documents: null,
    document: null,
}

export default (state = initialState, action) => {
    switch (action.type) {

        case GET_LIST_DOCUMENT_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case GET_LIST_DOCUMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                documents: action.payload.data
            }
        case GET_LIST_DOCUMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data
            }


        case GET_DOCUMENT_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case GET_DOCUMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                document: action.payload.data,
                fileName: action.fileName
            }
        case GET_DOCUMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data
            }

        default:
            return state
    }
}
