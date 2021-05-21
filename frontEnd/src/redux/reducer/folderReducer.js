import {
    GET_FOLDER_TREE_BEGIN,
    GET_FOLDER_TREE_SUCCESS,
    GET_FOLDER_TREE_FAIL,
    GET_FILE_BEGIN,
    GET_FILE_SUCCESS,
    GET_FILE_FAIL,
} from '../action/folderAction'

const initialState = {
    tree: null,
    fileContent: null,
    fileName: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        // get list project
        case GET_FOLDER_TREE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case GET_FOLDER_TREE_SUCCESS:
            return {
                ...state,
                loading: false,
                tree: action.payload.data
            }
        case GET_FOLDER_TREE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data
            }

        // get list project
        case GET_FILE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case GET_FILE_SUCCESS:
            return {
                ...state,
                loading: false,
                fileContent: action.payload.data,
                fileName: action.fileName
            }
        case GET_FILE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error.response.data
            }

        default:
            return state
    }
}
