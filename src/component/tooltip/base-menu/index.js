import styled from "styled-components";

export const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 13px;
  padding: 1px 12px 1px 4px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    color: #ffffff;
    background: #6c6d6f;
  }
`;

export const MenuBase = styled.div`
  display: flex;
  flex-direction: column;

  ${MenuItem} {
    margin: 1px 3px;
  }

  ${MenuItem}:first-child {
    margin-top: 4px;
  }

  ${MenuItem}:last-child {
    margin-bottom: 4px;
  }
`;
