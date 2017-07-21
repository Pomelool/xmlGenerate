import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  builder = require('xmlbuilder');
  xml: any;
  obj = {};
  listAdded = [];
  currentId = 1;

  listIds = [];

  listVars = [
    { id: 0, name: "Apple", value: [], route: "", indent:0},
    { id: 0, name: "Carrot", value: [], route: "" , indent:0},
    { id: 0, name: "Orange", value: [], route: "" , indent:0},
    { id: 0, name: "Grape", value: [], route: "" , indent:0},
    { id: 0, name: "Banana", value: [], route: "" , indent:0},
    { id: 0, name: "Watermelon", value: [], route: "" , indent:0},
    { id: 0, name: "Laptop", value: [], route: "" , indent:0},
    { id: 0, name: "Keyboard", value: [], route: "" , indent:0},
    { id: 0, name: "Monitor", value: [], route: "" , indent:0},
    { id: 0, name: "Ram", value: [], route: "" , indent:0},
    { id: 0, name: "Disk", value: [], route: "" , indent:0}
  ];

  getPadd(index){
    //console.log("hi", index);
    //console.log(index, this.listAdded[index].indent, this.listVars);
    return  this.listAdded[index].indent*50 + "px";
  }
  //
  onItemDropListAdded(e: any) {
    // Get the dropped data here
    var dgTemp: any = this.clone(e.dragData);
    dgTemp.id = this.currentId;
    this.currentId += 1;
    this.listIds.push(dgTemp.id);

    this.listAdded.push(dgTemp);
    this.obj[dgTemp.name] = {};
    this.xml = this.builder.create(this.obj).end({ pretty: true });
    console.log(this.xml);
  }

  onItemDropOnObj(e: any, item) {
    // Get the dropped data here
    var temp: object;
    var dgTemp: any = this.clone(e.dragData);
    //ID
    if(dgTemp.id == 0){
      dgTemp.id = this.currentId;
      this.currentId += 1;
    }
    else{
      var delTar = this.listIds.indexOf(dgTemp.id);
      this.listIds.splice(delTar, 1);
      this.listAdded.splice(delTar, 1);
    }
    //ROUTE
    temp = this.clone(this.obj);
    dgTemp.route = item.route + "/" + item.name;
    var objRoute = dgTemp.route.split("/");
    for (let r of objRoute) {
      if (r != "") {
        temp = temp[r];
      }
    }
    temp[dgTemp.name] = {};
    //INDENT
    dgTemp.indent = item.indent + 1;

    //move around
    var target: number = this.listIds.indexOf(item.id)
    this.listAdded.splice(target+1, 0, dgTemp);
    this.listIds.splice(target+1, 0, dgTemp.id);

    this.xml = this.builder.create(this.obj).end({ pretty: true });
    console.log(this.xml);
  }

  clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }

  deleteChipFromAdded(p){
    var index = this.listAdded.indexOf(p.id);
    this.listAdded.splice(index,1);
    this.listIds.splice(index,1);
  }

  constructor() {
  }

  ngOnInit() {

  }
}
    // this.obj = {
    //   person: {
    //     name: "John",
    //     '@age': 35,
    //     address: {
    //       city: "Istanbul"
    //     },
    //     phone: [
    //       { '#text': "555-1234", '@type': 'home' },
    //       { '#text': "555-1235", '@type': 'mobile' }
    //     ],
    //     id: function() {
    //       return 42;
    //     }
    //   }
    //};


    // <?xml version="1.0"?>
    // <person age="35">
    //   <name>John</name>
    //   <address>
    //     <city>Istanbul</city>
    //   </address>
    //   <phone type="home">555-1234</phone>
    //   <phone type="mobile">555-1235</phone>
    //   <id>42</id>
    // </person>

    // this.xml = this.builder.create(this.obj).end({pretty:true});


// <state id="Review Documents">
// 	<status val="In Review"/>
// 	<access role="uploader" view="manageDocuments" actions="uploadDocument,viewDocument,downloadDocument,deleteDocument,replyQuery,viewQuery"/>
// 	<access role="monitor" view="manageDocuments" actions="viewDocument,downloadDocument,viewQuery"/>
// 	<access role="reviewer" view="manageDocuments" actions="editMeetingDate,openQuery,replyQuery,closeQuery,uploadDocument,uploadTranslation,flagForTranslation,viewAudit,redactDocument,createDossier,viewDossier,viewDocument,downloadDocument,managePreviousDossiers,closeRAD,editDocument" status="Review Documents" color="red">
// 		<button disabledIf="radIsOpen,noDocumentsUploaded,noBaselineDossier" display="Complete Reviewer Form" dialog="multiFormSubmission" dialogArguments="2,Reviewer Form,1,false">
// 			<overrideDisplayName if="formSubmittedAtThisPhaseByUser" display="Update Reviewer Form"/>
// 		</button>
// <button disabledIf="!multiFormSubmissionComplete,eventDeleted" showIf="formSubmittedAtThisPhaseByUser,multiFormSubmissionComplete" display="Send For Adjudication" dialog="selectUsersForListByRole" dialogArguments="2,adjudicatorsListText,adjudicator"/>
// 		<button hideIf="eventDeleted" display="Delete Event" dialog="deleteEvent"/>
// 		<button hideIf="!eventDeleted" display="Reactivate Event" dialog="reactivateEvent"/>
// 	</access>
// 	<caseVariable name="kickbackToReview">
// 		<value>false</value>
// 	</caseVariable>
// 	<email toRoles="reviewer" templateName="judi_files_uploaded_email"/>
// </state>
