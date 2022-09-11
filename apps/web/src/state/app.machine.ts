import { ActorRefFrom, ContextFrom, EventFrom, StateFrom } from 'xstate';
import { createModel } from 'xstate/lib/model';
import { AuthActor } from './auth.machine';
import { NavigationActor } from './navigation.machine';
import { PartyConnectionActor } from './party-connection.machine';

const appModel = createModel({
  partyConnectionActor: {} as PartyConnectionActor,
  authActor: {} as AuthActor,
  navigationActor: {} as NavigationActor,
});

export type AppContext = ContextFrom<typeof appModel>;
export type AppEvent = EventFrom<typeof appModel>;

const appMachine = appModel.createMachine(
  {
    id: 'appMachine',
    initial: 'Initializing',
    context: appModel.initialContext,
    states: {
      Initializing: {
        invoke: {
          src: 'initialize',
          onDone: 'Idle',
        },
      },
      Idle: {},
    },
    predictableActionArguments: true,
  },

  {
    guards: {},
    services: {
      initialize: async (context) => {
        return 'todo';
      },
    },
  }
);

export const createAppMachine = (context: AppContext) =>
  appMachine.withContext(context);

export type AppActor = ActorRefFrom<typeof appMachine>;
export type AppState = StateFrom<typeof appMachine>;
