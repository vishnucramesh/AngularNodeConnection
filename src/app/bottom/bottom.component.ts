import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Options } from 'selenium-webdriver/firefox';
import { Observable } from "rxjs"
import { error } from 'util';
@Component({
  selector: 'app-bottom',
  templateUrl: './bottom.component.html',
  styleUrls: ['./bottom.component.css']
})
export class BottomComponent implements OnInit {

  title:string;

  constructor(private _http:HttpClient) { }

  ngOnInit() {
    

  }
  clicked(){
    
    this.getData().subscribe(res=>{
      this.title=res;

    },error=>{console.log(error);}
    );
  }
 getData(){

  return this._http.get('/api' ,{responseType:'text'});
 }
}
