import React from 'react';
import flag from '../images/flag4.png'

const About = () => {

  document.title ='Peso Palate | About';

  return (
    <center>
      <div className="woodContainer">
        <center className="welcomeTitleHome">What is Peso Palate?</center>
        <br/>
        <center>
          <h5>Peso Palate is your go-to resource for discovering delicious recipes while staying mindful of your budget. Our platform is designed to help you view a wide variety of home-cooked meal recipes and monitor the prices of ingredients in the Philippines.</h5>
          <br/>
          <h5>Whether you're looking to save money or simply plan your meals more efficiently, Peso Palate provides the tools you need to create tasty and cost-effective dishes. Join our community of home cooks and start making the most of your kitchen and your wallet!</h5>
          <br/>
          <div><img style={{maxHeight: "80%", maxWidth: "80%"}} alt="flag" src={flag}/></div>
        </center>
      </div>
    </center>
  )
}

export default About;
