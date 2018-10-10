var values;

function getSummary(variant) {
  var summary;
  for (let i = 0; i < variant.length; i++) {
    if (i == 0) summary = variant[i];
    else summary *= variant[i];
  }
  return summary;
}
function getVariant(arr, selection) {
  var localArr = new Array();

  for (let r = 0; r < arr.length; r++) {
    if (selection.indexOf(r) == -1) localArr.push(1 - arr[r]);
    else localArr.push(arr[r]);
  }
  return localArr;
}
function getVariants(arr, count) {
  let finalArr = new Array();
  if (count > arr.length) count = arr.length;

  selection = new Array(count);
  for (let i = 0; i < count; i++) {
    selection[i] = i;
  }
  finalArr.push(getVariant(arr, selection));
  console.log("select:", selection);
  var maxElem = arr.length;

  for (let selected = selection.length - 1; selected >= 0; selected--) {
    for (
      let position = selection[selected] + 1;
      position < maxElem;
      position++
    ) {
      selection[selected] = position;
      finalArr.push(getVariant(arr, selection));
      console.log("select:", selection);
    }
    if (selection[selected] != undefined) maxElem = selection[selected];
  }

  return finalArr;
}

function calc() {
  for (let selected = 0; selected < values.length; selected++) {
    let reversed;

    for (let itemsCount = 0; itemsCount < values.length; itemsCount++) {
      for (let pair = 0; pair < values.length; pair++) {
        if (pair != selected) reversed.push(1 - values[pair]);
        else reversed.push(values[pair]);
      }
      console.log(getResult());
    }
  }
}

function build(result)
{
    $("#result").empty();
    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        $("#result").append("<div class='itm header'>X"+i+"</div>");
        $("#result").append("<div class='itm'>"+element+"</div>");
    }
    
}

function update() {
  values = $("#ps")
    .val()
    .split(",");

    summs = new Array();
  for (let iter = 0; iter <= values.length; iter++) {
    variants = getVariants(values, iter);

    summaries = new Array();
    for (let i = 0; i < variants.length; i++) {
      const element = variants[i];
      summaries.push(getSummary(element));
      console.log(summaries[i]);
    }

    var summ = 0;
    for (let s = 0; s < summaries.length; s++) {
      summ += summaries[s];
    }
    summs.push(summ);
    console.log("FIN:", summ);
  }
  build(summs);
  console.log(summs);
}
function Load() {
  update();
  $("#ps").change(() => update());
}
