import { System } from '../systems';
import { CommunicationEvents as Events } from '../../system-communication/events';

class ReproductionSystem extends System {
    constructor() { 
        super();
    }

    onAgeIncrease(param) { 
        console.log(param);
    }
}

export { ReproductionSystem };