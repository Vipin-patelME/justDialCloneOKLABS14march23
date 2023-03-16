import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayOut from "./components/ui/LayOut";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Home from "./pages/Home";
import BusinessRegister from "./pages/BusinessRegister";
import ProtectedRoute from "./pages/ProtectedRoute";


function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayOut />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path ="/register/bussiness" 
              element={
                        <ProtectedRoute> 
                          <BusinessRegister /> 
                        </ProtectedRoute>
                      } 
            />
          </ Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;