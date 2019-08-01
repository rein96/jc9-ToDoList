import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import cookies from 'universal-cookie'
import {connect} from 'react-redux'

import {keepLogin} from '../actions'

import Home from './Home'
import Header from './Header'
import Register from './Register'
import Login from './Login'
import Profile from './Profile'
import EditProfile from './EditProfile'

const cookie = new cookies()

class App extends Component {
    componentWillMount(){
        var user = cookie.get('dataUser')

        // User pada cookie di temukan
        if(user){
            // Kirim id dan name ke redux
            this.props.keepLogin(user)
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Route path='/' exact component={Home}/>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
                <Route path='/profile' component={Profile} />
                <Route path='/editprofile' component={EditProfile} />
            </BrowserRouter>
        )
    }
}

export default connect(null, {keepLogin})(App)