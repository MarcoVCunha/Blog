import './App.css';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

//hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

//context
import { AuthProvider} from './context/AuthContext';

// pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import DashBoard from './pages/Dashboard/DashBoard';
import EditPost from './pages/EditPost/EditPost';
import CreatePost from './pages/CreatePost/CreatePost';
import ProtectedRoute from './hooks/ProtectedRoute';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';

function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path='/posts/:id' element={<Post />} />

            <Route 
            path="/login" 
            element={<ProtectedRoute requireAuth={false} component={Login} />} />
            <Route 
            path="/register" 
            element={<ProtectedRoute requireAuth={false} component={Register} />} />

            <Route 
            path="/posts/edit/:id" 
            element={<ProtectedRoute requireAuth={true} component={EditPost} />} />
            <Route 
            path="/posts/create" 
            element={<ProtectedRoute requireAuth={true} component={CreatePost} />} />
            <Route 
            path="/dashboard" 
            element={<ProtectedRoute requireAuth={true} component={DashBoard} />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
