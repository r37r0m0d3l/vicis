import { IFunction } from "../../interface/common/IFunction";
import { IObject } from "../../interface/common/IObject";

import { ICast } from "../../interface/config/ICast";
import { IConfig } from "../../interface/config/IConfig";
import { IConfigObject } from "../../interface/config/IConfigObject";
import { IConfigObjectFull } from "../../interface/config/IConfigObjectFull";
import { IDefaults } from "../../interface/config/IDefaults";
import { IDefined } from "../../interface/config/IDefined";
import { IExclude } from "../../interface/config/IExclude";
import { INullish } from "../../interface/config/INullish";
import { IOmit } from "../../interface/config/IOmit";
import { IOrder } from "../../interface/config/IOrder";
import { IPick } from "../../interface/config/IPick";
import { IRename } from "../../interface/config/IRename";
import { IReplace } from "../../interface/config/IReplace";
import { IRequired } from "../../interface/config/IRequired";
import { ITransform } from "../../interface/config/ITransform";

import { ECastType } from "../../const/ECastType";
import { CONFIG_FIELDS } from "../../const/CONFIG_FIELDS";
import { ESort } from "../../const/ESort";

import { AggregateError } from "../errors/AggregateError";
import { ValidationError } from "../errors/ValidationError";

import { arrayBasicIntersect } from "../../util/array/basic/intersect";
import { arrayGetDifference } from "../../util/array/get/difference";
import { arrayHasSame } from "../../util/array/basic/hasSame";
import { castToJson } from "../../util/cast/to/json";
import { checkIsObjectLike } from "../../util/check/isObjectLike";
import { clone } from "../../util/variable/clone";
import { isFunction } from "../../util/is/function";
import { jsonStringify } from "../../util/json/stringify";
import { objectGetKeys } from "../../util/object/get/keys";
import { objectGetProperty } from "../../util/object/get/property";

import { castConfig } from "../cast/castConfig";
import { castData } from "../cast/castData";
import { defaultsConfig } from "../defaults/defaultsConfig";
import { defaultsData } from "../defaults/defaultsData";
import { definedConfig } from "../defined/definedConfig";
import { definedData } from "../defined/definedData";
import { excludeConfig } from "../exclude/excludeConfig";
import { excludeData } from "../exclude/excludeData";
import { nullishConfig } from "../nullish/nullishConfig";
import { nullishData } from "../nullish/nullishData";
import { omitConfig } from "../omit/omitConfig";
import { omitData } from "../omit/omitData";
import { orderConfig } from "../order/orderConfig";
import { orderData } from "../order/orderData";
import { pickConfig } from "../pick/pickConfig";
import { pickData } from "../pick/pickData";
import { renameConfig } from "../rename/renameConfig";
import { renameData } from "../rename/renameData";
import { replaceConfig } from "../replace/replaceConfig";
import { replaceData } from "../replace/replaceData";
import { requiredConfig } from "../required/requiredConfig";
import { requiredData } from "../required/requiredData";
import { transformConfig } from "../transform/transformConfig";
import { transformData } from "../transform/transformData";

import { convertFunctionToConfig } from "../config/functionToConfig";

import { objectCreateEmpty } from "../../util/object/createEmpty";
import { sortAsBoolean } from "../config/sortAsBoolean";

export class Vicis {
  //#region Config Fields
  /**
   * @name cast
   * @private
   * @type {Object}
   */
  __cast: ICast;
  /**
   * @name defaults
   * @private
   * @type {Object}
   */
  __defaults: IDefaults;
  /**
   * @name defined
   * @private
   * @type {Array.<string>}
   */
  __defined: IDefined;
  /**
   * @name exclude
   * @private
   * @type {Array.<string|RegExp>}
   */
  __exclude: IExclude;
  /**
   * @name nullish
   * @private
   * @type {Object}
   */
  __nullish: INullish;
  /**
   * @name omit
   * @private
   * @type {Array.<string>}
   */
  __omit: IOmit;
  /**
   * @name order
   * @private
   * @type {Array.<string>}
   */
  __order: IOrder;
  /**
   * @name pick
   * @private
   * @type {Array.<string>}
   */
  __pick: IPick;
  /**
   * @name sort
   * @private
   * @type {boolean|string}
   */
  __sort: boolean | ESort;
  /**
   * @name rename
   * @private
   * @type {Object}
   */
  __rename: IRename;
  /**
   * @name replace
   * @private
   * @type {Object}
   */
  __replace: IReplace;
  /**
   * @name required
   * @private
   * @type {Array.<string>}
   */
  __required: IRequired;
  /**
   * @name transform
   * @private
   * @type {Object}
   */
  __transform: ITransform;
  //#endregion

  //#region Data Fields
  /**
   * @name __dataCache
   * @private
   * @type {Object}
   */
  __dataCache: IObject;
  /**
   * @name __dataOriginal
   * @private
   * @type {Object}
   */
  __dataOriginal?: IObject;
  //#endregion

  //#region Private Methods
  /**
   * @name validateConfig
   * @protected
   * @method
   * @throws Error
   * @returns {Vicis}
   */
  public validateConfig() {
    const cast = objectGetKeys(this.__cast);
    const rename = objectGetKeys(this.__rename);
    const replace = objectGetKeys(this.__replace);
    const transform = objectGetKeys(this.__transform);
    if (arrayHasSame(this.__omit, cast)) {
      throw new ValidationError(
        `'omit' has same keys as 'cast': ${
          arrayBasicIntersect(this.__omit, cast)
        }.`,
      );
    }
    if (arrayHasSame(this.__omit, this.__defined)) {
      throw new ValidationError(
        `'omit' has same keys as 'defined': ${
          arrayBasicIntersect(this.__omit, this.__defined)
        }.`,
      );
    }
    if (arrayHasSame(this.__omit, this.__pick)) {
      throw new ValidationError(
        `'omit' has same keys as 'pick': ${
          arrayBasicIntersect(this.__omit, this.__pick)
        }.`,
      );
    }
    if (arrayHasSame(this.__omit, rename)) {
      throw new ValidationError(
        `'omit' has same keys as 'rename': ${
          arrayBasicIntersect(this.__omit, rename)
        }.`,
      );
    }
    if (arrayHasSame(this.__omit, replace)) {
      throw new ValidationError(
        `'omit' has same keys as 'replace': ${
          arrayBasicIntersect(this.__omit, replace)
        }.`,
      );
    }
    if (arrayHasSame(this.__omit, this.__required)) {
      throw new ValidationError(
        `'omit' has same keys as 'required': ${
          arrayBasicIntersect(this.__omit, this.__required)
        }.`,
      );
    }
    if (arrayHasSame(this.__omit, transform)) {
      throw new ValidationError(
        `'omit' has same keys as 'transform': ${
          arrayBasicIntersect(this.__omit, transform)
        }.`,
      );
    }
    if (arrayHasSame(cast, replace)) {
      throw new ValidationError(
        `'cast' has same keys as 'replace': ${
          arrayBasicIntersect(cast, replace)
        }.`,
      );
    }
    if (arrayHasSame(cast, transform)) {
      throw new ValidationError(
        `'cast' has same keys as 'transform': ${
          arrayBasicIntersect(cast, transform)
        }.`,
      );
    }
    if (arrayHasSame(replace, transform)) {
      throw new ValidationError(
        `'replace' has same keys as 'transform': ${
          arrayBasicIntersect(replace, transform)
        }.`,
      );
    }
    return this;
  }
  /**
   * @name validateData
   * @private
   * @method
   * @throws Error
   * @returns {Vicis}
   */
  public validateData() {
    if (this.__dataOriginal === undefined) {
      return this;
    }
    if (
      "toObject" in this.__dataOriginal &&
      isFunction(this.__dataOriginal.toObject)
    ) {
      this.__dataCache = (this.__dataOriginal.toObject as () => IObject)();
    } else if (
      "toJSON" in this.__dataOriginal && isFunction(this.__dataOriginal.toJSON)
    ) {
      this.__dataCache = (this.__dataOriginal.toJSON as () => IObject)();
    } else {
      this.__dataCache = this.__dataOriginal;
    }
    this.__dataCache = omitData(this.__omit, this.__dataCache);
    this.__dataCache = defaultsData(this.__defaults, this.__dataCache);
    this.__dataCache = nullishData(this.__nullish, this.__dataCache);
    this.__dataCache = requiredData(this.__required, this.__dataCache);
    this.__dataCache = definedData(this.__defined, this.__dataCache);
    this.__dataCache = castData(this.__cast, this.__dataCache);
    this.__dataCache = transformData(this.__transform, this.__dataCache);
    this.__dataCache = replaceData(this.__replace, this.__dataCache);
    this.__dataCache = renameData(this.__rename, this.__dataCache);
    this.__dataCache = pickData(this.__pick, this.__dataCache);
    this.__dataCache = excludeData(this.__exclude, this.__dataCache);
    this.__dataCache = castToJson(this.__dataCache, this.__sort);
    this.__dataCache = orderData(this.__order, this.__dataCache, this.__sort);
    return this;
  }
  //#endregion

  //#region Initialization Methods
  /**
   * @name constructor
   * @public
   * @constructor
   * @param {Function|Object=} config
   * @param {Object=} data
   * @throws AggregateError
   */
  constructor(config: IConfig = {}, data?: IObject) {
    this.__cast = objectCreateEmpty() as unknown as ICast;
    this.__defaults = objectCreateEmpty() as unknown as IDefaults;
    this.__nullish = objectCreateEmpty() as unknown as INullish;
    this.__defined = [];
    this.__exclude = [];
    this.__omit = [];
    this.__order = [];
    this.__pick = [];
    this.__rename = objectCreateEmpty() as unknown as IRename;
    this.__replace = <IReplace> objectCreateEmpty();
    this.__required = [];
    this.__sort = ESort.Default;
    this.__transform = objectCreateEmpty() as unknown as ITransform;
    this.__dataCache = objectCreateEmpty() as unknown as IObject;
    this.__dataOriginal = undefined;
    this.config(config);
    if (data !== undefined) {
      this.data(data);
    }
  }

  //#endregion

  //#region Static Methods
  /**
   * @name factory
   * @public
   * @static
   * @factory
   * @param {Function|Object=} config
   * @param {Object=} data
   * @returns {Vicis}
   */
  static factory(config?: IConfig, data?: IObject) {
    return new Vicis(config, data);
  }

  /**
   * @name from
   * @public
   * @static
   * @throws TypeError
   * @param {Object} data
   * @param {Object=} config
   * @returns {Object}
   */
  static from(data: IObject, config?: IConfig) {
    return Vicis.factory(config, data).getData();
  }

  /**
   * @name fromArray
   * @static
   * @public
   * @param {Array.<Object>} collection
   * @param {Object=} config
   * @returns {Array.<Object>}
   */
  static fromArray(collection: IObject[], config?: IConfig) {
    const serializer = Vicis.factory(config);
    return Array.from(collection).map((data) =>
      serializer.data(data).getData()
    );
  }

  /**
   * @name BOOLEAN
   * @public
   * @static
   * @type {String}
   */
  static get BOOLEAN(): ECastType {
    return ECastType.BOOLEAN;
  }

  /**
   * @name FLAG
   * @public
   * @static
   * @type {String}
   */
  static get FLAG(): ECastType {
    return ECastType.FLAG;
  }

  /**
   * @name NUMERIC
   * @public
   * @static
   * @type {String}
   */
  static get NUMERIC(): ECastType {
    return ECastType.NUMERIC;
  }

  /**
   * @name INTEGER
   * @public
   * @static
   * @type {String}
   */
  static get INTEGER(): ECastType {
    return ECastType.INTEGER;
  }

  /**
   * @name STRING
   * @public
   * @static
   * @type {String}
   */
  static get STRING(): ECastType {
    return ECastType.STRING;
  }

  /**
   * @name JSON
   * @public
   * @static
   * @type {String}
   */
  static get JSON(): ECastType {
    return ECastType.JSON;
  }

  //#endregion

  //#region Public Config Methods
  /**
   * @name getConfig
   * @public
   * @returns {Object}
   */
  getConfig() {
    return clone({
      cast: this.__cast,
      defaults: this.__defaults,
      defined: this.__defined,
      exclude: this.__exclude,
      nullish: this.__nullish,
      omit: this.__omit,
      order: this.__order,
      pick: this.__pick,
      sort: this.__sort,
      rename: this.__rename,
      replace: this.__replace,
      required: this.__required,
      transform: this.__transform,
    });
  }

  /**
   * @name resetConfig
   * @public
   * @returns {Vicis}
   */
  resetConfig() {
    this.__cast = {};
    this.__defaults = {};
    this.__defined = [];
    this.__exclude = [];
    this.__omit = [];
    this.__order = [];
    this.__pick = [];
    this.__sort = ESort.Default;
    this.__rename = {};
    this.__replace = {};
    this.__required = [];
    this.__transform = {};
    return this;
  }

  /**
   * @name testConfig
   * @public
   * @static
   * @throws AggregateError
   * @param {Function|Object=} config
   * @returns {Object}
   * @since 1.6.0
   */
  static testConfig(config: IConfig): IConfigObject {
    let configFull: IConfigObjectFull;
    if (isFunction(config)) {
      configFull = convertFunctionToConfig(config as IFunction);
    } else {
      configFull = config as unknown as IConfigObjectFull;
    }
    if (!checkIsObjectLike(configFull)) {
      throw new AggregateError(
        [new TypeError("Config should be an object")],
        "Configuration has errors",
      );
    }
    const diff = arrayGetDifference(objectGetKeys(configFull), CONFIG_FIELDS);
    if (diff.length) {
      throw new AggregateError(
        [new TypeError(`Config has unknown fields: '${diff.join("', '")}'.`)],
        "Configuration has errors",
      );
    }
    const cast = objectGetKeys(objectGetProperty(configFull, "cast", {}));
    const rename = objectGetKeys(objectGetProperty(configFull, "rename", {}));
    const replace = objectGetKeys(objectGetProperty(configFull, "replace", {}));
    const transform = objectGetKeys(
      objectGetProperty(configFull, "transform", {}),
    );
    const errors = [];
    if ("omit" in configFull && arrayHasSame(configFull.omit as IOmit, cast)) {
      errors.push(
        new ValidationError(
          `'omit' has same keys as 'cast': ${
            arrayBasicIntersect(configFull.omit as IOmit, cast)
          }.`,
        ),
      );
    }
    if (
      "omit" in configFull && "defined" in configFull &&
      arrayHasSame(configFull.omit as IOmit, configFull.defined as IDefined)
    ) {
      errors.push(
        new ValidationError(
          `'omit' has same keys as 'defined': ${
            arrayBasicIntersect(configFull.omit as IOmit, configFull.defined as IDefined)
          }.`,
        ),
      );
    }
    if (
      "omit" in configFull && "pick" in configFull &&
      arrayHasSame(configFull.omit as IOmit, configFull.pick as IPick)
    ) {
      errors.push(
        new ValidationError(
          `'omit' has same keys as 'pick': ${
            arrayBasicIntersect(configFull.omit as IOmit, configFull.pick as IPick)
          }.`,
        ),
      );
    }
    if ("omit" in configFull && arrayHasSame(configFull.omit as IOmit, rename)) {
      errors.push(
        new ValidationError(
          `'omit' has same keys as 'rename': ${
            arrayBasicIntersect(configFull.omit as IOmit, rename)
          }.`,
        ),
      );
    }
    if ("omit" in configFull && arrayHasSame(configFull.omit as IOmit, replace)) {
      errors.push(
        new ValidationError(
          `'omit' has same keys as 'replace': ${
            arrayBasicIntersect(configFull.omit as IOmit, replace)
          }.`,
        ),
      );
    }
    if (
      "omit" in configFull && "required" in configFull &&
      arrayHasSame(configFull.omit as IOmit, configFull.required as IRequired)
    ) {
      errors.push(
        new ValidationError(
          `'omit' has same keys as 'required': ${
            arrayBasicIntersect(configFull.omit as IOmit, configFull.required as IRequired)
          }.`,
        ),
      );
    }
    if ("omit" in configFull && arrayHasSame(configFull.omit as IOmit, transform)) {
      errors.push(
        new ValidationError(
          `'omit' has same keys as 'transform': ${
            arrayBasicIntersect(configFull.omit as IOmit, transform)
          }.`,
        ),
      );
    }
    if (arrayHasSame(cast, replace)) {
      errors.push(
        new ValidationError(
          `'cast' has same keys as 'replace': ${
            arrayBasicIntersect(cast, replace)
          }.`,
        ),
      );
    }
    if (arrayHasSame(cast, transform)) {
      errors.push(
        new ValidationError(
          `'cast' has same keys as 'transform': ${
            arrayBasicIntersect(cast, transform)
          }.`,
        ),
      );
    }
    if (arrayHasSame(replace, transform)) {
      errors.push(
        new ValidationError(
          `'replace' has same keys as 'transform': ${
            arrayBasicIntersect(replace, transform)
          }.`,
        ),
      );
    }
    if (errors.length) {
      throw new AggregateError(
        errors,
        [
          "Configuration has errors.",
          ...errors.map((error, index) => `${index + 1}). ${error.message}`),
        ].join("\n"),
      );
    }
    return { ...configFull };
  }

  /**
   * @name config
   * @public
   * @throws AggregateError|TypeError
   * @param {Function|Object=} config
   * @returns {Vicis}
   */
  config(config: IConfig = {}) {
    let configFull: IConfigObjectFull;
    if (isFunction(config)) {
      configFull = convertFunctionToConfig(config as IFunction);
    } else {
      configFull = config as unknown as IConfigObjectFull;
    }
    if (!checkIsObjectLike(configFull)) {
      throw new TypeError("Config should be an object");
    }
    const diff = arrayGetDifference(objectGetKeys(configFull), CONFIG_FIELDS);
    if (diff.length) {
      throw new TypeError(`Config has unknown fields: '${diff.join("', '")}'.`);
    }
    Vicis.testConfig(configFull);
    this.resetConfig();
    this.sort(configFull.sort);
    this.omit(configFull.omit);
    this.defaults(configFull.defaults);
    this.nullish(configFull.nullish);
    this.cast(configFull.cast);
    this.defined(configFull.defined);
    this.pick(configFull.pick);
    this.rename(configFull.rename);
    this.replace(configFull.replace);
    this.required(configFull.required);
    this.transform(configFull.transform);
    this.exclude(configFull.exclude);
    this.order(configFull.order);
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name cast
   * @public
   * @throws TypeError
   * @param {Object=} propertyToType
   * @returns {Vicis}
   */
  cast(propertyToType: ICast = {}) {
    this.__cast = castConfig(propertyToType);
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name defaults
   * @public
   * @throws TypeError
   * @param {Object=} propertyDefaultValues
   * @returns {Vicis}
   */
  defaults(propertyDefaultValues: IDefaults = {}) {
    this.__defaults = defaultsConfig(propertyDefaultValues); // do not deep clone!
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name defined
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesMustBeDefined
   * @returns {Vicis}
   */
  defined(propertiesMustBeDefined: IDefined = []) {
    this.__defined = definedConfig(propertiesMustBeDefined);
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name exclude
   * @public
   * @throws TypeError
   * @param {Array.<string|RegExp>=} propertiesToExclude
   * @returns {Vicis}
   */
  exclude(propertiesToExclude: IExclude = []) {
    this.__exclude = excludeConfig(propertiesToExclude);
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name nullish
   * @public
   * @throws TypeError
   * @param {Object=} propertyNullishValues
   * @returns {Vicis}
   */
  nullish(propertyNullishValues: INullish = {}) {
    this.__nullish = nullishConfig(propertyNullishValues); // do not deep clone!
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name omit
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesToOmit
   * @returns {Vicis}
   */
  omit(propertiesToOmit: IOmit = []) {
    this.__omit = omitConfig(propertiesToOmit);
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name order
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesToStreamline
   * @returns {Vicis}
   */
  order(propertiesToStreamline: IOrder = []) {
    this.__order = orderConfig(propertiesToStreamline);
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name pick
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesToPick
   * @returns {Vicis}
   */
  pick(propertiesToPick: IPick = []) {
    this.__pick = pickConfig(propertiesToPick);
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name rename
   * @public
   * @throws TypeError
   * @param {Object=} renamePropertyFromTo
   * @returns {Vicis}
   */
  rename(renamePropertyFromTo: IRename = {}) {
    this.__rename = renameConfig(renamePropertyFromTo);
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name replace
   * @public
   * @throws TypeError
   * @param {Object=} replacePropertyValues
   * @returns {Vicis}
   */
  replace(replacePropertyValues: IReplace = {}) {
    this.__replace = replaceConfig(replacePropertyValues); // do not deep clone!
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name required
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesRequired
   * @returns {Vicis}
   */
  required(propertiesRequired: IRequired = []) {
    this.__required = requiredConfig(propertiesRequired);
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name sort
   * @public
   * @throws TypeError
   * @param {boolean=} sortProperties
   * @returns {Vicis}
   */
  sort(sortProperties: boolean | ESort = ESort.Default): Vicis {
    if (
      typeof sortProperties !== "boolean" &&
      !(Object.values(ESort).includes(sortProperties as ESort))
    ) {
      throw new TypeError("'sort' should be a boolean");
    }
    if (sortAsBoolean(sortProperties)) {
      this.__sort = ESort.Yes;
    } else {
      this.__sort = ESort.No;
    }
    this.validateData();
    return this;
  }

  /**
   * @name transform
   * @public
   * @throws TypeError
   * @param {Object=} propertyValueTransformWith
   * @returns {Vicis}
   */
  transform(propertyValueTransformWith: ITransform = {}): Vicis {
    this.__transform = transformConfig(propertyValueTransformWith); // do not deep clone!
    this.validateConfig();
    this.validateData();
    return this;
  }

  //#endregion

  //#region Public Data Methods
  /**
   * @name getData
   * @public
   * @returns {Object}
   */
  getData(): IObject {
    return <IObject> clone(this.__dataCache);
  }

  /**
   * @name data
   * @public
   * @throws TypeError
   * @param {Object} dataToSerialize
   * @returns {Vicis}
   */
  data(dataToSerialize: IObject): Vicis {
    if (!checkIsObjectLike(dataToSerialize)) {
      throw new TypeError("Data should be an object");
    }
    this.__dataOriginal = dataToSerialize; // keep reference
    this.validateData();
    return this;
  }

  /**
   * @name clear
   * @description Clear any data references and cached values
   * @public
   * @returns {Vicis}
   */
  clear(): Vicis {
    this.__dataCache = objectCreateEmpty();
    this.__dataOriginal = undefined;
    return this;
  }

  //#endregion

  //#region Public Main Methods
  /**
   * @name toJSON
   * @public
   * @returns {Object}
   */
  toJSON(): IObject {
    return this.getData();
  }

  /**
   * @name toString
   * @public
   * @returns {string}
   */
  toString(): string {
    return jsonStringify(this.toJSON());
  }

  /**
   * @name fromArray
   * @public
   * @param {Array.<Object>} collection
   * @returns {Array.<Object>}
   */
  fromArray(collection: IObject[]): IObject[] {
    return Array.from(collection).map((data) => this.data(data).toJSON());
  }

  //#endregion
}
