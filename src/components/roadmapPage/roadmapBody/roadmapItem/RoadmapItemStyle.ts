import { Typography, Divider } from '@material-ui/core';
import styled from 'styled-components';

export const RoadmapItemWrapper = styled.div`
  border-radius: 10px;
  width: 300px;
  min-width: 300px;
  min-height: 100px;
  background-color: #ff8a65;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
export const TitleWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ItemTitle = styled(Typography)`
  text-align: center;
  word-wrap: break-word;
  font-size: 18px;
`;

export const CardDivider = styled(Divider)`
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CompleteStatusText = styled(Typography)`
  flex-grow: 1;
`;
