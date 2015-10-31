define(["exports", "module"], function (exports, module) {
  // If Chinese characters start to look funny, make sure this file is saved in UTF-8
  // In sublime text: File > Save with Encoding > UTF-8 with BOM

  // Game.data.radicals
  "use strict";

  var radicals = {
    一: { chinese: "一", pinyin: "yī", strokes: 1, english: "one" },
    丨: { chinese: "丨", pinyin: "shù", strokes: 1, english: "line" },
    丶: { chinese: "丶", pinyin: "diǎn", strokes: 1, english: "dot" },
    丿: { chinese: "丿", pinyin: "piě", strokes: 1, english: "slash" },
    乙: { chinese: "乙", pinyin: "yǐ", strokes: 1, english: "second" },
    亅: { chinese: "亅", pinyin: "gōu", strokes: 1, english: "hook" },
    二: { chinese: "二", pinyin: "èr", strokes: 2, english: "two" },
    亠: { chinese: "亠", pinyin: "tóu", strokes: 2, english: "lid" },
    人: { chinese: "人", pinyin: "rén", strokes: 2, english: "person", alt: "亻" },
    亻: { chinese: "亻", pinyin: "rén", strokes: 2, english: "person" },
    儿: { chinese: "儿", pinyin: "ér", strokes: 2, english: "legs" },
    入: { chinese: "入", pinyin: "rù", strokes: 2, english: "enter" },
    八: { chinese: "八", pinyin: "bā", strokes: 2, english: "eight", alt: "丷" },
    冂: { chinese: "冂", pinyin: "jiǒng", strokes: 2, english: "down box" },
    冖: { chinese: "冖", pinyin: "mì", strokes: 2, english: "cover" },
    冫: { chinese: "冫", pinyin: "bīng", strokes: 2, english: "ice" },
    几: { chinese: "几", pinyin: "jī, jǐ", strokes: 2, english: "table" },
    凵: { chinese: "凵", pinyin: "qǔ", strokes: 2, english: "open box" },
    刂: { chinese: "刂", pinyin: "dāo", strokes: 2, english: "knife", alt: "刀" },
    力: { chinese: "力", pinyin: "lì", strokes: 2, english: "power" },
    勹: { chinese: "勹", pinyin: "bāo", strokes: 2, english: "wrap" },
    匕: { chinese: "匕", pinyin: "bǐ", strokes: 2, english: "ladle" },
    匚: { chinese: "匚", pinyin: "fāng", strokes: 2, english: "right open box" },
    匸: { chinese: "匸", pinyin: "xǐ", strokes: 2, english: "hiding enclosure" },
    十: { chinese: "十", pinyin: "shí", strokes: 2, english: "ten" },
    卜: { chinese: "卜", pinyin: "bǔ", strokes: 2, english: "divination" },
    卩: { chinese: "卩", pinyin: "jié", strokes: 2, english: "seal" },
    厂: { chinese: "厂", pinyin: "hàn", strokes: 2, english: "cliff" },
    厶: { chinese: "厶", pinyin: "sī", strokes: 2, english: "private" },
    又: { chinese: "又", pinyin: "yòu", strokes: 2, english: "again" },
    口: { chinese: "口", pinyin: "kǒu", strokes: 3, english: "mouth" },
    囗: { chinese: "囗", pinyin: "wéi", strokes: 3, english: "enclosure" },
    土: { chinese: "土", pinyin: "tǔ", strokes: 3, english: "earth" },
    士: { chinese: "士", pinyin: "shì", strokes: 3, english: "scholar" },
    夂: { chinese: "夂", pinyin: "zhī", strokes: 3, english: "go" },
    夊: { chinese: "夊", pinyin: "suī", strokes: 3, english: "go slowly" },
    夕: { chinese: "夕", pinyin: "xī", strokes: 3, english: "night" },
    大: { chinese: "大", pinyin: "dà", strokes: 3, english: "big" },
    女: { chinese: "女", pinyin: "nǚ", strokes: 3, english: "woman" },
    子: { chinese: "子", pinyin: "zǐ", strokes: 3, english: "child" },
    宀: { chinese: "宀", pinyin: "gài", strokes: 3, english: "roof" },
    寸: { chinese: "寸", pinyin: "cùn", strokes: 3, english: "inch" },
    小: { chinese: "小", pinyin: "xiǎo", strokes: 3, english: "small" },
    尢: { chinese: "尢", pinyin: "yóu", strokes: 3, english: "lame", traditional: "尣" },
    尸: { chinese: "尸", pinyin: "shī", strokes: 3, english: "corpse" },
    屮: { chinese: "屮", pinyin: "chè", strokes: 3, english: "sprout" },
    山: { chinese: "山", pinyin: "shān", strokes: 3, english: "mountain" },
    川: { chinese: "川", pinyin: "chuān", strokes: 3, english: "river", traditional: "巛 巜" },
    工: { chinese: "工", pinyin: "gōng", strokes: 3, english: "work" },
    己: { chinese: "己", pinyin: "jǐ", strokes: 3, english: "oneself" },
    巾: { chinese: "巾", pinyin: "jīn", strokes: 3, english: "towel" },
    干: { chinese: "干", pinyin: "gān", strokes: 3, english: "dry" },
    幺: { chinese: "幺", pinyin: "yāo", strokes: 3, english: "thread" },
    广: { chinese: "广", pinyin: "guǎng", strokes: 3, english: "shelter" },
    廴: { chinese: "廴", pinyin: "yǐn", strokes: 3, english: "stride" },
    廾: { chinese: "廾", pinyin: "gǒng", strokes: 3, english: "hands joined" },
    弋: { chinese: "弋", pinyin: "yì", strokes: 3, english: "shoot with a bow" },
    弓: { chinese: "弓", pinyin: "gōng", strokes: 3, english: "bow" },
    彐: { chinese: "彐", pinyin: "jì", strokes: 3, english: "snout", traditional: "彑" },
    彡: { chinese: "彡", pinyin: "shān", strokes: 3, english: "hair" },
    彳: { chinese: "彳", pinyin: "chì", strokes: 3, english: "step" },
    忄: { chinese: "忄", pinyin: "xīn", strokes: 4, english: "heart", alt: "心" },
    戈: { chinese: "戈", pinyin: "gē", strokes: 4, english: "spear" },
    户: { chinese: "户", pinyin: "hù", strokes: 4, english: "door" },
    扌: { chinese: "扌", pinyin: "shǒu", strokes: 4, english: "hand", alt: "手" },
    支: { chinese: "支", pinyin: "zhī", strokes: 4, english: "branch" },
    攴: { chinese: "攴", pinyin: "pū", strokes: 4, english: "rap", alt: "攵" },
    文: { chinese: "文", pinyin: "wén", strokes: 4, english: "script" },
    斗: { chinese: "斗", pinyin: "dǒu", strokes: 4, english: "dipper" },
    斤: { chinese: "斤", pinyin: "jīn", strokes: 4, english: "axe" },
    方: { chinese: "方", pinyin: "fāng", strokes: 4, english: "square" },
    无: { chinese: "无", pinyin: "wú", strokes: 4, english: "not" },
    日: { chinese: "日", pinyin: "rì", strokes: 4, english: "sun" },
    曰: { chinese: "曰", pinyin: "yuē", strokes: 4, english: "say" },
    月: { chinese: "月", pinyin: "yuè", strokes: 4, english: "moon" },
    木: { chinese: "木", pinyin: "mù", strokes: 4, english: "tree" },
    欠: { chinese: "欠", pinyin: "qiàn", strokes: 4, english: "lack" },
    止: { chinese: "止", pinyin: "zhǐ", strokes: 4, english: "stop" },
    歹: { chinese: "歹", pinyin: "dǎi", strokes: 4, english: "death" },
    殳: { chinese: "殳", pinyin: "shū", strokes: 4, english: "weapon" },
    母: { chinese: "母", pinyin: "mǔ", strokes: 4, english: "mother", traditional: "毋" },
    比: { chinese: "比", pinyin: "bǐ", strokes: 4, english: "compare" },
    毛: { chinese: "毛", pinyin: "máo", strokes: 4, english: "fur" },
    氏: { chinese: "氏", pinyin: "shì", strokes: 4, english: "clan" },
    气: { chinese: "气", pinyin: "qì", strokes: 4, english: "steam" },
    水: { chinese: "水", pinyin: "shuǐ", strokes: 4, english: "water", alt: "氵" },
    火: { chinese: "火", pinyin: "huǒ", strokes: 4, english: "fire", alt: "灬" },
    爫: { chinese: "爫", pinyin: "zhǎo", strokes: 4, english: "claw", alt: "爪" },
    父: { chinese: "父", pinyin: "fù", strokes: 4, english: "father" },
    爻: { chinese: "爻", pinyin: "yáo", strokes: 4, english: "lines on a trigram" },
    爿: { chinese: "爿", pinyin: "qiáng", strokes: 4, english: "half of a tree trunk" },
    片: { chinese: "片", pinyin: "piàn", strokes: 4, english: "slice" },
    牙: { chinese: "牙", pinyin: "yá", strokes: 4, english: "tooth" },
    牜: { chinese: "牜", pinyin: "niú", strokes: 4, english: "cow", alt: "牛" },
    犭: { chinese: "犭", pinyin: "quǎn", strokes: 3, english: "dog", alt: "犬" },
    玄: { chinese: "玄", pinyin: "xuán", strokes: 5, english: "profound" },
    玉: { chinese: "玉", pinyin: "yù", strokes: 5, english: "jade", alt: "王" },
    瓜: { chinese: "瓜", pinyin: "guā", strokes: 5, english: "melon" },
    瓦: { chinese: "瓦", pinyin: "wǎ", strokes: 5, english: "tile" },
    甘: { chinese: "甘", pinyin: "gān", strokes: 5, english: "sweet" },
    生: { chinese: "生", pinyin: "shēng", strokes: 5, english: "life" },
    用: { chinese: "用", pinyin: "yòng", strokes: 5, english: "use" },
    田: { chinese: "田", pinyin: "tián", strokes: 5, english: "field" },
    疋: { chinese: "疋", pinyin: "pǐ", strokes: 5, english: "cloth" },
    疒: { chinese: "疒", pinyin: "bìng", strokes: 5, english: "ill" },
    癶: { chinese: "癶", pinyin: "bō", strokes: 5, english: "foot steps" },
    白: { chinese: "白", pinyin: "bái", strokes: 5, english: "white" },
    皮: { chinese: "皮", pinyin: "pí", strokes: 5, english: "skin" },
    皿: { chinese: "皿", pinyin: "mǐn", strokes: 5, english: "dish" },
    目: { chinese: "目", pinyin: "mù", strokes: 5, english: "eye" },
    矛: { chinese: "矛", pinyin: "máo", strokes: 5, english: "spear" },
    矢: { chinese: "矢", pinyin: "shǐ", strokes: 5, english: "arrow" },
    石: { chinese: "石", pinyin: "shí", strokes: 5, english: "stone" },
    示: { chinese: "示", pinyin: "shì", strokes: 5, english: "spirit", alt: "礻" },
    禸: { chinese: "禸", pinyin: "róu", strokes: 4, english: "track" },
    禾: { chinese: "禾", pinyin: "hé", strokes: 5, english: "grain" },
    穴: { chinese: "穴", pinyin: "xuè", strokes: 5, english: "cave" },
    立: { chinese: "立", pinyin: "lì", strokes: 5, english: "stand" },
    竹: { chinese: "竹", pinyin: "zhú", strokes: 6, english: "bamboo" },
    米: { chinese: "米", pinyin: "mǐ", strokes: 6, english: "rice" },
    纟: { chinese: "纟", pinyin: "sī", strokes: 3, english: "silk", traditional: "糸" },
    缶: { chinese: "缶", pinyin: "fǒu", strokes: 6, english: "jar" },
    罒: { chinese: "罒", pinyin: "wǎng", strokes: 6, english: "net", alt: "网" },
    羊: { chinese: "羊", pinyin: "yáng", strokes: 6, english: "sheep" },
    羽: { chinese: "羽", pinyin: "yǔ", strokes: 6, english: "feather" },
    老: { chinese: "老", pinyin: "lǎo", strokes: 6, english: "old" },
    而: { chinese: "而", pinyin: "ér", strokes: 6, english: "and" },
    耒: { chinese: "耒", pinyin: "lěi", strokes: 6, english: "plow" },
    耳: { chinese: "耳", pinyin: "ěr", strokes: 6, english: "ear" },
    聿: { chinese: "聿", pinyin: "yù", strokes: 6, english: "brush" },
    肉: { chinese: "肉", pinyin: "ròu", strokes: 6, english: "meat" },
    臣: { chinese: "臣", pinyin: "chén", strokes: 6, english: "minister" },
    自: { chinese: "自", pinyin: "zì", strokes: 6, english: "oneself" },
    至: { chinese: "至", pinyin: "zhì", strokes: 6, english: "arrive" },
    臼: { chinese: "臼", pinyin: "jiù", strokes: 6, english: "mortar" },
    舌: { chinese: "舌", pinyin: "shé", strokes: 6, english: "tongue" },
    舛: { chinese: "舛", pinyin: "chuǎn", strokes: 6, english: "contrary" },
    舟: { chinese: "舟", pinyin: "zhōu", strokes: 6, english: "boat" },
    艮: { chinese: "艮", pinyin: "gèn", strokes: 6, english: "mountain" },
    色: { chinese: "色", pinyin: "sè", strokes: 6, english: "color" },
    艹: { chinese: "艹", pinyin: "cǎo", strokes: 3, english: "grass" },
    虍: { chinese: "虍", pinyin: "hǔ", strokes: 6, english: "tiger" },
    虫: { chinese: "虫", pinyin: "chóng", strokes: 6, english: "insect" },
    血: { chinese: "血", pinyin: "xuě", strokes: 6, english: "blood" },
    行: { chinese: "行", pinyin: "xíng", strokes: 6, english: "walk" },
    衤: { chinese: "衤", pinyin: "yī", strokes: 6, english: "clothes", alt: "衣" },
    西: { chinese: "西", pinyin: "xī", strokes: 6, english: "west", alt: "覀" },
    见: { chinese: "见", pinyin: "jiàn", strokes: 4, english: "see", traditional: "見" },
    角: { chinese: "角", pinyin: "jiǎo", strokes: 7, english: "horn" },
    讠: { chinese: "讠", pinyin: "yán", strokes: 2, english: "speech", traditional: "言" },
    谷: { chinese: "谷", pinyin: "gǔ", strokes: 7, english: "valley" },
    豆: { chinese: "豆", pinyin: "dòu", strokes: 7, english: "bean" },
    豕: { chinese: "豕", pinyin: "shǐ", strokes: 7, english: "pig" },
    豸: { chinese: "豸", pinyin: "zhì", strokes: 7, english: "badger" },
    贝: { chinese: "贝", pinyin: "bèi", strokes: 4, english: "shell", traditional: "貝" },
    赤: { chinese: "赤", pinyin: "chì", strokes: 7, english: "red" },
    走: { chinese: "走", pinyin: "zǒu", strokes: 7, english: "walk" },
    足: { chinese: "足", pinyin: "zú", strokes: 7, english: "foot" },
    身: { chinese: "身", pinyin: "shēn", strokes: 7, english: "body" },
    车: { chinese: "车", pinyin: "chē", strokes: 4, english: "cart", traditional: "車" },
    辛: { chinese: "辛", pinyin: "xīn", strokes: 7, english: "bitter" },
    辰: { chinese: "辰", pinyin: "chén", strokes: 7, english: "morning" },
    辶: { chinese: "辶", pinyin: "chuò", strokes: 3, english: "walk" },
    阝: { chinese: "阝", pinyin: "yì", strokes: 7, english: "city", traditional: "邑" },
    酉: { chinese: "酉", pinyin: "yǒu", strokes: 7, english: "wine" },
    釆: { chinese: "釆", pinyin: "biàn", strokes: 7, english: "distinguish" },
    里: { chinese: "里", pinyin: "lǐ", strokes: 7, english: "village" },
    钅: { chinese: "钅", pinyin: "jīn", strokes: 5, english: "metal", alt: "金" },
    长: { chinese: "长", pinyin: "cháng", strokes: 4, english: "long", traditional: "長" },
    门: { chinese: "门", pinyin: "mén", strokes: 3, english: "gate", traditional: "門" },
    阝: { chinese: "阝", pinyin: "fù", strokes: 8, english: "mound", traditional: "阜" },
    隶: { chinese: "隶", pinyin: "lì", strokes: 8, english: "slave" },
    隹: { chinese: "隹", pinyin: "zhuī", strokes: 8, english: "short-tailed bird" },
    雨: { chinese: "雨", pinyin: "yǔ", strokes: 8, english: "rain" },
    青: { chinese: "青", pinyin: "qīng", strokes: 8, english: "blue" },
    非: { chinese: "非", pinyin: "fēi", strokes: 8, english: "wrong" },
    面: { chinese: "面", pinyin: "miàn", strokes: 9, english: "face" },
    革: { chinese: "革", pinyin: "gé", strokes: 9, english: "leather" },
    韦: { chinese: "韦", pinyin: "wěi", strokes: 4, english: "soft leather", traditional: "(韋)" },
    韭: { chinese: "韭", pinyin: "jiǔ", strokes: 9, english: "leek" },
    音: { chinese: "音", pinyin: "yīn", strokes: 9, english: "sound" },
    页: { chinese: "页", pinyin: "yè", strokes: 6, english: "page", traditional: "(頁)" },
    风: { chinese: "风", pinyin: "fēng", strokes: 4, english: "wind", traditional: "(風)" },
    飞: { chinese: "飞", pinyin: "fēi", strokes: 4, english: "fly", traditional: "(飛)" },
    饣: { chinese: "饣", pinyin: "shí", strokes: 3, english: "eat", traditional: "飠 食" },
    首: { chinese: "首", pinyin: "shǒu", strokes: 9, english: "head" },
    香: { chinese: "香", pinyin: "xiāng", strokes: 9, english: "fragrant" },
    马: { chinese: "马", pinyin: "mǎ", strokes: 3, english: "horse", traditional: "(馬)" },
    骨: { chinese: "骨", pinyin: "gǔ", strokes: 9, english: "bone" },
    高: { chinese: "高", pinyin: "gāo", strokes: 10, english: "high" },
    髟: { chinese: "髟", pinyin: "biāo", strokes: 10, english: "long hair" },
    鬥: { chinese: "鬥", pinyin: "dòu", strokes: 10, english: "fight" },
    鬯: { chinese: "鬯", pinyin: "chàng", strokes: 10, english: "sacrificial wine" },
    鬲: { chinese: "鬲", pinyin: "lì", strokes: 10, english: "cauldron" },
    鬼: { chinese: "鬼", pinyin: "guǐ", strokes: 9, english: "ghost" },
    鱼: { chinese: "鱼", pinyin: "yú", strokes: 8, english: "fish", traditional: "魚" },
    鸟: { chinese: "鸟", pinyin: "niǎo", strokes: 5, english: "bird", traditional: "鳥" },
    卤: { chinese: "卤", pinyin: "lǔ", strokes: 7, english: "salty" },
    鹿: { chinese: "鹿", pinyin: "lù", strokes: 11, english: "deer" },
    麦: { chinese: "麦", pinyin: "mài", strokes: 7, english: "wheat", traditional: "麥" },
    麻: { chinese: "麻", pinyin: "má", strokes: 11, english: "hemp" },
    黄: { chinese: "黄", pinyin: "huáng", strokes: 11, english: "yellow" },
    黍: { chinese: "黍", pinyin: "shǔ", strokes: 12, english: "millet" },
    黑: { chinese: "黑", pinyin: "hēi", strokes: 12, english: "black" },
    黹: { chinese: "黹", pinyin: "zhǐ", strokes: 12, english: "embroidery" },
    黾: { chinese: "黾", pinyin: "mǐn", strokes: 8, english: "frog", traditional: "黽" },
    鼎: { chinese: "鼎", pinyin: "dǐng", strokes: 12, english: "tripod" },
    鼓: { chinese: "鼓", pinyin: "gǔ", strokes: 13, english: "drum" },
    鼠: { chinese: "鼠", pinyin: "shǔ", strokes: 13, english: "rat" },
    鼻: { chinese: "鼻", pinyin: "bí", strokes: 14, english: "nose" },
    齐: { chinese: "齐", pinyin: "qí", strokes: 6, english: "even", traditional: "齊" },
    齿: { chinese: "齿", pinyin: "chǐ", strokes: 8, english: "tooth", traditional: "齒" },
    龙: { chinese: "龙", pinyin: "lóng", strokes: 5, english: "dragon", traditional: "龍" },
    龟: { chinese: "龟", pinyin: "guī", strokes: 7, english: "turtle", traditional: "龜" },
    龠: { chinese: "龠", pinyin: "yuè", strokes: 17, english: "flute" }
  };

  Object.keys(radicals).forEach(function (k) {
    return radicals[k].parts = [k];
  });

  module.exports = radicals;
});