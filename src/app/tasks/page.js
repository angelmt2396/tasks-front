'use client';
import TaskLists from "@/components/tasks/task-lists";
import {findAll} from "@/services/tasks";
import Link from "next/link";
import { useState, useEffect } from 'react';
import Pagination from "@/components/Pagination";

export default function Tasks () {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [hasData, setHasData] = useState(true);

    const fetchTasks = async (page) => {
        const data = await findAll({ page: page, order: 'desc' });
        console.log(data);
        setTasks(data.data);
        setTotalPages(data.pages);
        setHasData(data.data.length > 0);
    };

    useEffect(() => {
        fetchTasks(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
            <header className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">task name</h1>
                <div className="flex space-x-2">
                    <Link className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600" href={'/tasks/create'}>create
                    </Link>
                    <button className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600">search</button>
                </div>
            </header>
            <TaskLists tasks={tasks} />
            {hasData ? (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            ) : (
                <div className="flex justify-center mt-4">No tasks available</div>
            )}
        </div>
    );
}
