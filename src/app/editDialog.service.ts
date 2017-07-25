import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EditDialogService
{
  emitter = new EventEmitter<any>();
  constructor(){
  }
  update(){
    this.emitter.emit();
  }
}
