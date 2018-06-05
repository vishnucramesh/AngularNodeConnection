import { Component, OnInit } from '@angular/core';
import{DragulaService}from 'ng2-dragula';
import { ActivatedRoute} from '@angular/router';
import{HttpClient} from '@angular/common/http';
import{ListElement} from '../model/listelement/listelement.model';
import { element } from 'protractor';

export interface MainElement{
  name?:string,
  list?:Array<ListElement>
}
@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.css']
})

export class CreateNewComponent implements OnInit {
  
  addVar:boolean;
  name:string;
  tempElement:string;
  tempName:string;
  sub:any;
  tempList:ListElement;
  list:Array<ListElement>;
  
 

  constructor(private dragulaService: DragulaService,public activatedRoute:ActivatedRoute,public _http:HttpClient) {
   
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });

    }
    allowDropFunction(){
      return true;
    }

     private onDrop(args:any):void {
       console.log(args);
       
      
    var i,j;
      let [el, target,source] = args;      
      let index;
      let index1= source.getElementsByClassName("element").length;
    console.log(index);
    
        for(i=0;i<this.list.length;i++){
          if(this.list[i].name=== target.parentElement.textContent.toString().split(" ")[0]){
              
              
              for(j=0;j<index;j++){
                if(target.getElementsByClassName("element")[j] != null){
                  console.log(target.getElementsByClassName("element")[j].innerHTML);
                  if(this.list[i].element==undefined&&j==0){
                    this.list[i].element=[target.getElementsByClassName("element")[j].innerHTML]
                  }
                  else{
                    this.list[i].element[j]=target.getElementsByClassName("element")[j].innerHTML;}
                  }
                console.log(this.list[j]);
                
              }
              if(this.list[i].element.length>index){
                for(;j<this.list[i].element.length;j++){
                  this.list[i].element.pop();
                }
              }

          }}
         for(i=0;i<this.list.length;i++){

           if(this.list[i].name=== source.parentElement.textContent.toString().split(" ")[0]){
             for(j=0;j<index1;j++){
               if(source.getElementsByClassName("element")[j] != null){
               this.list[i].element[j]=source.getElementsByClassName("element")[j].innerHTML;}
             }
             if(this.list[i].element.length>index1){
               for(;j<this.list[i].element.length;j++){
                 this.list[i].element.pop();
               }
             }
         }}
        
   
   this.upload();
    }


  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
        this.name = params['term'];
        this.loadElements();
        });
      
    
  }
  add(){
    this.addVar=!this.addVar;
    console.log(this.addVar);
    
  }
  loadElements(){
      this._http.post('/api'+'/getelement',{name:this.name}).subscribe(data=>{
        if(data!==null||data!==undefined){
        this.list=data["0"].list;
        console.log(data["0"].list);
        
      }
        
      });
  }
  createElement(temp:ListElement){
    if(temp.element==null){
      temp.element=[temp.temp];
      temp.valid=[false]
    }
    else{
      temp.element.push(temp.temp);
      temp.valid.push(false);
    }
    console.log(temp.element);
    temp.temp=null;
    this.upload();
     
  }

  createList(){
    this.tempList={
      name:this.tempName
    }
    if(this.list===undefined||this.list===null){
      this.list=[this.tempList];
    }else{
      this.list.push(this.tempList);
    }
    this.tempName=null;
    this.upload();
  }

  upload(){
   this._http.post('/api'+'/updateelement',{list:this.list, name:this.name}).subscribe(data=>{
    });
  
 }

 check(temp,index:number){
  console.log(temp.valid[index]);
 console.log(temp.element[index]);
  
   var a=document.getElementById(temp.element[index]);
if(temp.valid[index]===false){
  a.style.textDecoration="line-through";  
  temp.valid[index]=true;
}
else{
  a.style.textDecoration="none";
  temp.valid[index]=false;
}

 this.upload();
 }

  
}
