export class VariableEntity {
  id: number;
  name: string;
  route: string;
  indent: number;
  children: VariableEntity[];
  parent: VariableEntity;
  required: string[];
  values: any;

  constructor(id: number, name: string, req?: string[], values?: any, children?:VariableEntity[]) {
    this.name = name;
    this.id = id;
    if(children != null){
      this.children = children;
    }
    else{
      this.children = [];
    }
    this.indent = -1;
    this.parent = null;
    if (req != null) {
      this.required = req;
    }
    else {
      this.required = [];
    }
    this.values = {};
    if(req != null){
      for(let tag of req){
        this.values[tag] = "";
      }
    }
    if (values != null) {
      for(let tag in values){
        this.values[tag] = values[tag];
      }
    }
    else {
      this.values = null;
    }
  }

  giveColor(){
      if(!this.checkRequired()){
        return "2px solid red";
      }
  }

  checkRequired(){
    var flag = true;
    for(let r of this.required){
      if (this.values[r] == ""){
        flag = false;
      }
    }
    return flag;
  }

  addChild(child: VariableEntity) {
    this.children.push(child);
    child.indent = this.indent + 1;
    child.parent = this;
  }

  arrayify() {
    var res = [];
    res.push(this);
    for (let child of this.children) {
      //  console.log("processing", child.name);
      if (child.children.length == 0) {
        //    console.log("no chidren for", child.name);
        res.push(child);
        //  console.log("cuz no child, add this one to res", res);
      }
      else {
        //  console.log("has child", child.name);
        res = res.concat(child.arrayify());
        //console.log("added", child.name, "to res of" , this.name, res);
      }
    }
    return res;
  }


  remove() {
    this.parent.children.splice(this.parent.children.indexOf(this), 1);
    this.parent = null;
  }

  containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }
    return false;
  }

  setAIndent(ind:number){
    this.indent = ind;
    if(!(this.children.length == 0)){
      for(let child of this.children){
      child.setAIndent(ind + 1);
      }
    } 
  }


}
