function BannerCarousel() {

  const bannerStyle = {
    height: "400px",
    objectFit: "cover",
  };

  const captionStyle = {
    textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
  };

  const companyNameStyle = {
    fontSize: "3rem",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "0.5rem",
    textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
  };

  return (
    <section className="bannerCarousel">
      <div id="bannerCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="0" className="active" aria-current="true"
            aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>

        <div className="carousel-inner">

          <div className="carousel-item active">
            <img src="src/assets/images/banner/banner1.webp" className="d-block w-100" alt="Banner 1"
              style={bannerStyle} />
            
          </div>

          <div className="carousel-item">
            <img src="src/assets/images/banner/banner2.webp" className="d-block w-100" alt="Banner 2"
              style={bannerStyle} />
            <div className="carousel-caption d-none d-md-block" style={captionStyle}>
              <h1 style={companyNameStyle}>Power House</h1>
              <h5>Glow Like Never Before</h5>
              <p>Experience the ultimate hydration and radiant skin with our premium face cream.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src="src/assets/images/banner/banner3.webp" className="d-block w-100" alt="Banner 3"
              style={bannerStyle} />
            <div className="carousel-caption d-none d-md-block" style={captionStyle}>
              <h1 style={companyNameStyle}>Power House</h1>
              <h5>Fresh from the Farm</h5>
              <p>Organic vegetables handpicked to keep your meals healthy and tasty.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src="src/assets/images/banner/banner4.webp" className="d-block w-100" alt="Banner 4"
              style={bannerStyle} />
            <div className="carousel-caption d-none d-md-block" style={captionStyle}>
              <h1 style={companyNameStyle}>Power House</h1>
              <h5>Besan Cheela Delight</h5>
              <p>A savory Indian pancake made with besan, herbs, and spices — perfect for breakfast or snacks.</p>
            </div>
          </div>

        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

      </div>
    </section>
  )
}

export default BannerCarousel;
