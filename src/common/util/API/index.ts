import axios from "./api"
import { UserProfile, UserProfilePatch } from "../../interface/UserProfile"
import { Post } from "../../interface/Post"
import { Topic } from "../../interface/Topic"
import { Group } from "../../interface/Group"
import { Event } from "../../interface/Event"
import { PostPaginationResponse } from "../../interface/pagination"
import { stringify } from "querystring"


export const getOrCreateUserProfile = async (): Promise<UserProfile> => {
    const userData = await axios.get('/api/Users')
    .catch(async (err) => {
        return (await axios.post(`/api/users`,{})).data
    }
    )
    return userData.data
}

export const updateUserProfile = async (user: UserProfile): Promise<number> => {
    const userToPatch: UserProfilePatch = {
        id: user.id,
        status: user.status,
        bio: user.bio,
        funFact: user.funFact,
        picture: user.picture
    }
    const status = (await axios.patch(`/api/users/${user.id}`, userToPatch)).status
    return status
}

export const getUserById = async (id: number): Promise<UserProfile> => {
    const user: UserProfile = (await axios.get(`/api/users/${id}`)).data
    return user
}

export const getAllPosts = async (page:number, itemsPerPage: number): Promise<PostPaginationResponse> => {
    const posts  = (await axios.get(`/api/posts?Page=${page}&ItemsPerPage=${itemsPerPage}`))
    return posts.data
}
export const getAllPostsForTopic= async (topicId: number, page:number, itemsPerPage: number): Promise<PostPaginationResponse> => {
    const posts  = (await axios.get(`/api/posts/topic/${topicId}?Page=${page}&ItemsPerPage=${itemsPerPage}`))
    return posts.data
}

export const getGroupPosts = async (groupId: number, page:number, itemsPerPage: number): Promise<PostPaginationResponse> => {
    const posts  = (await axios.get(`/api/posts/group/${groupId}?Page=${page}&ItemsPerPage=${itemsPerPage}`))
    return posts.data
}
export const getEventPosts = async (eventId: number, page:number, itemsPerPage: number): Promise<PostPaginationResponse> => {
    const posts  = (await axios.get(`/api/posts/event/${eventId}?Page=${page}&ItemsPerPage=${itemsPerPage}`))
    return posts.data
}


export const addCommentToPost = async (postId: number, comment: string): Promise<Post> => {
    const postData = {
        body: comment,
        parentId: postId
    }
    const post: Post = (await axios.post('/api/posts', postData)).data
    return post
}
export const getUserTopics = async (): Promise<Topic[]> => {
    return (await axios.get(`/api/Topics`)).data
}

export const getUserGroups = async (): Promise<Group[]> => {
    return (await axios.get(`/api/Groups`)).data
}
export const getUserEvents = async (): Promise<Event[]> => {
    return (await axios.get('/api/Events')).data
}
export const getTopicById = async (id:number): Promise<Topic> => {
    const topic = (await axios.get(`/api/Topics/${id}`))
    return topic.data
}
export const getGroupById = async (id:number): Promise<Group> => {
    return (await axios.get(`/api/groups/${id}`)).data
}

export const getEventById = async (id:number): Promise<Event> => {
    return (await axios.get(`/api/events/${id}`)).data
}


export const addGroup = async (title: string, description: string, isPrivate: boolean): Promise<Group> => {
    const groupData = {
        title: title,
        body: description,
        isPrivate: isPrivate
    }
    const group: Group = (await axios.post('/api/groups', groupData)).data
    return group
}

export const addTopic = async (title: string, description: string): Promise<Topic> => {
    const topicData = {
        title: title,
        body: description,
    }
    const topic: Topic = (await axios.post('/api/topics', topicData)).data
    return topic
}

// Fix pls
export const addPost = async (title: string, description: string, topicId:number|undefined,eventId:number|undefined,groupId:number|undefined): Promise<Post> => {
    const postData = {
        title: title,
        body: description,
        topicId: topicId,
        eventId:eventId,
        groupId:groupId,
    }
    const post: Post = (await axios.post('/api/posts', postData)).data
    return post
}

export const addEvent = async (name: string, description: string,  startTime: string, endTime: string): Promise<Event> => {
    const postData = {
        name: name,
        body: description,
        startTime: startTime,
        endTime: endTime,
        allowGuests: true,
    }
    const event: Event = (await axios.post('/api/events', postData)).data
    return event
}

export const addEventTopic = async (eventId: number, topicId: number): Promise<any> => {
    const postData = {
        eventId: eventId,
        topicId: topicId
    }
    return (await axios.post(`/api/events/${postData.eventId}/invite/topic/${postData.topicId}`, postData))//.data
}

export const addEventGroup = async (eventId: number, groupId: number): Promise<any> => {
    const postData = {
        eventId: eventId,
        groupId: groupId
    }
    return (await axios.post(`/api/events/${postData.eventId}/invite/group/${postData.groupId}`, postData))//.data
}



export const addTopicMember = async (topicId: number): Promise<any> => {

    return (await axios.post(`api/Topics/${topicId}/join`))
}

export const addGroupMember = async (groupId: number): Promise<any> => {    
    return (await axios.post(`api/Groups/${groupId}/Join`))
}

export const addEventMember = async (eventId: number): Promise<any> => {
    return (await axios.post(`api/events/${eventId}/rsvp`))
}

export const leaveGroup = async (groupId: number): Promise<any> => {

    return (await axios.delete(`api/Groups/${groupId}/Leave`))
}

export const leaveTopic = async (topicId: number): Promise<any> => {

    return (await axios.delete(`api/Topics/${topicId}/Leave`))
}

export const putComment = async (comment: Post): Promise<boolean> => {
    const putObj = {
        "id": comment.id,
        "title": comment.title,
        "body": comment.body,
        "authorId": comment.author ? comment.author.id : -1,
        "recieverId": comment.receiverId,
        "topicId": comment.topicId,
        "groupId": comment.groupId,
        "eventId": comment.eventId,
        "parentId": comment.parentId
    }
    return (await axios.put(`api/posts/${comment.id}`, putObj)).status === 204
}