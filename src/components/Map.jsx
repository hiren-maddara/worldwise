import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
	const { cities } = useCities();
	const [mapPosition, setMapPosition] = useState([40, 0]);

	const [lat, lng] = useUrlPosition();

	const {
		isLoading: isLoadingPosition,
		position: userLocation,
		getPosition,
	} = useGeolocation();

	useEffect(
		function () {
			if (lat && lng) setMapPosition([lat, lng]);
		},
		[lat, lng]
	);

	useEffect(
		function () {
			if (userLocation) setMapPosition([userLocation.lat, userLocation.lng]);
		},
		[userLocation]
	);

	return (
		<div className={styles.mapContainer}>
			{!userLocation && (
				<Button type="position" onClick={getPosition}>
					{isLoadingPosition ? "Loading..." : "Use your position"}
				</Button>
			)}
			<MapContainer
				center={mapPosition}
				zoom={13}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>

				{cities.map((city) => (
					<Marker
						position={[city.position.lat, city.position.lng]}
						key={city.id}
					>
						<Popup styles={{ textAlign: "center" }}>
							<span>{city.emoji}</span>
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}

				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

function DetectClick() {
	const navigate = useNavigate();
	useMapEvents({
		click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
	});
}

export default Map;
