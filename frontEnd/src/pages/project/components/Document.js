import { CCol, CRow } from '@coreui/react';
import React from 'react'
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const color = {
    childNavBar: "rgb(224 226 228)",
    line: "#859690"
}

const css = {
    CNavLinkActive: { color: "black", borderBottom: "2px solid", fontWeight: "bold" },
    CNavLink: { color: "black" },
    borderColor: { marginTop: "20px", borderStyle: "solid", padding: "10px 0px", borderWidth: "1px", borderRadius: "4px" }
}

const Document = ({ fileContent, fileName }) => {
    var content = "";

    fileContent.map((c) => {
        content = content + c + "\n";
    });

    const getLanguage = (f) => {
        let extend = f.split('.').pop();
        if (extend == 'js') {
            return 'javascript';
        }
        if (extend == 'py') {
            return 'python';
        }
        return extend;
    }

    return (
        <CCol xs="12" sm="12" md="12" style={css.borderColor} id="Document">
            <CRow style={{
                padding: "0px 30px",
                fontWeight: "bold"
            }}>
                {/* Document.md */}
                {fileName}
            </CRow>
            <div style={{
                padding: "0px 30px"
            }}>
                {
                    getLanguage(fileName) == "md" ? <ReactMarkdown source={content}></ReactMarkdown> :
                        <SyntaxHighlighter language={getLanguage(fileName)} style={docco}>
                            {content}
                        </SyntaxHighlighter>
                }

            </div>
        </CCol>
    );
}

export default Document


