import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { useNavigate } from "react-router-dom"
import remarkGfm from "remark-gfm"
import { Post } from "../../common/interface/Post"
import dateHandler from "../../common/util/dayjs"

interface commentsProps{
    comments: Post[]
}

interface commentProps{
  comment: Post
}
const CommentReply = ({comment}: commentProps) => {

  return (
    <div className="flex">
    <div className="flex-shrink-0 mr-3">
      <img className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8" src={comment.author?.picture} alt=""/>
    </div>
    <div className="flex-1 bg-white rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
      <strong>{comment.author?.username}</strong> <span className="text-xs text-gray-400">{comment.lastUpdated}</span>
      <p className="text-xs sm:text-sm">
        {comment.body}
      </p>
    </div>
  </div>
  )
}
const Comment = ({comment}: commentProps) => {
  const lastUpdated = comment.lastUpdated.split('.')[0].replace('T', ' ')
  const imgauth = comment.author?.picture === null ? window.location.origin + '/assets/default_profile_img.jpg': comment.author?.picture
  const navigate = useNavigate()
  const [replies, setReplies] = useState<React.ReactNode|React.ReactNode[]>(<></>)
  useEffect(() => {
    if(comment.replies?.length! > 1) return
    const newReplies = comment.replies?.map((c) => {
      return ( <CommentReply key={c.id} comment={c} /> )
    })
    setReplies(newReplies)
  }, [comment.replies])
  return (
  <div className="flex">


  {/* PARENT COMMENT */}
  <div className="flex border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed w-full">
  <div className="flex-row min-w-[7%]">
    <img className="w-full min-w-[5%]  rounded-full w-8 h-8 sm:w-10 sm:h-10" src={imgauth} alt=""/>
  </div>
  <div className="flex-row">
    <strong className="hover:cursor-pointer hover:text-blue-300" onClick={() => navigate(`/account/${comment.author?.id}`)}>{comment.author?.username}</strong> <span  title={dateHandler(lastUpdated).toString()} className="text-xs text-gray-400">{dateHandler(lastUpdated).fromNow(true)} ago</span>

    <p className="text-sm">
    <ReactMarkdown children={comment.body} remarkPlugins={[remarkGfm]} className="min-w-full prose" />
    </p>
    
    {/* Child COMMENTS GO */}
    <div className="space-y-4">
      {replies}
    </div>
    </div>
  </div>
  </div>
  )
}
const Comments = ({comments}: commentsProps) => {
  const newComments = comments.map((x) => {
    return <Comment key={x.id} comment={x} />
  })
  
  return (
    <div className="flex space-y-3 flex-col">
      {newComments}
    </div>
  )
}

export default Comments