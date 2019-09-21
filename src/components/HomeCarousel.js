import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import HomeImage1 from '../assets/images/home1.jpg';
import HomeImage2 from '../assets/images/home2.jpg';
import HomeImage3 from '../assets/images/home3.jpg';

function HomeCarousel() {
  return (
    <Carousel className="homecarousel" interval="3000">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={HomeImage1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>
                        Nulla vitae elit libero, a pharetra augue mollis
                        interdum.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={HomeImage2}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={HomeImage3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;
