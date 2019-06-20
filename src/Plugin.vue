<style>
.sensitile-address-search {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
}
.sensitile-address-search__input {
  width: 100%;
  margin-right: 10px !important;
}
</style>
<template>
  <div v-if="model">
    <div class="sensitile-address-search">
      <input
        class="sensitile-address-search__input"
        id="search"
        type="text"
        placeholder="Search address"
        v-model="search"
        v-on:keyup="updateSearch"
      >
      <button
        :value="model.search"
        class="uk-button uk-button-primary"
        v-on:click="findLocation"
      >Search</button>
    </div>
    {{ error }}
    <div>
      <div class="tree__form-group">
        <span class="form__topic">Latitude</span>
        <div>
          <input
            class="uk-width-1-1"
            dir="ltr"
            type="text"
            v-on:keyup="updateLatitude"
            v-model="latitude"
            value="latitude"
          >
        </div>
      </div>
    </div>
    <div>
      <div class="tree__form-group">
        <span class="form__topic">Longitude</span>
        <div>
          <input
            class="uk-width-1-1"
            dir="ltr"
            type="text"
            v-on:keyup="updateLongitude"
            v-model="longitude"
            value="longitude"
          >
        </div>
      </div>
    </div>If the above latitude and longitude are not correct, or if the address could not be found, they can be corrected manually.
  </div>
</template>

<script>
export default {
  mixins: [window.Storyblok.plugin],
  data() {
    return {
      samples: [],
      isActive: false,
      search: "",
      latitude: "",
      longitude: "",
      error: ""
    };
  },
  methods: {
    initWith() {
      return {
        latitude: "",
        longitude: "",
        search: "",
        plugin: "sensitile-address-search"
      };
    },
    pluginCreated() {
      this.longitude = this.model.longitude;
      this.latitude = this.model.latitude;
      this.search = this.model.search;
    },

    findLocation() {
      let location = {};
      const address = this.search;
      var xhr = new XMLHttpRequest();
      const that = this;
      xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          const { response } = xhr;
          const result = JSON.parse(response);
          const coordinates =
            result.features.length && result.features[0].geometry.coordinates;
          if (coordinates[0] === undefined) {
            this.error = "Address not found";
          } else {
            this.updateLocation(
              coordinates[1] ? coordinates[1] : 0,
              coordinates[0] ? coordinates[0] : 0
            );
            this.error = "";
          }
        }
      };
      xhr.open(
        "GET",
        `https://nominatim.openstreetmap.org/search?q=${address}&format=geojson`,
        true
      );
      xhr.send(null);
    },
    updateLocation(latitude, longitude) {
      this.latitude = latitude;
      this.model.latitude = latitude;
      this.longitude = longitude;
      this.model.longitude = longitude;
    },
    updateLatitude() {
      this.model.latitude = this.latitude;
    },
    updateLongitude() {
      this.model.longitude = this.longitude;
    },
    updateSearch() {
      this.model.search = this.search;
    }
  },
  watch: {
    model: {
      deep: true,
      handler(value) {
        this.$emit("changed-model", value);
      }
    }
  }
};
</script>
