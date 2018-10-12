var values;

// сумує всі варіки
function getSummary(variant) {
  var summary;
  for (let i = 0; i < variant.length; i++) {
    if (i == 0) summary = variant[i];
    else summary *= variant[i];
  }
  return summary;
}
// отримає одну магію
function getVariant(arr, selection) {
  var localArr = new Array();

  for (let r = 0; r < arr.length; r++) {
    if (selection.indexOf(r) == -1) localArr.push(1 - arr[r]);
    else localArr.push(arr[r]);
  }
  return localArr;
}

// тут ще більша магія
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
      let position = selection[selected] + 1; position < maxElem; position++
    ) {
      selection[selected] = position;
      finalArr.push(getVariant(arr, selection));
      console.log("select:", selection);
    }
    if (selection[selected] != undefined) maxElem = selection[selected];
  }

  return finalArr;
}

// тут магія
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

// тут вводяться дані
function build(result) {
  $("#result").empty();
  for (let i = 0; i < result.length; i++) {
    const element = result[i];
    $("#result").append("<div class='itm header'>X" + i + "</div>");
    $("#result").append("<div class='itm'>" + element + "</div>");
  }

}

// тут понятно
function chekForNotDecimal(array) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (element > 1) {
      console.log("cheking:",element);
      error();
      return false;
    }
  }
  return true;
}

// зробити помилку
function error() {
  $("#ps").addClass("error");
}

// функція апдейту візуалу
function update() {
  $("#ps").removeClass("error");
  values = $("#ps")
    .val()
    .split(",");

  summs = new Array();

  if (!chekForNotDecimal(values))
    return 0;

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

    let occuracity = $("#fixRanger").val();
    try {
      summ = parseFloat(summ);
      summs.push(summ.toFixed(occuracity));
    } catch (error) {
      console.error("unable to fix variable!");
      summs.push(summ);
    }

    function getArr(numb) {
      var arr = new Array();
      for (let i = 0; i < numb; i++) {
        arr[i.toString()] = "викон. " + i.toString() + " події(я)";
      }
      return arr;
    }
    console.log("FIN PARAMS:", summs);
    // plot vars
    var plot = [{
      x: getArr(summs.length),
      y: summs,
      type: 'bar',
      hoverinfo: 'all',
      name: "",
      hovertext: getArr(summs.length),
      textposition: "outside"
    }];
    // plot layout
    var layout = {
      width: 250,
      height: 200,
      margin: {
        l: 1,
        r: 1,
        b: 1,
        t: 20,
        pad: 4
      }
    };
    console.log("plot params:", plot.y, plot.x);
    Plotly.newPlot("graph", plot, layout, {
      displayModeBar: false
    });
  }
  build(summs);
  console.log(summs);
}

function Load() {
  update();
  $("#ps").change(() => update());
  $("#fixRanger").change(() => update());
}