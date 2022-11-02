import { useSelector } from '@xstate/react';
import { Fragment, useContext } from 'react';
import { ConnectedContext } from '../../state/connected.context';
import LobbyScene from './lobby.scene';

export const Lobby = () => {
  const { partyActor } = useContext(ConnectedContext);
  const inLobby = useSelector(partyActor, (state) => state.matches('Lobby'));

  if (!inLobby) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <Fragment />;
  }

  return <LobbyScene />;
};