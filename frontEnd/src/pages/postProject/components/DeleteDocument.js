import React from 'react'
import {
    CCol,
    CRow
} from '@coreui/react'
import { AiOutlineDelete } from "react-icons/ai";
import "../styles/md.preview.scss"
import Bold from '../../listProject/components/Bold';

const DeleteDocument = ({}) => {
    return (
        <>
            <CRow>
                <CCol xs="12" sm="12" md="12">
                    <AiOutlineDelete></AiOutlineDelete> <Bold text="Delete Document"></Bold>
                </CCol>
            </CRow>
        </>
    )
}

export default DeleteDocument
