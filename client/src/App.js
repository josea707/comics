import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Comics from './components/Comics';
import About from './components/About';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import NotFoundPage from './components/NotFoundPage';
function App() {
  return (
    <Router>
      <div className='grid-container'>
        <Route component={NavBar} />
        <main>
          <Switch>
            <Route exact path={['/', '/:comicNum']} component={Comics} />
            <Route exact path='/info/about' component={About} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
        <Route component={Footer} />
      </div>
    </Router>
  );
}

export default App;
