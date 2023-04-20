import './App.css'
import Carousel from './components/Carousel'

function App() {

  return (
    <div className="App px-1">
      <div className="item h-full fixed top-0 left-0 right-0 max-w-full w-96 mx-auto px-5">
        <Carousel />
      </div>
    </div>
  );
}

export default App
