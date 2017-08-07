import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { MdlModule } from '@angular-mdl/core';
import { AppComponent } from './app.component';
import { GeneratorComponent } from './generator/generator.component';
import { EditDialogComponent } from "./editDialog/editDialog.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditDialogService } from './editDialog/editDialog.service';
import { MdlSelectModule } from '@angular-mdl/select';
import { ChipComponent } from './chip/chip.component'; 
import { DragulaModule } from 'ng2-dragula';
@NgModule({
  declarations: [
    AppComponent,
    EditDialogComponent,
    GeneratorComponent,
    ChipComponent
  ],
  entryComponents:[
    EditDialogComponent
  ],
  imports: [
    DragulaModule,
    FormsModule,
    MdlModule,
    BrowserModule,
    ReactiveFormsModule,
    MdlSelectModule,
    Ng2DragDropModule.forRoot()
  ],
  providers: [EditDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
