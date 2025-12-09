---
### REQUIRED INFORMATION FOR DISPLAY AND FITERING
name: "GreenHeat" # 1. Title of your prototype
subtitle: "Mapping Data Center Heat Reuse: Interactive waste heat map of Germany with all relevant information for an efficient reuse of waste heat by data centers" # 2. One sentence explaining your prototype
date: "2024-06-25" # Datum vom Pitch
featuredImage: "Titelfoto.png" #Foto in selben Ordner wie diese Datei
challenge: waste-heat
year: Spring 2024 #Spring/Winter
team: Gabriel Brian-Grebot, Sophia Drimmel, Nicolas Haug, Vlad Panait, Patrick Mayer #6. Team members
contactEmail: nicolas.haug@hm.edu
caption: "Credits: Photo by "

### OPTIONAL FURTHER DETAILS
outputs:
  - type: pdf
    label: Project report #Name, der auf der Website zu sehen ist
    iUrl: "Project-Report.pdf" #Pdf in selben Ordner wie diese Datei
    description: Further information about the progress, milestones, and roadblocks.
  - type: pdf
    label: Waste heat map script
    iUrl: "wasteheat-code.pdf"
    description: Matlab script of the waste heat map.
  - type: png
    label: Waste heat map 1
    iUrl: "map-1.png"
    description: Picture of the prototype.
  - type: png
    label: Waste heat map 2
    iUrl: "map-2.png"
    description: Picture of the prototype.
  - type: png
    label: Waste heat map 3
    iUrl: "map-3.png"
    description: Picture of the prototype.
gallery:
  -  "map-1.png"
  -  "map-2.png"
  -  "map-3.png"


---
The interactive waste heat map consists of different layers, each providing different information necessary for an efficient reuse of waste heat from data centers. The first layer displays the available waste heat from data centers, marked by pins across the region and with red circles representing the amount of waste heat produced. By clicking on the pins relevant data to each data center is provided. This layer can be used for the consideration of new heat sources. The second layer illustrates the heat demand by each area, including industrial and demographic data, highlighting areas with potentially high demand for heating. The third layer combines the first two layers and demonstrates areas with high potential for new data centers, as there is a high heat demand and no already existing data centers nearby. 
