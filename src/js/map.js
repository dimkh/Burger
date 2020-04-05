let myMap;

const init = () => {
  myMap = new ymaps.Map("ya-map", {
    center: [59.94, 30.32],
    zoom: 12,
    controls: ["zoomControl"],
    behaviors: ["drag"]
  });

  const coords = [
    [59.97, 30.31],
    [59.94, 30.25],
    [59.95, 30.37],
    [59.93, 30.34]
  ];

  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: "default#image",
    iconImageHref: "./img/sprite/map-marker.svg",
    iconImageSize: [80, 80],
    iconImageOffset: [-40, -40]
  });

  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  });

  myMap.geoObjects.add(myCollection);
}


ymaps.ready(init);


