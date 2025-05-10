// Import required dependencies and components
import logo from './logo.svg';
import './App.css'; // Main app-level CSS
import Navbar from './Component/Navbar/navbar'; // Top navigation bar
import HomeScreen from './Screen/HomeScreen/homeScreen'; // Homepage screen
import { Routes, Route } from 'react-router-dom'; // Routing tools
import Products from './Screen/Products/products'; // Products screen
import Footer from './Component/Footer/footer'; // Footer component
import Cart from './Screen/Cart/cart'; // Cart screen
import LoginPage from './Login/LoginPage'; // Login page
import { ToastContainer } from "react-toastify"; // For showing toast messages
import RegisterPage from './Login/RegisterPage'; // Registration page
import SearchResults from './Screen/Search/SearchResults';
import Development from '../src/Screen/Products/products';


function App() {
  return (
    <div className="App">
      {/* Top navigation bar */}
      <Navbar />

      {/* Route definitions for different pages */}
      <Routes>
        {/* Homepage route */}
        <Route path='/' element={<HomeScreen />} />
        
        {/* Product listing page */}
        <Route path="/products/:category" element={<Products />} />
        
        {/* Shopping cart page */}
        <Route path='/cart' element={<Cart />} />
        
        {/* Login page */}
        <Route path='/LoginPage' element={<LoginPage />} />
        
        {/* Registration page */}
        <Route path='/RegisterPage' element={<RegisterPage />} />

        {/* Search page */}
        <Route path="/search-results" element={<SearchResults />} />

        {/* Other routes */}
        <Route path="/products/development" element={<Development />} />

      </Routes>

      {/* Toast container for showing notifications */}
      <ToastContainer />

      {/* Footer section */}
      <Footer />
    </div>
  );
}

export default App;
