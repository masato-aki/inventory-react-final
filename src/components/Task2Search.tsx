import React, { useState } from "react";
import axiosClient from "../api/axiosCLient";
import type { ItemStock } from "../types/inventory";
import { FunnySqlCharacter } from "./FunnySqlCharacter";

export const Task2Search: React.FC = () => {
  const [orgId, setOrgId] = useState<string>("43");
  const [itemId, setItemId] = useState<string>("10004");
  const [list, setList] = useState<ItemStock[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      // Spring Boot の /api/task2/search (または /api/task2) へリクエスト
      const response = await axiosClient.get<ItemStock[]>("/task2/search", {
        params: { orgId, itemId },
      });
      setList(response.data);
    } catch (error) {
      console.error("データ取得エラー:", error);
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  // 表示用動的SQL文（綺麗にインデント整形済み）
  const currentSql = `SELECT
  p.organization_code,
  i.segment1
FROM
  mtl_system_items_b i
JOIN
  mtl_parameters p
    ON i.organization_id = p.organization_id
WHERE
  i.organization_id = ${orgId || "43"}
  AND i.inventory_item_id = ${itemId || "10004"};`.trim();
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
        {/* 左側：出題内容（task2.png） */}
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
              src="/images/task2.png"
              alt="課題2仕様"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>

        {/* 右側：業務想定画面 ＆ モンスター */}
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
                ※動作確認用：組織IDに「43」、品目IDに「10004」を入力して検索
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
                  onChange={(e) => setOrgId(e.target.value)}
                  placeholder="例:43"
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
                  品目ID：
                </label>
                <input
                  type="text"
                  onChange={(e) => setItemId(e.target.value)}
                  placeholder="10004"
                  maxLength={8}
                  style={{
                    width: "90px",
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
                        width: "50%",
                      }}
                    >
                      組織コード (工場の呼び変え)
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        border: "2px solid #cbd5e1",
                        textAlign: "center",
                        width: "50%",
                      }}
                    >
                      品目コード (部品を呼び変え)
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
                            fontSize: "1.1rem",
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
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                          }}
                        >
                          {item.segment1}
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
                        該当するデータが見つかりません
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* 業務解説テキスト */}
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
                ※システム部の社員さんがテストのためにシステム内で使用される組織ID（
                <strong>{orgId || "43"}</strong>
                ）と品目ID（
                <strong>{itemId || "10004"}</strong>
                ）が、工場の社員さんたちが呼び慣れている組織コード（
                <strong>{list[0]?.organizationCode || "04"}</strong>
                ）と品目コード（
                <strong>{list[0]?.segment1 || "B-0004"}</strong>
                ）に紐付いていることを確認する検索を行った。すなわち組織IDと組織コードは同じ工場を意味し、品目IDと品目コードも同じ部品を意味する。
              </p>
            </div>
          </div>

          {/* 🍖 SPACEY MUNCHER キャラクターコンポーネント！ */}
          <FunnySqlCharacter sqlText={currentSql} />
        </div>
      </div>
    </div>
  );
};
