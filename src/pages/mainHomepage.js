import React from 'react';

//pages
import Home from './home';
import NewRecipes from './newRecipes';
import CategsHome from './categsHome';


const MainHome = () => {
  return (
    <>
      <CategsHome/>
      <Home/>
      <NewRecipes/>
    </>
  )
}

export default MainHome
