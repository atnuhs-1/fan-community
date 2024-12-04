import { Live, Performance } from "@prisma/client";

export type LiveWithPerformances = Live & {
  performances: Performance[];
};