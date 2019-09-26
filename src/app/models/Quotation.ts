import { QuotationItem } from './QuotationItem';
export class Quotation {
    id: number;
    quotationNo: string;
    quotationDate: string;
    customerId: number;
    remark: string;
    subtotal: number;
    vat: number;
    discount: number;
    grandTotal: number;
    quotationItems: QuotationItem[];
}
