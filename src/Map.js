import { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';



function Map() {
    const [stations, setStations] = useState([]);
    const apiUrl = '/api';
    const phenomenonMap = {
        'Clear': 'Selge',
        'Few clouds': 'Vähene pilvisus',
        'Variable clouds': 'Poolpilves',
        'Cloudy with clear spells': 'Peamiselt pilves',
        'Overcast': 'Pilves',
        'Light snow shower': 'Nõrk hooglumi',
        'Moderate snow shower': 'Mõõdukas hooglumi',
        'Heavy snow shower': 'Tugev hooglumi',
        'Light shower': 'Nõrk hoovihm',
        'Moderate shower': 'Mõõdukas hoovihm',
        'Heavy shower': 'Tugev hoovihm',
        'Light rain': 'Nõrk vihm',
        'Moderate rain': 'Mõõdukas vihm',
        'Heavy rain': 'Tugev vihm',
        'Glaze': 'Jäide',
        'Light sleet': 'Nõrk lörtsisadu',
        'Moderate sleet': 'Mõõdukas lörtsisadu',
        'Light snowfall': 'Nõrk lumesadu',
        'Moderate snowfall': 'Mõõdukas lumesadu',
        'Heavy snowfall': 'Tugev lumesadu',
        'Blowing snow': 'Üldtuisk',
        'Drifting snow': 'Pinnatuisk',
        'Hail': 'Rahe',
        'Mist': 'Uduvine',
        'Fog': 'Udu',
        'Thunder': 'Äike',
        'Thunderstorm': 'Äikesevihm',
        '': '-'
    };


    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(response.data, 'application/xml');
                const stationNodes = xml.querySelectorAll('station');
                const stations = Array.from(stationNodes).map(node => {
                    return {
                        name: node.querySelector('name').textContent,
                        latitude: Number(node.querySelector('latitude').textContent),
                        longitude: Number(node.querySelector('longitude').textContent),
                        phenomenon: node.querySelector('phenomenon').textContent,
                        temperature: Number(node.querySelector('airtemperature').textContent),
                        windSpeed: Number(node.querySelector('windspeed').textContent),
                        relativeHumidity: Number(node.querySelector('relativehumidity').textContent),
                        visibility: Number(node.querySelector('visibility').textContent),
                        precipitations: Number(node.querySelector('precipitations').textContent),
                        airpressure: Number(node.querySelector('airpressure').textContent),
                        windDirection: Number(node.querySelector('winddirection').textContent),
                        windspeed: Number(node.querySelector('windspeed').textContent),
                        windspeedMax: Number(node.querySelector('windspeedmax').textContent),
                        uvIndex: Number(node.querySelector('uvindex').textContent),
                        waterlevel: Number(node.querySelector('waterlevel').textContent),
                        waterlevel_eh2000: Number(node.querySelector('waterlevel_eh2000').textContent),
                        watertemperature: Number(node.querySelector('watertemperature').textContent),
                    };
                });
                setStations(stations);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);



    return (
        <MapContainer center={[58.802335, 25.420606]} zoom={8} scrollWheelZoom={false} style={{ height: '100vh' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="Map data © OpenStreetMap contributors" />

            {stations.map(station => (
                <Marker position={[station.latitude, station.longitude]}>
                    <Popup>
                        <h3>{station.name}</h3>
                        <p>Temperatuur: {station.temperature}°C</p>
                        <p>Tuule kiirus: {station.windSpeed} m/s</p>
                        <p>Olustik: {phenomenonMap[station.phenomenon]}</p>
                        <p>Relatiivne õhuniiskus: {station.relativeHumidity}%</p>
                        <p>Õhuniiskus: {station.relativeHumidity}%</p>
                        <p>Nähtavus: {station.visibility} km</p>
                        <p>Sademed: {station.precipitations} mm</p>
                        <p>Õhurõhk: {station.airpressure} hPa</p>
                        <p>Tuule suund: {station.windDirection}°</p>
                        <p>Tuule kiirus: {station.windspeed} m/s</p>
                        <p>Tuul puhanguti: {station.windspeedMax} m/s</p>
                        <p>UV indeks: {station.uvIndex}</p>
                        <p>Sisevee tase: {station.waterlevel} m</p>
                        <p>Merevee tase (EH2000): {station.waterlevel_eh2000} m</p>
                        <p>Vee temperatuur: {station.watertemperature}°C</p>
                    </Popup>
                    <Tooltip direction="bottom" offset={[-15.5, 25]} opacity={0.8} permanent>{station.name}</Tooltip>
                </Marker>
            ))}
        </MapContainer>
    );

}



export default Map;
