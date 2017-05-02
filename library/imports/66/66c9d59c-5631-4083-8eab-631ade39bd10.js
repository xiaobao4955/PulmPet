'use strict';

/**
 *
 */
cc.Class({
    extends: cc.Component,

    properties: {
        _model: null, //модель животного

        _maxBiasTouch: 15, //максимальное смещение тача для открытия меню (px)
        _pointTouchForMenu: cc.v2, //точка старта тача по животному

        _isMove: false, //флаг для определения движется ли живоное за пользователем
        _isOpenMenu: false },

    onLoad: function onLoad() {
        this._isOpenMenu = false;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoveAnimal.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStartAnimal.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEndAnimal.bind(this));
    },


    /**
     * Настраивает доступные действия плюшки для животного и характеристики
     */
    settings: function settings(model) {
        this._model = model;
        cc.log(this.node.children);
        this.settingCollider(this._model.navigation.radiusVision, this.node.children[0].getComponent(cc.CircleCollider));
        this.settingCollider(this._model.navigation.radiusHearing, this.node.children[1].getComponent(cc.CircleCollider));
        this.settingCollider(this._model.navigation.radiusSmell, this.node.children[2].getComponent(cc.CircleCollider));
        this.settingCollider(this._model.navigation.radiusTouch, this.node.children[3].getComponent(cc.CircleCollider));
    },


    /**
     * Настраивает коллайдеры у животного согласно его модели
     * @method settingCollider
     * @param {Animals.Systems.ISystem} system
     * @param {cc.CircleCollider} component
     */
    settingCollider: function settingCollider(system, component) {
        system === undefined ? component.radius = 0 : component.radius = system.current;
    },


    /**
     * Обработчик события начала тача
     * @param event
     * @private
     */
    _onTouchStartAnimal: function _onTouchStartAnimal(event) {
        var myEvent = new cc.Event.EventCustom('startMotionAnimal', true);
        myEvent.detail = {
            startMotion: cc.v2(this.node.x, this.node.y),
            controller: this
        };
        this.node.dispatchEvent(myEvent); //разослали евент
        this._isMove = false; //животное не движется за пользователем
        this._pointTouchForMenu = event.getLocation(); //считали точку первого нажатия
        event.stopPropagation();
    },


    /**
     * Обработчик события движения тача.
     * @param event
     * @private
     */
    _onTouchMoveAnimal: function _onTouchMoveAnimal(event) {
        //   cc.log(event);
        var delta = event.touch.getDelta();
        if (this._isCheckOnOpenMenu(event.getLocation()) && !this._isOpenMenu) {
            this._isMove = true;
            var myEvent = new cc.Event.EventCustom('motionAnimal', true);
            myEvent.detail = {
                deltaMotion: delta,
                pointEnd: event.getLocation()
            };
            this.node.dispatchEvent(myEvent);
        }
        event.stopPropagation();
    },


    /**
     * Обработчик события завершения тача
     * @param event
     * @private
     */
    _onTouchEndAnimal: function _onTouchEndAnimal(event) {
        if (this._isMove) {
            var myEvent = new cc.Event.EventCustom('endMotionAnimal', true);
            myEvent.detail = {
                pointEnd: event.getLocation()
            };
            this.node.dispatchEvent(myEvent);
            this._isMove = false;
        } else {
            this._refocusMenu();
        }
        event.stopPropagation();
    },


    /**
     * Проверяет открывается меню или нет. Путем сканирования точки тача на выходза пределы от начапльной точки
     * @param point
     * @return {boolean}
     * @private
     */
    _isCheckOnOpenMenu: function _isCheckOnOpenMenu(point) {
        var X = Math.abs(this._pointTouchForMenu.x - point.x) > this._maxBiasTouch;
        var Y = Math.abs(this._pointTouchForMenu.y - point.y) > this._maxBiasTouch;
        return X || Y;
    },


    /**
     * Изменяет состояние меню
     * @private
     */
    _refocusMenu: function _refocusMenu() {
        this._isOpenMenu = !this._isOpenMenu;
        this._isOpenMenu ? this._publishOpenMenuAnimal() : this._publishCloseMenuAnimal();
    },


    /**
     * Открытие меню животного
     */
    _publishOpenMenuAnimal: function _publishOpenMenuAnimal() {
        var myEvent = new cc.Event.EventCustom('openMenuAnimal', true);
        myEvent.detail = {
            controller: this
        };
        this.node.dispatchEvent(myEvent);
    },


    /**
     * Закрыто меню с животными
     */
    _publishCloseMenuAnimal: function _publishCloseMenuAnimal() {
        var myEvent = new cc.Event.EventCustom('closeMenuAnimal', true);
        myEvent.detail = {
            controller: this
        };
        this.node.dispatchEvent(myEvent);
    },


    /**
     * Открытие меню
     */
    openMenu: function openMenu() {
        this._isOpenMenu = true;
        this._publishOpenMenuAnimal();
    },


    /**
     * Закрыть меню
     */
    closeMenu: function closeMenu() {
        this._isOpenMenu = false;
        this._publishCloseMenuAnimal();
    },


    /**
     * Сообщает модели до какой точки надо дойти
     * @param point
     */
    moveToPoint: function moveToPoint(point) {
        this._model.moveToPoint(point);
    },


    /**
     * Запускает жизнь животного
     * @method run
     */
    run: function run() {
        this._model.runLife();
    },


    /**
     * Подать звук
     */
    runVoice: function runVoice() {},


    /**
     * Сесть
     */
    runSit: function runSit() {},


    /**
     * Испугаться
     */
    runFrighten: function runFrighten() {},


    /**
     * Показать ареалы
     */
    runAreal: function runAreal() {},


    /**
     * Поласкаться
     */
    runCare: function runCare() {},


    /**
     * Лечь
     */
    runLie: function runLie() {},


    /**
     * Приготовиться
     */
    runAttention: function runAttention() {},


    /**
     * Возвращает массив характеристик у животного
     * @return {*|any}
     */
    getCharacteristics: function getCharacteristics() {
        return this._model.getCharacteristics();
    }
});