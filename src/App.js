import './App.css';
import Home from './components/Home.jsx';
import VideoGameCreate from './components/VideoGameCreate.jsx';
import LandingPage from './components/LandingPage.jsx';
import Detail from './components/Detail.jsx';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/videogame' component={VideoGameCreate} />
      <Route exact path='/detail/:id' component={Detail} />

    </div>
  );
}

export default App;
