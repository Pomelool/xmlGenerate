import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MdlDialogReference } from '@angular-mdl/core';
import { Component,HostListener, OnInit, Inject, Output } from '@angular/core';
import 'rxjs/add/operator/filter';
import { EditDialogService } from './editDialog.service';

@Component({
  selector: 'editDialog',
  templateUrl: 'editDialog.component.html',
  styleUrls: ['editDialog.component.css', '../animated.css']
})
export class EditDialogComponent implements OnInit {
  item: any;
  values: any;
  form: FormGroup;
  controls:any = {};
  controlNames: string[] = [];
  edService: any;
  labelsName: string[] = [];
  newVarBox = 'none';
  newVarForm: FormGroup;
  newVarObj = {'name':"", 'required':false};
  choices = [{value:true,name:"Required"}, {value:false, name:"Optional"}];

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

    this.newVarForm = this.fb.group({
      varValue: new FormControl("", Validators.required),
      isRequired: new FormControl(this.choices, Validators.required)
    });
  }

  saveEdit(){
    this.item.values = this.values;
    this.dialog.hide();
    this.edService.update();
  }

  newValue(){
    this.newVarBox = "block";
    this.newVarForm.controls["isRequired"].setValue(false);
    this.newVarForm.valueChanges.subscribe(data => {
      this.newVarObj.name = data.varValue;
      this.newVarObj.required = data.isRequired;
    });
  }

  saveNewValue(){
    this.item.values[this.newVarObj.name] = "";
    if(this.newVarObj.required){
      this.item.required.push(this.newVarObj.name);
    }
    this.edService.update();
    this.reloadEdit();
    this.newVarForm.controls["varValue"].setValue("");
    this.newVarBox = "none";
  }

  cancelNewValue(){
    this.newVarBox = "none";
  }
  
  reloadEdit(){
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
    this.form = this.fb.group(this.controls);
    this.form.valueChanges.subscribe(data => {
      this.values = data;
    });
  }

  onEsc(): void {
    this.dialog.hide();
  }

}
