/**
 * 在庫・商品・組織データに関する型定義ファイル
 * TypeScriptの「interface」を使って、バックエンド（Spring Boot）から受け取る
 * JSONデータの構造（キーと型）を明確に定義します。
 */

// --- 問1・問2共通：組織・商品・在庫の検索結果型 ---
export interface ItemStock {
  organizationId?: string; // 組織ID（例: "43"）
  organizationCode?: string; // 組織コード（例: "04"）
  organizationName?: string; // 組織名
  itemId?: string; // 商品ID（例: "10004"）
  itemName?: string; // 商品名
  segment1?: string; // 品目コード（例: "B-0004"）※問2で使用

  itemCost?: number; //問4で使います
  subinventoryCode?: string; // 👈 問5用: 保管場所
  uomCode?: string; // 👈 問5用: 単位
  primaryQuantity?: number; // 👈 問5用: 在庫数
  itemCount?: number; // 👈 問6用: 品目マスタ件数
  creationDate?: string; // 👈 問7用: 品目作成日
  createdByUser?: string; // 👈 問7用: 品目作成ユーザ
  lastUpdateDate?: string; // 👈 問7用: 品目更新日
  lastUpdatedByUser?: string; // 👈 問7用: 品目更新ユーザ
  itemTypeName?: string; // 👈 問8用: 品目タイプ（加工済み名称）
  noRoutingItemCount?: number; // 👈 問9用: 工順なし半組立品件数
  shipToLocationName?: string; // 👈 問10用: 納入先
  approvedMonth?: string; // 👈 問10用: 発注承認月
  poHeaderCount?: number; // 👈 問10用: 発注ヘッダ件数
  stockQuantity?: number; //  👈 在庫数
}

// --- 問1〜問10共通：APIレスポンスの基本構造型 ---
export interface ApiResponse<T> {
  status: string; // レスポンス状態（"SUCCESS" や "ERROR" など）
  message?: string; // メッセージ（エラー時の理由など）
  data: T; // 実際に受け取るデータ本体（Tは呼び出し時に指定する汎用型）
}
