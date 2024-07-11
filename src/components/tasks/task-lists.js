import TaskItem from './task-item';
export default function TaskLists ({ tasks }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white table-fixed md:table-auto">
                <thead className="bg-gray-50">
                <tr className="hidden md:table-row">
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left
                        text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Task Name
                    </th>
                    <th className="px-4 py-2 md:px-6 md:py-3
                        text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigned to
                    </th>
                    <th className="px-4 py-2 md:px-6 md:py-3
                        text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Resolved
                    </th>
                    <th className="px-4 py-2 md:px-6 md:py-3
                        text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Start Date
                    </th>
                    <th className="px-4 py-2 md:px-6 md:py-3
                        text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        End Date
                    </th>
                    <th className="px-4 py-2 md:px-6 md:py-3
                        text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody className="block md:table-row-group">
                {tasks.map(task => (
                    <TaskItem key={task.uuid} task={task}/>
                ))}
                </tbody>
            </table>
        </div>
    );
};