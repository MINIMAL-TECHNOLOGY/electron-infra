import { Databases } from '@Common/constants';
import { RepositoryService, logger } from '@Main/services';
import { Knex } from 'knex';

// ------------------------------------------------------------------------
const migrateTable = async (
  repositoryService: RepositoryService,
  table: string,
  definitions: any, // eslint-disable-line
): Promise<void> => {
  logger.info('[migrateTable] Initializing table "%s"', table);

  const database = repositoryService.getDatabase({ table });
  if (!database) {
    throw new Error(`Invalid database to migrate table: ${table}`);
  }

  const existed = await database.schema.hasTable(table);
  if (existed) {
    logger.info('[migrateTable] Table "%s" is existed!', table);
    // await database(table).truncate();
    return;
  }

  logger.info(`[migrateTable] Table ${table} is NOT EXISTED! Creating table ${table}`);
  await database.schema.createTable(table, definitions);
};

// ------------------------------------------------------------------------
const migrateInternal = async (repositoryService: RepositoryService) => {
  logger.info('[migrateInternal] START Migrate database | Scope: INTERNAL');

  await migrateTable(repositoryService, Databases.TABLE_SETTING, (builder: Knex.CreateTableBuilder) => {
    builder.string('code').primary();
    builder.string('description');
    builder.string('scope');
    builder.string('dataType');
    builder.string('value');
  });

  await migrateTable(repositoryService, Databases.TABLE_ACCOUNT, (builder: Knex.CreateTableBuilder) => {
    builder.string('account').primary();
    builder.string('identifier').defaultTo(null);
    builder.string('username').defaultTo(null);
    builder.string('fullName').defaultTo(null);
    builder.string('accessToken').defaultTo(null);
    builder.string('credentialKey').defaultTo(null);
    builder.string('credentialSecret').defaultTo(null);
    builder.string('detail').defaultTo(null);
    builder.integer('isUsed').defaultTo(0);
    builder.string('lastLoginAt').defaultTo(null);
  });

  logger.info('[migrateInternal] DONE Migrate database | Scope: INTERNAL');
};

// ------------------------------------------------------------------------
const migrateDerivative = async (repositoryService: RepositoryService) => {
  logger.info('[migrateInternal] START Migrate database | Scope: DERIVATIVE');

  await migrateTable(repositoryService, Databases.TABLE_DERIVATIVE_ORDER, (builder: Knex.CreateTableBuilder) => {
    builder.string('orderId').primary();
    builder.string('originalId');
    builder.string('forwardActionId');
    builder.string('groupId').defaultTo(null);
    builder.string('account').defaultTo(null);
    builder.string('accountType').defaultTo(null);
    builder.string('side').defaultTo(null);
    builder.string('symbol').defaultTo(null);
    builder.string('orderDate');
    builder.string('orderTime');
    builder.decimal('orderPrice', 2);
    builder.integer('orderVolume');
    builder.string('orderType');
    builder.decimal('matchedPrice', 2);
    builder.integer('matchedVolume');
    builder.decimal('averagePrice', 2);
    builder.string('status');
    builder.string('statusName');
    builder.string('targetName');
    builder.string('mechanical');
    builder.string('actionType');
    builder.text('actionCondition');
    builder.decimal('tickGain', 2);
    builder.string('stop');
    builder.text('more');
  });

  await migrateTable(repositoryService, Databases.TABLE_PORTFOLIO, (builder: Knex.CreateTableBuilder) => {
    builder.string('account');
    builder.string('accountType');
    builder.string('symbol');
    builder.string('date');
    builder.integer('lastPosition');
    builder.integer('actualPosition');
    builder.decimal('averagePrice', 2);
    builder.decimal('instantProfit', 2);
    builder.decimal('totalProfit', 2);
    builder.string('createdAt').defaultTo(new Date().toISOString());
    builder.primary(['account', 'accountType', 'symbol', 'date']);
  });

  logger.info('[migrateInternal] DONE Migrate database | Scope: DERIVATIVE');
};

// ------------------------------------------------------------------------
const migrateFundamental = async (repositoryService: RepositoryService) => {
  logger.info('[migrateInternal] START Migrate database | Scope: FUNDAMENTAL');

  await migrateTable(repositoryService, Databases.TABLE_FUNDAMENTAL_ORDER, (builder: Knex.CreateTableBuilder) => {
    builder.string('orderId').primary();
    builder.string('originalId');
    builder.string('forwardActionId');
    builder.string('groupId').defaultTo(null);
    builder.string('account').defaultTo(null);
    builder.string('accountType').defaultTo(null);
    builder.string('side').defaultTo(null);
    builder.string('symbol').defaultTo(null);
    builder.string('orderDate');
    builder.string('orderTime');
    builder.decimal('orderPrice', 2);
    builder.integer('orderVolume');
    builder.string('orderType');
    builder.decimal('matchedPrice', 2);
    builder.integer('matchedVolume');
    builder.decimal('averagePrice', 2);
    builder.string('status');
    builder.string('statusName');
    builder.string('targetName');
    builder.string('mechanical');
    builder.string('actionType');
    builder.text('actionCondition');
    builder.decimal('tickGain', 2);
    builder.string('stop');
    builder.text('more');
  });

  await migrateTable(repositoryService, Databases.TABLE_FUNDAMENTAL_STOCK, (builder: Knex.CreateTableBuilder) => {
    builder.string('shortCode').primary();
    builder.string('standardCode');
    builder.string('name');
    builder.string('exchange');
    builder.string('group');
    builder.string('capital');
    builder.string('listedDate');
    builder.string('listedShare');
    builder.text('more');
  });

  logger.info('[migrateInternal] DONE Migrate database | Scope: FUNDAMENTAL');
};

// ------------------------------------------------------------------------
export { migrateInternal, migrateDerivative, migrateFundamental };
