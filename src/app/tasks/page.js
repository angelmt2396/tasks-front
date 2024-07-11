'use client';
import TaskLists from "@/components/tasks/task-lists";
import { findAll } from "@/services/tasks";
import Link from "next/link";
import { useState, useEffect } from 'react';
import Pagination from "@/components/Pagination";
import Loading from "@/components/loading";
import {ErrorModal} from "@/components/error-modal";

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [hasData, setHasData] = useState(true);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTasks = async (page) => {
        try {
            setLoading(true);
            const data = await findAll({ page: page, order: 'desc' });
            setTasks(data.data);
            setFilteredTasks(data.data);
            setTotalPages(data.pages);
            setHasData(data.data.length > 0);
        } catch(e) {
            setError('Something went wrong')
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (event) => {
        const input = event.target.value;
        setSearch(input);
        if (input === '') {
            setFilteredTasks(tasks);
        } else {
            const filtered = tasks.filter(task => task.name.toLowerCase().includes(input.toLowerCase()));
            setFilteredTasks(filtered);
        }
    };

    if (loading) {
        return <Loading />;
    }

    const closeErrorModal = () => setError(null);

    return (
        <div className="w-full max-w-7xl bg-white p-4 md:p-6 rounded-lg shadow-md mx-auto my-4 md:my-8">
            {error && <ErrorModal error={error} onClose={closeErrorModal} />}
            <header className="flex flex-col md:flex-row items-center justify-between mb-4 md:mb-6">
                <h1 className="text-xl md:text-2xl font-bold mb-2 md:mb-0">To Do List</h1>
                <div className="flex space-x-2">
                    <Link className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600" href={'/tasks/create'}>
                        Create
                    </Link>
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search tasks..."
                        className="px-4 py-2 border rounded"
                    />
                </div>
            </header>
            <TaskLists tasks={filteredTasks} />
            {hasData ? (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            ) : (
                <div className="flex justify-center mt-4">No tasks available</div>
            )}
        </div>
    );
}
