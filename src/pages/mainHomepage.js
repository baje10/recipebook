import React, { useState } from 'react';

//redux
import { useSelector } from 'react-redux';

//pages
import Home from './home';
import NewRecipes from './newRecipes';
import CategsHome from './categsHome';

//material-ui
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const MainHome = () => {

  const [open, setOpen] = useState(true);

  const { userInfo } = useSelector((state) => state.userRegister);

  return (
    <>
      <CategsHome/>
      <Home/>
      <NewRecipes/>
    </>
  )
}

export default MainHome
