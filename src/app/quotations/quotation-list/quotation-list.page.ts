import { Quotation } from './../../models/Quotation';
import { QuotationsService } from './../../services/quotations.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.page.html',
  styleUrls: ['./quotation-list.page.scss'],
})
export class QuotationListPage implements OnInit {
  quotationList: Quotation[];
  constructor(
    private quotationService: QuotationsService
  ) { }

  ngOnInit() {
    this.quotationService.getQuotations().subscribe((res: Quotation[]) => {
      console.log(res);
      this.quotationList = res;
      console.log("this.quotationList", this.quotationList);

    }
    );
  }

}
