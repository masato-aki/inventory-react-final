import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import type { ItemStock } from "../types/inventory";
import { FunnySqlCharacter } from "./FunnySqlCharacter";

export const Task3Search: React.FC = () => {
  const [itemIds, setItemIds] = useState<string>("10005,10008");
  const [list, setList] = useState<ItemStock[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      // バックエンドの /api/task3/search?itemIds=10005,10008 へリクエスト
      const response = await axiosClient.get<ItemStock[]>("/task3/search", {
        params: { itemIds },
      });
      setList(response.data);
    } catch (error) {
      console.error("データ取得エラー:", error);
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  // 表示用動的SQL文（インデント整形 ＆ ソート順を出題サンプルの答えと100%統一）
  const formattedIds = itemIds
    ? itemIds
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id.length > 0)
        .join(", ")
    : "10005, 10008";

  const currentSql = `SELECT
  mp.organization_code AS 組織コード,
  ou.name AS 組織名,
  msi.segment1 AS 品目コード
FROM
  mtl_parameters mp
JOIN
  mtl_system_items_b msi
    ON mp.organization_id = msi.organization_id
JOIN
  hr_all_organization_units ou
    ON mp.organization_id = ou.organization_id
WHERE
  msi.inventory_item_id IN (${formattedIds})
ORDER BY
  mp.organization_code DESC,
  msi.segment1 ASC;`.trim();

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
        {/* 左側：出題内容（task3.png） */}
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
              src="/images/task3.png"
              alt="課題3仕様"
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
                ※動作確認用：品目IDに「10005,10008」を入力して検索
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
                  品目ID（複数可）：
                </label>
                <input
                  type="text"
                  onChange={(e) => setItemIds(e.target.value)}
                  placeholder="例:10005,10008"
                  style={{
                    width: "160px",
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
                      組織コード (工場番号)
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
                      品目コード (部品番号)
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
                          }}
                        >
                          {item.organizationName || item.organizationCode}
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
                ※営業担当の社員から「急ぎでこの部品を取り扱っている工場を全部リストアップしてほしい」と頼まれた雑用担当新人が、全社の取扱拠点を一括検索したイレギュラー業務を想定しています。新人これからがんばれよ
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
