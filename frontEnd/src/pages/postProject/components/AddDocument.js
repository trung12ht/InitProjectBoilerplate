import React from 'react'
import {
    CCol,
    CInput,
    CRow,
    CButton,
} from '@coreui/react'
import { AiFillFileAdd, AiOutlineCheck } from "react-icons/ai";
import "../styles/md.preview.scss"
import Bold from '../../listProject/components/Bold';

const AddDocument = ({appendDocument}) => {
    const [add, setAdd] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    return (
        <>
            <CRow>
                {
                    !add ?
                        <CCol xs="12" sm="12" md="12">
                            <CButton onClick={() => { setAdd(!add) }} color="info"><AiFillFileAdd /><Bold text="Add Document"></Bold></CButton>
                        </CCol> :
                        <>
                            <CCol xs="6" sm="6" md="6">
                                <Bold text="File name: "></Bold>
                                <CInput autoFocus="false" value={inputValue} onChange={(e) => setInputValue(e.target.value)}></CInput>
                            </CCol>
                            <CCol xs="1" sm="1" md="1">
                                <Bold text="File type: "></Bold>
                                <span style={{ fontWeight: "bold", fontSize: "22px" }}>.md</span>
                            </CCol>
                            <CCol xs="5" sm="5" md="5">
                                <Bold text="Action: "></Bold>
                                <CButton color="info" style={{ marginRight: "10px" }} onClick={() => { setAdd(!add); appendDocument({
                                    name: inputValue+".md",
                                    content: ["### " + inputValue],
                                }) }}>Add<AiOutlineCheck size="10"></AiOutlineCheck></CButton>
                                <CButton color="danger" onClick={() => { setAdd(!add) }} >Cancel<AiOutlineCheck size="10" ></AiOutlineCheck></CButton>
                            </CCol>
                        </>
                }

            </CRow>
        </>
    )
}

export default AddDocument
