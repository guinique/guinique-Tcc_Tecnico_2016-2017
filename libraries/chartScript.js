function carregarChart() {
        var dps = []; // dataPoints

        var chart = new CanvasJS.Chart("chartContainer",{
            title :{
                text: "Live Random Data"
            },          
            data: [{
                type: "line",
                dataPoints: dps 
            }]
        });

        var xVal = 50;
        var yVal = 4;   
        var updateInterval = 100;
        var dataLength = 50; // number of dataPoints visible at any point

        var updateChart = function (count) {
            count = count || 1;
            // count is number of times loop runs to generate random dataPoints.
            
            for (var j = 0; j < count; j++) {
                dps.push({
                    x: xVal,
                    y: yVal
                });
                xVal++;
            };
            if (dps.length > dataLength)
            {
                dps.shift();                
            }
            
            chart.render();     

        };

        // generates first set of dataPoints
        updateChart(dataLength); 

        // update chart after specified time. 
        setInterval(function(){updateChart()}, updateInterval); 
    }