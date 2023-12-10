import { FC, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { fetchTeams } from "../../../core/redux/reducer/teamThunk";
import { useAppDispatch, useAppSelector } from "../../../core/redux/store";
import TeamsCardImg from "../../../assests/images/TeamsCardImg.png";
import SearchImg from "../../../assests/icons/search_rounded.svg";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import { CenterImage } from "../../../common/components/shared/CenterImage";
import { Card } from "../../../common/components/shared/CardCompanent";
import { ContainerGrid } from "../../../common/components/shared/GridComponent";
import PrevIcon from "../../../assests/icons/chevron_left_24px (1).png";
import NextIcon from "../../../assests/icons/chevron_right_24px.png";

export interface IOptions {
  value: number;
  label: number;
}

export const TeamsCard: FC = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((store) => store.team);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [name, setName] = useState("");

  const updatePageSize = (params: any) => {
    setPageSize(params);
  };
  const options: IOptions[] = [
    {
      value: 6,
      label: 6,
    },
    {
      value: 12,
      label: 12,
    },
    {
      value: 24,
      label: 24,
    },
  ];

  const colourStyles = {
    control: (base: {}) => ({
      ...base,
      boxShadow: "none",
      height: "40px",
      background: "#FFF",
      border: "solid 1px #D1D1D1",
      marginTop: "30px",
    }),
    option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#C60E2E" : null,
        color: isFocused ? "#ffffff" : null,
      };
    },
  };

  useEffect(() => {
    dispatch(fetchTeams({ page: page + 1, pageSize, name }));
  }, [page, pageSize, name]);

  return (
    <ContainerTeamsCard>
      <WrapperSearch>
        <ContainerSearch>
          <InputSearch
            type="search"
            placeholder="Search..."
            onChange={(val) => setName(val.target.value)}
          />
          <ImgSearch src={SearchImg} />
        </ContainerSearch>
        <Link to="/layout/addTeam">
          <ButtonTeamsCard>
            <ButtonText>Add </ButtonText>+
          </ButtonTeamsCard>
        </Link>
      </WrapperSearch>
      {
        <ContainerGrid gridTemplateColumn="repeat(3,1fr)" gap="24px">
          {selector?.data?.count !== 0 ? (
            selector.data?.data.map((data, id) => (
              <CustomNavLink to={`${data.id}`}>
                <Card
                  contentName={data.name}
                  contentYear={data.foundationYear}
                  imageUrl={"http://dev.trainee.dex-it.ru" + data.imageUrl}
                />
              </CustomNavLink>
            ))
          ) : (
            <CenterImage imageUrl={TeamsCardImg} />
          )}
        </ContainerGrid>
      }

      <SectionPaginate>
        {selector.data?.count && (
          <PaginateContainer>
            <ReactPaginate
              breakLabel={"..."}
              nextLabel={<img src={NextIcon} width="19px" height="19px" />}
              previousLabel={<img src={PrevIcon} width="19px" height="19px" />}
              onPageChange={({ selected }) => {
                console.log("selected", selected);
                setPage(selected);
              }}
              initialPage={page}
              pageRangeDisplayed={pageSize}
              pageCount={Math.ceil(selector.data.count / pageSize)}
              previousAriaLabel={"<"}
              activeClassName={"active"}
            />
          </PaginateContainer>
        )}

        <Select
          options={options}
          onChange={updatePageSize}
          styles={colourStyles}
        />
      </SectionPaginate>
    </ContainerTeamsCard>
  );
};

const ContainerTeamsCard = styled.div`
  width: 1140px;
  margin: 0 auto;
  @media ${(props) => props.theme.mobile} {
    margin: 0 auto;
    width: 100%;
    padding: 0 24px;
  }
`;
const WrapperSearch = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    flex-direction: column;
    margin: 0 auto;
  }
`;
export const ContainerSearch = styled.div`
  position: relative;
  height: 40px;
  margin: 32px 0;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin: 0;
    height: auto;
  }
`;
const InputSearch = styled.input`
  border-color: #d1d1d1;
  border-style: solid;
  border-width: 1px;
  width: 364px;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  padding-left: 12px;
  border-radius: 4px;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin-left: 0;
    margin-top: 16px;
  }
`;
export const ImgSearch = styled.img`
  position: absolute;
  content: "";
  width: 16px;
  height: 16px;
  color: Grey;
  top: 12px;
  left: 340px;
  @media ${(props) => props.theme.mobile} {
    right: 8px;
    bottom: 11px;
    left: auto;
    top: auto;
    margin-top: 16px;
  }
`;

const ButtonTeamsCard = styled.button`
  padding: 8px 24px;
  width: 104px;
  border: none;
  background-color: #e4163a;
  color: #fff;
  margin-left: 40px;
  margin-top: 32px;
  height: 40px;
  border-radius: 4px;
  &:hover {
    background-color: #ff5761;
  }
  &:active {
    background-color: #c60e2e;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin-left: 0;
    height: auto;
  }
`;
export const ButtonText = styled.span`
  margin-right: 10px;
`;
export const SectionPaginate = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;
export const PaginateContainer = styled.div`
  ul {
    margin-top: 32px;
    list-style: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
  }
  li {
    margin: 0;
    padding: 0 8px;
    cursor: pointer;
  }
  li.active {
    a {
      background-color: #e4163a;
      color: white;
      border-radius: 4px;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  @media ${(props) => props.theme.mobile} {
    height: auto;
  }
`;
const CustomNavLink = styled(NavLink)`
  text-decoration: none;
`;
