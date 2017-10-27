import {Recipe} from "../models/recipe";
import {Ingredient} from "../models/ingredient";

export class RecipesService{
  private recipies : Recipe[] = [];

  public addRecipe(title:string, description:string, difficulty:string, ingredients:Ingredient[]){
    this.recipies.push(new Recipe(title,description,difficulty,ingredients));
  }

  public removeRecipe(index:number){
    this.recipies.splice(index-1,1);
  }

  public getRecipes(){
    return this.recipies.slice();
  }

  public updateRecipe(index:number, title:string, description:string, difficulty:string, ingredients:Ingredient[]){
    this.recipies[index] = new Recipe(title,description,difficulty,ingredients);
  }

}
