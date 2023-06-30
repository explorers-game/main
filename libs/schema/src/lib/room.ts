import { AnyInterpreter, StateMachine } from 'xstate';
import { z } from 'zod';
import {
  SlugSchema,
  SnowflakeIdSchema,
  StateSchemaFromStateValue,
} from '../common';
import { GameConfigurationSchema } from '../configuration';
import { EntityBaseSchema } from '../entity/base';
import { EventBaseSchema } from '../events/base';
import {
  DebugEventTypeLiteral,
  GameIdLiteralSchema,
  JoinEventTypeLiteral,
  LeaveEventTypeLiteral,
  LogEventTypeLiteral,
  MessageEventTypeLiteral,
  RoomSchemaTypeLiteral,
} from '../literals';

export const RoomContextSchema = z.object({
  workflows: z.map(z.string(), z.custom<AnyInterpreter>()),
});
// export type RoomContext = z.infer<typeof RoomContextSchema>;

const StartCommandSchema = z.object({
  type: z.literal('START'),
  connectionEntityId: SnowflakeIdSchema,
});

const ConnectCommandSchema = z.object({
  type: z.literal('CONNECT'),
  connectionEntityId: SnowflakeIdSchema,
});

const JoinCommandSchema = z.object({
  type: z.literal('JOIN'),
  connectionEntityId: SnowflakeIdSchema,
});

const LeaveCommandSchema = z.object({
  type: z.literal('LEAVE'),
  connectionEntityId: SnowflakeIdSchema,
});

export const RoomCommandSchema = z.union([
  ConnectCommandSchema,
  JoinCommandSchema,
  StartCommandSchema,
  LeaveCommandSchema,
]);

export const RoomEntityPropsSchema = z.object({
  schema: RoomSchemaTypeLiteral,
  hostConnectionEntityId: SnowflakeIdSchema,
  connectedEntityIds: z.array(SnowflakeIdSchema),
  slug: SlugSchema,
  gameId: GameIdLiteralSchema.optional(),
  configuration: GameConfigurationSchema.optional(),
});

export const RoomStateValueSchema = z.object({
  Scene: z.enum(['Lobby', 'Loading', 'Game']),
  Active: z.enum(['No', 'Yes']), // Yes if there is at least 1 player currently connected
});

// type RoomStateValue = z.infer<typeof RoomStateValueSchema>;
// export type RoomMessageData = z.infer<typeof RoomMessageDataSchema>;

// const RoomMessageDataSchema = z.object({
//   sender: SnowflakeIdSchema,
//   type: MessageEventTypeLiteral,
//   content: z.string(),
// });

const MessageEventSchema = EventBaseSchema(
  MessageEventTypeLiteral,
  z.object({
    sender: SnowflakeIdSchema,
    content: z.string(),
  })
);

export const LogEventSchema = EventBaseSchema(
  LogEventTypeLiteral,
  z.object({
    level: z.enum(['DEBUG', 'INFO', 'ERROR']),
    content: z.string(),
  })
);

export const RoomEntitySchema = EntityBaseSchema(
  RoomEntityPropsSchema,
  RoomCommandSchema,
  RoomStateValueSchema
);

export const DebugEventSchema = EventBaseSchema(
  DebugEventTypeLiteral,
  z.object({
    content: z.string(),
  })
);
// export type DebugEvent = z.infer<typeof DebugEventSchema>;

export const JoinEventSchema = EventBaseSchema(
  JoinEventTypeLiteral,
  z.object({
    subjectId: SnowflakeIdSchema,
  })
);

export const LeaveEventSchema = EventBaseSchema(
  LeaveEventTypeLiteral,
  z.object({
    subjectId: SnowflakeIdSchema,
  })
);

export const RoomEventSchema = z.discriminatedUnion('type', [
  MessageEventSchema,
  JoinEventSchema,
  LeaveEventSchema,
]);

// todo this should be a union with dm, group, other types of channels
// for now just sit with room schemas
export const ChannelEventSchema = z.union([
  LogEventSchema,
  MessageEventSchema,
  JoinEventSchema,
  LeaveEventSchema,
  DebugEventSchema,
]);