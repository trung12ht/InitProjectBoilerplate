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
import jumpTo from '../../modules/Navigation';
import NavBar from '../../components/navbar/NavBar'


export default class UserInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {file: ""}
    }

    componentDidMount() {
        this.callApi()
    }

    callApi() {
        this.props.getInfo()
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
        await this.props.updateProfile(this.state)
        toast("Update profile success");
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
                                        Profile
                                    </CCardHeader>
                                    <CCardBody>
                                        <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                            <CFormGroup row>
                                                <CCol md="3">
                                                    <CLabel htmlFor="name">Nickname</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="9">
                                                    <CInput id="nickname" name="nickname" placeholder="Nickname" onChange={(evt) => { this.updateInput("nickname", evt.target.value); }} />
                                                    <CFormText>Name display</CFormText>
                                                </CCol>
                                            </CFormGroup>
                                            <CFormGroup row>
                                                <CCol md="3">
                                                    <CLabel htmlFor="email">Email</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="9">
                                                    <CInput id="email" name="email" type="email" disabled value="Zemail@gmail.com" />
                                                    <CFormText>Email login</CFormText>
                                                </CCol>
                                            </CFormGroup>
                                            <CFormGroup row>
                                                <CCol md="3">
                                                    <CLabel htmlFor="name">Password</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="9">
                                                    <CInput id="password" name="password" type="password" disabled value="Zemail" />
                                                    <CButton color="info" style={{ marginTop: "10px" }} onClick={() => jumpTo("/changePassword")}>Change password</CButton>
                                                </CCol>
                                            </CFormGroup>
                                            <CFormGroup row>
                                                <CCol md="3">
                                                    <CLabel htmlFor="name">Avatar</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="9">
                                                    <CInputFile style={{ display: "none" }} custom id="fileZip" accept=""
                                                        onChange={(evt) => { this.onFileChange(evt); }}
                                                    />
                                                    <CRow><CCol><CButton color="info" style={{ marginBottom: "10px" }}
                                                    onClick={() => { document.getElementById("fileZip").click() }}
                                                    >Browse</CButton></CCol></CRow>
                                                    <CImg style={{
                                                        border: "1px solid #ddd",
                                                        borderRadius: "4px",
                                                        padding: "5px",
                                                        width: "150px",
                                                        height: "150px",
                                                        objectFit: "cover"
                                                    }}
                                                    
                                                    src={this.state.file?URL.createObjectURL(this.state.file):"http://localhost:8080/api/v1/file/img_avatar.png"}></CImg>
                                                </CCol>
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

