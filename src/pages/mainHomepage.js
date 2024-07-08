import React from 'react';

//pages
import Home from './home';
import NewRecipes from './newRecipes';
// import CategsHome from './categsHome';

const MainHome = () => {
  return (
    <div className="homeSectionsContainer">
      <div className="homeBgContainer">
        { /* <CategsHome/> */ }
        <Home/>
      </div>
      <div className="homeBgContainer">
        { /* <CategsHome/> */ }
        <NewRecipes/>
      </div>
    </div>
  )
}

export default MainHome;
