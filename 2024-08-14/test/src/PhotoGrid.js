import React from 'react';

const PhotoGrid = ({ photos }) => {
  return (
    <div className="w3-row-padding w3-padding-16 w3-center">
      {photos.map((photo, index) => (
        <div className="w3-quarter" key={index}>
          <img src={photo.src} alt={photo.alt} style={{ width: '100%' }} />
          <h3>{photo.title}</h3>
          <p>{photo.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
