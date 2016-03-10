$(document).ready(function(){ 
   $("#serialize").click(function(){ 
	var myobj = {Name:$("#Name").val(),Comment:$("#Comment").val()}; 
	jobj = JSON.stringify(myobj); 
	$("#json").text(jobj);
	var url = "comment"; 
	$.ajax({ 
	  url:url, 
	  type: "POST", 
	  data: jobj, 
	  contentType: "application/json; charset=utf-8", 
	  success: function(data,textStatus) { 
		$("#done").html(textStatus); 
	  } 
	}) 
   }); 

  $("#getComments").click(function() { 
  $.getJSON('comment', function(data) { 
    console.log(data); 
    var everything = "<ul>"; 
    for(var comment in data) { 
      com = data[comment]; 
      everything += "<li>Name: " + com.Name + " -- Comment: " + com.Comment + "</li>"; 
    } 
    everything += "</ul>"; 
    $("#comments").html(everything); 
    }); 
  });//end getThem

  $("#delete").click(function() {
    $("#comments").html("Comments deleted.");
    $("#json").text("");
  $.ajax({
	url: 'comment',
	type: 'DELETE',
	success: function(result) {
	  $("#done").text("Comments deleted");
	}
    });
  });

  $("#submitcomic").click(function(){
        var filename = $("#filename").val();
        var myobj = {Filename:$("#filename").val(),Keywords:$("#keywords").val(),
		Searchable:$("#textbox").val()};
        var jobj = JSON.stringify(myobj);
	console.log(jobj);
        $("#submittedtext").text(jobj);
        var url = "comic";
        $.ajax({
          url:url,
          type: "POST",
          data: jobj,
          contentType: "application/json; charset=utf-8",
          success: function(data,textStatus) {
                $("#status").html(textStatus);
          }
        })
  });

  $("#getComics").click(function() {
    $.getJSON('comic', function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var items in data) {
        var item  = data[items];
        everything += "<li>Filename: " + item.Filename + " -- Key Words: " 
  	+ item.Keywords + "  Searchable Text: " + item.Searchable + "</li>";
      }
      everything += "</ul>";
      $("#dbcontents").html(everything);
      console.log(everything);
    });
  });//end getThem




});//end document ready	
