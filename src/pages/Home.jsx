import { TaskCard } from '../components/TaskCard'
import { SearchBar } from '../components/SearchBar'
import { Filter } from '../components/FIlter'

export const Home = () => {
  return (
    <>
        <SearchBar />
        <Filter />
        <TaskCard />
    </>
  )
}