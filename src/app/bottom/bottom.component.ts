import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Options } from 'selenium-webdriver/firefox';
import { Observable } from "rxjs"
import { error } from 'util';
import{List} from '../model/list/list.model'
@Component({
  selector: 'app-bottom',
  templateUrl: './bottom.component.html',
  styleUrls: ['./bottom.component.css']
})
export class BottomComponent implements OnInit {

  title:string;
  noValue:boolean;
  newItem:boolean;
  tempName:List={
    name:null
  };
  listNames:Array<List> = [];

  temp:string;
  name:string;


  constructor(private _http:HttpClient) {
    this.noValue=false;
    this.newItem=false;
    this.temp = localStorage.getItem('flag');
    console.log(this.temp);
    
    if (this.temp === null) {
      _http.get('/api' + '/create').subscribe(data => {
        console.log(data);

      });
    }
    else{
      this.getData();
    } 
    localStorage.setItem('flag', 'true');

   }

  ngOnInit() {
    

  }
  clicked(temp:string){
    if(temp==='open'){
        this.newItem=true;
    }
    else{
      this.newItem=false;
    }
      }
  submit(){
    
      if (this.tempName.name===undefined){
        this.noValue=true;

      }
      else{
        console.log("working");
        this.tempName={
          name:this.name
        }
        this.listNames[this.listNames.length]=this.tempName;
        this._http.post('/api'+'/test',{name:this.tempName.name}).subscribe(data => {
          console.log(data);
        });
        this._http.post('/api'+'/createelement',{ name:this.tempName.name}).subscribe(data=>{
        });
      }
    }
 getData(){
  this._http.post<Array<List>>('/api'+'/getname',{name:this.tempName.name}).subscribe(data => {
    console.log(data);
    this.listNames = data;
  });
 }

}
