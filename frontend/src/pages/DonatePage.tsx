import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { CartItem } from "../types/CartItem";

function DonatePage() {
    const navigate = useNavigate();
    const {title, bookId, price: priceParam} = useParams();
    const {addToCart} = useCart();
    const [price, setPrice] = useState<number>(0);

    useEffect(() => {
        if (priceParam) {
            setPrice(Number(priceParam));
        }
    }, [priceParam]);


    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookId: Number(bookId),
            title: title || 'No Title Found',
            price}
            addToCart(newItem);
            navigate('/cart')
    }

  return (
    <>
      <Header />
      <h2>Purchase {title}</h2>

      <div>
        <input type="number" placeholder="Enter donation amount" value={price} onChange={(x) => setPrice(Number(x.target.value))}/>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default DonatePage;
