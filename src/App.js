import './App.css';
import  Map  from './components/map/Map'
import { useJsApiLoader } from '@react-google-maps/api';
import './App.css'

const API_KEY = process.env.REACT_APP_API_KEY;
console.log(API_KEY);
const defaultcenter = {
  lat: 50.457,
  lng: 30.524,
  
};

const libraries = ['places']


const App = () => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries,
  });
  
  return (
    <div className="App">

{isLoaded ? <Map center={defaultcenter} /> : <h3>loading</h3>}


      
    </div>
  );
}

export default App;
