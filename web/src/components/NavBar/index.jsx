import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

const NavBar = () => (
    <div className='navbar-container'>
        <nav className='navigation'>
            <h3 id='title'>Stock Tracker</h3>

            <div className='links'>
                <Link className='navigation-link' to='/'>Home</Link>
                <Link className='navigation-link' to='/login'>Login</Link>
                <Link className='navigation-link' to='/dashboard'>Dashboard</Link>
                <Link className='navigation-link' to='/register'>Register</Link>
            </div>
        </nav >
    </div >
)

export default NavBar
