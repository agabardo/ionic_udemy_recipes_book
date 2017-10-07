import {Ingredient} from "./ingredient";

export class Recipe{
  constructor(public title:String, public description:String, public dificulty:String, public ingredients:Ingredient[]){

  }
}