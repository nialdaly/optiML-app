export interface Home {
    // data_id: number;
    dataset: string;
    // extradata: string;
    global_rank: string,
    metric_name: string;
    metric_value: string;
    model_name: string;
    task: string;
    paper_title: string;
    // paper_path: string;
    paper_url: string;
}

export interface Tasks {
    task: string;
}

export interface Metrics {
    metric_name: string;
}

export interface MetaDataTable {
    metadata: string;
    result: any;
}
