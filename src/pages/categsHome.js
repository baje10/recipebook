import React, { useState, useCallback, useEffect } from 'react';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { rbook } from '../redux/combineActions';

//navigation
import { useHistory } from 'react-router-dom';

//material-ui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

//Carousel
import Carousel from "react-elastic-carousel";

const useStyles = makeStyles({
  root: {
    maxHeight: "35rem",
    width: "12rem",
    whiteSpace: 'nowrap',
    marginTop: '1rem'
  },
});

const breakPoints = [
  { width: 150, itemsToShow: 1 },
  { width: 250, itemsToShow: 1 },
  { width: 350, itemsToShow: 1 },
  { width: 450, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 4 },
  { width: 1000, itemsToShow: 6 },
  //{ width: 1500, itemsToShow: 7 },
];

const CategsHome = () => {
  const { loading, error } = useSelector(state => state.listCategories);

  document.title='Recipebook | Home';

  const [categList, setCategList] = useState([]);

  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleCategoryList = useCallback(
    () => {
      dispatch(rbook.category.listCategories())
        .then((data) => {
          if (data) {
            setCategList(data);
          }
        })
    },
    [dispatch],
  );

  useEffect(() => {
    handleCategoryList();
  }, [handleCategoryList]);

  const handleCategoryId = (category) => {
    console.log(category._id)
    history.push('/recipes?category=' + category._id);
  };

  return (
    loading? null : error? <div>{error}</div> :
    <div className="carousel">
      <center className = 'welcomeTitle'>Browse by categories</center>
      <div className = 'home-container'>
        <Carousel
          showArrows={false}
          breakPoints={breakPoints}
        >
          {
           categList.map((c, i) => (
             <Card title={c.name} style={{cursor: "pointer"}} onClick={() => handleCategoryId(c)} key={c.name} className={classes.root}>
                <CardMedia
                  component="img"
                  alt={c.name}
                  height="120"
                  image={`/api/category/photo/${c._id}`}
                  title={c.name}
                >
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {c.name}
                  </Typography>
                </CardContent>
              </Card>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default CategsHome;
