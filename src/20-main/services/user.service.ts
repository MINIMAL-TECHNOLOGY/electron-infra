import { RepositoryService } from '@Main/services';
import { Databases } from '@Common/constants';

export class UserService {
  private static instance: UserService;
  private repositoryService: RepositoryService;

  constructor() {
    this.repositoryService = RepositoryService.getInstance();
  }

  public static getInstance(): UserService {
    if (!this.instance) {
      this.instance = new UserService();
    }

    return this.instance;
  }

  async getSavedAccount() {
    const tokenRs = await this.repositoryService.find({
      table: Databases.TABLE_ACCOUNT,
      fields: ['account', 'username', 'fullName', 'credentialKey', 'credentialSecret'],
    });

    return tokenRs;
  }

  async deactivateAllAccounts() {
    const tokenRs = await this.repositoryService.update({
      table: Databases.TABLE_ACCOUNT,
      condition: { isUsed: 1 },
      value: { isUsed: 0 },
    });

    return tokenRs;
  }

  async getActiveAccount() {
    const tokenRs = await this.repositoryService.find({
      table: Databases.TABLE_ACCOUNT,
      fields: ['account', 'username', 'fullName', 'accessToken', 'credentialKey', 'credentialSecret'],
      condition: { isUsed: 1 },
    });

    return tokenRs;
  }
}
