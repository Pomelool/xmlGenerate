import {
  Component,
  ViewChild
} from '@angular/core';
import {
  VariableEntity
} from '../variable/variable.entity';
import {
  MdlDialogService,
  MdlDialogReference
} from '@angular-mdl/core';
import {
  EditDialogComponent
} from '../editDialog/editDialog.component';
import {
  EditDialogService
} from '../editDialog/editDialog.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ChipComponent } from "../chip/chip.component";

@Component({
  selector: 'generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css', '../animated.css', './generator.component.scss']
})
export class GeneratorComponent {
  builder = require('xmlbuilder');
  parseString = require('xml2js').parseString;

  xml: any;
  jsonObj = {};
  jsonOutput = null;
  currentId = 0;
  root = new VariableEntity(0, 'root');
  variableList = [];
  addedList = [];
  edService: EditDialogService;

  inputObj: any;

  chipDetail: VariableEntity = new VariableEntity(0, "empty");
  chipDetailTags: string[] = [];
  chipDetailContent: string[] = [];

  newChipForm: FormGroup;
  newChipValues: object;
  displayToggleNewChip:string = "none";
  //extract data here
  //variableNames = ["Apple", "Carrot", "Orange", "Banana", "Grape"];
  objs = [{
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
    requiredVars: [],
    values: {
      "color": "red",
      "quality": "good",
      "origin": "China"
    }
  }
  ];
  constructor(private dialogService: MdlDialogService,private fb: FormBuilder, edService: EditDialogService) {
    this.edService = edService;
  }
  ngOnInit() {
    //construct variable List
    for (let objectExample of this.objs) {
      this.variableList.push(new VariableEntity(this.generateId(), objectExample.name, objectExample.requiredVars, objectExample.values));
    }
    this.newChipForm = this.fb.group({
      newChipValue: new FormControl("", Validators.required)
    });
    this.newChipForm.valueChanges.subscribe(data => {
      this.newChipValues = data;
    });
  }
  //EOF - ngOnInit()

  addChoice() {
    this.displayToggleNewChip = "block";
  }

  saveNewChip(){
    var name = this.newChipValues['newChipValue'];
    this.variableList.push(new VariableEntity(this.generateId(), name, [], {}));
    this.newChipForm.controls['newChipValue'].setValue("");
    this.displayToggleNewChip = "none";
  }

  cancelNewChip(){
    this.displayToggleNewChip = "none";
  }

  deleteChipFromList(tar){
    this.variableList.splice(this.variableList.indexOf(tar), 1);
  }

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
      this.jsonObj = this.jsonify(this.root)['root'];
      this.jsonOutput = JSON.stringify(this.jsonObj, null, 2);
      this.xml = this.builder.create(this.jsonObj).end({
        pretty: true
      });
      this.xml = this.xml.split("\n");
      this.xml = this.xml.slice(1, this.xml.length).join("\n");
    } else {
      this.jsonObj = {};
      this.jsonOutput = null;
      this.xml = null;
    }
  }

  jsonify(top) {
    var res = {};
    res[top.name] = {};
    if (top.values != null) {
      for (let tag in top.values) {
        res[top.name]['@' + tag] = top.values[tag];
      }
    }
    if (top.children.length < 1) {
      return res;
    } else {
      for (let child of top.children) {
        if (res[top.name][child.name] == null) {
          res[top.name][child.name] = this.jsonify(child)[child.name];
        } else if (res[top.name][child.name].constructor === Array) {
          res[top.name][child.name].push(this.jsonify(child)[child.name]);
        } else {
          var temp = res[top.name][child.name];
          res[top.name][child.name] = [];
          res[top.name][child.name].push(temp);
          res[top.name][child.name].push(this.jsonify(child)[child.name]);
        }
      }
      return res;
    }
  }

  objectify(inp, name) {
    var valueObj = {};
    if (inp['$'] != null) {
      valueObj = inp['$'];
    }
    var createObj = new VariableEntity(this.generateId(), name, [], valueObj, []);
    if (!this.noChildHelper(inp)) {
      for (let childLabel in inp) {
        for (let child of inp[childLabel]) {
          var childObj = this.objectify(child, childLabel)
          createObj.addChild(childObj);
        }
      }
    }
    return createObj;
  }

  noChildHelper(obj: object) {
    var noChild = true;
    for (let label in obj) {
      if (label != '$') {
        noChild = false;
      }
    }
    return noChild;
  }

  editChip(item) {
    let pDialog = this.dialogService.showCustomDialog({
      component: EditDialogComponent,
      providers: [{
        provide: "itemObj",
        useValue: item
      }],
      styles: {
        'width': '600px',
        'height': '400px'
      },
      isModal: true,
      clickOutsideToClose: true
    });
    this.edService.emitter.subscribe((data) => {
      this.reloadList();
    });
  }

  loadUploadedFile() {
    this.root = this.objectify(this.inputObj, 'root');
    this.root.setAIndent(-1);
    this.reloadList();
  }

  openFile(event) {
    let input = event.target;
    var reader = new FileReader();
    reader.readAsText(input.files[0]);
    var res;
    reader.onload = () => {
      var xml = '<root>' + reader.result + '</root>';
      this.parseString(xml, function (err, result) {
        res = result;
      });
      this.inputObj = res['root'];
    }
  }

  generateFromTextArea(){
    var xmlInput = '<root>' + this.xml + '</root>';
    var res;
    this.parseString(xmlInput, function (err, result) {
        res = result;
      });
    this.inputObj = res['root'];
    this.root = this.objectify(this.inputObj, 'root');
    this.root.setAIndent(-1);
    this.reloadList();
  }
}
