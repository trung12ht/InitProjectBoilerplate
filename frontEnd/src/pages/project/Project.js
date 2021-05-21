import React, { Component, Suspense } from 'react'
import {
    CContainer,
} from '@coreui/react'
import getLastPath from './untils/until'
import Layer from './components/Layer'
import ButtonGroup from './components/ButtonGroup'
import Vote from './components/Vote'
import Recomment from './components/Recomment'
import Header from './components/Header'
import ConfigComponent from './components/Config'
import ReadMe from './components/Readme'
import Loading from '../../components/loadingAnimation'
import NavBar from '../../components/navbar/NavBar'

export default class Project extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.callApi()
    }

    callApi() {
        if (!this.props.project) {
            this.props.getProject(getLastPath())
        }
        if (!this.props.comment) {
            this.props.getComment(getLastPath())
        }
    }

    render() {
        const { project, comment, loading } = this.props
        return (
            <main className="c-main" style={{
                marginBottom: "100px"
            }}>
                <NavBar></NavBar>
        <CContainer fluid>
                    <Suspense fallback={loading}>
                        {loading ? <Loading></Loading> : <></>}
                        {project && <Layer
                            id={project.id}
                            name={project.name}
                            user={project.user}
                            language={project.laguage}
                            technologi={project.technologi}
                            techLabel={project.techLabel}
                            projectMeta={project.projectMeta}
                            langueVersionLabel={project.langueVersionLabel}
                            download={this.props.download}
                            content={project.content}
                        />
                        }
                        {project && <Vote
                            starRating={project.starRating}
                            userStar={project.userStar}
                            starCount={project.starCount}
                            numberVote={project.numberVote}
                            ratingProject={this.props.ratingProject}
                            id={project.id}
                            comment={comment}
                            commentCallBack={this.props.commentCallBack}
                        />}
                        <Recomment />
                    </Suspense>
                </CContainer>
            </main>
        )
    }
}

