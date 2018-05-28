import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TopComponent } from './top/top.component';
import { BottomComponent } from './bottom/bottom.component';
import { HttpClientModule } from '@angular/common/http';
import{RouterModule}from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    BottomComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([{path:'top-component', component:TopComponent},
    {path:'bottom-component', component:BottomComponent}])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
