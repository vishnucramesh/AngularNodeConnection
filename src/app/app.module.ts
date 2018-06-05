import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TopComponent } from './top/top.component';
import { BottomComponent } from './bottom/bottom.component';
import { HttpClientModule } from '@angular/common/http';
import{RouterModule}from '@angular/router';
import { CreateNewComponent } from './create-new/create-new.component';
import { DragulaModule } from 'ng2-dragula';
import {DndModule} from 'ng2-dnd';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    BottomComponent,
    CreateNewComponent    
  ], 
  imports: [
    BrowserModule,
    HttpClientModule,   
    DndModule.forRoot(),

    DragulaModule,
    FormsModule,
    RouterModule.forRoot([{path:'top-component', component:TopComponent},
    {path:'home', component:BottomComponent},{path:'list-component/:term',component:CreateNewComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 


}
