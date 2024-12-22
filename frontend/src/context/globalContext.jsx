import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1/";
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState();
  const [showPopup, setShowPopup] = useState(true);

  // Authentication methods
  const loginUser = async (credentials) => {
    try {
      await axios
        .post(`${BASE_URL}signin`, credentials, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          setUser(res.data.username);
          setShowPopup(!showPopup);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const registerUser = async (userData) => {
    try {
      await axios
        .post(`${BASE_URL}signup`, userData)
        .then((res) => {
          console.log(res);
          setUser(userData.username);
          setShowPopup(!showPopup);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };
  const signOut = async () => {
    try {
      console.log("signout requested");
      await axios
        .get(`${BASE_URL}signout`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);

          setShowPopup(!showPopup);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      setError(err.response?.data?.message || "logout failed");
    }
  };
  // Income methods
  const addIncome = async (income) => {
    try {
      await axios
        .post(`${BASE_URL}add-income`, income, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          console.log("added");
          getIncomes();
        })
        .catch((err) => console.err(err));
      //
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add income");
    }
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}get-incomes`, {
      withCredentials: true,
    });
    console.log(response);
    setIncomes(response.data);
    console.log(response.data);
  };
  const deleteIncome = async (id) => {
    await axios.delete(`${BASE_URL}delete-income/${id}`, {
      withCredentials: true,
    });
    getIncomes();
  };

  const totalIncome = () => {
    return incomes.reduce((total, income) => total + income.amount, 0);
  };

  // Expense methods
  const addExpense = async (expense) => {
    try {
      await axios.post(`${BASE_URL}add-expense`, expense, {
        withCredentials: true,
      });
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense");
    }
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}get-expenses`, {
      withCredentials: true,
    });
    setExpenses(response.data);
    console.log(response.data);
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${BASE_URL}delete-expense/${id}`, {
      withCredentials: true,
    });
    getExpenses();
  };

  const totalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return history.slice(0, 3);
  };
  const transactionHistory_long = () => {
    const history = [...incomes, ...expenses].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return history;
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        transactionHistory_long,
        error,
        setError,
        user,
        loginUser,
        registerUser,
        setShowPopup,
        showPopup,
        signOut,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
