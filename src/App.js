import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayOut from "./components/ui/LayOut";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import ProtectedRoute from "./pages/ProtectedRoute";
import Home from "./pages/Home";


function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LayOut />}>
            <Route index element={<Home />} />
          </ Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;