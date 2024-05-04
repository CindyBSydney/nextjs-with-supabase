"use server";
import { createClient } from "@/utils/supabase/server";
import ToDoTable from "./ToDoTable";

import { json } from "stream/consumers";

export default async function Todo() {
  const supabase = createClient();
  let { data: TODO, error } = await supabase.from('TODO').select('*')
     
  return(
    <ToDoTable table={TODO}/>
  )
  
}
