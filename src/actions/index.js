import axios from '../config/axios'
import cookies from 'universal-cookie'

const cookie = new cookies()

export const onLogin = (da_email, da_password) => {

    // Function yang akan di running oleh redux-thunk (middleware)
    return (dispatch) => {
        axios.post(
            '/users/login',
            {
                email: da_email,
                password: da_password
            }
        ).then(res => {
            // Jika data salah, res.data berisi string
            if(typeof(res.data) == 'string'){
                // Print errornya
                console.log('Eror: ' + res.data)
            } else {

                // Simpan id dan name di cookie
                cookie.set(
                    'dataUser',
                    {
                        id: res.data._id,
                        name: res.data.name
                    }
                )

                // Kirim id dan name ke redux
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        id: res.data._id,
                        name: res.data.name
                    }
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

}

export const keepLogin = (user) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            id: user.id,
            name: user.name
        }
    }
}

export const onLogout = () => {
    cookie.remove('dataUser')

    return{
        type: 'LOGOUT',
    }
}