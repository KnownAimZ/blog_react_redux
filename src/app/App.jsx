import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import UserList from '../users/UserList.jsx';
import Header from './Header.jsx';
import PostList from '../posts/PostList';
import UserPage from '../users/UserPage';
import Login from '../auth/Login';
import Register from '../auth/Register';
import MyPage from '../users/MyPage';
import PostCreator from '../posts/PostCreator';
import PostPage from '../posts/PostPage';
import './App.scss';
import ClassCreatePost from '../multiple_block/ClassCreatePost.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <div className="content">
        <Switch>
          <Route exact path="/">
              <Redirect to="/login" />
          </Route>  
          <Route path="/users/:id">
            <UserPage/>
          </Route>
          <Route path="/posts/:id">
            <PostPage />
          </Route>
          <Route path="/postcreate/:id">
            <PostCreator />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route exact path="/posts">
            <PostList title={'Post List'} withControls />
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route exact path="/lc">
            <MyPage />
          </Route>          
          <Route path="/postcreate">
            <PostCreator />
          </Route>
          <Route exact path="/index.html">
              <Redirect to="/login" />
          </Route>
          <Route exact path="/multiple">
            <ClassCreatePost/>
          </Route> 
        </Switch>   
        </div>             
      </div>
    </Router>
  );
}

export default App;
