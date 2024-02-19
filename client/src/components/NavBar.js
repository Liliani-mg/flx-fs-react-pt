import React from "react";
import { Layout } from "antd";
import Logo from "../assets/logo-flexxus-header.png";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header
      style={{
        width: "100%",
        height: "5.7rem",
        backgroundColor: "#D9D9D9",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 2rem 0.87rem 1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "2rem",
          marginLeft: "2.6rem",
          marginBottom: "2rem",
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{
            width: "11.3rem",
            height: "4rem",
            marginLeft: "1.68rem",
            paddingTop: "1rem",
          }}
        />
      </div>
    </Header>
  );
};

export default Navbar;
