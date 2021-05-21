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
import jumpTo from '../../../modules/Navigation';

const Cards = ({
    name,
    title,
    content,
    laguage,
    technologi,
    views,
    uses,
    user,
    starRating,
    numberVote,
    update,
    index,
    id,
    userStar,
    ratingChanged,
    ratingProject
}) => {
    return (
        <>
            <CRow>
                <CCol xs="12" sm="12" md="12">
                    <CCard>
                        <CCardHeader>
                            <CIcon content={freeSet.cilBookmark} className="float-left" />
                            <CLink>
                                {user} </CLink> / <CLink onClick={()=>jumpTo('/project/' + id)}>{name} / {id} / {index}
                            </CLink>
                            <div className="card-header-actions">
                                <StarRating ratingProject={ratingProject} userStar={userStar} ratingChanged={ratingChanged} index={index} id={id} size={24}/>
                            </div>
                        </CCardHeader>
                        <CCardBody>
                            {/* <CCardTitle>{title}.</CCardTitle> */}
                            <CCardText>
                                {content}
                            </CCardText>
                        </CCardBody>
                        <CCardFooter>
                            <CRow>
                                <CCol lg="2">
                                    <CIcon content={freeSet.cilLanguage} className="float-left" />
                                    {laguage}
                                </CCol>
                                <CCol md="2">
                                    <CIcon content={freeSet.cilStar} className="float-left" />
                                    {starRating}</CCol>
                                <CCol sm="2">
                                    <EyeIcon />
                                    {views}</CCol>
                                <CCol lg="6">
                                    <div className="float-right">Cập nhật {update}</div>
                                </CCol>
                            </CRow>
                            <CRow><CCol lg="2">
                                <CIcon content={freeSet.cilWindow} className="float-left" />
                                {technologi}</CCol>
                                <CCol md="2">
                                    <CIcon content={freeSet.cilUser} className="float-left" />
                                    {numberVote}</CCol>
                                <CCol sm="2">
                                    <CIcon content={freeSet.cilCloudDownload} className="float-left" />
                                    {uses}</CCol>
                            </CRow>
                        </CCardFooter>
                    </CCard>

                </CCol>
            </CRow>

        </>
    )
}

export default Cards
