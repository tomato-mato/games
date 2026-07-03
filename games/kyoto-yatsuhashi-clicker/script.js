(() => {
  "use strict";

  const STORAGE_KEY = "kyotoOmiyageClickerSave";
  const OFFLINE_CAP_SECONDS = 8 * 3600;
  const OFFLINE_EFFICIENCY = 0.5;

  const MAX_ITEMS_ON_MAP = 6;

  function buildMapBackgroundSVG(theme) {
    return `<svg class="map-bg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <rect x="0" y="0" width="100" height="100" fill="${theme.base}"/>
      <g fill="${theme.mountain1}">
        <circle cx="-4" cy="-4" r="10"/><circle cx="8" cy="1" r="10"/><circle cx="20" cy="-3" r="10"/>
        <circle cx="32" cy="1" r="10"/><circle cx="44" cy="-3" r="10"/><circle cx="56" cy="1" r="10"/>
        <circle cx="68" cy="-3" r="10"/><circle cx="80" cy="1" r="10"/><circle cx="92" cy="-3" r="10"/>
        <circle cx="104" cy="1" r="10"/>
        <circle cx="-2" cy="8" r="10"/><circle cx="-2" cy="20" r="10"/><circle cx="-2" cy="32" r="10"/>
        <circle cx="-2" cy="44" r="10"/><circle cx="-2" cy="56" r="10"/><circle cx="-2" cy="68" r="10"/>
        <circle cx="-2" cy="80" r="10"/><circle cx="-2" cy="92" r="10"/><circle cx="-2" cy="104" r="10"/>
        <circle cx="102" cy="6" r="10"/><circle cx="102" cy="18" r="10"/><circle cx="102" cy="30" r="10"/>
        <circle cx="102" cy="42" r="10"/><circle cx="102" cy="54" r="10"/><circle cx="102" cy="66" r="10"/>
        <circle cx="102" cy="78" r="10"/><circle cx="102" cy="90" r="10"/><circle cx="102" cy="102" r="10"/>
      </g>
      <g fill="${theme.mountain2}">
        <circle cx="2" cy="3" r="8"/><circle cx="14" cy="-1" r="8"/><circle cx="26" cy="3" r="8"/>
        <circle cx="38" cy="-1" r="8"/><circle cx="50" cy="3" r="8"/><circle cx="62" cy="-1" r="8"/>
        <circle cx="74" cy="3" r="8"/><circle cx="86" cy="-1" r="8"/><circle cx="98" cy="3" r="8"/>
        <circle cx="4" cy="2" r="8"/><circle cx="4" cy="14" r="8"/><circle cx="4" cy="26" r="8"/>
        <circle cx="4" cy="38" r="8"/><circle cx="4" cy="50" r="8"/><circle cx="4" cy="62" r="8"/>
        <circle cx="4" cy="74" r="8"/><circle cx="4" cy="86" r="8"/>
        <circle cx="96" cy="0" r="8"/><circle cx="96" cy="12" r="8"/><circle cx="96" cy="24" r="8"/>
        <circle cx="96" cy="36" r="8"/><circle cx="96" cy="48" r="8"/><circle cx="96" cy="60" r="8"/>
        <circle cx="96" cy="72" r="8"/><circle cx="96" cy="84" r="8"/>
      </g>
      <g fill="${theme.tree}">
        <circle cx="6" cy="3" r="0.9"/><circle cx="18" cy="5" r="0.9"/><circle cx="33" cy="2" r="0.9"/>
        <circle cx="49" cy="5" r="0.9"/><circle cx="63" cy="2" r="0.9"/><circle cx="77" cy="5" r="0.9"/>
        <circle cx="90" cy="2" r="0.9"/>
        <circle cx="2" cy="10" r="0.9"/><circle cx="3" cy="24" r="0.9"/><circle cx="2" cy="40" r="0.9"/>
        <circle cx="3" cy="56" r="0.9"/><circle cx="2" cy="72" r="0.9"/>
        <circle cx="98" cy="8" r="0.9"/><circle cx="97" cy="22" r="0.9"/><circle cx="98" cy="38" r="0.9"/>
        <circle cx="97" cy="54" r="0.9"/><circle cx="98" cy="70" r="0.9"/>
      </g>
      <path d="M 63 0 C 58 14, 67 24, 55 37 C 45 49, 60 59, 49 74 C 43 84, 51 91, 47 100"
            fill="none" stroke="${theme.river}" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M 63 0 C 58 14, 67 24, 55 37 C 45 49, 60 59, 49 74 C 43 84, 51 91, 47 100"
            fill="none" stroke="${theme.riverLight}" stroke-width="1.3" stroke-linecap="round" opacity="0.8"/>
      <g stroke="${theme.road}" stroke-width="0.6" opacity="0.4">
        <line x1="18" y1="15" x2="18" y2="93"/><line x1="28" y1="15" x2="28" y2="93"/>
        <line x1="38" y1="15" x2="38" y2="93"/><line x1="50" y1="15" x2="50" y2="93"/>
        <line x1="62" y1="15" x2="62" y2="93"/><line x1="72" y1="15" x2="72" y2="93"/>
        <line x1="82" y1="15" x2="82" y2="93"/>
        <line x1="15" y1="20" x2="93" y2="20"/><line x1="15" y1="31" x2="93" y2="31"/>
        <line x1="15" y1="43" x2="93" y2="43"/><line x1="15" y1="55" x2="93" y2="55"/>
        <line x1="15" y1="67" x2="93" y2="67"/><line x1="15" y1="79" x2="93" y2="79"/>
        <line x1="15" y1="90" x2="93" y2="90"/>
      </g>
      <g fill="#ffffff" opacity="0.55">
        <ellipse cx="14" cy="6" rx="6" ry="2.6"/><ellipse cx="20" cy="5" rx="5" ry="2.2"/>
        <ellipse cx="83" cy="8" rx="6" ry="2.6"/><ellipse cx="89" cy="7" rx="4.5" ry="2"/>
      </g>
    </svg>`;
  }

  function tanukiSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <linearGradient id="tb${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#c9975f"/><stop offset="1" stop-color="#a9744a"/>
        </linearGradient>
      </defs>
      <ellipse cx="12" cy="30" rx="5" ry="7" fill="url(#tb${uid})"/>
      <circle cx="11" cy="12" r="4.6" fill="url(#tb${uid})"/>
      <circle cx="29" cy="12" r="4.6" fill="url(#tb${uid})"/>
      <ellipse cx="20" cy="24" rx="14" ry="13" fill="url(#tb${uid})"/>
      <ellipse cx="20" cy="27" rx="8" ry="7" fill="#fdf4de"/>
      <ellipse cx="14.5" cy="20" rx="4.2" ry="3.2" fill="#4a3221"/>
      <ellipse cx="25.5" cy="20" rx="4.2" ry="3.2" fill="#4a3221"/>
      <circle cx="15" cy="19.5" r="1.1" fill="#fff"/><circle cx="26" cy="19.5" r="1.1" fill="#fff"/>
      <circle cx="15.3" cy="19.8" r="0.55" fill="#2a1a10"/><circle cx="26.3" cy="19.8" r="0.55" fill="#2a1a10"/>
      <ellipse cx="20" cy="25" rx="1.6" ry="1.2" fill="#2a1a10"/>
      <path d="M17 5 Q20 1 23 5 Q20 7 17 5 Z" fill="#c0392b"/>
    </svg>`;
  }

  function saruSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <linearGradient id="sb${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#8a6a4a"/><stop offset="1" stop-color="#6b4f34"/>
        </linearGradient>
      </defs>
      <circle cx="8" cy="19" r="5" fill="url(#sb${uid})"/><circle cx="32" cy="19" r="5" fill="url(#sb${uid})"/>
      <ellipse cx="20" cy="23" rx="13" ry="12" fill="url(#sb${uid})"/>
      <ellipse cx="20" cy="25" rx="8.5" ry="8" fill="#f0d9b0"/>
      <circle cx="14" cy="27" r="2.4" fill="#e2536a" opacity="0.55"/><circle cx="26" cy="27" r="2.4" fill="#e2536a" opacity="0.55"/>
      <ellipse cx="16" cy="22" rx="1.3" ry="1.6" fill="#2a1a10"/><ellipse cx="24" cy="22" rx="1.3" ry="1.6" fill="#2a1a10"/>
      <path d="M16 29 Q20 32 24 29" fill="none" stroke="#4a3221" stroke-width="1.1" stroke-linecap="round"/>
    </svg>`;
  }

  function maikoSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <linearGradient id="mk${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#e2536a"/><stop offset="1" stop-color="#a8283a"/>
        </linearGradient>
      </defs>
      <path d="M12 38 L14 22 Q20 18 26 22 L28 38 Z" fill="url(#mk${uid})"/>
      <rect x="16" y="26" width="8" height="3" fill="#e8a72a"/>
      <path d="M12 22 L8 30 L13 30 Z" fill="url(#mk${uid})"/><path d="M28 22 L32 30 L27 30 Z" fill="url(#mk${uid})"/>
      <circle cx="20" cy="15" r="7.4" fill="#ffe8d6"/>
      <path d="M12 12 Q13 3 20 3 Q27 3 28 12 Q28 16 24 16 Q26 10 20 9 Q14 10 16 16 Q12 16 12 12 Z" fill="#241a14"/>
      <circle cx="24.5" cy="10.5" r="1.6" fill="#f2a6bd"/>
      <ellipse cx="17" cy="16" rx="1" ry="1.3" fill="#2a1a10"/><ellipse cx="23" cy="16" rx="1" ry="1.3" fill="#2a1a10"/>
      <circle cx="15.5" cy="18.5" r="1.3" fill="#f2879e" opacity="0.6"/><circle cx="24.5" cy="18.5" r="1.3" fill="#f2879e" opacity="0.6"/>
      <path d="M18 18.7 Q20 20 22 18.7" fill="none" stroke="#8c1f2e" stroke-width="0.8" stroke-linecap="round"/>
    </svg>`;
  }

  function kitsuneSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <linearGradient id="kf${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fff8ea"/><stop offset="1" stop-color="#f5dfc0"/>
        </linearGradient>
      </defs>
      <path d="M8 26 Q2 20 6 12 Q12 16 12 24 Z" fill="#e8a259"/>
      <ellipse cx="20" cy="25" rx="13" ry="11" fill="url(#kf${uid})"/>
      <path d="M9 12 L15 17 L7 19 Z" fill="url(#kf${uid})"/><path d="M31 12 L25 17 L33 19 Z" fill="url(#kf${uid})"/>
      <path d="M10 13 L14 17 L9 18 Z" fill="#e8a259"/><path d="M30 13 L26 17 L31 18 Z" fill="#e8a259"/>
      <path d="M20 24 L14 30 Q20 34 26 30 Z" fill="#fffdf7"/>
      <ellipse cx="15" cy="23" rx="1.5" ry="2" fill="#2a1a10"/><ellipse cx="25" cy="23" rx="1.5" ry="2" fill="#2a1a10"/>
      <path d="M18.5 27 L21.5 27 L20 29 Z" fill="#c0392b"/>
      <path d="M13 32 Q20 37 27 32 L25 36 Q20 39 15 36 Z" fill="#c0392b"/>
    </svg>`;
  }

  function kameSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <radialGradient id="kt${uid}" cx="35%" cy="30%" r="70%">
          <stop offset="0" stop-color="#8fbf5e"/><stop offset="1" stop-color="#5a8f3a"/>
        </radialGradient>
      </defs>
      <ellipse cx="14" cy="33" rx="3" ry="2" fill="#c9975f"/><ellipse cx="26" cy="33" rx="3" ry="2" fill="#c9975f"/>
      <ellipse cx="33" cy="26" rx="2.6" ry="2" fill="#c9975f"/>
      <ellipse cx="20" cy="24" rx="13" ry="10" fill="url(#kt${uid})" stroke="#3f6b2a" stroke-width="1"/>
      <path d="M20 15 L20 33 M9 24 L31 24 M12 17 L28 31 M28 17 L12 31" stroke="#3f6b2a" stroke-width="0.8" opacity="0.5"/>
      <circle cx="8" cy="20" r="4.4" fill="#c9975f"/>
      <circle cx="6" cy="19" r="0.8" fill="#2a1a10"/>
    </svg>`;
  }

  function irukaSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <linearGradient id="dl${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#8fb4c9"/><stop offset="1" stop-color="#5a86a0"/>
        </linearGradient>
      </defs>
      <path d="M6 20 L1 16 L3 24 Z" fill="url(#dl${uid})"/>
      <ellipse cx="19" cy="22" rx="14" ry="7" fill="url(#dl${uid})" transform="rotate(-12 19 22)"/>
      <path d="M30 16 Q34 10 36 16 Q33 18 30 16 Z" fill="url(#dl${uid})"/>
      <ellipse cx="16" cy="25" rx="8" ry="3.4" fill="#eef6fa" opacity="0.85" transform="rotate(-10 16 25)"/>
      <circle cx="27" cy="17" r="1.1" fill="#1a2a30"/>
      <path d="M30 20 Q33 21 31 23" fill="none" stroke="#3a5a70" stroke-width="1" stroke-linecap="round"/>
    </svg>`;
  }

  function kamomeSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <path d="M9 22 Q0 18 4 12 Q12 14 14 22 Z" fill="#dfe6ea"/>
      <path d="M31 22 Q40 18 36 12 Q28 14 26 22 Z" fill="#dfe6ea"/>
      <ellipse cx="20" cy="24" rx="11" ry="9" fill="#fff" stroke="#dfe6ea" stroke-width="0.6"/>
      <circle cx="20" cy="16" r="6" fill="#fff"/>
      <circle cx="22.5" cy="15" r="1" fill="#2a1a10"/>
      <path d="M26 16 L32 14 L26 18 Z" fill="#e8a72a"/>
      <path d="M15 32 L14 36 M20 33 L20 37 M25 32 L26 36" stroke="#e8a72a" stroke-width="1.2" stroke-linecap="round" fill="none"/>
    </svg>`;
  }

  function buildMascotSVG(kind, uid) {
    if (kind === "saru") return saruSVG(uid);
    if (kind === "maiko") return maikoSVG(uid);
    if (kind === "kitsune") return kitsuneSVG(uid);
    if (kind === "kame") return kameSVG(uid);
    if (kind === "iruka") return irukaSVG(uid);
    if (kind === "kamome") return kamomeSVG(uid);
    return tanukiSVG(uid);
  }

  const MASCOT_LINES = {
    tanuki: ["ぽんぽこ、いらっしゃい！", "京都駅はここが便利やで〜", "たぬきの置物、見つけた？"],
    saru: ["嵐山からきたで〜", "渡月橋、見た？きれいやろ", "山からごあいさつや"],
    maiko: ["おこしやす〜", "今日はええ天気どすなあ", "花見小路、素敵どすえ"],
    kitsune: ["こんこん、伏見稲荷へようこそ", "千本鳥居、くぐった？", "お揚げさん、持ってきた？"],
    kame: ["亀岡は名前の通り亀の町や", "保津川下り、スリル満点やで", "熱気球、空から見てみたい？"],
    iruka: ["舞鶴港へようこそ！", "赤れんが倉庫、レトロやろ", "海はええぞ〜"],
    kamome: ["天橋立、股のぞきしてみた？", "日本三景のひとつやで", "空から見ると龍みたいやろ"],
  };

  const MAPS = [
    {
      id: "ekimae", name: "京都駅エリア", icon: "🚉", unlockCost: null, mascot: "tanuki",
      theme: { base: "#f6ecd4", mountain1: "#6ea562", mountain2: "#8fc17a", tree: "#3f6b3a", river: "#6fb3d9", riverLight: "#c8ecf9", road: "#c9a26b" },
      landmarks: [
        { icon: "🚉", name: "京都駅", left: 12, top: 82, desc: "京都の玄関口。近未来的な駅ビルが自慢。" },
        { icon: "🛕", name: "清水寺", left: 78, top: 58, desc: "舞台造りで有名な世界遺産。清水の舞台からの眺めは圧巻。" },
        { icon: "🛕", name: "金閣寺", left: 22, top: 14, desc: "金色に輝く舎利殿が池に映る、京都を代表する名所。" },
        { icon: "🛕", name: "銀閣寺", left: 68, top: 18, desc: "わびさびを感じる静かな庭園が魅力の禅寺。" },
        { icon: "🏯", name: "二条城", left: 38, top: 40, desc: "徳川家ゆかりの城。鳴き声がする「鶯張り」の廊下が有名。" },
        { icon: "🎋", name: "嵐山", left: 9, top: 38, desc: "紅葉と渡月橋で知られる自然豊かな景勝地。" },
        { icon: "⛩️", name: "伏見稲荷", left: 84, top: 80, desc: "何千もの朱色の鳥居が連なる千本鳥居が圧巻。" },
        { icon: "👘", name: "祇園", left: 54, top: 66, desc: "舞妓さんが行き交う、京都らしい花街の風情。" },
      ],
    },
    {
      id: "arashiyama", name: "嵐山エリア", icon: "🎋", unlockCost: 300, mascot: "saru",
      theme: { base: "#faf0dc", mountain1: "#c9823f", mountain2: "#e2a862", tree: "#8a4526", river: "#6fb3d9", riverLight: "#dff2fb", road: "#c9a26b" },
      landmarks: [
        { icon: "🌉", name: "渡月橋", left: 30, top: 70, desc: "桂川に架かる嵐山のシンボル。満月の夜が特に美しい。" },
        { icon: "🎋", name: "竹林の小径", left: 60, top: 36, desc: "見上げるほど高い竹に囲まれた幻想的な散歩道。" },
        { icon: "🛕", name: "天龍寺", left: 70, top: 60, desc: "嵐山を借景にした美しい庭園を持つ世界遺産の寺。" },
        { icon: "🚂", name: "嵯峨野トロッコ", left: 20, top: 30, desc: "保津峡の絶景をのんびり走るレトロな観光列車。" },
      ],
    },
    {
      id: "gion", name: "祇園エリア", icon: "👘", unlockCost: 800, mascot: "maiko",
      theme: { base: "#fdf1f2", mountain1: "#df94ab", mountain2: "#f0c0cf", tree: "#a34e69", river: "#6fb3d9", riverLight: "#e8f6fb", road: "#c9a26b" },
      landmarks: [
        { icon: "⛩️", name: "八坂神社", left: 60, top: 30, desc: "祇園のシンボル。祭礼「祇園祭」でも有名な神社。" },
        { icon: "👘", name: "花見小路", left: 35, top: 60, desc: "石畳が続く祇園のメインストリート。夜は特に情緒たっぷり。" },
        { icon: "🛕", name: "建仁寺", left: 70, top: 75, desc: "京都最古の禅寺。俵屋宗達の「風神雷神図」でも有名。" },
        { icon: "🎭", name: "南座", left: 20, top: 45, desc: "日本最古の歌舞伎劇場。師走の「顔見世」が風物詩。" },
      ],
    },
    {
      id: "fushimi", name: "伏見・宇治エリア", icon: "⛩️", unlockCost: 2000, mascot: "kitsune",
      theme: { base: "#fdefe2", mountain1: "#de6a41", mountain2: "#ef9670", tree: "#8f3f24", river: "#6fb3d9", riverLight: "#dff2fb", road: "#c9a26b" },
      landmarks: [
        { icon: "⛩️", name: "伏見稲荷", left: 30, top: 35, desc: "何千もの朱色の鳥居が連なる千本鳥居が圧巻。" },
        { icon: "🏯", name: "平等院", left: 65, top: 60, desc: "10円玉でおなじみ、鳳凰堂が美しい宇治の世界遺産。" },
        { icon: "🍵", name: "宇治茶", left: 45, top: 78, desc: "日本三大茶のひとつ。まろやかな旨みが自慢。" },
        { icon: "🚤", name: "十石舟", left: 75, top: 30, desc: "伏見の水路をのんびり巡る遊覧船。酒蔵の町並みを一望。" },
      ],
    },
    {
      id: "kameoka", name: "亀岡エリア", icon: "🎈", unlockCost: 3500, mascot: "kame",
      theme: { base: "#f2f6e2", mountain1: "#5a9a4a", mountain2: "#7fbf6a", tree: "#2f5a24", river: "#6fb3d9", riverLight: "#d5f0f7", road: "#c9a26b" },
      landmarks: [
        { icon: "🚣", name: "保津川下り", left: 32, top: 62, desc: "亀岡から嵐山まで急流を下るスリル満点の舟下り。" },
        { icon: "🎈", name: "熱気球", left: 65, top: 22, desc: "亀岡盆地の空を彩る熱気球フェスティバルが有名。" },
        { icon: "⛩️", name: "出雲大神宮", left: 18, top: 32, desc: "縁結びのパワースポットとして知られる古社。" },
        { icon: "🏯", name: "亀岡城跡", left: 72, top: 68, desc: "明智光秀が築いた城の跡地。今は宗教施設の敷地内。" },
      ],
    },
    {
      id: "maizuru", name: "舞鶴エリア", icon: "⚓", unlockCost: 6000, mascot: "iruka",
      theme: { base: "#eef2f5", mountain1: "#5a6b7a", mountain2: "#7c8b98", tree: "#3a4a54", river: "#3f6f95", riverLight: "#a9cfe0", road: "#9aa3a8" },
      landmarks: [
        { icon: "🧱", name: "赤れんが倉庫", left: 30, top: 55, desc: "明治時代の海軍施設。レトロな赤レンガが並ぶ人気スポット。" },
        { icon: "⚓", name: "舞鶴港", left: 62, top: 65, desc: "日本海側有数の港町。海上自衛隊の艦船も見られる。" },
        { icon: "🗼", name: "五老スカイタワー", left: 70, top: 25, desc: "舞鶴湾を一望できる展望タワー。夜景も見事。" },
        { icon: "🍥", name: "舞鶴かまぼこ", left: 22, top: 25, desc: "新鮮な魚を使った舞鶴名物のかまぼこ。" },
      ],
    },
    {
      id: "amanohashidate", name: "天橋立エリア", icon: "🌲", unlockCost: 9000, mascot: "kamome",
      theme: { base: "#eaf4f7", mountain1: "#3f7a5a", mountain2: "#5fa37a", tree: "#245038", river: "#5fa8cf", riverLight: "#c9e8f2", road: "#c9a26b" },
      landmarks: [
        { icon: "🌲", name: "天橋立", left: 45, top: 50, desc: "日本三景のひとつ。天に架かる橋のような砂州が名物。" },
        { icon: "🚡", name: "傘松公園", left: 68, top: 25, desc: "股のぞきで龍が天に昇るように見える絶景ビューポイント。" },
        { icon: "🛕", name: "智恩寺", left: 25, top: 68, desc: "文殊の知恵で有名な日本三文殊のひとつ。" },
        { icon: "🚤", name: "伊根の舟屋", left: 78, top: 70, desc: "海に浮かぶような舟屋が並ぶ、日本のヴェネツィアと称される港町。" },
      ],
    },
  ];

  function yatsuhashiSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <linearGradient id="yg${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fdf4de"/><stop offset="1" stop-color="#e9b978"/>
        </linearGradient>
        <clipPath id="yc${uid}"><path d="M20 4 L36 34 Q37 36.5 34 36.5 L6 36.5 Q3 36.5 4 34 Z"/></clipPath>
      </defs>
      <path d="M20 4 L36 34 Q37 36.5 34 36.5 L6 36.5 Q3 36.5 4 34 Z" fill="url(#yg${uid})" stroke="#c98a4b" stroke-width="1"/>
      <g clip-path="url(#yc${uid})" stroke="#b5713a" stroke-width="1.3" opacity="0.55">
        <line x1="-4" y1="14" x2="30" y2="46"/><line x1="2" y1="8" x2="36" y2="40"/>
        <line x1="10" y1="4" x2="44" y2="36"/><line x1="18" y1="2" x2="50" y2="32"/>
      </g>
      <ellipse cx="14" cy="14" rx="4.5" ry="2.4" fill="#fff" opacity="0.55"/>
    </svg>`;
  }

  function dangoSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <radialGradient id="dp${uid}" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#ffd6e3"/><stop offset="1" stop-color="#f3a0bb"/></radialGradient>
        <radialGradient id="dw${uid}" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#fffdf5"/><stop offset="1" stop-color="#f1e6c8"/></radialGradient>
        <radialGradient id="dg${uid}" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#c4e29a"/><stop offset="1" stop-color="#8fbf5e"/></radialGradient>
      </defs>
      <rect x="18.7" y="4" width="2.6" height="34" rx="1.3" fill="#c9975f"/>
      <circle cx="20" cy="12" r="8" fill="url(#dg${uid})" stroke="#75a34a" stroke-width="0.8"/>
      <circle cx="20" cy="21" r="8" fill="url(#dw${uid})" stroke="#d8c48f" stroke-width="0.8"/>
      <circle cx="20" cy="30" r="8" fill="url(#dp${uid})" stroke="#e28aa8" stroke-width="0.8"/>
      <ellipse cx="17" cy="9" rx="2" ry="1.1" fill="#fff" opacity="0.6"/>
      <ellipse cx="17" cy="18" rx="2" ry="1.1" fill="#fff" opacity="0.6"/>
      <ellipse cx="17" cy="27" rx="2" ry="1.1" fill="#fff" opacity="0.6"/>
    </svg>`;
  }

  function fanSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <linearGradient id="fg${uid}" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stop-color="#a8283a"/><stop offset="0.5" stop-color="#e2536a"/><stop offset="1" stop-color="#f7d774"/>
        </linearGradient>
      </defs>
      <path d="M20 38 L4 14 A18 18 0 0 1 36 14 Z" fill="url(#fg${uid})" stroke="#8c1f2e" stroke-width="1"/>
      <g stroke="#fff8ea" stroke-width="0.8" opacity="0.55">
        <line x1="20" y1="38" x2="8" y2="16"/><line x1="20" y1="38" x2="14" y2="9"/>
        <line x1="20" y1="38" x2="20" y2="6"/><line x1="20" y1="38" x2="26" y2="9"/>
        <line x1="20" y1="38" x2="32" y2="16"/>
      </g>
      <circle cx="20" cy="38" r="2.4" fill="#f7d774" stroke="#8c1f2e" stroke-width="0.8"/>
    </svg>`;
  }

  function lanternSVG(uid) {
    return `<svg viewBox="0 0 40 40" overflow="visible">
      <defs>
        <radialGradient id="lg${uid}" cx="50%" cy="45%" r="60%">
          <stop offset="0" stop-color="#ff8f6b"/><stop offset="0.6" stop-color="#e2432f"/><stop offset="1" stop-color="#b8241d"/>
        </radialGradient>
      </defs>
      <line x1="20" y1="1" x2="20" y2="6" stroke="#7a4a26" stroke-width="1"/>
      <rect x="15" y="5" width="10" height="3" rx="1.2" fill="#e8a72a"/>
      <path d="M12 8 C8 14, 8 28, 12 34 C15 37, 25 37, 28 34 C32 28, 32 14, 28 8 Z" fill="url(#lg${uid})" stroke="#8c1f2e" stroke-width="1"/>
      <g stroke="#8c1f2e" stroke-width="0.6" opacity="0.5">
        <line x1="9.5" y1="14" x2="30.5" y2="14"/><line x1="8.5" y1="21" x2="31.5" y2="21"/><line x1="9.5" y1="28" x2="30.5" y2="28"/>
      </g>
      <rect x="15" y="34" width="10" height="3" rx="1.2" fill="#e8a72a"/>
      <line x1="20" y1="37" x2="20" y2="40" stroke="#7a4a26" stroke-width="1"/>
      <text x="20" y="24" font-size="8" text-anchor="middle" fill="#fff8ea" font-family="serif">祝</text>
      <g class="sparkle">
        <path d="M4 6 l1 2.4 2.4 1 -2.4 1 -1 2.4 -1 -2.4 -2.4 -1 2.4 -1 Z" fill="#fff3c4"/>
        <path d="M35 27 l0.8 1.8 1.8 0.8 -1.8 0.8 -0.8 1.8 -0.8 -1.8 -1.8 -0.8 1.8 -0.8 Z" fill="#fff3c4"/>
      </g>
    </svg>`;
  }

  const ITEM_TYPES = [
    { name: "yatsuhashi", base: 1, weight: 60, svg: yatsuhashiSVG },
    { name: "dango", base: 2, weight: 25, svg: dangoSVG },
    { name: "fan", base: 4, weight: 10, svg: fanSVG },
    { name: "lantern", base: 8, weight: 5, svg: lanternSVG, rare: true },
  ];
  const TOTAL_WEIGHT = ITEM_TYPES.reduce((sum, t) => sum + t.weight, 0);
  let itemUidCounter = 0;

  function namayatsuSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <linearGradient id="ny${uid}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#fdf0f2"/><stop offset="1" stop-color="#f2c9d3"/>
        </linearGradient>
      </defs>
      <rect x="6" y="14" width="28" height="14" rx="7" fill="url(#ny${uid})" stroke="#e2a6b8" stroke-width="1"/>
      <ellipse cx="8" cy="21" rx="6" ry="7" fill="#fdf0f2" stroke="#e2a6b8" stroke-width="1"/>
      <circle cx="8" cy="21" r="2.4" fill="#b5713a" opacity="0.55"/>
      <ellipse cx="32" cy="21" rx="6" ry="7" fill="#fdf0f2" stroke="#e2a6b8" stroke-width="1"/>
    </svg>`;
  }

  function otabeSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <linearGradient id="ot${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fdf4de"/><stop offset="1" stop-color="#ecd9ab"/>
        </linearGradient>
      </defs>
      <path d="M20 6 L35 30 Q36 33 33 33 L7 33 Q4 33 5 30 Z" fill="url(#ot${uid})" stroke="#c9ac6f" stroke-width="1"/>
      <path d="M20 6 L27 30 L13 30 Z" fill="#fffaf0" opacity="0.5"/>
      <ellipse cx="20" cy="27" rx="4" ry="2.6" fill="#8a3b2a"/>
    </svg>`;
  }

  function ajarimochiSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <radialGradient id="aj${uid}" cx="35%" cy="30%" r="70%">
          <stop offset="0" stop-color="#caa06a"/><stop offset="1" stop-color="#8a5a30"/>
        </radialGradient>
      </defs>
      <ellipse cx="20" cy="22" rx="15" ry="11" fill="url(#aj${uid})" stroke="#6b3f1c" stroke-width="1"/>
      <ellipse cx="15" cy="16" rx="5" ry="2.6" fill="#fff" opacity="0.4"/>
    </svg>`;
  }

  function tsukemonoSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <linearGradient id="tk${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#c39bd9"/><stop offset="1" stop-color="#8e5fae"/>
        </linearGradient>
      </defs>
      <ellipse cx="20" cy="30" rx="15" ry="5" fill="#fdf4de" stroke="#c9ac6f" stroke-width="1"/>
      <ellipse cx="14" cy="22" rx="4.5" ry="9" fill="url(#tk${uid})" transform="rotate(-15 14 22)"/>
      <ellipse cx="21" cy="20" rx="4.5" ry="10" fill="#8fbf5e" transform="rotate(5 21 20)"/>
      <ellipse cx="28" cy="23" rx="4" ry="8.5" fill="url(#tk${uid})" transform="rotate(15 28 23)"/>
    </svg>`;
  }

  function warabimochiSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <linearGradient id="wm${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#c4e29a"/><stop offset="1" stop-color="#8fbf5e"/>
        </linearGradient>
      </defs>
      <rect x="6" y="18" width="11" height="11" rx="2" fill="url(#wm${uid})" opacity="0.9" stroke="#6a9a44" stroke-width="0.8"/>
      <rect x="16" y="14" width="11" height="11" rx="2" fill="url(#wm${uid})" opacity="0.9" stroke="#6a9a44" stroke-width="0.8"/>
      <rect x="24" y="20" width="11" height="11" rx="2" fill="url(#wm${uid})" opacity="0.9" stroke="#6a9a44" stroke-width="0.8"/>
      <g fill="#f1e6c8">
        <circle cx="10" cy="22" r="0.6"/><circle cx="14" cy="25" r="0.6"/><circle cx="20" cy="18" r="0.6"/>
        <circle cx="24" cy="21" r="0.6"/><circle cx="29" cy="24" r="0.6"/><circle cx="31" cy="28" r="0.6"/>
      </g>
    </svg>`;
  }

  function nishijinSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <linearGradient id="nj${uid}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#5a3f8a"/><stop offset="1" stop-color="#a8283a"/>
        </linearGradient>
      </defs>
      <path d="M20 4 L36 20 L20 36 L4 20 Z" fill="url(#nj${uid})" stroke="#e8a72a" stroke-width="1"/>
      <path d="M20 10 L30 20 L20 30 L10 20 Z" fill="none" stroke="#e8a72a" stroke-width="0.8" opacity="0.8"/>
      <circle cx="20" cy="20" r="3" fill="#e8a72a"/>
    </svg>`;
  }

  function kiyomizuyakiSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <linearGradient id="ky${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fdfdfd"/><stop offset="1" stop-color="#cfe3ee"/>
        </linearGradient>
      </defs>
      <path d="M8 16 Q8 30 20 32 Q32 30 32 16 Z" fill="url(#ky${uid})" stroke="#7fa8c2" stroke-width="1"/>
      <ellipse cx="20" cy="16" rx="12" ry="3" fill="#eef6fa" stroke="#7fa8c2" stroke-width="1"/>
      <path d="M14 20 Q17 17 20 20 Q23 23 26 20" fill="none" stroke="#a8283a" stroke-width="1.1" opacity="0.75"/>
      <circle cx="20" cy="24" r="1.4" fill="#e8a72a"/>
    </svg>`;
  }

  function maikofanSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <linearGradient id="mf${uid}" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stop-color="#7c3fb3"/><stop offset="0.5" stop-color="#c9538a"/><stop offset="1" stop-color="#f7d774"/>
        </linearGradient>
      </defs>
      <path d="M20 38 L4 14 A18 18 0 0 1 36 14 Z" fill="url(#mf${uid})" stroke="#5a2a72" stroke-width="1"/>
      <g fill="#fff8ea" opacity="0.85">
        <circle cx="14" cy="18" r="1.6"/><circle cx="20" cy="12" r="1.6"/><circle cx="26" cy="18" r="1.6"/>
      </g>
      <circle cx="20" cy="38" r="2.4" fill="#f7d774" stroke="#5a2a72" stroke-width="0.8"/>
    </svg>`;
  }

  function kinpakuSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <linearGradient id="ks${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fffdf7"/><stop offset="1" stop-color="#f1e6c8"/>
        </linearGradient>
      </defs>
      <path d="M14 34 L20 14 L26 34 Z" fill="#e8c27a"/>
      <path d="M12 20 Q20 6 28 20 Q28 26 20 24 Q12 26 12 20 Z" fill="url(#ks${uid})" stroke="#e0d0a0" stroke-width="0.8"/>
      <path d="M17 10 L23 10 L20 14 Z" fill="#e8a72a"/>
      <path d="M14 6 L18 8 L14 10 L12 8 Z" fill="#f7d774"/>
    </svg>`;
  }

  function goshuinchoSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <linearGradient id="gs${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#3a2a6b"/><stop offset="1" stop-color="#1f1840"/>
        </linearGradient>
      </defs>
      <rect x="8" y="5" width="24" height="30" rx="1.5" fill="url(#gs${uid})" stroke="#0f0c22" stroke-width="1"/>
      <rect x="8" y="5" width="24" height="30" rx="1.5" fill="none" stroke="#e8a72a" stroke-width="1" opacity="0.7"/>
      <path d="M14 24 Q16 14 22 16 Q28 18 26 26 Q22 30 18 27 Q15 27 14 24 Z" fill="none" stroke="#e8a72a" stroke-width="1.4" stroke-linecap="round"/>
      <circle cx="24" cy="15" r="1.1" fill="#e8a72a"/>
    </svg>`;
  }

  function kyoameSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <linearGradient id="ca${uid}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ffd6e3"/><stop offset="1" stop-color="#f3a0bb"/>
        </linearGradient>
      </defs>
      <ellipse cx="20" cy="20" rx="10" ry="7" fill="url(#ca${uid})" stroke="#e2819e" stroke-width="1"/>
      <path d="M10 20 L4 15 L4 25 Z" fill="#fff8ea" stroke="#e2819e" stroke-width="0.8"/>
      <path d="M30 20 L36 15 L36 25 Z" fill="#fff8ea" stroke="#e2819e" stroke-width="0.8"/>
      <ellipse cx="16" cy="17" rx="2.4" ry="1.3" fill="#fff" opacity="0.6"/>
    </svg>`;
  }

  function matchaCookieSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <radialGradient id="ck${uid}" cx="35%" cy="30%" r="70%">
          <stop offset="0" stop-color="#d9e8a8"/><stop offset="1" stop-color="#a9c96a"/>
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="14" fill="url(#ck${uid})" stroke="#7a9a4a" stroke-width="1"/>
      <g fill="#7a9a4a" opacity="0.6">
        <circle cx="14" cy="15" r="1.2"/><circle cx="24" cy="14" r="1.2"/><circle cx="27" cy="22" r="1.2"/>
        <circle cx="16" cy="26" r="1.2"/><circle cx="23" cy="27" r="1.2"/>
      </g>
    </svg>`;
  }

  function yuzenPouchSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <linearGradient id="yz${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#7c3fb3"/><stop offset="1" stop-color="#4a2470"/>
        </linearGradient>
      </defs>
      <path d="M10 16 Q10 34 20 36 Q30 34 30 16 Z" fill="url(#yz${uid})" stroke="#e8a72a" stroke-width="1"/>
      <path d="M10 16 Q20 20 30 16" fill="none" stroke="#e8a72a" stroke-width="1.2"/>
      <path d="M13 16 Q13 10 20 10 Q27 10 27 16" fill="none" stroke="#e8a72a" stroke-width="1.4"/>
      <circle cx="16" cy="24" r="1.6" fill="#f7d774"/><circle cx="24" cy="27" r="1.6" fill="#f7d774"/><circle cx="20" cy="30" r="1.6" fill="#f7d774"/>
    </svg>`;
  }

  function shichimiSVG(uid) {
    return `<svg viewBox="0 0 40 40">
      <defs>
        <linearGradient id="sc${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#e2432f"/><stop offset="1" stop-color="#b8241d"/>
        </linearGradient>
      </defs>
      <rect x="11" y="14" width="18" height="20" rx="3" fill="url(#sc${uid})" stroke="#8c1f2e" stroke-width="1"/>
      <ellipse cx="20" cy="14" rx="9" ry="3" fill="#e8a72a" stroke="#8c1f2e" stroke-width="1"/>
      <rect x="14" y="8" width="12" height="6" rx="2" fill="#c9975f" stroke="#8c1f2e" stroke-width="0.8"/>
      <g fill="#8c1f2e" opacity="0.5">
        <circle cx="16" cy="24" r="0.9"/><circle cx="22" cy="27" r="0.9"/><circle cx="25" cy="20" r="0.9"/>
      </g>
    </svg>`;
  }

  function omamoriSVG(uid) {
    return `<svg viewBox="0 0 40 40" overflow="visible">
      <defs>
        <linearGradient id="om${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#e2536a"/><stop offset="1" stop-color="#a8283a"/>
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="20" height="24" rx="3" fill="url(#om${uid})" stroke="#e8a72a" stroke-width="1.2"/>
      <path d="M10 10 Q20 4 30 10" fill="none" stroke="#e8a72a" stroke-width="1.4"/>
      <text x="20" y="26" font-size="9" text-anchor="middle" fill="#f7d774" font-family="serif">縁</text>
      <path d="M20 34 L18 39 L22 39 Z" fill="#e8a72a"/>
      <g class="sparkle">
        <path d="M32 8 l1 2.2 2.2 1 -2.2 1 -1 2.2 -1 -2.2 -2.2 -1 2.2 -1 Z" fill="#fff3c4"/>
      </g>
    </svg>`;
  }

  function kanzashiSVG(uid) {
    return `<svg viewBox="0 0 40 40" overflow="visible">
      <defs>
        <radialGradient id="kz${uid}" cx="35%" cy="30%" r="70%">
          <stop offset="0" stop-color="#ffb6c9"/><stop offset="1" stop-color="#e2536a"/>
        </radialGradient>
      </defs>
      <line x1="20" y1="14" x2="20" y2="36" stroke="#e8a72a" stroke-width="1.4"/>
      <g fill="url(#kz${uid})" stroke="#a8283a" stroke-width="0.6">
        <circle cx="20" cy="10" r="4.4"/><circle cx="13" cy="13" r="4"/><circle cx="27" cy="13" r="4"/>
        <circle cx="12" cy="20" r="3.6"/><circle cx="28" cy="20" r="3.6"/>
      </g>
      <circle cx="20" cy="15" r="2" fill="#f7d774"/>
      <g class="sparkle">
        <path d="M32 26 l0.9 2 2 0.9 -2 0.9 -0.9 2 -0.9 -2 -2 -0.9 2 -0.9 Z" fill="#fff3c4"/>
      </g>
    </svg>`;
  }

  function kinkakujiSVG(uid) {
    return `<svg viewBox="0 0 40 40" overflow="visible">
      <defs>
        <linearGradient id="gp${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fff3c4"/><stop offset="1" stop-color="#e8a72a"/>
        </linearGradient>
      </defs>
      <ellipse cx="20" cy="33" rx="15" ry="3" fill="#5fa8cf" opacity="0.5"/>
      <rect x="10" y="20" width="20" height="12" fill="url(#gp${uid})" stroke="#b9821e" stroke-width="1"/>
      <rect x="13" y="12" width="14" height="10" fill="url(#gp${uid})" stroke="#b9821e" stroke-width="1"/>
      <path d="M7 20 L20 10 L33 20 Z" fill="#8c1f2e" stroke="#5a1420" stroke-width="1"/>
      <path d="M11 12 L20 5 L29 12 Z" fill="#8c1f2e" stroke="#5a1420" stroke-width="1"/>
      <circle cx="20" cy="4" r="1.4" fill="#f7d774"/>
      <g stroke="#b9821e" stroke-width="0.6" opacity="0.6">
        <line x1="14" y1="24" x2="14" y2="30"/><line x1="20" y1="24" x2="20" y2="30"/><line x1="26" y1="24" x2="26" y2="30"/>
      </g>
      <g class="sparkle">
        <path d="M4 16 l1.2 2.6 2.6 1.2 -2.6 1.2 -1.2 2.6 -1.2 -2.6 -2.6 -1.2 2.6 -1.2 Z" fill="#fff3c4"/>
        <path d="M36 10 l0.9 2 2 0.9 -2 0.9 -0.9 2 -0.9 -2 -2 -0.9 2 -0.9 Z" fill="#fff3c4"/>
      </g>
    </svg>`;
  }

  const GACHA_COST = 50;
  const GACHA_ITEMS = [
    { id: "namayatsu", name: "生八つ橋", svg: namayatsuSVG, rarity: "common", weight: 10, dupBonus: 3 },
    { id: "otabe", name: "おたべ", svg: otabeSVG, rarity: "common", weight: 10, dupBonus: 3 },
    { id: "ajarimochi", name: "阿闍梨餅", svg: ajarimochiSVG, rarity: "common", weight: 10, dupBonus: 3 },
    { id: "tsukemono", name: "京漬物", svg: tsukemonoSVG, rarity: "common", weight: 9, dupBonus: 3 },
    { id: "kyoame", name: "京あめ", svg: kyoameSVG, rarity: "common", weight: 8, dupBonus: 3 },
    { id: "matchacookie", name: "抹茶クッキー", svg: matchaCookieSVG, rarity: "common", weight: 8, dupBonus: 3 },
    { id: "warabimochi", name: "抹茶わらび餅", svg: warabimochiSVG, rarity: "rare", weight: 6, dupBonus: 10 },
    { id: "nishijin", name: "西陣織ハンカチ", svg: nishijinSVG, rarity: "rare", weight: 5, dupBonus: 10 },
    { id: "kiyomizuyaki", name: "清水焼の器", svg: kiyomizuyakiSVG, rarity: "rare", weight: 5, dupBonus: 10 },
    { id: "yuzenpouch", name: "京友禅の巾着", svg: yuzenPouchSVG, rarity: "rare", weight: 5, dupBonus: 10 },
    { id: "shichimi", name: "七味唐辛子", svg: shichimiSVG, rarity: "rare", weight: 5, dupBonus: 10 },
    { id: "sensu", name: "舞妓の扇子", svg: maikofanSVG, rarity: "superrare", weight: 4, dupBonus: 25 },
    { id: "kinpaku", name: "金箔ソフト", svg: kinpakuSVG, rarity: "superrare", weight: 4, dupBonus: 25 },
    { id: "omamori", name: "縁結びのお守り", svg: omamoriSVG, rarity: "superrare", weight: 4, dupBonus: 25 },
    { id: "goshuincho", name: "龍の御朱印帳", svg: goshuinchoSVG, rarity: "ultrarare", weight: 3, dupBonus: 60 },
    { id: "kanzashi", name: "舞妓の簪", svg: kanzashiSVG, rarity: "ultrarare", weight: 3, dupBonus: 60 },
    { id: "kinkakuji", name: "金閣寺ミニチュア", svg: kinkakujiSVG, rarity: "legendary", weight: 2, dupBonus: 150 },
  ];
  const GACHA_TOTAL_WEIGHT = GACHA_ITEMS.reduce((sum, t) => sum + t.weight, 0);
  const RARITY_LABEL = {
    common: "コモン",
    rare: "レア",
    superrare: "スーパーレア",
    ultrarare: "ウルトラレア",
    legendary: "レジェンダリー",
  };

  const mapStackEl = document.getElementById("map-stack");
  const mapSwitcherEl = document.getElementById("map-switcher");
  const scoreEl = document.getElementById("score");
  const ppsEl = document.getElementById("pps");
  const welcomeModal = document.getElementById("welcome-back");
  const welcomeText = document.getElementById("welcome-text");
  const welcomeClose = document.getElementById("welcome-close");

  const landmarkInfoModal = document.getElementById("landmark-info");
  const landmarkInfoIcon = document.getElementById("landmark-info-icon");
  const landmarkInfoName = document.getElementById("landmark-info-name");
  const landmarkInfoDesc = document.getElementById("landmark-info-desc");
  const landmarkInfoClose = document.getElementById("landmark-info-close");

  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".screen");
  const gachaPullBtn = document.getElementById("gacha-pull-btn");
  const gachaCostEl = document.getElementById("gacha-cost");
  const gachaCollectionEl = document.getElementById("gacha-collection");
  const gachaResultModal = document.getElementById("gacha-result");
  const gachaResultBox = document.getElementById("gacha-result-box");
  const chestPhaseEl = document.getElementById("chest-phase");
  const itemPhaseEl = document.getElementById("item-phase");
  const chestEl = document.getElementById("chest");
  const gachaResultIcon = document.getElementById("gacha-result-icon");
  const gachaResultRarity = document.getElementById("gacha-result-rarity");
  const gachaResultName = document.getElementById("gacha-result-name");
  const gachaResultSub = document.getElementById("gacha-result-sub");
  const gachaResultClose = document.getElementById("gacha-result-close");

  const upgrades = {
    click: {
      btn: document.getElementById("buy-click"),
      levelEl: document.getElementById("click-level"),
      costEl: document.getElementById("click-cost"),
      baseCost: 10,
      growth: 1.18,
      level: 1,
    },
    auto: {
      btn: document.getElementById("buy-auto"),
      levelEl: document.getElementById("auto-level"),
      costEl: document.getElementById("auto-cost"),
      baseCost: 25,
      growth: 1.22,
      level: 0,
    },
    spawn: {
      btn: document.getElementById("buy-spawn"),
      levelEl: document.getElementById("spawn-level"),
      costEl: document.getElementById("spawn-cost"),
      baseCost: 30,
      growth: 1.25,
      level: 1,
      max: 8,
    },
  };

  let state = {
    points: 0,
    clickLevel: 1,
    autoLevel: 0,
    spawnLevel: 1,
    unlockedMaps: ["ekimae"],
    currentMap: "ekimae",
    gachaCollection: {},
    lastSaved: Date.now(),
  };

  function costFor(key) {
    const u = upgrades[key];
    const level = key === "click" ? state.clickLevel : key === "auto" ? state.autoLevel : state.spawnLevel;
    return Math.round(u.baseCost * Math.pow(u.growth, level));
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      state = Object.assign(state, saved);
    } catch (e) {
      /* 壊れたセーブは無視 */
    }
  }

  function save() {
    state.lastSaved = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function applyOfflineEarnings() {
    const elapsedSec = Math.min(
      OFFLINE_CAP_SECONDS,
      Math.max(0, (Date.now() - state.lastSaved) / 1000)
    );
    if (state.autoLevel > 0 && elapsedSec > 30) {
      const gained = Math.floor(elapsedSec * state.autoLevel * OFFLINE_EFFICIENCY);
      if (gained > 0) {
        state.points += gained;
        const mins = Math.floor(elapsedSec / 60);
        welcomeText.textContent = `${mins}分間の自動収集で ${gained} pt 獲得しました！`;
        welcomeModal.classList.remove("hidden");
      }
    }
  }

  function updateUI() {
    scoreEl.textContent = Math.floor(state.points).toLocaleString();
    ppsEl.textContent = state.autoLevel.toLocaleString();

    upgrades.click.levelEl.textContent = state.clickLevel;
    upgrades.auto.levelEl.textContent = state.autoLevel;
    upgrades.spawn.levelEl.textContent = state.spawnLevel;

    const clickCost = costFor("click");
    const autoCost = costFor("auto");
    const spawnCost = costFor("spawn");

    upgrades.click.costEl.textContent = clickCost;
    upgrades.auto.costEl.textContent = autoCost;
    upgrades.spawn.costEl.textContent = spawnCost;

    upgrades.click.btn.classList.toggle("disabled", state.points < clickCost);
    upgrades.auto.btn.classList.toggle("disabled", state.points < autoCost);
    const spawnMaxed = state.spawnLevel >= upgrades.spawn.max;
    upgrades.spawn.btn.classList.toggle(
      "disabled",
      state.points < spawnCost || spawnMaxed
    );
    if (spawnMaxed) {
      upgrades.spawn.costEl.textContent = "MAX";
    }

    gachaCostEl.textContent = GACHA_COST;
    gachaPullBtn.classList.toggle("disabled", state.points < GACHA_COST);

    renderMapSwitcher();
  }

  function isMapUnlocked(id) {
    return state.unlockedMaps.includes(id);
  }

  function activeMapEl() {
    return document.getElementById(`map-${state.currentMap}`);
  }

  function showMascotBubble(mascotEl, kind) {
    const lines = MASCOT_LINES[kind] || ["こんにちは！"];
    const line = lines[Math.floor(Math.random() * lines.length)];
    const bubble = document.createElement("div");
    bubble.className = "mascot-bubble";
    bubble.textContent = line;
    mascotEl.appendChild(bubble);
    setTimeout(() => bubble.remove(), 2200);
    playGreetingSound();
  }

  function showLandmarkInfo(landmarkEl, lm) {
    landmarkEl.classList.remove("tapped");
    void landmarkEl.offsetWidth;
    landmarkEl.classList.add("tapped");

    landmarkInfoIcon.textContent = lm.icon;
    landmarkInfoName.textContent = lm.name;
    landmarkInfoDesc.textContent = lm.desc;
    landmarkInfoModal.classList.remove("hidden");
    playGreetingSound();
  }

  function renderAllMaps() {
    mapStackEl.innerHTML = "";
    for (const mapDef of MAPS) {
      const el = document.createElement("div");
      el.id = `map-${mapDef.id}`;
      el.className = "map-instance" + (mapDef.id === state.currentMap ? " active" : "");
      const landmarksHtml = mapDef.landmarks
        .map((lm) => `<div class="landmark" style="left:${lm.left}%; top:${lm.top}%;"><span class="pin">${lm.icon}</span><span class="label">${lm.name}</span></div>`)
        .join("");
      const mascotHtml = `<div class="mascot">${buildMascotSVG(mapDef.mascot, itemUidCounter++)}</div>`;
      el.innerHTML = buildMapBackgroundSVG(mapDef.theme) + landmarksHtml + mascotHtml;
      mapStackEl.appendChild(el);

      const mascotEl = el.querySelector(".mascot");
      mascotEl.addEventListener("pointerdown", (evt) => {
        evt.preventDefault();
        showMascotBubble(mascotEl, mapDef.mascot);
      });

      el.querySelectorAll(".landmark").forEach((landmarkEl, idx) => {
        const lm = mapDef.landmarks[idx];
        landmarkEl.addEventListener("pointerdown", (evt) => {
          evt.preventDefault();
          showLandmarkInfo(landmarkEl, lm);
        });
      });
    }
  }

  function switchMap(id) {
    if (!isMapUnlocked(id)) return;
    document.querySelectorAll(".map-instance").forEach((el) => {
      el.classList.toggle("active", el.id === `map-${id}`);
    });
    state.currentMap = id;
    renderMapSwitcher();
    save();
  }

  function handleMapPillClick(mapDef, btn) {
    if (isMapUnlocked(mapDef.id)) {
      switchMap(mapDef.id);
      return;
    }
    if (state.points >= mapDef.unlockCost) {
      state.points -= mapDef.unlockCost;
      state.unlockedMaps.push(mapDef.id);
      switchMap(mapDef.id);
      updateUI();
      save();
    } else {
      btn.classList.remove("shake");
      void btn.offsetWidth;
      btn.classList.add("shake");
    }
  }

  function renderMapSwitcher() {
    mapSwitcherEl.innerHTML = "";
    for (const mapDef of MAPS) {
      const unlocked = isMapUnlocked(mapDef.id);
      const btn = document.createElement("button");
      btn.className = "map-pill" + (unlocked ? (mapDef.id === state.currentMap ? " active" : "") : " locked");
      btn.innerHTML = unlocked
        ? `${mapDef.icon} ${mapDef.name}`
        : `🔒 ${mapDef.icon} ${mapDef.name} <span class="pill-cost">${mapDef.unlockCost}pt</span>`;
      btn.addEventListener("click", () => handleMapPillClick(mapDef, btn));
      mapSwitcherEl.appendChild(btn);
    }
  }

  function buy(key) {
    const cost = costFor(key);
    if (state.points < cost) return;
    if (key === "spawn" && state.spawnLevel >= upgrades.spawn.max) return;

    state.points -= cost;
    if (key === "click") state.clickLevel += 1;
    if (key === "auto") state.autoLevel += 1;
    if (key === "spawn") state.spawnLevel += 1;

    updateUI();
    save();
  }

  upgrades.click.btn.addEventListener("click", () => buy("click"));
  upgrades.auto.btn.addEventListener("click", () => buy("auto"));
  upgrades.spawn.btn.addEventListener("click", () => buy("spawn"));

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const screen = btn.dataset.screen;
      tabButtons.forEach((b) => b.classList.toggle("active", b === btn));
      tabPanels.forEach((p) => p.classList.toggle("active", p.id === `screen-${screen}`));
    });
  });

  function pickGachaItem() {
    let r = Math.random() * GACHA_TOTAL_WEIGHT;
    for (const item of GACHA_ITEMS) {
      if (r < item.weight) return item;
      r -= item.weight;
    }
    return GACHA_ITEMS[0];
  }

  function renderGachaCollection() {
    gachaCollectionEl.innerHTML = "";
    for (const item of GACHA_ITEMS) {
      const count = state.gachaCollection[item.id] || 0;
      const card = document.createElement("div");
      card.className = `gacha-card rarity-${item.rarity}${count > 0 ? "" : " locked"}`;
      card.innerHTML = count > 0
        ? `${item.svg(itemUidCounter++)}<span class="gacha-count">×${count}</span>`
        : `<span class="gacha-locked">❔</span>`;
      gachaCollectionEl.appendChild(card);
    }
  }

  let pendingGachaItem = null;

  function pullGacha() {
    if (state.points < GACHA_COST) return;
    state.points -= GACHA_COST;

    const item = pickGachaItem();
    const owned = state.gachaCollection[item.id] || 0;
    state.gachaCollection[item.id] = owned + 1;
    const isNew = owned === 0;
    if (!isNew) {
      state.points += item.dupBonus;
    }
    pendingGachaItem = { item, isNew };

    gachaResultBox.className = `modal-box gacha-result-box rarity-${item.rarity}`;
    chestEl.className = `chest rarity-${item.rarity}`;
    chestPhaseEl.classList.remove("hidden");
    itemPhaseEl.classList.add("hidden");
    gachaResultModal.classList.remove("hidden");

    renderGachaCollection();
    updateUI();
    save();
  }

  function openChest() {
    if (!pendingGachaItem || chestEl.classList.contains("open")) return;
    chestEl.classList.add("open");
    playChestOpenSound();
    setTimeout(revealGachaItem, 550);
  }

  function revealGachaItem() {
    if (!pendingGachaItem) return;
    const { item, isNew } = pendingGachaItem;

    gachaResultIcon.innerHTML = item.svg(itemUidCounter++);
    gachaResultRarity.textContent = RARITY_LABEL[item.rarity];
    gachaResultName.textContent = item.name;
    gachaResultSub.textContent = isNew
      ? "新しいおみやげをコレクションに追加しました！"
      : `すでに持っていました。ボーナス +${item.dupBonus} pt`;

    chestPhaseEl.classList.add("hidden");
    itemPhaseEl.classList.remove("hidden");
    pendingGachaItem = null;
  }

  gachaPullBtn.addEventListener("click", pullGacha);
  chestEl.addEventListener("pointerdown", (evt) => {
    evt.preventDefault();
    openChest();
  });
  gachaResultClose.addEventListener("click", () => {
    gachaResultModal.classList.add("hidden");
  });

  function pickItemType() {
    let r = Math.random() * TOTAL_WEIGHT;
    for (const type of ITEM_TYPES) {
      if (r < type.weight) return type;
      r -= type.weight;
    }
    return ITEM_TYPES[0];
  }

  let audioCtx = null;

  function getAudioCtx() {
    if (!audioCtx) {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) return null;
      audioCtx = new Ctor();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function playTone(ctx, freq, startOffset, duration, waveType, peakGain) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = waveType;
    const t0 = ctx.currentTime + startOffset;
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.linearRampToValueAtTime(peakGain, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.03);
  }

  function playCollectSound(type) {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const freq = 640 + type.base * 40;
      playTone(ctx, freq, 0, 0.13, "triangle", 0.22);
      if (type.rare) {
        playTone(ctx, freq * 1.26, 0.09, 0.13, "triangle", 0.2);
        playTone(ctx, freq * 1.5, 0.18, 0.22, "triangle", 0.24);
      }
    } catch (e) {
      /* 音声が使えない環境は無視 */
    }
  }

  function playGreetingSound() {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      playTone(ctx, 720, 0, 0.1, "sine", 0.18);
      playTone(ctx, 960, 0.08, 0.14, "sine", 0.18);
    } catch (e) {
      /* 音声が使えない環境は無視 */
    }
  }

  function playChestOpenSound() {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      playTone(ctx, 220, 0, 0.16, "sawtooth", 0.1);
      playTone(ctx, 880, 0.16, 0.14, "triangle", 0.2);
      playTone(ctx, 1175, 0.26, 0.14, "triangle", 0.22);
      playTone(ctx, 1568, 0.36, 0.26, "triangle", 0.26);
    } catch (e) {
      /* 音声が使えない環境は無視 */
    }
  }

  function spawnFloatText(x, y, value) {
    const el = document.createElement("div");
    el.className = "float-text";
    el.textContent = `+${value}`;
    el.style.left = `${x}%`;
    el.style.top = `${y}%`;
    activeMapEl().appendChild(el);
    setTimeout(() => el.remove(), 850);
  }

  function collectItem(itemEl, type, x, y) {
    if (itemEl.dataset.collected) return;
    itemEl.dataset.collected = "1";

    const gained = type.base * state.clickLevel;
    state.points += gained;
    spawnFloatText(x, y, gained);
    playCollectSound(type);

    itemEl.classList.add("popped");
    setTimeout(() => itemEl.remove(), 220);

    updateUI();
  }

  function spawnItem() {
    const target = activeMapEl();
    const currentCount = target.querySelectorAll(".item").length;
    if (currentCount >= MAX_ITEMS_ON_MAP) return;

    const type = pickItemType();
    const x = 10 + Math.random() * 80;
    const y = 22 + Math.random() * 56;

    const el = document.createElement("div");
    el.className = "item";
    if (type.rare) el.classList.add("rare");
    el.innerHTML = type.svg(itemUidCounter++);
    el.style.left = `${x}%`;
    el.style.top = `${y}%`;

    const onCollect = (evt) => {
      evt.preventDefault();
      collectItem(el, type, x, y);
    };
    el.addEventListener("pointerdown", onCollect, { passive: false });

    target.appendChild(el);
  }

  function scheduleSpawn() {
    const interval = Math.max(400, 1600 - (state.spawnLevel - 1) * 150);
    setTimeout(() => {
      spawnItem();
      scheduleSpawn();
    }, interval);
  }

  function tickAuto() {
    if (state.autoLevel > 0) {
      state.points += state.autoLevel;
      updateUI();
    }
  }

  welcomeClose.addEventListener("click", () => {
    welcomeModal.classList.add("hidden");
    updateUI();
    save();
  });

  landmarkInfoClose.addEventListener("click", () => {
    landmarkInfoModal.classList.add("hidden");
  });

  load();
  applyOfflineEarnings();
  renderAllMaps();
  updateUI();
  renderGachaCollection();
  scheduleSpawn();
  setInterval(tickAuto, 1000);
  setInterval(save, 5000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") save();
  });
  window.addEventListener("beforeunload", save);
})();
