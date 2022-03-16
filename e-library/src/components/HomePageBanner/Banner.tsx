import React from 'react';
import { i18n } from '../../i18n';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import Image1 from '../../assets/images/image-1-copy.jpg';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export function HomeBanner() {
  const navigate = useNavigate();

  return (
    <div className="home-banner">
      <Swiper
        pagination={{
          type: 'progressbar',
        }}
        navigation={true}
        effect="flip"
        loop={true}
        slidesPerView="auto"
        loopedSlides={2}
        speed={400}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className="custom-slide"
            style={{
              backgroundImage: `url(${Image1})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            <div className="context">
              <h2>Biblioteka Digjitale e Shkollës së Magjistraturës</h2>
              <p>
                Mirësevini në Bibliotekën Digjitale të Shkollës së
                Magjistraturës. Pasi të regjistroheni, këtu mund të lexoni
                librat dhe periodikët të cilat Shkolla e Magjistraturës mundëson
                për studentët e Magjistraturës, prokurorët, gjyqtarët,
                kancelarët e Republikës së Shqipërisë etj.
              </p>
              <button onClick={() => navigate('/register')}>Regjistrohu</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
