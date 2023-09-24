import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, OneToOne , BaseEntity} from "typeorm"
import { Profile } from "./Profile.js"

@Entity()
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({length: 30 ,nullable : false})
    label: string


    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createAt: Date
    

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile
}