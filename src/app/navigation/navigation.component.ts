import { Component, Output, OnInit, ViewChild, ElementRef, Pipe, PipeTransform, EventEmitter } from '@angular/core';
import { HomeService } from '../services/home.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/collections';
import { Home, MetaDataTable } from '../models/home.model';
import { FormControl } from '@angular/forms';
import { MatSelectionList } from '@angular/material';


@Component({
  selector: 'app-navigation',
  template: `
      <button (click)="sendMessage()">Send Message</button>
  `,
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{

    @ViewChild(PdfViewerComponent) public pdfComponent: PdfViewerComponent;

    autoTicks = false;
    disabled = false;
    invert = false;
    maxZoom = 1.1;
    minZoom = 0.8;
    showTicks = false;
    step = 0.05;
    thumbLabel = false;
    zoomValue = 1;
    vertical = false;


    task_level: string;
    task;

    metric_level: string;
    metric;

    paper_level: string;
    paper;


    dataByTask: any;

    uniqueMetrics: any;

    uniquePapers: any;

    paperData: any;

    paperURL: any;

    taskUni: any;

    pdfSrc: string = '';

    pdfText: string = '';


    paperRanking: string;
    pdfQuery = '';


    modelData: any;

    question1Value = "";


    // context1Input = "John is a dog from england."
    // question1Input = "Where is John from?"
    question1Response: any;
    question1Answer: string = "";



    datasetQuestion: string = "what dataset";
    datasetQuestionAnswer: string = "";
    batchSizeQuestion: string = "what is the batch size";
    batchSizeQuestionAnswer: string = "";
    learningRateQuestion: string = "what learning rate?";
    learningRateQuestionAnswer: string = "";

    paperURLInput: string = "";

    pdfTextURL: string = ""


    metaDataSource: any;
    META_DATA: MetaDataTable[]
    displayedColumns: string[] = ['metadata', 'result'];



    constructor(private homeService: HomeService) {
    }

    ngOnInit() {
        this.getAllData();
        this.getAllOwners();

        // sets default
        this.task = "Scene Text Detection";
        this.metric = "F-Measure";
        this.paper = "Detecting Oriented Text in Natural Images by Linking Segments";
        this.pdfSrc = "https://arxiv.org/pdf/1703.06520v3.pdf";
    }

    public getAllOwners = () => {
        // this.firstService.getData('https://jsonplaceholder.typicode.com/users')
        this.homeService.getHome()
            .subscribe(res => {
                this.modelData = res as Home[];
                this.taskUni = Array.from(new Set(this.modelData.map((itemInArray) => itemInArray.task)))
                this.taskUni = this.taskUni.sort();
            })
    }

    public getAllData = () => {
        this.homeService
            .getTasks().subscribe((res: Home[]) => {

                this.modelData = res;

            }
            )
    }


    taskLevelChangeAction(task, modelData) {

        function taskFilter(taskName, modelData) {

            return modelData.filter(object => {
                return object['task'] == taskName;


            });
        }

        this.dataByTask = taskFilter(this.task, this.modelData);

        this.uniqueMetrics = Array.from(new Set(this.dataByTask.map((itemInArray) => itemInArray.metric_name)))

    }

    metricLevelChangeAction(metric, modelData) {

        function paperFilter(taskName, metricName, modelData) {
            return modelData.filter(object => {
                return object['task'] == taskName && object['metric_name'] == metricName;
            });
        }

        this.paperData = paperFilter(this.task, this.metric, this.modelData);
        this.uniquePapers = Array.from(new Set(this.paperData.map((itemInArray) => itemInArray.paper_title)))

    }

    paperLevelChangeAction(paper, modelData) {

        function paperURLFilter(taskName, metricName, paperName, modelData) {

            return modelData.filter(object => {
                return object['task'] == taskName && object['metric_name'] == metricName && object['paper_title'] == paperName;
            });
        }

        this.paperURL = paperURLFilter(this.task, this.metric, this.paper, this.modelData);
        this.pdfSrc = this.paperURL[0].paper_url
        this.pdfText = this.paperURL[0].paper_text
        this.paperRanking = this.paperURL[0].global_rank

        console.log(this.pdfText)

        // console.log(this.datasetQuestionAnswer)

    }


    /**
  * Page rendered callback, which is called when a page is rendered (called multiple times)
  *
  * @param {CustomEvent} e
  */
    pageRendered(e: CustomEvent) {
        console.log('(page-rendered)', e);
    }


    paperURLInputChanged(newPaperURL: string) {
        if (newPaperURL !== this.paperURLInput) {
            this.paperURLInput = newPaperURL;
            this.pdfSrc = this.paperURLInput;

            this.homeService.getPDFText(this.pdfSrc).subscribe((resText: any) => {
                // return this.pdfText = JSON.stringify(resText.input);
                this.pdfText = JSON.stringify(resText.input);
                console.log(this.pdfText);
            })

            this.paper = "";
            this.paperRanking = "";

        }
        else {
            this.paperURLInput = this.paperURLInput;
        }
    
    }

    q1QueryChanged(newQuery: string) {
        if (newQuery !== this.question1Value) {
            this.question1Value = newQuery;

            this.homeService.getAnswer(this.pdfText, this.question1Value).subscribe((resx: any) => {
                return this.question1Answer = JSON.stringify(resx.input);
            })


            this.homeService.getAnswer(this.pdfText, this.datasetQuestion).subscribe((datasetRes: any) => {
                return this.datasetQuestionAnswer = JSON.stringify(datasetRes.input);
            })

            this.homeService.getAnswer(this.pdfText, this.batchSizeQuestion).subscribe((batchSizeRes: any) => {
                return this.batchSizeQuestionAnswer = JSON.stringify(batchSizeRes.input);
            })

            this.homeService.getAnswer(this.pdfText, this.learningRateQuestion).subscribe((learningRateRes: any) => {
                return this.learningRateQuestionAnswer = JSON.stringify(learningRateRes.input);
            })



            this.META_DATA = [
                { metadata: 'Dataset', result: this.datasetQuestionAnswer },
                { metadata: 'Batch Size', result: this.batchSizeQuestionAnswer },
            ];
    
            this.metaDataSource = this.META_DATA;

            this.pdfComponent.pdfFindController.executeCommand('find', {
                query: this.question1Answer,

                highlightAll: true
            }
            );
        } else {
            this.pdfComponent.pdfFindController.executeCommand('findagain', {
                query: this.question1Answer,
                highlightAll: true
            });
        }

    }

    scrollToPage(page: number) {
        this.pdfComponent.pdfViewer.scrollPageIntoView({
            pageNumber: page
        });
    }

    textLayerRendered(e: CustomEvent) {
        // console.log('(text-layer-rendered)', e);
    }

}