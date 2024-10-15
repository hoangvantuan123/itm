import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('hr_salary')
export class HrSalary {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: true })
    no: number;

    @Column({ type: 'text', nullable: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    monthly_salary: string;

    @Column({ type: 'date', nullable: true })
    date_in: Date;

    @Column({ type: 'text', nullable: true })
    cid: string;

    @Column({ type: 'text', nullable: true })
    department: string;

    @Column({ type: 'float', nullable: true })
    total: number;

    @Column({ type: 'float', nullable: true })
    normal_150: number;

    @Column({ type: 'float', nullable: true })
    normal_200: number;

    @Column({ type: 'float', nullable: true })
    normal_210: number;

    @Column({ type: 'float', nullable: true })
    night_30: number;

    @Column({ type: 'float', nullable: true })
    sunday_200: number;

    @Column({ type: 'float', nullable: true })
    sunday_270: number;

    @Column({ type: 'float', nullable: true })
    holiday_300: number;

    @Column({ type: 'float', nullable: true })
    holiday_390: number;

    @Column({ type: 'float', nullable: true })
    total_late_in: number;

    @Column({ type: 'float', nullable: true })
    total_early_out: number;

    @Column({ type: 'float', nullable: true })
    total_late_in_early_out: number;

    @Column({ type: 'float', nullable: true })
    tong_ngay_nghi: number;

    @Column({ type: 'float', nullable: true })
    paid_leave: number;

    @Column({ type: 'float', nullable: true })
    nghi_co_phep_khong_luong: number;

    @Column({ type: 'float', nullable: true })
    phep_thang_nay: number;

    @Column({ type: 'float', nullable: true })
    ton_phep_thang_nay: number;

    @Column({ type: 'float', nullable: true })
    so_ngay_di_lam_trong_thang: number;

    @Column({ type: 'float', nullable: true })
    so_ngay_di_lam_thuc_te: number;

    @Column({ type: 'float', nullable: true })
    ky_nhan: number;

    @Column({ type: 'float', nullable: true })
    muon_phep: number;


    /* add  */

    @Column({ type: 'float', nullable: true })
    offcical: number;
    
    @Column({ type: 'float', nullable: true })
    probation: number;

    @Column({ type: 'json', nullable: true })
    start: Record<string, string>;

    @Column({ type: 'json', nullable: true })
    stop: Record<string, string>;

    @Column({ type: 'json', nullable: true })
    day_off: Record<string, string>;

    @Column({ type: 'json', nullable: true })
    overtime_normal_150: Record<string, string>;

    @Column({ type: 'json', nullable: true })
    overtime_normal_200: Record<string, string>;

    @Column({ type: 'json', nullable: true })
    overtime_normal_210: Record<string, string>;

    @Column({ type: 'json', nullable: true })
    at_night_30: Record<string, string>;

    @Column({ type: 'json', nullable: true })
    overtime_sunday_200: Record<string, string>;

    @Column({ type: 'json', nullable: true })
    overtime_sunday_270: Record<string, string>;

    @Column({ type: 'json', nullable: true })
    overtime_holiday_300: Record<string, string>;

    @Column({ type: 'json', nullable: true })
    overtime_holiday_390: Record<string, string>;

    @Column({ type: 'json', nullable: true })
    working_day: Record<string, string>;

    @Column({ type: 'json', nullable: true })
    late_in: Record<string, string>;

    @Column({ type: 'json', nullable: true })
    early_out: Record<string, string>;
    /* Đồng bộ */
    @Column({ type: 'boolean', default: false })
    synchronize: boolean;
    /*  */
    @Column({ type: 'boolean', default: false })
    synchronize_erp: boolean;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_date: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    write_date: Date;

    constructor() {
        const defaultJson = {
            "1": "",
            "2": "",
            "3": "",
            "4": "",
            "5": "",
            "6": "",
            "7": "",
            "8": "",
            "9": "",
            "10": "",
            "11": "",
            "12": "",
            "13": "",
            "14": "",
            "15": "",
            "16": "",
            "17": "",
            "18": "",
            "19": "",
            "20": "",
            "21": "",
            "22": "",
            "23": "",
            "24": "",
            "25": "",
            "26": "",
            "27": "",
            "28": "",
            "29": "",
            "30": "",
            "31": ""
        };

        this.start = { ...defaultJson };
        this.stop = { ...defaultJson };
        this.day_off = { ...defaultJson };
        this.overtime_normal_150 = { ...defaultJson };
        this.overtime_normal_200 = { ...defaultJson };
        this.overtime_normal_210 = { ...defaultJson };
        this.at_night_30 = { ...defaultJson };
        this.overtime_sunday_200 = { ...defaultJson };
        this.overtime_sunday_270 = { ...defaultJson };
        this.overtime_holiday_300 = { ...defaultJson };
        this.overtime_holiday_390 = { ...defaultJson };
        this.working_day = { ...defaultJson };
        this.late_in = { ...defaultJson };
        this.early_out = { ...defaultJson };
    }
}
