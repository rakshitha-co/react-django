//import React from "react";
import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "./Head";
const PostList = () =>{

    const [post, setPost]= useState([])
    
    const getPost = async () => {
        const response= await axios.get('http://localhost:8000/api/post/')
        setPost(response.data)
    }

    useEffect(()  => {
        getPost();
    }, [])
    return (
        <div>
            <div className="heading">
                <h1 className="blog-head">Django Blog</h1>    
           
                <Head></Head>            
            </div>
            {
                post.map((post,index) => (
                // <div className="ui-post" key={post.id}>
                //     <br />
                //     <h3 className="Post-title"><Link to={`/${post.id}`}>{post.title}</Link></h3>
                //     <h3 className="post-author">{post.author}</h3>
                //     <p className="post-text">{post.text}</p>
                //     <p className="post-date">{post.created_date}</p>
                //     <Link to={`/${post.id}`}>comment</Link>
                    
                //  </div>
            //     <div className="card" >
            //     <div className="card-body">
            //       <h5 className="card-title" ><Link to={`/${post.id}`}>{post.title}</Link></h5>
            //       <h6 className="card-subtitle mb-2 text-body-secondary">{post.author}</h6>
            //       <p className="card-text">{post.text}</p>
            //       <Link to={`/${post.id}`} className="card-link">comment</Link>
                  
            //     </div>
            //   </div>
            <div className="card">
                <h5 className="btn btn-info btn-lg"><Link to={`/${post.id}`}>{post.title}</Link></h5>
                <div className="card-body">
                    <h5 className="card-title">{post.author}</h5>
                    <p className="card-text">{post.text}</p>
                    <p className="post-date">{post.created_date}</p>
                    <Link to={`/${post.id}`} className="btn btn-outline-primary">comment</Link>
                    
                </div>
            </div>
                )
                )
            }
        </div>
    );
};

export default PostList;