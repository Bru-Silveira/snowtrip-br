import { useEffect } from "react";

const Header = ({titulo}) => {
  useEffect(() => {
    if (window.runLuxexScripts) {
      window.runLuxexScripts(); // Chama a função para rodar os scripts do Luxex
    }
  }, []);

  return (
    <>
      <div className="tst-line-t"></div>
      <div className="tst-line-l"></div>
      <div className="tst-line-r"></div>
      <div className="tst-line-b"></div>
      <div className="container-fluid nopadding">
        <div className="extra-margin-border">
          <div className="border-top"></div>
        </div>
      </div>
      <nav className="navbar navbar-fixed-top navbar-bg-switch">
        <div className="container-fluid nopadding">
          <div className="navbar-header fadeIn-element">
            <div className="logo">
              <a className="navbar-brand logo" href="index.html">
                <img
                  alt="Logo"
                  className="logo-light"
                  src="/img/logo-snowtrip.png"
                  style={{
                    position: "relative",
                    top: -40,
                    left: 0,
                    width: "250px",
                    height: "150px",
                    fontWeight: "bold",
                  }}
                />
                {/* <img alt="Logo" className="logo-dark" src="img/logo-dark.png"/> */}
              </a>
            </div>
          </div>
          <div className="main-navigation fadeIn-element">
            <div className="navbar-header">
              <button
                aria-expanded="false"
                className="navbar-toggle collapsed"
                data-target="#navbar-collapse"
                data-toggle="collapse"
                type="button"
              >
                <span className="sr-only">Toggle navigation</span>{" "}
                <span className="icon-bar"></span>{" "}
                <span className="icon-bar"></span>{" "}
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse" id="navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="index.html" style={{ fontSize: 14 }}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="gallery.html" style={{ fontSize: 14 }}>
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="contact.html" style={{ fontSize: 14 }}>
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="http://18.116.12.206:3000/Carrinho"
                    style={{ fontSize: 14 }}
                  >
                    Monte sua Trip
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
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
                          <video
                            src="/videos/videoplayback.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              zIndex: 0,
                            }}
                          />
                        </div>
                        <div className="swiper-slide-inner-txt-2">
                          <div className="divider-m"></div>
                          <h1 className="hero-heading hero-heading-home fadeIn-element">
                            {titulo}
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
        <div className="scroll-indicator scroll-indicator-home">
          <div className="scroll-indicator-wrapper">
            <div className="scroll-line fadeIn-element"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
