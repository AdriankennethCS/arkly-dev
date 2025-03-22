import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [goal, setGoal] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const submitGoal = async () => {
    setLoading(true);
    const response = await fetch("/api/submit-goal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goal }),
    });
    const data = await response.json();
    setTasks(data.tasks);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Arkly Control Center</h1>
      <div className="flex gap-2 w-full max-w-lg">
        <Input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Enter a goal for Arkly..."
          className="flex-1"
        />
        <Button onClick={submitGoal} disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </Button>
      </div>
      <div className="mt-6 w-full max-w-lg">
        {tasks.map((task, index) => (
          <Card key={index} className="mb-4 bg-gray-800">
            <CardContent>
              <p className="text-lg">{task.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
