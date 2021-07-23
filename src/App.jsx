import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.scss';
import UserList from './users/UserList.jsx';
import Header from './Header.jsx';
import PostList from './posts/PostList';
import UserPage from './users/UserPage';
import Login from './auth/Login';
import Register from './auth/Register';
import MyPage from './users/MyPage';
import PostCreator from './posts/PostCreator';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route path="/users/:id">
            <UserPage/>
          </Route>
          <Route exact path="/users">
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
          <Route exact path="/postcreate">
            <PostCreator />
          </Route>
        </Switch>                
      </div>
    </Router>
  );
}

export default App;
