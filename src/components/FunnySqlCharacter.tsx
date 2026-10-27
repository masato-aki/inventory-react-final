import React, { useState } from "react";

interface Props {
  sqlText: string;
}

export const FunnySqlCharacter: React.FC<Props> = ({ sqlText }) => {
  const [phase, setPhase] = useState<"idle" | "eating" | "pooping" | "done">(
    "idle",
  );
  const [poopStep, setPoopStep] = useState<number>(0);

  const handleAction = () => {
    if (phase !== "idle" && phase !== "done") return;

    setPhase("eating");
    setPoopStep(0);

    // 1. えさがゆっくり口に入る (1.8秒)
    setTimeout(() => {
      setPhase("pooping");
      setPoopStep(1); // 「ぶり！」1段階目
    }, 1800);

    // 2. 「ぶり！」2段階目 (2.8秒時点)
    setTimeout(() => {
      setPoopStep(2);
    }, 2800);

    // 3. 「ぶりーーッ！」3段階目 (3.8秒時点)
    setTimeout(() => {
      setPoopStep(3);
    }, 3800);

    // 4. 排出完了 (5.2秒時点) ➔ ぶりぶりオノマトペ消絶！
    setTimeout(() => {
      setPhase("done");
      setPoopStep(0); // テキストクリア
    }, 5200);
  };

  return (
    <div
      style={{
        border: "2px solid #cbd5e1",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        marginTop: "16px",
      }}
    >
      {/* アクションヘッダー */}
      <div
        onClick={handleAction}
        style={{
          padding: "14px 20px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "1rem",
          color: "#1e293b",
          backgroundColor: "#f8fafc",
          borderBottom: "2px solid #e2e8f0",
          textAlign: "center",
          userSelect: "none",
        }}
      >
        {phase === "idle" &&
          "▼ ボタン押下時にDBへ実行されるSQLを表示（クリックで生成）"}
        {phase === "eating" && "SQLクエリ（えさ）を処理中..."}
        {phase === "pooping" &&
          `お尻からSQL文をひねり出し中... (${poopStep}/3)`}
        {phase === "done" &&
          "▼ ボタン押下時にDBへ実行されるSQLを表示（クリックで再生成）"}
      </div>

      {/* アニメーション表示エリア */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          backgroundColor: "#ffffff",
          padding: "16px 16px 12px 16px",
        }}
      >
        {/* 🌠 吸い込まれる「えさ」（大きめ＆ゆっくり移動） */}
        {phase === "eating" && (
          <div
            style={{
              position: "absolute",
              left: "2%",
              top: "32%",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              animation:
                "flyToMouthSlow 1.8s forwards cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: 10,
            }}
          >
            <span
              style={{
                border: "2px solid #8B1E1E",
                color: "#8B1E1E",
                backgroundColor: "#FAF6F0",
                padding: "4px 12px",
                fontSize: "1.1rem",
                borderRadius: "8px",
                fontWeight: "bold",
                boxShadow: "2px 2px 0px rgba(139,30,30,0.2)",
                fontFamily: "'Comic Sans MS', 'Chalkboard SE', sans-serif",
              }}
            >
              🍖 えさ
            </span>
          </div>
        )}

        {/* 🖼️ キャラクター画像コンテナ */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "220px",
            marginTop: "24px",
            marginBottom: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: "rotate(6deg)",
            animation:
              phase === "pooping"
                ? "buttShakeClean 0.08s infinite" // 排出中はブルブル激振！
                : phase === "eating"
                  ? "munchClean 0.35s infinite"
                  : "idleClean 3s infinite ease-in-out",
            transformOrigin: "center center",
          }}
        >
          <img
            src="/images/muncher.png"
            alt="SQL処理キャラクター"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain",
            }}
          />

          {/* 💩 踏ん張り中（pooping）のみ「ぶり！」「ぶり！」「ぶりーーッ！」を表示！完了（done）で消去 */}
          {phase === "pooping" && (
            <div
              style={{
                position: "absolute",
                right: "-22px",
                bottom: "16%",
                color: "#8B1E1E",
                fontWeight: "bold",
                fontSize: "0.95rem",
                fontFamily: "'Comic Sans MS', 'Chalkboard SE', sans-serif",
                animation: "buriburiText 0.15s infinite alternate",
                whiteSpace: "nowrap",
                userSelect: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "2px",
              }}
            >
              {poopStep >= 1 && <span>ぶり！</span>}
              {poopStep >= 2 && <span>ぶり！</span>}
              {poopStep >= 3 && (
                <span style={{ fontSize: "1.1rem", color: "#e11d48" }}>
                  ぶりーーッ！
                </span>
              )}
            </div>
          )}
        </div>

        {/* 💩 3段階でひねり出され、出切った後もそのまま残るSQL吹き出し */}
        {(phase === "pooping" || phase === "done") && (
          <div
            style={{
              width: "100%",
              marginTop: "4px",
              padding: "16px",
              backgroundColor: "#0f172a",
              borderRadius: "8px",
              border: "1px solid #334155",
              position: "relative",
              boxSizing: "border-box",
              transformOrigin: "74% -10px",
              animation:
                phase === "pooping"
                  ? "poopStepEmerge 3.4s forwards cubic-bezier(0.25, 1, 0.5, 1)"
                  : "none",
            }}
          >
            {/* 吹き出しの三角形ポイント */}
            <div
              style={{
                position: "absolute",
                top: "-10px",
                right: "26%",
                width: "0",
                height: "0",
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderBottom: "10px solid #0f172a",
              }}
            />

            <pre
              style={{
                margin: 0,
                fontFamily: "'Consolas', monospace",
                fontSize: "1rem",
                color: "#f1f5f9",
                whiteSpace: "pre-wrap",
                lineHeight: "1.45",
              }}
            >
              {sqlText}
            </pre>
          </div>
        )}
      </div>

      {/* アニメーション用スタイル定義 */}
      <style>{`
        /* 「えさ」がゆっくり口へ進む */
        @keyframes flyToMouthSlow {
          0% { left: 2%; opacity: 1; transform: scale(1) rotate(-5deg); }
          70% { opacity: 0.9; }
          100% { left: 28%; opacity: 0; transform: scale(0.2) rotate(15deg); }
        }
        @keyframes idleClean {
          0%, 100% { transform: rotate(6deg) translateY(0); }
          50% { transform: rotate(7deg) translateY(-3px); }
        }
        @keyframes munchClean {
          0%, 100% { transform: rotate(6deg) scale(1); }
          50% { transform: rotate(6deg) scale(1.02); }
        }
        @keyframes buttShakeClean {
          0% { transform: rotate(6deg) translate(0, 0); }
          25% { transform: rotate(8deg) translate(3px, -2px); }
          50% { transform: rotate(4deg) translate(-2px, 2px); }
          75% { transform: rotate(7deg) translate(2px, 1px); }
          100% { transform: rotate(6deg) translate(0, 0); }
        }
        @keyframes buriburiText {
          0% { transform: scale(0.9) rotate(-3deg); }
          100% { transform: scale(1.1) rotate(3deg); }
        }
        
        /* 💩 「ぶり！」「ぶり！」「ぶりーーッ！」で絞り出されるアニメーション */
        @keyframes poopStepEmerge {
          0% {
            transform: scale(0.01, 0.02) translateY(-20px);
            opacity: 0.1;
          }
          30% {
            transform: scale(0.25, 0.35) translateY(-14px);
            opacity: 0.6;
          }
          60% {
            transform: scale(0.65, 0.7) translateY(-6px);
            opacity: 0.85;
          }
          85% {
            transform: scale(1.04, 1.05) translateY(2px);
            opacity: 1;
          }
          100% {
            transform: scale(1, 1) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
