import React from "react";

export const Top: React.FC = () => {
  return (
    <div style={{ maxWidth: "850px", margin: "20px auto", padding: "0 20px" }}>
      {/* メインタイトル */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1
          style={{
            fontSize: "1.8rem",
            color: "#1e293b",
            borderBottom: "3px solid #2563eb",
            display: "inline-block",
            paddingBottom: "10px",
            marginTop: 0,
          }}
        >
          ■ SQL課題を社内システムで表現してみたシステム
        </h1>
      </div>

      {/* 開発背景と目的・工夫点（統合枠） */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "2px solid #3b82f6",
          borderRadius: "12px",
          padding: "28px 32px",
          marginBottom: "30px",
          boxShadow: "0 4px 12px rgba(37, 99, 235, 0.08)",
        }}
      >
        <h2
          style={{
            color: "#1e3a8a",
            marginTop: 0,
            fontSize: "1.25rem",
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: "10px",
            marginBottom: "20px",
          }}
        >
          ■ 本アプリの作成背景と目的
        </h2>

        <p
          style={{
            color: "#334155",
            lineHeight: "1.85",
            fontSize: "0.98rem",
            textAlign: "left",
            marginBottom: "18px",
          }}
        >
          八王子の先輩からいただいたSQL課題に取り組んだことにより、データ抽出条件を考える非常に良い勉強になりました。
        </p>

        <p
          style={{
            color: "#334155",
            lineHeight: "1.85",
            fontSize: "0.98rem",
            textAlign: "left",
            marginBottom: "18px",
          }}
        >
          ただDBツールで解答のSQLを実行するだけではもったいないなと思い、SQL課題で出題された問題と解答のSQLを画面上に表現したシステムを作成することにしました。
        </p>

        <p
          style={{
            color: "#334155",
            lineHeight: "1.85",
            fontSize: "0.98rem",
            textAlign: "left",
            marginBottom: "18px",
          }}
        >
          前提として、ある部品製造会社のシステム部の社員さんや工場で働く現場の社員さんが、社内製品管理システムで検索操作を行ったというシーンを製作者が勝手に想像しています。
          <br />
          そのうえで、各画面にシステム利用者が実際に画面を操作した利用シーンの注釈（ストーリー）を添え、システム利用者目線でアプリの操作を進められる様に制作しました。
        </p>

        <p
          style={{
            color: "#334155",
            lineHeight: "1.85",
            fontSize: "0.98rem",
            textAlign: "left",
            marginBottom: 0,
          }}
        >
          そして、アプリの裏側でSQL課題の解答となったSQLがどのようにソースに取り込まれて生成・実行され、システムの画面に表示されるのか、一連の流れを体感することを学習目的として制作を進めました。
        </p>
      </div>
    </div>
  );
};
