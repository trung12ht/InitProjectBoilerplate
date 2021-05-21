import React from 'react'
import ReactStars from "react-rating-stars-component";
import {
    CRow,
} from '@coreui/react'

const ProcessBar = ({ percent }) => {

    return (
        <>
            <div style={{
                marginTop: "6px",
                marginLeft: "4px",
                marginRight: "4px",
                borderRadius: "5px",
                width: "200px", height: "10px",
                backgroundColor: "grey"
            }}>
                <div style={{
                    height: "24px", width: percent
                    , backgroundColor: "#F96A13",
                    height: "10px",
                    borderRadius: "5px",
                }}>

                </div>
            </div>
        </>
    )
}

export default ProcessBar
