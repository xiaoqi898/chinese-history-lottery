// ============================================
// 中国历史身份抽签 - 数据模块
// ============================================

// 朝代数据（按出生概率权重排序）
// weight = 平均人口(百万) × 年数 × 0.035（出生率）
const DYNASTIES = [
  {
    id: 'prc',
    name: '新中国',
    period: '1949年至今',
    years: 77,
    avgPop: 900,
    weight: 2426,
    color: '#DC2626',
    seal: '华',
    description: '新中国 · 万象更新',
    subPeriods: [
      { name: '建国初期', range: '1949-1966' },
      { name: '文革时期', range: '1966-1976' },
      { name: '改革开放', range: '1978-2000' },
      { name: '新世纪', range: '2000-至今' },
    ],
  },
  {
    id: 'qing',
    name: '清朝',
    period: '1644年-1912年',
    years: 268,
    avgPop: 200,
    weight: 2160,
    color: '#7C3AED',
    seal: '清',
    description: '大清 · 落日余晖',
    subPeriods: [
      { name: '顺治', range: '1644-1661' },
      { name: '康熙', range: '1661-1722' },
      { name: '雍正', range: '1723-1735' },
      { name: '乾隆', range: '1736-1795' },
      { name: '嘉庆', range: '1796-1820' },
      { name: '道光', range: '1821-1850' },
      { name: '咸丰', range: '1851-1861' },
      { name: '同治', range: '1862-1874' },
      { name: '光绪', range: '1875-1908' },
      { name: '宣统', range: '1909-1912' },
    ],
  },
  {
    id: 'ming',
    name: '明朝',
    period: '1368年-1644年',
    years: 276,
    avgPop: 80,
    weight: 896,
    color: '#D97706',
    seal: '明',
    description: '大明 · 日月重开',
    subPeriods: [
      { name: '洪武', range: '1368-1398' },
      { name: '永乐', range: '1403-1424' },
      { name: '宣德', range: '1426-1435' },
      { name: '成化', range: '1465-1487' },
      { name: '弘治', range: '1488-1505' },
      { name: '正德', range: '1506-1521' },
      { name: '嘉靖', range: '1522-1566' },
      { name: '万历', range: '1573-1620' },
      { name: '崇祯', range: '1628-1644' },
    ],
  },
  {
    id: 'preqin',
    name: '先秦',
    period: '约前2070年-前221年',
    years: 1849,
    avgPop: 12,
    weight: 864,
    color: '#78716C',
    seal: '周',
    description: '先秦 · 百家争鸣',
    subPeriods: [
      { name: '夏', range: '约前2070-前1600' },
      { name: '商', range: '约前1600-前1046' },
      { name: '西周', range: '前1046-前771' },
      { name: '春秋', range: '前770-前476' },
      { name: '战国', range: '前475-前221' },
    ],
  },
  {
    id: 'song',
    name: '宋朝',
    period: '960年-1279年',
    years: 319,
    avgPop: 55,
    weight: 702,
    color: '#059669',
    seal: '宋',
    description: '大宋 · 文治天下',
    subPeriods: [
      { name: '北宋初', range: '960-997' },
      { name: '真宗仁宗', range: '998-1063' },
      { name: '神宗哲宗', range: '1068-1100' },
      { name: '徽宗钦宗', range: '1101-1127' },
      { name: '南宋初', range: '1127-1194' },
      { name: '南宋中', range: '1195-1264' },
      { name: '南宋末', range: '1265-1279' },
    ],
  },
  {
    id: 'qinhan',
    name: '秦汉',
    period: '前221年-220年',
    years: 441,
    avgPop: 40,
    weight: 704,
    color: '#B45309',
    seal: '汉',
    description: '大汉 · 丝绸之路',
    subPeriods: [
      { name: '秦', range: '前221-前207' },
      { name: '西汉初', range: '前206-前141' },
      { name: '汉武帝', range: '前140-前87' },
      { name: '西汉中后期', range: '前86-公元8' },
      { name: '新莽', range: '9-23' },
      { name: '东汉', range: '25-220' },
    ],
  },
  {
    id: 'minguo',
    name: '民国',
    period: '1912年-1949年',
    years: 37,
    avgPop: 450,
    weight: 666,
    color: '#2563EB',
    seal: '民',
    description: '民国 · 风云激荡',
    subPeriods: [
      { name: '北洋时期', range: '1912-1928' },
      { name: '黄金十年', range: '1928-1937' },
      { name: '抗战时期', range: '1937-1945' },
      { name: '内战时期', range: '1945-1949' },
    ],
  },
  {
    id: 'suitang',
    name: '隋唐',
    period: '581年-907年',
    years: 326,
    avgPop: 45,
    weight: 594,
    color: '#EA580C',
    seal: '唐',
    description: '盛唐 · 万国来朝',
    subPeriods: [
      { name: '隋', range: '581-618' },
      { name: '初唐', range: '618-712' },
      { name: '盛唐', range: '713-765' },
      { name: '中唐', range: '766-835' },
      { name: '晚唐', range: '836-907' },
    ],
  },
  {
    id: 'weijin',
    name: '魏晋南北朝',
    period: '220年-589年',
    years: 369,
    avgPop: 25,
    weight: 370,
    color: '#6D28D9',
    seal: '魏',
    description: '魏晋 · 风骨长存',
    subPeriods: [
      { name: '三国', range: '220-280' },
      { name: '西晋', range: '266-316' },
      { name: '东晋十六国', range: '317-420' },
      { name: '南北朝', range: '420-589' },
    ],
  },
  {
    id: 'yuan',
    name: '元朝',
    period: '1271年-1368年',
    years: 97,
    avgPop: 60,
    weight: 240,
    color: '#0D9488',
    seal: '元',
    description: '大元 · 铁骑万里',
    subPeriods: [
      { name: '元初', range: '1271-1294' },
      { name: '元中期', range: '1295-1332' },
      { name: '元末', range: '1333-1368' },
    ],
  },
];

// 地理区域（按历史人口分布）
const REGIONS = {
  zhongyuan: { name: '中原', modern: '河南、陕西、山西', icon: '🏛️' },
  jiangnan: { name: '江南', modern: '江苏、浙江、上海、安徽', icon: '🌊' },
  lingnan: { name: '岭南', modern: '广东、广西、海南', icon: '🌺' },
  bashu: { name: '巴蜀', modern: '四川、重庆', icon: '🏔️' },
  dongbei: { name: '东北', modern: '辽宁、吉林、黑龙江', icon: '🌲' },
  xibei: { name: '西北', modern: '甘肃、宁夏、新疆', icon: '🏜️' },
  yungui: { name: '云贵', modern: '云南、贵州', icon: '🌿' },
  mintai: { name: '闽台', modern: '福建、台湾', icon: '🏝️' },
  huguang: { name: '湖广', modern: '湖北、湖南、江西', icon: '🌾' },
  saiwaai: { name: '塞外', modern: '内蒙古、蒙古高原', icon: '🐎' },
};

// 各朝代地域人口分布权重
const DYNASTY_REGION_WEIGHTS = {
  preqin: { zhongyuan: 50, bashu: 8, jiangnan: 5, huguang: 8, saiwaai: 10, lingnan: 2, xibei: 10, yungui: 2, dongbei: 3, mintai: 2 },
  qinhan: { zhongyuan: 40, bashu: 12, jiangnan: 10, huguang: 10, saiwaai: 5, lingnan: 4, xibei: 12, yungui: 2, dongbei: 3, mintai: 2 },
  weijin: { zhongyuan: 30, bashu: 10, jiangnan: 20, huguang: 10, saiwaai: 5, lingnan: 5, xibei: 8, yungui: 3, dongbei: 5, mintai: 4 },
  suitang: { zhongyuan: 30, bashu: 12, jiangnan: 18, huguang: 10, saiwaai: 5, lingnan: 6, xibei: 8, yungui: 4, dongbei: 3, mintai: 4 },
  song: { zhongyuan: 22, bashu: 15, jiangnan: 25, huguang: 10, saiwaai: 2, lingnan: 7, xibei: 5, yungui: 4, dongbei: 2, mintai: 8 },
  yuan: { zhongyuan: 20, bashu: 12, jiangnan: 25, huguang: 10, saiwaai: 8, lingnan: 7, xibei: 5, yungui: 4, dongbei: 3, mintai: 6 },
  ming: { zhongyuan: 20, bashu: 15, jiangnan: 25, huguang: 12, saiwaai: 2, lingnan: 8, xibei: 4, yungui: 5, dongbei: 2, mintai: 7 },
  qing: { zhongyuan: 18, bashu: 14, jiangnan: 22, huguang: 12, saiwaai: 4, lingnan: 10, xibei: 4, yungui: 5, dongbei: 6, mintai: 5 },
  minguo: { zhongyuan: 16, bashu: 14, jiangnan: 22, huguang: 12, saiwaai: 3, lingnan: 10, xibei: 5, yungui: 5, dongbei: 8, mintai: 5 },
  prc: { zhongyuan: 16, bashu: 12, jiangnan: 18, huguang: 13, saiwaai: 2, lingnan: 12, xibei: 5, yungui: 6, dongbei: 8, mintai: 4 },
  // 五代十国归属宋
  wudai: { zhongyuan: 25, bashu: 15, jiangnan: 20, huguang: 10, saiwaai: 3, lingnan: 8, xibei: 5, yungui: 4, dongbei: 2, mintai: 8 },
};

// 职业/身份类别
const OCCUPATIONS = {
  // 传说级 (Legendary)
  emperor: {
    name: '皇帝',
    rarity: 'legendary',
    tags: ['帝王', '天子', '陛下'],
    description: '坐拥天下，万民之主',
    weight: 0.001,
  },
  empress: {
    name: '皇后/妃嫔',
    rarity: 'legendary',
    tags: ['后宫', '娘娘', '贵妃'],
    description: '后宫佳丽，母仪天下',
    weight: 0.002,
  },
  top_general: {
    name: '名将/统帅',
    rarity: 'legendary',
    tags: ['将军', '元帅', '大都督'],
    description: '征战沙场，名垂青史',
    weight: 0.003,
  },
  great_scholar: {
    name: '大文豪/大思想家',
    rarity: 'legendary',
    tags: ['圣贤', '宗师', '文豪'],
    description: '文章千古，思想流芳',
    weight: 0.003,
  },

  // 史诗级 (Epic)
  high_official: {
    name: '朝廷重臣',
    rarity: 'epic',
    tags: ['丞相', '尚书', '大学士'],
    description: '位极人臣，权倾朝野',
    weight: 0.01,
  },
  provincial_official: {
    name: '地方官员',
    rarity: 'epic',
    tags: ['知府', '知县', '刺史'],
    description: '牧守一方，造福百姓',
    weight: 0.03,
  },
  wealthy_merchant: {
    name: '富商巨贾',
    rarity: 'epic',
    tags: ['商人', '盐商', '票号'],
    description: '富甲一方，通达四海',
    weight: 0.03,
  },
  military_officer: {
    name: '武将/军官',
    rarity: 'epic',
    tags: ['武将', '千总', '把总'],
    description: '披甲上阵，保家卫国',
    weight: 0.04,
  },
  famous_artisan: {
    name: '名匠/名医',
    rarity: 'epic',
    tags: ['匠师', '国手', '御医'],
    description: '技艺超群，声名远扬',
    weight: 0.03,
  },
  palace_eunuch: {
    name: '太监/宫人',
    rarity: 'epic',
    tags: ['太监', '内侍', '公公'],
    description: '身处禁宫，近在天颜',
    weight: 0.02,
  },

  // 稀有级 (Rare)
  scholar: {
    name: '读书人/秀才',
    rarity: 'rare',
    tags: ['秀才', '举人', '读书人'],
    description: '寒窗苦读，志在功名',
    weight: 0.08,
  },
  artisan: {
    name: '手工业者',
    rarity: 'rare',
    tags: ['铁匠', '木匠', '织工', '陶工'],
    description: '心灵手巧，养家糊口',
    weight: 0.15,
  },
  soldier: {
    name: '士兵',
    rarity: 'rare',
    tags: ['兵丁', '戍卒', '军汉'],
    description: '执戈戍边，枕戈待旦',
    weight: 0.15,
  },
  monk: {
    name: '僧道',
    rarity: 'rare',
    tags: ['和尚', '道士', '方丈'],
    description: '青灯古佛，求仙问道',
    weight: 0.06,
  },
  fisher: {
    name: '渔民',
    rarity: 'rare',
    tags: ['渔夫', '船家', '水上人'],
    description: '靠水吃水，风雨无阻',
    weight: 0.04,
  },
  entertainer: {
    name: '艺人/优伶',
    rarity: 'rare',
    tags: ['戏子', '说书人', '杂耍'],
    description: '以艺谋生，走街串巷',
    weight: 0.03,
  },

  // 普通级 (Common)
  farmer: {
    name: '农民',
    rarity: 'common',
    tags: ['农民', '佃户', '庄稼汉'],
    description: '面朝黄土背朝天',
    weight: 5.0,
  },
  herder: {
    name: '牧民',
    rarity: 'common',
    tags: ['牧民', '牧人', '放牧'],
    description: '逐水草而居',
    weight: 0.8,
  },
  servant: {
    name: '奴婢/佣工',
    rarity: 'common',
    tags: ['丫鬟', '长工', '仆人'],
    description: '寄人篱下，劳碌一生',
    weight: 0.6,
  },
  peddler: {
    name: '小贩/货郎',
    rarity: 'common',
    tags: ['货郎', '小贩', '挑担'],
    description: '走村串巷，蝇头小利',
    weight: 0.3,
  },
  laborer: {
    name: '苦力/劳工',
    rarity: 'common',
    tags: ['苦力', '挑夫', '纤夫'],
    description: '出大力，流大汗',
    weight: 0.4,
  },
};

// 稀有度配置
const RARITY_CONFIG = {
  legendary: {
    name: '传说',
    color: '#FF6B00',
    gradient: 'linear-gradient(135deg, #FF6B00, #FFD700)',
    glow: '0 0 30px rgba(255,107,0,0.5)',
    stars: 5,
    chance: '万中无一',
  },
  epic: {
    name: '史诗',
    color: '#A855F7',
    gradient: 'linear-gradient(135deg, #A855F7, #6366F1)',
    glow: '0 0 20px rgba(168,85,247,0.5)',
    stars: 4,
    chance: '千里挑一',
  },
  rare: {
    name: '稀有',
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
    glow: '0 0 15px rgba(59,130,246,0.4)',
    stars: 3,
    chance: '百里挑一',
  },
  common: {
    name: '普通',
    color: '#6B7280',
    gradient: 'linear-gradient(135deg, #6B7280, #9CA3AF)',
    glow: 'none',
    stars: 1,
    chance: '芸芸众生',
  },
};

// 各朝代职业权重调整（乘数）
const DYNASTY_OCCUPATION_MULTIPLIERS = {
  preqin: { herder: 3.0, soldier: 1.5, monk: 0.1, entertainer: 0.3, scholar: 0.3, wealthy_merchant: 0.2 },
  qinhan: { soldier: 1.8, farmer: 1.2, monk: 0.2, palace_eunuch: 1.5 },
  weijin: { monk: 2.5, scholar: 2.0, military_officer: 1.5, high_official: 0.8 },
  suitang: { monk: 2.0, scholar: 1.5, wealthy_merchant: 1.3, entertainer: 1.5, top_general: 1.3 },
  song: { scholar: 2.5, wealthy_merchant: 2.0, entertainer: 2.0, military_officer: 0.6, soldier: 0.5 },
  yuan: { herder: 2.5, soldier: 2.0, scholar: 0.4, high_official: 0.3, farmer: 0.8 },
  ming: { scholar: 1.8, farmer: 1.3, palace_eunuch: 2.0, fisher: 1.3, peddler: 1.5 },
  qing: { farmer: 1.3, scholar: 1.5, laborer: 1.5, palace_eunuch: 1.8, peddler: 1.8 },
  minguo: { soldier: 2.5, scholar: 2.0, laborer: 2.0, wealthy_merchant: 1.5, monk: 0.5, farmer: 0.7 },
  prc: { farmer: 1.5, laborer: 2.5, soldier: 1.2, scholar: 2.0, peddler: 0.3, palace_eunuch: 0, emperor: 0, empress: 0 },
};

// 朝代职业别名映射（名称 + 标签按朝代替换）
// 格式: { 朝代id: { 职业key: { name: '朝代特有名称', tags: ['标签1','标签2'] } } }
const DYNASTY_OCCUPATION_ALIASES = {
  preqin: {
    emperor:      { name: '天子/诸侯', tags: ['天子', '周王', '诸侯', '共主'] },
    empress:      { name: '王后/夫人', tags: ['王后', '夫人', '媵妾'] },
    top_general:  { name: '上将/司马', tags: ['司马', '将军', '元帅', '上将'] },
    great_scholar:{ name: '圣人/诸子', tags: ['圣人', '夫子', '诸子百家'] },
    high_official:{ name: '卿大夫', tags: ['卿', '大夫', '宰', '太师'] },
    provincial_official: { name: '邑宰/里正', tags: ['邑宰', '里正', '乡老'] },
    wealthy_merchant: { name: '大商贾', tags: ['商贾', '行商', '巨贾'] },
    military_officer: { name: '百夫长', tags: ['百夫长', '军吏', '卒长'] },
    famous_artisan: { name: '百工之长', tags: ['百工', '匠师', '冶师'] },
    palace_eunuch: { name: '寺人/阉侍', tags: ['寺人', '阉侍', '内竖'] },
    scholar:      { name: '士/门客', tags: ['士', '门客', '宾客', '游士'] },
    soldier:      { name: '甲士/徒卒', tags: ['甲士', '徒卒', '戍卒'] },
    monk:         { name: '巫祝/祭司', tags: ['巫祝', '祭司', '卜者'] },
    farmer:       { name: '庶民/农夫', tags: ['庶民', '农夫', '野人', '井田'] },
    herder:       { name: '牧人', tags: ['牧人', '圉人', '牛童'] },
  },
  qinhan: {
    emperor:      { name: '皇帝', tags: ['皇帝', '陛下', '天子'] },
    empress:      { name: '皇后/妃嫔', tags: ['皇后', '贵妃', '婕妤'] },
    top_general:  { name: '大将军', tags: ['大将军', '骠骑将军', '车骑将军'] },
    great_scholar:{ name: '大儒/太史', tags: ['大儒', '太史', '经师'] },
    high_official:{ name: '丞相/三公', tags: ['丞相', '太尉', '御史大夫'] },
    provincial_official: { name: '郡守/县令', tags: ['郡守', '县令', '太守'] },
    military_officer: { name: '校尉/都尉', tags: ['校尉', '都尉', '军候'] },
    palace_eunuch: { name: '宦官/中常侍', tags: ['宦官', '中常侍', '黄门'] },
    scholar:      { name: '儒生/太学生', tags: ['儒生', '太学生', '经生'] },
    soldier:      { name: '戍卒/材官', tags: ['戍卒', '材官', '骑士'] },
    farmer:       { name: '编户齐民', tags: ['编户', '农夫', '佃户'] },
    laborer:      { name: '刑徒/徒隶', tags: ['刑徒', '徒隶', '徭役'] },
  },
  weijin: {
    emperor:      { name: '皇帝/天王', tags: ['皇帝', '天王', '陛下'] },
    high_official:{ name: '尚书令/中书令', tags: ['尚书令', '中书令', '门下侍中'] },
    provincial_official: { name: '刺史/太守', tags: ['刺史', '太守', '内史'] },
    military_officer: { name: '都督/镇将', tags: ['都督', '镇将', '护军'] },
    scholar:      { name: '名士/清谈客', tags: ['名士', '清谈', '玄学'] },
    farmer:       { name: '部曲/佃客', tags: ['部曲', '佃客', '田客'] },
    herder:       { name: '牧子/牧户', tags: ['牧子', '牧户'] },
  },
  suitang: {
    emperor:      { name: '皇帝/圣人', tags: ['皇帝', '圣人', '天皇'] },
    empress:      { name: '皇后/贵妃', tags: ['皇后', '贵妃', '才人'] },
    top_general:  { name: '节度使/大总管', tags: ['节度使', '大总管', '大将军'] },
    great_scholar:{ name: '文宗/大儒', tags: ['文宗', '大儒', '翰林'] },
    high_official:{ name: '宰相/同平章事', tags: ['宰相', '同平章事', '仆射'] },
    provincial_official: { name: '州牧/县令', tags: ['州牧', '县令', '刺史'] },
    military_officer: { name: '折冲都尉', tags: ['折冲都尉', '郎将', '校尉'] },
    famous_artisan: { name: '尚方匠/御医', tags: ['尚方', '御医', '太医'] },
    palace_eunuch: { name: '内侍/宦官', tags: ['内侍', '宦官', '高力士'] },
    scholar:      { name: '进士/举人', tags: ['进士', '明经', '举人'] },
    soldier:      { name: '府兵/募兵', tags: ['府兵', '募兵', '健儿'] },
    wealthy_merchant: { name: '胡商/大贾', tags: ['胡商', '大贾', '绢商'] },
    entertainer:  { name: '梨园弟子/教坊伶', tags: ['梨园', '教坊', '舞伎'] },
  },
  song: {
    emperor:      { name: '皇帝/官家', tags: ['皇帝', '官家', '陛下'] },
    high_official:{ name: '宰相/参知政事', tags: ['宰相', '参知政事', '平章事'] },
    provincial_official: { name: '知州/知县', tags: ['知州', '知县', '通判'] },
    military_officer: { name: '统制/都统', tags: ['统制', '都统', '准备将'] },
    scholar:      { name: '士人/举子', tags: ['士人', '举子', '太学生'] },
    wealthy_merchant: { name: '行商/交子商', tags: ['行商', '交子', '牙人'] },
    entertainer:  { name: '瓦舍艺人', tags: ['瓦舍', '勾栏', '说话人'] },
    soldier:      { name: '禁军/厢军', tags: ['禁军', '厢军', '弓手'] },
    farmer:       { name: '客户/主户', tags: ['客户', '主户', '佃客'] },
  },
  yuan: {
    emperor:      { name: '大汗/皇帝', tags: ['大汗', '皇帝', '可汗'] },
    high_official:{ name: '丞相/达鲁花赤', tags: ['丞相', '达鲁花赤', '平章'] },
    provincial_official: { name: '路总管/县尹', tags: ['路总管', '县尹', '知州'] },
    military_officer: { name: '万户/千户', tags: ['万户', '千户', '百户'] },
    scholar:      { name: '儒户/教书先生', tags: ['儒户', '教书', '九儒十丐'] },
    wealthy_merchant: { name: '色目商人', tags: ['色目人', '斡脱商', '回商'] },
    farmer:       { name: '农户/驱口', tags: ['农户', '驱口', '佃户'] },
  },
  ming: {
    emperor:      { name: '皇帝/万岁爷', tags: ['皇帝', '万岁爷', '天子'] },
    high_official:{ name: '内阁首辅/大学士', tags: ['首辅', '大学士', '尚书'] },
    provincial_official: { name: '知府/知县', tags: ['知府', '知县', '巡抚'] },
    military_officer: { name: '总兵/参将', tags: ['总兵', '参将', '守备'] },
    palace_eunuch: { name: '太监/秉笔', tags: ['太监', '秉笔', '东厂', '锦衣卫'] },
    scholar:      { name: '秀才/举人', tags: ['秀才', '举人', '生员'] },
    wealthy_merchant: { name: '盐商/海商', tags: ['盐商', '海商', '徽商'] },
    soldier:      { name: '卫所兵/募兵', tags: ['卫所', '募兵', '家丁'] },
    farmer:       { name: '农户/自耕农', tags: ['农户', '自耕农', '佃户'] },
  },
  qing: {
    emperor:      { name: '皇帝/万岁爷', tags: ['皇帝', '万岁爷', '圣上'] },
    high_official:{ name: '军机大臣/尚书', tags: ['军机大臣', '尚书', '总督'] },
    provincial_official: { name: '知府/知县', tags: ['知府', '知县', '道台'] },
    military_officer: { name: '提督/总兵', tags: ['提督', '总兵', '副将'] },
    palace_eunuch: { name: '太监/总管', tags: ['太监', '总管', '李莲英'] },
    scholar:      { name: '举人/进士', tags: ['举人', '进士', '科举士子'] },
    wealthy_merchant: { name: '票号掌柜/盐商', tags: ['票号', '盐商', '晋商'] },
    soldier:      { name: '八旗兵/绿营兵', tags: ['八旗', '绿营', '湘军'] },
    laborer:      { name: '苦力/挑夫', tags: ['苦力', '挑夫', '纤夫'] },
  },
  minguo: {
    emperor:      { name: '大总统/主席', tags: ['大总统', '主席', '委员长'] },
    empress:      { name: '名媛/夫人', tags: ['名媛', '夫人', '太太'] },
    top_general:  { name: '元帅/司令', tags: ['元帅', '司令', '将军'] },
    great_scholar:{ name: '大学者/大师', tags: ['大师', '教授', '学者'] },
    high_official:{ name: '部长/省长', tags: ['部长', '省长', '委员'] },
    provincial_official: { name: '县长/市长', tags: ['县长', '市长', '专员'] },
    wealthy_merchant: { name: '实业家/买办', tags: ['实业家', '买办', '资本家'] },
    military_officer: { name: '团长/旅长', tags: ['团长', '旅长', '营长'] },
    famous_artisan: { name: '名医/名匠', tags: ['名医', '工程师', '技师'] },
    palace_eunuch: { name: '管家/秘书', tags: ['管家', '秘书', '副官'] },
    scholar:      { name: '学生/知识分子', tags: ['学生', '知识分子', '留学生'] },
    soldier:      { name: '士兵/革命军', tags: ['士兵', '革命军', '国军'] },
    monk:         { name: '僧人/居士', tags: ['僧人', '居士', '方丈'] },
    entertainer:  { name: '电影明星/戏子', tags: ['明星', '戏子', '歌女'] },
    farmer:       { name: '农民/佃农', tags: ['农民', '佃农', '长工'] },
    herder:       { name: '牧民', tags: ['牧民', '牧人'] },
    servant:      { name: '佣人/老妈子', tags: ['佣人', '老妈子', '丫鬟'] },
    peddler:      { name: '小贩/摊贩', tags: ['小贩', '摊贩', '货郎'] },
    laborer:      { name: '工人/苦力', tags: ['工人', '苦力', '搬运工'] },
    fisher:       { name: '渔民/船工', tags: ['渔民', '船工', '渔民'] },
    artisan:      { name: '手艺人/工人', tags: ['手艺人', '铁匠', '木匠'] },
  },
  prc: {
    emperor:      { name: '最高领导人', tags: ['最高领导人', '总书记'] },
    empress:      { name: '第一夫人', tags: ['第一夫人'] },
    top_general:  { name: '将军/元帅', tags: ['将军', '元帅', '司令员'] },
    great_scholar:{ name: '院士/科学家', tags: ['院士', '科学家', '教授'] },
    high_official:{ name: '部长/省长', tags: ['部长', '省长', '书记'] },
    provincial_official: { name: '市长/县长', tags: ['市长', '县长', '区长'] },
    wealthy_merchant: { name: '企业家/董事长', tags: ['企业家', '董事长', 'CEO'] },
    military_officer: { name: '军官/团长', tags: ['军官', '团长', '营长'] },
    famous_artisan: { name: '大国工匠/名医', tags: ['大国工匠', '名医', '总工'] },
    palace_eunuch: { name: '秘书/办公室主任', tags: ['秘书', '主任'] },
    scholar:      { name: '大学生/研究生', tags: ['大学生', '研究生', '博士'] },
    soldier:      { name: '军人/战士', tags: ['军人', '战士', '解放军'] },
    monk:         { name: '僧人/道士', tags: ['僧人', '道士', '方丈'] },
    entertainer:  { name: '演员/网红', tags: ['演员', '网红', '主播'] },
    farmer:       { name: '农民/村民', tags: ['农民', '村民', '农民工'] },
    herder:       { name: '牧民', tags: ['牧民', '牧人'] },
    servant:      { name: '家政/服务员', tags: ['家政', '服务员', '保姆'] },
    peddler:      { name: '个体户/小老板', tags: ['个体户', '小老板', '摆摊'] },
    laborer:      { name: '工人/快递员', tags: ['工人', '快递员', '外卖员'] },
    fisher:       { name: '渔民', tags: ['渔民', '船老大'] },
    artisan:      { name: '技术工人/手艺人', tags: ['技工', '电焊工', '木匠'] },
  },
};

// 朝代特殊职业（仅特定朝代出现，作为额外头衔）
const DYNASTY_SPECIAL_OCCUPATIONS = {
  preqin: ['诸侯', '门客', '巫祝'],
  qinhan: ['屯田兵', '驿卒', '织室女'],
  weijin: ['名士', '清谈客', '部曲'],
  suitang: ['胡商', '梨园弟子', '译经僧'],
  song: ['瓦舍艺人', '理学家', '水军'],
  yuan: ['驿站兵', '色目商人', '驱口'],
  ming: ['锦衣卫', '宦官', '海商', '倭寇'],
  qing: ['八旗兵', '洋务商', '太监', '科举士子'],
  minguo: ['革命党', '军阀', '学生', '工人', '记者'],
  prc: ['工人', '知青', '个体户', '程序员', '企业家'],
};

// 性别数据
const GENDERS = [
  { id: 'male', name: '男', weight: 51 },
  { id: 'female', name: '女', weight: 49 },
];

// AI 生成 prompt 模板
const AI_PROMPT_TEMPLATE = `你是一位中国历史学家和文学大师。请根据以下信息，用第二人称"你"来叙述这个中国历史人物的一生故事。

【基本信息】
- 朝代：{dynasty}（{subPeriod}）
- 身份：{occupation}
- 性别：{gender}
- 籍贯：{region}（{modernRegion}）
- 社会阶层：{rarity}

【要求】
1. 用第二人称"你"来叙述，让读者代入感强
2. 约200-300字
3. 包含以下要素：
   - 出生时的家境和环境（2-3句）
   - 成长经历中的一个关键事件（3-4句）
   - 中年/晚年的命运走向（2-3句）
   - 结尾一句点题，道出命运无常的感慨
4. 融入当时的社会背景细节（衣食住行、风俗习惯）
5. 语言要像历史小说，有画面感和诗意，不要像百科词条
6. 不要用"首先""然后""最后"等机械连接词
7. 根据稀有度调整故事基调：传说级要波澜壮阔，普通级要质朴感人`;

// 离线故事模板（当 AI 不可用时使用）
// 所有模板均为完整文本，不包含需要替换的占位符
const OFFLINE_STORY_TEMPLATES = {
  legendary: [
    '你出生之日，据说天降异象，{region}的{season}天忽然雷声隆隆。自幼你便展露非凡之才，{dynasty}对你青眼有加。然而权力的巅峰也是悬崖的边缘，你一生波澜壮阔，终究逃不过命运的拨弄。千秋功过，留与后人评说。',
    '{dynasty}的历史上，你的名字被铭刻在石碑之上。你出生于{region}，少年时便以才华闻名。一场变故改变了你的一生，从此你走上了一条注定不凡的道路。后人翻开史书，仍能看到你留下的印记。',
    '世人皆知你的名号。你生于{region}，长于乱世，凭借过人的胆识和谋略，在{dynasty}的权力巅峰占据一席之地。然而高处不胜寒，你的每一个决定都关乎万千生灵的命运。功成名就之时，你是否还记得{region}那个懵懂少年？',
  ],
  epic: [
    '你是{region}人氏，家道殷实。{dynasty}{subPeriod}间，你凭借才干崭露头角，虽然不及王侯将相般显赫，但在当地也算得上举足轻重的人物。你的一生见证了{dynasty}的兴衰荣辱，直至暮年仍心系天下。',
    '{region}的山水养育了你。{dynasty}年间，你白手起家，几经沉浮，终于在商界打下一片天地。虽然史书上没有你的名字，但{region}的老百姓至今还传着你的故事。人生如棋，落子无悔。',
    '你生于{region}书香门第，{dynasty}{subPeriod}科举入仕，从此踏上仕途。宦海沉浮数十年，你见过朝堂上的尔虞我诈，也见过民间疾苦。退休之后，你回到{region}，种花养鸟，著书立说，倒也逍遥自在。',
  ],
  rare: [
    '你生于{region}一户寻常人家，{dynasty}{subPeriod}年间，日子虽不富裕，倒也安稳。你靠着祖传的手艺在十里八乡颇有些名气，街坊邻里有个大事小情总少不了你。一生平淡却也踏实，到老膝下儿孙满堂，也算是一桩福气。',
    '{dynasty}{subPeriod}，你出生在{region}的一个小镇上。自小跟着父亲学了一门手艺，日复一日，年复一年。虽然没什么大出息，但你手艺精湛、为人本分，在乡里颇受敬重。到头来，这一辈子也不算白活。',
    '你打小就跟着师傅学本事，{dynasty}{subPeriod}年间在{region}安家落户。凭着一技之长养活了一家老小，虽说日子紧巴巴的，可逢年过节也总能给孩子们添件新衣裳。你常想，人这一辈子，平安就是福。',
  ],
  common: [
    '你出生在{region}的一个小村庄，和大多数{dynasty}人一样，你的名字从未被任何人记录。日出而作，日落而息，春种秋收，寒来暑往，便是你一生的写照。也许在某个{season}的黄昏，你曾望着远山发过呆——那一刻，你与千载之后的读者心意相通。你活过，爱过，这就够了。',
    '{dynasty}{subPeriod}，{region}的小村庄里又多了一个婴儿的啼哭。你的一生和千万普通人一样，面朝黄土背朝天。没有惊心动魄的故事，没有可歌可泣的传说，但你实实在在地活过。就像田埂上的一株稻穗，平凡却不可或缺。',
    '你出生那天，{region}下了好大一场雨。母亲说，那是老天爷在给新生命接风洗尘。你一辈子没出过远门，最远只去过一趟县城。但你记得每一个丰收的秋天，记得妻子做的桂花糕的味道，记得孩子们在田埂上追逐的笑声。这就是你的一生，平凡而真实。',
    '如果历史是一条大河，你就是其中最不起眼的一滴水。{dynasty}年间，{region}的田间地头，你弯着腰插秧、锄草、收割。一生辛劳，养育了三儿两女。临终之际，你望着窗外的月光，心想：这辈子，值了。',
  ],
};

// 导出所有数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DYNASTIES,
    REGIONS,
    DYNASTY_REGION_WEIGHTS,
    OCCUPATIONS,
    RARITY_CONFIG,
    DYNASTY_OCCUPATION_MULTIPLIERS,
    DYNASTY_SPECIAL_OCCUPATIONS,
    GENDERS,
    AI_PROMPT_TEMPLATE,
    OFFLINE_STORY_TEMPLATES,
  };
}
