import React, { Component } from 'react'
import axios from '../config/axios';
import { Jumbotron } from 'reactstrap';
import {connect} from 'react-redux'

class Profile extends Component {
    // state = {
    //     picture: null
    // }

    // arrayBufferToBase64(buffer) {
    //     let binary = '';
    //     let bytes = [].slice.call(new Uint8Array(buffer));  // Array with thousands index
    //     bytes.forEach( (byte) => binary = binary + String.fromCharCode(byte) );
    //     // console.log(binary)             //  format binary =  �PNG����IHDR���ú���M�����¦6å���� ...
    //     return window.btoa(binary);     // iVBORw0KGgoAAAANSUhEUgAAAPoAAAFNCAIAAA ...
    // };

    // displayPicture = async () => {
    //     // Get Profile
    //     const res = await axios.get('/users/' + this.props.data_id)
            
    //     const base64Flag = 'data:image/jpeg;base64,';
    //     const imageStr = this.arrayBufferToBase64(res.data.avatar.data);    
    //     const picture = base64Flag+imageStr

    //     this.setState( { picture: picture } )

    // }

    // componentDidMount() {
    //     this.displayPicture()
    // }


    render() {
        // if(this.state.picture !== null){
            return (
                <div className="container mt-5">
                    <Jumbotron>
                        {/* HARD WAY : Convert from buffer format to base64 */}
                        {/* <img src={this.state.picture}  alt="Please choose your avatar" key={new Date()} /> */}
                        {/* EASY WAY */}
                        <img src={`https://reinhartmongoose-todolist.herokuapp.com/users/${this.props.data_id}/avatar`}  alt="Please choose your avatar" key={ new Date() }  />
                        <h1 className="display-3">Hello, {this.props.data_name} !</h1>
                        <p className="lead"></p>
                    </Jumbotron>
                </div>
            )
        // }

        // return <h1>Loading</h1>
    }
}

const mapStateToProps = state => {
    return {
        data_name: state.auth.name,
        data_id: state.auth.id
    }
}

export default connect(mapStateToProps)(Profile)