import React from "react";
import Navbar from "../components/NavBar";
import Header from "../components/Header";
import UsersList from "../components/UserList";
import { SearchProvider } from "../contexts/SearchContext";

const HomePage = () => {
  return (
    <SearchProvider>
      <div style={{ marginTop: -8, marginLeft: -8, width: "100%" }}>
        <Navbar />
        <Header />
        <UsersList />
      </div>
    </SearchProvider>
  );
};

export default HomePage;
