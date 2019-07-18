import React, { Component } from 'react'
import axios from '../config/axios';
import { Jumbotron } from 'reactstrap';
import {connect} from 'react-redux'

class Profile extends Component {
    state = {
        data: null
    }

    arrayBufferToBase64(buffer) {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach( (byte) => binary = binary + String.fromCharCode(byte) );
        // console.log(binary)
        return window.btoa(binary);
    };

    displayPicture = async () => {
        // Get Profile
        const res = await axios.get('/users/' + this.props.data_id)
            
        const base64Flag = 'data:image/jpeg;base64,';
        const imageStr = this.arrayBufferToBase64(res.data.avatar.data);    
        console.log(imageStr);
        const picture = base64Flag+imageStr
        // console.log(picture)

        this.setState( { data: picture } )

    }

    componentDidMount() {
        this.displayPicture()
    }


    render() {
        if(this.state.data){
            return (
                <div className="container mt-5">
                    <Jumbotron>
                        <img src={this.state.data}  alt="Please choose your avatar" key={new Date()} />
                        <h1 className="display-3">Hello, {this.props.data_name} !</h1>
                        <p className="lead"></p>
                    </Jumbotron>
                </div>
            )
        }

        return <h1>Loading</h1>
    }
}

const mapStateToProps = state => {
    return {
        data_name: state.auth.name,
        data_id: state.auth.id
    }
}

export default connect(mapStateToProps)(Profile)