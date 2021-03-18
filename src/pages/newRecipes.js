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
import Rating from '@material-ui/lab/Rating';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    maxHeight: "35rem",
    maxWidth: "15rem",
    marginTop: '1rem',
    marginLeft: '.7rem',
    whiteSpace: 'nowrap'
  },
});

const NewRecipes = () => {
  const { recipes, loading, error } = useSelector(state => state.recipeList);

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(rbook.recipe.listRecipes());
    return () => {
    //
    };
  }, []);

  return (
    loading? <center className='loading' ><CircularProgress color = 'inherit' /></center> : error? <div>{error}</div> :
    <>
      <center style={{marginTop:"2%"}} className = 'welcomeTitle'>New recipes for you</center>
      <div className = 'home-container'>
      { recipes.length > 0 ? (
        <>
          {
           recipes.map( recipes =>
            <Card key={recipes.name} className={classes.root}>
               <CardMedia
                 component="img"
                 alt={recipes.name}
                 height="250"
                 image={`/api/recipe/photo/${recipes._id}`}
                 title={recipes.name}
               />
               <CardContent>
                 <Typography gutterBottom variant="h6">
                   <Box
                     component="div"
                     my={2}
                     textOverflow="ellipsis"
                     overflow="hidden"
                   >
                     {recipes.name}
                   </Box>
                 </Typography>
                 <Typography variant="body2" color="textSecondary" component="p">
                   <Rating precision={.2} readOnly value={recipes.rating.toFixed(1)}/> <div style = {{fontSize: "1.5rem"}}>{recipes.rating.toFixed(1)}</div>
                 </Typography>
                 <Typography variant="body2" color="textSecondary" component="p">
                   <div style = {{fontSize: "1rem"}}>Number of reviews: {recipes.numReviews}</div>
                 </Typography>
               </CardContent>
               <CardActions>
                 <Link to = {`/detail/${recipes._id}`}>
                   <Button size="small" color="primary">
                     Read more
                   </Button>
                 </Link>
               </CardActions>
             </Card>
            )
           }
         </>
      ) : (
        <div style = {{fontSize: '4rem'}} >No recipes found</div>
      ) }
      </div>
      <center>
        <Button style = {{marginTop:'3%'}} variant="contained" color="primary" href="/recipes">
          View All recipes
        </Button>
      </center>
    </>
  )
}

export default NewRecipes;
