import { Knex } from 'knex';
import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';

import { DatabaseConfiguration } from '@Main/configurations';
import { logger } from '@Main/services';
import { migrateInternal, migrateDerivative, migrateFundamental } from '@Main/configurations/migrations/00-create';

// ----------------------------------------------------------------------------------------------------------
interface IDatabase {
  isExisted: (opts: { table: string; condition: object }) => Promise<boolean>;

  // eslint-disable-next-line
  find: (opts: { table: string; fields?: string[]; condition?: object }) => Promise<any[] | undefined>;

  // eslint-disable-next-line
  findOne: (opts: { table: string; fields?: string[]; condition: object }) => Promise<any | undefined>;

  create: (opts: { table: string; value: object }) => Promise<number[] | null | undefined>;

  update: (opts: { table: string; condition?: object; value: object }) => Promise<number | undefined>;

  upsertWithWhere: (opts: { table: string; condition: object; value: object }) => Promise<void>;

  delete: (opts: { table: string; condition?: object }) => Promise<void>;

  deleteNotIn: (opts: {
    table: string;
    condition: {
      field: string;
      values: [];
    };
  }) => Promise<void>;
}

// ----------------------------------------------------------------------------------------------------------
export class RepositoryService implements IDatabase {
  private configuration: DatabaseConfiguration;
  private static instance: RepositoryService;

  constructor() {
    this.configuration = new DatabaseConfiguration();
  }

  static getInstance(): RepositoryService {
    if (!this.instance) {
      this.instance = new RepositoryService();
    }

    return this.instance;
  }

  async migrateDatabase() {
    await migrateInternal(this);
    await migrateDerivative(this);
    await migrateFundamental(this);
  }

  getDatabase(opts: { table?: string; scope?: string }): Knex | null {
    const { table, scope } = opts;
    if (isEmpty(table) && isEmpty(scope)) {
      return null;
    }

    if (table) {
      return this.configuration.getDatabaseByTable(table);
    }

    if (scope) {
      return this.configuration.getDatabaseByScope(scope);
    }

    return null;
  }

  async isTableExisted(table: string): Promise<boolean> {
    const database = this.getDatabase({ table });
    const tableDef = await database?.select('*').from('sqlite_master').where({ type: 'table', name: table });

    const rs = tableDef?.length !== 0;
    logger.info('[RepositoryService][isTableExisted] Check table %s existed | Result: %s', table, rs);
    return rs;
  }

  async isExisted({ table, condition }) {
    const rs = await this.findOne({ table, condition });
    return rs !== undefined || rs !== null;
  }

  // --------------------------------------------------------------------------------------------------------------------
  async find({ table, fields = ['*'], condition = {} }) {
    const t = new Date().getTime();
    const database = this.getDatabase({ table });
    const rs = await database?.select(fields).from(table).where(condition);
    logger.info(
      '[RepositoryService][find] Table: %s | Fields: %j | Condition: %j |  Took: %s(ms)',
      table,
      fields,
      condition,
      new Date().getTime() - t,
    );
    return rs;
  }

  // --------------------------------------------------------------------------------------------------------------------
  async findOne({ table, fields = ['*'], condition }) {
    const t = new Date().getTime();
    const database = this.getDatabase({ table });
    const rs = await database?.select(fields).from(table).where(condition).limit(1);
    logger.info(
      '[RepositoryService][findOne] Table: %s | Fields: %j | Condition: %j |  Took: %s(ms)',
      table,
      fields,
      condition,
      new Date().getTime() - t,
    );
    return head(rs);
  }

  // --------------------------------------------------------------------------------------------------------------------
  async create({ table, value }) {
    const t = new Date().getTime();
    if (!table) {
      logger.info(`Invalid table '${table}' to INSERT!`);
      return null;
    }

    if (!value) {
      logger.info(`Invalid value '${value}' to INSERT!`);
      return null;
    }

    const database = this.getDatabase({ table });
    const rs = await database?.(table).insert(value);
    logger.info(
      '[RepositoryService][create] Table: %s | Value: %j |  Took: %s(ms)',
      table,
      value,
      new Date().getTime() - t,
    );
    return rs;
  }

  // --------------------------------------------------------------------------------------------------------------------
  async update({ table, condition = {}, value }) {
    const t = new Date().getTime();
    const database = this.getDatabase({ table });
    const rs = await database?.(table).where(condition).update(value);
    logger.info(
      '[RepositoryService][update] Table: %s | Condition: %j | Value: %j |  Took: %s(ms)',
      table,
      condition,
      value,
      new Date().getTime() - t,
    );
    return rs;
  }

  // --------------------------------------------------------------------------------------------------------------------
  async upsertWithWhere({ table, condition, value }) {
    const records = await this.find({ table, condition });
    const existed = (records?.length || 0) > 0;

    if (existed) {
      await this.update({ table, condition, value });
    } else {
      await this.create({ table, value });
    }
  }

  // --------------------------------------------------------------------------------------------------------------------
  async delete({ table, condition = {} }) {
    const t = new Date().getTime();
    const database = this.getDatabase({ table });
    await database?.(table).where(condition).del();
    logger.info('[RepositoryService][delele] Took: %sms', new Date().getTime() - t);
    logger.info(
      '[RepositoryService][delete] Table: %s | Condition: %j |  Took: %s(ms)',
      table,
      condition,
      new Date().getTime() - t,
    );
  }

  // --------------------------------------------------------------------------------------------------------------------
  async deleteNotIn({ table, condition }) {
    const t = new Date().getTime();
    const database = this.getDatabase({ table });

    const { field, values } = condition;
    await database?.(table).whereNotIn(field, values).del();
    logger.info(
      '[RepositoryService][deleteNotIn] Table: %s | Condition: %j |  Took: %s(ms)',
      table,
      condition,
      new Date().getTime() - t,
    );
  }
}
