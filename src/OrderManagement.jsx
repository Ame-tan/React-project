import { useEffect, useState } from "react";
import { getProducts } from "./productSlice"; // 你的 getProducts 函數
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, selectOrders, selectOrderLoading } from "./orderSlice";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders); // 訂單數據
  const loading = useSelector(selectOrderLoading); // 加載狀態
  const [products, setProducts] = useState([]); // 商品詳細數據
  const [openOrders, setOpenOrders] = useState({}); // 訂單展開狀態

  // 獲取訂單資料
  useEffect(() => {
    dispatch(fetchOrders()); // 獲取訂單
  }, [dispatch]);

  // 獲取商品詳細數據
  useEffect(() => {
    const fetchProductData = async () => {
      const productList = await getProducts(); // 調用 getProducts 獲取商品詳細
      setProducts(productList);
    };
    fetchProductData();
  }, []);

  // 切換展開訂單詳細
  const toggleExpand = (orderId) => {
    setOpenOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  // 查找商品詳細資訊
  const getProductDetails = (productId) =>
    products.find((product) => product.id === productId);

  if (loading) {
    return <p>加載中...</p>;
  }

  return (
    <div className="order-management flex flex-wrap h-full w-full justify-between px-4  py-4 bg-gray-50 items-center text-lg">
      <span className="w-1/5 text-center">訂單號碼</span>
      <span className="w-1/7 text-start">日期</span>
      <span className="w-4/12 text-start pl-4">總金額</span>
      <span className="flex w-full border-b border-gray-200 px-2"></span>

      <div className="flex justify-between px-4 w-full py-2 bg-white items-center text-lg ">
        {orders.length > 0 ? (
          <div className="flex flex-wrap w-full py-2 items-center">
            {orders.map((order) => (
              <div key={order.orderId} className="w-full">
                <li className="flex w-full py-2 justify-between items-center border-b border-gray-200">
                  <div className="flex w-full px-6 justify-between items-center text-lg">
                    <p className="w-4/5 text-start">{order.orderId}</p>
                    <p className="w-4/5 text-start pl-2">{order.DateAndTime}</p>
                    <p className="w-3/6 text-start">
                      NT${order.totalPrice.toLocaleString()}
                    </p>
                    <button
                      onClick={() => toggleExpand(order.orderId)}
                      className="w-2/12 text-center bg-red-400 text-white mx-4 px-2 py-2 rounded hover:bg-red-300"
                    >
                      {openOrders[order.orderId] ? "收起" : "展開"}
                    </button>
                  </div>
                </li>

                {/* 展開的詳細內容 */}
                {openOrders[order.orderId] && (
                  <div className="flex flex-col w-full px-6 mt-4 bg-white border border-gray-300">
                    {order.items.map((item, index) => {
                      const product = getProductDetails(item.productId); // 取商品詳細資訊
                      return (
                        <div
                          key={index}
                          className="flex justify-between py-2 px-2 border-b"
                        >
                          <p className="w-2/5 text-start">
                            商品資訊
                            <br /> {product.description}-{item.size || ""}-{" "}
                            {item.color || ""} *{item.goods}*
                          </p>
                          <p className="w-1/5 text-center">
                            數量
                            <br />
                            {item.quantity}
                          </p>
                          <p className="w-1/5 text-center">
                            價格
                            <br /> NT$
                            {(product.money * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="flex flex-grow justify-center items-center py-10">
            您的訂單是空的。
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
