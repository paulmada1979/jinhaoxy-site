"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Default icon fix for webpack/Next.js
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export interface FactoryLocation {
  name: string;
  country: string;
  city: string;
  coords: [number, number]; // [lat, lng]
  address?: string;
  slug?: string;
}

const DEFAULT_LOCATIONS: FactoryLocation[] = [
  {
    name: "Dongguan Xinyuan Printing Factory",
    country: "China",
    city: "Changping, Dongguan",
    coords: [23.0489, 113.81],
    address: "Changping, Dongguan, Guangdong, China",
    slug: "dongguan-xinyuan-printing-factory",
  },
  {
    name: "Vietnam Xinyuanjia",
    country: "Vietnam",
    city: "Bac Ninh",
    coords: [21.1861, 106.0763],
    address: "Bac Ninh Province, Vietnam",
    slug: "vietnam-xinyuanjia",
  },
  {
    name: "XinYuan Packing (Dongguan)",
    country: "China",
    city: "Dongguan",
    coords: [23.0207, 113.7518],
    address: "Dongguan, Guangdong, China",
    slug: "hai-duong-factory",
  },
  {
    name: "Saraburi Facility",
    country: "Thailand",
    city: "Saraburi",
    coords: [14.5289, 100.9108],
    address: "Saraburi Province, Thailand",
  },
];

export default function FactoryMap({
  locations = DEFAULT_LOCATIONS,
  height = "500px",
}: {
  locations?: FactoryLocation[];
  height?: string;
}) {
  // Center the map between all factories (Vietnam/China region)
  const center: [number, number] = [18, 108];

  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200" style={{ height }}>
      <MapContainer
        center={center}
        zoom={4}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc) => (
          <Marker key={loc.name} position={loc.coords} icon={icon}>
            <Popup>
              <div className="text-sm">
                <strong className="text-gray-900">{loc.name}</strong>
                <div className="text-gray-600 mt-1">{loc.city}, {loc.country}</div>
                {loc.address && <div className="text-xs text-gray-500 mt-1">{loc.address}</div>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
