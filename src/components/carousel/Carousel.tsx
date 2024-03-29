import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { images } from "../../assets/cards/category-cards";
import { useSetRecoilState } from "recoil";
import { categoryState } from "../../store/categoryState";

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
    autoplaySpeed: 500,
    variableWidth: true,
    focusOnSelect: true,
  };

  const setCategory = useSetRecoilState(categoryState);

  const mouseEnterHandler = (id) => {
    setCategory(id);
    console.log("id", id);
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((img, idx) => {
          return (
            <div
              key={idx}
              className="slick-slider-item "
              onMouseEnter={() => mouseEnterHandler(img.id)}
            >
              <img
                src={img.src}
                id={img.id}
                className="fixed-size w-full h-auto object-cover"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
