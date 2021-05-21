import {
    GET_LABEL_BEGIN,
    GET_LABEL_SUCCESS,
    GET_LABEL_FAIL,
    POST_DATA_BEGIN,
    POST_DATA_SUCCESS,
    POST_DATA_FAIL,

    GET_LIST_DOCUMENT_BEGIN,
    GET_LIST_DOCUMENT_SUCCESS,
    GET_LIST_DOCUMENT_FAIL,

    APPEND_DOCUMENT_BEGIN,
    APPEND_DOCUMENT_SUCCESS,

    REMOVE_DOCUMENT_BEGIN,
    REMOVE_DOCUMENT_SUCCESS,

    UPDATE_DOCUMENT_CONTENT

} from '../action/postProjectAction'

const initialState = {
    loading: null,
    label: null,
    data: null,
    documents: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        // get list project
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

        // get list project
        case POST_DATA_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case POST_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                fileContent: action.payload.data,
                fileName: action.fileName
            }
        case POST_DATA_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data
            }

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
                documents: action.payload.data.document,
            }
        case GET_LIST_DOCUMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data
            }

        case APPEND_DOCUMENT_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case APPEND_DOCUMENT_SUCCESS:
            console.log(state)
            return {
                ...state,
                loading: false,
                documents: state.documents.concat(action.documents),
            }

        case REMOVE_DOCUMENT_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case REMOVE_DOCUMENT_SUCCESS:
            console.log(state.documents)
            console.log(action.index)
            return {
                ...state,
                loading: false,
                documents: [
                    ...state.documents.slice(0, action.index),
                    ...state.documents.slice(action.index + 1)
                ],
            }

        case UPDATE_DOCUMENT_CONTENT:
            const newDocuments = [...state.documents];
            for (let i=0;i<action.listDocument.length;i++) {
                Object.assign(newDocuments[i], {
                    content: action.listDocument[i],
                })
            }
            return {
                ...state,
                loading: false,
                documents: newDocuments
            }

        default:
            return state
    }
}
