import serverCall from '../../modules/serverCall'

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
            dispatch(getDocument(parseInt(id), res.data.document[0].name, res.data.name))
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

export const getDocument = (id, name, rootName) => dispatch => {
    dispatch({
        type: GET_DOCUMENT_BEGIN,
    })
    return serverCall({
        method: 'POST',
        url: `/project/getFile`,
        data: {
            projectId: parseInt(id),
            url: rootName + "/document/" + name
        }
    })
        .then(res => {
            dispatch({
                type: GET_DOCUMENT_SUCCESS,
                payload: res,
                fileName: name
            })
            return res
        })
        .catch(error => {
            dispatch({
                type: GET_DOCUMENT_FAIL,
                payload: { error }
            })
            return error
        })
}

export const GET_LIST_DOCUMENT_BEGIN = 'GET_LIST_DOCUMENT_BEGIN'
export const GET_LIST_DOCUMENT_SUCCESS = 'GET_LIST_DOCUMENT_SUCCESS'
export const GET_LIST_DOCUMENT_FAIL = 'GET_LIST_DOCUMENT_FAIL'


export const GET_DOCUMENT_BEGIN = 'GET_DOCUMENT_BEGIN'
export const GET_DOCUMENT_SUCCESS = 'GET_DOCUMENT_SUCCESS'
export const GET_DOCUMENT_FAIL = 'GET_DOCUMENT_FAIL'