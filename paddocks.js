// References:
// * http://www.mathopenref.com/polygonirregulararea.html
// * http://www.mathopenref.com/coordtrianglearea.html
// * http://www.mathopenref.com/coordpolygonarea.html
// * http://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places
// * https://docs.nodejitsu.com/articles/file-system/how-to-read-files-in-nodejs
// * http://www.w3schools.com/jsref/jsref_regexp_whitespace.asp

fs = require("fs");

function areaOfPolygon(points) {
  var numPoints = points.length;
  var area = 0;
  for (var i = 0; i < numPoints; i++) {
    p1 = points[i];
    p2 = points[0];
    if (i < numPoints - 1) {
      p2 = points[i+1];
    }
    area += p1.x * p2.y - p1.y * p2.x;
  }
  area /= 2;
  area = Math.abs(area);
  return area.toFixed(2);
}

fs.readFile("coding test input coordinates .txt", "utf8", function(err, data) {
  var input = data.split("\r\n");
  for (var i = 0; i < input.length; i++) {
    // Ignore blank lines in input
    if (input[i].length === 0) continue;

    // Ignore comments in the file
    if (input[i][0] === '#') continue;

    // This is a bit hacky, but it splits a given line into a list of the numbers on that line.
    // The input was not 100% regular, so this got a little messy.
    var coordinates = input[i].replace(/\(/g, "").replace(/\)/g, " ").replace(/,/g, " ").split(/\s+/);
    var points = [];
    for (var j = 0; j < coordinates.length; j += 2) {
      // My splitting code above still includes a space at the end of the list, so this condition
      // prevents us from parsing that as a number.
      if (coordinates[j] === "") continue;
      points.push({x: parseInt(coordinates[j]), y: parseInt(coordinates[j+1])});
    }
    console.log(areaOfPolygon(points));
  }
});
