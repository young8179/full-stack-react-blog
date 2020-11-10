
import './App.css';
import Posts from './components/Posts';
import {Container, Segment, Header} from "semantic-ui-react"
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import PostDetail from './components/PostDetail';
import { useState, useEffect } from 'react';
import Index from './components/index/Index';
import Login from './components/login/Login';
import AdminPosts from './components/admin/AdminPost';
import AdminPD from './components/admin/AdminPD';

function App() {
  


  return (
    <Container>
      <Segment vertical>
        <Switch>
          <Route path="/" exact component={Index} />
          {/* <Route path="/login" exact component={Login} /> */}

          <Route path="/post" exact component={Posts} />
          <Route path="/post/admin" exact component={AdminPosts} />
          <Route path="/post/admin/:postId" component={AdminPD} />
          <Route path="/post/:postId" component={PostDetail} />
          {/* fallback page -404 */}
          <Route >
            <Segment>
              <Header>404 - page not found</Header>
              <Link to="/">Click here to return</Link>
            </Segment>
          </Route>
        </Switch>
      </Segment>
    </Container>




   
  );
}

export default App;
