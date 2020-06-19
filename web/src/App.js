import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

import NavBar from './components/NavBar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import StockList from './pages/StockList'

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <NavBar />
                <Route component={Home} path='/' exact />
                <Route component={Register} path='/register' />
                <Route component={Login} path='/login' />
            </BrowserRouter>
        </div>
    )
}

export default App
