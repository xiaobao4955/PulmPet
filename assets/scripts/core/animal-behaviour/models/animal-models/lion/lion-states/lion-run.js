import { PrimitiveState } from '../../../../state-machine/states/export-states';
import { Animal } from '../../animal';

export class LionRun extends PrimitiveState {
    /**
     * @type {Animal}
     * @memberOf Run
     */
    _model;

    constructor(name, model, isEndPoint = false, routeEngine = null) {
        super(name, model, isEndPoint, routeEngine);

    }
    /**
     * @returns {Promise}
     * 
     * @memberOf LionRun
     */
    run() {
        let resolveFn, rejectFn;
        let promise = new Promise((resolve, reject) => {
            resolveFn = resolve;
            rejectFn = reject;
        });
        cc.log('бегу');
        this._model._circulatory.changeHeartbeat(0.5);
        this._model._circulatory.changePressure(0.2);
        this._model._muscular.changeSpeed(-0.4);
        this._model._muscular.changeWeight(-0.5);
        setTimeout(() => { resolveFn(); }, 4000);
        return promise;

    }

}