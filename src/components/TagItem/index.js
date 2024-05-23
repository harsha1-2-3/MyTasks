import './index.css'

const TagItem = props => {
  const {onClickTag, tagDetails, isTagActive} = props
  const {optionId, displayText} = tagDetails

  const clickedTag = () => {
    onClickTag(optionId)
  }

  const activeTagClass = isTagActive ? 'TagLiBtnActive' : ''

  return (
    <li className="TagLi">
      <button
        onClick={clickedTag}
        type="button"
        className={`TagLiBtn ${activeTagClass}`}
      >
        {displayText}
      </button>
    </li>
  )
}
export default TagItem
