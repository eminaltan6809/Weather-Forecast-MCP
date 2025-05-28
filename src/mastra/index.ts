import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { mastraConfig } from './mastra.config';

import { weatherAgent } from './agents/weather-agent';

export const mastra = new Mastra(mastraConfig);
