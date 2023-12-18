import styled from "styled-components";

interface GridComponent {
  gridTemplateColumn?: string;
  gap?: string;
  width?: string;
  marginTop?: string;
}
export const ContainerGrid = styled.div<GridComponent>`
  max-width: 1140px;
  display: grid;
  grid-template-columns: ${(props) => props.gridTemplateColumn};
  gap: ${(props) => props.gap};
  width: ${(props) => props.width};
  margin-top: ${(props) => props.marginTop};
  @media ${(props) => props.theme.tablet} {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 24px;
    margin-left: 0;
  }
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 24px;
    margin-left: 0;
  }
`;
