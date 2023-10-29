export default class SwiftTouch {
    st_option
    st_element
    baseOption = {
        delay: 300
    };

    constructor(element, option) {
        this.st_option = Object.assign(this.baseOption ?? {}, { ...option ?? {} });
        this.st_element = element;
    }

    touch(callBack) {
        /*  touchstart >> touchscreen device
            mousedown  >> desktop     device
        */
        const evtName = 'ontouchstart' in window ? "touchstart" : "mousedown";
        this.st_element.addEventListener(evtName, (evt) => {
            callBack(evt);
        });
    }
}
