import React, { Component } from 'react'
import { connect } from 'reat-redux'
import axios from 'axios'


const RenderComments = (comment) => (
        <div>
            <h3>{comment.comment.comment}</h3>
            <small>{comment.comment.date_created}</small>
            <p>By: { comment.comment.author }</p>
            {comment.cur_user_id === comment.comment.user_id 
            ? <button onClick={() => {
            this.handleClickOpen(comment.comment.cid, comment.comment.comment)}}>
                Edit
              </button> 
            : null
            }
        </div>
    )

class Showpost extends Component {
  constructor(props){
      super(props)

        this.state = {
            open: false,
            comment: '',
            cid: '',
        }
  }

componentDidMount(){
    axios.get('/api/get/allpostcomments', {params: {this.props.location.state.post.post.pid}})
      .then(res => this.props.set_comments(res.data))
      .catch((err) => console.log(err))
}


  handleClickOpen = (cid,comment) => {
    this.setState({
        open: true,
        comment: comment,
        cid: cid,
    })
  }

  handleClose = () => {
      this.setState({
          open: false,
          comment: '',
          cid: '',
      })
  }
    
  handleCommentChange = (e) => {
      this.setState({
          comment: e.target.value
      })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const user_id = this.props.db_profile[0].uid
    const post_id = this.props.location.state.post.post.post_id
    const username = this.props.db_profile[0].username
    const data = {comment: e.target.comment.value}
    
  }


    render() {
        console.log(this.props)
        return (
            <div>
                <div>
                    <h2>{this.props.location.state.post.post.title}</h2>
                    <p>{this.props.location.state.post.post.title}</p>
                    <p>{this.props.location.state.post.post.title}</p>
                </div>
                <div>
                    <h2>Comments:</h2>
                    {this.props.comments
                    ? this.props.comments.map(comment => 
                        <RenderComments 
                        comment={comment} 
                        cur_user_id={this.props.db_profile[0].uid} 
                        key={comment.cid}/> 
                        )
                    : null
                    }
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                    <textarea id="comment" />
                    <br />
                    <button type="submit">Submit</button>
                    </form>
                    <div open={this.state.open} 
                              onClose={this.handleClose}>
                        
                        <h3>edit comment</h3>
                        <section>
                            <input type="text" 
                            value={this.state.comment}
                            onChange={this.handleCommentChange}
                            />
                        </section>
                        <div>
                          <section>
                            <button onClick={() => {this.handleUpdate(); this.setState({open:false})}} >
                                agree
                            </button>
                            <button onClick={() => this.handleClose()}>
                               cancel
                            </button>
                            <button onClick={() => this.handleDeleteComment()}>
                                delete
                                </button>
                          </section>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        comments: state.post_reducer.comments,
        db_profile: state.auth_reducer.db_profile,
    }
}

function mapStateToDispatch(dispatch){
    return {
        set_comments: (comments) => dispatch(ACTIONS.fetch_post_comments(comments)),
    }
}

export default connect(mapStateToProps,mapStateToDispatch)(Showpost)
