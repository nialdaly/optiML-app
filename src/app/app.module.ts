import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "./material.module";
import { HomeService } from './services/home.service';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatCardModule, MatSortModule, MatProgressSpinnerModule } from '@angular/material';
import { NgHighlightModule } from 'ngx-text-highlight';
import { FormsModule } from '@angular/forms';
// import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home Component' } },
  { path: 'home', component: HomeComponent, data: { title: 'Home Component' } },
  // { path: 'second', component: SecondComponent, data: { title: 'Second Component' } },
  // { path: 'third', component: ThirdComponent, data: { title: 'Third Component' } },
  // { path: 'fourth', component: FourthComponent, data: { title: 'Fouth Component' } },

];
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    MatSortModule,
    MatProgressSpinnerModule,
    NgHighlightModule,
    FormsModule,
    // NgxExtendedPdfViewerModule,
    PdfViewerModule,

    RouterModule.forRoot(
      appRoutes,
      { useHash: true } // <-- debugging purposes only
    ),
    MaterialModule
  ],
  // providers: [FirstService, SecondService, ThirdService],
  // providers: [FirstService, SecondService, ThirdService, FourthService],
  providers: [HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

