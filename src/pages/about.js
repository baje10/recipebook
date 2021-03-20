import React from 'react';
import flag from '../images/flag2.png'

const About = () => {

  document.title='Recipebook | About';

  return (
    <>
      <center className="welcomeTitle">What is Ph Recipebook?</center>
      <br/>
      <center>
        <h4>Ph Recipebook is a website that intends to help Filipinos who are just starting on cooking and want to cook different varieties of simple homemade food for their families and friends.</h4>
        <br/>
        <h4>Included in this website are recipes and procedures that would guide you in cooking without difficulty.</h4>
        <br/>
        <img style={{maxHeight: "100%", maxWidth: "100%"}} alt="flag" src={flag}/>
      </center>
    </>
  )
}

export default About;
