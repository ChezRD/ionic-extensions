import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { DateTime } from "./input";
import { DateTimeOverlay } from "./overlay";
export { DateTime } from "./input";
var DateTimePickerModule = (function () {
    function DateTimePickerModule() {
    }
    return DateTimePickerModule;
}());
export { DateTimePickerModule };
DateTimePickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DateTime, DateTimeOverlay],
                exports: [DateTime],
                imports: [IonicModule],
                entryComponents: [DateTimeOverlay]
            },] },
];
/** @nocollapse */
DateTimePickerModule.ctorParameters = function () { return []; };
//# sourceMappingURL=index.js.map