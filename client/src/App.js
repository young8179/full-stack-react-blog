
import './App.css';
import Posts from './components/Posts';
import {Container, Segment, Header} from "semantic-ui-react"
import { Link, Route, Switch } from 'react-router-dom';
import PostDetail from './components/PostDetail';

function App() {


  return (
    <Container>
      <Segment vertical>
        <Switch>
          <Route path="/" exact component={Posts} />
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
