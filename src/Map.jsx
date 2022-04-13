import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  useZoomPan,
  Marker,
  Line,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const markers = [
  {
    markerOffset: -25,
    name: "Uruguay",
    coordinates: [-55.3816, -32.6037],
    val: "100,000",
  },
  {
    markerOffset: -25,
    name: "Moscow",
    coordinates: [28.1193, 50.4897],
    val: "60,000",
  },
  {
    markerOffset: -25,
    name: "Paris",
    coordinates: [2.1193, 45.4897],
    val: "500,000",
  },
  {
    markerOffset: 32,
    name: "Negaria",
    coordinates: [6.8825, 6.7942],
    val: "1,000",
  },
  {
    markerOffset: 32,
    name: "Kenya",
    coordinates: [39.8825, 2.7942],
    val: "10,000",
  },
  {
    markerOffset: -25,
    name: "Egypt",
    coordinates: [28.8825, 23.7942],
    val: "60,000",
  },
  {
    markerOffset: -25,
    name: "Delhi",
    coordinates: [77.6693, 20.134],
    val: "10,000,000",
  },
  {
    markerOffset: -25,
    name: "tokyo",
    coordinates: [138.556, 36.711],
    val: "5,000,000",
  },
  {
    markerOffset: -25,
    name: "Peru",
    coordinates: [-75.4678, -10.1807],
    val: "100,000",
  },
  {
    markerOffset: 35,
    name: "Indonesia",
    coordinates: [114.4678, 1.807],
    val: "50,000",
  },
];

const linePoints = [
  {
    from: [2.1193, 45.4897],
    to: [77.6693, 20.134],
  },
  {
    from: [2.1193, 45.4897],
    to: [28.1193, 50.4897],
  },
  {
    from: [2.1193, 45.4897],
    to: [-75.4678, -10.1807],
  },
  {
    from: [-75.4678, -10.1807],
    to: [6.8825, 6.7942],
  },
  {
    from: [-75.4678, -10.1807],
    to: [-55.3816, -32.6037],
  },
  {
    from: [-55.3816, -32.6037],
    to: [114.4678, 1.807],
  },
  {
    from: [114.4678, 1.807],
    to: [77.6693, 20.134],
  },
  {
    from: [114.4678, 1.807],
    to: [138.556, 36.711],
  },
  {
    from: [28.1193, 50.4897],
    to: [138.556, 36.711],
  },
  {
    from: [77.6693, 20.134],
    to: [28.8825, 23.7942],
  },
  {
    from: [77.6693, 20.134],
    to: [39.8825, 2.7942],
  },
  {
    from: [6.8825, 6.7942],
    to: [28.8825, 23.7942],
  },
  {
    from: [6.8825, 6.7942],
    to: [39.8825, 2.7942],
  },
];

function Map() {
  const width = 800;
  const height = 600;

  const CustomZoomableGroup = ({ children, ...restProps }) => {
    const { mapRef, transformString, position } = useZoomPan(restProps);
    return (
      <g ref={mapRef}>
        <rect width={width} height={height} fill="transparent" />
        <g transform={transformString}>{children(position)}</g>
      </g>
    );
  };

  return (
    <>
      <h2>Internship Assignment</h2>
      <div className="Map-container">
        <ComposableMap>
          <CustomZoomableGroup center={[0, 0]}>
            {(position) => (
              <>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography key={geo.rsmKey} geography={geo} />
                    ))
                  }
                </Geographies>
                {linePoints.map((line) => (
                  <Line
                    from={line.from}
                    to={line.to}
                    stroke="gray"
                    strokeWidth={14 / position.k}
                    strokeLinecap="round"
                  />
                ))}
                {markers.map(({ name, coordinates, markerOffset, val }) => (
                  <Marker key={name} coordinates={coordinates}>
                    <circle
                      r={22 / position.k}
                      fill="gray"
                      stroke="#fff"
                      strokeWidth={2 / position.k}
                    />
                    <text
                      textAnchor="middle"
                      y={markerOffset / position.k}
                      fontSize={12 / position.k}
                      style={{
                        fontFamily: "system-ui",
                        fill: "white",
                        textTransform: "uppercase",
                        fontWeight: "bolder",
                      }}
                    >
                      {name}
                    </text>
                    <text
                      textAnchor="middle"
                      fontSize={8 / position.k}
                      style={{
                        fontFamily: "system-ui",
                        fill: "white",
                        textTransform: "uppercase",
                        fontWeight: "bolder",
                      }}
                    >
                      {val}
                    </text>
                  </Marker>
                ))}
              </>
            )}
          </CustomZoomableGroup>
        </ComposableMap>
      </div>
    </>
  );
}

export default Map;
