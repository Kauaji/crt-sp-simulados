import { CONCURSOS } from '../contests/index.js';

export const EXAM_CONFIG = Object.fromEntries(
  CONCURSOS.flatMap((contest) => contest.roles.map((role) => [`${contest.id}::${role.id}`, role.exam])),
);
