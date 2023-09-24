import { Entity,BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, OneToOne, ManyToOne, JoinTable, ManyToMany } from "typeorm"
import { Profile } from "./Profile.js"
import { User } from "./User.js"
import { Tag } from "./Tag.js"

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({length: 30 ,nullable : false})
    title: string

    @Column()
    author: string

    @Column()
    publicationYear: number

    @Column()
    rate: number

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createAt: Date

    @ManyToOne(() => User, (user) => user.Books)
    user: User

    @ManyToMany(() => Tag)
    @JoinTable()
    Tags: Tag[]
}