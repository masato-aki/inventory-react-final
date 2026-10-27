import React, { useState } from "react";
import axiosClient from "../api/axiosCLient";
// import type { ItemOrg } from "../types/inventory";
import { FunnySqlCharacter } from "./FunnySqlCharacter";

type ItemOrg = {
  organizationCode: string;
};

export const Task1Search: React.FC = () => {
  // 初期値は空文字にして、ユーザーに入力してもらう
  const [orgId, setOrgId] = useState<string>("");
  const [list, setList] = useState<ItemOrg[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosClient.get<ItemOrg[]>("/task1", {
        params: { orgId: orgId || "43" }, // 未入力時はデフォルト43で検索
      });
      setList(response.data);
    } catch (error) {
      console.error("データ取得エラー:", error);
    } finally {
      setLoading(false);
    }
  };

  // 表示用SQL文
  const currentSql = `SELECT organization_id, organization_code FROM mtl_parameters WHERE organization_id = ${orgId || "43"};`;

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
              src="/images/task1.png"
              alt="課題1仕様"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>

        {/* 右側：業務想定画面 ＆ キャラクター */}
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
                  fontSize: "1rem",
                  marginTop: 0,
                  marginBottom: "16px",
                  textAlign: "center",
                }}
              >
                ※動作確認用：組織IDに「43」を入力して検索
              </p>

              <form
                onSubmit={handleSearch}
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  組織ID：
                </label>
                <input
                  type="text"
                  value={orgId}
                  onChange={(e) => setOrgId(e.target.value)}
                  placeholder="例: 43"
                  style={{
                    width: "90px",
                    textAlign: "center",
                    padding: "8px",
                    border: "2px solid #94a3b8",
                    borderRadius: "6px",
                    fontSize: "1.1rem",
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: "8px 24px",
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
                      組織コード (工場や倉庫の番号呼び変え)
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
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                          }}
                        >
                          {item.organizationCode}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        style={{
                          padding: "16px",
                          textAlign: "center",
                          color: "#64748b",
                        }}
                      >
                        「検索」ボタンを押すと結果が表示されます
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <p
                style={{
                  color: "#475569",
                  fontSize: "0.95rem",
                  marginTop: "16px",
                  marginBottom: 0,
                  lineHeight: 1.6,
                }}
              >
                ※本社の社員さんがシステム内で使われている組織ID（
                <strong>{orgId || "43"}</strong>
                ）を検索し、工場の社員さんたちの間で呼ばれる組織コード（
                <strong>{list[0]?.organizationCode || "04"}</strong>
                ）と紐付いていることを確認するためにこの検索を行った。
              </p>
            </div>
          </div>

          <FunnySqlCharacter sqlText={currentSql} />
        </div>
      </div>
    </div>
  );
};
