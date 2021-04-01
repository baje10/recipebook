import React, { useState, useEffect, useCallback } from 'react';

//redux
import { rbook } from '../redux/combineActions';
import { useSelector, useDispatch } from 'react-redux';

//navigation
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

//logo
import logo from '../images/recipebook.jpg';

//material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField  from '@material-ui/core/TextField';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  list: {
    width: 350,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    maxHeight: "17rem",
    maxWidth: "8rem",
    marginLeft: '.7rem',
    whiteSpace: 'nowrap',
    marginTop: '1rem'
  },
});

const HideAppBar = (props) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [open, setOpen] = useState(false);
  const [recipeRateList, setRecipeRateList] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(rbook.recipe.listAllRecipes(searchKeyword));
    setSearchKeyword('');
    setOpen(false);
    history.push('/recipes?keyword=' + searchKeyword)
    if (searchKeyword === null) {
      history.push('/recipes')
    }
  };

  const handleLogout = () => {
    dispatch(rbook.user.logout());
    setOpen(false);
  };


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { user } = useSelector((state) => state.userSignin);
  const { userInfo } = useSelector((state) => state.userRegister);
  const { loading, error } = useSelector(state => state.recipeRate);

  const handleRecipeRateList = useCallback(
    () => {
      dispatch(rbook.recipe.listRateRecipes())
        .then((data) => {
          if (data) {
            setRecipeRateList(data);
          }
        })
    },
    [dispatch],
  );

  useEffect(() => {
   handleRecipeRateList();
  }, [handleRecipeRateList]);


  return (
    loading? null : error? <div>{error}</div> :
    <React.Fragment>
      <CssBaseline />
      <div className="appbar">
        <AppBar style={{background:"#000000"}}>
          <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="end"
               >
                <MenuIcon />
              </IconButton>
            <ul className = "navigation">
              <li className = 'title'><img src = {logo} alt = 'logo'/></li>
            </ul>
          <div className="drawer">
          <Drawer
            anchor="left"
            open={open}
          >
            <div>
              <IconButton onClick={handleDrawerClose}>
                <ClearIcon/>
              </IconButton>
            </div>
            <div className={classes.list}>
            <List>
                <ListItem>
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
                <Divider/>
                </ListItem>
                <ListItem>
                {userInfo || user ? (
                  <ul className="sideBar">
                    <li><Link onClick ={handleDrawerClose} to = '/'>Home</Link></li>
                    <li><Link onClick ={handleDrawerClose} to = '/about'>About</Link></li>
                    {
                      user && user.role === 1 ? (
                        <li><Link onClick ={handleDrawerClose} to = '/admin'>Admin</Link></li>
                      ) : (
                        null
                      )
                    }
                    <li><Link onClick={handleLogout}><ExitToAppIcon/></Link></li>
                  </ul>
                ) : (
                  <ul className="sideBar">
                    <li><Link onClick ={handleDrawerClose} to = '/'>Home</Link></li>
                    <li><Link onClick ={handleDrawerClose} to = '/about'>About</Link></li>
                    {
                      user && user.role === 1 ? (
                        <li><Link onClick ={handleDrawerClose} to = '/admin'>Admin</Link></li>
                      ) : (
                        null
                      )
                    }
                    <li><Link onClick ={handleDrawerClose} to="/signin">Sign-In</Link></li>
                  </ul>
                )}
              </ListItem>
            </List>
            <div className = "drawerList">
            { recipeRateList.length > 0 ? (
              <>
                {
                 recipeRateList.map( recipes =>
                   <Card style = {{ display: loading && 'none' }} key={recipes.name} className={classes.root}>
                      <a href = {`/detail/${recipes._id}`}>
                        <CardMedia
                          component="img"
                          alt={recipes.name}
                          height="150"
                          image={`/api/recipe/photo/${recipes._id}`}
                          title={recipes.name}
                        />
                      </a>
                      <CardContent>
                        <Typography>
                        <Box
                          component="div"
                          my={0}
                          textOverflow="ellipsis"
                          overflow="hidden"
                        >
                          <b>{recipes.name}</b>
                        </Box>
                        </Typography>
                      </CardContent>
                    </Card>
                  )
                 }
               </>
            ) : (
              <div style = {{fontSize: '4rem'}} >No recipes found</div>
            ) }
            </div>
          </div>

          </Drawer>
          </div>
          </Toolbar>
        </AppBar>
        </div>
      <Toolbar />
      <Container>
      </Container>
    </React.Fragment>
  );
}

export default HideAppBar
