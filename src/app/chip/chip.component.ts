import { Input, Output, Component, EventEmitter, OnInit } from '@angular/core';
import { VariableEntity } from '../variable/variable.entity';
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
  @Input()
  obj: VariableEntity;
  @Input()
  dragToggle:boolean;
  values:any;

  constructor() {
  }

  ngOnInit() {
   // console.log(this.obj);
    this.chipText = this.obj.name;
    this.values = JSON.stringify(this.obj.values);
  }

  editAction(){
    this.editClick.emit(this.obj);
  }

  changeExpandHoriValue(num: number) {
    this.expandHoriValue = num;
    this.collapseFuncHoriValue = 1;
  }

  changeExpandVerticalValue(num: number) {
    this.expandVertValue = num;
  }

}
