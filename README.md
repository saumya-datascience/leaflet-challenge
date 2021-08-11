# leaflet-challenge
# Leaflet Homework: Visualizing Data with Leaflet

## Background


In this project i used data from United States Geological Survey, or USGS for short. The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

## Task

### Level 1: Basic Visualization

![2-BasicMap](https://github.com/saumya-datascience/leaflet-challenge/blob/main/Images/greymap.png)
I started with basic visualization of the data.


1. **Get the data set**

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and pick a data set to visualize. When  clicked on a data set, for example "All Earthquakes from the Past 7 Days", you will be given a JSON representation of that data.I used the URL of this JSON to pull in the data for our visualization.


2. **Import & Visualize the Data**

   Create a map using Leaflet that plots all of the earthquakes from  data set based on their longitude and latitude.

   * Data markers reflect the magnitude of the earthquake by their size and and depth of the earthquake by color. Earthquakes with higher magnitudes  appear larger and earthquakes with greater depth should appear darker in color.
   * Included popups that provide additional information about the earthquake when a marker is clicked.

   * Created a legend that will provide context for your map data.

  ![the Satelite map](https://github.com/saumya-datascience/leaflet-challenge/blob/main/Images/earthqauke.png)

- - -

### Level 2: the Tectonic plate!!!

![5-Advanced](https://github.com/saumya-datascience/leaflet-challenge/blob/main/Images/tectonic.png)

A second data set on was plotted on the  map to illustrate the relationship between tectonic plates and seismic activity. I pulled in a second data set and visualize it alongside  original set of data. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.

In this step:

* Plotted a second data set on our map.

* Added a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.

* Added layer controls to our map.

- - -
