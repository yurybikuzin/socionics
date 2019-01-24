
const lookup = new Map();

// import descs from './routes/_descs.js'
// descs.forEach(desc => {
//   lookup.set(desc.slug, { status: 200, html: desc.html });
// });

import { Store } from 'svelte/store.js';

const clearParams = {cp: null, tn: null, it: null, sex: null, mad: null};

var store = new Store(clearParams)

function initStore({ params, query }) {
  const { page } = params;
  let { tn, cp, it, sex, mad } = query;
  if (!sex) { sex = 'male' }
  store.set({ page, tn, cp, it, sex, mad, cache: lookup })
  onStoreChange({
    changed: {tn: !!tn, cp: !!cp, it: !!it},
    current: store.get(),
  });
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
  slugs.forEach(slug => {
    let cache = store.get().cache || new Map();
    if (!(cache.has(slug) && cache.get(slug).status == 200)) {
      let f = async function() {
        try {
          const res = await fetch(slug + '.json');
          const data = await res.json();
          if (res.status === 200) {
            cache.set(slug, {status: res.status, html: data})
          } else {
            cache.set(slug, {status: res.status, html: '<span class="error">' + data.message + '</span>'})
          }
        } catch(error) {
          cache.set(slug, {status: 0, html: error.message})
        }
        store.set({cache})
      };
      f();
    }
  });
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
  if (!_sex) { _sex = 'male' }
  let result = !_page ? 'tn' : _page + (
    !_tn && !_cp && _sex == 'male' && !_mad ? "" :
      "?" + [
        (!_tn ? "" : "tn=" + _tn),
        (!_cp ? "" : "cp=" + _cp),
        (!_it ? "" : "it=" + _it),
        (_sex == 'male' ? "" : "sex=" + _sex),
        (!_mad ? "" : "mad=" + _mad),
      ].filter( _ => _ ).join("&")
  );
  return result;
}

const htmlLoading = '<span>Loading . . .</span>';

store.compute(
  'tnDesc',
  ['tn', 'sex', 'cache'],
  (tn, sex, cache) => {
    const slug = tn + '-' + sex;
    const result = tn && sex && cache && cache.has(slug) ? cache.get(slug).html : htmlLoading;
    return result
  }
);

store.compute(
  'cpDesc',
  ['cp', 'cache'],
  (cp, cache) => {
    const slug = cp;
    const result = cp && cache && cache.has(slug) ? cache.get(slug).html : htmlLoading;
    return result
  }
);

store.compute(
  'itDesc',
  ['it', 'cache'],
  (it, cache) => {
    const slug = it;
    const result = it && cache && cache.has(slug) ? cache.get(slug).html : htmlLoading;
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
      'E': { code: 'ENTP', title: "Дон Кихот" },
      'I': { code: 'ISFP', title: "Дюма" },
    },
    'J': {
      'E': { code: 'ESFJ', title: 'Гюго' },
      'I': { code: 'INTJ', title: 'Робеспьер' },
    },
  },
  'II': {
    'P': {
      'E': { code: 'ESTP', title: "Жуков" },
      'I': { code: 'INFP', title: "Есенин" },
    },
    'J': {
      'E': { code: 'ENFJ', title: 'Гамлет' },
      'I': { code: 'ISTJ', title: 'Максим' },
    },
  },
  'III': {
    'P': {
      'E': { code: 'ESFP', title: "Наполеон" },
      'I': { code: 'INTP', title: "Бальзак" },
    },
    'J': {
      'E': { code: 'ENTJ', title: 'Джек' },
      'I': { code: 'ISFJ', title: 'Драйзер' },
    },
  },
  'IV': {
    'P': {
      'E': { code: 'ENFP', title: "Гексли" },
      'I': { code: 'ISTP', title: "Габен" },
    },
    'J': {
      'E': { code: 'ESTJ', title: 'Штирлиц' },
      'I': { code: 'INFJ', title: 'Достоевский' },
    },
  },
};

const quadraEnum = Object.keys(quadraDef);

function quadraField(quadra, pj, ei, field) {
  return quadraDef[quadra][pj][ei][field];
}

// ============================================================================

var tnDef = {};
Object.values(quadraDef).forEach(quadraDef => {
  Object.values(quadraDef).forEach(pjDef => {
    Object.values(pjDef).forEach(eiDef => {
      tnDef[eiDef.code] = { title: eiDef.title }
    })
  })
})
const tnEnum = Object.keys(tnDef);

function tnTitle(tn) {
  return tnDef[tn].title;
}

// ============================================================================

const cpGroupDef = {
  'N': {
    'title': 'интуиция',
    'E': { code: 'Ne', title: 'интуиция возможностей' },
    'I': { code: 'Ni', title: 'интуиция времени' },
  },
  'F': {
    'title': 'этика',
    'E': {code: 'Fe', title: 'этика эмоций'},
    'I': {code: 'Fi', title: 'этика отношений'},
  },
  'T': {
    'title': 'логика',
    'E': {code: 'Te', title: 'деловая логика'},
    'I': {code: 'Ti', title: 'структурная логика'},
  },
  'S': {
    'title': 'сенсорика',
    'E': {code: 'Se', title: 'волевая сенсорика'},
    'I': {code: 'Si', title: 'сенсорика ощущений'},
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
Object.values(cpGroupDef).forEach(cpGroupDef => {
  Object.values(cpGroupDef).forEach(eiDef => {
    cpDef[eiDef.code] = { title: eiDef.title }
  })
})
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

