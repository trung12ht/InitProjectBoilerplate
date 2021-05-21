import serverCall from '../../modules/serverCall'

export const getFolderTree = (id) => dispatch => {
  dispatch({
    type: GET_FOLDER_TREE_BEGIN,
  })
  return serverCall({
    method: 'GET',
    url: `/project/treeFolder/` + id
  })
    .then(res => {
      dispatch({
        type: GET_FOLDER_TREE_SUCCESS,
        payload: res,

      })
      return res
    })
    .catch(error => {
      dispatch({
        type: GET_FOLDER_TREE_FAIL,
        payload: { error }
      })
      return error
    })
}

export const getFile = (id, url, fileName) => dispatch => {
  dispatch({
    type: GET_FILE_BEGIN,
  })
  return serverCall({
    method: 'POST',
    url: `/project/getFile`,
    data: {
      projectId: parseInt(id),
      url: url
    }
  })
    .then(res => {
      dispatch({
        type: GET_FILE_SUCCESS,
        payload: res,
        fileName: fileName
      })
      return res
    })
    .catch(error => {
      dispatch({
        type: GET_FILE_FAIL,
        payload: { error }
      })
      return error
    })
}

export const GET_FOLDER_TREE_BEGIN = 'GET_FOLDER_TREE_BEGIN'
export const GET_FOLDER_TREE_SUCCESS = 'GET_FOLDER_TREE_SUCCESS'
export const GET_FOLDER_TREE_FAIL = 'GET_FOLDER_TREE_FAIL'


export const GET_FILE_BEGIN = 'GET_FILE_BEGIN'
export const GET_FILE_SUCCESS = 'GET_FILE_SUCCESS'
export const GET_FILE_FAIL = 'GET_FILE_FAIL'