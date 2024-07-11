import { useState, useEffect } from 'react'

import { TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'

const MapComponentFiliais = ({ centroDoMapa, filiais }) => {
  const [position, setPosition] = useState(null)
  const map = useMap()

  useEffect(() => {
    if (centroDoMapa) {
      map.setView(centroDoMapa, 4)
    }
  }, [centroDoMapa, map])

  useEffect(() => {
    console.log('Filiais ' + JSON.stringify(filiais))
  }, [filiais])

  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        //PEGA CLIQUE NO MAPA
        console.log(e.latlng)
      },
    })
    return null
  }

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents />
      {filiais?.length > 0 && (
        <>
          {filiais.map((filial) => (
            <>
              <Marker
                position={{
                  lat: parseFloat(filial.geoX),
                  lng: parseFloat(filial.geoY),
                }}
              ></Marker>
            </>
          ))}
        </>
      )}
    </>
  )
}

export default MapComponentFiliais
