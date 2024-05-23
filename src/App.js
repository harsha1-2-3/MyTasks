import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TagItem from './components/TagItem'
import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    tasksList: [],
    taskTypeIdState: tagsList[0].optionId,
    activeTagId: '',
    inputValue: '',
  }

  onChangeInput = event => {
    this.setState({inputValue: event.target.value})
  }

  onChangeOption = event => {
    this.setState({
      taskTypeIdState: event.target.value,
    })
  }

  onClickAddTaskBtn = event => {
    event.preventDefault()
    const {inputValue, taskTypeIdState} = this.state
    const taskTypeObj = tagsList.find(each => each.optionId === taskTypeIdState)
    const newTaskObj = {
      id: uuidv4(),
      taskTypeIdValue: taskTypeIdState,
      taskTypeText: taskTypeObj.displayText,
      taskUserText: inputValue,
    }

    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newTaskObj],
      inputValue: '',
      taskTypeIdState: tagsList[0].optionId,
    }))
    console.log(taskTypeIdState)
  }

  onClickTag = optionId => {
    const {tasksList} = this.state
    const filteredTasks = tasksList.filter(
      ec => ec.taskTypeIdValue === optionId,
    )
    this.setState({tasksList: filteredTasks, activeTagId: optionId})
    console.log(filteredTasks)
    console.log(optionId)
    console.log(tasksList)
  }

  render() {
    const {activeTagId, inputValue, tasksList, taskTypeIdState} = this.state

    return (
      <div className="BgMyTasks">
        <form onSubmit={this.onClickAddTaskBtn} className="InputSideCont">
          <h1 className="InputHead">Create a task!</h1>
          <div className="InputCont">
            <label htmlFor="Task" className="InputLabel">
              Task
            </label>
            <input
              value={inputValue}
              onChange={this.onChangeInput}
              id="Task"
              placeholder="Enter the task here"
              className="InputBox"
              type="text"
            />
          </div>
          <div className="InputCont">
            <label htmlFor="Tags" className="InputLabel">
              Tags
            </label>
            <select
              value={taskTypeIdState}
              onChange={this.onChangeOption}
              id="Tags"
              className="InputBox"
            >
              {tagsList.map(eachTag => (
                <option key={eachTag.optionId} value={eachTag.optionId}>
                  {eachTag.displayText}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="AddTaskBtn">
            Add Task
          </button>
        </form>
        <div className="TasksTagsSide">
          <h1 className="TTHead">Tags</h1>
          <ul className="TagsUl">
            {tagsList.map(tagDetails => (
              <TagItem
                isTagActive={tagDetails.optionId === activeTagId}
                onClickTag={this.onClickTag}
                key={tagDetails.optionId}
                tagDetails={tagDetails}
              />
            ))}
          </ul>
          <h1 className="TTHead">Tasks</h1>
          {tasksList.length === 0 ? (
            <p className="TaskPara">No Tasks Added Yet</p>
          ) : (
            <ul className="TasksUl">
              {tasksList.map(taskDetails => (
                <li
                  tasktypeid={taskDetails.taskTypeIdValue}
                  key={taskDetails.id}
                  className="TaskLi"
                >
                  <p className="TaskHead">{taskDetails.taskUserText}</p>
                  <p className="TaskTag">{taskDetails.taskTypeText}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default App
