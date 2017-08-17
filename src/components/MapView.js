import React, { Component } from 'react';
import { ComposableMap, ZoomableGroup, Geographies, Geography } from 'react-simple-maps';
import { Motion, spring } from 'react-motion';

const containerStyle = {
  margin: '0 auto',
  backgroundColor: 'lightgrey',
};

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [-15, 80],
      zoom: 1,
    };
  }
  render() {
    return (
      <div style={containerStyle}>
        <ComposableMap
          projectionConfig={{
            scale: 4000,
            rotation: [0, 0, 0],
          }}
          width={980}
          height={551}
          style={{
            width: '100%',
            height: 'auto',
          }}
        >
          <ZoomableGroup center={this.state.center} disablePanning>
            <Geographies geographyUrl="test.json">
              {(geographies, projection) =>
                geographies.map((geography, i) =>
                  (<Geography
                    key={i}
                    geography={geography}
                    projection={projection}
                    style={{
                      default: {
                        fill: '#ECEFF1',
                        stroke: '#607D8B',
                        strokeWidth: 0.7,
                        outline: 'none',
                      },
                      hover: {
                        fill: '#607D8B',
                        stroke: '#607D8B',
                        strokeWidth: 0.7,
                        outline: 'none',
                      },
                      pressed: {
                        fill: '#FF5722',
                        stroke: '#607D8B',
                        strokeWidth: 0.7,
                        outline: 'none',
                      },
                    }}
                  />),
                )}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    );
  }
}

export default MapView;
