/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { render } from "react-dom";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

function Mymap() {
  const [position, setPosition] = React.useState([0, 0]);
  const [locations, setLocations] = React.useState([]);
  const [current, setCurrent] = React.useState(1);

  const getPosition = new Promise(fulfillet => {
    navigator.geolocation.getCurrentPosition(position => {
      fulfillet(position);
    });
  });

  const coords = fetch(
    "https://my-json-server.typicode.com/yummta/my-json-server/locations"
  );

  React.useEffect(() => {
    getPosition.then(position => {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, [current]);

  React.useEffect(() => {
    coords
      .then(response => response.json())
      .then(locations => setLocations(locations));
  }, []);

  // React.useEffect(() => {
  //   async function run() {
  //     position = await getPosition
  //     setPosition([position.coords.latitude, position.coords.longitude]);
  //   }
  //   run()
  // }, [current]);

  function handleChange(e) {
    let idLocal = parseInt(e.target.value);
    if (!idLocal) {
      setCurrent(current + 1);
      return;
    }
    let locationSelected = locations.find(local => local.id === idLocal);
    setPosition([locationSelected.lat, locationSelected.lon]);
  }

  return (
    <>
      <header css={{ display: "flex", justifyContent: "center", padding: 16 }}>
        <h1 css={{ fontSize: 16, marginRight: 24 }}>
          Seven Wonders of the Ancient World
        </h1>
        <select onChange={handleChange}>
          <option defaultValue={0}>Your current location</option>
          {locations.map(location => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </header>
      <Map center={position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup.
            <br />
            Easily customizable.
          </Popup>
        </Marker>
      </Map>
    </>
  );
}

const $root = document.getElementById("root");
render(<Mymap />, $root);
