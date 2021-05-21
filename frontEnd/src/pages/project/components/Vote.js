import React from 'react'
import {
    CDropdownToggle,
    CDropdown,
    CTextarea
} from '@coreui/react'
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
import { cibNpm, freeSet } from '@coreui/icons'
import ProcessBar from './ProcessBar'
import StarRating from '../../listProject/components/StarRating'
import Comment from './Comment'
import Line from './Line'
import Bold from '../../listProject/components/Bold'
import ListComment from './ListComment'

const Vote = ({
    starRating,
    userStar,
    starCount,
    numberVote,
    ratingProject,
    comment,
    id,
    commentCallBack
}) => {
    return (
        <>
            <div>
                <CRow>
                    <CCol xs="8" sm="8" md="8" id="review" style={{
                        paddingTop: "20px",
                    }}>
                        <CLink style={{
                            float: "right"
                        }}> More reviews</CLink>
                        <Bold text="Reviews:" />
                        <Line height="1px" style={{
                        }} />
                    </CCol>
                    <CCol xs="4" sm="4" md="4">
                    </CCol>
                    <CCol xs="4" sm="4" md="4" style={{
                        fontSize: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        {starRating} <CIcon content={freeSet.cilStar} size="3xl" />
                    </CCol>
                    <CCol xs="8" sm="8" md="8">
                        {starCount && starCount.slice(0).reverse().map((p, i) =>
                            <CRow>{5 - i} <CIcon content={freeSet.cilStar} />
                                <ProcessBar percent={numberVote==0?0:p / numberVote * 100 + "%"}></ProcessBar>
                                <CLink>{p} đánh giá</CLink></CRow>
                        )}
                    </CCol>
                    <CCol xs="4" sm="4" md="4">
                    </CCol>
                    <CCol xs="4" sm="4" md="4">
                        <StarRating size="40" userStar={userStar} ratingProject={ratingProject} id={id} />
                    </CCol>
                    <CCol xs="8" sm="8" md="8">
                        <Comment text={null} commentCallBack={commentCallBack} id={id}>
                        </Comment>
                    </CCol>
                    <CCol xs="8" sm="8" md="8">
                        {comment && comment.map((c, i) =>
                                <ListComment content={c.content} star={c.star} update={c.update} user={c.user}/>
                            )}
                    </CCol>
                </CRow>
            </div>

        </>
    )
}

export default Vote
