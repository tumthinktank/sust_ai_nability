---
### REQUIRED INFORMATION FOR DISPLAY AND FITERING
name: ArguMiner
subtitle: "Our prototype extracts arguments from discussions to improve decision-making by providing the essence of the conversation."
date: "2023-06-25"
featuredImage: "doors-Pixabay_quimono.jpg" #image in same folder as this file
challenge: argument-mining
year: Spring 2023
team: Pia Koller, Nina Mandl, Leon Oskui, Mert Türkekul
contactEmail: Koller.Pia@campus.lmu.de
caption: "Credits: Photo by Pixabay/quimono.jpg"

### OPTIONAL FURTHER DETAILS
outputs:
 -  type: pdf
    label: Project Report
    iUrl: "Project_Report_sustAInability.pdf"
    description: Further information about the progress, milestones, and roadblocks.
 -  type: png
    label: Prototype 1
    iUrl: "Argument-Mining-1.png"
    description: Example for prototype
 -  type: png
    label: Prototype 2
    iUrl: "Argument-Mining-2.png"
    description: Example for prototype
 -  type: png
    label: Prototype 3
    iUrl: "Argument-Mining-3.png"
    description: Example for prototype
gallery:
 - "Argument-Mining-2.png"
---

We developed a custom code using an AI model from Hugging Face that specializes in argument recognition. Our process involves extracting text from uploaded files, segmenting it into sentences, and evaluating each sentence using the AI model to determine if it represents an argument. Similar arguments are then grouped together through clustering. We further employed another existing model to classify arguments as pro, con, or neutral. The result is a comprehensive table displaying indexed arguments and their corresponding scores. To visually represent our concept, we created a Figma prototype. The application allows users to upload files, insert article links, or conduct general topic searches. It presents an overview of arguments sorted by ratings, along with graphical representations of the argument-to-fluff ratio and rating distribution. By combining advanced AI models, efficient categorization algorithms, and an intuitive user interface, our prototype aims to empower individuals to quickly access and comprehend arguments, enabling them to make well-informed decisions and shape their own perspectives.