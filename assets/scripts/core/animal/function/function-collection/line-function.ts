/**
 * Created by FIRCorp on 19.02.2017.
 */
namespace Animals.Functions {
    /**
     * Линейная функция
     */
    export class LineFunction implements IFunction {
        /**
         * Коэффицент
         * @type {Number}
         */
        private _coefficient: number;

        /**
         * Свободный коэффицент
         * @type {Number}
         */
        private _free: number;

        /**
         * Constructor of LineFunction
         * @param params массив параметров функции
         */
        constructor(params: number[]) {
            this._coefficient = params[0] || 0;
            this._free = params[1] || 0;
        }

        set coefficient(param: number) {
            this._coefficient = param ? param : 0;
        }

        set free(param: number) {
            this._free = param ? param : 0;
        }

        get coefficient(): number {
            return this._coefficient;
        }

        get free(): number {
            return this._free;
        }

        /**
         * Вычисляет функцию
         * @param param переменная
         * @returns {number} результат
         */
        public calculate(param: number): number {
            return this._coefficient * param + this._free;
        }
    }
}