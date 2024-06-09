export class Sort {

    col: string;
    type: string;

    constructor(col: string, type: string) {
        this.col = col;
        this.type = type;
    }

}

export class Paginacion {

    size: number;
    page: number;
    sort: Sort;

    constructor(size: number, page: number, sort: Sort) {
        this.size = size;
        this.page = page;
        this.sort = sort;
    }

}