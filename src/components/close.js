import React from "react";
import styled from "styled-components";

const X = styled.span`
display: inline-block;
position: relative;
width: 20px;
height: 20px;
transition: transform 0.3s;
overflow: hidden;

.horizontal-bar,
.vertical-bar {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: black;
  width: 100%;
  height: 2px;
  transform-origin: center;
}

.horizontal-bar {
  transform: translate(-50%, -50%) rotate(45deg);
}

.vertical-bar {
  transform: translate(-50%, -50%) rotate(-45deg);
}

&:hover {
  cursor: pointer;
  transform: rotate(180deg);

}

&:hover .horizontal-bar {
  transform: translate(-50%, 275%) rotate(-45deg);
}

&:hover .vertical-bar {
  transform: translate(-50%, -375%) rotate(45deg);
}
`

const Close = () => (
  <X>
  <span className="horizontal-bar"></span>
  <span className="vertical-bar"></span>
</X>

)

export default Close