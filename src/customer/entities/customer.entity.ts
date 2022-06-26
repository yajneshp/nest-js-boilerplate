import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Customer {
    @PrimaryColumn()
    rec_id: number;

    @Column()
    first_name: string;
    @Column()
    last_name: string;
    @Column()
    middle_name: string;
    @Column({ default: 1})
    organization: string;
    @Column({ default: 1})
    created: string;
    @Column({ default: 1})
    updated: string;

}
