import Game from "./Game"
import {Route,Routes} from "react-router"
import Homepage from "./Homepage"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  )
}

export default App