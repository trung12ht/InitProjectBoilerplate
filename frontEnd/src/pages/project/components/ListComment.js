import { freeSet } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCol, CLink, CRow } from '@coreui/react'
import React from 'react'
import Avatar from './Avatar'
import Line from './Line'

const ListComment = ({ content, star, update, user }) => {
    return (
        <>
            <CRow>
                <CCol xs="12" sm="12" md="12">
                    <Line height="1px"></Line>
                </CCol>
                <CCol xs="6" sm="6" md="6">
                    <Avatar>
                    </Avatar>
                    <CLink>
                        {user.fullName}
                    </CLink>
                </CCol>
                <CCol xs="6" sm="6" md="6">
                    <CCol xs="12" sm="12" md="12"><div style={{ float: "right" }}>{update}</div></CCol>
                    <CCol xs="12" sm="12" md="12" style={{ float: "right" }}><div style={{ float: "right" }}>Rating: {star} <CIcon content={freeSet.cilStar} /></div></CCol>
                </CCol>
                <CCol xs="12" sm="12" md="12" style={{ marginLeft: "10px", paddingRight: "20px" }}>
                    {content}
                </CCol>
            </CRow>

        </>
    )
}

export default ListComment
