import React, { useState } from "react";
import axiosClient from "../api/axiosCLient";
import type { ItemStock } from "../types/inventory";
import { FunnySqlCharacter } from "./FunnySqlCharacter";

export const Task10Search: React.FC = () => {
  const [list, setList] = useState<ItemStock[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosClient.get<ItemStock[]>("/task10/search");
      setList(response.data);
    } catch (error) {
      console.error("データ取得エラー:", error);
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  // 表示用SQL文
  const currentSql = `SELECT hl.location_code AS 納入先,\n       DATE_FORMAT(ph.approved_date, '%Y-%m') AS 発注承認月,\n       COUNT(ph.po_header_id) AS 発注ヘッダ件数\nFROM po_headers_all ph\nJOIN hr_locations_all_tl hl ON ph.ship_to_location_id = hl.location_id\n  AND hl.language = 'JA'\nWHERE ph.approved_date IS NOT NULL\nGROUP BY hl.location_code, DATE_FORMAT(ph.approved_date, '%Y-%m')\nHAVING COUNT(ph.po_header_id) > 2\nORDER BY 納入先 ASC, 発注承認月 DESC;`;

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
        {/* 左側：出題内容 */}
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
              src="/images/task10.png"
              alt="課題10仕様"
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
                ※発注件数が3件以上（2件超）の拠点・承認月を集計します
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
                  {loading ? "集計中..." : "発注件数集計実行"}
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
                      納入先
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        border: "2px solid #cbd5e1",
                        textAlign: "center",
                      }}
                    >
                      発注承認月
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        border: "2px solid #cbd5e1",
                        textAlign: "center",
                      }}
                    >
                      発注ヘッダ件数
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
                          {item.shipToLocationName}
                        </td>
                        <td
                          style={{
                            padding: "12px",
                            border: "2px solid #cbd5e1",
                            textAlign: "center",
                          }}
                        >
                          {item.approvedMonth}
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
                          {item.poHeaderCount}
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
                ※調達部長から「今期、どの工場がどの月にまとめてドカンと発注を出していたか（月に3件以上）の傾向をサクッと知りたいんだけど…」と頼まれ、社内SEが集計ボタンを押して「K工場と本社が4月に発注を集中させていましたね」と分析データを調べて報告する業務支援を想定しています。{" "}
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
