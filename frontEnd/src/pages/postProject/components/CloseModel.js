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
import { AiFillFileAdd } from "react-icons/ai";
import "../styles/md.preview.scss"
import Bold from '../../listProject/components/Bold';

const CloseModel = ({fileName, modal, setModal, index, removeDocument}) => {
    return (
        <>
            <CModal
                show={modal}
                onClose={()=>setModal(!modal)}
            >
                <CModalHeader>
                    <CModalTitle>Delete file</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Are you sure to delete <span style={{fontWeight: "bold"}}>{fileName}</span>?
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => {
                            console.log(index)
                            removeDocument(index);
                            setModal(!modal);
                        }}>Delete</CButton>{' '}
                    <CButton
                        color="secondary"
                        onClick={()=>setModal(!modal)}
                    >Cancel</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default CloseModel


