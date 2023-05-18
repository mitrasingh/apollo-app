import { TaskCard } from '../components/TaskCard'
import { SearchBar } from '../components/SearchBar'
import { Filter } from '../components/Filter'
import { useSelector } from 'react-redux'

export const Home = () => {

  const user = useSelector((state) => state.user.user);
  console.log(user)
  return (
    <>
        <SearchBar />
        <Filter />
        <TaskCard />
    </>
  )
} 