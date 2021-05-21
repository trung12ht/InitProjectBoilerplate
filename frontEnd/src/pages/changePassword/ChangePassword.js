import React, { Component, Suspense } from 'react'
import {
    CCol,
    CContainer,
    CInput,
    CLabel,
    CRow,
    CForm,
    CFormGroup,
    CCardFooter,
    CButton,
    CInputRadio,
    CInputFile,
    CCard,
    CCardHeader,
    CCardBody,
    CFormText,
    CTextarea,
    CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../../components/navbar/NavBar'


export default class ChangePassword extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.callApi()
    }

    callApi() {
        // this.props.getInfo()
    }

    updateInput(label, txt) {
        this.setState({
            [label]: txt
        })
    }

    onFileChange(event) {
        this.setState({ file: event.target.files[0] });
    };

    async submit() {
        await this.props.changePassword(this.state)
        toast("Update password success");
    }

    render() {
        return (
            <main className="c-main">
                <NavBar></NavBar>
        <CContainer fluid>
                    <Suspense>
                        <CRow>
                            <ToastContainer />
                            <CCol xs="12" sm="12" md="12" >
                                <CCard>
                                    <CCardHeader>
                                        Change password
                                    </CCardHeader>
                                    <CCardBody>
                                        <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                            <CFormGroup row>
                                                <CCol md="3">
                                                    <CLabel htmlFor="name">Old password</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="9">
                                                    <CInput id="oldPassword" name="oldPassword" type="password"
                                                        value="Old password"
                                                        placeholder="Old password" onChange={(evt) => { this.updateInput("oldPassword", evt.target.value); }} />
                                                </CCol>
                                            </CFormGroup>
                                            <CFormGroup row>
                                                <CCol md="3">
                                                    <CLabel htmlFor="name">New password</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="9">
                                                    <CInput id="newPassword" name="newPassword" type="password"
                                                        value="New password"
                                                        placeholder="New password" onChange={(evt) => { this.updateInput("newPassword", evt.target.value); }} />
                                                </CCol>
                                            </CFormGroup>
                                            <CFormGroup row>
                                                <CCol md="3">
                                                    <CLabel htmlFor="name">Confirm password</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="9">
                                                    <CInput id="confirmPassword" name="confirmPassword" type="password"
                                                        value="Confirm password"
                                                        placeholder="Confirm password" onChange={(evt) => { this.updateInput("confirmPassword", evt.target.value); }} />                                                </CCol>
                                            </CFormGroup>
                                        </CForm>
                                    </CCardBody>
                                    <CCardFooter>
                                        <CButton style={{ float: "right" }} type="submit" size="sm" color="primary" onClick={() => this.submit()}><CIcon content={freeSet.cilScrubber} /> Submit</CButton>
                                    </CCardFooter>
                                </CCard>

                            </CCol>

                        </CRow>
                    </Suspense>
                </CContainer>
            </main>
        )
    }
}

