import React,{useContext} from "react";
import AuthContext from "./contexts";
import { Link } from "react-router-dom";

function AddToCartAlert({ message, onClose }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6  rounded-lg shadow-lg max-w-sm lg:w-full w-3/4">
        <h2 className="text-2xl font-bold mb-4">提示</h2>
        <p className="mb-6 text-lg">{message}</p>

        <div className="flex justify-end space-x-4">
          {!user ? (
            <>
              <Link to="/Login"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
              >
                登入
              </Link>

              <button
                onClick={onClose}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
              >
                關閉
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onClose}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
              >
                關閉
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddToCartAlert;
