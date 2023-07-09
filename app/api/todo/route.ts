// import { db} from '@vercel/postgres'
import { QueryResult} from '@vercel/postgres'
import { NextRequest, NextResponse } from 'next/server'
import {Todo,newTodo,db,todoTable} from '@/app/lib/drizzle'
import { sql } from '@vercel/postgres'

export async function GET(request: NextRequest){

    try {
        await sql'CREATE TABLE IF NOT EXISTS Todos(id serial, Task varchar(255))';
        const res = await db.select().from(todoTable)
        console.log(res);
        return NextResponse.json({ data: res})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Something went wrong"})
    }
}

export async function POST(request:NextRequest) {
    const req = await request.json()
    const client = await db.connect()
    try {
        if(req.task){
            await client.sql`INSERT INTO Todos(Task) VALUES (${req.task})`
            return NextResponse.json({message: "Data added successfully"})
        }else{
            throw new Error("Task field is required")
        }
    } catch (error) {
        return NextResponse.json({message: (error as {message:string}).message})
    }
}