import React from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps';
import PropTypes from 'prop-types';

// TODO: Markers for cities? => put markers (cities and names) in separate file
// automatic resize
// Zoom & move to
// TODO: Ireland not selectable

const styles = {
  geo: {
    default: {
      fill: '#ECEFF1',
      stroke: '#607D8B',
      strokeWidth: 0.05,
      outline: 'none',
    },
    hover: {
      fill: '#CFD8DC',
      stroke: '#607D8B',
      strokeWidth: 0.05,
      outline: 'none',
    },
  },
  mark: {
    default: { fill: '#FF5722' },
    hover: { fill: '#FFFFFF' },
    pressed: { fill: '#FF5722' },
  },
};

const MapView = ({ path, width, height, zoom, center, markers }) => (
  <div style={styles}>
    <ComposableMap
      width={width}
      height={height}
      projectionConfig={{
        scale: 160,
        xOffset: 0,
        yOffset: 0,
        rotation: [0, 0, 0],
        precision: 0.1,
      }}
    >
      <ZoomableGroup center={[center.longitude, center.latitude]} zoom={zoom} disablePanning>
        <Geographies geographyUrl={path}>
          {(geographies, projection) =>
            geographies
              .filter(g => g.geometry.type === 'MultiPolygon')
              .map((geography, i) => (
                <Geography
                  key={`geography-${i}`}
                  geography={geography}
                  projection={projection}
                  style={styles.geo}
                />
              ))}
        </Geographies>
        <Markers>
          {markers.map((marker, i) => (
            <Marker
              key={`marker-${i}`}
              marker={[marker.coordinates.longitude, marker.coordinates.latitude]}
              style={styles.mark}
            >
              <circle
                cx={0}
                cy={0}
                r={0.05}
                style={{
                  stroke: '#FF5722',
                  strokeWidth: 0.3,
                  opacity: 0.9,
                }}
              />
            </Marker>
          ))}
        </Markers>
      </ZoomableGroup>
    </ComposableMap>
  </div>
);

MapView.propTypes = {
  path: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  center: PropTypes.shape({
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
  }).isRequired,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      coordinates: PropTypes.shape({
        longitude: PropTypes.number.isRequired,
        latitude: PropTypes.number.isRequired,
      }),
    }),
  ),
};
MapView.defaultProps = {
  markers: [],
};

export default MapView;

// <Motion
//   defaultStyle={{
//     zoom: zoom,
//     x: center[0],
//     y: center[1],
//   }}
//   style={{
//     zoom: spring(zoom, { stiffness: 100, damping: 10 }),
//     x: spring(center[0], { stiffness: 100, damping: 10 }),
//     y: spring(center[1], { stiffness: 100, damping: 10 }),
//   }}
// >
//   {({ zoom, x, y }) =>
