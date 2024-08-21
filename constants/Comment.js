import React, {useState} from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Comment= () => {

    const { postId } = useParams();
    const [C_author, setC_author]=useState("")
    const [text, setText]=useState("")
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const AddCommentInfo = async () => {
        try {
            const response= await axios.post(`http://localhost:8000/api/post/${postId}/comment/add`, {
                post: postId,
                C_author : C_author,
                text :text
            }, {
                headers: {
                    'Authorization': `token ${token}`,
                }
            });
            console.log('Post added successfully:', response.data);
            navigate(`/${postId}`)

        } catch (error) {
            console.error('Error adding comment:', error.message);
        }
    }

    return(
        <div><div className="heading">
            <h4 className="blog-head">Add Comment</h4>
            </div>
            {token ? (
                <>
            {/* <div className="your-form-container">
                <div className="form-group">
                    <div className="input-group">
                        <label htmlFor="author">Name:</label>
                            <input
                                type="text"
                                id="author"
                                className="form-control"
                                placeholder="Enter your name"
                                name="C_author"
                                value={C_author}
                                onChange={(e) => setC_author(e.target.value)}            
                             />
                    </div>
                    <div className="input-group">
                        <label htmlFor="text">Comment:</label>
                            <textarea
                                id="text"
                                className="form-control"
                                placeholder="Enter your comment"
                                name="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}           
                            />
                    </div>
                        <button className="btn btn-success" onClick={AddCommentInfo} >
                            Save
                        </button>
                </div>
            </div> */}
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">{C_author}</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="enter your name" name="author" value={C_author}
                onChange={(e) => setC_author(e.target.value)} />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">{text}</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="enter the comment" name="text" value={text}
                onChange={(e) => setText(e.target.value)}></textarea>
            </div>
            <button className="btn btn-success" onClick={AddCommentInfo} >
                            Save
                        </button>
                </>
            ) : (
                <div>
                    <h4>Login requires to comment on post</h4>
                    <Link to='/login'>Login</Link>
                </div>
            )}

        </div>
    )
}

export default Comment