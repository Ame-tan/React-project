import { db } from "../../firebase/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

export const getFirstPhoto = async (productId) => {
  try {
    const imagesRef = collection(db, "images");

    // 建立查詢，根據 productId 和 order 進行排序，並限制為一筆
    const q = query(
      imagesRef,
      where("productId", "==", productId),
      orderBy("order", "asc"), // 按照 order 欄位升序排序
      limit(1) // 限制只取第一筆資料
    );

    const snapshot = await getDocs(q);

    // 如果有查詢結果，回傳第一張圖片的資料，否則回傳 null
    if (!snapshot.empty) {
      const firstImage = snapshot.docs[0].data();
      return { id: snapshot.docs[0].id, ...firstImage };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching first photo: ", error);
    return null;
  }
};
