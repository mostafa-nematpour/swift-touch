export default class SwiftTouch {
    sf_option
    sf_element
    baseOption = {
        delay: 300
    };

    constructor(element, option) {
        this.sf_option = Object.assign(this.baseOption ?? {}, { ...option ?? {} });
        this.sf_element = element;
    }

    touch(callBack) {
        if ('ontouchstart' in window) {
            // It's a touchscreen device
            this.sf_element.addEventListener("touchstart", (evt) => {
                callBack(evt);
            });
        } else {
            // It's a desktop device
            this.sf_element.addEventListener("mousedown", (evt) => {
                callBack(evt);
            });
        }


    }
}
