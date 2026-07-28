const map = {
  setView() {
    return this;
  },
  remove() {},
  invalidateSize() {},
  on() {
    return this;
  },
  off() {
    return this;
  },
};

  const leaflet = {
    map: () => map,
    tileLayer: () => ({ addTo() {} }),
    marker: () => ({
      addTo() {
        return this;
      },
      bindPopup() {
        return this;
      },
      openPopup() {
        return this;
      },
    }),
    icon: () => ({}),
    Marker: { prototype: { options: {} } },
  };

module.exports = leaflet;
module.exports.default = leaflet;
