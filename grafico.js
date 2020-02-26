function carregarChart() {

    var dps = []; // dataPoints
    var dps2 = [];
    var dps3 = [];
    var dps4 = [];
    var dps5 = [];
    var dps6 = [];
    CanvasJS.addColorSet("joaninhas", [ //colorSet Array

                "#FF0000",
                "#00FF00",
                "#0000FF",
                "#FFFF00",
                "#00FFFF",
                "#FF00FF"
                ]);
    var chart = new CanvasJS.Chart("chartContainer", {

        colorSet: "joaninhas",
        title: {
            text: "Número de joaninhas"
        },
        legend: {
            fontSize: 20,
            fontFamily: "Arial",
            fontColor: "Black"
        },
        data: [{
                type: "line",
                legendText: "Vermelhas",
            markerType: "circle",
                showInLegend: true,
                dataPoints: dps
			},
            {
                type: "line",
                legendText: "Verdes",
                markerType: "circle",
                showInLegend: true,
                dataPoints: dps2
            },
            {
                type: "line",
                legendText: "Azuis",
                markerType: "circle",
                showInLegend: true,
                dataPoints: dps3
            },
            {
                type: "line",
                legendText: "Amarelas",
                markerType: "circle",
                showInLegend: true,
                dataPoints: dps4
            },
            {
                type: "line",
                legendText: "Cianos",
                markerType: "circle",
                showInLegend: true,
                dataPoints: dps5
            },
            {
                type: "line",
                legendText: "Roxas",
                markerType: "circle",
                showInLegend: true,
                dataPoints: dps6
            }
            ]
    });

    var xVals = [0,0,0,0,0,0];
    var updateInterval = 1000;
    var dataLength = 30; // number of dataPoints visible at any point

    var updateChart = function (count) {
        count = count || 1;
        // count is number of times loop runs to generate random dataPoints.

        for (var j = 0; j < count; j++) {
            dps.push({
                x: xVals[0],
                y: ladyCount[0]
            });
            xVals[0]++;
        };
        for (var j = 0; j < count; j++) {
            dps2.push({
                x: xVals[1],
                y: ladyCount[1]
            });
            xVals[1]++;
        };
        for (var j = 0; j < count; j++) {
            dps3.push({
                x: xVals[2],
                y: ladyCount[2]
            });
            xVals[2]++;
        };
         for (var j = 0; j < count; j++) {
            dps4.push({
                x: xVals[3],
                y: ladyCount[3]
            });
            xVals[3]++;
        };
         for (var j = 0; j < count; j++) {
            dps5.push({
                x: xVals[4],
                y: ladyCount[4]
            });
            xVals[4]++;
        };
         for (var j = 0; j < count; j++) {
            dps6.push({
                x: xVals[5],
                y: ladyCount[5]
            });
            xVals[5]++;
        };
        if (dps.length > dataLength) {
            dps.shift();
        }
        if (dps2.length > dataLength) {
            dps2.shift();
        }
        if (dps3.length > dataLength) {
            dps3.shift();
        }
        if (dps4.length > dataLength) {
            dps4.shift();
        }
        if (dps5.length > dataLength) {
            dps5.shift();
        }
        if (dps6.length > dataLength) {
            dps6.shift();
        }

        chart.render();

    };

    // generates first set of dataPoints
    updateChart(dataLength);

    // update chart after specified time. 
    setInterval(function () {
        updateChart()
    }, updateInterval);
}
