import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Top } from "./components/Top";
import { Task1Search } from "./components/Task1Search";
import { Task2Search } from "./components/Task2Search"; // 👈 🟩 課題2コンポーネントを追加！
import { Task3Search } from "./components/Task3Search";
import { Task4Search } from "./components/Task4Search"; // 👈 追加
import { Task5Search } from "./components/Task5Search";

import "./App.css";
import { Task6Search } from "./components/Task6Search";
import { Task7Search } from "./components/Task7Search";
import { Task8Search } from "./components/Task8Search";
import { Task9Search } from "./components/Task9Search";
import { Task10Search } from "./components/Task10Search";

function App() {
  const [currentMenu, setCurrentMenu] = useState<string>("top");

  const renderContent = () => {
    switch (currentMenu) {
      case "top":
        return <Top />;
      case "task1":
        return <Task1Search />;
      case "task2":
        return <Task2Search />; // 👈 🟩 <Top /> から <Task2Search /> へ差し替え！
      case "task3":
        return <Task3Search />;
      case "task4":
        return <Task4Search />;
      case "task5":
        return <Task5Search />;
      case "task6":
        return <Task6Search />;
      case "task7":
        return <Task7Search />;
      case "task8":
        return <Task8Search />;
      case "task9":
        return <Task9Search />;
      case "task10":
        return <Task10Search />;
      default:
        return <Top />;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f1f5f9",
        width: "100%", // 縦スクロールバーを考慮した正確な幅
        overflowX: "hidden", // 横スクロールバーの発生を抑止
      }}
    >
      {/* 左側：サイドバー */}
      <Sidebar currentMenu={currentMenu} onSelectMenu={setCurrentMenu} />

      {/* 右側：メインコンテンツ */}
      <main
        style={{
          flex: 1, // 残りの幅を自動で埋める
          minWidth: 0, // 子要素による幅崩れを防止
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
