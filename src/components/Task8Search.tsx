import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import type { ItemStock } from "../types/inventory";
import { FunnySqlCharacter } from "./FunnySqlCharacter";

export const Task8Search: React.FC = () => {
  const [orgId, setOrgId] = useState<string>("42");
  const [itemIds, setItemIds] = useState<string>("10003, 10013");
  const [list, setList] = useState<ItemStock[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosClient.get<ItemStock[]>("/task8/search", {
        params: { orgId, itemIds },
      });
      setList(response.data);
    } catch (error) {
      console.error("データ取得エラー:", error);
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  //   // 初期表示で自動検索
  //   useEffect(() => {
  //     handleSearch();
  //   }, []);

  // 表示用動的SQL文
  const currentSql = `SELECT mp.organization_code AS 組織コード,\n       msib.segment1 AS 品目コード,\n       CASE\n         WHEN flv.meaning = '外注加工品目' THEN CONCAT(flv.meaning, '_', msib.segment1)\n         ELSE flv.meaning\n       END AS 品目タイプ\nFROM mtl_system_items_b msib\nJOIN mtl_parameters mp ON mp.organization_id = msib.organization_id\nJOIN fnd_lookup_values flv ON flv.lookup_code = msib.item_type\n  AND flv.lookup_type = 'ITEM_TYPE'\n  AND flv.meaning IS NOT NULL\nWHERE msib.organization_id = ${orgId || "42"}\n  AND msib.inventory_item_id IN (${itemIds || "10003, 10013"})\nORDER BY msib.inventory_item_id;`;

  return (
    <div style={{ width: "100%", boxSizing: "border-box" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          width: "100%",
        }}
      >
        {/* 左側：出題内容（画像をメインにスッキリ表示） */}
        <div
          style={{
            border: "2px solid #cbd5e1",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            boxSizing: "border-box",
            width: "100%",
          }}
        >
          <div
            style={{
              padding: "14px 20px",
              fontWeight: "bold",
              fontSize: "1.1rem",
              color: "#1e293b",
              backgroundColor: "#f8fafc",
              borderBottom: "2px solid #e2e8f0",
              textAlign: "center",
            }}
          >
            先輩からの出題内容
          </div>
          <div style={{ padding: "16px", textAlign: "center" }}>
            <img
              src="/images/task8.png"
              alt="課題8仕様"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
        {/* 右側：業務想定画面 ＆ SPACEY MUNCHER */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              border: "2px solid #cbd5e1",
              borderRadius: "12px",
              overflow: "hidden",
              backgroundColor: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                padding: "14px 20px",
                fontWeight: "bold",
                fontSize: "1.1rem",
                color: "#1e293b",
                backgroundColor: "#f8fafc",
                borderBottom: "2px solid #e2e8f0",
                textAlign: "center",
              }}
            >
              部品製造会社の社内業務を想定した画面
            </div>

            <div style={{ padding: "20px" }}>
              <p
                style={{
                  color: "#e11d48",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  marginTop: 0,
                  marginBottom: "16px",
                  textAlign: "center",
                }}
              >
                ※動作確認用：組織ID「42」、品目ID「10003, 10013」を指定して検索
              </p>

              {/* 検索フォーム */}
              <form
                onSubmit={handleSearch}
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <label style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  組織ID：
                </label>
                <input
                  type="text"
                  value={orgId}
                  onChange={(e) => setOrgId(e.target.value)}
                  placeholder="例:42"
                  maxLength={4}
                  style={{
                    width: "70px",
                    textAlign: "center",
                    padding: "8px",
                    border: "2px solid #94a3b8",
                    borderRadius: "6px",
                    fontSize: "1rem",
                  }}
                />

                <label
                  style={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    marginLeft: "8px",
                  }}
                >
                  品目ID群：
                </label>
                <input
                  type="text"
                  value={itemIds}
                  onChange={(e) => setItemIds(e.target.value)}
                  placeholder="10003, 10013"
                  style={{
                    width: "140px",
                    textAlign: "center",
                    padding: "8px",
                    border: "2px solid #94a3b8",
                    borderRadius: "6px",
                    fontSize: "1rem",
                  }}
                />

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: "8px 20px",
                    backgroundColor: "#2563eb",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  {loading ? "検索中..." : "検索"}
                </button>
              </form>

              {/* 検索結果テーブル */}
              <h2
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "8px",
                  textAlign: "center",
                }}
              >
                検索結果
              </h2>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  border: "2px solid #cbd5e1",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#f1f5f9" }}>
                    <th
                      style={{
                        padding: "10px",
                        border: "2px solid #cbd5e1",
                        textAlign: "center",
                      }}
                    >
                      組織コード
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        border: "2px solid #cbd5e1",
                        textAlign: "center",
                      }}
                    >
                      品目コード
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        border: "2px solid #cbd5e1",
                        textAlign: "center",
                      }}
                    >
                      品目タイプ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {list.length > 0 ? (
                    list.map((item, index) => (
                      <tr key={index}>
                        <td
                          style={{
                            padding: "12px",
                            border: "2px solid #cbd5e1",
                            textAlign: "center",
                          }}
                        >
                          {item.organizationCode}
                        </td>
                        <td
                          style={{
                            padding: "12px",
                            border: "2px solid #cbd5e1",
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                        >
                          {item.segment1}
                        </td>
                        <td
                          style={{
                            padding: "12px",
                            border: "2px solid #cbd5e1",
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "#2563eb",
                          }}
                        >
                          {item.itemTypeName}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        style={{
                          padding: "16px",
                          textAlign: "center",
                          color: "#64748b",
                        }}
                      >
                        該当するデータが見つかりません
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* 業務解説テキスト */}
              <p
                style={{
                  color: "#475569",
                  fontSize: "0.9rem",
                  marginTop: "16px",
                  marginBottom: 0,
                  lineHeight: 1.6,
                }}
              >
                ※経理担当者から「画面で部品リストを見るとき、自社で作ったものか、外注先にお願いしたものか、パッと見で区別しづらくて見間違いそう…」と相談を受け、社内SEが外注品だけ『外注加工品目_B-0003』のように品番付きで画面表示されるよう調整し、現場の確認ミスを防ぐ親切な対応業務を想定しています。{" "}
              </p>
            </div>
          </div>

          {/* 🍖 SPACEY MUNCHER キャラクターコンポーネント */}
          <FunnySqlCharacter sqlText={currentSql} />
        </div>
      </div>
    </div>
  );
};
