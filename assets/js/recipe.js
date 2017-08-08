//query string (grabs variable from url that was passed from another file)
//pull queryString, convert to array, and assign to variable
var pulledId = location.search.split("");
console.log(pulledId.length);

//convert array back to string after getting rid of unneeded characters 
recipeId = pulledId.splice(10,10).join("");




var ingredientItm = "";
//search for recipe 
   $.ajax({
      url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids="+ recipeId + "&includeNutrition=false",
      method: "GET",
      headers: {
        'X-Mashape-Key': 'hEdGclV7jVmshkmKjchqulNrCcgzp1XKHiCjsnzIfe0SKhnTRf',
        'Accept': 'application/json'   
     }

    })




  //after ajax request is complete
    .done(function (response2) {
        var groceryLst;
        var alreadyListed;
        console.log(response2);
         
         var imgUrl = response2[0].image;
         var title = response2[0].title;
         var lstStep = response2[0].analyzedInstructions[0].steps;
         //display image and title
         $(".card-content").html("<h6>" + "<center>" + title + "</center>" + "</h6>");
         $(".card-image").html("<img id=recipeImg src='" + imgUrl + "'>");
         
         


         //list instructions
         for (var i=0; i<lstStep.length; i++){
         $("#instructions").append("<tr>" + "<td>" + "<input type='checkbox' id= 'step" + [i] + "'/><label for='step" + [i] + "'>" + lstStep[i].step + "<br>");
      }
        


       //list ingredients
       var ingredientLst = response2[0].extendedIngredients;
       for (var i=0; i<ingredientLst.length; i++){
          var imgUrl = ingredientLst[i].image;
          var ingredientImg = ("<img src='" + imgUrl + "'>")
          console.log(ingredientImg);

         $("#ingredients").append("<tr>" + "<td>" + "<input type='checkbox' id= 'checkItem" + [i] + "'/><label for='checkItem" + [i] + "'>" + ingredientLst[i].originalString + "</label></td>");
        
        }


       //list grocery list items
       groceryLst = response2[0].extendedIngredients;
       alreadyListed = [];

       for (var i=0; i<groceryLst.length; i++){

          var imgUrl = groceryLst[i].image;
          //if the grocery item was not listed already
          if (alreadyListed.indexOf(imgUrl) < 0){
            //add to alreadyListed array
            alreadyListed.push(imgUrl);
            //assign the img tag with the img url into a variable
            var groceryImg = ("<img class = groceryItem src='" + imgUrl + "'>");
          
            //display grocery list with associated image.
            $("#groceries").append("<tr>" + "<td>" + "<input type='checkbox' id= 'checkItemtwo" + [i] + "'/><label for='checkItemtwo" + [i] + "'>" + groceryLst[i].name + "</label>" +"</td><td>" + groceryImg + "</td>");
        }
      }
    })


      

