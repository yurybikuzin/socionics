import { Store } from 'svelte/store.js';
var store = new Store({})
function urlQuery({typeName, cognitiveProcess, sex}) {
  let _typeName = typeName === null ? null : (typeName ? typeName : store._state.typeName);
  let _cognitiveProcess = cognitiveProcess === null ? null : (cognitiveProcess ? cognitiveProcess : store._state.cognitiveProcess);
  let _sex = sex === null ? null : (sex ? sex : store._state.sex);
  let result = !_typeName && !_cognitiveProcess ? "" :
    "?" + [
      (!_typeName ? "" : "tn=" + _typeName),
      (!_cognitiveProcess ? "" : "cp=" + _cognitiveProcess),
      (!_sex ? "" : "sex=" + _sex),
    ].filter( _ => _ ).join("&")
  ;
  return result;
}
export {store, urlQuery}

// export default {
//   store: new Store({}),
//   urlQuery: function ({typeName, cognitiveProcess, sex}) {
//     let _typeName = typeName === null ? null : (typeName ? typeName : store._state.typeName);
//     let _cognitiveProcess = cognitiveProcess === null ? null : (cognitiveProcess ? cognitiveProcess : store._state.cognitiveProcess);
//     let _sex = sex === null ? null : (sex ? sex : store._state.sex);
//     let result = !_typeName && !_cognitiveProcess ? "" :
//       "?" + [
//         (!_typeName ? "" : "tn=" + _typeName),
//         (!_cognitiveProcess ? "" : "cp=" + _cognitiveProcess),
//         (!_sex ? "" : "sex=" + _sex),
//       ].filter( _ => _ ).join("&")
//     ;
//     return result;
//   },
// };