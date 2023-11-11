import React from "react";

const Home = () => {
  const itemName = "FIREIMG";
  const itemPrice = 1000;
  const [quantity, setQuantity] = React.useState(1);
  const [total, setTotal] = React.useState(itemPrice);

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setTotal(total - itemPrice);
    }
  };

  const increment = () => {
    setQuantity(quantity + 1);
    setTotal(total + itemPrice);
  };

  const checkout = async () => {
    try {
      const response = await fetch("http://localhost:4000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          items: [
            {
              id: "1",
              name: itemName,
              price: itemPrice,
              quantity: quantity,
            },
          ],
        }),
      });
      const data = await response.json();
      window.location = data.url;
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="container mx-auto px-4 mt-24 h-screen">
      <h1 className="text-xl font-semibold underline decoration-pink-500">
        Welcome checkout page
      </h1>
      <div className="flex mt-24">
        <div className="md:w-full w-3/6">
          <img
            src="https://tailwindui.com/img/ecommerce-images/checkout-form-04-product-01.jpg"
            alt="Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade."
            className="w-full h-full object-center object-cover "
          />
        </div>
        <div className="w-3/6 md:w-full px-24">
          <div className="mb-auto">
            <h1>
              {itemName} - ${itemPrice}
            </h1>
            <p className="text-gray-500 mt-5">Quantity</p>
            <div className="flex items-center mt-4 mb-4">
              <button
                className="bg-gray-200 text-gray-500 px-4 py-2 rounded-l"
                onClick={decrement}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="bg-gray-200 text-gray-500 px-4 py-2 rounded-r"
                onClick={increment}
              >
                +
              </button>
            </div>
            <p className="text-gray-500 mt-5">Total price : {total}</p>
          </div>
          <button
            className="bg-pink-500 text-white px-4 py-2 rounded mt-5 hover:bg-pink-600 transition duration-300 ease-in-out w-full text-center font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-gray-900 hover:shadow-lg hover:scale-105 transform"
            onClick={checkout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
