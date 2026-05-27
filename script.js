// アプリケーションの状態管理
let lovePoints = 0;
const unlockedAnimals = ['cavalier']; // 初期はキャバリアのみ解放
let currentAnimal = 'cavalier';
let isSleeping = true;

// 動物たちのデータ定義（お世話度に応じてSVGのパーツや色が変化します）
const animalData = {
    cavalier: { name: 'キャバリア', bodyColor: '#f4ece1', earColor: '#cfbba3', type: 'dog' },
    cat: { name: 'ねこちゃん', bodyColor: '#fff9e6', earColor: '#fcd3b2', type: 'cat' },
    panda: { name: 'パンダくん', bodyColor: '#ffffff', earColor: '#4a423a', type: 'panda' },
    rabbit: { name: 'うさぎちゃん', bodyColor: '#fff0f5', earColor: '#fca1a1', type: 'rabbit' }
};

// ほめくじ（〜賞）のメッセージバリエーション
const awardsList = [
    { title: "🏆 がんばったで賞", message: "今日もお仕事へ行っただけで100点満点だよ〜。ぽてっとのんびり、休もうねぇ。" },
    { title: "🌟 えらすぎるで賞", message: "パソコンを開いてえらい！まわりに気を遣えてえらい！息してるだけで大天才だよぉ。" },
    { title: "🍵 よくやったで賞", message: "ひとまず今日のタスクはおしまい！あったかいお茶でも飲んで、自分をごきげんにしてあげてね。" },
    { title: "☁️ 生きてるだけで大吉で賞", message: "結果なんて気にしなくて大丈夫〜。今日も生きていてくれたことが、なによりのごほうびだよ。" },
    { title: "🍯 ハナマル満点賞", message: "よーくがんばりました！今夜は美味しいもの食べて、すぐにお布団に吸い込まれちゃおう。" },
    { title: "☺  お疲れ様で賞", message: "今日もお疲れ様！！ゆっくり休んでまた明日も頑張ろう。"}
];

// 音声再生ロジック（Web Audio API を使用し、外部ファイル不要で優しい音色を生成）
let audioCtx = null;
let isAudioEnabled = false;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playTone(freq, type, duration) {
    if (!isAudioEnabled || !audioCtx) return;
    try {
        let osc = audioCtx.createOscillator();
        let gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) { console.log(e); }
}

// 起き上がったときの優しい和音
function playWakeUpSound() {
    initAudio();
    playTone(523.25, 'triangle', 0.4); // C5
    setTimeout(() => playTone(659.25, 'triangle', 0.4), 150); // E5
    setTimeout(() => playTone(783.99, 'triangle', 0.5), 300); // G5
}

// タップ時の小さな効果音
function playTapSound() {
    initAudio();
    playTone(440, 'sine', 0.1); // A4
}

// DOM要素の取得
const animalSprite = document.getElementById('animal-sprite');
const promptText = document.getElementById('prompt-text');
const resultCard = document.getElementById('result-card');
const awardTitle = document.getElementById('award-title');
const awardMessage = document.getElementById('award-message');
const closeBtn = document.getElementById('close-btn');
const lovePointsText = document.getElementById('love-points');
const unlockedCountText = document.getElementById('unlocked-count');
const characterSelector = document.getElementById('character-selector');
const animalTabsContainer = document.getElementById('animal-tabs');
const bgmBtn = document.getElementById('bgm-btn');

// SVGの動的パーツ変更用
const svgBody = document.getElementById('svg-body');
const svgEarL = document.getElementById('svg-ear-l');
const svgEarR = document.getElementById('svg-ear-r');
const svgEyeL = document.getElementById('svg-eye-l');
const svgEyeR = document.getElementById('svg-eye-r');
const zzzGroup = document.getElementById('zzz-group');

// 音声ON/OFF切り替え
bgmBtn.addEventListener('click', () => {
    isAudioEnabled = !isAudioEnabled;
    if (isAudioEnabled) {
        initAudio();
        bgmBtn.textContent = "🎵 音声をオフにする";
        playTone(659.25, 'sine', 0.3);
    } else {
        bgmBtn.textContent = "🎵 音声をオンにする";
    }
});

// 動物の見た目を動的にアップデートする関数
function updateAnimalVisuals(animalKey, state) {
    const data = animalData[animalKey];
    svgBody.setAttribute('fill', data.bodyColor);
    svgEarL.setAttribute('fill', data.earColor);
    svgEarR.setAttribute('fill', data.earColor);

    // 種類に応じて耳の形状を変更
    if (data.type === 'panda') {
        svgEarL.setAttribute('d', 'M25 35 A 10 10 0 1 0 15 25 Z');
        svgEarR.setAttribute('d', 'M75 35 A 10 10 0 1 1 85 25 Z');
    } else if (data.type === 'rabbit') {
        svgEarL.setAttribute('d', 'M30 30 Q20 5 30 5 Q40 5 35 30 Z');
        svgEarR.setAttribute('d', 'M70 30 Q80 5 70 5 Q60 5 65 30 Z');
    } else if (data.type === 'cat') {
        svgEarL.setAttribute('d', 'M20 35 L15 15 L38 30 Z');
        svgEarR.setAttribute('d', 'M80 35 L85 15 L62 30 Z');
    } else { // キャバリア (犬)
        svgEarL.setAttribute('d', 'M23 40 Q13 45 18 70 Q23 75 28 55 Z');
        svgEarR.setAttribute('d', 'M77 40 Q87 45 82 70 Q77 75 72 55 Z');
    }

    if (state === 'sleeping') {
        svgEyeL.setAttribute('d', 'M33 55 Q40 58 42 55');
        svgEyeR.setAttribute('d', 'M58 55 Q60 58 67 55');
        zzzGroup.classList.remove('hidden');
        animalSprite.className = 'sleeping';
    } else {
        // おめめパチリ
        svgEyeL.setAttribute('d', 'M35 55 A 2 2 0 1 1 35 54.9 Z');
        svgEyeR.setAttribute('d', 'M65 55 A 2 2 0 1 1 65 54.9 Z');
        zzzGroup.classList.add('hidden');
    }
}

// 動物をタップして起こすイベント
animalSprite.addEventListener('click', () => {
    if (!isSleeping) return; // すでに起きている場合は反応しない
    
    playWakeUpSound();
    isSleeping = false;
    
    // 起き上がり中のアニメーション適用
    animalSprite.className = 'waking';
    promptText.textContent = "...むにゃむにゃ";

    setTimeout(() => {
        // 完全起床状態
        updateAnimalVisuals(currentAnimal, 'awake');
        animalSprite.className = 'awake';

        // ランダムに賞を決定
        const randomAward = awardsList[Math.floor(Math.random() * awardsList.length)];
        
        // 結果カードへの反映と表示
        awardTitle.textContent = randomAward.title;
        awardMessage.textContent = randomAward.message;
        resultCard.classList.remove('hidden');
        
        const currentName = animalData[currentAnimal].name;
        promptText.innerHTML = `${currentName}ちゃんが 起き上がって<br>あなたを褒めるための 賞状を用意してくれたよ！`;

        // お世話度の加算
        lovePoints += 10;
        lovePointsText.textContent = lovePoints;

        // 新しい仲間が解放されるかチェック
        checkUnlocks();
    }, 600); // アニメーションと同期
});

// 結果カードを閉じて寝かしつけるイベント
closeBtn.addEventListener('click', () => {
    playTapSound();
    resultCard.classList.add('hidden');
    isSleeping = true;
    updateAnimalVisuals(currentAnimal, 'sleeping');
    
    const currentName = animalData[currentAnimal].name;
    promptText.innerHTML = `${currentName}ちゃんが すやすや 眠っています。<br>タップして 起こしてあげてね。`;
});

// お世話度に応じた仲間解放チェック
function checkUnlocks() {
    let newlyUnlocked = false;
    
    if (lovePoints >= 10 && !unlockedAnimals.includes('cat')) {
        unlockedAnimals.push('cat');
        newlyUnlocked = true;
    }
    if (lovePoints >= 20 && !unlockedAnimals.includes('panda')) {
        unlockedAnimals.push('panda');
        newlyUnlocked = true;
    }
    if (lovePoints >= 30 && !unlockedAnimals.includes('rabbit')) {
        unlockedAnimals.push('rabbit');
        newlyUnlocked = true;
    }

    if (newlyUnlocked) {
        unlockedCountText.textContent = unlockedAnimals.length;
        renderTabs();
        // 疲れた人にトドメの癒やし（アラート演出）
        setTimeout(() => {
            alert("✨ お世話度が上がって、あたらしいうちの仲間が遊びに来たよ！上のタブから選んでみてね。");
        }, 300);
    }
}

// 解放された仲間を切り替えるタブの描画
function renderTabs() {
    if (unlockedAnimals.length > 1) {
        characterSelector.classList.remove('hidden');
    }
    
    animalTabsContainer.innerHTML = '';
    unlockedAnimals.forEach(animalKey => {
        const btn = document.createElement('button');
        btn.className = `tab-btn ${animalKey === currentAnimal ? 'active' : ''}`;
        btn.textContent = animalData[animalKey].name;
        btn.addEventListener('click', () => {
            if (!isSleeping) return; // 起きている間は切り替え不可
            playTapSound();
            currentAnimal = animalKey;
            
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            updateAnimalVisuals(currentAnimal, 'sleeping');
            promptText.innerHTML = `${animalData[currentAnimal].name}ちゃんが すやすや 眠っています。<br>タップして 起こしてあげてね。`;
        });
        animalTabsContainer.appendChild(btn);
    });
}

// 初期化実行
updateAnimalVisuals('cavalier', 'sleeping');
renderTabs();