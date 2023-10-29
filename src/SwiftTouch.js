export default class SwiftTouch {
    st_option
    st_element
    baseOption = {
        delay: 300,
        checkTarget: false,
        checkClickTarget: false,
        checkTouchTarget: false,
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
            if (this.checkEventTarget(event, this.baseOption.checkTouchTarget)) {
                event.stopPropagation();
            } else {
                callBack(event)
            }
        });
    }

    click(callBack) {
        this.st_element.addEventListener('click', (event) => {
            if (this.checkEventTarget(event, this.baseOption.checkClickTarget)) {
                event.stopPropagation();
            } else {
                callBack(event)
            }
        });
    }

    checkEventTarget(event, eventFlag = false) {
        return (this.baseOption.checkTarget || eventFlag) && event.target !== event.currentTarget;
    }
}
