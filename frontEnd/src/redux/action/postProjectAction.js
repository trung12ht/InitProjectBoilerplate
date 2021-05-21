import serverCall, { postForm } from '../../modules/serverCall'

export const getListDocument = (id) => dispatch => {
    dispatch({
        type: GET_LIST_DOCUMENT_BEGIN,
    })
    return serverCall({
        method: 'POST',
        url: `/project/listDocument/` + parseInt(id)
    })
        .then(res => {
            dispatch({
                type: GET_LIST_DOCUMENT_SUCCESS,
                payload: res,
            })
            return res
        })
        .catch(error => {
            dispatch({
                type: GET_LIST_DOCUMENT_FAIL,
                payload: { error }
            })
            return error
        })
}

export const getLabel = () => dispatch => {
    dispatch({
        type: GET_LABEL_BEGIN,
    })
    return serverCall({
        method: 'GET',
        url: `/postProject/getLabel`
    })
        .then(res => {
            dispatch({
                type: GET_LABEL_SUCCESS,
                payload: res,
            })
            return res
        })
        .catch(error => {
            dispatch({
                type: GET_LABEL_FAIL,
                payload: { error }
            })
            return error
        })
}

export const postData = (data, documents) => dispatch => {
    dispatch({
        type: POST_DATA_BEGIN,
    })
    data["documents"] = documents
    console.log(data)
    return postForm({
        data: data,
        url: `/postProject`,
    })
        .then(res => {
            dispatch({
                type: POST_DATA_SUCCESS,
                payload: res
            })
            return res
        })
        .catch(error => {
            dispatch({
                type: POST_DATA_FAIL,
                payload: { error }
            })
            return error
        })
}

export const getListDocumentPost = (language, technologi) => dispatch => {
    dispatch({
        type: GET_LIST_DOCUMENT_BEGIN,
    })
    if (language == "" && technologi == "") {
        dispatch({
            type: GET_LIST_DOCUMENT_SUCCESS,
            payload: {
                data: {
                    documents: []
                }
            }
        })
        return
    }
    return serverCall({
        method: 'POST',
        url: `/postProject/getListDocument`,
        data: {
            "language": language,
            "technologi": technologi
        },
    })
        .then(res => {
            dispatch({
                type: GET_LIST_DOCUMENT_SUCCESS,
                payload: res,
            })
            return res
        })
        .catch(error => {
            dispatch({
                type: GET_LIST_DOCUMENT_FAIL,
                payload: { error }
            })
            return error
        })
}

export const appendDocument = (documents) => dispatch => {
    dispatch({
        type: APPEND_DOCUMENT_BEGIN,
    })
    return dispatch({
        type: APPEND_DOCUMENT_SUCCESS,
        documents: documents
    })
}

export const removeDocument = (index) => dispatch => {
    console.log(index);
    dispatch({
        type: REMOVE_DOCUMENT_BEGIN,
    })
    dispatch({
        type: REMOVE_DOCUMENT_SUCCESS,
        index: index
    })
    return
}

export const updateDocumentContent = (listDocument) => dispatch => {
    console.log(listDocument)
    // dispatch({
    //     type: UPDATE_DOCUMENT_CONTENT,
    //     listDocument: listDocument
    // })
    return
}

export const UPDATE_DOCUMENT_CONTENT = "UPDATE_DOCUMENT_CONTENT"

export const APPEND_DOCUMENT_BEGIN = 'APPEND_DOCUMENT_BEGIN'
export const APPEND_DOCUMENT_SUCCESS = 'APPEND_DOCUMENT_SUCCESS'

export const REMOVE_DOCUMENT_BEGIN = 'REMOVE_DOCUMENT_BEGIN'
export const REMOVE_DOCUMENT_SUCCESS = 'REMOVE_DOCUMENT_SUCCESS'

export const GET_LABEL_BEGIN = 'GET_LABEL_BEGIN'
export const GET_LABEL_SUCCESS = 'GET_LABEL_SUCCESS'
export const GET_LABEL_FAIL = 'GET_LABEL_FAIL'

export const GET_LIST_DOCUMENT_BEGIN = 'GET_LIST_DOCUMENT_BEGIN_P'
export const GET_LIST_DOCUMENT_SUCCESS = 'GET_LIST_DOCUMENT_SUCCESS_P'
export const GET_LIST_DOCUMENT_FAIL = 'GET_LIST_DOCUMENT_FAIL_P'

export const POST_DATA_BEGIN = 'POST_DATA_BEGIN'
export const POST_DATA_SUCCESS = 'POST_DATA_SUCCESS'
export const POST_DATA_FAIL = 'POST_DATA_FAIL'