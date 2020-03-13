"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=["boolean","flag","numeric","integer","string","json"];function _classPrivateFieldGet(e,t){var r=t.get(e);if(!r)throw new TypeError("attempted to get private field on non-instance");return r.get?r.get.call(e):r.value}function _classPrivateFieldSet(e,t,r){var i=t.get(e);if(!i)throw new TypeError("attempted to set private field on non-instance");if(i.set)i.set.call(e,r);else{if(!i.writable)throw new TypeError("attempted to set read only private field");i.value=r}return r}const t=["cast","defaults","defined","exclude","omit","order","pick","sort","rename","replace","required","transform"];function arrayHasSame(e,t){if(!e.length||!t.length)return!1;const r=new Set(t);return[...new Set(e)].filter(e=>r.has(e)).length>0}function arrayIntersect(e,t){if(!e.length||!t.length)return[];const r=new Set(t);return[...new Set(e)].filter(e=>r.has(e))}function isObjectEmpty(e){return 0===Object.keys(e).length}function isObjectLike(e){return null!==e&&"object"==typeof e&&!Array.isArray(e)}function isString(e){return"string"==typeof e}function jsonStringify(e){return JSON.stringify(e)}function castConfig(t){if(!isObjectLike(t))throw new TypeError("Cast should be an object");return isObjectEmpty(t)?{}:(Object.keys(t).forEach(r=>{if(!isString(t[r]))throw new TypeError(`'Cast' expect object values to be strings. Not a string at key: '${jsonStringify(t[r])}'.`);if(!e.includes(t[r]))throw new TypeError(`'Cast' has unknown type in {${r}: "${t[r]}"}.`)}),t)}const r="boolean",i="flag",s="numeric",a="integer",n="string",o="json";function jsonParse(e){return JSON.parse(e)}function isFunction(e){return"[object Function]"===Object.prototype.toString.call(e)}function objectToPlain(e){return function objectDeserialize(e){return isString(e)?jsonParse(e):e}(function objectSerialize(e){let t;const{toJSON:r,toObject:i}=e;return t=isFunction(i)?e.toObject():isFunction(r)?e.toJSON():e,isString(t)?t:jsonStringify(t)}(e))}function castData(e,t){return isObjectEmpty(e)||Object.keys(e).forEach(c=>{const l=e[c];if(!(c in t))throw new Error(`Field '${c}' suppose to be converted to ${l}.`);switch(l){case r:t[c]=Boolean(t[c]);break;case i:t[c]=function toFlag(e,t=!1,r=!1){if(null==e)return t;if("boolean"==typeof e)return e;const i=e.toString().toLocaleLowerCase().trim();return 0===i.length?t:"true"===i||"1"===i||"false"!==i&&"0"!==i&&r}(t[c]);break;case s:{const e=Number(t[c]);if(Number.isFinite(e))t[c]=e;else{const e=Number.parseFloat(toString(t[c]).trim());Number.isFinite(e)?t[c]=e:t[c]=0}break}case a:{const e=Number(t[c]);if(Number.isFinite(e))t[c]=Math.trunc(e);else{const r=Number.parseFloat(toString(t[c]).trim());Number.isFinite(r)?t[c]=Math.trunc(e):t[c]=0}break}case n:t[c]=toString(t[c]);break;case o:t[c]=objectToPlain(t[c]);break;default:throw new Error("Unknown value convert error")}}),t}function objectKeys(e){return Object.keys(e).sort((e,t)=>e.localeCompare(t))}function castToJson(e,t=!1){return t?function collectionSortKeys(e,t=!0){if(!isObjectLike(e))return e;const r=objectKeys(e);return r.length?r.reduce((r,i)=>(t&&isObjectLike(e[i])?r[i]=collectionSortKeys(e[i],t):r[i]=e[i],r),{}):e}(jsonParse(jsonStringify(e)),!0):jsonParse(jsonStringify(e))}function clone(e){switch(typeOf(e)){case"array":return e.slice();case"object":return Object.assign({},e);case"date":return new e.constructor(Number(e));case"map":return new Map(e);case"set":return new Set(e);case"buffer":return function cloneBuffer(e){const t=e.length;let r;r=Buffer.allocUnsafe?Buffer.allocUnsafe(t):Buffer.from(t);return e.copy(r),r}(e);case"symbol":return function cloneSymbol(e){if(Symbol.prototype.valueOf)return Object(Symbol.prototype.valueOf.call(e));return{}}(e);case"arraybuffer":return function cloneArrayBuffer(e){const t=new e.constructor(e.byteLength);return new Uint8Array(t).set(new Uint8Array(e)),t}(e);case"float32array":case"float64array":case"int16array":case"int32array":case"int8array":case"uint16array":case"uint32array":case"uint8clampedarray":case"uint8array":return function cloneTypedArray(e){return new e.constructor(e.buffer,e.byteOffset,e.length)}(e);case"regexp":return function cloneRegExp(e){let t;t=void 0!==e.flags?e.flags:/\w+$/.exec(e)||void 0;const r=new e.constructor(e.source,t);return r.lastIndex=e.lastIndex,r}(e);case"error":return Object.create(e);default:return e}}function typeOf(e){if(void 0===e)return"undefined";if(null===e)return"null";if(!0===e||!1===e||e instanceof Boolean)return"boolean";if("string"==typeof e||e instanceof String)return"string";if("number"==typeof e||e instanceof Number)return"number";if("function"==typeof e||e instanceof Function)return"function";if(void 0!==Array.isArray&&Array.isArray(e))return"array";if(e instanceof RegExp)return"regexp";if(e instanceof Date)return"date";var t=toString.call(e);return"[object RegExp]"===t?"regexp":"[object Date]"===t?"date":"[object Arguments]"===t?"arguments":"[object Error]"===t?"error":function isBuffer(e){return null!==e&&Boolean(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}(e)?"buffer":"[object Set]"===t?"set":"[object WeakSet]"===t?"weakset":"[object Map]"===t?"map":"[object WeakMap]"===t?"weakmap":"[object Symbol]"===t?"symbol":"[object Int8Array]"===t?"int8array":"[object Uint8Array]"===t?"uint8array":"[object Uint8ClampedArray]"===t?"uint8clampedarray":"[object Int16Array]"===t?"int16array":"[object Uint16Array]"===t?"uint16array":"[object Int32Array]"===t?"int32array":"[object Uint32Array]"===t?"uint32array":"[object Float32Array]"===t?"float32array":"[object Float64Array]"===t?"float64array":"object"}function isObjectObject(e){return!0===function isObject(e){return"object"==typeof e&&null!==e}(e)&&"[object Object]"===Object.prototype.toString.call(e)}function cloneDeep(e,t){switch(typeOf(e)){case"object":return function cloneObjectDeep(e,t){if("function"==typeof t)return t(e);if(t||function isPlainObject(e){let t,r;return!1!==isObjectObject(e)&&(t=e.constructor,"function"==typeof t&&(r=t.prototype,!1!==isObjectObject(r)&&!1!==r.hasOwnProperty("isPrototypeOf")))}(e)){const r=new e.constructor;for(let i in e)r[i]=cloneDeep(e[i],t);return r}return e}(e,t);case"array":return function cloneArrayDeep(e,t){const r=new e.constructor(e.length);for(let i=0;i<e.length;i++)r[i]=cloneDeep(e[i],t);return r}(e,t);default:return clone(e)}}function clone$1(e){return function isPrimitive(e){return Object(e)!==e}(e)?e:cloneDeep(e)}function defaultsConfig(e){if(!isObjectLike(e))throw new TypeError("'Defaults' should be an object");return e}function defaultsData(e,t){return isObjectEmpty(e)||Object.keys(e).forEach(r=>{r in t&&void 0!==t[r]||(t[r]=e[r])}),t}function arrayUnique(e,t=!0){if(e.length<2)return e;let r=[...new Set(e)];if(r.includes(0)){const t=e.filter(e=>0===e);t.length>1&&t.some(e=>1/e===Number.NEGATIVE_INFINITY)&&r.push(-0)}if(r.filter(e=>"string"==typeof e).length){const t=e.filter(e=>"string"==typeof e);if(t.length>1){const e=[...new Set(t.map(e=>e.normalize()))];e.forEach(e=>{delete r[r.indexOf(e)]});const i=[];for(let e=0;e<r.length;e+=1)e in r&&i.push(r[e]);r=i.concat(e)}}return t?r.sort():r}function isArrayEmpty(e){return 0===e.length}function definedConfig(e){if(!Array.isArray(e))throw new TypeError("'Defined' should be an array");return isArrayEmpty(e)?[]:arrayUnique(e).map(e=>{if(!isString(e))throw new TypeError(`'Defined' expect array of strings. Value: '${jsonStringify(e)}'.`);return e})}function definedData(e,t){const r=definedConfig(e);return isArrayEmpty(r)||r.forEach(e=>{if(!(e in t))throw new Error(`Field '${e}' must be defined.`);if(void 0===t[e])throw new Error(`Field '${e}' should have value.`)}),t}function isRegExp(e){return e instanceof RegExp}function excludeConfig(e){if(!Array.isArray(e))throw new TypeError("'Exclude' should be an array");return isArrayEmpty(e)?[]:arrayUnique(e).map(e=>{if(!isString(e)&&!isRegExp(e))throw new TypeError(`'Exclude' expect array of strings or regular expressions. Value: '${jsonStringify(e)}'.`);return e})}function omitConfig(e){if(!Array.isArray(e))throw new TypeError("'Omit' should be an array");return isArrayEmpty(e)?[]:arrayUnique(e).map(e=>{if(!isString(e))throw new TypeError(`'Omit' expect array of strings. Value: '${jsonStringify(e)}'.`);return e})}function orderConfig(e){if(!Array.isArray(e))throw new TypeError("'Order' should be an array");return isArrayEmpty(e)?[]:arrayUnique(e,!1).map(e=>{if(!isString(e))throw new TypeError(`'Order' expect array of strings. Value: '${jsonStringify(e)}'.`);return e})}function objectOrderKeys(e,t=[],r=!1){if(!Array.isArray(t)||0===t.length)return e;const i=t.filter(e=>"string"==typeof e);let s=new Set(Object.keys(e));const a={};return i.forEach(t=>{s.delete(t),t in e&&(a[t]=e[t])}),s=[...s],r&&(s=s.sort((e,t)=>e.localeCompare(t))),s.forEach(t=>a[t]=e[t]),a}function pickConfig(e){if(!Array.isArray(e))throw new TypeError("'Pick' should be an array");return isArrayEmpty(e)?[]:arrayUnique(e).map(e=>{if(!isString(e))throw new TypeError(`'Pick' expect array of strings. Value: '${jsonStringify(e)}'.`);return e})}function pickData(e,t){if(isArrayEmpty(e))return t;const r={};return Object.keys(t).forEach(i=>{e.includes(i)&&(r[i]=t[i])}),r}function renameConfig(e){if(!isObjectLike(e))throw new TypeError("'Rename' should be an object");if(isObjectEmpty(e))return{};Object.keys(e).forEach(e=>{if(!isString(e))throw new TypeError(`'Rename' expect object values to be strings. Not a string at key: '${e}'.`)});const t=Object.values(e),r=arrayUnique(t);if(t.length!==r.length)throw new TypeError(`'Rename' has similar values: '${jsonStringify(r)}'.`);return e}function renameData(e,t){if(isObjectEmpty(e))return t;const r=Object.keys(e).sort((e,t)=>e.localeCompare(t)),i={};return r.forEach(r=>{if(!(r in t))throw new Error(`Field '${r}' suppose to be renamed.`);i[e[r]]=t[r]}),r.forEach(e=>{delete t[e]}),Object.assign(t,i),t}function replaceConfig(e){if(!isObjectLike(e))throw new TypeError("'Replace' should be an object");return e}function replaceData(e,t){return isObjectEmpty(e)||Object.keys(e).forEach(r=>{t[r]=e[r]}),t}function requiredConfig(e){if(!Array.isArray(e))throw new TypeError("'Required' should be an array");return isArrayEmpty(e)?[]:arrayUnique(e).map(e=>{if(!isString(e))throw new TypeError(`'Required' expect array of strings. Value: '${jsonStringify(e)}'.`);return e})}function requiredData(e,t){return isArrayEmpty(e)||e.forEach(e=>{if(!(e in t))throw new Error(`Field '${e}' is required.`)}),t}function transformConfig(e){if(!isObjectLike(e))throw new TypeError("'Transform' should be an object");return isObjectEmpty(e)?{}:(Object.keys(e).forEach(t=>{if(!isFunction(e[t]))throw new TypeError(`'Transform' expect object values to be functions. Not a function at key: '${t}'.`)}),e)}function transformData(e,t){return isObjectEmpty(e)||Object.keys(e).forEach(r=>{if(!(r in t))throw new Error(`Field '${r}' suppose to be transformed.`);t[r]=e[r](t[r],r,clone$1(t))}),t}class Vicis{constructor(e={},t){c.set(this,{writable:!0,value:{}}),l.set(this,{writable:!0,value:[]}),u.set(this,{writable:!0,value:[]}),f.set(this,{writable:!0,value:[]}),h.set(this,{writable:!0,value:[]}),d.set(this,{writable:!0,value:[]}),y.set(this,{writable:!0,value:[]}),p.set(this,{writable:!0,value:!1}),b.set(this,{writable:!0,value:{}}),v.set(this,{writable:!0,value:{}}),m.set(this,{writable:!0,value:[]}),F.set(this,{writable:!0,value:{}}),g.set(this,{writable:!0,value:{}}),w.set(this,{writable:!0,value:{}}),P.set(this,{writable:!0,value:void 0}),_.set(this,{writable:!0,value:void 0}),_classPrivateFieldSet(this,P,function validateConfig(){const e=objectKeys(_classPrivateFieldGet(this,c)),t=objectKeys(_classPrivateFieldGet(this,b)),r=objectKeys(_classPrivateFieldGet(this,v)),i=objectKeys(_classPrivateFieldGet(this,F));if(arrayHasSame(_classPrivateFieldGet(this,h),e))throw new Error(`'omit' has same keys as 'cast': ${arrayIntersect(_classPrivateFieldGet(this,h),e)}.`);if(arrayHasSame(_classPrivateFieldGet(this,h),_classPrivateFieldGet(this,u)))throw new Error(`'omit' has same keys as 'defined': ${arrayIntersect(_classPrivateFieldGet(this,h),_classPrivateFieldGet(this,u))}.`);if(arrayHasSame(_classPrivateFieldGet(this,h),_classPrivateFieldGet(this,y)))throw new Error(`'omit' has same keys as 'pick': ${arrayIntersect(_classPrivateFieldGet(this,h),_classPrivateFieldGet(this,y))}.`);if(arrayHasSame(_classPrivateFieldGet(this,h),t))throw new Error(`'omit' has same keys as 'rename': ${arrayIntersect(_classPrivateFieldGet(this,h),t)}.`);if(arrayHasSame(_classPrivateFieldGet(this,h),r))throw new Error(`'omit' has same keys as 'replace': ${arrayIntersect(_classPrivateFieldGet(this,h),r)}.`);if(arrayHasSame(_classPrivateFieldGet(this,h),_classPrivateFieldGet(this,m)))throw new Error(`'omit' has same keys as 'required': ${arrayIntersect(_classPrivateFieldGet(this,h),_classPrivateFieldGet(this,m))}.`);if(arrayHasSame(_classPrivateFieldGet(this,h),i))throw new Error(`'omit' has same keys as 'transform': ${arrayIntersect(_classPrivateFieldGet(this,h),i)}.`);if(arrayHasSame(_classPrivateFieldGet(this,h),i))throw new Error(`'omit' has same keys as 'transform': ${arrayIntersect(_classPrivateFieldGet(this,h),i)}.`);if(arrayHasSame(e,r))throw new Error(`'cast' has same keys as 'replace': ${arrayIntersect(e,r)}.`);if(arrayHasSame(e,i))throw new Error(`'cast' has same keys as 'transform': ${arrayIntersect(e,i)}.`);if(arrayHasSame(r,i))throw new Error(`'replace' has same keys as 'transform': ${arrayIntersect(r,i)}.`);return this}.bind(this)),_classPrivateFieldSet(this,_,function validateData(){return"toObject"in _classPrivateFieldGet(this,w)&&isFunction(_classPrivateFieldGet(this,w).toObject)?_classPrivateFieldSet(this,g,_classPrivateFieldGet(this,w).toObject()):"toJSON"in _classPrivateFieldGet(this,w)&&isFunction(_classPrivateFieldGet(this,w).toJSON)?_classPrivateFieldSet(this,g,_classPrivateFieldGet(this,w).toJSON()):_classPrivateFieldSet(this,g,_classPrivateFieldGet(this,w)),_classPrivateFieldSet(this,g,function omitData(e,t){if(isArrayEmpty(e))return t;const r={};return Object.keys(t).forEach(i=>{e.includes(i)||(r[i]=t[i])}),r}(_classPrivateFieldGet(this,h),_classPrivateFieldGet(this,g))),_classPrivateFieldSet(this,g,requiredData(_classPrivateFieldGet(this,m),_classPrivateFieldGet(this,g))),_classPrivateFieldSet(this,g,definedData(_classPrivateFieldGet(this,u),_classPrivateFieldGet(this,g))),_classPrivateFieldSet(this,g,castData(_classPrivateFieldGet(this,c),_classPrivateFieldGet(this,g))),_classPrivateFieldSet(this,g,transformData(_classPrivateFieldGet(this,F),_classPrivateFieldGet(this,g))),_classPrivateFieldSet(this,g,replaceData(_classPrivateFieldGet(this,v),_classPrivateFieldGet(this,g))),_classPrivateFieldSet(this,g,renameData(_classPrivateFieldGet(this,b),_classPrivateFieldGet(this,g))),_classPrivateFieldSet(this,g,defaultsData(_classPrivateFieldGet(this,l),_classPrivateFieldGet(this,g))),_classPrivateFieldSet(this,g,pickData(_classPrivateFieldGet(this,y),_classPrivateFieldGet(this,g))),_classPrivateFieldSet(this,g,function excludeData(e,t){if(isArrayEmpty(e))return t;const r=e.filter(isString);if(r.length&&Object.keys(t).forEach(e=>{r.includes(e)&&delete t[e]}),0===objectKeys(t).length)return t;const i=e.filter(isRegExp);return i.length&&i.forEach(e=>{Object.keys(t).forEach(r=>{e.test(r)&&delete t[r]})}),t}(_classPrivateFieldGet(this,f),_classPrivateFieldGet(this,g))),_classPrivateFieldSet(this,g,castToJson(_classPrivateFieldGet(this,g),_classPrivateFieldGet(this,p))),_classPrivateFieldSet(this,g,function orderData(e,t,r=!1){return isArrayEmpty(e)?t:objectOrderKeys(t,e,r)}(_classPrivateFieldGet(this,d),_classPrivateFieldGet(this,g),_classPrivateFieldGet(this,p))),this}.bind(this)),this.config(e),void 0!==t&&this.data(t)}static factory(e={},t){return new Vicis(e,t)}static get BOOLEAN(){return"boolean"}static get FLAG(){return"flag"}static get NUMERIC(){return"numeric"}static get INTEGER(){return"integer"}static get STRING(){return"string"}static get JSON(){return"json"}getConfig(){return clone$1({cast:_classPrivateFieldGet(this,c),defaults:_classPrivateFieldGet(this,l),defined:_classPrivateFieldGet(this,u),exclude:_classPrivateFieldGet(this,f),omit:_classPrivateFieldGet(this,h),order:_classPrivateFieldGet(this,d),pick:_classPrivateFieldGet(this,y),sort:_classPrivateFieldGet(this,p),rename:_classPrivateFieldGet(this,b),replace:_classPrivateFieldGet(this,v),required:_classPrivateFieldGet(this,m),transform:_classPrivateFieldGet(this,F)})}resetConfig(){return _classPrivateFieldSet(this,c,{}),_classPrivateFieldSet(this,l,{}),_classPrivateFieldSet(this,u,[]),_classPrivateFieldSet(this,f,[]),_classPrivateFieldSet(this,h,[]),_classPrivateFieldSet(this,d,[]),_classPrivateFieldSet(this,y,[]),_classPrivateFieldSet(this,p,!1),_classPrivateFieldSet(this,b,{}),_classPrivateFieldSet(this,v,{}),_classPrivateFieldSet(this,m,[]),_classPrivateFieldSet(this,F,{}),this}config(e={}){if(!isObjectLike(e))throw new TypeError("Config should be an object");const r=function arrayDiff(e,t){const r=new Set(t);return e.filter(e=>!r.has(e))}(objectKeys(e),t);if(r.length)throw new TypeError(`Config has unknown fields: '${r.join("', '")}'.`);return this.resetConfig(),this.sort(e.sort),this.omit(e.omit),this.cast(e.cast),this.defined(e.defined),this.pick(e.pick),this.rename(e.rename),this.replace(e.replace),this.required(e.required),this.transform(e.transform),this.defaults(e.defaults),this.exclude(e.exclude),this.order(e.order),_classPrivateFieldGet(this,P).call(this),_classPrivateFieldGet(this,_).call(this),this}cast(e={}){return _classPrivateFieldSet(this,c,castConfig(e)),_classPrivateFieldGet(this,P).call(this),_classPrivateFieldGet(this,_).call(this),this}defaults(e={}){return _classPrivateFieldSet(this,l,defaultsConfig(e)),_classPrivateFieldGet(this,P).call(this),_classPrivateFieldGet(this,_).call(this),this}defined(e=[]){return _classPrivateFieldSet(this,u,definedConfig(e)),_classPrivateFieldGet(this,P).call(this),_classPrivateFieldGet(this,_).call(this),this}exclude(e=[]){return _classPrivateFieldSet(this,f,excludeConfig(e)),_classPrivateFieldGet(this,P).call(this),_classPrivateFieldGet(this,_).call(this),this}omit(e=[]){return _classPrivateFieldSet(this,h,omitConfig(e)),_classPrivateFieldGet(this,P).call(this),_classPrivateFieldGet(this,_).call(this),this}order(e=[]){return _classPrivateFieldSet(this,d,orderConfig(e)),_classPrivateFieldGet(this,P).call(this),_classPrivateFieldGet(this,_).call(this),this}pick(e=[]){return _classPrivateFieldSet(this,y,pickConfig(e)),_classPrivateFieldGet(this,P).call(this),_classPrivateFieldGet(this,_).call(this),this}rename(e={}){return _classPrivateFieldSet(this,b,renameConfig(e)),_classPrivateFieldGet(this,P).call(this),_classPrivateFieldGet(this,_).call(this),this}replace(e={}){return _classPrivateFieldSet(this,v,replaceConfig(e)),_classPrivateFieldGet(this,P).call(this),_classPrivateFieldGet(this,_).call(this),this}required(e=[]){return _classPrivateFieldSet(this,m,requiredConfig(e)),_classPrivateFieldGet(this,P).call(this),_classPrivateFieldGet(this,_).call(this),this}sort(e=!1){if("boolean"!=typeof e)throw new TypeError("'sort' should be a boolean");return _classPrivateFieldSet(this,p,e),_classPrivateFieldGet(this,_).call(this),this}transform(e={}){return _classPrivateFieldSet(this,F,transformConfig(e)),_classPrivateFieldGet(this,P).call(this),_classPrivateFieldGet(this,_).call(this),this}getData(){return clone$1(_classPrivateFieldGet(this,g))}data(e){if(!isObjectLike(e))throw new TypeError("Data should be an object");return _classPrivateFieldSet(this,w,e),_classPrivateFieldGet(this,_).call(this),this}clear(){return _classPrivateFieldSet(this,g,{}),_classPrivateFieldSet(this,w,{}),this}toJSON(){return this.getData()}toString(){return jsonStringify(this.toJSON())}fromArray(e){return Array.from(e).map(e=>this.data(e).toJSON())}}var c=new WeakMap,l=new WeakMap,u=new WeakMap,f=new WeakMap,h=new WeakMap,d=new WeakMap,y=new WeakMap,p=new WeakMap,b=new WeakMap,v=new WeakMap,m=new WeakMap,F=new WeakMap,g=new WeakMap,w=new WeakMap,P=new WeakMap,_=new WeakMap;exports.TYPES_ENUM=e,exports.Vicis=Vicis,exports.cast=function cast(e,t={}){const r=castConfig(t);return isObjectEmpty(r)?e:castData(r,e)},exports.defaults=function defaults(e,t={}){return isObjectEmpty(defaultsConfig(t))?e:defaultsData(t,e)},exports.defined=function defined(e,t=[]){return isArrayEmpty(t)?e:definedData(t,e)},exports.exclude=function exclude(e,t=[]){const r=excludeConfig(t);if(isArrayEmpty(r))return e;const i=r.filter(isString);if(i.length&&Object.keys(e).forEach(t=>{i.includes(t)&&delete e[t]}),0===objectKeys(e).length)return e;const s=r.filter(isRegExp);return s.length&&s.forEach(t=>{Object.keys(e).forEach(r=>{t.test(r)&&delete e[r]})}),e},exports.omit=function omit(e,t=[]){const r=omitConfig(t);if(isArrayEmpty(r))return e;const i={};return Object.keys(e).forEach(t=>{r.includes(t)||(i[t]=e[t])}),i},exports.order=function order(e,t=[],r=!1){return isArrayEmpty(orderConfig(t))?e:objectOrderKeys(e,t,r)},exports.pick=function pick(e,t=[]){const r=pickConfig(t);return isArrayEmpty(r)?e:pickData(r,e)},exports.rename=function rename(e,t={}){const r=renameConfig(t);return isObjectEmpty(r)?e:renameData(r,e)},exports.replace=function replace(e,t={}){const r=replaceConfig(t);return isObjectEmpty(r)?e:replaceData(r,e)},exports.required=function required(e,t=[]){const r=requiredConfig(t);return isArrayEmpty(r)?e:requiredData(r,e)},exports.transform=function transform(e,t={}){const r=transformConfig(t);return isObjectEmpty(r)?e:transformData(r,e)};
//# sourceMappingURL=vicis.cjs.map
