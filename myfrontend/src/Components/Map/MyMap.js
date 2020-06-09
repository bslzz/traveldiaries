import React, { useState, useRef, useEffect } from 'react';
import Logout from '../Logout/Logout';
import ReactMapGL, {
  FlyToInterpolator,
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import Geocoder from 'react-map-gl-geocoder';
import { listLogEntries } from '../../API';
import LogEntryForm from '../UserForm/LogEntryForm';

const MyMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 54.5,
    longitude: 15.3,
    zoom: 3,
    transitionInterpolator: new FlyToInterpolator({
      speed: 2,
    }),
    transitionDuration: 'auto',
  });

  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [searchResultLayer, setSearchResultsLayer] = useState(null);
  const mapRef = useRef();

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  const handleViewportChange = (newViewport) => {
    setViewport({ ...viewport, ...newViewport });
  };

  const handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides,
    });
  };

  const handleOnResult = (event) => {
    setSearchResultsLayer(
      new GeoJsonLayer({
        id: 'search-result',
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10,
      })
    );
  };

  const deleteItem = (_id) => {
    const path = document.querySelector('#path');
    console.log('clicked', _id);
    setShowPopup({
      [_id]: false,
    });
    path.remove();

    // setLogEntries((logEntries) =>
    //   logEntries.filter((arrayEle, index) => index !== _id)
    // );
  };

  return (
    <ReactMapGL
      ref={mapRef}
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      width="100%"
      height="100vh"
      onViewportChange={handleViewportChange}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onDblClick={showAddMarkerPopup}
    >
      <Geocoder
        mapRef={mapRef}
        onResult={handleOnResult}
        onViewportChange={handleGeocoderViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        position="top-left"
      />

      <DeckGL {...viewport} layers={[searchResultLayer]} />

      <div
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
        }}
      >
        <GeolocateControl />
        <NavigationControl showCompass={false} />
      </div>

      {logEntries.map((entry) => (
        <React.Fragment key={entry._id}>
          <Marker latitude={entry.latitude} longitude={entry.longitude}>
            <div
              onClick={() =>
                setShowPopup({
                  [entry._id]: true,
                })
              }
            >
              <svg
                className="marker yellow"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`,
                }}
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <g>
                  <g>
                    <path
                      id="path"
                      d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                         c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                         c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setShowPopup({})}
              anchor="top"
            >
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>
                  Visited on: {new Date(entry.visitDate).toLocaleDateString()}
                </small>
                {entry.image && <img src={entry.image} alt={entry.title} />}
              </div>
              <button
                className="delete"
                onClick={() => {
                  deleteItem(entry._id);
                }}
              >
                Delete
              </button>
            </Popup>
          ) : null}
        </React.Fragment>
      ))}
      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
          >
            <div>
              <svg
                className="marker red"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`,
                }}
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <g>
                  <g>
                    <path
                      d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                       c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                       c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setAddEntryLocation(null)}
            anchor="top"
          >
            <div className="popup">
              <LogEntryForm
                onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }}
                location={addEntryLocation}
              />
            </div>
          </Popup>
        </>
      ) : null}
      <Logout />
    </ReactMapGL>
  );
};

export default MyMap;
