import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import type { ItemStock } from "../types/inventory";
import { FunnySqlCharacter } from "./FunnySqlCharacter";

export const Task6Search: React.FC = () => {
  const [suffix, setSuffix] = useState<string>("9");
  const [list, setList] = useState<ItemStock[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosClient.get<ItemStock[]>("/task6/search", {
        params: { suffix },
      });
      setList(response.data);
    } catch (error) {
      console.error("データ取得エラー:", error);
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  // 表示用動的SQL文（プロ仕様インデント整形済み）
  const currentSql = `SELECT
  p.organization_code AS 組織コード,
  o.name AS 組織名,
  COUNT(i.inventory_item_id) AS 品目マスタ件数
FROM
  mtl_parameters p
JOIN
  hr_all_organization_units o
    ON p.organization_id = o.organization_id
JOIN
  mtl_system_items_b i
    ON p.organization_id = i.organization_id
WHERE
  p.organization_code LIKE '%${suffix || "9"}'
GROUP BY
  p.organization_code,
  o.name
ORDER BY
  p.organization_code DESC;`.trim();

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
        {/* 左側：出題内容（task6.png） */}
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
          <div style={{ padding: "16px" }}>
            <img
              src="/images/task6.png"
              alt="課題6仕様"
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
                  color: "#e11d48",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  marginTop: 0,
                  marginBottom: "16px",
                  textAlign: "center",
                }}
              >
                ※動作確認用：組織コード末尾に「9」を指定して集計
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
                  組織コード末尾：
                </label>
                <input
                  type="text"
                  // value={suffix}
                  onChange={(e) => setSuffix(e.target.value)}
                  placeholder="例:9"
                  maxLength={2}
                  style={{
                    width: "70px",
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
                  {loading ? "集計中..." : "品目数集計"}
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
                      組織名
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        border: "2px solid #cbd5e1",
                        textAlign: "center",
                      }}
                    >
                      品目マスタ件数
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
                          }}
                        >
                          {item.organizationName}
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
                          {item.itemCount !== undefined &&
                          item.itemCount !== null
                            ? item.itemCount.toLocaleString()
                            : 0}
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
                        「品目数集計」ボタンを押すと結果が表示されます
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
                ※システム部の社員さんが、同期の工場現場社員から「コード末尾9の工場で、部品の登録がどれくらい完了してるか件数を調べてほしい！」と頼まれ、対象工場の登録済み品目マスタ件数をサッと調べて回答したシーンを想定。
                <br />
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "#64748b",
                    marginTop: "4px",
                    display: "inline-block",
                  }}
                >
                  ★「品目マスタ件数」は実物の在庫個数ではなく、工場で扱う「部品の種類（ジャンル数）」を表しています。
                </span>
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
