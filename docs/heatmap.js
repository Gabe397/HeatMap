const width = 1000;
const height= 3000;


var name = "name";
var rating = "rating";

var qualityLength = 125;
var cellSize = 25;

//Import the CSV File
d3.csv("cereals.csv", function(cereals){

    //data is the array of objects that have name and the rating.
    let data = cereals.map((d)=>{
        return{
            y: d[name],
            x: parseFloat(d[rating])
        };
    });
    //Puts both attributes in separate arrays.
    let cerealName = cereals.map((d)=>{return d[name]});
    let cerealRating = cereals.map((d)=> {return parseFloat(d[rating])});

    //This removes the first object in the data array so that all we have is data.
    data.shift();
    cerealName.shift();
    cerealRating.shift();


    //Make the Axis for the Names
    let svg = d3.select("svg").attr("height", 3050).attr("width",width).attr("transform","translate(200,-190)");


    let yScale = d3.scaleBand().domain(cerealName).range([0,height]);
    let yAxis = d3.axisLeft().scale(yScale);
    svg.append("g")
        .call(yAxis)
        .attr("transform","translate(10,225)");

    //Make the quality Axis
    let xScale = d3.scaleBand().domain(["Quality"]);
    let xAxis = d3.axisTop().scale(xScale);
    svg.append("g").call(xAxis).attr("transform","translate(12,225)");



    //Make Color Scale
    let colorScale = d3.scaleThreshold().domain([d3.min(cerealRating), d3.max(cerealRating)]).range(["#2980B9", "#E67E22", "#27AE60", "#27AE60"]);

    //Make the Cells
    let cell = svg.selectAll("rect").data(data);

    cell.enter().append("g")
                .append("rect")
                .attr("class", "cell")
                .attr("width",cellSize)
                .attr("height",cellSize)
                .attr("y",function(d){return yScale(d.y)})
                .attr("x",120)
                .attr("fill", function(d){return colorScale(d.x)})
                .attr("transform", "translate(-90, 225)");




});