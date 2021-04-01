import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//styling
import './App.css'

//components
import Navbar from './components/navbar';
import NavbarLow from './components/navbarLow';
import Footer from './components/footer';

//pages
import Signup from './pages/signup';
import Signin from './pages/signin';
import About from './pages/about';
import Default from './pages/default';
import RecipeDetails from './pages/recipeDetails';
import AllRecipe from './pages/allRecipe';
import MainHome from './pages/mainHomepage';

//adminPage
import AdminPage from './adminPage/adminPage';

//routing
import PrivateRoute from './routes/privateRoute';
import AdminRoute from './routes/adminRoute';
import LoggedInRoute from './routes/loggedInRoute';

//material-ui
import { useMediaQuery } from '@material-ui/core';

const App = () => {
  const showNavbarLow = useMediaQuery('(max-width: 1020px)');

  return (
    <BrowserRouter>
      <br/>
      { showNavbarLow ? <NavbarLow/> : <Navbar/> }
      <Switch>
         <Route path='/' exact={true} component={MainHome}/>
         <LoggedInRoute path='/signin' component={Signin}/>
         <Route path='/recipes' component={AllRecipe}/>
         <LoggedInRoute path='/signup' component={Signup}/>
         <Route path='/about' component={About}/>
         <Route path='/detail/:id' component={RecipeDetails}/>
         <AdminRoute path='/admin' component={AdminPage}/>
         <Route component={Default}/>
      </Switch>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;
