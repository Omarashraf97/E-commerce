import "./App.css";
import Navbar from "./Components/Navbar";
import { Route,Routes } from "react-router-dom";
import Cart from "./Pages/Cart.jsx";
import ShopCategory from "./Pages/ShopCategory.jsx";
import Product from "./Pages/Product.jsx";
import Shop from "./Pages/Shop.jsx";
import LoginSign from "./Pages/LoginSign.jsx";
import Footer from "./Footer/Footer.jsx";
import men_banner from './Assets/banner_mens.png'
import women_banner from './Assets/banner_women.png'
import kids_banner from './Assets/banner_kids.png'


function App() {
  return (
    <div>
      <Navbar />
      <Routes>

        <Route path='/' element={<Shop />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/men' element={<ShopCategory banner={men_banner}category='men' />} />
        <Route path='/women' element={<ShopCategory banner={women_banner}category='women' />} />
        <Route path='/kids' element={<ShopCategory banner={kids_banner}category='kid' />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<LoginSign />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
