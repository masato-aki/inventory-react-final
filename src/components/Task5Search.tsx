import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import type { ItemStock } from "../types/inventory";
import { FunnySqlCharacter } from "./FunnySqlCharacter";

export const Task5Search: React.FC = () => {
  const [orgId, setOrgId] = useState<string>("44");
  const [itemId, setItemId] = useState<string>("10002");
  const [list, setList] = useState<ItemStock[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosClient.get<ItemStock[]>("/task5/search", {
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

  // 表示用動的SQL文（先輩の答えに合わせたGROUP BY・SUM形式＆綺麗なインデント）
  const currentSql = `SELECT
  mp.organization_code AS 組織コード,
  msib.segment1 AS 品目コード,
  moqd.subinventory_code AS 保管場所,
  moqd.transaction_uom_code AS 単位,
  SUM(moqd.transaction_quantity) AS 在庫数
FROM
  mtl_parameters mp,
  mtl_system_items_b msib,
  mtl_onhand_quantities_detail moqd
WHERE
  mp.organization_id = ${orgId || "44"}
  AND msib.inventory_item_id = ${itemId || "10002"}
  AND mp.organization_id = msib.organization_id
  AND mp.organization_id = moqd.organization_id
  AND msib.inventory_item_id = moqd.inventory_item_id
GROUP BY
  mp.organization_code,
  msib.segment1,
  moqd.subinventory_code,
  moqd.transaction_uom_code;`.trim();

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
        {/* 左側：出題内容（task5.png） */}
        <div
          style={{
            border: "2px solid #cbd5e1",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            boxSizing: "border-box",
            width: "100%",
            minHeight: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/images/task5.png"
            alt="課題5仕様"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "600px",
              objectFit: "contain",
              display: "block",
              borderRadius: "8px",
            }}
          />
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
                ※動作確認用：組織IDに「44」、品目IDに「10002」を入力して検索
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
                  // value={orgId}
                  onChange={(e) => setOrgId(e.target.value)}
                  placeholder="例:44"
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
                  // value={itemId}
                  onChange={(e) => setItemId(e.target.value)}
                  placeholder="10002"
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
                  {loading ? "照会中..." : "在庫照会"}
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
                          padding: "10px 12px",
                          border: "2px solid #cbd5e1",
                          textAlign: "center",
                        }}
                      >
                        組織コード
                      </th>
                      <th
                        style={{
                          padding: "10px 12px",
                          border: "2px solid #cbd5e1",
                          textAlign: "center",
                        }}
                      >
                        品目コード
                      </th>
                      <th
                        style={{
                          padding: "10px 12px",
                          border: "2px solid #cbd5e1",
                          textAlign: "center",
                        }}
                      >
                        保管場所
                      </th>
                      <th
                        style={{
                          padding: "10px 12px",
                          border: "2px solid #cbd5e1",
                          textAlign: "center",
                        }}
                      >
                        単位
                      </th>
                      <th
                        style={{
                          padding: "10px 12px",
                          border: "2px solid #cbd5e1",
                          textAlign: "center",
                        }}
                      >
                        在庫数
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.length > 0 ? (
                      list.map((item, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              padding: "10px 12px",
                              border: "2px solid #cbd5e1",
                              textAlign: "center",
                            }}
                          >
                            {item.organizationCode}
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              border: "2px solid #cbd5e1",
                              textAlign: "center",
                              fontWeight: "bold",
                            }}
                          >
                            {item.segment1}
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              border: "2px solid #cbd5e1",
                              textAlign: "center",
                            }}
                          >
                            {item.subinventoryCode}
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              border: "2px solid #cbd5e1",
                              textAlign: "center",
                            }}
                          >
                            {item.uomCode}
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              border: "2px solid #cbd5e1",
                              textAlign: "center",
                              fontWeight: "bold",
                              color: "#2563eb",
                            }}
                          >
                            {item.primaryQuantity !== undefined &&
                            item.primaryQuantity !== null
                              ? item.primaryQuantity.toLocaleString()
                              : "-"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          style={{
                            padding: "16px",
                            textAlign: "center",
                            color: "#64748b",
                          }}
                        >
                          「在庫照会」ボタンを押すと結果が表示されます
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
                ※システム部の社員さんが偶然本社で出くわした工場長に「あの部品、今どの棚に何個残ってる？」と聞かれ、その場ですぐ組織ID（
                <strong>{orgId || "44"}</strong>）と品目ID（
                <strong>{itemId || "10002"}</strong>
                ）から各保管場所（棚番）ごとの手持在庫数の合計を調べて回答したシーンを想定。
                <br />
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "#64748b",
                    marginTop: "4px",
                    display: "inline-block",
                  }}
                >
                  ★「OMI」は、システム内で「個」や「セット」などの数え方を表す単位の名前。
                </span>
              </p>
            </div>
          </div>

          <FunnySqlCharacter sqlText={currentSql} />
        </div>
      </div>
    </div>
  );
};
