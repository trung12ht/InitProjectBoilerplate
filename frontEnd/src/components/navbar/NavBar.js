import React, { Component, Suspense } from 'react'
import {
    CNavbar,
    CToggler,
    CNavbarBrand,
    CCollapse,
    CNavbarNav,
    CNavLink,
    CForm,
    CInput,
    CButton,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CImg
} from '@coreui/react'
import '../navbar/navbar.scss'
import Bold from '../../pages/listProject/components/Bold';
import Avatar from '../../pages/project/components/Avatar';

export default class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }


    componentDidMount() {
        this.callApi()
    }

    callApi() {
        // if (!this.props.project) {
        //     this.props.getProject(getLastPath())
        // }
        // if (!this.props.comment) {
        //     this.props.getComment(getLastPath())
        // }
    }

    setIsOpen = (s) => {
        this.setState({
            isOpen: !s
        })
    }


    render() {

        return (
            <div>
                <CNavbar expandable="sm" color={"info"} style={{
                    backgroundColor: "#0000 !important",
                    marginBottom: "10px",
                }} >
                    <CToggler inNavbar onClick={() => this.setIsOpen(this.state.isOpen)} />
                    <CNavbarBrand>
                        INIT PROJECT
        </CNavbarBrand>
                    <CForm inline>
                        <CInput
                            className="mr-sm-2"
                            placeholder="Search"
                            size="sm"
                            style={{
                                width: "300px"
                            }}
                        />
                    </CForm>
                    <CCollapse show={this.state.isOpen} navbar>
                        <CNavbarNav>
                            <CNavLink><Bold text="Home"></Bold></CNavLink>
                            <CNavLink><Bold text="Explore"></Bold></CNavLink>
                            <CNavLink><Bold text="Topic"></Bold></CNavLink>
                            <CNavLink><Bold text="Trending"></Bold></CNavLink>
                        </CNavbarNav>
                        <CNavbarNav className="ml-auto">
                            {/* <CDropdown
                                inNav
                            >
                                <CDropdownToggle color="primary">
                                    Lang
                </CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem>EN</CDropdownItem>
                                    <CDropdownItem>ES</CDropdownItem>
                                    <CDropdownItem>RU</CDropdownItem>
                                    <CDropdownItem>FA</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown> */}
                            <CDropdown
                                inNav
                                style = {{padding: "0px"}}
                            >
                                <CDropdownToggle color="primary" style = {{padding: "0px"}}>
                                    <Avatar src="https://www.w3schools.com/howto/img_avatar.png" size="30px"></Avatar>
                </CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem>Account</CDropdownItem>
                                    <CDropdownItem>Change password</CDropdownItem>
                                    <CDropdownItem>Post project</CDropdownItem>
                                    <CDropdownItem>Management project</CDropdownItem>
                                    <CDropdownItem>Log out</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </CNavbarNav>
                    </CCollapse>
                </CNavbar>
            </div>
        )
    }
}

