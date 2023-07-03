import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/users/Login';
import Register from './pages/users/Register';
import Profile from './pages/users/Profile';
import AddIncome from './pages/income/addIncome';
import AddExpense from './pages/expense/addExpense';
import Navbar from './components/navigation/Navbar';
import ProtectedRoute from './components/navigation/ProtectedRoute';
import NotAdmin from './components/NotAdmin';
import AdminRoute from './components/navigation/AdminRoute';
import ExpensesList from './pages/expense/ExpensesList';

function App() {
  return (
    <BrowserRouter>
    
      <Navbar />
      <Routes>
        <Route exact path="/" Component={ExpensesList} />
        <ProtectedRoute exact path="/expenses" Component={Home} />
        <AdminRoute exact path="/dashbord" Component={Home} />
        <Route exact path="/not-found" Component={NotAdmin} />
        <ProtectedRoute exact path="/add-income" Component={AddIncome} />
        <ProtectedRoute exact path="/add-expense" Component={AddExpense} />
        <ProtectedRoute exact path="/profile" Component={Profile} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/register" Component={Register} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
