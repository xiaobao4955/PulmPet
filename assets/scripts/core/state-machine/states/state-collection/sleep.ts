/**
 * Created by FIRCorp on 31.05.2017.
 */
namespace StateMachines.States {

    /**
     * Состояние - спит на месте
     * @class StateStand
     */
    export class StateSleep extends State {

        /**
         * Creates an instance of StateStand.
         * @param name имя состояния
         * @param model модель животного
         * @param isEndPoint флаг заключительного состояния
         * @param routeEngine обработчик маршрутов между состояниями
         */
        constructor(name: string, model: Animals.Animal, isEndPoint: boolean = false, routeEngine: StateMachines.Routes.RouteEngine = null) {
            super(name, model, routeEngine, isEndPoint);
        }

        /**
         * Запуск состояния
         * @returns {Promise<void>}
         */
        async run(): Promise<void> {
            console.log('сплю');
            this._model.muscular.changeSpeed(0.5);
            this._model.muscular.changeWeight(0.7);
            this._model.circulatory.changeHeartbeat(-0.3);

            await this.mySleep(2);//Ожидание
        }
    }
}