import React from "react";
import { render } from "react-dom";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

function Mymap() {
  const [position, setPosition] = React.useState([0, 0]);

  const getPosition = new Promise((fulfillet, reject) => {
    navigator.geolocation.getCurrentPosition(position => {
      fulfillet(position);
    });
  });

  React.useEffect(() => {
    getPosition.then(position => {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, [position]);

  function handleChange() {
    setPosition([32.5355, 44.4275]);
  }

  return (
    <>
      <Map center={position} zoom={15}>
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
      <select onChange={handleChange}>
        <option value="a">value A</option>
        <option value="b">value B</option>
        <option value="c">value C</option>
      </select>
    </>
  );
}

const $root = document.getElementById("root");
render(<Mymap />, $root);
