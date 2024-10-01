import React, { useState } from "react";

function Contact() {
  // 用於控制模態框的開關
  const [isOpen, setIsOpen] = useState(false);

  // 處理表單提交
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("表格已提交！");
    setIsOpen(false); // 提交後關閉模態框
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* 彈出表單按鈕 */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={() => setIsOpen(true)}
      >
        打開彈出表格
      </button>

      {/* 彈出表格 */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">彈出式表格</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  姓名
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  type="text"
                  id="name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  電子郵件
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  type="email"
                  id="email"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  提交
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;
