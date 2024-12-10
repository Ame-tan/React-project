import React, { useState } from "react";

function BirthdayDropdown({ label, items, selectedItem, onSelect }) {
  return (
    <div className="relative inline-block w-full">
      {/* 顯示 label 和下拉選單 */}
      <div className="w-full mt-2">
        <select
          className="w-full mt-1 border px-2 py-1"
          value={selectedItem || ""}
          onChange={(e) => onSelect(e.target.value)}
        >
          <option value="">{label}</option>
          {items.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default BirthdayDropdown;
