import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { registerNav } from './modules/Navigation'
import { insertToken } from './redux/action/tokenAction'
import LoginContainer from './pages/loginsignin/LoginContainer'
import SigninContainer from './pages/loginsignin/SigninContainer'
import ListProjectContainer from './pages/listProject/ListProjectContainer'
import PostProject from './pages/postProject/PostProject'

import './scss/style.scss';
import ProjectContainer from './pages/project/ProjectContainer';
import UserProfileContainer from './pages/userProfile/UserProfileContainer';
import FolderContainer from './pages/treeFolder/FolderContainer';
import PostProjectContainer from './pages/postProject/PostProjectContainer';
import ChangePasswordContainer from './pages/changePassword/ChangePasswordContainer';
import UserInfoContainer from './pages/userInfo/UserInfoContainer';
import ManagementProjectContainer from './pages/managementProject/ManagementProjectContainer';
import EditProjectContainer from './pages/editProject/EditProjectContainer';

class App extends Component {
  componentDidMount() {
    this.props.insertToken()
  }

  render() {
    return (
      <div>
        <Router ref={registerNav}>
          <Switch>
            <Route path="/signin" component={SigninContainer} />
            <Route path="/login" component={LoginContainer} />
            <Route key="listProject" path="/list-project" component={ListProjectContainer} />
            <Route key="project" path="/project/:id" component={ProjectContainer} />
            <Route key="tree" path="/treeFolder/:id" component={FolderContainer} />
            <Route key="postProject" path="/postProject" component={PostProjectContainer} />
            <Route key="userInfo" path="/userInfo/:id" component={UserInfoContainer} />
            <Route key="managementProject" path="/managementProject" component={ManagementProjectContainer} />
            {this.props.token && [
              <Route key="userProfile" path="/userProfile" component={UserProfileContainer} />,
              <Route key="changePassword" path="/changePassword" component={ChangePasswordContainer} />,
              <Route key="editProject" path="/editProject/:id" component={EditProjectContainer} />
            ]}
            <Route exact path="/" component={ListProjectContainer} />
          </Switch>
        </Router>
      </div>
    );
  }
}
const mapStoreToProps = state => ({
  token: state.token.user_token
})
const mapDispatchToProps = {
  insertToken
}
export default connect(mapStoreToProps, mapDispatchToProps)(App);
