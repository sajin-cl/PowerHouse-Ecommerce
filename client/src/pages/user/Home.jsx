import "../../style/ProductCard.css";
import { useEffect, useState, Suspense, lazy } from "react";
import { motion } from 'framer-motion'

import { getAllCategories, getAllProducts } from '../../services/productService'

const BannerCarousel = lazy(() => import("../../components/BannerCarousel"));
const Footer = lazy(() => import("../../components/Footer"));
const ProductCard = lazy(() => import("../../components/ProductCard"));


function HomePage() {

  document.title = ('Home | Power House Ecommerce');

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");


  const fetchHomeData = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([

        getAllCategories(),
        getAllProducts()

      ]);
      setCategories(catRes.data.categories || []);
      setProducts(prodRes.data);

    }
    catch (err) {
      console.error(err);
    }
  };


  useEffect(() => { fetchHomeData() }, []);


  const filteredProducts = products.filter(prod =>
    (!category || prod.category === category) &&
    (!search || prod.name?.toLowerCase().includes(search.toLowerCase()))
  );


  return (

    <div className="page-container">
      <Suspense fallback={<div>Loading Banner...</div>}>
        <BannerCarousel />
      </Suspense>
      <main>
        <div className="container">
          <input
            type="text"
            className="form-control my-5 search-bar px-4"
            style={{ borderRadius: "50px", boxShadow: "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset" }}
            placeholder="Search Products.."
            value={search}
            onChange={(e) => { setSearch(e.target.value) }}
          />
        </div>
        <section className="product-section">
          <div className="ms-3 me-3 mb-3 d-flex align-items-center justify-content-between">
            <h4 className="mb-0">All Products</h4>

            <div className="d-flex align-items-center gap-3 ">
              <label className="mb-0 fw-semibold">Category:</label>
              <select
                className="form-select w-auto px-5 py-1"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name.length > 20 ? cat.name.slice(0, 20) + ".." : cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="container-fluid">
            <Suspense fallback={<div className="d-flex justify-content-center align-content-center pt-5">
              <img src="/loading-spinner.gif" width={"50px"} /></div>}>

              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (

                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      key={product._id}
                    >
                      <ProductCard product={product} />
                    </motion.div>

                  ))
                ) : (
                  <div className="text-center text-muted p-5 d-flex justify-content-center  w-100">
                    Products not found
                  </div>
                )}
              </div>
            </Suspense>
          </div>
        </section>
      </main>

      <Suspense fallback={<div>Loading Footer...</div>}>
        <Footer />
      </Suspense>

    </div>
  );
}

export default HomePage;
