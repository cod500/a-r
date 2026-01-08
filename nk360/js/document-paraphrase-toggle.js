$(function () {

    $('input:radio[name=documentRadio-a]').change(function(){
      if($(this).attr("value")=="document"){
        $("#paraphrase-a-text").hide();
        $("#document-a-text").show();
      } 
      if($(this).attr("value")=="paraphrase"){
        $("#document-a-text").hide();
        $("#paraphrase-a-text").show();
      }
    });

    $('input:radio[name=documentRadio-b]').change(function(){
        if($(this).attr("value")=="document"){
          $("#paraphrase-b-text").hide();
          $("#b2-b-text").hide();
          $("#document-b-text").show();
        } 
        if($(this).attr("value")=="paraphrase"){
          $("#document-b-text").hide();
          $("#b2-b-text").hide();
          $("#paraphrase-b-text").show();
        }
        if($(this).attr("value")=="documentB2"){
          $("#document-b-text").hide();
          $("#paraphrase-b-text").hide();
          $("#b2-b-text").show();
        }
      });
      
      $('input:radio[name=documentRadio-c]').change(function(){
        if($(this).attr("value")=="document"){
          $("#paraphrase-c-text").hide();
          $("#document-c-text").show();
        } 
        if($(this).attr("value")=="paraphrase"){
          $("#document-c-text").hide();
          $("#paraphrase-c-text").show();
        }
      });
  });