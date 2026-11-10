export interface ItemStock {
  // --- 課題1・2: 組織・品目基本情報 ---
  organizationId?: string; // 組織ID
  organizationCode?: string; // 組織コード
  organizationName?: string; // 組織名
  itemId?: string; // 品目ID
  itemName?: string; // 品目名
  segment1?: string; // 品目コード

  // --- 課題4: 品目原価 ---
  itemCost?: number; // 品目原価

  // --- 課題5: 保管場所・在庫情報 ---
  subinventoryCode?: string; // 保管場所コード
  uomCode?: string; // 基準単位コード
  primaryQuantity?: number; // 主要数量
  stockQuantity?: number; // 保有在庫数

  // --- 課題6: 組織別集計 ---
  itemCount?: number; // 品目マスタ総件数

  // --- 課題7: 監査・登録履歴 ---
  creationDate?: string; // レコード作成日時
  createdByUser?: string; // 作成担当者
  lastUpdateDate?: string; // 最終更新日時
  lastUpdatedByUser?: string; // 最終更新担当者

  // --- 課題8: 品目タイプロジック整形 ---
  itemTypeName?: string; // 整形後品目タイプ名称

  // --- 課題9: 未登録工順データ集計 ---
  noRoutingItemCount?: number; // 未設定工順の半組立品件数

  // --- 課題10: 発注集計 ---
  shipToLocationName?: string; // 納入先拠点名称
  approvedMonth?: string; // 承認年月 (YYYY-MM)
  poHeaderCount?: number; // 発注ヘッダ件数
}

/**
 * 共通APIレスポンスエンベロープ
 */
export interface ApiResponse<T> {
  status: string; // 処理ステータス ("SUCCESS" | "ERROR")
  message?: string; // 処理結果メッセージ
  data: T; // ペイロードデータ本体
}
