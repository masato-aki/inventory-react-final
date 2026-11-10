import React, { useState } from "react";
import "./App.css";

// 共通レイアウトコンポーネント
import { Sidebar } from "./components/Sidebar";
import { Top } from "./components/Top";

// 各課題（Task1〜Task10）の表示コンポーネント
import { Task1Search } from "./components/Task1Search";
import { Task2Search } from "./components/Task2Search";
import { Task3Search } from "./components/Task3Search";
import { Task4Search } from "./components/Task4Search";
import { Task5Search } from "./components/Task5Search";
import { Task6Search } from "./components/Task6Search";
import { Task7Search } from "./components/Task7Search";
import { Task8Search } from "./components/Task8Search";
import { Task9Search } from "./components/Task9Search";
import { Task10Search } from "./components/Task10Search";

/**
 * アプリケーションのルートコンポーネント
 * - サイドバーとメインコンテンツの全体レイアウトを管理
 * - 選択中メニューに応じた動的コンポーネントルーティングを提供
 */
function App() {
  // 現在選択されているメニューキー（初期表示はトップ画面）
  const [currentMenu, setCurrentMenu] = useState<string>("top");

  /**
   * 選択中メニューキーに応じて描画対象のコンポーネントを判定
   */
  const renderContent = () => {
    switch (currentMenu) {
      case "top":
        return <Top />;
      case "task1":
        return <Task1Search />;
      case "task2":
        return <Task2Search />;
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
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {/* 画面左：ナビゲーションサイドバー */}
      <Sidebar currentMenu={currentMenu} onSelectMenu={setCurrentMenu} />

      {/* 画面右：業務コンテンツ描画エリア */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
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
