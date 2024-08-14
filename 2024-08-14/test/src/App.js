import React from 'react';
import PhotoGrid from './PhotoGrid';
import About from './About';
import Footer from './Footer';

const App = () => {

  // 사이드바 열기 함수
  const w3_open = () => {
    document.getElementById("mySidebar").style.display = "block";
  };

  // 사이드바 닫기 함수
  const w3_close = () => {
    document.getElementById("mySidebar").style.display = "none";
  };

  // 각 섹션에 표시할 사진 배열
  const photos1 = [
    { src: "/images/sandwich.jpg", alt: "Sandwich", title: "The Perfect Sandwich", description: "Just some random text..." },
    { src: "/images/steak.jpg", alt: "Steak", title: "Let Me Tell You About This Steak", description: "Once again, some random text..." },
    { src: "/images/cherries.jpg", alt: "Cherries", title: "Cherries, interrupted", description: "Lorem ipsum text..." },
    { src: "/images/wine.jpg", alt: "Pasta and Wine", title: "Once Again, Robust Wine", description: "Lorem ipsum text..." },
  ];
  
  const photos2 = [
    { src: "/images/popsicle.jpg", alt: "Popsicle", title: "All I Need Is a Popsicle", description: "Lorem ipsum text..." },
    { src: "/images/salmon.jpg", alt: "Salmon", title: "Salmon For Your Skin", description: "Once again, some random text..." },
    { src: "/images/sandwich.jpg", alt: "Sandwich", title: "The Perfect Sandwich", description: "Just some random text..." },
    { src: "/images/croissant.jpg", alt: "Croissant", title: "Le French", description: "Lorem ipsum text..." },
  ];

  return (
    <div>
      {/* 사이드바 및 Top 메뉴 추가 */}
      <nav className="w3-sidebar w3-bar-block w3-card w3-top w3-xlarge w3-animate-left" style={{ display: 'none', zIndex: '2', width: '40%', minWidth: '300px' }} id="mySidebar">
        <a href="javascript:void(0)" onClick={w3_close} className="w3-bar-item w3-button">Close Menu</a>
        <a href="#food" onClick={w3_close} className="w3-bar-item w3-button">Food</a>
        <a href="#about" onClick={w3_close} className="w3-bar-item w3-button">About</a>
      </nav>

      <div className="w3-top">
        <div className="w3-white w3-xlarge" style={{ maxWidth: '1200px', margin: 'auto' }}>
          <div className="w3-button w3-padding-16 w3-left" onClick={w3_open}>☰</div>
          <div className="w3-right w3-padding-16">Mail</div>
          <div className="w3-center w3-padding-16">My Food</div>
        </div>
      </div>

      {/* 기존 App.js의 반환되는 JSX 코드들 추가 */}
      <div className="w3-main w3-content w3-padding" style={{ maxWidth: '1200px', marginTop: '100px' }}>
        {/* Photo Grids */}
        <PhotoGrid photos={photos1} />
        <PhotoGrid photos={photos2} />

        {/* About Section */}
        <About />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
