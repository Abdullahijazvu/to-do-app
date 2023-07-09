import { db} from '@vercel/postgres'
import { QueryResult} from '@vercel/postgres'
import { NextRequest, NextResponse } from 'next/server'
import {Todo,newTodo,db,todoTable} from '@/app/lib/drizzle'

export async function GET(request: NextRequest){
    // const client = await db.connect()

    try {
        // await client.sql'CREATE TABLE IF NOT EXISTS Todos(id serial, Task varchar(255))'
        // const res = await client.sql`SELECT * FROM Todos`
        // console.log(res.rows.find((item) => item.id === 1));
        // return NextResponse.json({ data: res})
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