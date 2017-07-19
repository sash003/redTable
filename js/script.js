"use strict";


var $this, oldText, text, type, element, colName, colType, id, arrData, i, isRedact = 0;


$.ajaxSetup({
  url: 'php/worker.php',
  type: 'POST'
});


$("tbody td").attr('contenteditable', 'true').attr('spellcheck', 'false');


element = $("thead td").get(0);
$(element).find(".reddel").remove();


$("body").on('focus', "tbody td[contenteditable='true']", function(){
  oldText = $(this).text().trim();
  isRedact = 1;
});


$("body").on('blur', "tbody td[contenteditable='true']", function(){
  $this = $(this);
  text = $this.text().trim();
  if(text != oldText && isRedact){
    arrData = $this.attr('id').split('_col_');
    id = arrData[0].replace("row", '');
    colName = arrData[1];
    $.ajax({
      data: {
        func: "updateRow",
        id: id,
        colName: colName,
        text: text
      },
      success: function(res){
        console.log(res);
        if(res == 1){
          
        }
      }
    });
  }
  isRedact = 0;
});


$("tbody tr").each(function(){
  $this = $(this);
  $this.find("td:first-child").attr('contenteditable', 'false').append("<span class='reddel' contenteditable='false'><img src='images/del.png' class='delRow' alt='' /></span>")
});


$(".delRow").on('click', function(){
  id = $(this).closest("td").text();
  $("#delRow").show();
});


$("#delRowConf").on('click', function(){
  $.ajax({
    data:{
      func: 'delRow',
      id: id
    },
    success: function(res){
      console.log(res)
      if(res == 1){
        location.reload();
      }else{
        $("#delRowConf").css('background', 'red');
      }
    }
  });
});


$("#addRow").on('click', function(){
  $.ajax({
    data: {
      func: 'addRow'
    },
    success: function(res){
      console.log(res)
      if(res == 1){
        location.reload();
      }
    }
  });
});


$("body").on('click', ".red", function(){
  element = $(this).closest("td");
  element.attr('contenteditable', 'true').focus();
  oldText = element.text();
  isRedact = 1;
});


$("body").on('click', ".del", function(){
  element = $(this).closest("td");
  colName = element.text();
  $("#delColumn").show();
});


$("#delCol").on('click', function(){
  $.ajax({
    data: {
      func: 'delColumn',
      colName: colName
    },
    success: function(res){
      if(res == 1){
        location.reload();
      }else{
        $("#delCol").css('background', 'red');
      }
    }
  });
});


$("body").on('click', "#addCol", function(){
  colName = $("#colName").text();
  colType = $("#colType").text();
  $.ajax({
    data: {
      func: 'addColumn',
      colName: colName,
      colType: colType
    },
    success: function(res){
      console.log(res)
      if(res == 1){
        location.reload();
      }else{
        $("#addCol").css('background', 'red');
      }
    }
  });
});


$("body").on('blur', "thead td", function(){
  $this = $(this),
    text = $this.text(),
    type = $this.data('type');
  if(text != oldText && isRedact){
    $.ajax({
      data: {
        func: 'setNewColumnName',
        oldName: oldText,
        name: text,
        type: type
      },
      success: function(res){
        console.log(res)
        if(res != 1){
          $this.css('background', 'red');
        }else{
          location.reload();
        }
      }
    });
  }
  $this.attr('contenteditable', 'false');
  isRedact = 0;
});


$("body").on('keypress', "td", function(e){
  if (e.keyCode == 13) {
    preventdefault(e);
  } 
});

$("#addColumn").on('click', function(){
  $("#addColumnDo").show();
  $("#colName").focus();
});


set_center();
$(window).on('resize', set_center);




/* Functions */
// скрытие элемента по клику вне его
$(document).mouseup(function(e) { // событие клика по веб-документу
  e = e || window.event;
  var elems = [$("#addColumnDo"), $("#delColumn"), $("#delRow")];
  for (i = 0; i < elems.length; i++) {
    var el = elems[i];
    if (!el.is(e.target) // если клик был не по нашему блоку
      &&
      el.has(e.target).length === 0) { // и не по его дочерним элементам
      el.hide(); // скрываем его
    }
  }    
});


function preventdefault(e){
  e = e || window.event;
  if(e.preventDefault) e.preventDefault();
  else e.returnValue  = false;  
}


function set_center() {
  var el_for_center = [$("#addColumnDo"), $("#delColumn"), $("#delRow")], // центрируемые элементы
    window_width = $(window).width(),
    window_height = $(window).height();
  for (var i = 0; i < el_for_center.length; i++) {
    var box_center = el_for_center[i],
      box_width = box_center.width(),
      box_height = box_center.height(),
      topPadding = parseInt(box_center.css('paddingTop')),
      leftPadding = parseInt(box_center.css('paddingLeft'));
    box_center.css('top', (window_height - box_height) / 2 - topPadding).css('left', (window_width - box_width) / 2 - leftPadding);
  }
}