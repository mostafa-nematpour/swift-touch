export default class SwiftTouch {
    st_option
    st_element
    baseOption = {
        delay: 300,
        checkTarget: false,
        checkClickTarget: false,
        checkTouchTarget: false,
        checkTouchMoveTarget: false,
    };

    constructor(element, option) {
        this.st_option = Object.assign(this.baseOption ?? {}, { ...option ?? {} });
        this.st_element = element;
    }

    touch(callBack) {
        /*  touchstart >> touchscreen device
            mousedown  >> desktop     device
        */
        const eventName = 'ontouchstart' in window ? "touchstart" : "mousedown";
        this.st_element.addEventListener(eventName, (event) => {
            if (this.#checkEventTarget(event, this.baseOption.checkTouchTarget)) {
                event.stopPropagation();
            } else {
                callBack(event)
            }
        });
    }

    touchMove(callBack) {
        let isDragging = false;
        let isMobile = 'ontouchstart' in window;
        const data = { st_type: "touchMove" };

        const innerTouchHandler = (event) => {
            data.type = event.type;
            const touchEventData = isMobile ? event.touches[0] || event.changedTouches[0] : event;
            if (touchEventData) {
                data.pageX = touchEventData.pageX;
                data.pageY = touchEventData.pageY;
                data.clientX = touchEventData.clientX;
                data.clientY = touchEventData.clientY;
                data.screenX = touchEventData.screenX;
                data.screenY = touchEventData.screenY;
            }
            this.#touchMoveHandel(data, event, callBack);
        }

        if (isMobile) {
            this.st_element.addEventListener('touchmove', innerTouchHandler);
        } else {
            this.st_element.addEventListener('mousedown', () => { isDragging = true });
            this.st_element.addEventListener('mouseup', () => { isDragging = false });
            this.st_element.addEventListener('mousemove', (event) => {
                if (isDragging) {
                    innerTouchHandler(event);
                    event.preventDefault();
                }
            });
        }
    }

    #touchMoveHandel(data, event, callBack) {
        if (this.#checkEventTarget(event, this.baseOption.checkTouchMoveTarget)) {
            event.stopPropagation();
        } else {
            callBack(data, event)
        }
    }

    click(callBack) {
        this.st_element.addEventListener('click', (event) => {
            if (this.#checkEventTarget(event, this.baseOption.checkClickTarget)) {
                event.stopPropagation();
            } else {
                callBack(event);
            }
        });
    }

    #checkEventTarget(event, eventFlag = false) {
        return (this.baseOption.checkTarget || eventFlag) && event.target !== event.currentTarget;
    }
}
