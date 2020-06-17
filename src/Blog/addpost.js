import React, { Component } from 'react'
import axios from 'axios'

import history from '../utils/history'

import { connect } from 'react-redux'



class Addpost extends Component {

handlesubmit = (e) => {
    e.preventDefault()

    const user_id = this.props.db_profile[0].user_id
    const username = this.props.db_profile[0].username

    const data = {
        title: e.target.input_title.value,
        body: e.target.text_area.value,
        username: username,
        uid: user_id
    }

    axios.post('/api/post/posttodb',data)
        .then(res => console.log(res))
        .catch((err) => console.log(err))
        .then(setTimeout(() => history.replace('/')), 700)
}


    render() {
        return (
            <div>
                <form onSubmit={this.handlesubmit} id="userform">
                    <label id="label_title" >Title: </label>
                    <input id="input_title" type="text" />
                    <br />
                    <label id="label_body" >Body: </label>
                    <textarea id="text_area" name="post" form="userform" >Enter post here</textarea>
                    <br />
                    <button type="submit" >Submit</button>
                </form>
                <br />
                <button onClick={() => history.replace('/posts')}>Cancel</button>
            </div>
        )
    }
}

function mapStatToProps(state){
    return {
        db_profile: state.auth_reducer.db_profile
    }
}


export default connect(mapStatToProps)(Addpost)
