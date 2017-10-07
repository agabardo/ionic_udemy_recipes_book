import {Recipe} from "../models/recipe";
import {Ingredient} from "../models/ingredient";

export class RecipesService{
  private recipies : Recipe[] = [];

  private addRecipe(title:string, description:string, difficulty:string, ingredients:Ingredient[]){
    this.recipies.push(new Recipe(title,description,difficulty,ingredients));
  }

  private removeRecipe(index:number){
    this.recipies.splice(index,1);
  }

  private getRecipes(){
    return this.recipies.slice();
  }

  private updateRecipe(index:number, title:string, description:string, difficulty:string, ingredients:Ingredient[]){
    this.recipies[index] = new Recipe(title,description,difficulty,ingredients);
  }

}
