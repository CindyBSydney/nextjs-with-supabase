"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const supabase = createClient();

export function ToDoEdit({ tasks, setTask }: { tasks: any[]; setTask: any }) {
  const [task, setTaskState] = useState(tasks[0] || {});

  const [id, setId] = useState<number>(task?.id);
  const [title, setTitle] = useState<string>(task?.title);
  const [priority, setPriority] = useState<number>(task?.priority);
  const [done, setDone] = useState<boolean>(task?.done);

  // useEffect to update local state when the tasks prop changes
  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const task = tasks[0]; // Use the first task
      setId(task.id);
      setTitle(task.title);
      setPriority(task.priority);
      setDone(task.done);
      setTaskState(task);
    }
  }, [tasks]); // Effect runs whenever the tasks prop changes

  const handleEdit = async () => {
    const { error } = await supabase
      .from("TODO")
      .update({ priority, done })
      .eq("id", id);

    if (error) {
      console.error("Error updating record:", error.message);
    } else {
      console.log("Record updated successfully!");
      // Optionally update the parent state
      setTaskState({ id, title, priority, done });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <div style={{ marginBottom: "20px" }}>
          <label>Title: {title}</label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Priority
            <input
              style={{ marginLeft: "5px" }}
              type="number"
              min="0"
              max="5"
              value={priority || 0}
              onChange={(e) => setPriority(parseInt(e.target.value))}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Done
            <input
              style={{ marginLeft: "5px" }}
              type="checkbox"
              checked={done || false}
              onChange={(e) => setDone(e.target.checked)}
            />
          </label>
        </div>
        <Button className="bg-green-500" onClick={handleEdit}>
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
}

