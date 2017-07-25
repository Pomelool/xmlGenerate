import { Component } from '@angular/core';
import { VariableEntity } from './variable.entity';
import { MdlDialogService } from '@angular-mdl/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { EditDialogComponent } from './editDialog.component';
import { EditDialogService } from './editDialog.service';
@Component({
  selector: 'generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent {
  builder = require('xmlbuilder');
  xml: any;
  jsonObj = {};
  jsonOutput = null;
  currentId = 0;
  root = new VariableEntity(0, "root");
  variableList = [];
  addedList = [];
  edService: EditDialogService;
  flagShowDetailChip: string = "none";

  chipDetail: VariableEntity = new VariableEntity(0, "empty");
  chipDetailTags: string[] = [];
  chipDetailContent: string[] = [];
  //extract data here
  //variableNames = ["Apple", "Carrot", "Orange", "Banana", "Grape"];
  objs = [
    {
      name: "Apple",
      requiredVars: ["quality", "price"],
      values: {
        "color": "red",
        "quality": "bad",
        "origin": "China"
      }
    },
    {
      name: "Carrot",
      requiredVars: ["color", "quality"],
      values: {
        "color": "red1",
      }
    },
    {
      name: "Orange",
      requiredVars: ["color", "quality"],
      values: {
        "color": "red",
        "quality": "good",
        "origin": "China"
      }
    }
  ]
  constructor(private dialogService: MdlDialogService, edService: EditDialogService) {
    this.edService = edService;
  }
  ngOnInit() {
    //construct variable List
    for (let objectExample of this.objs) {
      this.variableList.push(new VariableEntity(this.generateId(), objectExample.name, objectExample.requiredVars,objectExample.values));
    }
  }
  //EOF - ngOnInit()



  generateId() {
    this.currentId += 1;
    return this.currentId;
  }

  onItemDropListAdded(e: any) {
    var dataObj = new VariableEntity(this.generateId(), e.dragData.name, e.dragData.required, e.dragData.values);
    this.root.addChild(dataObj);
    this.reloadList();
  }

  onItemDropOnObj(e: any, item) {
    var dataObj = new VariableEntity(this.generateId(), e.dragData.name, e.dragData.required, e.dragData.values);
    item.addChild(dataObj);
    this.reloadList();
  }

  deleteChipFromAdded(item) {
    item.remove();
    this.reloadList();
  }

  reloadList() {
    this.addedList = this.root.arrayify();
    this.addedList.splice(0, 1);
    if (this.root.children.length > 0) {
      //console.log("result", this.root);
      //console.log("this.root",this.root);
      //console.log(this.jsonify(this.root));
      this.jsonObj = this.jsonify(this.root)['root'];
      this.jsonOutput = JSON.stringify(this.jsonObj, null, 2);
      this.xml = this.builder.create(this.jsonObj).end({ pretty: true });
    }
    else {
      this.jsonObj = {};
      this.jsonOutput = null;
      this.xml = null;
    }

  }

  jsonify(top) {
    var res = {};
    res[top.name] = {};
    if(top.values != null){
      for(let tag in top.values){
        res[top.name]['@'+tag] = top.values[tag];
      }
    }
    if (top.children.length < 1) {
      return res;
    }
    else {
      for (let child of top.children) {
        if(res[top.name][child.name] == null){
          res[top.name][child.name] = this.jsonify(child)[child.name];
        }
        else if(res[top.name][child.name].constructor === Array){
          res[top.name][child.name].push(this.jsonify(child)[child.name]);
        }
        else{
          var temp = res[top.name][child.name];
          res[top.name][child.name] =[];
          res[top.name][child.name].push(temp);
          res[top.name][child.name].push(this.jsonify(child)[child.name]);
        }
      }
      return res;
    }
  }

  showDetailChip(item){
    this.flagShowDetailChip = "block";
    this.chipDetail = item;
    for(let tag in item.values){
      this.chipDetailTags.push(tag);
      this.chipDetailContent.push(item.values[tag]);
    }
  }
  hideDetailChip(item){
    this.flagShowDetailChip = "none";
    this.chipDetail = new VariableEntity(0, "empty");
    this.chipDetailTags = [];
    this.chipDetailContent = [];
  }
  editChip(item) {
    let pDialog = this.dialogService.showCustomDialog({
      component: EditDialogComponent,
      providers: [{ provide: "itemObj", useValue: item }],
      styles: { 'width': '600px', 'height': '400px' },
      isModal: true,
      clickOutsideToClose: true
    });
    this.edService.emitter.subscribe((data) => {
      this.reloadList();
    });
  }


}
