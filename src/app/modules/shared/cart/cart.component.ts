import { Component, OnInit } from '@angular/core';
import { HelperService } from '../service/helper.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private helperService: HelperService) {}

  public cartModal(): void {
    this.helperService.cartModal(false);
  }

  ngOnInit(): void {}
}
