import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as V from 'victory';
import { VictoryBar , VictoryChart, VictoryAxis, VictoryLine, VictoryLegend,VictoryStack } from 'victory';
import './index.css';
import logo from './logo.jpg'; 


const data = require('./payload.json')
const data2 = require('./geracao.json')

for(var i = 0; i<data.length; i++){
    data[i].timestamp = new Date(data[i].timestamp)
}
for(i = 0; i<data2.length; i++){
  data2[i].timestamp = new Date(data2[i].timestamp)
}



const App = () =>{
  let array =    [<VicChart />, <VicLine />];
  const [chart, setChart] = useState(0)
  return(
  <div>
  {array[chart]}     
    <button className="button" onClick={() => setChart(1)}>Grafico de Linhas</button> 
    <br></br>
    <button className="button" onClick={() => setChart(0)}>Grafico de Barras</button>
      
  </div>
);}

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1><center>Payload:</center>&emsp;<img src={logo} alt="Logo" width="30%" height="30%"/></h1>
      </div>
    );
  }
}

class VicLine extends React.Component{
  render(){
return(       
<VictoryChart
        scale={{ x: "time" }}
        height={175}
        width={300}
        domainPadding={8}
       // domainPadding={{ x: 24, y: [0, 15] }}
>
<VictoryLegend x={250} y={105}
    centerTitle
    orientation="vertical"
    //gutter={15}
    data={[
      { name: "Consumo", symbol: { fill: "#ff00ff" } },
      { name: "Geracao", symbol: { fill: "#ffc0ff", type: "star" } },
    ]}
    style={{
      data: { stroke: "black", strokeWidth: .2 },
      labels: { fill: "tomato", fontSize: 5 }
    }}
/>
  <VictoryStack> 
    <VictoryLine
      // const VictoryStack = "aparentemente essa <tag> distorce os dados da geracao por algum motivo"
      style={{
        data: { stroke: "#ff00ff", strokeWidth: .5
        },
        parent: { border: "5px solid #ccc"}
        }}
      padding={{ top: 20, bottom: 20 }}
      data={data}
      y="data"
      x="timestamp"
    />
    <VictoryLine
      style={{
         data: { stroke: "#ffc0ff", strokeWidth: .5
           },
         parent: { border: "5px solid #ccc"}
         }}
      padding={{ top: 20, bottom: 20 }}
      data={data2}
      y="data"
      x="timestamp"
    />
  </VictoryStack>
  <VictoryAxis 
    tickValues={[ data[12].timestamp, data[36].timestamp, data[60].timestamp, data[84].timestamp,data[108].timestamp,data[132].timestamp, data[156].timestamp,data[180].timestamp]}
    tickFormat={["1am", "3am", "5am", "7am", "9am","11am", "1pm", "3pm"]}
    //tickFormat={(y)=>(`${y.getHours()}:00`)}
    label="Horario"
    style={{
          axis: {stroke: "#ffffff"},
          axisLabel: {fill: "#ff6347", fontSize: 10, padding: 15},
          grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : "grey"},
          ticks: {stroke: "grey", size: 5},
          tickLabels: {fontSize: 5, padding: 1}
       }}
    />
  <VictoryAxis
    dependentAxis
    orientation="left"
    tickValues={[0, 20, 40, 60, 80,100]}
    tickFormat={(x)=>(`${x}`)}
    label="Potencia [kW]"
    style={{
          axis: {stroke: "#ffffff"},
          axisLabel: {fill: "#ff6347", fontSize: 10, padding: 15},
          grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : "grey"},
          ticks: {stroke: "grey", size: 5},
          tickLabels: {fontSize: 5, padding: 1}
       }}
  />
</VictoryChart>
);
  }
}

class VicChart extends React.Component {
  render() {
    return (
      <VictoryChart
        scale={{ x: "time" }}
        height={175}
        width={300}
        domainPadding={8}
       // domainPadding={{ x: 10, y: [0, 12] }}
      >
  <VictoryLegend x={250} y={105}
    centerTitle
    orientation="vertical"
    gutter={15}
    data={[
      { name: "Consumo", symbol: { fill: "#ff00ff" } },
      { name: "Geracao", symbol: { fill: "#ffc0ff", type: "star" } },
    ]}
    style={{
      data: { stroke: "black", strokeWidth: .2 },
      labels: { fill: "tomato", fontSize: 5 }
    }}
  />
  <VictoryAxis 
    tickValues={[ data[12].timestamp, data[36].timestamp, data[60].timestamp, data[84].timestamp,data[108].timestamp,data[132].timestamp, data[156].timestamp,data[180].timestamp]}
    tickFormat={["1am", "3am", "5am", "7am", "9am","11am", "1pm", "3pm"]}
         // tickFormat={(y)=>(`${y.getHours()}:00am`)}
    label="Horario"
    style={{
      axis: {stroke: "#ffffff"},
      axisLabel: {fill: "tomato", fontSize: 10, padding: 15},
      grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : "grey"},
      ticks: {stroke: "grey", size: 5},
      tickLabels: {fontSize: 5, padding: 1}}}
  />
  <VictoryAxis
    dependentAxis
    orientation="left"
    tickFormat={(x)=>(`${x}`)}
    label="Potencia [kW]"
    style={{
        axis: {stroke: "#ffffff"},
        axisLabel: {fill: "tomato", fontSize: 10, padding: 15},
        grid: {stroke: ({ tick }) => tick > .5 ? "red" : "grey"},
        ticks: {stroke: "grey", size: 5},
        tickLabels: {fontSize: 5, padding: 1}}}
  />
  <VictoryStack>  
        <VictoryBar
                style={{
                  data: { fill: "#ff00ff"
                         }
                }}
          padding={{ top: 20, bottom: 20 }}
          data={data}
          y="data"
          x="timestamp"
          xOffset
        />
        <VictoryBar
          style={{
                  data: { fill: "#ffc0ff" //,fillOpacity: 0.5
                         }
            }}
          padding={{ top: 20, bottom: 20 }}
          data={data2}
          y="data"
          x="timestamp"
        />
  </VictoryStack>
      </VictoryChart>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
            <Main/>
        <App />
  </React.StrictMode>,
  document.getElementById('root'));