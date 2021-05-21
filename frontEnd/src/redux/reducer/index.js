import { combineReducers } from 'redux'
import token from './tokenReducer'
import signin from './signinReducer'
import projects from './listProjectReducer'
import project from './projectReducer'
import folder from './folderReducer'
import documents from './documentReducer'
import post from './postProjectReducer'
import profile from './userProfileReducer'
import changePassword from './changePasswordReducer'
import managementProject from './managementProjectReducer'

export default combineReducers({
  token,
  signin,
  projects,
  project,
  folder,
  documents,
  post,
  profile,
  changePassword,
  managementProject
})