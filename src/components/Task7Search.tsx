import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import type { ItemStock } from "../types/inventory";
import { FunnySqlCharacter } from "./FunnySqlCharacter";

export const Task7Search: React.FC = () => {
  const [orgId, setOrgId] = useState<string>("43");
  const [itemId, setItemId] = useState<string>("10004");
  const [list, setList] = useState<ItemStock[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosClient.get<ItemStock[]>("/task7/search", {
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

  // 表示用動的SQL文（A5M2対応・プロ仕様インデント整形済み）
  const currentSql = `SELECT
  p.organization_code,
  i.segment1,
  DATE_FORMAT(i.creation_date, '%Y/%m/%d') AS creation_date,
  u1.user_name AS created_by_user,
  DATE_FORMAT(i.last_update_date, '%Y/%m/%d') AS last_update_date,
  u2.user_name AS last_updated_by_user
FROM
  mtl_system_items_b i
JOIN
  mtl_parameters p
    ON i.organization_id = p.organization_id
LEFT JOIN
  fnd_user u1
    ON i.created_by = u1.user_id
LEFT JOIN
  fnd_user u2
    ON i.last_update_by = u2.user_id
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
          <div style={{ padding: "16px" }}>
            <img
              src="/images/task7.png"
              alt="課題7仕様"
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
                  value={orgId}
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
                  value={itemId}
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
                  {loading ? "検索中..." : "登録履歴検索"}
                </button>
              </form>

              {/* 検索結果テーブル（横スクロール対応） */}
              <h2
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "8px",
                  textAlign: "center",
                }}
              >
                検索結果
              </h2>
              <div style={{ width: "100%", overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    border: "2px solid #cbd5e1",
                    whiteSpace: "nowrap",
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
                        品目作成日
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          border: "2px solid #cbd5e1",
                          textAlign: "center",
                        }}
                      >
                        品目作成ユーザ
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          border: "2px solid #cbd5e1",
                          textAlign: "center",
                        }}
                      >
                        品目更新日
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          border: "2px solid #cbd5e1",
                          textAlign: "center",
                        }}
                      >
                        品目更新ユーザ
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
                            }}
                          >
                            {item.creationDate}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              border: "2px solid #cbd5e1",
                              textAlign: "center",
                            }}
                          >
                            {item.createdByUser}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              border: "2px solid #cbd5e1",
                              textAlign: "center",
                            }}
                          >
                            {item.lastUpdateDate}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              border: "2px solid #cbd5e1",
                              textAlign: "center",
                            }}
                          >
                            {item.lastUpdatedByUser}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          style={{
                            padding: "16px",
                            textAlign: "center",
                            color: "#64748b",
                          }}
                        >
                          「登録履歴検索」ボタンを押すと結果が表示されます
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

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
                ※工場の社員から部品管理部の女性社員へ「この部品、いつから登録されてる？」と質問を受け、組織ID（
                <strong>{orgId || "43"}</strong>）と品目ID（
                <strong>{itemId || "10004"}</strong>）で検索し、「
                <strong>{list[0]?.creationDate || "2022/08/17"}</strong>に
                <strong>{list[0]?.createdByUser || "01"}</strong>
                さんが登録されてますね！」と優しく回答してあげた調査業務のシーンを想定。（※おそらくこの後ふたりは飲み行っていい感じになったであろう…）
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
