
import { Store } from 'svelte/store.js';

var store = new Store({})

function url({page, tn, cp, sex}) {
  let _page = page === null ? null : (page ? page : store._state.page)
  let _typeName = tn === null ? null : (tn ? tn : store._state.tn);
  let _cognitiveProcess = cp === null ? null : (cp ? cp : store._state.cp);
  let _sex = sex === null ? null : (sex ? sex : store._state.sex);
  let result = !_page ? 'tn' : _page + (
    !_typeName && !_cognitiveProcess && !_sex ? "" :
      "?" + [
        (!_typeName ? "" : "tn=" + _typeName),
        (!_cognitiveProcess ? "" : "cp=" + _cognitiveProcess),
        (!_sex ? "" : "sex=" + _sex),
      ].filter( _ => _ ).join("&")
  );
  return result;
}

const eiDef = {
  'E': 'экстраверты',
  'I': 'интраверты',
};

const pjDef = {
  'P': 'иррационалы',
  'J': 'рационалы',
};

const typeTableDef = {
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

var tnDef = {};
Object.values(typeTableDef).forEach(quadraDef => {
  Object.values(quadraDef).forEach(pjDef => {
    Object.values(pjDef).forEach(eiDef => {
      tnDef[eiDef.code] = { title: eiDef.title }
    })
  })
})

const cpDef = {
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
    transform: [0, 1, 1, 1], / 7
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
    transform: [0, 1, 1, 0], //
  },
  'Пп': {
    title: 'Отношения противоположности',
    transform: [1, 0, 0, 0],
  },
  'Кт': {
    title: 'Квазитождественные отношения',
    transform: [0, 0, 0, 1],
  },
  'Кф': {
    title: 'Конфликтные отношения',
    transform: [1, 1, 1, 1],
  },
  'Зк': {
    title: (tn) => 'Отношения заказа' + (!tn ? '' : ' (' + tnDef[tn].title + ' - Заказчик)'),
    transform: [0, 1, 0, 1],
  },
  'Пз': {
    title: (tn) => 'Отношения заказа' + (!tn ? '' : ' (' + tnDef[tn].title + ' - Подзаказный)'),
    transform: [0, 0, 1, 1],
  },
  'Ре': {
    title: (tn) => 'Отношения ревизии' + (!tn ? '' : ' (' + tnDef[tn].title + ' - Ревизор)'),
    transform: [1, 0, 1, 1],
  },
  'Пр': {
    title: (tn) => 'Отношения ревизии' + (!tn ? '' : ' (' + tnDef[tn].title + ' - Подревизный)'),
    transform: [1, 1, 0, 1],
  },
}

function getItTn(it, tn) {
  let transform = itDef[it].transform
  if (!transform) return tn
  var result = ""
  for (let i = 0; i < 4; i++) {
    result += !transform[i] ? tn[i] : toggle(tn[i])
  }
  return result;
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

export {store, url, eiDef, pjDef, typeTableDef, cpDef, tnDef, itDef, getItTn}

