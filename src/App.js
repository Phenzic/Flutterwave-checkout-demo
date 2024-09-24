import React, { useState } from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import './App.css';

export default function App() {
  const userDetails = {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    phonenumber: '07059514549',
    address: "Somewhere on the planet",
    delivery: "Doorstep",
  };

  const items = [
    { id: 1, name: 'Laptop', price: 30000 },
    { id: 2, name: 'Smartphone', price: 20000 },
    { id: 3, name: 'Headphones', price: 25000 },
  ];

  const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState(null); // Store the payment response

  const config = {
    public_key: process.env.REACT_APP_FLW_SECRET_KEY,
    tx_ref: Date.now(),
    amount: totalAmount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: userDetails.email,
      phone_number: userDetails.phonenumber,
      name: userDetails.name,
    },
    customizations: {
      title: 'My store',
      description: 'Payment for items in cart',
      logo: '', 
    },
  };

  const fwConfig = {
    ...config,
    text: 'Checkout',
    callback: (response) => {
      console.log(response);
      const newin = response
      console.log(newin) 
      setPaymentCompleted(true); 
      setPaymentResponse(response); 
      closePaymentModal(); 
    },
    onClose: () => {},
  };

  
  return (
    <div className="App">
      {paymentCompleted ? (
        <div className="receipt">
          <h1>Payment Complete</h1>
          <p>Thank you for your payment, {userDetails.name}!</p>
          <p>Transaction Reference: {paymentResponse?.tx_ref}</p>
          <p>Total Amount Paid: ₦{totalAmount}</p>
          <p>Items Purchased:</p>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name}: ₦{item.price}
              </li>
            ))}
          </ul>
          <p>A receipt has been sent to your email: {userDetails.email}</p>
        </div>
      ) : (
        <>
          <h1>Order Confirmation</h1>

          <div>
            <h3>Items in your cart:</h3>
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  {item.name}: ₦{item.price}
                </li>
              ))}
            </ul>
            <h3>Total: ₦{totalAmount}</h3>
          </div>

          <div className="user-info">
            <h3>User Information</h3>
            <p>Name: {userDetails.name}</p>
            <p>Email: {userDetails.email}</p>
            <p>Phone: {userDetails.phonenumber}</p>
            <p>Address: {userDetails.address}</p>
            <p>Method of delivery: {userDetails.delivery}</p>
          </div>

          <FlutterWaveButton {...fwConfig} />
        </>
      )}
    </div>
  );
}