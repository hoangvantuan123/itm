import { IsOptional, IsArray, IsString, IsDate } from 'class-validator';

export class FindCandidatesDto {
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    nameTags?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    phoneNumberTags?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    citizenshipIdTags?: string[];

    @IsOptional()
    @IsDate()
    startDate?: Date;

    @IsOptional()
    @IsDate()
    endDate?: Date;

    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number;
}
