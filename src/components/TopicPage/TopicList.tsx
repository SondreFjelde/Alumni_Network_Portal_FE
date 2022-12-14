import { getUserTopics } from "../../common/util/API"
import CreateTopicModal from "../CreateModal/CreateTopicModal"
import ListComponent from "../ListView/ListComponent"

const TopicList = () => {
  return (
    <div className="h-4/6 backgroundcolorMain mb-5">
      <div>
        <div className="pt-3 pb-7 flex justify-start">
          <div className="w-[46%]"></div>
          <h1 className="text-3xl font-semibold w-[36%] pt-4">
            Topics
          </h1>
          <div className="flex justify-start  mr-3 mt-4">
            <CreateTopicModal />
          </div>
        </div>
      </div>
      <ListComponent apiFunction={getUserTopics} />
    </div>
  )
}

export default TopicList
