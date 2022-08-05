import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
import "./Graph.css";
import store from "../../../Redux/Store";


function Graph(): JSX.Element {

    ChartJS.register(...registerables);

    const vacationList = store.getState().vacationState.vacation;
    const newVacation = vacationList.filter(v=> {
      if(v.followers > 0){
        return v
      }
      
  
    })

    console.log(newVacation);
    
    

    const graph = {
        labels: newVacation.map(v => v.location),
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
              label: 'Followers number',
              data: newVacation.map(v => v.followers),
              // you can set indiviual colors for each bar
              backgroundColor: [
                "#238c8f",
                "#06276e",
                "#6d9bff",
                "#2cfef8",
                "#7000ee"

              ],
              borderWidth: 1,
            }
        ]
}

    

 
    return (
        <div className="Graph">
        <Bar
          data={graph}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Admin graphs"
              },
              legend: {
                display: true,
                position: "bottom"
             }
            },
            scales: {
              y: {
                 ticks: {
                    stepSize: 1
                 }
              }
           },
          }}
        />
      </div>
    );
}

export default Graph;


