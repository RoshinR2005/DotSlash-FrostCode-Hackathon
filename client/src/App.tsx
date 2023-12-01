import "leaflet/dist/leaflet.css";
import "./App.css";
import Map from "./components/Map";

function App() {
    return (
        <>
            <div className="width-full h-full border">
                <Map />
            </div>
        </>
    );
}

export default App;
