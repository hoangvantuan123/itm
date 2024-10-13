export class UserDto {
  id: number;
  companyId?: number;
  partnerId?: number;
  active: boolean;
  createDate: Date;
  login?: string;
  actionId?: number;
  createUid?: number;
  writeUid?: number;
  signature?: string;
  share: boolean;
  writeDate?: Date;
  totpSecret?: string;
  notificationType?: string;
  status?: string;
  karma: number;
  rankId?: number;
  nextRankId?: number;
  employeeCode?: string;
  name?: string;
  language?: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
