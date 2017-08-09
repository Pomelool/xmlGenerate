import { Input, Output, Component, EventEmitter, OnInit } from '@angular/core';
import { VariableEntity } from '../variable/variable.entity';
import {
  EditDialogService
} from '../editDialog/editDialog.service';
@Component({
  selector: 'xmlChip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css', '../animated.css']
})

export class ChipComponent implements OnInit {
  chipText: string;
  expandHoriValue: number = 0;
  collapseFuncHoriValue: number = 0;
  expandVertValue: number = 0;
  @Output()
  editClick: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  deleteClick: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  obj: VariableEntity;
  @Input()
  dragToggle:boolean;
  edService: EditDialogService;
  deleteValue=0;
  valuesVariables;
  valuesContents;

  constructor(editService: EditDialogService) {
    this.edService = editService;
  }

  ngOnInit() {
    this.chipText = this.obj.name;
    this.processValues();
  }

  processValues(){
    this.valuesVariables = [];
    this.valuesContents = [];
    for (var variable in this.obj.values) {
      if (this.obj.values.hasOwnProperty(variable)) {
        this.valuesVariables.push(variable);
        if(this.obj.values[variable] == "" || this.obj.values[variable] == null){
          this.obj.values[variable] = "N/A";
        }
        this.valuesContents.push(this.obj.values[variable]);
      }
    }
  }

  editAction(){
    this.edService.emitter.subscribe((data) => {
      this.obj.values = data.values;
      this.processValues();
    });
    this.editClick.emit(this.obj);
  }

  deleteAction(){
    this.deleteValue = 1;
    this.deleteClick.emit(this.obj);
  }

  changeExpandHoriValue(num: number) {
    this.expandHoriValue = num;
    this.collapseFuncHoriValue = 1;
  }

  changeExpandVerticalValue(num: number) {
    this.expandVertValue = num;
  }

  

}
