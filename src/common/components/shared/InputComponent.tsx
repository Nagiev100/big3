import styled from "styled-components";

interface InputComponent {
  widthProps?: string;
  heightProps?: string;
  borderColor?: string;
  background?: string;
  marginTop?: string;
}

export const Input = styled.input<InputComponent>`
  width: ${(props) => props.widthProps || "100%"};
  height: ${(props) => props.heightProps};
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  padding-left: 12px;
  border-radius: 4px;
  margin-top: ${(props) => props.marginTop};

  background-color: ${(props) => props.background};
  border: ${(props) => `1px solid ${props.borderColor || "#F6F6F6"}`};
  &:hover {
    background-color: #d1d1d1;
  }
  &:focus {
    background-color: #f6f6f6;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: 40px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 100%;
    height: 40px;
  }
`;
