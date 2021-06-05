import './App.css';
import {Navbar} from './components/Navbar/Navbar'
import Projects from './components/Projects'
import Tasks from './components/Tasks'
import {Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
          <Route exact path="/" render={() => <Projects />} />
          <Route path="/tasks/:project_id" render={() => <Tasks />} />
          <Route path="/tasks" render={() => <Tasks />} />
      </Switch>
    </div>
  );
}

export default App;
