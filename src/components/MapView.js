import React, { Component } from 'react';
import { ComposableMap, ZoomableGroup, Geographies, Geography } from 'react-simple-maps';
import { Motion, spring } from 'react-motion';

// font awesome hospital icon compressed
const hostitalSvg =
  'M576 1312v64q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5zm0-256v64q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5zm256 0v64q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5zm-256-256v64q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5zm768 512v64q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5zm-256-256v64q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5zm-256-256v64q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5zm512 256v64q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5zm-256-256v64q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5zm256 0v64q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5zm-256 864h384v-1152h-256v32q0 40-28 68t-68 28h-448q-40 0-68-28t-28-68v-32h-256v1152h384v-224q0-13 9.5-22.5t22.5-9.5h320q13 0 22.5 9.5t9.5 22.5v224zm0-1184v-320q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v96h-128v-96q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v320q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5v-96h128v96q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm512-32v1280q0 26-19 45t-45 19h-1280q-26 0-45-19t-19-45v-1280q0-26 19-45t45-19h320v-288q0-40 28-68t68-28h448q40 0 68 28t28 68v288h320q26 0 45 19t19 45z';

const containerStyle = {
  margin: '0 auto',
  backgroundColor: 'lightgrey',
};

// TODO: filter topojson properties
// TODO: Markers for cities? => put markers (cities and names) in separate file
// automatic resize
// Zoom & move to
// TODO: Ireland not selectable

class MapView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={containerStyle}>
        <ComposableMap
          width={this.props.width}
          height={this.props.height}
          projectionConfig={{
            scale: 160,
            xOffset: 0,
            yOffset: 0,
            rotation: [0, 0, 0],
            precision: 0.1,
          }}
          style={{ backgroundColor: 'darkgrey' }}
        >
          <ZoomableGroup zoom={this.props.zoom} center={this.props.center} disablePanning>
            <Geographies geographyUrl={this.props.path}>
              {(geographies, projection) =>
                geographies.filter(g => g.geometry.type == 'MultiPolygon').map((geography, i) => {
                  // console.log(geography.properties)
                  console.log(geography);
                  return (
                    <Geography
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
                        pressed: {
                          fill: '#FF5722',
                          stroke: '#607D8B',
                          strokeWidth: 0.05,
                          outline: 'none',
                        },
                      }}
                    />
                  );
                })}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    );
  }
}

export default MapView;
