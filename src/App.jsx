import { lazy, Suspense } from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";  // Make sure this does NOT include a <Router>

const Header = lazy(() => import("./components/Header"));
const SideBar = lazy(() => import("./components/HRSideBar"));

// Loader Component
const Loader = () => <div className="spinner">🔄 Loading...</div>;

function App() {
  return (
   
      <Suspense fallback={<Loader />}>
        
            <AppRoutes /> 
         
      </Suspense>
    
  );
}

export default App;
