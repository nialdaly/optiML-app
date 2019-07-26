export interface Home {
    dataset: string;
    global_rank: string,
    metric_name: string;
    metric_value: string;
    model_name: string;
    task: string;
    paper_title: string;
    paper_url: string;
}

export interface Tasks {
    task: string;
}

export interface Metrics {
    metric_name: string;
}

export interface Models {
    model_name: string;
}

export interface MetaDataTable {
    metadata: string;
    result: any;
}
