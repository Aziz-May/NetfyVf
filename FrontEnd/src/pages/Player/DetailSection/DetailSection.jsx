import React from 'react';
import '../DetailSection/DetailSection.css'

const DetailsSection = () => {
  return (
    <div className="details-section">
      <DetailBox
        title="Lecture hors ligne"
        content="Téléchargeable"
      />
      <DetailBox
        title="Audio"
        content="anglais - Audiodescription, anglais, français - Audiodescription et français [VO]\nSous-titres: arabe, anglais et français"
      />
      <DetailBox
        title="Distribution"
        content="Avec : Jamel Debbouze, Laure Calamy, Géraldine Nakache\nD'après le roman de Tahar Ben Jelloun\nDistribution : Pathé, Samir Decazza, Ridwan Zemmar"
      />
    </div>
  );
};

const DetailBox = ({ title, content }) => {
  return (
    <div className="detail-box">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default DetailsSection;