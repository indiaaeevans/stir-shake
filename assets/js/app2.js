

searchByQuery();
function searchByQuery(){

  var pulledSrch = location.search.split("");
  console.log(pulledSrch.splice(0,3).join(""));
  var searchRecipe = pulledSrch.join("");
// // //Seacrh by Query
  var ingredientItm = "";
  console.log(searchRecipe)
  var queryURL1 = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=" + searchRecipe + "&instructionsRequired=true&extendedIngredients=true&instructions=true";
//search recipes
 $.ajax({
  url: queryURL1,
  method: "GET",
  headers: {
  'X-Mashape-Key': '2wfnmNyju2mshMtxvhjQLtmgC549p1UkpmNjsnc7dKbPWPNsgM',
  'Accept': 'application/json'   
  }

})

  .done(function(response) {

    var resultList = response.results;
    var baseURL = response.baseUri;
  
    

    for (var i=0; i<resultList.length; i++){
       var imgUrl = response.results[i].image;
       var title = response.results[i].title
       var recipeId = response.results[i].id;
       console.log(recipeId);
       var imgResult = "<div class='card option-card'><div class='card-image imgdiv'><a href='recipe.html?recipeId=" 
       + recipeId + "'><img class='recipe-option-img' id='recipe-option-img" + [i] + "' src='" + baseURL + imgUrl + 
       "'></div><p class=title>" + title + "</p></div>";

      
      $("#results-list").append(imgResult);
    }
      

      

  })
}




