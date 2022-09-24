import { useSelector } from '@xstate/react';
import styled from 'styled-components';
import { useActorLogger } from '../../lib/logging';
import { Connected } from './connected';
import { Connecting } from './connecting.component';
import { Disconnected } from './disconnected.component';
import { usePartyScreenActor } from './party-screen.hooks';

export function PartyScreen() {
  const actor = usePartyScreenActor();
  useActorLogger(actor);
  const isConnecting = useSelector(actor, (state) =>
    state.matches('Connecting')
  );
  const isDisconnected = useSelector(actor, (state) =>
    state.matches('Disconnected')
  );
  const isConnected = useSelector(actor, (state) => state.matches('Connected'));

  return (
    <Container>
      {isConnecting && <Connecting />}
      {isDisconnected && <Disconnected />}
      {isConnected && <Connected />}
    </Container>
  );
}

const Container = styled.div``;
