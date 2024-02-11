import { Player } from 'prisma/prisma-client';
import { NoId } from '../utils/type-helper';

export type CreatePlayerPayload = NoId<Player>;
