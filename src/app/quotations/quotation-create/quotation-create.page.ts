import { QuotationsService } from './../../services/quotations.service';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-quotation-create',
  templateUrl: './quotation-create.page.html',
  styleUrls: ['./quotation-create.page.scss'],
})
export class QuotationCreatePage implements OnInit {
  isSave: boolean = false;
  quotationForm: FormGroup;
  productList: Product[] = [];

  // Property
  get quotationLines(): FormArray {
    return this.quotationForm.get('quotationItems') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private quotationService: QuotationsService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getProductList();
    this.createForm();
  }
  createForm() {
    this.quotationForm = this.fb.group({
      quotationNo: ['', Validators.required],
      quotationDate: ['', Validators.required],
      customer: ['', Validators.required],
      expireDate: ['', Validators.required],
      paymentTerm: '',
      referenceNo: '',
      pic: '',
      subtotal: [null, Validators.required],
      otherCharges: [null, Validators.required],
      vat: [7, Validators.required],
      grandTotal: [null, Validators.required],
      quotationItems: this.fb.array([])
    });
    this.addItem();
    // this.quotationLines.valueChanges.subscribe((res) => {
    //   console.log("ress", res);
    //   this.quotationForm.patchValue({
    //     subtotal: this.calculateSubTotal(),
    //     grandTotal: this.calculateGrandTotal()
    //   });
    // });
  }
  createQuotationItems(): FormGroup {
    return this.fb.group({
      productId: [null, Validators.required],
      productName: ['', Validators.required],
      qty: [0, Validators.required],
      unitPrice: [0, Validators.required],
      discount: [0, Validators.required],
      lineTotal: [null, Validators.required]
    });
  }
  addItem() {
    this.quotationLines.push(this.createQuotationItems());
  }
  removeItem(i: number) {
    this.quotationLines.removeAt(i);
  }

  getProductInfo(index: number) {
    let selectedProduct = this.productList.find(p => p.id == this.quotationLines.controls[index].get('productId').value);
    this.quotationLines.controls[index].patchValue({
      productName: selectedProduct.productName,
      unitPrice: selectedProduct.unitPrice
    });
  }

  getProductList() {
    this.productService.getProducts().subscribe((res: Product[]) => {
      this.productList = res;
    });
  }

  calculateLineTotal(line: AbstractControl) {
    let unitPrice = line.get('unitPrice').value;
    let qty = line.get('qty').value;
    let discount = line.get('discount').value;
    line.patchValue({
      lineTotal: (unitPrice * qty) - discount
    });
  }
  calculateSubTotal() {
    let sum = 0;
    this.quotationLines.controls.forEach((q) => {
      sum += Number(q.get('lineTotal').value);
    });
    console.log("sum",sum);
    
    this.quotationForm.patchValue({
      subtotal: sum,
      grandTotal: this.calculateGrandTotal()
    });
  }
  calculateGrandTotal() {
    let subTotal = this.quotationForm.get('subtotal').value;
    let otherCharges = this.quotationForm.get('otherCharges').value;
    let vat = this.quotationForm.get('vat').value;
    return (subTotal + otherCharges) + ((subTotal + otherCharges) * vat / 100);
  }

  submit() {
    this.isSave = true;
    if (this.quotationForm.valid) {
      let quotation = Object.assign({}, this.quotationForm.value);
      console.log("q", quotation);
      this.quotationService.addQuotaion(quotation).subscribe(res => {
        console.log("res", res);
      });
    }
    else {
      console.log("invail form");

    }
  }
}
