import React, { useState } from 'react'
import { Navbar, NavbarBrand, NavItem } from 'react-bootstrap'
import Drawer from '../Drawer/Drawer'
import HamburgerIcon from '../../assets/hamburger.svg'
import tdb_logo from '../../assets/tdb-tag-white-en.png'

import './Header.scss'

export default function Header() {

  const [showSidebar, setShowSidebar] = useState(false)

  function handleClick(){
    console.log('click')
    setShowSidebar(true)
  }
  return (
    <>
        <Navbar className='px-3 d-flex align-items-baseline shadow-sm'>
          <NavbarBrand onClick={handleClick} style={{cursor:'pointer'}} className=''>
            <img src={HamburgerIcon} alt="Menu" width='20' height='20' />
          </NavbarBrand>
          <NavItem className='header-nav-item fs-5'>
            <img src={tdb_logo} width='258px' height='53px' alt="Logo" />
          </NavItem>
        </Navbar>
        <Drawer show={showSidebar} onHide={()=> setShowSidebar(false)}/>
    </>
  )
}
