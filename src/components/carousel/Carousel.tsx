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
    centerPadding: "0px",
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    speed: 2000,
    variableWidth: true,
    focusOnSelect: true,
  };

  const setCategory = useSetRecoilState(categoryState);

  const mouseEnterHandler = (id) => {
    setCategory(id);
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((img, idx) => {
          return (
            <div
              key={idx}
              className="slick-slider-item rounded-[12px]"
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
