import React, { Component, Suspense } from 'react'
import Cards from './components/Card'
import Filter from './components/Filter'
import ViewMore from './components/ViewMore'
import {
  CContainer,
} from '@coreui/react'
import getLastPath from './untils/until'
import Loading from '../../components/loadingAnimation'
import NavBar from '../../components/navbar/NavBar'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

export default class ListProject extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    this.callApi()
  }

  async callApi() {
    try {
      if (getLastPath() >= 1 && getLastPath() <= 3) {
        this.props.getListProjectFilterStar(getLastPath())
        return
      }
    } catch (e) {
    }
    if (!this.props.projects) {
      this.props.getListProject()
    }
    await this.props.getLabel()
  }

  render() {
    const { projects, loading, label, numberRs, quantity, lastAction, requestBody, index } = this.props
    const filterStar = getLastPath()
    return (
      <main className="c-main">
        <NavBar></NavBar>
        <CContainer fluid>
          <Suspense fallback={loading}>
            {loading ? <Loading></Loading> : <></>}
            {label && <Filter filterStar={filterStar}
              getListProject={this.props.getListProject}
              getListProjectFilterStar={this.props.getListProjectFilterStar}
              label={label}
              getNumberRs={this.props.getNumberRs}
              getResult={this.props.getResult}
              numberRs={numberRs}
              sorted={this.props.sorted}
            />}
            {projects && projects.map((p, i) =>
              <Cards
                name={p.name}
                title={p.title}
                content={p.content}
                laguage={p.laguage}
                technologi={p.technologi}
                views={p.views}
                uses={p.uses}
                user={p.user}
                starRating={p.starRating}
                numberVote={p.numberVote}
                update={p.update}
                id={p.id}
                index={i}
                userStar={p.userStar}
                ratingProject={this.props.ratingProject}
              />
            )}
            <ViewMore viewMore = {this.props.viewMore} quantity={quantity} lastAction={lastAction} filterStar = {this.props.filterStar} requestBody = {requestBody} index = {index}/>
          </Suspense>
        </CContainer>
      </main>
    )
  }
}

