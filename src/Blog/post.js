import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import * as ACTIONS from '../store/actions/actions'
import axios from 'axios'



const RenderPosts = (post) => {
    return (
        <div>
            <Link to={{pathname: '/post/' + post.post.pid, state:{post}}}> <h4>{post.post.title}</h4></Link>
            <br />
            <p>{post.post.body}</p>
      
        </div>
    )
}

class Post extends Component {

componentDidMount(){
    axios.get('/api/get/allposts')
      .then(res => this.props.set_posts(res.data))
      .catch((err) => console.log(err))
}


    render() {
        return (
            <div>
                <Link to="/newpost">
                    <button>Add Post</button>
                </Link>
                <h1>POSTS</h1>
                <section>
                    <p>Title</p>
                     <div>
                         {this.props.posts
                        ? this.props.posts.map(post => (
                        <RenderPosts key={post.pid} post={post} />
                        ))
                        : null
                         }
                     </div>
                </section>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        posts: state.post_reducer.posts
    }
}

function mapDispatchToProps(dispatch){
    return {
        set_posts: (posts) => dispatch(ACTIONS.fetch_db_posts(posts))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Post)
