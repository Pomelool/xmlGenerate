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
  values:string;
  edService: EditDialogService;
  deleteValue=0;

  constructor(editService: EditDialogService) {
    this.edService = editService;
  }

  ngOnInit() {
    this.chipText = this.obj.name;
    this.values = JSON.stringify(this.obj.values);
  }

  editAction(){
    this.edService.emitter.subscribe((data) => {
      this.values = JSON.stringify(data.values);
      this.obj.values = data.values;
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
