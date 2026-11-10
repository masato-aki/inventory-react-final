import axios from "axios";

/**
 * API通信用の共通Axiosクライアント
 * - Spring Boot API (Render) への接続ベースURLを設定
 * - スリープ復帰待機を考慮してタイムアウトを15秒に設定
 */
const axiosClient = axios.create({
  baseURL: "https://inventory-spring-final.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export default axiosClient;
