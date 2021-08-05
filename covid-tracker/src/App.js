import React, {useState,useEffect} from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from '@material-ui/core';
import "./InfoBox";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import {sortData , prettyPrintStat} from './utils';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css"
import numeral from "numeral";

function App() {
  //***state defenition***/
  //state = varible
  // varible to hold the countries pulled from the api
 //mapped to an array
 const [countries, setCountries] = useState([]);
 //variable which is going to hold individual country names 
 //going to be used to link the dropdown to the api data
 const [country,setCountry] = useState("worldwide");
 //country info will hold all of the covid data for that one particular country
 const [countryInfo,setCountryInfo] =  useState({});
 //defining a state which will hold the table data varibles
 const [tableData, setTableData] = useState([]);
 //setting the map zoom and map center
 const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
 const [mapZoom, setMapZoom] = useState(3);
 const [mapCountries, setMapCountries] = ([]);
 const [casesType, setCasesType] = useState("cases");


 //use effect - calling a loop function everytime something in the varible 
 //changes 

 //this use effect will update the worldwide tag on the application start 
 // and when the user switches back from another country
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then ((response) => response.json())
    .then ((data) => {
      setCountryInfo(data)
    });
  },[]);

  useEffect(() => {
    const getCountriesData = async() =>{
      // call the disease.sh api for country data
      //await the response from the api 
      //fetch = call the api 
      await fetch("https://disease.sh/v3/covid-19/countries")
      // after getting the response return the json from the response
        .then((response) => response.json())
        .then((data) => {
        //map function loops through and creates an array with values
        const countries = data.map((country) =>(
          {
            //remapping the country vaible to store:
            //country name & iso (UK ETC)
            name:country.country,
            value: country.countryInfo.iso2 //USA, UK ETC
          }));
          
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
          
      })
     }
     //calling a async function within a useeEffect
     getCountriesData();
    }, []);
 
  //function which listens for the country change in dropdown
  //then displays the country that is being views in the dropdown
  const onCountryChange = async (e) =>{
    const countryCode = e.target.value;
    const url = 
    //if country code is the same value and type as "worldwide"
    //call the all api address
    //else call the countries api concatenated with the country code var
      countryCode === "worldwide" 
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
//waiting for the async function to run once that has ran
//feths the correct url and pass it as a param 
//get the response and ONLY pull the json from the reponse
//then pull the data and set the country code var and countryINFO to the data 
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat,data.countryInfo.lng]);
        setMapZoom(4);
      });
  };

  //this will output the json response into the console
  //usefull for checking the json key names
  //console.log("json output",countryInfo)

 return (
   <div className = "app">
     <div className = "app__left">
       {/*Header*/}
        {/*Title + select input (dropdown)*/}
       <div className = "app__header">
       <h1>Covid-19 Tracker </h1>
       <FormControl className="app__dropdown">
        <Select variant = "outlined" onChange={onCountryChange} value = {country}>
          <MenuItem value = "worldwide">Worldwide</MenuItem>
          {/*JSX*/}
            {countries.map((country) =>(
              //call the remapped version of country.value & .name
              <MenuItem value ={country.value}>{country.name}</MenuItem>
            ))}  
        </Select> 
       </FormControl>
       </div>
       <div className = "app__stats">
        {/*infobox - cases*/}
        <InfoBox 
           onClick={(e) => setCasesType("cases")}
           title="Coronavirus Cases"
           isRed
           active={casesType === "cases"}
           cases={prettyPrintStat(countryInfo.todayCases)}
           total={numeral(countryInfo.cases).format("0.0a")}
        />
        {/*infobox - recovers*/}
        <InfoBox 
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
         />
        {/*infobox - deaths*/}
        <InfoBox 
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            isRed
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
        />
       </div>
        {/*map*/}
        <Map
          countries = {mapCountries}
          casesType = {casesType}
          center = {mapCenter}
          zoom = {mapZoom}
        />
     </div>
     <Card className="app__right">
        <CardContent>
          <div classname = "app__information">
            {/*table*/}
            <h3>Cases By Country</h3>
            <Table countries = {tableData}/>
            <h3>WorldWide New Country</h3>
            <LineGraph />
          </div>
        </CardContent>
     </Card>
   </div>  
 ); 
}

export default App;
