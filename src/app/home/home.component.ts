import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from '../services/home.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/collections';
import { Home } from '../models/home.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectionList } from '@angular/material';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
    selector: 'app-home',
    template: `
    Message: {{message}}
    <app-navigation (messageEvent)="receiveMessage($event)"></app-navigation>
  `,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})


// export class HomeComponent implements OnInit {
// }
export class HomeComponent {

    @ViewChild(NavigationComponent) child;
    @ViewChild(PdfViewerComponent) public pdfComponent: PdfViewerComponent;

    exampleParent: string;
    paperURL: any;
    pdfSrc: any;
    paperRanking: any;


    // ngAfterViewInit() {

    //     console.log(this.childReference);
    //     this.exampleParent = this.childReference;
    //     console.log("EXAMPLE PARENT", this.exampleParent)
    // }


    constructor() {

    }

    message: string;

    receiveMessage($event) {
        this.message = $event

        console.log("Message Recieved", this.message)
    }


    paperLevelChangeAction(paper, modelData) {

        function paperURLFilter(taskName, metricName, paperName, modelData) {

            return modelData.filter(object => {
                return object['task'] == taskName && object['metric_name'] == metricName && object['paper_title'] == paperName;
            });
        }

        // this.paperURL = paperURLFilter(this.task, this.metric, this.paper, this.modelData);
        this.pdfSrc = this.paperURL[0].paper_url
        // this.pdfSrc = this.childReference.exampleParent
        this.paperRanking = this.paperURL[0].global_rank

        console.log(this.pdfSrc)

    }










    // autoTicks = false;
    // disabled = false;
    // invert = false;
    // maxZoom = 1.2;
    // minZoom = 0.8;
    // showTicks = false;
    // step = 0.1;
    // thumbLabel = false;
    // zoomValue = 0.;
    // vertical = false;

    // task_level: string;
    // task;

    // metric_level: string;
    // metric;

    // paper_level: string;
    // paper;


    // dataByTask: any;

    // uniqueMetrics: any;

    // uniquePapers: any;

    // paperData: any;

    // paperURL: any;

    // taskUni: any;

    // pdfSrc: string = '';

    // paperRanking: string;
    // pdfQuery = '';


    // modelData: any;

    // constructor() { }

    // message: string; 



    //     


}
