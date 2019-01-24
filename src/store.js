
import { Store } from 'svelte/store.js';

const clearParams = {cp: null, tn: null, it: null, sex: null, mad: null};

var store = new Store(clearParams)

// const pageEnum = [ 'tn', 'cp', 'it', 'ma' ]
// let pageDef = {}
// pageEnum.forEach((page, idx) => {
//   pageDef[page] = { idx }
// })

// const madEnum = [ 'tn', 'cp', 'it' ]
// let madDef = {}
// madEnum.forEach((mad, idx) => {
//   madDef[mad] = { idx }
// })

// function toBinaryString(idx, sup) { // https://stackoverflow.com/a/5366862
//   let str = idx.toString(2)
//   let padLen = Math.ceil(Math.log2(sup))
//   let pad = ""; for (let i = 0; i < padLen; i++) { pad += '0'}
//   return pad.substring(0, pad.length - str.length) + str;
// }

// // const encoding = "_0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-"
// const flagsLength = 5;
// function binaryStringLen() {
//   return 0 +
//     Math.ceil(Math.log2(pageEnum.length)) +
//     flagsLength +
//     Math.ceil(Math.log2(tnEnum.length)) +
//     Math.ceil(Math.log2(cpEnum.length)) +
//     Math.ceil(Math.log2(itEnum.length)) +
//     Math.ceil(Math.log2(madEnum.length)) +
//   0;
// }

// function encodeParams({ _page, _tn, _cp, _it, _sex, _mad }) {
//   let t0 = global.performance ? performance.now() : null;
//   let binaryString = ""
//   binaryString += toBinaryString(pageDef[_page].idx, pageEnum.length)

//   binaryString += toBinaryString((_tn ? 1 : 0), 2)
//   binaryString += toBinaryString((_cp ? 1 : 0), 2)
//   binaryString += toBinaryString((_it ? 1 : 0), 2)
//   binaryString += toBinaryString((_sex === "female" ? 1 : 0), 2)
//   binaryString += toBinaryString((_mad ? 1 : 0), 2)

//   if (_tn) {
//     binaryString += toBinaryString(tnDef[_tn].idx, tnEnum.length)
//   }
//   if (_cp) {
//     binaryString += toBinaryString(cpDef[_cp].idx, cpEnum.length)
//   }
//   if (_it) {
//     binaryString += toBinaryString(itDef[_it].idx, itEnum.length)
//   }
//   if (_mad) {
//     binaryString += toBinaryString(madDef[_mad].idx, madEnum.length)
//   }

//   let t1 = global.performance ? performance.now() : null
//   if (global.performance && t1 - t0 > 0) {
//     // console.log("Call to encodeParams took " + (t1 - t0) + " milliseconds.")
//   }
//   return binaryString.replace(/^(.+?)(0+)$/, '$1');
// }

// function flagFromBinaryString(binaryString, ofs) {
//   let flag = binaryString.substr(ofs, 1) == '1'
//   return {ofs: ofs + 1, flag}
// }

// function enumFromBinaryString(binaryString, ofs, enumArr) {
//   let valLen = Math.ceil(Math.log2(enumArr.length))
//   let val = binaryString.substr(ofs, valLen)
//   let idx = parseInt(val, 2)
//   return {ofs: ofs + valLen, val: enumArr[idx]}
// }

// function decodeParams(from) {
//   let t0 = global.performance ? performance.now() : null;
//   let binaryString = from;
//   let len = binaryStringLen()
//   while (binaryString.length < len) { binaryString += '0'}
//   let ofs = 0, flag, valOfs = 0, ret
//   let page, tn, cp, it, sex, mad;
//   ret = enumFromBinaryString(binaryString, ofs, pageEnum)
//   ofs = ret.ofs
//   page = ret.val
//   let valBinaryString = binaryString.substr(ofs + flagsLength);

//   ret = flagFromBinaryString(binaryString, ofs)
//   ofs = ret.ofs
//   if (ret.flag) {
//     ret = enumFromBinaryString(valBinaryString, valOfs, tnEnum)
//     valOfs = ret.ofs
//     tn = ret.val
//   }

//   ret = flagFromBinaryString(binaryString, ofs)
//   ofs = ret.ofs
//   if (ret.flag) {
//     ret = enumFromBinaryString(valBinaryString, valOfs, cpEnum)
//     valOfs = ret.ofs
//     cp = ret.val
//   }

//   ret = flagFromBinaryString(binaryString, ofs)
//   ofs = ret.ofs
//   if (ret.flag) {
//     ret = enumFromBinaryString(valBinaryString, valOfs, itEnum)
//     valOfs = ret.ofs
//     it = ret.val
//   }

//   ret = flagFromBinaryString(binaryString, ofs)
//   ofs = ret.ofs
//   sex = ret.flag ? 'female' : 'male'

//   ret = flagFromBinaryString(binaryString, ofs)
//   ofs = ret.ofs
//   if (ret.flag) {
//     ret = enumFromBinaryString(valBinaryString, valOfs, madEnum)
//     valOfs = ret.ofs
//     mad = ret.val
//   }
//   let t1 = global.performance ? performance.now() : null
//   if (global.performance && t1 - t0 > 0) {
//   //   console.log("Call to decodeParams took " + (t1 - t0) + " milliseconds.")
//   }
//   return {page, tn, cp, it, sex, mad}
// }

function itId(it) {
  return itDef[it].idx
}

function itFromId(id) {
  return itEnum[id]
}

function url({
  $page, $tn, $cp, $it, $mad,
  page, tn, cp, it, sex, mad,
}) {
  let _page = page === null ? null : (page ? page : store._state.page)
  let _tn = tn === null ? null : (tn ? tn : store._state.tn);
  let _cp = cp === null ? null : (cp ? cp : store._state.cp);
  let _it = it === null ? null : (it ? it : store._state.it);
  let _sex = sex === null ? null : (sex ? sex : store._state.sex);
  let _mad = mad === null ? null : (mad ? mad : store._state.mad);
  if (!_page) { _page = 'tn' }
  if (_sex !== 'female') { _sex = 'male' }
  // let result = encodeParams({_page, _tn, _cp, _it, _sex, _mad })
  let result = !_page ? 'tn' : _page + (
    !_tn && !_cp && _sex == 'male' && !_mad ? "" :
      "?" + [
        (!_tn ? "" : "tn=" + _tn),
        (!_cp ? "" : "cp=" + _cp),
        (!_it ? "" : "it=" + itId(_it)),
        (_sex == 'male' ? "" : "sex=" + _sex),
        (!_mad ? "" : "mad=" + _mad),
      ].filter( _ => _ ).join("&")
  );
  // console.log({result})
  return result;
}

async function initStore({ params, query }, thisFetch) {
  // let from
  // { let { page } = params; from = page }
  // let {page, tn, cp, it, sex, mad} = decodeParams(from)
  let {page} = params;
  let {tn, cp, id, sex, mad} = query;
  let it = itFromId(id)

  if (!sex) { sex = 'male' }
  store.set({ page, tn, cp, it, sex, mad })
  let slugs = []
  if (tn) {
    slugs.push(tn + '-' + sex);
  }
  if (cp) {
    slugs.push(cp)
  }
  if (it) {
    slugs.push(it)
  }
  if (slugs.length) {
    // let cache = new Map();
    let cache = {}
    for (let i = 0; i < slugs.length; i++) {
      let slug = slugs[i]
      const res = await thisFetch(slug + '.json');
      const data = await res.json()
      if (res.status === 200) {
        cache[slug] = {status: res.status, html: data}
        // cache.set(slug, {status: res.status, html: data})
      } else {
        cache[slug] = {status: res.status, html: '<span class="error">' + data.message + '</span>'};
        // cache.set(slug, {status: res.status, html: '<span class="error">' + data.message + '</span>'})
      }
      store.set({cache})
    }
  }
}

function onStoreChange(arg) {
  if (!arg) return;
  let slugs = []
  if ((arg.changed.tn || arg.changed.sex) && arg.current.tn && arg.current.sex) {
    slugs.push(arg.current.tn + '-' + arg.current.sex);
  }
  if (arg.changed.cp && arg.current.cp) {
    slugs.push(arg.current.cp)
  }
  if (arg.changed.it && arg.current.it) {
    slugs.push(arg.current.it)
  }
  let cache = store.get().cache || {};
  // if (global.fetch === undefined) {
  //   const lookup = new Map();
  //   descs.forEach(desc => {
  //     lookup.set(desc.slug, { status: 200, html: desc.html });
  //   });
  //   slugs.forEach(slug => {
  //     if (lookup.get(slug)) { cache.set(slug, lookup.get(slug)) }
  //   });
  //   store.set({cache})
  // } else {
    slugs.forEach(slug => {
      if (!(cache[slug] && cache[slug].status == 200)) {
        console.log({slug})
        if (cache[slug]) console.log({status: cache[slug].status})
        let f = async function() {
          try {
            // console.log(global.fetch)
            const res = await fetch(slug + '.json');
            const data = await res.json();
            if (res.status === 200) {
              cache[slug] = {status: res.status, html: data}
              // cache.set(slug, {status: res.status, html: data})
            } else {
              // cache.set(slug, {status: res.status, html: '<span class="error">' + data.message + '</span>'})
              cache[slug] = {status: res.status, html: '<span class="error">' + data.message + '</span>'}
            }
          } catch(error) {
            cache[slug] = {status: 0, html: error.message}
            // cache.set(slug, {status: 0, html: error.message})
          }
          store.set({cache})
        };
        f();
      }
    });
  // }
}

const htmlLoading = '<span>Loading . . .</span>';

store.compute(
  'tnDesc',
  ['tn', 'sex', 'cache'],
  (tn, sex, cache) => {
    const slug = tn + '-' + sex;
    const result = tn && sex && cache &&
    // cache.has(slug) ? cache.get(slug).html :
      cache[slug] ? cache[slug].html :
      htmlLoading
    ;
    return result
  }
);

store.compute(
  'cpDesc',
  ['cp', 'cache'],
  (cp, cache) => {
    const slug = cp;
    const result = cp && cache &&
      // cache.has(slug) ? cache.get(slug).html :
      cache[slug] ? cache[slug].html :
      htmlLoading
    ;
    return result
  }
);

store.compute(
  'itDesc',
  ['it', 'cache'],
  (it, cache) => {
    const slug = it;
    const result = it && cache &&
      // cache.has(slug) ? cache.get(slug).html :
      cache[slug] ? cache[slug].html :
      htmlLoading
    ;
    return result
  }
);

// ============================================================================

const eiDef = {
  'E': { title: 'экстраверты' },
  'I': { title: 'интраверты' },
};
const eiEnum = Object.keys(eiDef);

function eiTitle(ei) {
  return eiDef[ei].title;
}

// ============================================================================

const pjDef = {
  'P': { title: 'иррационалы'},
  'J': { title: 'рационалы' },
};
const pjEnum = Object.keys(pjDef);

function pjTitle(pj) {
  return pjDef[pj].title;
}

// ============================================================================

const quadraDef = {
  'I': {
    'P': {
      'E': { code: 'ENTP', title: "Дон Кихот", idx: 0 },
      'I': { code: 'ISFP', title: "Дюма", idx: 1 },
    },
    'J': {
      'E': { code: 'ESFJ', title: 'Гюго', idx: 2 },
      'I': { code: 'INTJ', title: 'Робеспьер', idx: 3 },
    },
  },
  'II': {
    'P': {
      'E': { code: 'ESTP', title: "Жуков", idx: 4 },
      'I': { code: 'INFP', title: "Есенин", idx: 5 },
    },
    'J': {
      'E': { code: 'ENFJ', title: 'Гамлет', idx: 6 },
      'I': { code: 'ISTJ', title: 'Максим', idx: 7 },
    },
  },
  'III': {
    'P': {
      'E': { code: 'ESFP', title: "Наполеон", idx: 8 },
      'I': { code: 'INTP', title: "Бальзак", idx: 9 },
    },
    'J': {
      'E': { code: 'ENTJ', title: 'Джек', idx: 10 },
      'I': { code: 'ISFJ', title: 'Драйзер', idx: 11 },
    },
  },
  'IV': {
    'P': {
      'E': { code: 'ENFP', title: "Гексли", idx: 12 },
      'I': { code: 'ISTP', title: "Габен", idx: 13 },
    },
    'J': {
      'E': { code: 'ESTJ', title: 'Штирлиц', idx: 14 },
      'I': { code: 'INFJ', title: 'Достоевский', idx: 15 },
    },
  },
};

const quadraEnum = Object.keys(quadraDef);

function quadraField(quadra, pj, ei, field) {
  return quadraDef[quadra][pj][ei][field];
}

// ============================================================================

var tnDef = {};
{
  Object.values(quadraDef).forEach(quadraDef => {
    Object.values(quadraDef).forEach(pjDef => {
      Object.values(pjDef).forEach(eiDef => {
        tnDef[eiDef.code] = { title: eiDef.title, idx: eiDef.idx }
      })
    })
  })
}
const tnEnum = Object.keys(tnDef);

function tnTitle(tn) {
  return tnDef[tn].title;
}

// ============================================================================

const cpGroupDef = {
  'N': {
    'title': 'интуиция',
    'E': { code: 'Ne', title: 'интуиция возможностей', idx: 0 },
    'I': { code: 'Ni', title: 'интуиция времени', idx: 1 },
  },
  'F': {
    'title': 'этика',
    'E': {code: 'Fe', title: 'этика эмоций', idx: 2},
    'I': {code: 'Fi', title: 'этика отношений', idx: 3},
  },
  'T': {
    'title': 'логика',
    'E': {code: 'Te', title: 'деловая логика', idx: 4},
    'I': {code: 'Ti', title: 'структурная логика', idx: 5},
  },
  'S': {
    'title': 'сенсорика',
    'E': {code: 'Se', title: 'волевая сенсорика', idx: 6},
    'I': {code: 'Si', title: 'сенсорика ощущений', idx: 7},
  },
};

const cpGroups = Object.keys(cpGroupDef);

function cpGroupTitle(cpGroup) {
  return cpGroupDef[cpGroup].title;
}

function cpGroupField(cpGroup, ei, field) {
  return cpGroupDef[cpGroup][ei][field];
}

// ============================================================================

var cpDef = {}
{
  Object.values(cpGroupDef).forEach(cpGroupDef => {
      Object.values(cpGroupDef).forEach(eiDef => {
        if (typeof eiDef == "object") {
          cpDef[eiDef.code] = { title: eiDef.title, idx: eiDef.idx }
        }
      })
  })
}
const cpEnum = Object.keys(cpDef);

function cpTitle(cp) {
  return cpDef[cp].title;
}

// ============================================================================

const itDef = {
  'То': {
    title: 'Тождественные отношения',
    transform: [0, 0, 0, 0], // 0
  },
  'Ду': {
    title: 'Дуальные отношения',
    transform: [1, 1, 1, 0], // 14, E
  },
  'Ак': {
    title: 'Отношения активации',
    transform: [0, 1, 1, 1], // 7
  },
  'Зе': {
    title: 'Зеркальные отношения',
    transform: [1, 0, 0, 1], // 9
  },
  'Ро': {
    title: 'Родственные отношения',
    transform: [0, 0, 1, 0], // 2
  },
  'Пд': {
    title: 'Полудуальные отношения',
    transform: [1, 1, 0, 0], // 12, C
  },
  'Де': {
    title: 'Деловые отношения',
    transform: [0, 1, 0, 0], // 4
  },
  'Ми': {
    title: 'Миражные отношения',
    transform: [1, 0, 1, 0], // 10, A
  },
  'Сэ': {
    title: 'Отношения суперэго',
    transform: [0, 1, 1, 0], // 6
  },
  'Пп': {
    title: 'Отношения противоположности',
    transform: [1, 0, 0, 0], // 8
  },
  'Кт': {
    title: 'Квазитождественные отношения',
    transform: [0, 0, 0, 1], // 1
  },
  'Кф': {
    title: 'Конфликтные отношения',
    transform: [1, 1, 1, 1], // 15, F
  },
  'Зк': {
    title: (tn) => 'Отношения заказа' + (!tn ? '' : ' (' + tnDef[tn].title + ' - Заказчик)'),
    transform: [0, 1, 0, 1], // 5
  },
  'Пз': {
    title: (tn) => 'Отношения заказа' + (!tn ? '' : ' (' + tnDef[tn].title + ' - Подзаказный)'),
    transform: [0, 0, 1, 1], // 3
  },
  'Ре': {
    title: (tn) => 'Отношения ревизии' + (!tn ? '' : ' (' + tnDef[tn].title + ' - Ревизор)'),
    transform: [1, 0, 1, 1], // 11, B
  },
  'Пр': {
    title: (tn) => 'Отношения ревизии' + (!tn ? '' : ' (' + tnDef[tn].title + ' - Подревизный)'),
    transform: [1, 1, 0, 1], // 13, D
  },
}
const itEnum = Object.keys(itDef);
itEnum.forEach((it, idx) => {
  itDef[it]['idx'] = idx
})

function itTitle(it, tn) {
  return typeof itDef[it].title != "function" ?
    itDef[it].title :
    itDef[it].title(tn)
  ;
}

function itTn(it, tn) {
  let transform = itDef[it].transform
  if (!transform) return tn
  var result = ""
  for (let i = 0; i < 4; i++) {
    result += !transform[i] ? tn[i] : toggle(tn[i])
  }
  return result;
}

var itForCache = {}
function itFor(tn, tn2) {
  if (itForCache[tn] && itForCache[tn][tn2]) {
    return itForCache[tn][tn2]
  }
  for (let i = 0; i < itEnum.length; i++) {
    let it = itEnum[i];
    if (tn2 === itTn(it, tn)) {
      if (!itForCache[tn]) {
        itForCache[tn] = {}
      }
      itForCache[tn][tn2] = it;
      return it
    }
  }
}

function toggle(letter) {
  switch (letter) {
    case 'E': return 'I';
    case 'I': return 'E';
    case 'S': return 'N';
    case 'N': return 'S';
    case 'F': return 'T';
    case 'T': return 'F';
    case 'P': return 'J';
    case 'J': return 'P';
    default: return letter
  }
}

// ============================================================================

const afDef = [
  [
    {
      title: 'базовая функция (1)',
      transform: [1, 0],
    },
    {
      title: 'творческая функция (2)',
      transform: [2, 1],
    },
  ],
  [
    {
      title: 'болевая функция (4)',
      transform: [-2, 1],
    },
    {
      title: 'ролевая функция (3)',
      transform: [-1, 0],
    },
  ],
  [
    {
      title: 'референтная функция (6)',
      transform: [-2, 0],
     },
    {
      title: 'суггестиваная функция (5)',
      transform: [-1, 1],
    },
  ],
  [
    {
      title: 'ограничительная функция (7)',
      transform: [1, 1],
     },
    {
      title: 'фоновая функция (8)',
      transform: [2, 0],
    },
  ],
]

function afCp(afRow, afCol, tn) {
  const transform = afDef[afRow][afCol].transform;
  let result = "";
  if (transform[0] > 0) {
    result = tn[transform[0]]
  } else {
    result = toggle(tn[-transform[0]])
  }
  if (transform[1] == 0) {
    result += tn[0].toLowerCase()
  } else {
    result += toggle(tn[0]).toLowerCase()
  }
  return result
}

// ============================================================================

const sexDef = {
  'male': { title: 'Мужской портрет'},
  'female': { title: 'Женский портрет'},
}

const sexEnum = Object.keys(sexDef)
function sexTitle(sex) {
  return sexDef[sex].title
}

// ============================================================================


const cpEnumOfPjEiDef = {
  'P': {
    'E': [ 'Ne', 'Se'],
    'I': [ 'Ni', 'Si'],
  },
  'J': {
    'E': [ 'Fe', 'Te'],
    'I': [ 'Fi', 'Ti'],
  },
}

function cpEnumOfPjEi(pj, ei) {
  return cpEnumOfPjEiDef[pj][ei]
}

// ============================================================================

export {
  store,
  initStore,
  clearParams,
  onStoreChange,
  url,

  eiEnum,
  eiTitle,

  pjEnum,
  pjTitle,

  quadraEnum,
  quadraField,

  tnEnum,
  tnTitle,

  cpGroups,
  cpGroupTitle,
  cpGroupField,

  cpEnum,
  cpTitle,

  itEnum,
  itTitle,
  itTn,
  itFor,

  afDef,
  afCp,

  sexEnum,
  sexTitle,

  cpEnumOfPjEi,
}

