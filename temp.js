chartIt();

async function chartIt() {
  //call  get data function so datat loads
  const data = await getData();
  const ctx = document.getElementById("chart").getContext("2d");

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.xlabels,
      datasets: [
        {
          label:
            "Combined Land-Surface Air and Sea-Surface Water Temperature in C°",
          fill: false,
          data: data.yTemps,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
  });
}

//parse nasa csv file and format it correctly

async function getData() {
  const xlabels = [];
  const yTemps = [];

  const response = await fetch("ZonAnn.Ts+dSST.csv");
  const data = await response.text();
  // console.log(data);

  const table = data.split("\n").slice(1);
  table.forEach((ele) => {
    const col = ele.split(",");
    const year = col[0];
    //push ever year to x axis
    xlabels.push(year);
    const temp = col[1];
    yTemps.push(parseFloat(temp) + 14);
    console.log(year, temp);
  });

  return { xlabels, yTemps };
  // console.log(rows);
}