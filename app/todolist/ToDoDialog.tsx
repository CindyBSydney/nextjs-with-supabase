"use client";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
    DialogDescription,
    } from "@/components/ui/dialog";

    import { Button } from "@/components/ui/button";
    import { useState } from "react";

    import { createClient } from "@/utils/supabase/client";

    const handleCreate = async (title: string, priority: number) => {
        const supabase = createClient();
        const { data, error } = await supabase.from("TODO").insert([
            { title, priority },
        ])
        .select()
    }


    //function Dialog is used to return the dialog box, it is then used in the ToDoTable one the Add button is clicked, add button has an onClick() uses the Dialog function to allow for editing of the table
    export function ToDoDialog({table, setTask}: {table: any | null, setTask: any}) {  
        //tododialog is a function that takes in the table and setTask as parameters, the table is the table that is being edited and setTask is the function that is used to set the task
        //table is being passed in because it con
        
        
        const [title, setTitle] = useState<string>("");
        const [priority, setPriority] = useState<number>(0);

        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button className=" bg-blue-500"onClick={() => setTask("Add")}>Add</Button>
                </DialogTrigger>
                <DialogContent>
                    <label style={{marginLeft:"2px"}}>
                        Title
                        <input style={{marginLeft:"5px"}}
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <label style={{marginLeft:"2px"}}>
                        Priority
                        <input style={{marginLeft:"5px"}}
                            type="number"
                            //number should be between 0 and 5
                            min="0"
                            max="5"

                            value={priority}
                            onChange={(e) => setPriority(parseInt(e.target.value))}
                        />
                    </label>
                    <Button className=" bg-green-500" onClick={() => handleCreate(title, priority)}>Add</Button>
                </DialogContent>
                {/* <DialogFooter>
                    <Button className=" bg-red-500" onClick={() => handleCreate(title, priority)}>Add</Button>
                </DialogFooter> */}
            </Dialog>
        );
    }






    //function Dialog({table, setTask}: {table: string,  | null, setTask: any}) {