import { Component } from '@angular/core';
import { NgForm} from "@angular/forms";
import { ShoppingListService } from "../../services/shopping-list";
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  constructor(private slService:ShoppingListService){

  }

  onAddItem(form:NgForm){
    this.slService.addItem(form.value.ingridientName,form.value.ingridientAmount);
    form.reset();
  }

}
