export class CreateUserDto {
    companyId?: number;
    partnerId?: number;
    active: boolean;
    login?: string;
    password?: string;
    actionId?: number;
    signature?: string;
    share: boolean;
    writeDate?: Date;
    totpSecret?: string;
    notificationType?: string;
    status?: string;
    karma?: number;
    rankId?: number;
    nextRankId?: number;
    employee_code?: string;
    name_user?: string;
    language?: string;
}
