import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  sale$; //this.service.getSales();
  constructor(private service: MainService) { 
    this.service.getSales().subscribe(data => 
      {
        let object = []; 
        Object.entries(data).forEach(([key,value]) => {
          object.push(value)
        });
        console.log(object)
        object = object.sort((a,b) => b['quantity'] - a['quantity'])  
        this.sale$ = object;
      }
    );
  }

  ngOnInit() {
    
  }

}
