import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, BaseEntity } from "typeorm"

@Entity()
export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({length: 30 ,nullable : false})
    profileName: string

    @Column()
    email: string

    @Column()
    bio: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createAt: Date

}