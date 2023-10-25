import './App.css';
import BackgroundVideo from './components/background_video/bg_video';
import Navbar from './components/navbar/navbar';
import Events from './components/Events/events';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Events />
    </div>
  );
}

export default App;
