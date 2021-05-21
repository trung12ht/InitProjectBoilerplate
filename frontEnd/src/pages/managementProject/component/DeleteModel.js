import React from 'react'
import {
    CButton,
    CCol,
    CRow,
    CCard,
    CCardBody,
    CCardHeader,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react'

const DeleteModel = ({ projectName, modal, setModal, projectId, deleteProject }) => {
    return (
        <>
            <CModal
                show={modal}
                onClose={() => setModal(!modal)}
            >
                <CModalHeader>
                    <CModalTitle>Delete project</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Are you sure to delete <span style={{ fontWeight: "bold" }}>{projectName}</span>?
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => {
                        deleteProject(projectId);
                        setModal(!modal);
                    }}>Delete</CButton>{' '}
                    <CButton
                        color="secondary"
                        onClick={() => setModal(!modal)}
                    >Cancel</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default DeleteModel


