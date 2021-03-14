import React, { useState, useCallback, useEffect } from 'react';

//redux
import { useDispatch } from 'react-redux';
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
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 6 },
  //{ width: 1500, itemsToShow: 7 },
];

const CategsHome = () => {

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
    <>
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
                  image={`/category/photo/${c._id}`}
                  title={c.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    <Box
                      component="div"
                      my={0}
                      textOverflow="ellipsis"
                      overflow="hidden"
                    >
                      {c.name}
                    </Box>
                  </Typography>
                </CardContent>
              </Card>
          ))}
        </Carousel>
      </div>
    </>
  )
}

export default CategsHome;
