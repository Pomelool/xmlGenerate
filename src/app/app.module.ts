import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { MdlModule } from '@angular-mdl/core';
import { AppComponent } from './app.component';
import { GeneratorComponent } from './generator.component';
import { EditDialogComponent } from "./editDialog.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditDialogService } from './editDialog.service';
import { MdlSelectModule } from '@angular-mdl/select';

@NgModule({
  declarations: [
    AppComponent,
    EditDialogComponent,
    GeneratorComponent
  ],
  entryComponents:[
    EditDialogComponent
  ],
  imports: [
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
