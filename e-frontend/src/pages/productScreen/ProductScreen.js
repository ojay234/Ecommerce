import axios from "axios";
import { useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Rating from "../../components/Rating";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

function ProductScreen() {
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FECTH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [slug]);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="flex justify-center gap-8 my-10">
      <div className="">
        <img src={product.image} alt={product.name} />
      </div>
      <ul className="flex flex-col gap-2">
        <Helmet>
          <title>{product.name}</title>
        </Helmet>
        <li className="border-b-2 border-gray-300 pb-2">
          <h1 className="text-2xl font-bold">{product.name}</h1>
        </li>
        <li className="border-b-2 border-gray-300 pb-2">
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </li>
        <li className="border-b-2 border-gray-300 pb-2">
          <p>Price : ${product.price}</p>
        </li>
        <li className="border-b-2 border-gray-300 pb-2">
          <p>Description : {product.description}</p>
        </li>
      </ul>
      <div>
        <div className="grid gap-3 border-2 border-gray-200 p-4">
          <div className="flex gap-6">
            <p>Price:</p>
            <p>${product.price}</p>
          </div>
          <div className="flex items-center gap-6">
            <p>Status:</p>
            <p>
              {product.countInstock > 0 ? (
                <span className="flex p-1 justify-center bg-green rounded-md">
                  In Stock
                </span>
              ) : (
                <span className="flex p-1 justify-center bg-red-600 rounded-md">
                  Unavailable
                </span>
              )}
            </p>
          </div>
          {product.countInstock > 0 && (
            <div className="grid">
              <button className="p-1 bg-yellow-400 border-black border-2 rounded-md">
                Add to cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
