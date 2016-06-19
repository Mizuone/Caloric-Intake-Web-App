if (typeof(FoodSpace === "undefined")) {
    var FoodSpace = {};
}
$(document).ready(function() {
    FoodSpace = function() {
            var setCalorie = $("#calorietotal").val(itemCalorie),
                itemCalorie = 0;
            //be more specific for each value dropped into the box
            //Add a delete icon for each list item
            //remove value when it leaves the boxes
        FoodSpace.addDragAndDrop = function() {
            $(".breakfestitem, .lunchitem, .dinneritem, .snackitem, #searchcontainer ul li").droppable({
               accept: "#searchcontainer ul li",
                tolerance: "pointer",
                drop: function(event, ui) {
                    $(this).addClass("cell-dropped");
                    $(ui.draggable).appendTo(this);
                    itemCalorie = 0;
                    $(".breakfestitem li p").each(function(index) {
                        //console.log(index + ": " + $(this).text());
                        itemCalorie += parseInt($(this).text());
                    });
                    $(setCalorie).val(Math.floor(itemCalorie));
                }

            });
            $("#searchcontainer ul li").draggable({
                opacity: 0.7,
                helper: "clone",
                scroll: true
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
                                output += '<h3>'+ val.Display_Name +'</h3>';
                                output += '<p>'+ val.Calories +'</p>';
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
