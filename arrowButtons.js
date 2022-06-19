function setCurrentFocus(obj) {
  current_focus = obj.id;
}

$(document).ready(function () {
  $('#NAME').click(function () {
    $('#keyboard').slideDown();
  })
});

$(document).ready(function () {
  $('.keybutton').click(function () {
    $('#' + current_focus).focus();
  });
});

$(document).ready(function () {
  $('#back').click(function () {
    moveCursor(-1, current_focus);
  });
  $('#fwd').click(function () {
    moveCursor(1, current_focus);
  });
});

function moveCursor(step, object_id) {
  inp = document.getElementById(object_id);
  if (inp.createTextRange) {
    console.log(11);
    var part = inp.createTextRange();
    part.move('character', 2);
    part.select();
  } else if (inp.setSelectionRange) {
    var position = document.getElementById(object_id).selectionStart;
    inp.setSelectionRange(position + step, position + step);
  }
  inp.focus();
}
