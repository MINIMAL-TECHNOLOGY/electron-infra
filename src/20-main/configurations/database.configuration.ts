import knex, { Knex } from 'knex';
import { join } from 'path';

import { Databases } from '@Common/constants';
import { Directories } from '@Main/configurations';

const DEFAULT_OPTS = {
  client: 'sqlite3',
  useNullAsDefault: true,
  pool: { min: 1, max: 100 },
};

export class DatabaseConfiguration {
  private databases: Record<string, Knex> = {};

  // ---------------------------------------------------------------------------------------------------------
  constructor() {
    const databaseFolder = Directories.DATABASE_FOLDER;
    const databaseScopes = [Databases.SCOPE_INTERNAL, Databases.SCOPE_DERIVATIVE, Databases.SCOPE_FUNDAMENTAL];
    for (const scope of databaseScopes) {
      this.databases[scope] = knex({
        ...DEFAULT_OPTS,
        connection: { filename: join(databaseFolder, `qT_${scope}.sqlite3`) },
      });
    }
  }

  // ---------------------------------------------------------------------------------------------------------
  getDatabaseByScope(scope: string): Knex | null {
    return this.databases[scope];
  }

  // ---------------------------------------------------------------------------------------------------------
  getDatabaseByTable(table: string): Knex | null {
    const scope = Databases.FILE_MAP[table];
    if (!scope) {
      return null;
    }

    return this.getDatabaseByScope(scope);
  }
}
