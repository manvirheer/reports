/*
Data will look like
[
  Patrol on Day X1, Patrol on Day X2, Patrol on Day X2, Patrol on Day X2, Patrol on Day X3
]


Patrols on Day X1 -> Count
Patrols on Day X2 -> Count
Patrols on Day X3 -> Count

[{value = '', date = ''}, {value = '', date = ''}, {value = '', date = ''}]

*/
class Patrol {
  constructor(tour, account, name, result, startTime,  duration, notes) {
    this.id = uuidv4();
    this.tour = tour;
    this.account = account;
    this.name = (name != '') ? name : 'None';
    this.result = result;
    this.startTime = new Date(startTime);
    this.endTime = (new Date(this.startTime)).setHours(endTime.slice(0, 2), endTime.slice(4,6));
    this.duration = duration;
    this.notes =  (notes != '') ? notes : 'None';
  }
  
  uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  
  }
}
patrols = []
var parseDate = (fileContent) => {
  //Rows of CSV
  var rows = fileContent.split('\n');
  for(let i =1 ; i < rows.length ; i++){
    var singleRow = rows.split(',')
    var newTour = new Patrol(singleRow[0],singleRow[2], singleRow[3], 
    singleRow[4], singleRow[5], singleRow[7], singleRow[9] );
    patrols.push(newTour)
  }
}

Date.prototype.withoutTime = function () {
  var d = new Date(this);
  d.setHours(0, 0, 0, 0);
  return d;
}

dates = [];

if(!patrols)
dates.push(patrols[0].startTime.withoutTime());

for (let i = 1; i < patrols.length; i++) {
  if(!dates.includes(patrols[i].startTime.withoutTime()))
  dates.push(patrols[i].startTime.withoutTime());
}

console.log(dates)