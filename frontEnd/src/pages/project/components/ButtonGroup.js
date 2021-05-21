import React from 'react'
import {
    CDropdownToggle,
    CButton,
    CDropdown
} from '@coreui/react'
import Padding from './Padding'
import '../stylesheets/style.css'
import jumpTo from '../../../modules/Navigation'

const ButtonGroup = ({
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
                <CButton color="primary" variant="outline" onClick={() => download(id)}>Khởi tạo</CButton>
                <CButton color="primary" variant="outline" id="midButton" onClick={() => jumpTo("/treeFolder/"+id)}>Cây thư mục</CButton>
                <CButton color="primary" variant="outline">Github</CButton>
            </div>
        </>
    )
}

export default ButtonGroup
