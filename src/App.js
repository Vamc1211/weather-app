
import './App.css';
import React from 'react';

function App() {
  const myKey="BMY8Q66RDYSPW28HLLPV9LUDT";
  const [city,setCity]=React.useState("");
  const[submitted,setSubmitted]=React.useState(false);
  const[wresponse,setWresponse]=React.useState({
    currentConditions:{
      cloudcover:"",
      conditions:"",
      feelslike:"",
      humidity:""
    },
    description:""
  })


  React.useEffect(() => {
    var isFetching=true;
    async function fetchData(){
        await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+city+"?key="+ myKey, {
      "method": "GET",
      // "headers": {
      // }
    })
      .then(
        response => {
          if(isFetching){
        response.json().then((s)=>{
          console.log(s);
          setWresponse(s);
        });
      }}
    )
      .catch(err => {
        console.error(err);
      });
    }
    fetchData();
      return()=>
        {
          isFetching=false;
          setSubmitted(false);
        }  
}, [submitted])
function handleChange(event)
{
  setCity(event.target.value);
}
async function handleSubmit(event){
  console.log("hello")
  const {currentConditions:{feelslike}}=wresponse;
  console.log(feelslike);
  event.preventDefault();
  setSubmitted(submitted=>!submitted);
  let result=await fetch("http://localhost:8080/weather",{
    method:"post",
    body:JSON.stringify({city:city ,feelslike:feelslike}),
    headers:{'Content-Type':'application/json'}
  }
  )
  result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved succesfully");
  
}}
  return (
    <div className="App">
      <header className="App-header">

        <form action="../../post" method="post"
          className="form">
          <button type="submit">Connected?</button>
        </form>

        <form onSubmit={handleSubmit} >
          <input 
          type='text' 
          name="city"
          placeholder="Enter the name of the city"
          onChange={handleChange}
          value={city}
           />
           <button>Submit</button>
        </form>
        <div className="result">
          <p>cloudcover:{wresponse.currentConditions.cloudcover}</p>
          <p>conditions:{wresponse.currentConditions.conditions}</p>
          <p>feelslike: {wresponse.currentConditions.feelslike}</p>
          <p>humidity: {wresponse.currentConditions.humidity}</p>
          <p>description: {wresponse.description}</p>
        </div>

      </header>
    </div>
  );
}

export default App;
