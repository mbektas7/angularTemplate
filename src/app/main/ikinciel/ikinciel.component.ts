import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { mirapiAnimations } from '@mirapi/animations';
import { IkinciElModel } from 'app/shared/models/IkinciElModel';
import * as shape from 'd3-shape';
import { IkincielService } from './ikinciel.service';

@Component({
  selector: 'cards',
  templateUrl: './ikinciel.component.html',
  styleUrls: ['./ikinciel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : mirapiAnimations
})
export class IkincielComponent implements OnInit {

products: IkinciElModel[];
  constructor(private ikincielService:IkincielService) {
   
   }

  ngOnInit() {
  }

  getProducts(){
   this.ikincielService.getProducts().then(data=>{
     this.products = data;
   })
  }

}
