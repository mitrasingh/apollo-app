import { TopicCard } from "../components/TopicCard";
import { Container } from "react-bootstrap";
import { CreateTopicForm } from "../components/CreateTopicForm";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../utils/firebase-config";

export const Shoutboard = () => {
	// Current state of data fetched from getTopics function
	const [topicArray, setTopicArray] = useState([]);

	// Triggers the display component of CreateTopicForm.jsx when user invokes an action
	const [isCreateTopic, setIsCreateTopic] = useState(false);

	// Triggers refresh topic list when user posts a new topic via CreateTopicForm.jsx
	const [isTopicsRefreshed, setIsTopicsRefreshed] = useState(false);

	// Function that fetches data from database by querying "topics" collection
	useEffect(() => {
		const fetchTopics = async () => {
			try {
				const dbRef = collection(db, "topics")
				const topicsData = await getDocs(query(dbRef))
				const topicsMap = topicsData.docs.map((doc) => ({ ...doc.data(), topicId: doc.id }))
				setTopicArray(topicsMap);
			} catch (error) {
				console.log(error);
			}
		};
		fetchTopics();
	}, [isTopicsRefreshed]);

	// onClick function for displaying component CreateTopicForm.jsx
	const handleCreateTopic = () => {
		!isCreateTopic ? setIsCreateTopic(true) : setIsCreateTopic(false);
	};

	// console.log(typeof topicArray[0].datePosted)
	return (
		<Container className="mt-4">
			<Button
				style={{ fontSize: "9px", maxHeight: "20px" }}
				className="d-flex align-items-center"
				variant="dark"
				onClick={handleCreateTopic}
			>
				{!isCreateTopic ? "+ Create Topic" : "- Close"}
			</Button>

			{isCreateTopic ? (
				<CreateTopicForm
					setIsCreateTopic={setIsCreateTopic}
					setIsTopicsRefreshed={setIsTopicsRefreshed}
				/>
			) : null}

			{topicArray.map((topic) => {
				return <TopicCard topic={topic} key={topic.topicId} />;
			})}
		</Container>
	);
};
