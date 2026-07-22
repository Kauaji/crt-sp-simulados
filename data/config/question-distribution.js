import { CONCURSOS } from '../contests/index.js';

export const QUESTION_DISTRIBUTION = Object.fromEntries(
  CONCURSOS.flatMap((contest) => contest.roles.map((role) => [`${contest.id}::${role.id}`, role.exam.distribution])),
);
