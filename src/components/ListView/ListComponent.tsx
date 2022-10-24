

import {useState, useEffect } from 'react'
import PopupView from '../../view/PopupView'
import ListDetail from './ListDetail'
import { getUserGroups, getUserTopics } from '../../common/util/API'
import ListRow from './ListRow'
import { Topic } from '../../common/interface/Topic'
import { Group } from '../../common/interface/Group'
import { Spinner } from '../util/spinner'
import { useBoundStore } from '../../common/util/Store/Store'

interface ListComponentProps{
    apiFunction: () => Group[]|Topic[]

}
// no paginations as of yet
const ListComponent = (props:any) => {
    const [content, setContent] = useState<Topic[]|Group[]>([])
    const [loading, setLoading] = useState(true)
    const [showDetail, setShowDetail] = useState<boolean>(false)
    const [activeDetail, setActiveDetail] = useState<Topic|Group>()
    const store = useBoundStore((state) => state)
    const isGroup = content.some((a) => 'isPrivate' in a)
    const handleClickList = (el:Topic|Group) => {
        setActiveDetail(el)
    }
    const handleSetDetail = () =>
    {
        setShowDetail(true)
    }

    useEffect(() => {
        const renderWhenPostIsCreated = async () => {
            if(isGroup){ // is a group
                const groups = store.Groups
                if(groups.length > 0) {
                    const newestGroup = groups[groups.length-1]
                    setContent((state)  => {
                        return [...groups]
                })
                }
            }else { // is a topic
                const topics = store.Topics
                if(topics.length > 0){
                    const newTopic = store.Topics[store.Topics.length -1]
                    setContent((state)  => {
                        return [...topics]
                })
                }
            }
            
        }
        renderWhenPostIsCreated()
    },[isGroup, store.Groups, store.Topics])

    useEffect(() => {
        const getListData = async (props: () => Group[]|Topic[]) => {
            setLoading(true)
            const data = await props()
            setLoading(false)
            setContent(data)
        }
        getListData(props.apiFunction)
    }, [props.apiFunction])

    if(loading) return (<div className='h-screen w-screen'> <Spinner /></div>)
    
    return (
        <div>
            <div className='grid grid-flow-rows grid-cols-2 gap-6 mt-5 mx-2 px-1'>
                {content.map((x:Topic|Group) => {
                return <ListRow el={x} key={x.id}
                click={() => {handleClickList(x);handleSetDetail();}}
                 /> }
                )}
            </div>
            
        </div>
    )
}

export default ListComponent
