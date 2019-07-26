import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "./material.module";
import { HomeService } from './services/home.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatCardModule, MatSortModule, MatProgressSpinnerModule } from '@angular/material';
import { NgHighlightModule } from 'ngx-text-highlight';
import { FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home Component' } },
  { path: 'home', component: HomeComponent, data: { title: 'Home Component' } }

];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
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
    PdfViewerModule,

    RouterModule.forRoot(
      appRoutes,
      { useHash: true } // <-- debugging purposes only
    ),
    MaterialModule
  ],
  providers: [HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

