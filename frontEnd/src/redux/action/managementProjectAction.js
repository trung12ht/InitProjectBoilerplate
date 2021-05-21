import serverCall from '../../modules/serverCall'

export const getListProject = () => dispatch => {
  dispatch({
    type: GET_LIST_PROJECT_BEGIN,
  })
  return serverCall({
    method: 'GET',
    url: `/managementProject/listProject`
  })
    .then(res => {
      dispatch({
        type: GET_LIST_PROJECT_SUCCESS,
        payload: res,
      })
      return res
    })
    .catch(error => {
      dispatch({
        type: GET_LIST_PROJECT_FAIL,
        payload: { error }
      })
      return error
    })
}

export const deleteProject = (projectId) => dispatch => {
  dispatch({
    type: DELETE_PROJECT_BEGIN,
  })
  return serverCall({
    method: 'GET',
    url: `managementProject/deleteProject/` + projectId
  })
    .then(res => {
      dispatch({
        type: DELETE_PROJECT_SUCCESS,
        payload: res,
      })
      dispatch(getListProject());
      return res
    })
    .catch(error => {
      dispatch({
        type: DELETE_PROJECT_FAIL,
        payload: { error }
      })
      return error
    })
}

export const DELETE_PROJECT_BEGIN = 'DELETE_PROJECT_BEGIN'
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS'
export const DELETE_PROJECT_FAIL = 'DELETE_PROJECT_FAIL'

export const GET_LIST_PROJECT_BEGIN = 'GET_LIST_PROJECT_BEGIN'
export const GET_LIST_PROJECT_SUCCESS = 'GET_LIST_PROJECT_SUCCESS'
export const GET_LIST_PROJECT_FAIL = 'GET_LIST_PROJECT_FAIL'