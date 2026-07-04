let canvas = document.getElementById("matrix-canvas");
let context = canvas.getContext("2d");

let aud = document.getElementById("myAudio");

const greenColors = [
    "#006400", "#008000", "#228B22", "#32CD32", "#00FF00", "#7FFF00", "#7CFC00", "#ADFF2F",
    "#98FB98", "#90EE90", "#00FA9A", "#00FF7F", "#2E8B57", "#3CB371", "#66CDAA", "#8FBC8F",
    "#20B2AA", "#2F4F4F", "#006400", "#556B2F"
];

let letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
let nums = ['0','1','2','3','4','5','6','7','8','9'];
let katakana = [
    'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ',
    'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト',
    'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
    'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ',
    'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン', 'ガ', 'ギ', 'グ', 'ゲ',
    'ゴ', 'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ', 'ダ', 'ヂ', 'ヅ', 'デ',
    'ド', 'バ', 'ビ', 'ブ', 'ベ', 'ボ', 'パ', 'ピ', 'プ', 'ペ',
    'ポ'
];
let chineseCharacters = [
    "你", "好", "我", "是", "了", "不", "有", "在", "他", "她",
    "它", "们", "这", "那", "我们", "你们", "他们", "她们", "它们",
    "的", "和", "说", "到", "去", "来", "见", "做", "吃", "喝",
    "爱", "学", "问", "哪", "里", "时", "间", "天", "年", "日",
    "月", "星期", "小时", "分钟", "秒", "大", "小", "多", "少",
    "好", "坏", "美", "丑", "快", "慢", "高", "低", "远", "近",
    "上", "下", "左", "右", "前", "后", "中", "外", "男", "女"
];

let matrix = letters.concat(nums, katakana, chineseCharacters);

let fallingchars = [];
const minFontSize = 16;
const maxFontSize = 24;
const chineseFontSizeAdjustment = 0.7; // Reduce the size by 30% for Chinese characters
let columns;

function initialize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / minFontSize);

    fallingchars = [];
    for (let i = 0; i < columns; i++){
        let fontSize = Math.floor(Math.random() * (maxFontSize - minFontSize + 1)) + minFontSize;
        fallingchars[i] = {
            x: i * minFontSize,
            y: -Math.random() * canvas.height * 3,
            fontSize: fontSize,
            speed: (fontSize - 4) / 2 + Math.random()/6 * (fontSize - 10),
            color: greenColors[Math.floor(Math.random() * greenColors.length)]
        };
    }
}

window.addEventListener('resize', initialize);

function draw() {
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < fallingchars.length; i++) {
        let fade = Math.max(0.2, 0.9 - fallingchars[i].y / canvas.height);
        context.fillStyle = 'rgba(0, 255, 0, ' + fade + ')';

        let char = matrix[Math.floor(Math.random() * matrix.length)];
        let fontSize = fallingchars[i].fontSize;

        // Check if the character is Chinese
        if (chineseCharacters.includes(char)) {
            fontSize *= chineseFontSizeAdjustment; // Apply size adjustment
        }

        context.font = `${fontSize}px Courier`;
        context.fillText(char, fallingchars[i].x, fallingchars[i].y);
        fallingchars[i].y += fallingchars[i].speed;
        context.fillStyle = fallingchars[i].color;

        if (fallingchars[i].y > canvas.height && Math.random() > 0.975) {
            fallingchars[i].y = 0;
        }
    }

    requestAnimationFrame(draw);
}

setTimeout(() => {
    initialize();
    draw();
    aud.currentTime = 25.2;
    aud.play();
}, 2000);
