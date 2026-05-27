* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
}

body {
    font-family: 'Kiwi Maru', 'Hiragino Maru Gothic ProN', sans-serif;
    background-color: #faf4eb;
    color: #5a4e41;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 15px;
}

/* スマホ用アプリ風のコンテナ */
#app-container {
    width: 100%;
    max-width: 420px;
    height: 90vh;
    max-height: 740px;
    background-color: #ffffff;
    border-radius: 32px;
    box-shadow: 0 12px 36px rgba(163, 145, 122, 0.15);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    border: 6px solid #f0e4d4;
}

/* ヘッダー */
header {
    padding: 18px 24px;
    display: flex;
    justify-content: space-between;
    background-color: #faf5ee;
    border-bottom: 2px dashed #ebdcc8;
    font-size: 14px;
    font-weight: 500;
}

.status-item {
    background: #ffffff;
    padding: 6px 14px;
    border-radius: 20px;
    border: 1px solid #efe5d8;
}

#love-points, #unlocked-count {
    color: #cc8b65;
    font-weight: bold;
}

/* メイン領域 */
main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    justify-content: space-between;
}

/* なかま選択タブ */
#character-selector {
    width: 100%;
    text-align: center;
    animation: fadeIn 0.5s ease;
}

.instruction-text {
    font-size: 12px;
    color: #8c7b6c;
    margin-bottom: 8px;
}

#animal-tabs {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
}

.tab-btn {
    border: none;
    background: #f5ede2;
    color: #706151;
    padding: 6px 14px;
    border-radius: 15px;
    font-family: inherit;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.tab-btn.active {
    background: #cc8b65;
    color: #ffffff;
    box-shadow: 0 4px 10px rgba(204, 139, 101, 0.3);
}

/* ゲーム表示エリア */
#game-zone {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
}

#animal-container {
    width: 180px;
    height: 180px;
    margin-bottom: 20px;
    cursor: pointer;
}

/* 動物のアニメーションステート */
#animal-sprite {
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease;
}

/* 1. すやすや睡眠（呼吸） */
#animal-sprite.sleeping {
    animation: breathing 3s ease-in-out infinite;
}

/* 2. ぽてっと起きる */
#animal-sprite.waking {
    animation: stretchWobble 0.6s ease-out forwards;
}

/* 3. 起きてごきげん */
#animal-sprite.awake {
    animation: happyBounce 2.5s ease-in-out infinite;
}

@keyframes breathing {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.03) translateY(-2px); }
}

@keyframes stretchWobble {
    0% { transform: scale(1); }
    30% { transform: scale(0.9, 1.1) translateY(-10px); }
    60% { transform: scale(1.1, 0.9) translateY(2px); }
    100% { transform: scale(1); }
}

@keyframes happyBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px) scale(1.02); }
}

/* Zzzのエフェクト */
.zzz-text {
    fill: #9c8d7d;
    animation: floatZzz 3s infinite;
    opacity: 0;
}

#zzz-group text:nth-child(2) {
    animation-delay: 1.5s;
}

@keyframes floatZzz {
    0% { opacity: 0; transform: translate(0, 0); }
    30% { opacity: 0.6; }
    100% { opacity: 0; transform: translate(8px, -15px) scale(1.2); }
}

#prompt-text {
    text-align: center;
    font-size: 14px;
    line-height: 1.7;
    color: #706151;
    min-height: 50px;
}

/* 結果表示カード */
#result-card {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    background-color: #fffaf4;
    border: 3px solid #f5ede2;
    border-radius: 24px;
    padding: 22px;
    box-shadow: 0 8px 24px rgba(90, 78, 65, 0.12);
    text-align: center;
    animation: popUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes popUp {
    from { opacity: 0; transform: translateY(40px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}

#award-title {
    font-size: 18px;
    color: #cc8b65;
    margin-bottom: 10px;
}

#award-message {
    font-size: 14px;
    line-height: 1.6;
    color: #5a4e41;
    margin-bottom: 16px;
}

#close-btn {
    background-color: #cc8b65;
    color: white;
    border: none;
    padding: 10px 28px;
    border-radius: 20px;
    font-family: inherit;
    font-size: 14px;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(204, 139, 101, 0.2);
    transition: background 0.2s;
}

#close-btn:hover {
    background-color: #bd7e59;
}

.audio-toggle {
    width: 100%;
    padding: 10px;
    text-align: center;
    background-color: #faf5ee;
}

#bgm-btn {
    background: none;
    border: 1px solid #ebdcc8;
    color: #8c7b6c;
    font-family: inherit;
    font-size: 11px;
    padding: 4px 12px;
    border-radius: 12px;
    cursor: pointer;
}

.hidden {
    display: none !important;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
