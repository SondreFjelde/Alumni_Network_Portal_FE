import { Group } from "./Group"
import { Topic } from "./Topic"
import { UserProfile } from "./UserProfile"

export interface Event{

    name: string,
    description: string,
    lastUpdated: Date,
    startTime: Date,
    endTime: Date,
    allowGuests: boolean
    banner: string,
    usersAccepted: UserProfile[],
    //om event skal tilhøre både group og topic:
    group: Group,
    topic: Topic,
    //eller om eventet kun skal tilhøre én:
    parent: Group | Topic
    //uten å vite hvordan dere bakendere har tenkt det, antar jeg 

}