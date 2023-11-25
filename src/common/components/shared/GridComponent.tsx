import styled from "styled-components";

interface GridComponent{
    gridTemplateColumn?:string,
    gap?:string
}
export const ContainerGrid = styled.div<GridComponent>`
  max-width: 1140px;
  display: grid;
  grid-template-columns:${props => props.gridTemplateColumn};
  gap: ${props => props.gap};
`