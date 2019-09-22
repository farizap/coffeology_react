import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import HomeImage1 from '../assets/images/home1.jpg';
import HomeImage2 from '../assets/images/home2.jpg';
import HomeImage3 from '../assets/images/home3.jpg';

function HomeCarousel() {
  return (
    <Carousel className="homecarousel" interval="3000">
      <Carousel.Item>
        <img className="d-block w-100" src={HomeImage1} alt="First slide" />
        <Carousel.Caption>
          <h3>Cari Resep terbaik untukmu</h3>
          <p>Gunakan fitur search untuk memudahkan untuk mencari resepmu</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={HomeImage2} alt="Third slide" />

        <Carousel.Caption>
          <h3>Buat resepmu sendiri</h3>
          <p>Buat resep sesuai seleramu dan bagikan ke teman-teman</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={HomeImage3} alt="Third slide" />

        <Carousel.Caption>
          <h3>Cari tahu kopi Nndonesia</h3>
          <p>Baca info dan rasa kopi di Indonesia</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;
