import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.scss';
import UserList from './users/UserList.jsx';
import Header from './Header.jsx';
import PostList from './posts/PostList';
import UserPage from './users/UserPage';

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
        </Switch>                
      </div>
    </Router>
  );
}

export default App;
