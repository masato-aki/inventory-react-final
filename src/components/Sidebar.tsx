import React from "react";

interface SidebarProps {
  currentMenu: string;
  onSelectMenu: (menuName: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentMenu,
  onSelectMenu,
}) => {
  const menuItems = [
    { id: "top", label: "1. 組織情報照会" },
    { id: "task2", label: "2. 組織別品目照会" },
    { id: "task3", label: "3. 複数品目・組織照会" },
    { id: "task4", label: "4. 品目原価照会" },
    { id: "task5", label: "5. 保管場所・在庫照会" },
    { id: "task6", label: "6. 各工場の品目数集計" },
    { id: "task7", label: "7. 部品情報登録履歴照会" },
    { id: "task8", label: "8. 品目タイプロジック整形" },
    { id: "task9", label: "9. 工順なし半組立品の抽出" },
    { id: "task10", label: "10. 納入先・月別発注件数集計" },
  ];

  return (
    <aside
      style={{
        width: "280px", // 横幅を 220px -> 280px に太く！
        backgroundColor: "#1b2533",
        color: "#ffffff",
        minHeight: "100vh",
        padding: "0",
        boxSizing: "border-box",
        flexShrink: 0,
      }}
    >
      <div style={{ padding: "24px 20px", borderBottom: "2px solid #2d3748" }}>
        <h2
          style={{
            fontSize: "1.4rem",
            color: "#ffffff",
            margin: 0,
            fontWeight: "bold",
          }}
        >
          業務 メニュー
        </h2>
      </div>

      <ul style={{ listStyle: "none", padding: "16px 0", margin: 0 }}>
        {menuItems.map((item) => {
          const isActive =
            currentMenu === item.id ||
            (item.id === "top" && currentMenu === "top");
          return (
            <li key={item.id}>
              <button
                onClick={() =>
                  onSelectMenu(item.id === "top" ? "task1" : item.id)
                }
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "14px 20px", // ボタンの上下余白を大きく
                  backgroundColor: isActive ? "#1d4ed8" : "transparent",
                  color: isActive ? "#ffffff" : "#cbd5e1",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.1rem", // 文字を大ぶりに！
                  fontWeight: isActive ? "bold" : "normal",
                  transition: "background-color 0.15s",
                }}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
