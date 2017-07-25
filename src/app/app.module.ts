import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { MdlModule } from '@angular-mdl/core';
import { AppComponent } from './app.component';
import { GeneratorComponent } from './generator.component';
import { EditDialogComponent } from "./editDialog.component";
import { ReactiveFormsModule } from '@angular/forms';
import { EditDialogService } from './editDialog.service';
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
    MdlModule,
    BrowserModule,
    ReactiveFormsModule,
    Ng2DragDropModule.forRoot()
  ],
  providers: [EditDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
