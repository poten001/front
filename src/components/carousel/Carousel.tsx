import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  const settings = {
    infinite: true,
    className: "center",
    centerMode: true,
    centerPadding: "30px",
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    variableWidth: true,
    focusOnSelect: true,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slick-slider-item ">
          <div className="fixed-size bg-red-400">
            <h3>1</h3>
          </div>
        </div>
        <div className="slick-slider-item ">
          <div className="fixed-size bg-green-400">
            <h3>2</h3>
          </div>
        </div>
        <div className="slick-slider-item ">
          <div className="fixed-size bg-blue-400">
            <h3>3</h3>
          </div>
        </div>
        <div className="slick-slider-item ">
          <div className="fixed-size bg-pink-400">
            <h3>4</h3>
          </div>
        </div>
      </Slider>
    </div>
  );
}
