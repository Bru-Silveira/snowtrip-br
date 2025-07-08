import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <div className="upper-page bg-dark" id="home">
      <div className="hero-fullscreen">
        <div className="hero-fullscreen-FIX">
          <div className="hero-bg">
            <div className="swiper-container-wrapper">
              <div className="swiper-container swiper2">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="swiper-slide-inner">
                      <div className="swiper-slide-inner-bg bg-img-1 overlay overlay-dark">
                        <video playsInline autoPlay muted loop>
                          <source src="https://www.11-76.com/html5-videos-22/luxex/luxex-3.mp4" type="video/mp4" />
                        </video>
                      </div>
                      <div className="swiper-slide-inner-txt-2">
                        <div className="divider-m"></div>
                        <h1 className="hero-heading hero-heading-home fadeIn-element">
                          HOSPEDAGEM
                        </h1>
                        <div className="divider-m"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator scroll-indicator-home">
        <div className="scroll-indicator-wrapper">
          <div className="scroll-line fadeIn-element"></div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
