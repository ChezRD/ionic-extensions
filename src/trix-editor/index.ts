import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TrixEditor } from "./editor";
import { IonicModule } from "ionic-angular";

export { TrixEditor } from "./editor";

@NgModule({
    declarations: [TrixEditor],
    exports: [TrixEditor],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [IonicModule]
})
export class TrixEditorModule {
}