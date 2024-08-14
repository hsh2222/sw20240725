import React from 'react';

const Footer = () => {
  return (
    <footer className="w3-row-padding w3-padding-32">
      <div className="w3-third">
        <h3>FOOTER</h3>
        <p>Praesent tincidunt sed tellus ut rutrum...</p>
        <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>
      </div>

      <div className="w3-third">
        <h3>BLOG POSTS</h3>
        <ul className="w3-ul w3-hoverable">
          <li className="w3-padding-16">
            <img src="/images/workshop.jpg" className="w3-left w3-margin-right" style={{ width: '50px' }} />
            <span className="w3-large">Lorem</span><br />
            <span>Sed mattis nunc</span>
          </li>
          <li className="w3-padding-16">
            <img src="/images/gondol.jpg" className="w3-left w3-margin-right" style={{ width: '50px' }} />
            <span className="w3-large">Ipsum</span><br />
            <span>Praes tinci sed</span>
          </li>
        </ul>
      </div>

      <div className="w3-third w3-serif">
        <h3>POPULAR TAGS</h3>
        <p>
          <span className="w3-tag w3-black w3-margin-bottom">Travel</span>
          {/* Add more tags as needed */}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
