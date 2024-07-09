import TaskItem from './task-item';
export default function TaskLists ({ tasks }) {
    console.log(tasks);
    return (
        <div className="space-y-4">
            {tasks.map(task => (
                <TaskItem key={task.uuid} task={task}/>
            ))}
        </div>
    );
};