import { CButton, CTextarea } from '@coreui/react'
import React from 'react'

const Comment = ({ text, id, commentCallBack }) => {
    const [state, setState] = React.useState(text?text:"")
    
    const change = (e) => {
        let value = e.target.value;
        setState({...state, value});
    }

    return (
        < >
            <CTextarea 
            style={{
                borderColor: "grey",
            }}
                onChange = {change}
                rows = {5}
            >
                {text}
            </CTextarea>
            <div style={{ float: "right", margin: "6px 0px" }}>
                {
                    <CButton color="info" disabled={state == ""}  onClick={()=>commentCallBack(state, id)}>SEND REVIEW</CButton>
                }
            </div>
        </>
    )
}

export default Comment
