import React from 'react'
import {
    CTextarea,
    CCol,
    CRow,
    CButton,
} from '@coreui/react'
import {

} from '@coreui/react'
import ReactMarkdown from 'react-markdown';
import Bold from '../../listProject/components/Bold';
import { AiFillCaretDown, AiFillCaretRight, AiOutlineClose } from "react-icons/ai";
import "../styles/md.preview.scss"
import CloseModel from './CloseModel';

const MdPreview = ({ fileName, text, removeDocument, index }) => {
    let firstState = "";
    text.map((c) => {
        firstState = firstState + c + "\n";
    });
    const [content, setContent] = React.useState(firstState);
    const [show, setShow] = React.useState(false);
    // const [del, setDel] = React.useState(false);
    const [modal, setModal] = React.useState(false);

    const handleChange = (value) => {
        setContent(value)
    }

    return (
        <>
            {
            // !del &&
                <CRow style={{ marginBottom: "10px" }}>
                    <CCol xs="11" sm="11" md="11" className="document" onClick={() => setShow(!show)} style={{ cursor: "pointer" }}>
                        <Bold text={fileName} float="left" />{!show ? <AiFillCaretRight /> : <AiFillCaretDown />}
                    </CCol>
                    <CCol xs="1" sm="1" md="1">
                        <CButton color="danger" style={{ float: "right" }} onClick={() => setModal(!modal)}><AiOutlineClose size="10"></AiOutlineClose></CButton>
                        <CloseModel fileName = {fileName} modal={modal} setModal={setModal} removeDocument= {removeDocument} index={index}></CloseModel>
                    </CCol>
                    <CTextarea className = "documentTextAreaHiden" value={content} style={{display: "none"}}>
                        </CTextarea>
                    {show ? <><CCol xs="6" sm="6" md="6" >
                        <CTextarea className = "documentTextArea" onChange={(e) => handleChange(e.target.value)} value={content} rows="20">
                        </CTextarea>
                    </CCol>
                        <CCol xs="6" sm="6" md="6" style={{
                            border: "1px solid",
                            overflow: "scroll",
                            height: "435px"
                        }}>
                            <ReactMarkdown source={content}></ReactMarkdown>
                        </CCol></> : <></>
                    }
                </CRow>
            }

        </>
    )
}

export default MdPreview
