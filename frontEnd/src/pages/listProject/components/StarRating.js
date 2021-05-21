import React from 'react'
import ReactStars from "react-rating-stars-component";
import {
    CRow,
} from '@coreui/react'

const StarRating = ({userStar, index, id, ratingProject, size}) => {
    const ratingChanged = (newRating) => {
        ratingProject(newRating, index, id);
    };
    return (
        <>
            <CRow>
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    value={userStar}
                    activeColor="#ffd700"
                    size={size}
                />
            </CRow>
        </>
    )
}

export default StarRating
