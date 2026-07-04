// 仲間外れゲームの問題データ
// script.js から <script src="oddoneout-data.js"> で読み込んで使用する
// items は4つで、そのうち1つだけ京都と関係のないもの(oddIndexが示す)
const KYOTO_ODDONEOUT_DATA = [
  {
    items: [
      { emoji: "🛕", label: "金閣寺" },
      { emoji: "🛕", label: "清水寺" },
      { emoji: "⛩️", label: "伏見稲荷" },
      { emoji: "🛕", label: "浅草寺" },
    ],
    oddIndex: 3,
    explanation: "浅草寺は東京・浅草にあるお寺。京都のお寺ではありません。",
  },
  {
    items: [
      { emoji: "🛕", label: "銀閣寺" },
      { emoji: "⛩️", label: "八坂神社" },
      { emoji: "🛕", label: "東寺" },
      { emoji: "🗿", label: "東大寺" },
    ],
    oddIndex: 3,
    explanation: "東大寺は奈良県にある大仏で有名なお寺です。",
  },
  {
    items: [
      { emoji: "🛕", label: "天龍寺" },
      { emoji: "🛕", label: "建仁寺" },
      { emoji: "⛩️", label: "北野天満宮" },
      { emoji: "⛩️", label: "厳島神社" },
    ],
    oddIndex: 3,
    explanation: "厳島神社は広島県・宮島の海に浮かぶ鳥居で有名な神社です。",
  },
  {
    items: [
      { emoji: "🍡", label: "八ツ橋" },
      { emoji: "🥮", label: "阿闍梨餅" },
      { emoji: "🍡", label: "おたべ" },
      { emoji: "🍪", label: "白い恋人" },
    ],
    oddIndex: 3,
    explanation: "白い恋人は北海道の有名なお菓子です。",
  },
  {
    items: [
      { emoji: "🍡", label: "生八つ橋" },
      { emoji: "🍵", label: "宇治抹茶" },
      { emoji: "🥒", label: "京漬物" },
      { emoji: "🍁", label: "もみじ饅頭" },
    ],
    oddIndex: 3,
    explanation: "もみじ饅頭は広島県・宮島の名物お菓子です。",
  },
  {
    items: [
      { emoji: "🍢", label: "湯葉" },
      { emoji: "🍵", label: "宇治抹茶" },
      { emoji: "🥒", label: "京漬物" },
      { emoji: "🥟", label: "崎陽軒シウマイ" },
    ],
    oddIndex: 3,
    explanation: "崎陽軒のシウマイは神奈川県・横浜の名物です。",
  },
  {
    items: [
      { emoji: "👘", label: "祇園" },
      { emoji: "🏮", label: "先斗町" },
      { emoji: "🏙️", label: "河原町" },
      { emoji: "🌉", label: "道頓堀" },
    ],
    oddIndex: 3,
    explanation: "道頓堀は大阪の繁華街です。",
  },
  {
    items: [
      { emoji: "🎋", label: "嵐山" },
      { emoji: "⛩️", label: "伏見" },
      { emoji: "🎬", label: "太秦" },
      { emoji: "🏙️", label: "秋葉原" },
    ],
    oddIndex: 3,
    explanation: "秋葉原は東京にある電気街です。",
  },
  {
    items: [
      { emoji: "🏮", label: "木屋町" },
      { emoji: "🏙️", label: "烏丸" },
      { emoji: "🏙️", label: "河原町" },
      { emoji: "🛍️", label: "心斎橋" },
    ],
    oddIndex: 3,
    explanation: "心斎橋は大阪の繁華街です。",
  },
  {
    items: [
      { emoji: "🏮", label: "祇園祭" },
      { emoji: "🎎", label: "時代祭" },
      { emoji: "🌿", label: "葵祭" },
      { emoji: "🏮", label: "ねぶた祭" },
    ],
    oddIndex: 3,
    explanation: "ねぶた祭は青森県の有名な夏祭りです。",
  },
  {
    items: [
      { emoji: "🏮", label: "祇園祭" },
      { emoji: "🔥", label: "五山送り火" },
      { emoji: "🎎", label: "時代祭" },
      { emoji: "💃", label: "阿波踊り" },
    ],
    oddIndex: 3,
    explanation: "阿波踊りは徳島県の有名な踊りの祭りです。",
  },
  {
    items: [
      { emoji: "🌊", label: "鴨川" },
      { emoji: "🌊", label: "桂川" },
      { emoji: "🌊", label: "保津川" },
      { emoji: "🌊", label: "隅田川" },
    ],
    oddIndex: 3,
    explanation: "隅田川は東京を流れる川です。",
  },
  {
    items: [
      { emoji: "⛰️", label: "嵐山" },
      { emoji: "⛰️", label: "貴船" },
      { emoji: "⛰️", label: "鞍馬" },
      { emoji: "🗻", label: "富士山" },
    ],
    oddIndex: 3,
    explanation: "富士山は静岡県・山梨県にまたがる日本一高い山です。",
  },
  {
    items: [
      { emoji: "🧵", label: "西陣織" },
      { emoji: "🏺", label: "清水焼" },
      { emoji: "🎨", label: "京友禅" },
      { emoji: "🏺", label: "有田焼" },
    ],
    oddIndex: 3,
    explanation: "有田焼は佐賀県の有名な焼き物です。",
  },
  {
    items: [
      { emoji: "🪭", label: "京扇子" },
      { emoji: "🌟", label: "金箔" },
      { emoji: "🏺", label: "京焼" },
      { emoji: "🫖", label: "南部鉄器" },
    ],
    oddIndex: 3,
    explanation: "南部鉄器は岩手県の有名な鉄器です。",
  },
  {
    items: [
      { emoji: "🗼", label: "京都タワー" },
      { emoji: "🚋", label: "嵐電" },
      { emoji: "🚃", label: "京阪電車" },
      { emoji: "🗼", label: "スカイツリー" },
    ],
    oddIndex: 3,
    explanation: "スカイツリーは東京にある電波塔です。",
  },
];
