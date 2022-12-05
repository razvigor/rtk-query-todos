import { useState } from 'react';
import {
	useGetTodosQuery,
	useUpdateTodoMutation,
	useDeleteTodoMutation,
	useAddTodoMutation,
} from '../api/apiSlice';
import { FaTrash } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa';

const TodoList = () => {
	const [newTodo, setNewTodo] = useState('');

	const {
		data: todos,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetTodosQuery();
	const [addTodo] = useAddTodoMutation();
	const [updateTodo] = useUpdateTodoMutation();
	const [deleteTodo] = useDeleteTodoMutation();

	const handleSubmit = (e) => {
		e.preventDefault();
		addTodo({ userId: 1, title: newTodo, completed: false });
		setNewTodo('');
	};

	const newItemSection = (
		<form
			onSubmit={handleSubmit}
			className='flex justify-between gap-4 border border-gray-500 p-6'
		>
			<label htmlFor='new-todo' className='hidden'>
				Enter a new todo item
			</label>
			<div className='w-[90%]'>
				<input
					type='text'
					id='new-todo'
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					placeholder='Enter new todo'
					className='border w-full h-14 pl-4 rounded-md'
				/>
			</div>
			<button className='flex bg-gray-700 w-14 h-14 text-white rounded-md justify-center items-center'>
				<FaUpload />
			</button>
		</form>
	);

	let content;
	if (isLoading) {
		content = <p>Loading...</p>;
	} else if (isSuccess) {
		content = todos.map((todo) => {
			//JSON.stringify(todos)
			return (
				<article
					key={todo.id}
					className='flex justify-between items-center h-24 border border-gray-600 px-6'
				>
					<div className='flex gap-4 items-center'>
						<input
							type='checkbox'
							checked={todo.completed}
							id={todo.id}
							className='w-8 h-8'
							onChange={() =>
								updateTodo({ ...todo, completed: !todo.completed })
							}
						/>
						<label htmlFor={todo.id}>{todo.title}</label>
					</div>
					<button
						className='w-14 h-14 flex justify-center items-center border border-gray-500 rounded-lg text-red-600'
						onClick={() => deleteTodo({ id: todo.id })}
					>
						<FaTrash />
					</button>
				</article>
			);
		});
	} else if (isError) {
		content = <p>{error}</p>;
	}

	return (
		<main className='max-w-2xl mx-auto'>
			<h1 className='text-5xl my-11'>Todo List</h1>
			{newItemSection}
			<div className='my-10 flex flex-col gap-2'>{content}</div>
		</main>
	);
};

export default TodoList;
