/*
 * 全能词典 - 拼音输入法引擎
 * 包含拼音-汉字映射词典、26键/9键转换、候选词生成
 */

// 拼音音节 -> 常用汉字（按使用频率排序）
// 为控制包体积，收录常用汉字约 1500+
const PINYIN_DICT = {
  a: '阿啊呵腌嗄锕',
  ai: '爱哀挨矮艾碍哎癌嗳瑷皑霭嫒',
  an: '安按岸暗案鞍氨俺谙庵桉鹌黯',
  ang: '昂盎肮',
  ao: '奥傲熬澳袄懊坳遨翱獒聱螯鏖鳌',
  ba: '把八吧爸拔罢巴芭霸疤笆粑跋靶灞',
  bai: '百白败拜摆佰柏败掰稗',
  ban: '半办班版般板搬扮伴瓣拌扳钣瘢',
  bang: '帮棒榜绑磅蚌傍梆膀谤浜',
  bao: '包保报抱宝饱暴堡薄雹曝褒褓豹鲍爆',
  bei: '北被备背悲杯贝辈倍碑卑惫焙蓓狈邶',
  ben: '本笨奔苯畚坌',
  beng: '蹦绷甭泵迸崩绷',
  bi: '比必笔避闭币毕壁臂逼彼碧蔽弊毙鄙陛匕陛弼辟痹蓖蔽',
  bian: '变边便遍编辨辩贬扁卞鞭苄砭蝙笾',
  biao: '表标彪镖膘飙彪镖',
  bie: '别憋瘪鳖蹩',
  bin: '宾滨彬斌濒殡摈膑缤槟',
  bing: '并病冰兵丙饼秉柄炳邴摒',
  bo: '不波博播伯泊薄勃搏驳卜菠玻钵帛舶渤铂箔膊踣',
  bu: '不部步布补捕哺埠簿怖钚',
  ca: '擦嚓礤',
  cai: '才采菜财材猜裁彩蔡睬踩',
  can: '参惨残餐灿蚕璨粲孱骖',
  cang: '藏仓苍舱沧伧',
  cao: '草操曹槽糙嘈艚螬',
  ce: '测侧册策厕恻',
  cen: '岑涔',
  ceng: '层蹭曾噌',
  cha: '查差插茶察叉碴岔搽诧槎檫镲衩',
  chai: '拆柴差豺侪',
  chan: '产缠掺馋蝉铲颤单 chan潺孱蟾忏',
  chang: '长常场厂唱尝偿畅倡猖娼敞怅惝徜鲳',
  chao: '超朝潮抄炒吵巢钞嘲焯剿绰',
  che: '车彻扯撤澈掣坼',
  chen: '陈沉趁衬称晨臣尘辰忱郴琛谌趁',
  cheng: '成城程称承乘诚呈惩盛撑秤逞骋埕晟',
  chi: '吃迟尺持赤池齿耻痴弛翅炽斥侈踟饬坻墀',
  chong: '冲重虫充崇宠冲舂憧铳',
  chou: '抽仇丑臭筹愁稠瞅畴踌绸惆俦雠',
  chu: '出处初除触楚础畜储厨橱锄雏杵滁橱',
  chuan: '穿传川船串喘舛椽氚',
  chuang: '创窗床闯幢疮怆',
  chui: '吹垂炊锤捶捶槌',
  chun: '春纯唇蠢醇淳鹑蝽',
  chuo: '戳辍绰踔龊',
  ci: '此次词磁瓷慈辞雌赐疵茨祠鹚糍',
  cong: '从丛聪葱囱匆淙琮璁',
  cou: '凑辏',
  cu: '促粗醋簇卒蹙蹴',
  cuan: '窜篡蹿撺爨',
  cui: '催脆崔摧翠粹瘁淬悴璀萃毳',
  cun: '村存寸忖',
  cuo: '错措挫撮搓磋磋痤蹉锉',
  da: '大答打搭达耷哒瘩鞑',
  dai: '大代带待呆戴袋逮贷怠歹傣殆岱甙绐',
  dan: '但单担胆蛋淡弹旦诞氮丹耽掸惮郸殚儋瘅箪',
  dang: '当党档挡荡铛档裆砀',
  dao: '到道刀倒导岛盗捣蹈叨滔悼焘纛',
  de: '的得德地',
  dei: '得',
  deng: '等灯登瞪凳邓噔澄磴',
  di: '的地第低底敌滴弟递笛蒂抵帝涤嫡堤嘀娣氐砥柢',
  dian: '点电店典殿颠垫滇巅淀惦奠佃癜踮玷钿',
  diao: '掉调钓吊刁雕碉貂雕鲷',
  die: '跌迭蝶叠谍喋牒碟叠耋鲽',
  ding: '定顶丁钉鼎盯叮锭仃疔町铤',
  diu: '丢铥',
  dong: '动东懂冬董冻栋洞咚鸫岽侗垌咚峒',
  dou: '都斗豆抖陡逗兜痘蚪鬥窦',
  du: '都度读独毒堵督杜渡镀妒肚睹笃嘟犊牍黩',
  duan: '段断短端锻缎椴煅',
  dui: '对队堆兑怼憝',
  dun: '顿吨蹲盾敦墩钝遁囤沌礅趸',
  duo: '多朵夺躲堕跺掇舵剁踱咄缍',
  e: '饿额恶俄鹅蛾讹鄂饿扼遏噩谔垩苊轭',
  en: '恩蒽摁',
  er: '二而儿尔耳饵迩洱珥铒',
  fa: '发罚法乏伐筏阀珐垡砝',
  fan: '反饭犯凡烦翻范番繁樊帆贩蕃藩钒燔蹯蕃',
  fang: '方放防房访芳仿纺妨坊肪舫钫鲂',
  fei: '非飞费肥废肺匪沸啡菲妃斐蜚腓翡扉绯蜚',
  fen: '分份奋粉愤坟芬纷氛焚汾酚吩酚焚',
  feng: '风封丰峰锋疯枫凤烽奉讽缝冯蜂葑沣砜',
  fo: '佛',
  fou: '否缶',
  fu: '父夫付服福富复副负府浮傅扶幅辐斧腐俯赴腹覆抚辅肤弗俘芙苻辐',
  ga: '嘎噶尬旮',
  gai: '该改盖概钙溉戤丐陔',
  gan: '干甘赶感敢肝杆赣橄擀秆柑竿酐苷绀',
  gang: '刚钢岗港杠纲冈缸罡戆',
  gao: '高搞稿告糕皋篙槔杲锆',
  ge: '个歌各哥格革隔阁鸽葛割搁骼铬疙硌蛤舸鬲',
  gei: '给',
  gen: '跟根亘艮哏',
  geng: '更耕梗庚羹埂耿赓哽鲠',
  gong: '工共公功供宫攻弓恭龚贡拱巩汞躬蚣觥',
  gou: '够构钩沟狗购苟勾垢篝笱媾缑',
  gu: '古骨故顾谷鼓姑孤估固雇沽辜菇咕箍牯蛊钴鸪鹄',
  gua: '挂刮瓜寡褂呱胍剐',
  guai: '怪拐乖',
  guan: '关观管官馆惯贯冠灌棺贯莞棺盥鹳矜',
  guang: '光广逛犷桄',
  gui: '归贵鬼规桂柜龟跪瑰诡圭轨闺癸桧皈匦刿刽',
  gun: '滚棍辊衮磙绲',
  guo: '国过果锅郭裹裹涡埚崞聒蝈馘',
  ha: '哈蛤铪',
  hai: '还海害孩嗨亥骇氦',
  han: '汉含韩寒喊汗罕撼捍憾旱酣憨翰邯菡蚶鼾',
  hang: '行航杭夯吭珩绗',
  hao: '好号浩耗豪毫壕嚎郝灏昊皓濠蒿薅蚝',
  he: '和合河何贺喝荷核赫禾鹤盒涸褐诃菏劾阖盍',
  hei: '黑嘿嗨',
  hen: '很恨狠痕',
  heng: '横恒衡哼桁蘅',
  hong: '红洪轰哄虹鸿宏弘泓蕻闳讧',
  hou: '后厚侯候吼喉猴逅堠糇鲎骺',
  hu: '户湖呼乎胡虎互护忽壶胡葫糊蝴狐弧沪唬琥扈鹄岵',
  hua: '话花画华化划哗猾骅铧桦',
  huai: '坏怀淮槐徊踝',
  huan: '还换欢环患缓焕唤幻桓浣宦涣涣焕豢郇萑',
  huang: '黄慌荒皇晃煌谎凰惶蝗磺簧惶湟遑徨篁',
  hui: '会回灰挥辉毁惠汇慧悔徽绘卉秽恢晖晦贿秽荟蕙讳诲彗恚',
  hun: '混魂浑昏婚荤珲馄阍',
  huod: '活火或货获祸伙惑霍豁藿嚯',
  ji: '几集机及级即记已技继纪极急挤给际寄既吉基激击积鸡绩缉辑脊嫉',
  jia: '家加假价架甲夹嘉佳驾贾钾嫁颊稼枷迦浃葭镓痂',
  jian: '见间建减件健简检坚尖肩艰监兼拣捡箭碱俭煎剪茧歼柬缄笺茧',
  jiang: '将江讲降姜酱疆僵浆蒋桨匠虹犟缰浆',
  jiao: '叫脚交教角较觉胶轿娇浇绞狡骄矫嚼缴焦蕉窖侥饺铰峤',
  jie: '接节解结姐介界借阶戒截洁捷竭揭皆秸杰劫睫诘颉羯',
  jin: '进近金今紧仅尽斤筋禁锦谨晋浸劲烬瑾衿堇觐馑',
  jing: '经京静精景镜敬境径睛竞净警晶荆靖痉茎惊颈鲸旌阱',
  jiong: '窘迥炅扃',
  jiu: '就久九酒旧救纠究揪舅疚究臼阄鹫鸠韭柩',
  ju: '就具局距举剧聚拘居菊巨拒锯炬驹咀疽龃莒椐榉',
  juan: '卷捐娟倦圈绢隽鹃镌涓鄄',
  jue: '觉决绝掘爵嚼厥厥獗橛蹶攫蕨谲珏',
  jun: '军均郡俊菌君骏竣钧龟峻浚隽捃',
  ka: '卡咖喀咔',
  kai: '开凯慨楷锎揩恺铠',
  kan: '看刊勘坎砍堪侃瞰龛戡',
  kang: '抗康扛炕慷糠亢伉钪',
  kao: '考靠烤拷栲犒铐',
  ke: '可课客克刻科颗壳棵渴苛柯轲磕瞌蝌髁嗑颏',
  kei: '克',
  ken: '肯啃恳垦龈',
  keng: '坑吭铿',
  kong: '空孔控恐倥崆箜',
  kou: '口扣寇抠叩芤筘',
  ku: '苦哭裤库酷枯窟骷绔酷',
  kua: '跨夸垮挎胯',
  kuai: '快块筷会蒯侩郐脍狯',
  kuan: '宽款髋',
  kuang: '况矿框狂旷筐匡眶诓哐邝圹',
  kui: '亏愧葵溃魁窥馈盔奎傀聩睽逵馗篑匮',
  kun: '困昆坤捆琨锟醌鲲髡',
  kuo: '扩阔括廓蛞',
  la: '拉啦腊辣蜡腊喇邋旯砬',
  lai: '来赖莱徕睐濑赉',
  lan: '兰蓝烂栏篮懒拦览滥澜阑懒缆榄岚婪澜',
  lang: '浪狼朗廊郎琅榔螂阆',
  lao: '老劳捞牢烙姥涝潦唠崂铑痨铹',
  le: '了乐勒肋',
  lei: '类累雷泪垒蕾磊勒擂镭诔羸嫘',
  leng: '冷愣棱楞',
  li: '里力理利立历礼李丽离例厉励黎梨隶栗漓璃漓痢蜊蠡篱黎',
  lia: '俩',
  lian: '连联脸炼练恋莲廉帘怜涟链敛琏濂镰奁',
  liang: '两亮量良凉梁粮谅辆晾粱椋踉莨',
  liao: '了料疗聊僚寥辽撩缭燎潦镣蓼獠缭',
  lie: '列烈裂猎劣冽埒捩趔',
  lin: '林临邻淋琳鳞霖凛吝磷拎麟遴啉辚',
  ling: '领零令灵龄铃岭陵凌玲伶羚聆苓泠翎囹柃棂',
  liu: '六流留刘柳溜琉硫榴镏遛馏琉鎏',
  lo: '咯',
  long: '龙拢笼聋隆弄垄笼珑胧咙窿陇癃',
  lou: '楼漏娄搂篓陋镂偻蝼蒌瘘篓',
  lu: '路录陆炉卢鲁露鹿旅律虑绿炉掳卤噜撸庐芦泸卢鸬',
  lv: '律率绿旅履滤氯吕侣铝屡缕驴闾膂褛',
  luan: '乱卵滦峦孪挛鸾銮脔',
  lun: '论轮伦沦仑抡纶囵',
  luo: '落罗洛络萝螺逻锣骡骆络萝螺',
  ma: '吗妈马麻骂嘛玛码蚂抹摩嬷',
  mai: '买卖麦迈埋脉霾荬',
  man: '满慢漫蛮瞒曼馒鳗蔓幔谩镘缦鞔',
  mang: '忙芒盲茫莽氓邙硭',
  mao: '毛冒貌猫贸矛茅茂锚卯铆耄瑁蝥蟊',
  me: '么',
  mei: '没美每妹梅媒煤枚玫眉霉昧寐魅媚莓湄楣镁糜',
  men: '们门闷焖扪',
  meng: '蒙孟猛梦盟萌懵朦猛檬锰虻蜢',
  mi: '米密迷蜜秘泌觅谜弥靡糜猕咪猕脒蘼',
  mian: '面免绵棉眠勉冕缅娩腼腼湎',
  miao: '秒苗妙庙描瞄渺缈淼藐鹋喵',
  mie: '灭蔑咩篾乜蠛',
  min: '民敏闵闽泯悯岷抿玟皿闵',
  ming: '明名命鸣铭冥暝螟',
  miu: '谬',
  mo: '没磨摸墨末默魔模膜莫漠寞陌抹谟馍瘼镆耱',
  mou: '某谋牟眸谋哞蛑',
  mu: '母木目幕牧亩慕墓穆拇暮募牟沐钼仫',
  na: '那拿哪呐钠娜纳捺衲',
  nai: '乃奶耐奈鼐艿柰',
  nan: '南男难楠喃腩赧',
  nang: '囊馕',
  nao: '脑恼闹淖挠饶垴硇铙蛲',
  ne: '呢讷',
  nei: '内馁',
  nen: '嫩',
  neng: '能',
  ni: '你泥拟逆尼呢腻匿妮霓倪溺匿旎昵铌',
  nian: '年念碾撵粘捻蔫撵辇鲶黏',
  niang: '娘酿',
  niao: '鸟尿脲袅溺',
  nie: '捏涅聂孽啮镍涅蘖嗫蹑颞',
  nin: '您',
  ning: '宁拧凝柠狞泞咛聍',
  niu: '牛扭纽钮妞忸狃',
  nong: '农浓弄脓侬哝',
  nu: '奴努怒努驽弩',
  nv: '女衄',
  nuan: '暖',
  nuo: '诺糯挪懦搦傩',
  o: '哦喔',
  ou: '欧偶呕藕鸥殴讴沤怄',
  pa: '怕爬帕扒趴啪琶葩耙',
  pai: '拍排派牌迫徘俳湃',
  pan: '盘判盼攀潘叛畔磐拚蟠泮袢',
  pang: '旁庞胖乓彷螃耪',
  pao: '跑炮泡抛袍刨疱匏狍',
  pei: '配陪培佩赔沛胚裴锫醅霈',
  pen: '盆喷湓',
  peng: '朋碰捧棚彭蓬膨鹏澎抨怦硼篷蟛',
  pi: '皮批披疲辟脾屁匹譬坯琵啤痞劈霹僻毗砒陂圮',
  pian: '片篇偏骗便翩骈蹁谝',
  piao: '票飘瓢漂嫖剽缥殍嫖',
  pie: '撇瞥',
  pin: '品拼贫频聘嫔榀',
  ping: '平评瓶凭屏苹乒坪萍娉枰鲆',
  po: '破迫坡泼婆魄泊朴叵粕鄱皤',
  pou: '剖裒',
  pu: '谱普朴仆蒲铺埔脯葡菩溥濮璞蹼',
  qi: '起其期气七齐棋骑奇企器启汽旗妻岂欺漆祈凄戚弃契祈畦骐绮骐',
  qia: '恰卡掐洽卡髂',
  qian: '前钱千签浅牵迁谦铅黔乾潜遣嵌纤欠倩堑茜仟岍扦',
  qiang: '强抢枪墙腔羌锵跄戗羟镪襁',
  qiao: '桥敲巧悄瞧翘俏窍撬跷峭鞘橇樵诮',
  qie: '切且怯窃茄惬妾锲伽挈趄',
  qin: '亲琴侵勤秦芹沁禽寝芩揿覃',
  qing: '请清情青轻倾庆晴擎顷卿氰磬罄蜻',
  qiong: '穷琼穹茕筇',
  qiu: '求球秋邱丘囚仇酋泅楸蚯俅鼽',
  qu: '去取区曲趋屈驱渠趣娶躯瞿祛蛆蛐龋衢',
  quan: '全权圈拳犬泉劝券诠荃痊颧筌',
  que: '确却缺雀阙鹊榷阙阕',
  qun: '群裙',
  ran: '然燃冉染髯蚺',
  rang: '让嚷壤攘瓤穰',
  rao: '绕饶扰娆桡',
  re: '热惹',
  ren: '人任忍认仁韧刃妊纫稔荏',
  reng: '仍扔',
  ri: '日',
  rong: '容荣融熔溶戎蓉绒冗茸榕嵘融',
  rou: '肉揉柔蹂鞣',
  ru: '如入乳儒辱汝茹濡孺蠕蓐铷',
  ruan: '软阮朊',
  rui: '瑞锐睿蕊芮蚋',
  run: '润闰',
  ruo: '若弱偌箬',
  sa: '撒洒萨仨挲',
  sai: '赛塞腮鳃噻',
  san: '三散伞叁毵糁',
  sang: '桑丧嗓搡颡磉',
  sao: '扫嫂骚瘙搔鳋',
  se: '色涩瑟塞啬穑铯',
  sen: '森',
  seng: '僧',
  sha: '杀沙纱傻啥刹砂煞杉莎霎鲨',
  shai: '晒筛酾',
  shan: '山善扇闪衫陕删擅赡膳珊姗栅汕煽掸潸姗',
  shang: '上商赏伤尚裳晌垧殇熵',
  shao: '少烧稍哨梢捎勺邵绍韶鞘芍苕蛸',
  she: '社设射蛇舌涉舍摄奢赦慑慑歙',
  shei: '谁',
  shen: '身深神甚审申伸肾慎渗婶沈参莘绅呻砷',
  sheng: '生声省胜升圣盛牲剩绳笙甥晟',
  shi: '是时十世事使市试师式石识史失始施实食示拾室释湿诗适势逝誓匙',
  shou: '手受收首售守瘦授寿兽绶狩',
  shu: '书数术树输熟属束叔舒疏署暑鼠殊淑竖蔬墅抒枢漱黍',
  shua: '刷耍唰',
  shuai: '率衰摔甩帅蟀',
  shuan: '拴栓涮',
  shuang: '双爽霜孀',
  shui: '水谁睡税',
  shun: '顺瞬舜吮',
  shuo: '说硕烁朔铄蒴搠',
  si: '四死思丝私司似寺斯撕嘶肆饲嗣厮巳泗驷',
  song: '送松宋颂诵耸嵩淞凇菘崧',
  sou: '搜艘擞叟嗖薮馊飕瞍',
  su: '素速苏俗宿诉肃塑酥溯粟稣夙嗦谡',
  suan: '算酸蒜狻',
  sui: '虽随岁碎遂髓穗隋绥燧邃祟',
  sun: '孙损笋逊榫隼荪',
  suo: '所索锁缩梭唆嗦挲娑蓑羧',
  ta: '他她它塔踏塌拓沓獭挞闼遢',
  tai: '太台泰态抬胎肽钛苔胎',
  tan: '谈弹贪探摊碳叹滩坛潭谭坦毯炭昙檀覃痰',
  tang: '唐堂汤糖躺烫趟塘塘膛搪棠樘螳',
  tao: '套逃讨桃淘陶涛掏萄绦韬饕叨洮',
  te: '特忒慝',
  teng: '疼腾藤滕誊',
  ti: '提体题替梯踢剔蹄啼屉锑惕倜涕悌鹈',
  tian: '天田填甜舔添腆殄忝阗',
  tiao: '条调跳挑眺迢窕苕龆',
  tie: '贴铁帖餮',
  ting: '听停厅挺艇庭亭廷汀烃铤莛婷',
  tong: '同通统痛铜桶童彤筒桐酮瞳潼仝',
  tou: '头透偷投骰',
  tu: '土图途涂吐突秃徒兔屠涂菟',
  tuan: '团湍抟',
  tui: '推退腿颓蜕忒',
  tun: '吞屯豚囤臀饨褪',
  tuo: '拖脱托妥拓驼鸵椭陀坨沱跎鸵',
  wa: '挖娃瓦袜蛙洼娲佤',
  wai: '外歪崴',
  wan: '完万晚玩弯碗挽湾丸腕婉宛豌惋挽皖琬',
  wang: '王往网望忘旺亡汪妄惘枉魍',
  wei: '为位未尾围卫微味维违威危委魏伟喂胃唯唯韦苇纬蔚蔚巍',
  wen: '问文温稳闻吻纹瘟刎紊璺蚊汶',
  weng: '翁嗡瓮蓊',
  wo: '我握卧窝沃斡倭龌涡蜗斡',
  wu: '无五物乌武舞吴误午雾屋悟伍务污巫呜芜梧钨侮鹉',
  xi: '西系息希习吸细喜戏洗席稀锡溪惜析夕悉膝媳熙曦铣烯蹊蜥蜥汐',
  xia: '下夏吓虾瞎峡霞狭侠暇遐匣瑕辖狎柙瞎',
  xian: '现先县线显限险鲜纤仙陷贤闲嫌衔咸献宪腺酰锨籼跹',
  xiang: '想向项象相乡香响享祥详翔巷橡湘襄镶骧飨',
  xiao: '小笑消校销效晓萧肖孝硝啸逍枭潇霄宵箫嚣骁',
  xie: '些写谢鞋血协斜歇屑邪携胁械楔蝎泻懈邂楔撷亵',
  xin: '新心信欣辛馨薪鑫芯锌忻昕歆',
  xing: '行形性兴型姓星醒幸邢杏猩腥惺荇陉擤',
  xiong: '熊雄兄凶胸汹汹芎',
  xiu: '修休秀绣袖锈嗅羞宿朽貅馐髹',
  xu: '需许续虚须叙畜旭恤蓄絮序戌墟嘘嘘婿栩顼煦',
  xuan: '选宣悬玄旋喧轩癣绚轩煊炫眩璇楦渲',
  xue: '学雪血穴靴薛谑踅鳕',
  xun: '寻训讯迅巡询循勋熏逊殉汛驯巽醺埙鲟',
  ya: '压呀牙雅亚鸭哑讶芽蚜崖涯衙押娅娅垭桠',
  yan: '眼言严研烟演燕沿验颜艳岩延炎宴掩厌淹盐衍雁奄咽堰晏焰彦',
  yang: '阳样养羊洋扬氧仰痒杨漾殃秧鸯佯疡徉怏',
  yao: '要摇药遥咬腰窑邀妖姚瑶尧耀舀谣肴钥杳窈幺',
  ye: '也夜业叶野爷页液冶耶咽曳椰噎烨腋谒揶',
  yi: '一以已意义艺益易医衣忆遗亿议依异宜仪亦译翼毅壹溢逸疑彝役',
  yin: '因引音印阴隐银饮吟尹荫茵姻殷淫寅瘾堙胤鄞',
  ying: '应英影营迎映赢硬盈颖樱婴莹荧蝇嘤瑛瀛璎膺萤',
  yo: '哟',
  yong: '用永拥勇涌泳雍庸佣蛹踊雍墉慵鳙鳙镛',
  you: '有又由右游油优尤悠幽幼忧酉犹悠诱釉莠疣蚰',
  yu: '于与雨语鱼玉育余遇预域愈誉浴寓欲宇郁愚屿御愉娱誉逾隅禹渝逾',
  yuan: '元原远圆院源缘园援愿冤渊袁怨苑垣鸳冤辕媛沅垣爰媛瑗',
  yue: '月约越乐跃悦阅岳曰粤钥龠',
  yun: '云运允孕韵晕匀陨蕴耘芸恽酝郧筠纭殒',
  za: '杂咋砸匝拶咂',
  zai: '在再载灾栽宰哉崽甾',
  zan: '咱暂赞攒簪昝瓒',
  zang: '脏葬臧赃奘',
  zao: '早造遭枣糟灶凿藻噪躁澡蚤皂燥',
  ze: '则责择泽啧仄昃笮',
  zei: '贼',
  zen: '怎谮',
  zeng: '增曾赠憎锃甑罾',
  zha: '扎炸查渣闸眨榨乍栅喳楂札轧咤',
  zhai: '摘宅窄债斋寨翟',
  zhan: '站战占展沾粘斩盏栈崭颤蘸湛辗搌',
  zhang: '张长丈掌仗帐章胀障账杖璋嶂蟑漳',
  zhao: '照找招赵罩朝召兆肇昭钊沼诏棹',
  zhe: '这着者折哲蔗遮彻谪浙辙锗褶蜇',
  zhei: '这',
  zhen: '真阵振针震镇珍枕诊甄帧斟箴臻砧轸缜',
  zheng: '正政整争证征蒸挣睁峥铮筝拯诤怔',
  zhi: '只知之制至治直植致志值支纸质职智指止址旨挚掷帜帜滞秩峙',
  zhong: '中重种众钟终忠肿仲盅衷冢踵',
  zhou: '周州洲舟粥轴皱咒昼宙骤肘帚咒纣胄荮',
  zhu: '主住注朱猪助竹柱珠筑驻逐株祝著铸瞩嘱蛛贮拄伫竺炷箸',
  zhua: '抓爪',
  zhuai: '拽',
  zhuan: '转专赚砖撰篆馔啭',
  zhuang: '装撞壮状庄桩妆幢奘',
  zhui: '追坠缀赘惴椎骓缒',
  zhun: '准谆肫窀',
  zhuo: '着桌捉拙卓啄浊琢灼镯茁擢涿倬',
  zi: '子自字紫资籽姿滋淄兹孜滓梓咨孜辎孳',
  zong: '总宗纵综踪棕鬃粽枞',
  zou: '走奏邹揍驺陬',
  zu: '足组阻族租祖卒诅俎',
  zuan: '钻纂攥缵',
  zui: '最嘴醉罪咀',
  zun: '尊遵樽鳟撙',
  zuo: '作做左坐昨佐琢座做作祚胙阼'
}

// 常用双字词组：拼音 -> 词组
const WORD_DICT = {
  nihao: '你好',
  xiexie: '谢谢',
  zaijian: '再见',
  duibuqi: '对不起',
  meiguanshi: '没关系',
  hao: '好',
  keyi: '可以',
  bukeyi: '不可以',
  weishenme: '为什么',
  shenme: '什么',
  zenme: '怎么',
  nali: '哪里',
  duoshao: '多少',
  jitian: '几天',
  jinnian: '今年',
  mingtian: '明天',
  zuotian: '昨天',
  jintian: '今天',
  xiawu: '下午',
  zaoshang: '早上',
  wanshang: '晚上',
  zhongguo: '中国',
  beijing: '北京',
  shanghai: '上海',
  yingwen: '英文',
  zhongwen: '中文',
  pinyin: '拼音',
  shurufa: '输入法',
  cidian: '词典',
  fanyi: '翻译',
  yingyu: '英语',
  hanyu: '汉语',
  aiqing: '爱情',
  youqing: '友情',
  qinqing: '亲情',
  shijian: '时间',
  jinnian: '今年',
  gongzuo: '工作',
  xuexi: '学习',
  shenghuo: '生活',
  yule: '娱乐',
  yundong: '运动',
  yinyue: '音乐',
  dianying: '电影',
  dianshi: '电视',
  shouji: '手机',
  diannao: '电脑',
  yidong: '移动',
  hudong: '互动',
  youxi: '游戏',
  wenzhang: '文章',
  xinwen: '新闻',
  tianqi: '天气',
  luyin: '录音',
  zhaopian: '照片',
  shipin: '视频',
  tuwen: '图文',
  anquan: '安全',
  baomi: '保密',
  kaiqi: '开启',
  guanbi: '关闭',
  shezhi: '设置',
  bangzhu: '帮助',
  guanyu: '关于',
  tuichu: '退出',
  yincang: '隐藏',
  xianshi: '显示',
  qingchu: '清楚',
  baocun: '保存',
  quxiao: '取消',
  queding: '确定',
  shanchu: '删除',
  xiufu: '修复',
  gengxin: '更新',
  shengji: '升级',
  xiazai: '下载',
  chuan: '上传',
  wangluo: '网络',
  lianjie: '连接',
  duanlie: '断裂',
  chongshi: '重试',
  jiazai: '加载',
  jieshou: '接收',
  fasong: '发送',
  xiaoxi: '消息',
  tongzhi: '通知',
  yuedu: '阅读',
  shibie: '识别',
  zhuanhuan: '转换',
  chaxun: '查询',
  jielun: '结论',
  jieguo: '结果',
  shujuku: '数据库',
  mima: '密码',
  yonghu: '用户',
  guanli: '管理',
  xitong: '系统',
  qidong: '启动',
  tingzhi: '停止',
  zanting: '暂停',
  jixu: '继续',
  wancheng: '完成',
  kaishi: '开始',
  jieshu: '结束',
  chengxu: '程序',
  ruanjian: '软件',
  yingjian: '硬件',
  shebei: '设备',
  zhiling: '指令',
  caozuo: '操作',
  jiemian: '界面',
  anniu: '按钮',
  shubiao: '鼠标',
  jianpan: '键盘',
  chuanshu: '传输',
  jiema: '解码',
  bianma: '编码',
  yasuo: '压缩',
  jieya: '解压',
  beifen: '备份',
  huanyuan: '还原',
  chuli: '处理',
  fenxi: '分析',
  jieshi: '解释',
  shuoming: '说明',
  biaozhun: '标准',
  guize: '规则',
  moshi: '模式',
  leixing: '类型',
  daohang: '导航',
  sousuo: '搜索',
  lianxi: '联系',
  dizhi: '地址',
  dianhua: '电话',
  youjian: '邮件',
  wangzhi: '网址',
  mingzi: '名字',
  xingbie: '性别',
  nianling: '年龄',
  shenfen: '身份',
  quanxian: '权限',
  juese: '角色',
  dengji: '等级',
  fenlei: '分类',
  paixu: '排序',
  guolv: '过滤',
  tongji: '统计',
  baobiao: '报表',
  tupian: '图片',
  wenjian: '文件',
  wenjianjia: '文件夹',
  mulu: '目录',
  cunfang: '存放',
  qudong: '驱动',
  xianshiqi: '显示器',
  neicun: '内存',
  yingpan: '硬盘',
  guangpan: '光盘',
  sanqi: '三七'
}

// 9键数字到字母的映射
const T9_MAP = {
  '2': 'abc',
  '3': 'def',
  '4': 'ghi',
  '5': 'jkl',
  '6': 'mno',
  '7': 'pqrs',
  '8': 'tuv',
  '9': 'wxyz'
}

/**
 * 将拼音音节转为9键数字串
 */
function pinyinToT9(pinyin) {
  let result = ''
  for (let i = 0; i < pinyin.length; i++) {
    const ch = pinyin[i]
    for (const digit in T9_MAP) {
      if (T9_MAP[digit].indexOf(ch) >= 0) {
        result += digit
        break
      }
    }
  }
  return result
}

// 预计算：9键数字串 -> 拼音音节列表
const T9_TO_PINYIN = {}
for (const py in PINYIN_DICT) {
  const t9 = pinyinToT9(py)
  if (!T9_TO_PINYIN[t9]) {
    T9_TO_PINYIN[t9] = []
  }
  T9_TO_PINYIN[t9].push(py)
}

/**
 * 26键输入：根据拼音字符串获取候选汉字
 * @param {string} pinyinStr 拼音字符串，如 "ni" 或 "nihao"
 * @returns {Array} 候选词列表
 */
function getCandidates26(pinyinStr) {
  if (!pinyinStr) return []
  const py = pinyinStr.toLowerCase()

  // 先查常用词组
  const word = WORD_DICT[py]
  const candidates = []
  if (word) {
    candidates.push(word)
  }

  // 尝试按音节拆分（支持多音节）
  const syllables = splitSyllables(py)
  if (syllables && syllables.length > 0) {
    // 多音节：取每个音节第一个字组合
    if (syllables.length > 1) {
      let combined = ''
      let valid = true
      for (let i = 0; i < syllables.length; i++) {
        const chars = PINYIN_DICT[syllables[i]]
        if (chars && chars.length > 0) {
          combined += chars[0]
        } else {
          valid = false
          break
        }
      }
      if (valid && combined && candidates.indexOf(combined) < 0) {
        candidates.push(combined)
      }
    }

    // 单音节：列出所有候选汉字
    if (syllables.length === 1) {
      const chars = PINYIN_DICT[syllables[0]]
      if (chars) {
        for (let i = 0; i < Math.min(chars.length, 20); i++) {
          if (candidates.indexOf(chars[i]) < 0) {
            candidates.push(chars[i])
          }
        }
      }
    }
  }

  // 如果没匹配到，直接查整个字符串作为音节
  if (candidates.length === 0 && PINYIN_DICT[py]) {
    const chars = PINYIN_DICT[py]
    for (let i = 0; i < Math.min(chars.length, 20); i++) {
      candidates.push(chars[i])
    }
  }

  return candidates.slice(0, 20)
}

/**
 * 将拼音字符串拆分为音节
 * 简单的正向最大匹配
 */
function splitSyllables(py) {
  const syllables = []
  let i = 0
  while (i < py.length) {
    let matched = false
    // 从长到短尝试匹配
    for (let len = Math.min(6, py.length - i); len >= 1; len--) {
      const sub = py.substr(i, len)
      if (PINYIN_DICT[sub]) {
        syllables.push(sub)
        i += len
        matched = true
        break
      }
    }
    if (!matched) {
      // 无法匹配，跳过一个字符
      i++
    }
  }
  return syllables
}

/**
 * 9键输入：根据数字串获取候选
 * @param {string} digits 数字串，如 "64"
 * @returns {Object} { pinyin: 可能的拼音, candidates: 候选词列表 }
 */
function getCandidatesT9(digits) {
  if (!digits) return { pinyin: [], candidates: [] }

  // 先查词组
  const candidates = []
  for (const wordPy in WORD_DICT) {
    if (pinyinToT9(wordPy) === digits) {
      candidates.push(WORD_DICT[wordPy])
    }
  }

  // 查单字
  const possiblePinyin = T9_TO_PINYIN[digits] || []
  const allCandidates = []
  possiblePinyin.forEach((py) => {
    const chars = PINYIN_DICT[py]
    if (chars) {
      for (let i = 0; i < Math.min(chars.length, 5); i++) {
        if (allCandidates.indexOf(chars[i]) < 0) {
          allCandidates.push(chars[i])
        }
      }
    }
  })

  return {
    pinyin: possiblePinyin,
    candidates: candidates.concat(allCandidates).slice(0, 20)
  }
}

export default {
  getCandidates26,
  getCandidatesT9,
  splitSyllables,
  pinyinToT9,
  WORD_DICT,
  PINYIN_DICT
}
