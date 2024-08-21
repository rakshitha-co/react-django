import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
const Draft = () =>{

    const [post, setPost]= useState([])
    
    const getPost = async () => {
        const response= await axios.get('http://localhost:8000/api/post/draft')
        setPost(response.data)
    }
    useEffect(()  => {
        getPost();
    }, [])

    return (
        <div>
        <div className="heading">
            <h1 className="blog-head">Draft Post</h1>
        </div>
        {
            post.map((post, index) => (
                <div className="card">
                <h5 className="btn btn-info btn-lg"><Link to={`/${post.id}`}>{post.title}</Link></h5>
                <div className="card-body">
                    <h5 className="card-title">{post.author}</h5>
                    <p className="card-text">{post.text}</p>
                    <p className="post-date">{post.created_date}</p>
                    <Link to={`/${post.id}`} className="btn btn-outline-primary">comment</Link>
                    
                </div>
            </div>
            ))
        }
        </div>
    );
};

export default Draft;