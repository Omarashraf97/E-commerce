import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../ShopContext/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext)

  return (
    <div className='Navbar'>
      <div className='Navbar-logo'>
        <img src={logo} alt='logo' />
        <p>SHOPPER</p>
      </div>

      <ul className='nav-menu'>
        <li onClick={() => setMenu("shop")}>
          <Link style={{ textDecoration: "none" }} to='/shop'>
            SHOP {menu === "shop" && <hr />}
          </Link>
        </li>
        <li onClick={() => setMenu("women")}>
          <Link style={{ textDecoration: "none" }} to='/women'>
            WOMEN {menu === "women" && <hr />}
          </Link>
        </li>
        <li onClick={() => setMenu("men")}>
          <Link style={{ textDecoration: "none" }} to='/men'>
            MEN {menu === "men" && <hr />}
          </Link>
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link style={{ textDecoration: "none" }} to='/kids'>
            KIDS {menu === "kids" && <hr />}
          </Link>
        </li>
      </ul>

      <div className='nav-cart'>
       <Link to='/login'><button>LOGIN</button></Link>
       <Link to='/cart'> <img src={cart_icon} alt='cart icon' /></Link>
        <div className='nav-cart-count'>{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
