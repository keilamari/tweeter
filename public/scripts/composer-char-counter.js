$(document).ready(function() {
  $("textarea").on('input', function() {
    let charCount = (this.value).length;
    $('output')[0].innerText = 140 - charCount;
    if ($('output')[0].innerText < 0) {
      $('output')[0].className = 'counter-under';
    } else if ($('output')[0].innerText >= 0) {
      $('output')[0].className = 'counter';
    }
  });
});