import { PrimitiveState } from '../../../../state-machine/states/export-states';
import { Animal } from '../../animal';

export class Stand extends PrimitiveState{
    /**
     * @type {Animal}
     * @memberOf Stand
     */
    _model;
    
    constructor(name, model, isEndPoint = false, routeEngine = null) {
        super(name, model, isEndPoint, routeEngine);
        
    }
    run(){
        cc.log('стою');
        this._model._circulatory.changeHeartbeat(-0.7);
        this._model._circulatory.changePressure(-0.2);
        this._model._muscular.changeSpeed(0.5);
        this._model._muscular.changeWeight(0.7);
        
    }

}