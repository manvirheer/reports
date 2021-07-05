let formFile = document.getElementById('formFile');
let chartSection = document.getElementById('chartSection');
let fileContents = ``;

formFile.addEventListener('change', handleFileSelect, false);

function dateFormatChanger(date) {
  return date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
}

class Patrol {
  constructor(tour, account, name, result, startTime, endTime, duration, notes) {
    this.id = this.uuidv4();
    this.tour = tour;
    this.account = account;
    this.name = name;
    this.result = result;
    this.startTime = new Date(startTime.replace(/\"/g, ''));
    let endHourMin = endTime.split(":");
    this.endTime = this.startTime.withoutTime().setHours(endHourMin[0], endHourMin[1]);
    this.duration = duration;
    this.notes = (notes != '') ? notes : 'None';
  }
  
  uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
      
    }
  }
  
  function isInArray(array, value) {
    for (let i = 0; i < array.length; i++) {
      debugger
       if( Math.abs(value.getTime() - array[i].getTime()) == 0){
        return i;
      }
    }
    return false;
  }
  
  function handleFileSelect(event) {
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
  }
  
  
  Date.prototype.withoutTime = function () {
    var d = new Date(this);
    d.setHours(0, 0, 0, 0);
  return d;
}

function handleFileLoad(event) {
  fileContents = event.target.result;
  patrols = dataParser(fileContents)
  chartData = calendarChartDataOrganizer(patrols)
  
}

function dataParser(data) {
  let results = []
  let rows = data.split('\n');
  for (let i = 1; i < rows.length; i++) {
    let singleRow = rows[i].split(',');
    if (singleRow[0] && singleRow[2] && singleRow[3] && singleRow[4] && singleRow[5] && singleRow[6] && singleRow[7]) {
      results.push(
        new Patrol(
          singleRow[0].replace(/\"/g, ''),
          singleRow[2].replace(/\"/g, ''),
          singleRow[3].replace(/\"/g, ''),
          singleRow[4].replace(/\"/g, ''),
          singleRow[5].replace(/\"/g, ''),
          singleRow[6].replace(/\"/g, ''),
          singleRow[7].replace(/\"/g, ''),
          singleRow[9].replace(/\"/g, ''))
      );
    }
  }
  return results;

}

function calendarChartDataOrganizer(patrols) {
  let dates = []
  let map = []
  debugger
  for (let i = 0; i < patrols.length; i++) {
    let results = {}
    let datePresent = isInArray(dates, patrols[i].startTime.withoutTime())
    if (!datePresent) {
      dates.push(patrols[i].startTime.withoutTime());
      let result = {
        "value": 0,
        "day": dateFormatChanger(patrols[i].startTime.withoutTime())
      }
      map.push(result)
    }
    // else{
    //   map[datePresent] = { "value" : ++map[datePresent].value, "day": dateFormatChanger(patrols[i].startTime.withoutTime()) }
    // }
  }
  
  console.log(dates)

}
