import './App.css';
import PostList from './constants/PostList';
import NavBar from './constants/NavBar';
import Draft from './constants/Draft';
import AddPost from './constants/AddPost';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom'

import PostDetail from './constants/PostDetail';
import Comment from './constants/Comment';
import Login from './constants/Login';
import Logout from './constants/Logout';
import Signup from './constants/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {


  return ( <>
    <div className="App">
    <Router>
        <NavBar />
        
        <Routes>
            <Route exact path="/" Component={PostList} />
            <Route exact path="/add" Component={AddPost} />
            <Route exact path="/draft" Component={Draft} />
            
            <Route exact path="/:postId" Component={PostDetail} />
            
            <Route exact path="/:postId/comment" Component={Comment} />
            
            <Route exact path="/login" Component={Login} />
            <Route exact path="/logout" Component={Logout} />
            <Route exact path='/signup' Component={Signup} />
        </Routes>  
      </Router>
    </div>
    </>
  );
}


export default App;
