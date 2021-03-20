import React, { useState } from 'react';

//prop-types
import PropTypes from 'prop-types';

//redux
import { rbook } from '../redux/combineActions';
import { useSelector, useDispatch } from 'react-redux';

//navigation
import { Link, useHistory, useLocation } from 'react-router-dom';

//logo
import logo from '../images/recipebook.jpg';

//material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import TextField  from '@material-ui/core/TextField';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const HideOnScroll = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const HideAppBar = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const category = params.get('category') ?? '';

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(rbook.recipe.listAllRecipes(searchKeyword));
    if (searchKeyword === '') {
      history.push('/recipes')
    } else if (searchKeyword && category === '') {
      history.push('/recipes?keyword=' + searchKeyword)
    } else {
      history.push('/recipes?keyword=' + searchKeyword + '&category=' + category)
    }
    setSearchKeyword('');
  };

  const handleLogout = () => {
    dispatch(rbook.user.logout());
  };

  const { user } = useSelector((state) => state.userSignin);
  const { userInfo } = useSelector((state) => state.userRegister);

  return (
    <React.Fragment>
      <CssBaseline />
      <div className='appbar1'>
      <HideOnScroll>
        <AppBar  style={{ background: '#000000' }}>
          <Toolbar>
            <ul className = "navigation">
              <li className = 'title'><img src = {logo} alt = 'logo'/></li>
              {userInfo || user ? (
              <>
                <div>
                  <form onSubmit={submitHandler}>
                    <TextField
                     placeholder = 'Search for recipes?'
                     className = 'searchBar'
                     style = {{ marginTop: '3%' }}
                     id="outlined-search"
                     type="search"
                     variant="outlined"
                     name="searchKeyword"
                     value={searchKeyword}
                     onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                  </form>
                </div>
                <li><Link to = '/home'>Home</Link></li>
                <li><Link to = '/about'>About</Link></li>
                {
                  user && user.role === 1 ? (
                    <li><Link to = '/admin'>Admin</Link></li>
                  ) : (
                    null
                  )
                }
                <li><Link onClick={handleLogout}><ExitToAppIcon/></Link></li>
              </>
            ) : (
              null
            )}
          </ul>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      </div>
      <Toolbar />
      <Container>
      </Container>
    </React.Fragment>
  );
}

export default HideAppBar
