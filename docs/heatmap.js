const width = 2600;
const height= 500;


var name = "name";
var rating = "rating";

//Import the CSV File
d3.csv("cereals.csv", function(cereals){

    //data is the array of objects that have name and the rating.
    let data = cereals.map((d)=>{
        return{
            x: d[name],
            y: parseFloat(d[rating])
        };
    });
    //Puts both attributes in separate arrays.
    let cerealName = cereals.map((d)=>{return d[name]});
    let cerealRating = cereals.map((d)=> {return d[rating]});

    //This removes the first object in the data array so that all we have is data.
    data.shift();
    cerealName.shift();
    cerealRating.shift();



    //Make the Axis for the Names
    let svg = d3.select("svg").attr("height", height).attr("width",width);


    let xScale = d3.scaleBand().domain(cerealName).range([0,width]);
    let xAxis = d3.axisTop().scale(xScale).tickSizeInner(20);
    svg.append("g")
        .call(xAxis)
        .attr("transform","translate(10,200)");


});