import { LineSystemFunction, ParabolicSystemFunction } from './types-system-function/export-types-system-function';
/**
 * enum типов фабрик функций
 */
const SystemFunctionTypes = {
    line: 0,
    parabolic: 1
}

/**
 * Фабрика функций для расчетов
 * 
 * @class SystemFunctionFactory
 */
class SystemFunctionFactory {
    /**
     *  
     * @type {Array}
     * @memberOf SystemFunctionFactory
     */
    _factories;

    static _instance;

    constructor() { 
        this._factories = {};
        this._factories[SystemFunctionTypes.line] = LineSystemFunction;
        this._factories[SystemFunctionTypes.parabolic] = ParabolicSystemFunction;
    }

    /**
     * @returns {SystemFunctionFactory}
     */
    static instance() { 
        if (!this._instance) { 
            this._instance = new SystemFunctionFactory();
        }
        return this._instance;
    }

    /**
     * 
     * 
     * @param {any} systemFactoryType
     * @param {any} params
     * @returns
     * 
     * @memberOf SystemFunctionFactory
     */
    create(systemFunctionType, params) { 
        return new this._factories[systemFunctionType](params);
    }
}

export { SystemFunctionTypes, SystemFunctionFactory }