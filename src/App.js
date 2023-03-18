import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayOut from "./components/ui/LayOut";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Home from "./pages/Home";
import BusinessRegister from "./pages/BusinessRegister";
import ProtectedRoute from "./pages/ProtectedRoute";
import { createContext } from "react";
import BusinessDetail from "./pages/BusinessDetail";

export const FilterContext = createContext()

const userFilterInput = {
                          inputValue:"",
                          onFilter: ()=>{}
                        }

function App() {

  return (
      <FilterContext.Provider value={{...userFilterInput}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayOut />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
              <Route path="business/details" element={<BusinessDetail />} />
              <Route 
                path ="/register/bussiness" 
                element={
                          <ProtectedRoute> 
                            <BusinessRegister /> 
                          </ProtectedRoute>
                        } 
              />
            </ Route>
          </Routes>
        </BrowserRouter>
      </FilterContext.Provider>
  )
}

export default App;