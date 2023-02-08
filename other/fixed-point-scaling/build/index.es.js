/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function log() {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    console.log.apply(console, arg);
}
var FixedPointScaling = /** @class */ (function () {
    function FixedPointScaling(options) {
        /**
         * 是否把滚轮时间绑定在target上，true 绑定在target上，false绑定在window上
         * @true 需要鼠标移动到target区域内才会缩放
         * @false 只要移动滚轮就会缩放
         */
        this.bindWheelEventOnTarget = true;
        /**
         * 缩放时需不需要同时按下 ctrl
         */
        this.isScaleNeedCtrl = true;
        /**
         * 禁止window缩放
         */
        this.disableWindowScale = true;
        /**
         * 是否正在拖拽
         */
        this.isDragging = false;
        /**
         * 拖拽开始 按下鼠标时的 translate 值
         */
        this.draggingSrcTranslate = { x: 0, y: 0 };
        /**
         * 当前的 translate
         */
        this.translate = { x: 0, y: 0 };
        /**
         * 按下鼠标时鼠标相对浏览器窗口的位置
         */
        this.cursorSrcPos = { x: 0, y: 0 }; // left top
        /**
         * 缩放倍数
         */
        this.scale = 1;
        /**
         * 缩放step
         */
        this.scaleStep = 0.1;
        /**
         * 最小缩放比例
         */
        this.minScale = 0.05;
        /**
         * 是否使用动画过度
         */
        this.transition = 'none';
        /**
         * 是否显示transform的状态信息 dev 时使用
         */
        this.logTransformInfo = false;
        /**
         * 是否使用允许键盘来缩放目标
         */
        this.enableKeyboardScale = false;
        /**
         * 未拖拽时的鼠标样式
         */
        this.normalCursorType = 'default';
        /**
         * 拖拽时的鼠标样式
         */
        this.draggingCursorType = 'grab';
        /**
         * 当transform状态发生变化时的监听函数
         */
        this.onTransformChange = undefined;
        this.target = options.target;
        this.bindWheelEventOnTarget = !!options.bindWheelEventOnTarget;
        this.disableWindowScale = !!options.disableWindowScale;
        this.isScaleNeedCtrl = !!options.isScaleNeedCtrl;
        this.scaleStep = options.scaleStep || 0.1;
        this.minScale = options.minScale || 0.05;
        this.logTransformInfo = !!options.logTransformInfo;
        this.onTransformChange = options.onTransformChange;
        this.enableKeyboardScale = !!options.enableKeyboardScale;
        if (options.draggingCursorType)
            this.draggingCursorType = options.draggingCursorType;
        if (options.transition === false || options.transition === void 0)
            this.transition = 'none';
        else {
            if (typeof this.transition === 'string') {
                this.transition = options.transition;
            }
            else {
                this.transition = 'transform 0.1s';
            }
        }
        this.init();
        this.run();
    }
    /**
     * 初始化一些信息
     */
    FixedPointScaling.prototype.init = function () {
        if (!(this.target instanceof HTMLElement)) {
            throw new Error('请绑定容器');
        }
        var target = this.target;
        target.style.transformOrigin = '0 0'; // origin 设置为左上角
        target.style.transition = this.transition;
    };
    /**
     * 开始运行
     */
    FixedPointScaling.prototype.run = function () {
        this.applyListeners();
    };
    FixedPointScaling.prototype.checkCursorInTarget = function (e) {
        var _a = this.target.getBoundingClientRect(), left = _a.left, top = _a.top, width = _a.width, height = _a.height;
        var cursorPos = {
            x: e.clientX,
            y: e.clientY,
        };
        if (cursorPos.x < left ||
            cursorPos.x > left + width ||
            cursorPos.y < top ||
            cursorPos.y > top + height)
            return false;
        return true;
    };
    /**
     * 绑定监听器
     */
    FixedPointScaling.prototype.applyListeners = function () {
        var _this = this;
        var target = this.target;
        // window 发生滚动事件
        this.handleWindowWheel = function (e) {
            e.preventDefault();
        };
        // target 发生鼠标按下事件
        this.handleMouseDown = function (e) {
            var target = _this.target;
            _this.normalCursorType = target.style.cursor;
            target.style.cursor = _this.draggingCursorType;
            _this.isDragging = true;
            _this.draggingSrcTranslate = __assign({}, _this.translate);
            _this.cursorSrcPos = {
                x: e.clientX,
                y: e.clientY,
            };
        };
        // target 发生鼠标移动事件
        this.handleMouseMove = function (e) {
            if (_this.isDragging) {
                var cursorCurrentPos = {
                    x: e.clientX,
                    y: e.clientY,
                };
                // 负值往左，正值往右
                _this.translate = {
                    x: _this.draggingSrcTranslate.x +
                        cursorCurrentPos.x -
                        _this.cursorSrcPos.x,
                    y: _this.draggingSrcTranslate.y +
                        cursorCurrentPos.y -
                        _this.cursorSrcPos.y,
                };
                _this.applyTransform();
            }
        };
        // target 发生鼠标松开事件
        this.handleWindowMouseUp = function (e) {
            _this.isDragging = false;
            target.style.cursor = _this.normalCursorType;
        };
        // target 发生鼠标滚动事件
        this.handleWheel = function (e) {
            if (_this.isScaleNeedCtrl && !e.ctrlKey)
                return;
            e.preventDefault();
            if (_this.bindWheelEventOnTarget && !_this.checkCursorInTarget(e)) {
                log('鼠标不在 target 区域内');
                if (e.deltaY < 0)
                    _this.handleScaleUp();
                else
                    _this.handleScaleDown();
                return;
            }
            // 鼠标相对于浏览器窗口的位置
            var cursorPos = {
                x: e.clientX,
                y: e.clientY,
            };
            var boxEleRect = target.getBoundingClientRect();
            // transform origin 在屏幕中位置
            var originPos = {
                x: boxEleRect.left,
                y: boxEleRect.top,
            };
            // 缩放前的相对位置
            var cursorRelativeBasePosBefore = {
                x: Math.round((cursorPos.x - originPos.x) / _this.scale),
                y: Math.round((cursorPos.y - originPos.y) / _this.scale),
            };
            // 带放大比例的位置
            var cursorRelativePosBefore = {
                x: cursorPos.x - originPos.x,
                y: cursorPos.y - originPos.y,
            };
            // 上滑，放大
            if (e.deltaY < 0) {
                _this.scale = _this.scale + _this.scaleStep;
                // 缩放后的相对位置
                var cursorRelativePosAfter = {
                    x: cursorRelativeBasePosBefore.x * _this.scale,
                    y: cursorRelativeBasePosBefore.y * _this.scale,
                };
                var deltaX = cursorRelativePosAfter.x - cursorRelativePosBefore.x;
                var deltaY = cursorRelativePosAfter.y - cursorRelativePosBefore.y;
                _this.translate = {
                    x: Math.round(_this.translate.x - deltaX),
                    y: Math.round(_this.translate.y - deltaY),
                };
                // -----------------------
            }
            else {
                if (_this.scale - _this.scaleStep > _this.minScale) {
                    _this.scale = _this.scale - _this.scaleStep;
                    // 缩放后的相对位置
                    var cursorRelativePosAfter = {
                        x: cursorRelativeBasePosBefore.x * _this.scale,
                        y: cursorRelativeBasePosBefore.y * _this.scale,
                    };
                    var deltaX = cursorRelativePosBefore.x - cursorRelativePosAfter.x;
                    var deltaY = cursorRelativePosBefore.y - cursorRelativePosAfter.y;
                    _this.translate = {
                        x: Math.round(_this.translate.x + deltaX),
                        y: Math.round(_this.translate.y + deltaY),
                    };
                }
                // -----------------------
            }
            _this.applyTransform();
        };
        this.handleScaleUp = function () { };
        // 键盘缩小
        this.handleScaleDown = function () { };
        target.addEventListener('mousedown', this.handleMouseDown);
        target.addEventListener('mousemove', this.handleMouseMove);
        // 这里需要window级监听，防止鼠标移动到浏览器外松开
        window.addEventListener('mouseup', this.handleWindowMouseUp);
        if (this.bindWheelEventOnTarget) {
            target.addEventListener('wheel', this.handleWheel, {
                passive: false,
            });
        }
        else {
            window.addEventListener('wheel', this.handleWheel, {
                passive: false,
            });
        }
        // 是否禁止全局缩放
        if (this.disableWindowScale) {
            window.addEventListener('wheel', this.handleWindowWheel, {
                passive: false,
            });
        }
    };
    /**
     * 移除事件监听器
     */
    FixedPointScaling.prototype.removeListeners = function () {
        var target = this.target;
        target.removeEventListener('mousedown', this.handleMouseDown);
        target.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleWindowMouseUp);
        window.removeEventListener('wheel', this.handleWindowWheel);
        if (this.bindWheelEventOnTarget) {
            target.removeEventListener('wheel', this.handleWheel);
        }
        else {
            window.removeEventListener('wheel', this.handleWheel);
        }
        log('listeners removed');
    };
    /**
     * 应用transform属性
     */
    FixedPointScaling.prototype.applyTransform = function () {
        this.target.style.transform = "matrix(".concat(this.scale, ", 0, 0, ").concat(this.scale, ", ").concat(this.translate.x, ", ").concat(this.translate.y, ")");
        this.onTransformChange &&
            this.onTransformChange(parseFloat(this.scale.toFixed(2)), this.translate.x, this.translate.y);
        if (this.logTransformInfo) {
            log("translateX: ".concat(this.translate.x, ", translateY: ").concat(this.translate.y, ", scale: ").concat(this.scale));
        }
    };
    return FixedPointScaling;
}());
new FixedPointScaling({
    target: document.querySelector('.box'),
    disableWindowScale: true,
    bindWheelEventOnTarget: false,
    scaleStep: 0.05,
    minScale: 0.05,
    isScaleNeedCtrl: false,
    logTransformInfo: false,
    enableKeyboardScale: true,
    onTransformChange: function (scale, x, y) {
        console.log('onTransformChange', scale, x, y);
    },
});
// 外部控制放大
// 快捷键放大

export { FixedPointScaling as default };
