import { useEffect, useState } from "react";
import { getProducts } from "../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  selectOrders,
  selectOrderLoading,
} from "../../store/orderSlice";

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
    <div className="order-management account-orders-container ">
      <div className="account-orders-title">
        <p className="flex justify-start w-full">訂單編號</p>
        <p className="flex justify-start pl-20 w-full">日期</p>
        <p className="flex justify-start pl-4 w-full">總金額</p>
      </div>

      <div className="content-wrapper container">
        <div className="flex justify-between px-5 w-full py-2 bg-white items-center text-lg">
          {orders.length > 0 ? (
            <div className="flex flex-wrap w-full py-2 items-center">
              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="w-full max-w-full overflow-hidden"
                >
                  <li className="flex w-full py-2 justify-between items-center border-b border-gray-300 shadow-md">
                    <div className="account-orders-content">
                      <p className="account-orders-content-text">
                        {order.orderId}
                      </p>
                      <p className="account-orders-content-text">
                        {order.DateAndTime}
                      </p>
                      <p className="account-orders-content-text">
                        NT${order.totalPrice.toLocaleString()}
                      </p>
                      <button
                        onClick={() => toggleExpand(order.orderId)}
                        className="flex items-center justify-center w-full md:w-3/12 md:text-center bg-red-400 text-white mx-4 px-2 py-2 rounded hover:bg-red-300"
                      >
                        {openOrders[order.orderId] ? "收起" : "展開"}
                      </button>
                    </div>
                  </li>

                  {openOrders[order.orderId] && (
                    <div className="flex flex-col w-full px-6 my-5 bg-white border border-gray-300">
                      {order.items.map((item, index) => {
                        const product = getProductDetails(item.productId);
                        return (
                          <div key={index} className="account-orders-open">
                            <p className="md:w-1/2 md:text-start w-full text-center mb-5">
                              <span className="md:flex font-bold">
                                商品資訊
                              </span>
                              <br />
                              <span>{product.description}</span>
                              <br />
                              {item.size.length > 0 && (
                                <>
                                  <span>尺寸：{item.size || ""}</span>
                                  <br />
                                </>
                              )}
                              {item.color.length > 0 && (
                                <>
                                  <span>顏色：{item.color || ""}</span>
                                  <br />
                                </>
                              )}
                              <span>*{item.goods}*</span>
                            </p>
                            <p className="text-center mb-5">
                              <span className="md:flex font-bold">數量</span>
                              <br />
                              {item.quantity}
                            </p>
                            <p className="text-center w-20">
                              <span className="md:flex font-bold">價格</span>
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
    </div>
  );
};

export default OrderManagement;
