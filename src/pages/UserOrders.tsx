import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserOrders: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://gaming-store-production.up.railway.app/api/checkout/user/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.id}>
              <h3>Order ID: {order.id}</h3>
              <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              <p>Total: <span className="sr-symbol">$</span>{order.totalAmount}</p>
              <ul>
                {order.orderItems.map((item: any) => (
                  <li key={item.id}>
                    {item.device.name} x {item.quantity} - ${item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
