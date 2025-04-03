import { Header } from '@/components/Header'
import { StatsBar } from './components/StatsBar'
import { TaskInput } from './components/TaskInput/TaskInput'
import { TodoList } from './components/TodoList/TodoList'

function App() {

  return (
    <div className="min-h-screen bg-gray-200">
      <Header />
      <div className="min-h-screen flex items-start justify-center">
        <div className="w-full max-w-xl shadow-lg bg-white rounded-sm border-2 border-gray-300 ">
          <TaskInput />
          <TodoList />
          <StatsBar />
        </div>
      </div>
    </div>

  )
}

export default App
