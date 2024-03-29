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
  general: {
    backgroundColor: '#40627f',
  },
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
    default: { fill: 'black' },
  },
};

const MapView = ({ path, width, height, zoom, center, markers }) => (
  <div style={styles.general}>
    <ComposableMap
      width={width}
      height={height}
      projectionConfig={{
        scale: 160,
        yOffset: 0,
        rotation: [0, 0, 0],
        precision: 0.1,
        xOffset: 8.5,
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
            <Marker key={`marker-${i}`} marker={marker} style={styles.mark}>
              <g transform="translate(-0.1, -0.1) scale(0.25)">
                <path
                  d="m 0.12125786,0.41335508 c -0.00127,0.0105 0.00488,0.0279 -0.010075,0.0302 -0.010502,-0.001 -0.027898,0.005 -0.030226,-0.0101 0.00127,-0.0105 -0.00488,-0.0279 0.010075,-0.0302 0.010279,0.001 0.028332,-0.005 0.030226,0.0101 z m 0,-0.0806 c -0.00127,0.0105 0.00488,0.0279 -0.010075,0.0302 -0.010502,-0.001 -0.027898,0.005 -0.030226,-0.0101 0.00127,-0.0105 -0.00488,-0.0279 0.010075,-0.0302 0.010279,0.001 0.028332,-0.005 0.030226,0.0101 z m 0.080603,0 c -0.00127,0.0105 0.00488,0.0279 -0.010075,0.0302 -0.010502,-0.001 -0.027898,0.005 -0.030226,-0.0101 0.00127,-0.0105 -0.00488,-0.0279 0.010075,-0.0302 0.010279,0.001 0.028331,-0.005 0.030226,0.0101 z m -0.080603,-0.0806 c -0.00127,0.0105 0.00488,0.0279 -0.010075,0.0302 -0.010502,-0.001 -0.027898,0.005 -0.030226,-0.0101 0.00127,-0.0105 -0.00488,-0.0279 0.010075,-0.0302 0.010279,0.001 0.028332,-0.005 0.030226,0.0101 z m 0.2418095,0.16121 c -0.00127,0.0105 0.00488,0.0279 -0.010075,0.0302 -0.010502,-0.001 -0.027898,0.005 -0.030226,-0.0101 0.00127,-0.0105 -0.00488,-0.0279 0.010075,-0.0302 0.010279,0.001 0.028332,-0.005 0.030226,0.0101 z m -0.080603,-0.0806 c -0.00127,0.0105 0.00488,0.0279 -0.010075,0.0302 -0.010502,-0.001 -0.027898,0.005 -0.030226,-0.0101 0.00127,-0.0105 -0.00488,-0.0279 0.010075,-0.0302 0.010279,0.001 0.028332,-0.005 0.030226,0.0101 z m -0.080603,-0.0806 c -0.00127,0.0105 0.00488,0.0279 -0.010075,0.0302 -0.010502,-0.001 -0.027898,0.005 -0.030226,-0.0101 0.00127,-0.0105 -0.00488,-0.0279 0.010075,-0.0302 0.010279,0.001 0.028331,-0.005 0.030226,0.0101 z m 0.1612063,0.0806 c -0.00127,0.0105 0.00488,0.0279 -0.010075,0.0302 -0.010502,-0.001 -0.027898,0.005 -0.030226,-0.0101 0.00127,-0.0105 -0.00488,-0.0279 0.010075,-0.0302 0.010279,0.001 0.028332,-0.005 0.030226,0.0101 z m -0.080603,-0.0806 c -0.00127,0.0105 0.00488,0.0279 -0.010075,0.0302 -0.010502,-0.001 -0.027898,0.005 -0.030226,-0.0101 0.00127,-0.0105 -0.00488,-0.0279 0.010075,-0.0302 0.010279,0.001 0.028332,-0.005 0.030226,0.0101 z m 0.080603,0 c -0.00127,0.0105 0.00488,0.0279 -0.010075,0.0302 -0.010502,-0.001 -0.027898,0.005 -0.030226,-0.0101 0.00127,-0.0105 -0.00488,-0.0279 0.010075,-0.0302 0.010279,0.001 0.028332,-0.005 0.030226,0.0101 z m -0.080603,0.27204 c 0.040302,0 0.080603,0 0.1209047,0 0,-0.12091 0,-0.24181 0,-0.36272 -0.026868,0 -0.053735,0 -0.080603,0 0.00236,0.0169 -0.00553,0.0367 -0.024165,0.0398 -0.050005,0.001 -0.1001534,3.3e-4 -0.1502061,3.5e-4 -0.019148,-0.001 -0.029957,-0.0211 -0.027136,-0.0387 -0.00505,-0.004 -0.016865,-3.4e-4 -0.024397,-0.001 -0.018736,0 -0.037471,0 -0.056207,0 0,0.12091 0,0.24181 0,0.36272 0.040302,0 0.080603,0 0.1209047,0 4.9e-4,-0.0247 -9.87e-4,-0.0497 7.457e-4,-0.0743 0.0075,-0.0108 0.022481,-0.005 0.033724,-0.006 0.026701,3.6e-4 0.053594,-0.001 0.080175,7.1e-4 0.010757,0.007 0.00464,0.0225 0.00626,0.0337 0,0.0154 0,0.0308 0,0.0461 z m 0,-0.37279 c -4.935e-4,-0.0348 9.906e-4,-0.0699 -7.456e-4,-0.10457 -0.00734,-0.0101 -0.022328,-0.006 -0.033296,-0.005 -0.010756,0.007 -0.00464,0.0225 -0.00626,0.0337 0.00254,0.0112 -0.013625,0.004 -0.020091,0.006 -0.00646,-0.002 -0.022644,0.005 -0.02021,-0.006 -0.00167,-0.0113 0.00461,-0.0263 -0.00626,-0.0338 -0.010932,1e-5 -0.025986,-0.005 -0.033296,0.005 -0.00172,0.0347 -2.661e-4,0.0697 -7.456e-4,0.10457 0.00224,0.0149 0.019746,0.009 0.030226,0.0101 0.015232,-0.002 0.00864,-0.0207 0.010075,-0.0316 -0.00423,-0.0129 0.00944,-0.008 0.017221,-0.009 0.00676,0.002 0.021114,-0.004 0.02308,0.003 0.00122,0.0114 -0.00289,0.0242 0.00299,0.0344 0.010004,0.004 0.024318,0.005 0.03432,0 l 0.00224,-0.003 z m 0.1612064,-0.0101 c 0,0.13434 0,0.26868 0,0.40302 5.37e-5,0.0195 -0.021149,0.0215 -0.035937,0.0202 -0.1290766,0 -0.2581531,0 -0.3872297,0 -0.0195310003,6e-5 -0.021555,-0.0212 -0.0201510003,-0.0359 0,-0.12907 0,-0.25815 0,-0.38722 -5.45e-5,-0.0195 0.0211490003,-0.0216 0.0359370003,-0.0201 0.028323,0 0.056645,0 0.084968,0 3.528e-4,-0.0322 -7.172e-4,-0.0645 5.504e-4,-0.0967 0.00303,-0.0186 0.022814,-0.0266 0.039721,-0.0242000021 0.04568,3.3e-4 0.091443,-7.1e-4 0.1370708,7.1000211e-4 0.018572,0.003 0.026597,0.0228 0.024165,0.0397 0,0.0269 0,0.0537 0,0.0806 0.034898,2.3e-4 0.069841,-3.5e-4 0.1047093,3.4e-4 0.00905,0.002 0.016412,0.0105 0.016195,0.0198 z"
                  strokeWidth="0.001"
                />
              </g>
            </Marker>
          ))}
        </Markers>
      </ZoomableGroup>
    </ComposableMap>
  </div>
);

//  <circle
//     cx={0}
//     cy={0}
//     r={0.5}
//     style={{
//       fill: 'blue',
//       stroke: '#FF5722',
//       strokeWidth: 0.3,
//       opacity: 0.9,
//     }}
//   />
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
      coordinates: PropTypes.arrayOf(PropTypes.number.isRequired),
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
