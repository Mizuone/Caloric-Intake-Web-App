if (typeof(FoodSpace === "undefined")) {
    var FoodSpace = {};
}
$(document).ready(function() {
    FoodSpace = function() {
            var setCalorie = $("#calorietotal").val(itemCalorie),
                itemCalorie = 0;
            //remove value when user clicks on the icon
        FoodSpace.addDragAndDrop = function() {
             var checkContent = 0;
            $(".breakfestitem, .lunchitem, .dinneritem, .snackitem, #searchcontainer ul li").droppable({
               accept: "#searchcontainer ul li",
                tolerance: "pointer",
                drop: function(event, ui) {
                   
                    $(this).addClass("cell-dropped");
                    $(ui.draggable).appendTo(this);
                    
                    
                    itemCalorie = 0;
                    $(".breakfestitem li p, .lunchitem li p, .dinneritem li p, .snackitem li p").each(function(index) {
                        
                        itemCalorie += parseInt($(this).text());

                        if (checkContent == 1) {
                            $(this).children("li p a").remove();
                            console.log("hello");
                            checkContent = 0;
                        }
                        
                        $("<a href='#'><span class='glyphicon glyphicon-remove deleteitem'></span></a>").appendTo(this);
                        checkContent++;
                    });
                    $(setCalorie).val(Math.floor(itemCalorie));
                }

            });
            $("#searchcontainer ul li").draggable({
                opacity: 0.7,
                helper: "clone",
                scroll: true
            });
              $(".breakfestitem li p, .lunchitem li p, .dinneritem li p, .snackitem li p").on('mouseover', 'p', function (e) {
                    self = $(this);
                  console.log("Hello");
                    //taskID = self.attr('id');
                    $(".createditems , .container").on('click', 'a', function (e) {
                        $(self).remove();
                        //localStorage.removeItem(taskID);
                    });
                });
        }
        FoodSpace.searchFunction = function () {
                $('#search').keyup(function() {
                    var searchField = $('#search').val();
                    var myExp = new RegExp(searchField, "i");

                    $.getJSON('FoodData/dataDump.json', function(data) {

                        var output = '<ul class="searchresults">';
                        $.each(data, function(key, val) {
                            if ((val.Display_Name.search(myExp) != -1) && $("#search").val() !== "" ||
                            (val.Calories.search(myExp) != -1) && $("#search").val() !== "") {
                                output += '<li>';
                                output += '<h3>' + val.Display_Name + " " + val.Portion_Display_Name + '</h3>';
                                output += '<p>' + val.Calories + 
                                    '</p>';
                                output += '</li>';
                            }
                        });
                        output += '</ul>';

                        $('#searchcontainer').html(output);
                        //console.log(itemCalorie);
                        FoodSpace.addDragAndDrop();
                    }); //get JSON
                });
            }
        FoodSpace.searchFunction();
        }
   FoodSpace();
    
    
})
