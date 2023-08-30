import { TaskCard } from "../components/TaskCard";
import { SearchBar } from "../components/SearchBar";
import { Filter } from "../components/Filter";
import { RefreshButton } from "../components/RefreshButton";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../utils/firebase-config";
import { Row, Col, Container } from "react-bootstrap";

export const Home = () => {
	// initial state for task data from database
	const [tasks, setTasks] = useState([]);
	const [tasksFiltered, setTasksFiltered] = useState([])
	const [isClearFilterDisplayed, setIsClearFilterDisplayed] = useState(false)

	//user input for SearchBar
	const [userInput, setUserInput] = useState("");

	// pulling data from database and mapping each task into the tasks variable
	const fetchTasks = async () => {
		try {
			const data = await getDocs(query(collection(db, "tasks")));
			setTasks(data.docs.map((doc) => ({ ...doc.data(), taskId: doc.id })));
			setTasksFiltered(data.docs.map((doc) => ({ ...doc.data(), taskId: doc.id })));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchTasks()
	}, [])

	// refreshes tasks state by retrieving any new data from database, clears displays to original list, clears user search value
	const refreshTasksHandle = () => {
		fetchTasks()
		setIsClearFilterDisplayed(false)
	};

	// receiving user input from SearchBar component
	const userInputSearchBar = (formInput) => {
		setUserInput(formInput);
	};

	// filter options fuctionality for the dropdown filter button
	const filterNewestHandle = () => {
		const sortNew = [...tasks].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
		setTasksFiltered(sortNew)
		setIsClearFilterDisplayed((current) => !current)
	};

	const filterOldestHandle = () => {
		const sortOld = [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
		setTasksFiltered(sortOld)
		setIsClearFilterDisplayed((current) => !current)
	};

	const filterPriorityHandle = (priority) => {
		setTasksFiltered(tasks.filter((task) => task.priorityLevel === priority));
	};

	const filterStatusHandle = (status) => {
		setTasksFiltered(tasks.filter((task) => task.statusProject === status));
		setIsClearFilterDisplayed((current) => !current)
	};

	const filterSearchHandle = () => {
		setTasksFiltered(tasks.filter((task) => task.taskName.toLowerCase().includes(userInput.toLowerCase())));
		setIsClearFilterDisplayed((current) => !current)
	}

	return (
		<>
			<SearchBar
				userInputSearchBar={userInputSearchBar}
				filterSearchHandle={filterSearchHandle}
			/>
			<Container className="mt-2">
				<Row>
					<Col xs lg="1">
						<Filter
							filterNewestHandle={filterNewestHandle}
							filterOldestHandle={filterOldestHandle}
							filterPriorityHandle={filterPriorityHandle}
							filterStatusHandle={filterStatusHandle}
						/>
					</Col>
					<Col xs lg="2" className="mt-1 px-3">
						<RefreshButton
							refreshTasksHandle={refreshTasksHandle}
							filterSearchHandle={filterSearchHandle}
							isClearFilterDisplayed={isClearFilterDisplayed}
						/>
					</Col>
				</Row>

				{tasksFiltered.length === 0 && <p className="mt-4 d-flex justify-content-center">No tasks found</p>}

				{tasksFiltered.map((task) => {
					return (
						<TaskCard
							refreshTasksHandle={refreshTasksHandle}
							task={task}
							key={task.taskId}
						/>
					)
				})}

			</Container>
		</>
	);
};