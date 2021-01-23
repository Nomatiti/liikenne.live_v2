import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';
import { mapboxToken } from "../constants";
import {geoJSON} from "../Services";
import store from "../Redux/store";
import { setSelected } from "../Redux/actions";
import { colorTheme } from "../Styling";

mapboxgl.accessToken = mapboxToken;

/*const Legend = (props) => {
    const renderLegendKeys = (stop, i) => {
        return (
            <div key={i} className="txt-s">
        <span
            className="mr6 round-full w12 h12 inline-block align-middle"
            style={{ backgroundColor: stop[1] }}
        />
                <span>{`${stop[0].toLocaleString()}`}</span>
            </div>
        );
    };

    return (
        <>
            <div className="bg-white absolute bottom right mr12 mb24 py12 px12 shadow-darken10 round z1 wmax180">
                <div className="mb6">
                    <h2 className="txt-bold txt-s block">{props.active.name}</h2>
                    <p className="txt-s color-gray">{props.active.description}</p>
                </div>
                {props.stops.map(renderLegendKeys)}
            </div>
        </>
    );
};

const Optionsfield = (props) => {
    const renderOptions = (option, i) => {
        return (
            <label key={i} className="toggle-container">
                <input
                    onChange={() => props.changeState(i)}
                    checked={option.property === props.property}
                    name="toggle"
                    type="radio"
                />
                <div className="toggle txt-s py3 toggle--active-white">
                    {option.name}
                </div>
            </label>
        );
    };
    return (
        <div className="toggle-group absolute top left ml12 mt12 border border--2 border--white bg-white shadow-darken10 z1">
            {props.options.map(renderOptions)}
        </div>
    );
};

const Map = () => {
    const options = [
        {
            name: 'Population',
            description: 'Estimated total population',
            property: 'pop_est',
            stops: [
                [0, '#f8d5cc'],
                [1000000, '#f4bfb6'],
                [5000000, '#f1a8a5'],
                [10000000, '#ee8f9a'],
                [50000000, '#ec739b'],
                [100000000, '#dd5ca8'],
                [250000000, '#c44cc0'],
                [500000000, '#9f43d7'],
                [1000000000, '#6e40e6']
            ]
        },
        {
            name: 'GDP',
            description: 'Estimate total GDP in millions of dollars',
            property: 'gdp_md_est',
            stops: [
                [0, '#f8d5cc'],
                [1000, '#f4bfb6'],
                [5000, '#f1a8a5'],
                [10000, '#ee8f9a'],
                [50000, '#ec739b'],
                [100000, '#dd5ca8'],
                [250000, '#c44cc0'],
                [5000000, '#9f43d7'],
                [10000000, '#6e40e6']
            ]
        }
    ];
    const mapContainerRef = useRef(null);
    const [active, setActive] = useState(options[0]);
    const [map, setMap] = useState(null);

    // Initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [5, 34],
            zoom: 1.5
        });

        map.on('load', () => {
            map.addSource('vehicles', {
                type: 'geojson',
                data: geoJSON()
            });

            // map.setLayoutProperty('vehicles', 'text-field', [
            //     'format',
            //     ['get', 'id'],
            //     { 'font-scale': 1.2 },
            //     '\n',
            //     {},
            //     ['get', 'id'],
            //     {
            //         'font-scale': 0.8,
            //         'text-font': [
            //             'literal',
            //             ['DIN Offc Pro Italic', 'Arial Unicode MS Regular']
            //         ]
            //     }
            // ]);

            // change cursor to pointer when user hovers over a clickable feature
            map.on('mouseenter', e => {
                if (e.features.length) {
                    map.getCanvas().style.cursor = 'pointer';
                }
            });

            // reset cursor to default when user is no longer hovering over a clickable feature
            map.on('mouseleave', () => {
                map.getCanvas().style.cursor = '';
            });

            map.on('click', e => {
                const features = map.queryRenderedFeatures(e.point);
                if (features.length) {
                    const feature = features[0];
                    console.log(feature.properties.id);

                    store.dispatch({
                        type: "setSelected",
                        payload: feature.properties.id
                    });
                }
            });

            map.addLayer(
                {
                    id: 'vehicles',
                    type: 'circle',
                    source: 'vehicles',
                    paint: {
                        "circle-color": "#ff6f59",
                        "circle-stroke-width": 3,
                        "circle-stroke-color": "#ffffff",
                        "circle-radius": [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            0.8,
                            10,
                            6,
                            11,
                            22,
                            10
                        ]
                    }
                },
                'country-label'
            );

            setMap(map);

            map.timer = setInterval(function() {
                map.getSource('vehicles').setData(geoJSON());
            }, 2000);
        });

        // Clean up on unmount
        return () => map.remove();
    }, []);

    // useEffect(() => {
    //     paint();
    // }, [active]);

    const paint = () => {
        if (map) {
            map.setPaintProperty('countries', 'fill-color', {
                property: active.property,
                stops: active.stops
            });
        }
    };

    const changeState = i => {
        setActive(options[i]);
        map.setPaintProperty('countries', 'fill-color', {
            property: active.property,
            stops: active.stops
        });
    };

    return (
        <div>
            <div ref={mapContainerRef} className='map-container' />
            {/!*<Legend active={active} stops={active.stops} />*!/}
            {/!*<Optionsfield*!/}
            {/!*    options={options}*!/}
            {/!*    property={active.property}*!/}
            {/!*    changeState={changeState}*!/}
            {/!*!/>*!/}
        </div>
    );
};*/

const Map1 = (props) => {
    const mapContainerRef = useRef(null);

    const [lng, setLng] = useState(24);
    const [lat, setLat] = useState(62);
    const [zoom, setZoom] = useState(5.4);
    const [style, setStyle] = useState('mapbox://styles/mapbox/dark-v10');

    // Initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: style,
            center: [lng, lat],
            zoom: zoom
        });

        // Add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.on('load', () => {
            map.addSource('vehicles', {
                type: 'geojson',
                data: geoJSON(),//"https://opendata.arcgis.com/datasets/c3a01a65b7a0467cba2a14935be8c2a2_0.geojson"//geoJSON()
                cluster: false,
                clusterMaxZoom: 10, // Max zoom to cluster points on
                clusterRadius: 5 // Radius of each cluster when clustering points (defaults to 50)
            });

            map.addLayer(
                {
                    id: 'vehicles',
                    type: 'circle',
                    source: 'vehicles',
                    paint: {
                        "circle-color": [
                            "match",
                            ["get", "vehicleType"],
                            "HSL/bus", colorTheme["HSL/bus"],
                            "HSL/ferry", colorTheme["HSL/ferry"],
                            "HSL/tram", colorTheme["HSL/tram"],
                            "HSL/metro", colorTheme["HSL/metro"],
                            "HSL/train", colorTheme["HSL/train"],

                            "Rata/Long-distance", colorTheme["Rata/Long-distance"],
                            "Rata/Commuter", colorTheme["Rata/Commuter"],
                            "Rata/Cargo", colorTheme["Rata/Cargo"],
                            "Rata/Locomotive", colorTheme["Rata/Locomotive"],
                            "Rata/Test drive", colorTheme["Rata/Test drive"],
                            "Rata/On-track machines", colorTheme["Rata/On-track machines"],
                            "Rata/Shunting", colorTheme["Rata/Shunting"],
                            "Rata/", colorTheme["Rata/"],

                            /* Other */ colorTheme.other
                        ],
                        "circle-stroke-width": 2,
                        "circle-stroke-color": "#ffffff",
                        "circle-radius": [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            1, 8,
                            5, 6,
                            10, 5,
                            15, 10
                        ]
                    }
                },
                'country-label'
            );

            map.addLayer({
                id: 'VehicleName',
                type: 'symbol',
                source: 'vehicles',
                layout: {
                    'text-field': '{displayName}',
                    'text-font': ['Arial Unicode MS Bold', 'DIN Offc Pro Medium'],
                    'text-size': [
                        "interpolate",
                        ["linear"],
                        ["zoom"],
                        5, 5,
                        10, 8,
                        15, 12
                    ]
                }
            });

            map.timer = setInterval(function() {
                try {
                    map.getSource('vehicles').setData(geoJSON())
                } catch (e) {
                    //console.warn(e)
                }
            }, 4000);
        });

        map.on('click', e => {
            const features = map.queryRenderedFeatures(e.point);
            if (features.length) {
                const feature = features[0];

                store.dispatch(setSelected(feature.properties.id));
            }
        });

        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        // Clean up on unmount
        return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className={"bottombarStyle"}>
                {/*<div>
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                    <button onClick={() => setStyle("mapbox://styles/mapbox/streets-v11")}>change</button>
                    {style}
                </div>*/}
            </div>
            <div className={props.side ? "map-container" : "map-containerBottom"} ref={mapContainerRef} />
        </div>
    );
};


export default Map1;

