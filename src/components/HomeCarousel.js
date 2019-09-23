import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import HomeImage1 from '../assets/images/home1.jpg';
import HomeImage2 from '../assets/images/home2.jpg';
import HomeImage3 from '../assets/images/home3.jpg';

function HomeCarousel() {
  return (
  <Carousel className="homecarousel" interval="3000">
  <Carousel.Item>
  <img className="d-block w-100" src={HomeImage1} alt="First slide" />
  <Carousel.Caption>
  <Link to="/search">
  <h5 className="border-top border-bottom py-2 text-white mb-0"> Cari Resep Terbaik Untukmu</h5>
					</Link>
  <p className="subtext mb-0 font-italic">
						Gunakan fitur pencarian untuk mempermudah pencarian resepmu
{' '}
					</p>
				</Carousel.Caption>
			</Carousel.Item>
  <Carousel.Item>
  <img className="d-block w-100" src={HomeImage2} alt="Third slide" />

  <Carousel.Caption>
  <Link to="/search">
  <h5 className="border-top border-bottom py-2 text-white mb-0">Buat Resepmu Sendiri</h5>
					</Link>

  <p className="subtext mb-0 font-italic">Buat resep sesuai seleramu dan bagikan ke teman-teman</p>
				</Carousel.Caption>
			</Carousel.Item>
  <Carousel.Item>
  <img className="d-block w-100" src={HomeImage3} alt="Third slide" />

  <Carousel.Caption>
  <Link to="/beans">
  <h5 className="border-top border-bottom py-2 text-white mb-0">Cari Tahu Kopi Indonesia</h5>
					</Link>
  <p className="subtext mb-0 font-italic">Tambah wawasanmu seputar cita rasa kopi di Indonesia</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
  );
}

export default HomeCarousel;
