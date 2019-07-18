import React, { Component } from 'react'
import axios from '../config/axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { async } from 'q';
import { tsImportEqualsDeclaration } from '@babel/types';

class Home extends Component {
    state = {
        tasks: []
    }

    // pressEnter = (event) => {
    //     event.preventDefault()
    //     this.addTask()
    //     document.getElementById('inputTask').value = ''
    // }

    addTask = (userid) => {
        const description = this.task.value

        // Post task baru
        axios.post(
            '/tasks/' + userid,
            {
                description
            }
        ).then(() => {
            // Get tasks
            axios.get(
                '/tasks/' + this.props.id
            ).then(res => {
                this.setState({tasks: res.data.tasks})
            })
        })

    }

    componentDidMount(){
        // Get Tasks
        axios.get(
            '/tasks/' + this.props.id
        ).then(res => {
            console.log(res.data);
            
            this.setState({tasks: res.data.tasks})
        })
    }

    // getTask = async(userid) => {
    //     const getTaskRes = await axios.get(`/tasks/${userid}`)

    // }

    taskDone = async (userid, taskid) => {
        await axios.patch(`/tasks/${userid}/${taskid}`)
        // this.getTask()

        const getTaskRes = await axios.get(`/tasks/${userid}`)

        this.setState( { tasks: getTaskRes.data.tasks  } )
    }

    deleteTask = async (userid, taskid) => {
        try {
            await axios.delete(`/users/${userid}/${taskid}`)

            const getTaskRes = await axios.get(`/tasks/${userid}`)

            this.setState( { tasks: getTaskRes.data.tasks  } )
            
        } catch (err) {
            console.error(err)
        }
    }

    renderTasks = () => {
        return this.state.tasks.map(item => {
            if(!item.completed){
                return (
                    <li className='list-group-item d-flex justify-content-between' onDoubleClick={ () => this.deleteTask(this.props.id, item._id  )}>
                        <span>{item.description}</span>
                        <span>
                            <button onClick={ () => {this.taskDone(this.props.id, item._id)} } className='btn btn-primary'>
                                Done
                            </button>
                        </span>
                    </li>
                )
            }

            return (
                <li className='list-group-item d-flex justify-content-between bg-dark' onDoubleClick={ () => this.deleteTask(this.props.id, item._id  )}>     
                <p className='text-light'> {item.description} </p>
                    <span>
                        <button onClick={ () => {this.taskDone(this.props.id, item._id)} } className='btn btn-danger'>
                                I'm not done yet
                        </button>
                    </span>
                </li>
            )
        })
    }

    render() {
        // Jika user sudah login
        if(this.props.id){
            return (
 
                    <div className="container" >
                        {/* <form onSubmit={this.pressEnter()}> */}
                            <h1 className="display-4 text-center animated bounce delay-1s">List Tasks</h1>
                            <form className="form-group mt-5">
                                <input id="inputTask" type="text" className="form-control" placeholder="What do you want to do ?" ref={input => this.task = input}/>
                            </form>
                            <button type="submit" className="btn btn-block btn-success mt-3" onClick={() => this.addTask(this.props.id)}> Add New Task </button>
                        
                            <ul className="list-group list-group-flush mb-5">
                                {this.renderTasks()}
                            </ul>
                        {/* </form> */}
                    </div>


            )
        }

        return <Redirect to='/login'/>
        
    }
}

const mps = state => {
    return {
        id: state.auth.id
    }
}

export default connect(mps)(Home)