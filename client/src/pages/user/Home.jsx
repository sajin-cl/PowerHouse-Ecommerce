import { useEffect, useState } from "react";
import BannerCarousel from "../../components/BannerCarousel ";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import axios from "axios";
import '../../style/ProductCard.css'


function HomePage() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/products')
      .then(response => setProducts(response.data))
      .catch(err => console.error('Data Fetched failed', err.response || err))
  }, []);

  console.log(products)
  return (
    <div className="page-container">

      <BannerCarousel />

      <main>
        <section className="product-section">
          <h4 className="ms-3">All Products</h4>
          <div className="container-fluid">
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
              {products.map((product, index) => (
                <ProductCard key={product._id + "-" + index} product={product} />
              ))}
            </div>

            {products.length <= 0 && (
              <div className="text-center text-muted p-5">Products not found</div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
};

export default HomePage;