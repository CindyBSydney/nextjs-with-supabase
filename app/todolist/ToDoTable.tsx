"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ToDoDialog } from "./ToDoDialog";
import { ToDoEdit } from "./ToDoEdit"; 
//[{"id":1,"created_at":"2024-04-24T09:31:08+00:00","title":"Display TODO in NextJS","priority":0,"done":false}]

type Props = {
  table: any[] | null;
};

function ToDoTable({ table }: Props) {
  const [task, setTask] = useState<string>(""); // task is a string that is used to set the task
  const supabase = createClient();


  async function remove(id: number) {
    const { error } = await supabase
    .from("TODO")
    .delete()
    .eq("id", id); // eq is a filter to match the id
  }

  return (
    <div className="my-6 w-full overflow-y-auto">

      <ToDoDialog table={table} setTask={setTask} />
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Created At</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Done</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {table?.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.created_at}</TableCell>
              <TableCell>{todo.title}</TableCell>
              <TableCell>{todo.priority}</TableCell>
              <TableCell>{todo.done}</TableCell>
              <TableCell>

                <Button style={{ marginRight: "10px"}}
                  className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => remove(todo.id)}
                >
                  Delete
                </Button>

                <ToDoEdit tasks={table} setTask={setTask} />


              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default ToDoTable;
