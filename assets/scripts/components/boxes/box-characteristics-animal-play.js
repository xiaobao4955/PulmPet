import { BoxLeft } from './box-samples/box-vertycal-left';
/**
 * Бокс характеристик не предназначен для управление пользователем
 * @type {Function}
 */
var BoxCharacteristicsAnimal = cc.Class({
    extends: BoxLeft,

    /**
     * Устанавливает начальные позиции и производит вычисление длинны
     */
    _settings() {
        let canvas = cc.director.getWinSizeInPixels();
        let sizeBoxY = this._getSizeBox(canvas.height);
        this.node.y = sizeBoxY / 2 + this.indentRight;
        this.node.height = sizeBoxY;
        this._startPos = cc.v2(this.node.x, this.node.y);
        this._endPos = cc.v2(this.node.x + this.node.width, this.node.y);
        this._amountPix = Math.abs(this._endPos.x - this._startPos.x);
    },

    onLoad(){
        this._settings();
    },

    /**
     * Публикует событие открытие бокса в контроллере
     */
    publishEventOpen(){
        this.node.dispatchEvent(new cc.Event('openBoxFromCharacteristicsAnimal', true));
    },

    /**
     * Публикует событие закрыие бокса в контроллере
     */
    publishEventClose(){
        this.node.dispatchEvent(new cc.Event('closeBoxFromCharacteristicsAnimal', true));
    },
});