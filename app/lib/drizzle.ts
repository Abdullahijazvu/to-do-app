import {
    pgTable,
    serial,
    text,
    varchar,
    timestamp,
    boolean
} from 'drizzle-orm/pg-core'
import {drizzle} from 'drizzle-orm/vercel-postgres'
import {sql} from '@vercel/postgres'
import {inferModel } from 'drizzle-orm'

export const todoTable = pgTable("Todos", {
    id: serial("id").primaryKey(),
    task: varchar("Task", {length:255}).notNull()
})

export type Todo = inferModel<typeof todoTable>
export type newTodo = inferModel<typeof todoTable, "insert">

export const db = drizzle(sql)

db.insert(todoTable).values({
    task: ""
})