import axios from "axios";

/**
 * Axios (HTTP通信ライブラリ) の共通インスタンス作成
 * 毎回フルURLを書く手間を省くため、
 * ベースとなるURL（baseURL）や共通ヘッダーをあらかじめ設定しておきます。
 */
const axiosClient = axios.create({
  // バックエンド（Render上のSpring Boot API）のルートURLを指定
  baseURL: "https://inventory-spring-final.onrender.com/api",
  // 通信時のヘッダー情報（JSON形式でやり取りすることを明記）
  headers: {
    "Content-Type": "application/json",
  },
  // リクエストのタイムアウト時間（Renderの無料枠はスリープ復帰に時間がかかる場合があるため15秒程度に延ばしておくと安心です）
  timeout: 15000,
});

export default axiosClient;
