export interface PaperData {
    dataset: string;
    global_rank: string,
    metric_name: string;
    metric_value: string;
    model_name: string;
    task: string;
    paper_title: string;
    paper_url: string;
}

export interface QAData {
    answer: string;
}

export interface ParserData {
    parsed_text: string;
}

export interface MetaDataTable {
    metadata_name: string;
    metadata_value: any;
}

