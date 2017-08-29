import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps';
import { Motion, spring } from 'react-motion';

const wrapperStyles = {
  width: '100%',
  maxWidth: 980,
  margin: '0 auto',
};
// font awesome hospital icon compressed
const hospitalSvg =
  'M576 1312v64q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5zm0-256v64q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5zm256 0v64q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5zm-256-256v64q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5zm768 512v64q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5zm-256-256v64q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5zm-256-256v64q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5zm512 256v64q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5zm-256-256v64q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5zm256 0v64q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5zm-256 864h384v-1152h-256v32q0 40-28 68t-68 28h-448q-40 0-68-28t-28-68v-32h-256v1152h384v-224q0-13 9.5-22.5t22.5-9.5h320q13 0 22.5 9.5t9.5 22.5v224zm0-1184v-320q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v96h-128v-96q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v320q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5v-96h128v96q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm512-32v1280q0 26-19 45t-45 19h-1280q-26 0-45-19t-19-45v-1280q0-26 19-45t45-19h320v-288q0-40 28-68t68-28h448q40 0 68 28t28 68v288h320q26 0 45 19t19 45z';

// TODO: Markers for cities? => put markers (cities and names) in separate file
// automatic resize
// Zoom & move to
// TODO: Ireland not selectable

// FIXME: This is really really slow and low fps...i need to check react motion

// FIXME: is center longitude latidude instead of other way around?
// TODO: The damping is hilarious

const MapView = ({
  path,
  width,
  height,
  defaultZoom,
  defaultCenter,
  currentZoom,
  currentCenter,
  markers,
}) => (
  <div style={wrapperStyles}>
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
      <ZoomableGroup center={currentCenter} zoom={currentZoom} disablePanning>
        <Geographies geographyUrl={path}>
          {(geographies, projection) =>
            geographies.filter(g => g.geometry.type == 'MultiPolygon').map((geography, i) =>
              (<Geography
                key={`geography-${i}`}
                geography={geography}
                projection={projection}
                style={{
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
                }}
              />),
            )}
        </Geographies>
        <Markers>
          {markers.map((marker, i) =>
            (<Marker
              key={i}
              marker={marker}
              style={{
                default: { fill: '#FF5722' },
                hover: { fill: '#FFFFFF' },
                pressed: { fill: '#FF5722' },
              }}
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
            </Marker>),
          )}
        </Markers>
      </ZoomableGroup>
    </ComposableMap>
  </div>
);

export default MapView;

// <Motion
//   defaultStyle={{
//     zoom: currentZoom,
//     x: currentCenter[0],
//     y: currentCenter[1],
//   }}
//   style={{
//     zoom: spring(currentZoom, { stiffness: 100, damping: 10 }),
//     x: spring(currentCenter[0], { stiffness: 100, damping: 10 }),
//     y: spring(currentCenter[1], { stiffness: 100, damping: 10 }),
//   }}
// >
//   {({ zoom, x, y }) =>
