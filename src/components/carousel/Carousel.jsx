import "./carousel.scss";

const Carousel = (props) => {
  const images = [
    "./images/slide-1.jpg",
    "./images/slide-2.jpg",
    "./images/slide-3.jpg",
    "./images/slide-4.jpg",
  ];

  return (
    <div
      id="homeSlider"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="2000"
    >
      <div className="carousel-inner">
        {images.map((src, k) => {
          return (
            <div className={`carousel-item ${k === 0 ? "active" : ""}`} key={k}>
              <img src={src} className="d-block w-100" alt="demo" />
            </div>
          );
        })}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#homeSlider"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#homeSlider"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
export default Carousel;
