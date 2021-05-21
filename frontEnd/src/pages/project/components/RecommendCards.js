import React from 'react'
import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
    CLink,
    CCardText,
    CCardTitle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { freeSet, brandSet } from '@coreui/icons'
import StarRating from './StarRating';
import EyeIcon from './EyeIcon';

const RecommendCards = ({
    name,
    content,
    laguage,
    technologi,
    user,
    labeltxt,
    index,
    id
}) => {
    return (
        <>
            <CRow>
                <CCol xs="12" sm="12" md="12">
                    <CCard>
                        <CCardHeader>
                            <CIcon content={freeSet.cilBookmark} className="float-left" />
                            <CLink>
                                {user} / {name} / {id} / {index}
                            </CLink>
                            <div style={{backgroundColor: "gray", float: "right", color: "white", padding: "4px", margin: "-12px -20px"}}>
                                {labeltxt?labeltxt:"AutoRec"}
                            </div>
                        </CCardHeader>
                        <CCardBody>
                            <CCardText>
                                {content}
                            </CCardText>
                        </CCardBody>
                        <CCardFooter>
                            <CRow>
                                <CCol lg="6">
                                    {laguage}
                                </CCol>
                                <CCol lg="6">
                                    {technologi}
                                </CCol>
                            </CRow>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default RecommendCards
