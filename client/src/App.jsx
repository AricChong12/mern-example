//import libs
import { Outlet } from "react-router-dom";
//import components 
import Navbar from "./components/Navbar";

//entry point of the app
const App = () => {
  return (
    //display interface
    <div className="w-full p-6">
      <Navbar />
      <Outlet />
    </div>
  );
};

//export the app
export default App
