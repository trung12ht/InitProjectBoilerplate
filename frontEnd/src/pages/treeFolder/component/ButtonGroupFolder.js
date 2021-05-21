import React from 'react'
import {
    CButton} from '@coreui/react'
import jumpTo from '../../../modules/Navigation'

const ButtonGroupFolder = ({
    tech,
    langVersion,
    projectMeta,
    id,
    download
}) => {
    return (
        <>
            <div className="pt-3 text-center" style={{
                position: "fixed",
                bottom: "0px",
                backgroundColor: "rgb(200 203 206)",
                width: "100%",
                zIndex: "1000"
            }}>
                <CButton color="primary" variant="outline" onClick={() => download(id)}>Download</CButton>
                <CButton color="primary" variant="outline" id="midButton" onClick={() => jumpTo("/project/" + id)}>Quay lại</CButton>
            </div>
        </>
    )
}

export default ButtonGroupFolder
