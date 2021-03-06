import { Component, ElementRef, ViewEncapsulation, ViewChild, Renderer2, Input, Optional } from "@angular/core";
import { NgControl } from "@angular/forms";
import { Item } from "ionic-angular";
import "trix";
import { EventListenersHelper } from "../helpers/event-listeners-helper";
var TrixEditor = (function () {
    function TrixEditor(element, renderer, formControl, item) {
        this.element = element;
        this.renderer = renderer;
        this.formControl = formControl;
        this.item = item;
        this.eventListeners = new EventListenersHelper();
        if (formControl) {
            this.formControl.valueAccessor = this;
        }
    }
    Object.defineProperty(TrixEditor.prototype, "value", {
        get: function () {
            return this.editor.nativeElement.value;
        },
        set: function (html) {
            this.editor.nativeElement.value = html;
        },
        enumerable: true,
        configurable: true
    });
    TrixEditor.prototype.registerOnValidatorChange = function (fn) {
    };
    TrixEditor.prototype.setDisabledState = function (isDisabled) {
    };
    TrixEditor.prototype.ngOnChanges = function (changes) {
    };
    TrixEditor.prototype.writeValue = function (currentValue) {
        this.value = currentValue;
    };
    TrixEditor.prototype.registerOnChange = function (fn) {
        this.controlOnChange = fn;
    };
    TrixEditor.prototype.registerOnTouched = function (fn) {
        this.controlOnTouched = fn;
    };
    TrixEditor.prototype.validate = function (c) {
        return null;
    };
    TrixEditor.prototype.editorChanged = function (event) {
        if (this.controlOnChange) {
            this.controlOnChange(this.value);
        }
    };
    TrixEditor.prototype.initFocus = function () {
    };
    TrixEditor.prototype.editorFocused = function (event) {
        if (this.controlOnTouched) {
            this.controlOnTouched(true);
        }
        if (this.item) {
            this.renderer.addClass(this.item.getNativeElement(), "input-has-focus");
        }
    };
    TrixEditor.prototype.editorBlured = function (event) {
        if (this.item) {
            this.renderer.removeClass(this.item.getNativeElement(), "input-has-focus");
        }
    };
    TrixEditor.prototype.resetControlCss = function () {
        var classes = {
            "ng-untouched": this.formControl.untouched,
            "ng-touched": this.formControl.touched,
            "ng-pristine": this.formControl.pristine,
            "ng-dirty": this.formControl.dirty,
            "ng-valid": this.formControl.valid,
            "ng-invalid": !this.formControl.valid
        };
        var elements = [];
        elements.push(this.element.nativeElement);
        if (this.item) {
            elements.push(this.item.getNativeElement());
        }
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var e = elements_1[_i];
            for (var c in classes) {
                if (classes[c]) {
                    this.renderer.addClass(e, c);
                }
                else {
                    this.renderer.removeClass(e, c);
                }
            }
        }
    };
    TrixEditor.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.eventListeners.add(this.editor.nativeElement, "trix-change", function (event) { return _this.editorChanged(event); });
        this.eventListeners.add(this.editor.nativeElement, "trix-focus", function (event) { return _this.editorFocused(event); });
        this.eventListeners.add(this.editor.nativeElement, "trix-blur", function (event) { return _this.editorBlured(event); });
    };
    TrixEditor.prototype.ngAfterContentChecked = function () {
        this.resetControlCss();
    };
    TrixEditor.prototype.ngOnDestroy = function () {
        this.eventListeners.removeAll();
    };
    return TrixEditor;
}());
export { TrixEditor };
TrixEditor.decorators = [
    { type: Component, args: [{
                selector: "ionx-trix-editor",
                template: "<trix-editor #editor></trix-editor>",
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
TrixEditor.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: NgControl, decorators: [{ type: Optional },] },
    { type: Item, decorators: [{ type: Optional },] },
]; };
TrixEditor.propDecorators = {
    'editor': [{ type: ViewChild, args: ["editor",] },],
    'value': [{ type: Input },],
};
//# sourceMappingURL=editor.js.map