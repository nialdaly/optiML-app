import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../services/home.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import 'rxjs/add/observable/of';
import { PaperData, QAData, ParserData, MetaDataTable } from '../models/home.model';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    @ViewChild(PdfViewerComponent) public pdfComponent: PdfViewerComponent;

    autoTicks = false; disabled = false; invert = false; maxZoom = 1.1;
    minZoom = 0.8; showTicks = false; step = 0.05;
    thumbLabel = false; zoomValue = 1; vertical = false;
    paperData: any; paperURL: any;
    uniqueTasks: any; uniqueMetrics: any; uniquePapers: any;
    task; metric; paper; dataByTask: any;
    pdfSrc: string = ''; paperRanking: string; pdfURLSrc: string = '';

    // pdfURLText: string = ''; pdfQuery = '';

    modelData: any; question = "";

    // metadata
    pdfText: any = '';
    answer: any = ""; modelName: string; metricValue: string;
    datasetQuestion: string = "what dataset"; datasetAnswer: any = "";
    batchSizeQuestion: string = "what is the batch size"; batchSizeAnswer: any = "";
    lrateQuestion: string = "what learning rate?"; lrateAnswer: any = "";
    momentumQuestion: string = "what momentum?"; momentumAnswer: any = "";
    epochsQuestion: string = "what epochs?"; epochsAnswer: any = "";
    paperURLInput: string = ""; pdfTextURL: string = ""


    metaDataSource: any;
    META_DATA: MetaDataTable[]
    displayedColumns: string[] = ['metadata_name', 'metadata_value'];


    constructor(private homeService: HomeService) {
    }

    ngOnInit() {
        this.getAllData();
    }

    public getAllData = () => {
        this.homeService.getPaperData()
            .subscribe(res => {
                this.modelData = res as PaperData[];
                this.uniqueTasks = Array.from(new Set(this.modelData.map((itemInArray) => itemInArray.task)))
                this.uniqueTasks = this.uniqueTasks.sort();
            });
    }

    taskChange(task, modelData) {
        function taskFilter(taskName, modelData) {
            return modelData.filter(object => {
                return object['task'] == taskName;
            });
        };
        this.dataByTask = taskFilter(this.task, this.modelData);
        this.uniqueMetrics = Array.from(new Set(this.dataByTask.map((itemInArray) => itemInArray.metric_name)));
        this.modelName = this.dataByTask[0].model;
        this.metricValue = this.dataByTask[0].metric_value;
    }

    metricChange(metric, modelData) {
        function paperFilter(taskName, metricName, modelData) {
            return modelData.filter(object => {
                return object['task'] == taskName && object['metric_name'] == metricName;
            });
        };
        this.paperData = paperFilter(this.task, this.metric, this.modelData);
        this.uniquePapers = Array.from(new Set(this.paperData.map((itemInArray) => itemInArray.paper_title)));
    }

    paperChange(paper, modelData) {
        function paperURLFilter(taskName, metricName, paperName, modelData) {
            return modelData.filter(object => {
                return object['task'] == taskName && object['metric_name'] == metricName && object['paper_title'] == paperName;
            });
        }

        this.paperURL = paperURLFilter(this.task, this.metric, this.paper, this.modelData);
        this.pdfSrc = this.paperURL[0].paper_url
        this.pdfText = this.paperURL[0].paper_text
        this.paperRanking = this.paperURL[0].global_rank

        this.homeService.getAnswer(this.pdfText, this.datasetQuestion).subscribe(res => { this.datasetAnswer = res as QAData[] });
        this.homeService.getAnswer(this.pdfText, this.lrateQuestion).subscribe(res => { this.lrateAnswer = res as QAData[] });
        this.homeService.getAnswer(this.pdfText, this.momentumQuestion).subscribe(res => { this.momentumAnswer = res as QAData[] });
        this.homeService.getAnswer(this.pdfText, this.epochsQuestion).subscribe(res => { this.epochsAnswer = res as QAData[] });
        this.homeService.getAnswer(this.pdfText, this.batchSizeQuestion).subscribe(res => { this.batchSizeAnswer = res as QAData[] });

        // automatic metadata table
        this.META_DATA = [
            { metadata_name: 'Model', metadata_value: this.modelName }, { metadata_name: 'Metric', metadata_value: this.metric },
            { metadata_name: 'Model Result', metadata_value: this.metricValue }, { metadata_name: 'Learning Rate', metadata_value: this.lrateAnswer },
            { metadata_name: 'Batch Size', metadata_value: this.batchSizeAnswer }, { metadata_name: 'Momentum', metadata_value: this.momentumAnswer },
            { metadata_name: 'Epochs', metadata_value: this.epochsAnswer }
        ];

        this.metaDataSource = this.META_DATA;
    }


    /**
  * Page rendered callback, which is called when a page is rendered (called multiple times)
  *
  * @param {CustomEvent} e
  */
    pageRendered(e: CustomEvent) {
        // console.log('(page-rendered)', e);
    }

    paperURLChanged(newPaperURL: string) {

        this.paperURLInput = newPaperURL;
        this.pdfSrc = this.paperURLInput;

        this.pdfText = "";

        this.homeService.getPDFText(this.pdfSrc).subscribe(response => {

            this.pdfText = response as ParserData[]

            console.log(this.pdfText)
            // return this.pdfText = JSON.stringify(resText.input);
            // this.pdfText = JSON.stringify(resText.input);

            this.homeService.getAnswer(this.pdfText, this.lrateQuestion).subscribe(response => { this.lrateAnswer = response as QAData[] });
            this.homeService.getAnswer(this.pdfText, this.momentumQuestion).subscribe(response => { this.momentumAnswer = response as QAData[] });
            this.homeService.getAnswer(this.pdfText, this.epochsQuestion).subscribe(response => { this.epochsAnswer = response as QAData[] });
            this.homeService.getAnswer(this.pdfText, this.batchSizeQuestion).subscribe(response => { this.batchSizeAnswer = response as QAData[] });

            // automatic metadata table
            this.META_DATA = [
                { metadata_name: 'Learning Rate', metadata_value: this.lrateAnswer }, { metadata_name: 'Batch Size', metadata_value: this.batchSizeAnswer },
                { metadata_name: 'Momentum', metadata_value: this.momentumAnswer }, { metadata_name: 'Epochs', metadata_value: this.epochsAnswer }
            ];

            this.metaDataSource = this.META_DATA;

        })
    }

    paperQueryChanged(newQuery: string) {
        if (newQuery !== this.question) {
            this.question = newQuery;

            this.homeService.getAnswer(this.pdfText, this.question)
                .subscribe(res => {
                    this.answer = res as QAData[];
                });

            this.pdfComponent.pdfFindController.executeCommand('find', {
                query: this.answer,
                highlightAll: true
            });

        } else {
            this.pdfComponent.pdfFindController.executeCommand('findagain', {
                query: this.answer,
                highlightAll: true
            });
        }

    };

    scrollToPage(page: number) {
        this.pdfComponent.pdfViewer.scrollPageIntoView({
            pageNumber: page
        });

    }

    textLayerRendered(e: CustomEvent) {
    }

}