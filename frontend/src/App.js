import React from "react";
import Header from "./components/Header";
import UserList from "./components/UserList";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <UserList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
