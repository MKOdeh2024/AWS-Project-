import { Entity, PrimaryGeneratedColumn,BaseEntity,Column, CreateDateColumn, JoinColumn, OneToOne, OneToMany } from "typeorm"
import { Profile } from "./Profile.js"
import { Book } from "./Book.js"

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({length: 30 ,nullable : false})
    name: string

    @Column()
    age: number

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    takenAt: Date
    
    @Column()
    phoneNumber: string

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile

    @OneToMany(() => Book, (book) => book.user)
    Books: Book[]
}