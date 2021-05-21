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
    CTextarea
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../../components/navbar/NavBar'
import jumpTo from '../../modules/Navigation';
import Bold from '../listProject/components/Bold';
import { Col } from 'react-bootstrap';
import AddDocument from '../postProject/components/AddDocument';
import MdPreview from '../postProject/components/MdPreview';
import getLastPath from '../project/untils/until';



export default class EditProject extends Component {

    constructor(props) {
        super(props);
        this.state = { fileZip: { name: "Choose file..." } };
    }

    componentDidMount() {
        this.callApi()
    }

    async callApi() {
        await this.props.getLabel()
        await this.props.getProject(getLastPath())
        await this.props.getListDocument(getLastPath())
        this.updateInput("language", this.props.project.laguage);
        this.updateInput("name", this.props.project.name);
        this.updateInput("content", this.props.project.content);
        this.updateInput("technologi", this.props.project.technologi);
        console.log(this.props)
    }

    updateInput(label, txt) {
        this.setState({
            [label]: txt
        })
    }

    onFileChange(event) {
        this.setState({ fileZip: event.target.files[0] });
    };

    async submit() {
        let listDocument = document.getElementsByClassName("documentTextAreaHiden")
        let listContent = [];
        for (let i = 0; i < listDocument.length; i++) {
            listContent.push(listDocument[i].value.split("\n"))
        }
        await this.props.updateDocumentContent(listContent)
        await this.props.postData(this.state, this.props.documents)
        toast("Post " + this.state.name + " success");
        setTimeout(function () { jumpTo("/list-project"); }, 2000);
    }

    render() {
        const { label, documents } = this.props
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
                                        Edit
                                        <small> Init project</small>
                                    </CCardHeader>
                                    <CCardBody>
                                        <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                            <CFormGroup row>
                                                <CCol md="3">
                                                    <CLabel htmlFor="name">Name</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="12">
                                                    <CInput id="name" name="name" placeholder="Name" onChange={(evt) => { this.updateInput("name", evt.target.value); }} value={this.state.name} />
                                                    <CFormText>Input name here</CFormText>
                                                </CCol>
                                            </CFormGroup>
                                            <CFormGroup row>
                                                <CCol md="3">
                                                    <CLabel htmlFor="content">About</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="912">
                                                    <CTextarea
                                                        name="content"
                                                        id="content"
                                                        rows="9"
                                                        placeholder="About..."
                                                        value={this.state.content}
                                                        onChange={(evt) => { this.updateInput("content", evt.target.value); } }
                                                    />
                                                </CCol>
                                            </CFormGroup>
                                            <CFormGroup row>
                                                <CCol md="3">
                                                    <CLabel>Language</CLabel>
                                                </CCol>
                                                <CCol md="9">
                                                    {label && label.langVersion.map(l =>
                                                        <CFormGroup variant="checkbox">
                                                            <CInputRadio checked={this.state.language == l}
                                                                className="form-check-input" id={l} name="laguage" value={l}
                                                                onChange={(evt) => {
                                                                    this.updateInput("language", evt.target.value);
                                                                    var radios = document.getElementsByName("technologi");
                                                                    for (let i = 0; i < radios.length; i++) {
                                                                        radios[i].checked = false;
                                                                    }
                                                                    this.props.getListDocument(getLastPath());
                                                                }}
                                                            />
                                                            <CLabel variant="checkbox" htmlFor={l}>{l}</CLabel>
                                                        </CFormGroup>
                                                    )}
                                                </CCol>
                                            </CFormGroup>
                                            <CFormGroup row>
                                                <CCol md="3">
                                                    <CLabel>Technologi</CLabel>
                                                </CCol>
                                                <CCol md="9">
                                                    {
                                                        this.state.language ? label.langMaping[this.state.language].map((l, i) => {
                                                            return <CFormGroup variant="checkbox">
                                                                <CInputRadio checked={this.state.technologi == l}
                                                                className="form-check-input" id={l} name="technologi" value={l}
                                                                    onClick={(evt) => {
                                                                        this.updateInput("technologi", evt.target.value);
                                                                        this.props.getListDocument(getLastPath());
                                                                    }}
                                                                />
                                                                <CLabel variant="checkbox" htmlFor={l}>{l}</CLabel>
                                                            </CFormGroup>
                                                        }
                                                        ) : <Bold text="Please choice language" />}
                                                </CCol>
                                            </CFormGroup>
                                            <CFormGroup row>
                                                <CLabel col md={3}>Compressed project file</CLabel>
                                                <CCol xs="12">
                                                    <CInputFile custom id="fileZip" accept=".zip"
                                                        onChange={(evt) => { this.onFileChange(evt); }}
                                                    />
                                                    <CLabel htmlFor="fileZip" variant="custom-file">
                                                        {this.state.fileZip.name}
                                                    </CLabel>
                                                </CCol>
                                            </CFormGroup>
                                            <CFormGroup row>
                                                <CLabel col md={3}>Documents</CLabel>
                                                <CCol xs="12">
                                                    {
                                                        documents && documents.length > 0 ? documents.map((d, i) => {
                                                            return <MdPreview removeDocument={this.props.removeDocument} index={i} fileName={d.name} text={d.content}></MdPreview>
                                                        }) : <Bold text="Please choice technologi" />
                                                    }
                                                    {
                                                        documents && documents.length > 0 && <>
                                                            <AddDocument appendDocument={this.props.appendDocument}></AddDocument>
                                                        </>
                                                    }
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

