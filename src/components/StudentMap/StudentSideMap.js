import './StudentSideMap.css'

const TuitionMap = ({ lat, lng }) => {
    const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBOnYtvhgg-jdcP2lmVbI67gHAbpxg9OKY&q=${lat},${lng}`;
    return (
      <div className='std-map-wrp'>
      <iframe
        title="Tuition Location"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={mapSrc}
        ></iframe>
      </div>
    );
  };

  export default TuitionMap

  