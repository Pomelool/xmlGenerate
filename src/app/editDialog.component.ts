import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MdlDialogReference } from '@angular-mdl/core';
import { Component,HostListener, OnInit, Inject, Output } from '@angular/core';
import 'rxjs/add/operator/filter';
import { EditDialogService } from './editDialog.service';

@Component({
  selector: 'editDialog',
  templateUrl: 'editDialog.component.html',
  styleUrls: ['editDialog.component.css']
})
export class EditDialogComponent implements OnInit {
  item: any;
  values: any;
  form: FormGroup;
  controls:any = {};
  controlNames: string[] = [];
  edService: any;
  labelsName: string[] = [];

  constructor(
    private dialog: MdlDialogReference,
    private fb: FormBuilder,
    editDialogService: EditDialogService,
    @Inject("itemObj") sentObject: any
  ){
    this.item = sentObject;
    this.edService = editDialogService;
  }

  ngOnInit() {
    this.values = this.item.values;
    for(let label in this.values){
      this.controlNames.push(label);
      this.controls[label] = new FormControl(this.values[label]);
      if(this.item.required.indexOf(label) > -1){
        this.labelsName.push(label + "*")
      }
      else{
        this.labelsName.push(label);
      }
    }
    //console.log(this.controls);
    this.form = this.fb.group(this.controls);

    this.form.valueChanges.subscribe(data => {
      this.values = data;
    });
  }

  saveEdit(){
    this.item.values = this.values;
    this.dialog.hide();
    this.edService.update();
  }

  newValue(){
    alert("This function is not yet implemented!")
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.dialog.hide();
  }

}
