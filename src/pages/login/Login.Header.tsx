import React from 'react'
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const LoginHeader = () => {
  const url = window.location.pathname;

  return (
    <Header>
      <div className="header__left-side">
        <div className="header__left-side__logo">
          <Link to="/">
            <img src="http://thehoneycoffee.com/wp-content/themes/thehoneycoffee/assets/images/logo_text_yellow.png" />
          </Link>
        </div>
        <Menu theme="dark"
          defaultSelectedKeys={url === "/" ? ['1'] : url === "/product" ? ["2"] : url === "/contact" ? ["3"] : ["0"]}
        >
          <Menu.Item key="1"><Link to="/">Trang chủ</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/product">Sản phẩm</Link></Menu.Item>
          <Menu.Item key="3" className="header__contact"><Link to="/contact">Liên lạc</Link></Menu.Item>
        </Menu>
      </div>
      <div className="header__right-side">
        <Menu theme="dark"
          defaultSelectedKeys={(url === "/cart" || url === "/login") ? ['1'] : ["2"]}
        >
          <Menu.Item>
            <Link to="/login">Đăng nhập</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/register">Đăng ký</Link>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  )
}

export default LoginHeader
