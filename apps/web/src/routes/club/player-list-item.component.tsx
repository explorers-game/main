import { PartyEvents, PartyPlayerActor } from '@explorers-club/party';
import { useSelector } from '@xstate/react';
import { FC, useCallback, useContext } from 'react';
import { ConnectedContext } from '../../state/connected.context';

interface Props {
  actor: PartyPlayerActor;
}

export const PlayerListItem: FC<Props> = ({ actor }) => {
  const actorId = actor.id;
  const { partyActor } = useContext(ConnectedContext);
  const hostActorId = useSelector(
    partyActor,
    (state) => state.context.hostActorId
  );

  const iAmHost = false; // todo get my actor id from auth
  const actorIsNotHost = hostActorId !== actorId;
  const showRemoveButton = iAmHost && actorIsNotHost;

  const name = useSelector(actor, (state) => state.context.playerName);
  const isReady = useSelector(actor, (state) => !!state.matches('Ready.Yes'));

  const handleRemove = useCallback(() => {
    partyActor.send(PartyEvents.PLAYER_REMOVE({ actorId }));
  }, [partyActor, actorId]);

  return (
    <div>
      {!name ? (
        <span>a new explorer is connecting...</span>
      ) : (
        <span>
          {name} - {isReady ? 'Ready' : 'Not Ready'}
          {showRemoveButton && <button onClick={handleRemove}>remove</button>}
        </span>
      )}
    </div>
  );
};