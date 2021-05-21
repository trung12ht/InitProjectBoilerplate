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
    CDataTable,
    CBadge,
    CLink
} from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../../components/navbar/NavBar'
import Bold from '../listProject/components/Bold';
import jumpTo from '../../modules/Navigation';
import DeleteModel from './component/DeleteModel';



export default class ManagementProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileZip: { name: "Choose file..." },
            showModal: false,
            projectName: "",
            projectId: 0,
        };
    }

    componentDidMount() {
        this.callApi()
    }

    callApi() {
        this.props.getListProject()
    }

    render() {
        const { projects } = this.props

        const fields = ['name', 'content', 'update', 'views', 'uses', 'action']

        return (
            <main className="c-main">
                <NavBar></NavBar>
                <CContainer fluid>
                    <Suspense>
                        <CRow>
                            <ToastContainer />
                            <CCol xs="12" lg="12"></CCol>
                            <CCol xs="12" lg="12">
                                <CCard>
                                    <CCardHeader>
                                        Management init project
                                    </CCardHeader>
                                    <CCardBody>
                                        {projects && <CDataTable
                                            items={projects}
                                            fields={fields}
                                            striped
                                            itemsPerPage={5}
                                            pagination
                                            sorter
                                            hover
                                            cleaner
                                            tableFilter
                                            scopedSlots={{
                                                'name':
                                                    (items) => (
                                                        <td>
                                                            <CLink onClick={() => { jumpTo("/project/" + items.id) }}><Bold text={items.name}></Bold></CLink>
                                                        </td>
                                                    ),
                                                'action':
                                                    (items) => (
                                                        <td>
                                                            <CButton onClick={() => { jumpTo("/editProject/" + items.id) }} color="info" style={{ marginRight: "10px" }}>Edit</CButton>
                                                            <CButton color="danger" onClick={() => {
                                                                this.setState({
                                                                    showModal: true,
                                                                    projectName: items.name,
                                                                    projectId: items.id,
                                                                })
                                                                console.log(this.state)
                                                            }}>Delete</CButton>
                                                        </td>
                                                    )
                                            }}
                                        />}
                                    </CCardBody>
                                    <DeleteModel projectName={this.state.projectName} modal={this.state.showModal} setModal={(modal) => {
                                        this.setState({
                                            showModal: modal
                                        })
                                    }} projectId={this.state.projectId} deleteProject={this.props.deleteProject}></DeleteModel>
                                </CCard>
                            </CCol>
                        </CRow>
                    </Suspense>
                </CContainer>
            </main>
        )
    }
}

