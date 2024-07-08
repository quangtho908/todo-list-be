import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("tasks_pkey", ["id"], { unique: true })
@Entity("tasks")
class Tasks {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    name: "name",
    nullable: false,
    type: "text",
    length: 80
  })
  name!: string;

  @Column({
    name: "start_date",
    nullable: true,
    type: "text"
  })
  startDate!: string

  @Column({
    name: "end_date",
    nullable: true,
    type: "text"
  })
  endDate!: string
}

export default Tasks;