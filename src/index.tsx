import { Detail } from "@raycast/api";

const SYMBOLS = [ '🌒', '🌔' ];

const ID_MAP = {
  '000': [ '六合自然和，求财喜庆多，顺风并顺水，前进莫蹉跎。六合卦也。' ],
  '001': [ '草木枯还发，全凭造化功，莫将求去晚，须借一帆风。向前可为。' ],
  '002': [],
  '010': [],
  '011': [ '风起三层浪，云生万里阴，交情分彼此，顷刻见灾迍。枉老心力。' ],
  '012': [ '东风先解冻，花占洛阳春，玉骨冰肌润，青香隔笼间。先难后易。', '飓风未成急，惊危在眼前，忧心非安妥，始终不安然。大而不利。' ],
  '020': [ '阴阳多反复，做事恐难成，若强求为者，须防来始终。不宜用事。' ],
  '021': [ '青云应有路，丹凤羽毛轻，千里人钦仰，提携百事成。亦可用事。' ],
  '022': [ '欲进不能言，进退俱难久，待价与待时，安心俱分守。做事进退。' ],
  '100': [ '良骥用把车，轮车力不加，世间无百乐，终老在农家。先凶后吉。' ],
  '101': [ '行船莫恨迟，风急又吹回，举棹应难得，扬帆烟雾中。不利于事。' ],
  '102': [],
  '110': [ '光辉一处风，恩爱反成仇，闭门且缩头，莫管闲事非。虽吉只迟。' ],
  '111': [ '晚来风飙急，好事在庐江，阻隔成难事，惺惺且暂停。做事平平。' ],
  '112': [ '玉雀出樊笼，翻翻上碧空，何忧眼前事，财宝自然通。大吉之卦。' ],
  '120': [ '阳德方亨日，群阴以待时，小心皆险迹，君子际昌期。君子终吉。' ],
  '121': [ '淑女配君子，贤臣遇好君，家和万事顺，国泰万民安。美玉无暇。' ],
  '122': [ '东君得好意，枯木发新枝，富贵从人愿，麻衣换绿衣。本原大吉。' ],
  '200': [ '浮云吹散尽，明月正当中，万里一天碧，东西雨便风。求谋如意。' ],
  '201': [ '潮生自有时，帆去如得飞，风与周郎便，无云月正辉。三奇吉卦。' ],
  '202': [],
  '210': [ '映日隔蛟龙，黑白未分明，什语休凭信，行人正断魂。谋望待时。' ],
  '211': [ '皎皎一轮月，清光四海分，将军巡海岱，群贼望风波。从正则吉。' ],
  '212': [ '浩浩长江水，舟帆任往还，问君能遂意，求利有何难。上上大吉。' ],
  '220': [ '明珠失土中，相混土相同，求财应难得，行人信不通。有头无尾。' ],
  '221': [ '千里遇知音，求财自称心，占龙得甘雨，失物眼前寻。上上大吉。' ],
  '222': [],
};

function throwOne() {
  return Math.floor(Math.random() * 2);
}

function throwTwo() {
  const results = [ throwOne(), throwOne() ];
  const symbols = [ SYMBOLS[results[0]], SYMBOLS[results[1]] ];
  return (results[0] !== results[1]) ?
    {
      id: '2',
      title: '聖',
      symbols,
    } :
    results[0] ?
    {
      id: '1',
      title: '笑',
      symbols,
    } :
    {
      id: '0',
      title: '怒',
      symbols,
    };
}

function throwThrice() {
  const results = [ throwTwo(), throwTwo(), throwTwo() ];
  const id = results.map(_ => _.id).join('');
  const title = results.map(_ => _.title).join('');
  const descParts = [
    results
      .map(({ title, symbols }, i) => {
        const iStr = [ '一', '二', '三' ][i];
        const suffix = i == 2 ? '。' : '；';
        return `- 第${iStr}次：${title} ${symbols.join('')}${suffix}`;
      })
      .join('\n'),
  ];
  const idValues = ID_MAP[id];
  if (idValues.length === 1) {
    descParts.push(`卦辞：${idValues[0]}`);
  } else if (idValues.length > 1) {
    descParts.push(`卦辞：\n- ${idValues.join('\n- ')}`);
  }
  return {
    id,
    title,
    results,
    desc: descParts.join('\n\n'),
  };
}

export default function Command() {
  const result = throwThrice();
  const markdown = `# ${result.title}\n\n${result.desc}`;
  return <Detail markdown={markdown} />;
}
