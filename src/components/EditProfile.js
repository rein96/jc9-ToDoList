import React, { Component } from 'react'

import { connect } from 'react-redux'
import axios from '../config/axios';

class EditProfile extends Component {

    state = {
        profile: null
    }

    getProfile = async () => {
        const res = await axios.get(`/users/${this.props.userid}`)
        this.setState( { profile: res.data } )
        console.log(this.state.profile)
    }

    componentDidMount() {
        this.getProfile();
    }

    updateProfile = async () => {

        const formData = new FormData()

        const newPicture = this.avatar.files[0]
        const newName = this.name.value
        const newEmail = this.email.value
        const newAge = this.age.value
        const newPassword = this.password.value

        formData.append('avatar', newPicture )
        formData.append('name', newName )
        formData.append('email', newEmail )
        formData.append('age', newAge )
        formData.append('password', newPassword )
        console.log(formData)
        console.log(formData.append)
        //  'avatar' = nama field ato key  ||  'newPicture' = data baru nya
    
        const res = await axios.patch(`/users/${this.props.userid}`, formData)
        console.log(res);
    }

    render() {

        if(this.state.profile !== null ){
            var {name, email, age} = this.state.profile

            return (
                    <div className='container'>
                        <form>
                            <h1>Edit Profile</h1>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input ref={input => this.name = input} type="text" className="form-control" id="name" defaultValue={name}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input ref={input => this.email = input} type="email" className="form-control" id="email" defaultValue={email}/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="age">Age</label>
                                <input ref={input => this.age = input} type="number" className="form-control" id="age" defaultValue={age}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input ref={input => this.password = input} type="password" className="form-control" id="password"/>
                            </div>
                            <div className='custom-file'>
                                <input type='file' ref={input => {this.avatar = input}}/>
                            </div>
                        </form>
                        
                        <button
                            className='btn btn-primary'
                            onClick={this.updateProfile}
                        >Update Profile</button>
                    </div>
            )
        }

        return <center> <h1> Loading... </h1> </center>

    }
}

const mapStateToProps = state => {
    return {
        userid: state.auth.id
    }
}

export default connect(mapStateToProps)(EditProfile);