import React from 'react';

const About = () => {
  return (
    <div className="w3-container w3-padding-32 w3-center">
      <h3>About Me, The Food Man</h3><br />
      <img src="/images/chef.jpg" alt="Me" className="w3-image" style={{ display: 'block', margin: 'auto' }} width="800" height="533" />
      <div className="w3-padding-32">
        <h4><b>I am Who I Am!</b></h4>
        <h6><i>With Passion For Real, Good Food</i></h6>
        <p>Just me, myself and I, exploring the universe of unknownment...</p>
      </div>
    </div>
  );
};

export default About;
