import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';

const AddPost = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [authenticated, setAuthenticated] = useState(false);
  const [usergroup, setUserGroup] = useState([]);
  const [isadmin, setIsadmin] = useState(false) 
  const {uid} = useParams()
  const [user, setUser] = useState(null);
  useEffect(() => {
    
    setAuthenticated(!!token);
    const getGroups = async () => {
        try {
            if(!token){
                return
            }
            const response= await axios.get('http://localhost:8000/api/loginuser', {
                headers: {
                    Authorization: `Token ${token}`,
                  }, 
            });
            const usergroups = response.data.groups
            console.log(usergroups)
            const isAdminuser = usergroups.includes(1);
            console.log(isAdminuser)
            if(isAdminuser){
                setIsadmin(true)
            }
            console.log(isadmin)
            console.log(response.data)
        }
        catch (error) {
            console.error('Error fetching user groups:', error.message);
        }
    }
    getGroups()
  }, [token]);

  const AddPostInfo = async (uid) => {
    try {
        //console.log(authenticated)
      if (!token) {
        console.error('User not authenticated. Post not added.');
        return;
      }

      const response = await axios.post('http://localhost:8000/api/post/add/', {
        author: author,
        title: title,
        text: text
      }, {
        headers: {
          'Authorization': `token ${token}`,
        },
      });
      const usergroup =response.data.groups;
      //console.log(response.data.groups)
      console.log('Post added successfully:', response.data);
      navigate('/');

    } catch (error) {
      console.error('Error adding post:', error.message);
    }
  };

  return (
    <div>
      <div className="heading">
        <h1 className="blog-head">Add Blog</h1>
      </div>

      {authenticated ? (
        isadmin ? (
            <>
        {/* <div className="your-form-container">
        <div className="form-group">
            <div className="input-group">
              <label htmlFor="author">Author Name:</label>
              <input
                type="text"
                id="author"
                className="form-control"
                placeholder="Enter the author name"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                className="form-control"
                placeholder="Enter the title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="text">Detail:</label>
              <textarea
                id="text"
                className="form-control"
                placeholder="Enter the Detail"
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <button className="btn btn-success" onClick={AddPostInfo}>
              Save
            </button>
        </div>
        </div>  */}
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">{author}</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="enter your name" name="author" value={author}
            onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">{title}</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="enter post title" name="title" value={title}
            onChange={(e) => setTitle(e.target.value)} />
        </div>
            <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">{text}</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="enter details" name="text" value={text}
            onChange={(e) => setText(e.target.value)}></textarea>
        </div>
        <button className="btn btn-success" onClick={AddPostInfo}>
              Save
        </button>
       </> 
        ) : (
            <h3>you are not authorized to add new post</h3>
        )
      ) : (
        <div>
        <h4>You need to login before adding post</h4>
        <Link to='/login'>Login</Link>
        </div>
      )}
    </div>
  );
};

export default AddPost;
