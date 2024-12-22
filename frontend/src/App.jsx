import React, { useState, useMemo } from "react";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import History from "./Components/History/History";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import RecentTransactions from "./Components/RecentTransactions/RecentTransactions";
import { useGlobalContext } from "./context/globalContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignInSignUp } from "./Components/Auth/Auth";
import "./styles/App.css";

function App() {
  const global = useGlobalContext();
  const { showPopup } = useGlobalContext();

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <BrowserRouter>
      <div className="App" style={{ backgroundImage: `url(${bg})` }}>
        {orbMemo}
        <div id="MainLayout">
          <Navigation />

          {showPopup && <SignInSignUp />}

          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/history" element={<RecentTransactions />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expenses />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
