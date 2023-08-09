---
### REQUIRED INFORMATION FOR DISPLAY AND FITERING
name: Marine+
subtitle: An improved model for detecting marine litter in coastal ocean pictures
date: "2023-06-25"
featuredImage: "oceanPlastic.jpg"
challenge: marine-litter
year: Spring 2023
team: Simon Chervenak, Oscar Röth, Mohamad Alkam,Zeynep Duran, Wasuwadee Kongdech, Ekaterina Gikalo
contactEmail: simonlcherv@gmail.com

### OPTIONAL FURTHER DETAILS
outputs:
 -  type: pdf
    label: Project report
    url: "ProjectReport1.pdf"
    description: Further information about the progress, milestones, and roadblocks.
---

The MARIDA dataset contains annotated images from twelve locations around the world. These images are annotated with many classes, including multiple types of water and plants, but our challenge focuses on marine litter. Our goal is to aid with the creation of a model that will help clean up our oceans and save our planet. The researchers made a basic neural network structure and provided us with tools to train and test that structure. To improve upon it, we changed the way it learns by encouraging it to focus on less common examples, since the marine litter was a very underrepresented portion of the images. We also shifted the locations of the data it was trained on to make it better at generalizing to unseen locations. Our solution increased accuracy by common AI metrics, but can still be improved by further examination of the data.