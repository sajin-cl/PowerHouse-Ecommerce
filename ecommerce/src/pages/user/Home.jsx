import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import mockdata from '../../mock/mockData.json'
import '../../style/ProductCard.css'

const bannerStyle = {
  height: "400px",
  objectFit: "cover",
};

function HomePage() {
  return (
    <div className="page-container">
      {/*  Carousel Banner Section started here*/}
      <section className="bannerCarousel">
        <div id="bannerCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="0" className="active" aria-current="true"
              aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="src/assets/images/banner/banner1.webp" className="d-block w-100" alt="Banner 1"
                style={bannerStyle} />
            </div>
            <div className="carousel-item">
              <img src="src/assets/images/banner/banner2.webp" className="d-block w-100" alt="Banner 2"
                style={bannerStyle} />
            </div>
            <div className="carousel-item">
              <img src="src/assets/images/banner/banner3.webp" className="d-block w-100" alt="Banner 3"
                style={bannerStyle} />
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

      <main>
        <section className="product-section">
          <h4 className="ms-3">All Products</h4>
          <div className="container-fluid">
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
              {mockdata.Products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
};

export default HomePage;