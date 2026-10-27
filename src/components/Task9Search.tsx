import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import type { ItemStock } from "../types/inventory";
import { FunnySqlCharacter } from "./FunnySqlCharacter";

export const Task9Search: React.FC = () => {
  const [list, setList] = useState<ItemStock[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosClient.get<ItemStock[]>("/task9/search");
      setList(response.data);
    } catch (error) {
      console.error("データ取得エラー:", error);
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  // 表示用固定SQL文（NOT EXISTSを使用した課題仕様通りのクエリ）
  const currentSql = `SELECT mp.organization_code AS 組織コード,\n       COUNT(*) AS 工順なし半組立品件数\nFROM mtl_system_items_b msib\nJOIN mtl_parameters mp ON mp.organization_id = msib.organization_id\nJOIN fnd_lookup_values flv ON flv.lookup_code = msib.item_type\n  AND flv.lookup_type = 'ITEM_TYPE'\n  AND flv.meaning = '半組立品'\nWHERE msib.organization_id <> 0\n  AND NOT EXISTS (\n    SELECT 1\n    FROM bom_operational_routings bor\n    WHERE bor.organization_id = msib.organization_id\n      AND bor.assembly_item_id = msib.inventory_item_id\n  )\nGROUP BY mp.organization_code\nORDER BY mp.organization_code;`;

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
              src="/images/task9.png"
              alt="課題9仕様"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
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
                  color: "#2563eb",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  marginTop: 0,
                  marginBottom: "16px",
                  textAlign: "center",
                }}
              >
                ※検索ボタンを押して「工順が未登録の半組立品」を集計します
              </p>

              {/* 検索実行ボタン */}
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <button
                  onClick={() => handleSearch()}
                  disabled={loading}
                  style={{
                    padding: "10px 28px",
                    backgroundColor: "#2563eb",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1.05rem",
                  }}
                >
                  {loading ? "集計中..." : "未登録工順データの集計実行"}
                </button>
              </div>

              {/* 検索結果テーブル */}
              <h2
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "8px",
                  textAlign: "center",
                }}
              >
                集計結果
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
                      工順なし半組立品件数
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
                            fontWeight: "bold",
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
                            color: "#e11d48",
                          }}
                        >
                          {item.noRoutingItemCount !== undefined
                            ? item.noRoutingItemCount.toLocaleString()
                            : 0}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={2}
                        style={{
                          padding: "16px",
                          textAlign: "center",
                          color: "#64748b",
                        }}
                      >
                        「集計実行」ボタンを押すと結果が表示されます
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
                ※工場長から「明日から組み立てを始める半組立品の中で、作り方の手順（工順）の設定が漏れてて製造ラインが止まりそうなパーツってない！？」と駆け込みで相談され、社内SEがボタンを押して手順未登録の品目を洗い出し、「Y工場で2件だけ未設定の部品があります！すぐに登録してください！」と現場のトラブルを未然に防ぐチェック業務を想定しています。
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
