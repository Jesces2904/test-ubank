import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MenuComponent } from './menu/menu.component';

@NgModule({
    declarations: [MenuComponent],
    exports: [MenuComponent],
    imports: [CommonModule, IonicModule, RouterModule, FormsModule, ReactiveFormsModule],
    providers: []
})
export class ComponentsModule {}
