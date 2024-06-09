export class SortInfo {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;

    constructor(sorted: boolean, unsorted: boolean, empty: boolean) {
        this.sorted = sorted;
        this.unsorted = unsorted;
        this.empty = empty;
    }

    public static getInstance(): SortInfo {
        return new SortInfo(true, false, true);
    }
}

export class Pageable {

    sort: SortInfo;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;

    constructor(sort: SortInfo, offset: number, pageNumber: number,
                pageSize: number, paged: boolean, unpaged: boolean) {
        this.sort = sort;
        this.offset = offset;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.paged = paged;
        this.unpaged = unpaged;
    }

    public static getInstance(): Pageable {
        return new Pageable(SortInfo.getInstance(), 0, 1, 0, true, false);
    }

}

export class Page<T> {

    content: T[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    size: number;
    number: number;
    sort: SortInfo;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
    totalPages: number;

    constructor(content: T[], pageable: Pageable, last: boolean,
                totalElements: number, size: number, numbero: number,
                sort: SortInfo, first: boolean, numberOfElements: number,
                empty: boolean, totalPages: number) {
        this.content = content;
        this.pageable = pageable;
        this.last = last;
        this.totalElements = totalElements;
        this.size = size;
        this.number = numbero;
        this.sort = sort;
        this.first = first;
        this.numberOfElements = numberOfElements;
        this.empty = empty;
        this.totalPages = totalPages;
    }

    public static getInstance<T>(): Page<T> {
        return new Page<T>([], Pageable.getInstance(), false, 0, 0, 0, SortInfo.getInstance(), true, 0, true, 0);
    }

}