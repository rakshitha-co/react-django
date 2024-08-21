import React from "react";
import { useParams } from 'react-router-dom';
import {useState, useEffect} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PostDetail = () =>{
    const { postId } = useParams();
    const [post, setPost]= useState([])
    const navigate = useNavigate();
    const [comment, setComment] = useState([])
    const {commentId} = useParams();
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    
    const getPost = async () => {
        const response = await axios.get(`http://localhost:8000/api/post/${postId}`); 
        setPost(response.data);
      };

      const getComment = async () => {
        const response = await axios.get(`http://localhost:8000/api/post/${postId}/comment`);
        setComment(response.data)
      }
    
      useEffect(() => {
        getPost(); 
        getComment();
      }, []);

      const savePost = async () => {
        try {
            //console.log(post)
            await axios.put(`http://localhost:8000/api/post/${postId}/pub`, post, {
                  headers:{
                    'Authorization': `token ${token}`,
                  }
            });
            navigate('/')
        } catch (error) {
          console.error('Error saving post:', error.message);
        }
      };

      const deletePost =async () => {
        try {
            await axios.delete(`http://localhost:8000/api/post/${postId}/del`, {
              headers:{
                'Authorization': `token ${token}`,
              }
        })
            navigate('/')
        } catch (error) {
            console.error('Error deleting post:', error.message);
        }
      }

      const approve = async (commentId) => {
        try{
            const selectedComment = comment.find((c) => c.id === commentId);
            //console.log(selectedComment)
            await axios.put(`http://localhost:8000/api/post/${postId}/comment/${commentId}/app`, selectedComment, {
              headers:{
                'Authorization': `token ${token}`,
              }
        });
            navigate('/')
        } catch (error) {
            console.error('Error saving comment:', error.message);
        }
      }

      const deleteComment = async (commentId) => {
        try {
          await axios.delete(`http://localhost:8000/api/post/${postId}/comment/${commentId}/del`, {
            headers:{
              'Authorization': `token ${token}`,
            }
      })
          navigate('/')
        } catch (error) {
            console.error('Error deleting comment:', error.message);
        }
      }

      return (
        <div>
            <div className="heading">
            <h3 className="blog-head">Post Detail</h3>
            </div>
            {
                
                <div className="ui-post">
                    <br />
                    <h3 className="Post-title">{post.title}</h3>
                    <h3 className="post-author">{post.author}</h3>
                    <p className="post-text">{post.text}</p>
                    <p className="post-date">{post.created_date}</p>
                    <div>
                    { token ? (
                      <div>
                    {post.published_date === null && (
                    <button className="button" onClick={savePost}>Save</button>
                    )}
                    <button className="button-del" onClick={deletePost}>Delete</button>
                    </div>
                    ) : (
                      <div>
                      <h4>Login require to save or delete the post</h4>
                      <Link to='/login'>login</Link>
                      <br />
                      </div>
                    )}
                    </div>
                    <br />
                    <h4 className=""> <Link to={`/${post.id}/comment`}>Add comment</Link></h4>
                    <ul>
                        {comment.map((comment) => (
                            <li key={comment.id}>
                                <br />
                                <br />
                                <p>Author : {comment.C_author}</p>
                                <p>Comment : {comment.text}</p> 
                                <p>Created date : {comment.created_date}</p>
                                { token ? (
                                <div>
                                {comment.approved_comment === false && (
                                    <button className="" onClick={() => approve(comment.id)}>Approve</button>
                                )}
                                <button className="" onClick={() => deleteComment(comment.id)}>Delete</button>
                                  </div>
                                ) : (
                                    <div>
                                      <h4>Login require to approve or delete the comment</h4>
                                      <Link to='/login'>Login</Link>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>                    
                 </div>  
            }
        </div>
    );
};

export default PostDetail;