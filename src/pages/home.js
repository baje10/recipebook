import React, { useEffect } from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { rbook } from '../redux/combineActions';

//navigation
import { Link } from 'react-router-dom';

//material-ui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxHeight: "17rem",
    maxWidth: "8rem",
    marginLeft: '.7rem',
    whiteSpace: 'nowrap',
    marginTop: '1rem'
  },
  root1: {
    maxHeight: "35rem",
    maxWidth: "8rem",
    marginLeft: '.7rem',
    whiteSpace: 'nowrap',
    marginTop: '1rem'
  },
});

const Home = () => {
  document.title='Recipebook | Home';

  const lowReso = useMediaQuery('(max-width: 519px)');

  const { recipes, loading, error } = useSelector(state => state.recipeRate);

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(rbook.recipe.listRateRecipes());
    return () => {
    //
    };
  }, []);

  return (
    loading? null : error? <div>{error}</div> :
    <>
      <center className = 'welcomeTitle'>Popular recipes</center>
      <div className = 'home-container'>
      { recipes.length > 0 ? (
        <>
          {
           recipes.map( recipes =>
            <>
             { lowReso &&
               <Card key={recipes.name} className={classes.root}>
                  <CardMedia
                    component="img"
                    alt={recipes.name}
                    height="150"
                    image={`/api/recipe/photo/${recipes._id}`}
                    title={recipes.name}
                  />
                  <CardContent>
                    <Typography>
                      <Box
                        component="div"
                        my={0}
                        textOverflow="ellipsis"
                        overflow="hidden"
                      >
                        <Link to = {`/detail/${recipes._id}`}>
                          <li className="recipeLink"><b>{recipes.name}</b></li>
                        </Link>
                      </Box>
                    </Typography>
                  </CardContent>
                </Card>
             }
             </>
            )
           }
         </>
      ) : (
        <div style = {{fontSize: '4rem'}} >No recipes found</div>
      ) }
      </div>
    </>
  )
}

export default Home;
