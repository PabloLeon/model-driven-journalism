import React, { Component } from 'react';
import { ComposableMap, ZoomableGroup, Geographies, Geography } from 'react-simple-maps';
import { Motion, spring } from 'react-motion';

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
            <Geographies geographyUrl={'ukMap/map.json'}>
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
