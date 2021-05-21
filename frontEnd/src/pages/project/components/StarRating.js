import React from 'react'
import ReactStars from "react-rating-stars-component";
import {
    CRow,
} from '@coreui/react'

const StarRating = ({userStar, index, id, ratingProject}) => {
    const ratingChanged = (newRating) => {
        ratingProject(newRating, index, id);
    };
    return (
        <>
            <CRow>
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    value={userStar}
                    activeColor="#ffd700"
                />
            </CRow>
        </>
    )
}

export default StarRating
