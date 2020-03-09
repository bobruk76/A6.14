const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

function round() {
  $(".target")
   .removeClass("target")
   .empty();

  let divSelector = randomDivId();
  let missSelector = randomDivId();

  $(missSelector).addClass("miss");
  
  $(divSelector)
    .addClass("target")
    .text(hits+1);

  if (hits === 0) {
    firstHitTime = getTimestamp();
  }
  
  if (hits === maxHits) {
    endGame();
  }
}

function reloadGame() {
  hits = 0;
  $(".grid-wrapper").removeClass("d-none");
  $("#win-message").addClass("d-none");
  initProgress();
  round();
};

function endGame() {

  $(".grid-wrapper").addClass("d-none");
  $("#progressbar").addClass("d-none");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    addProgress();
    $(".miss").removeClass("miss");
    hits = hits + 1;
   
    round();
  } else { if($(event.target).hasClass("miss")) {

  }}

}

function initProgress() {
  $("#progressbar")
      .attr("aria-valuenow",0)
      .css("width", "0%")
      .text("")
      .removeClass("d-none");
};

function addProgress(procent = 100 / maxHits) {
  $("#progressbar").each(function() {
    let current_progress = procent + parseInt($(this).attr("aria-valuenow"));
    $(this)
      .attr("aria-valuenow",current_progress)
      .css("width", current_progress + "%")
      .text(current_progress+"%");
  }); 
}

function init() {
  const template = item =>{
    const $square = $(`<div class="game-field" id="slot-${item}"></div>`);
    $(".grid-wrapper").append($square);
  };

  for(let i = 0; i < numDivs; ++i){
      template(10 * (div(i,6)+1) + i % 6 +1);
}
  round();
  $(".game-field").click(handleClick);
  $("#button-reload").click(reloadGame);
}

$(document).ready(init);
