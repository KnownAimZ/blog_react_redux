import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.scss';
import UserList from './users/UserList.jsx';
import Header from './Header.jsx';
import PostList from './posts/PostList';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/posts">
            <PostList />
          </Route>
        </Switch>                
      </div>
    </Router>
  );
}

export default App;
