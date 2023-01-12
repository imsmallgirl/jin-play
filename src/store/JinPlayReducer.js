import newjeans from '../image/newjeans.jpg'
import 김세정 from '../image/김세정.JPG'
import beo from '../image/beo.jpeg'
import iu from '../image/IU.jpg'
import mcthemax from '../image/mcthemax.jpeg'

import Eight from '../music/Eight.mp3'
import everyday from '../music/everyday.mp3'
import 사계 from '../music/사계.mp3'
import countingstars from '../music/countingstars.mp3'
import hypeboy from '../music/hypeboy.mp3'



export const JinPlayList = [
    {
        title : "Hype Boy",
        artist : "New Jeans",
        img : newjeans,
        src : hypeboy,
        id: 1
    },
    {
        title : "에잇 (Eight)",
        artist : "IU (아이유)",
        img : iu,
        src : Eight,
        id: 2
    },
    {
        title : "Counting Stars",
        artist : "Beo (feat.Beenzino)",
        img : beo,
        src : countingstars,
        id: 3
    },
    {
        title : "나의 모든 날",
        artist : "김세정",
        img : 김세정,
        src : everyday,
        id: 4
    },
    {
        title : "사계",
        artist : "이수 (MC THE MAX)",
        img : mcthemax,
        src : 사계,
        id: 5
    },
]

const initialState = {
    JinPlayList,
    currentIndex : 0,
    currentMusicId : JinPlayList[0].id,
    currentTime : 0,
    duration : 0,
    playing : false,
    repeat : "ALL",
}

const repeatMode = ["ONE" , "ALL" , "SHUFFLE"]

const PLAY_MUSIC = "musicPlayer/PLAY_MUSIC";
const PAUSE_MUSIC = "musicPlayer/PAUSE_MUSIC";
const CURRENT_TIME = "musicPlayer/CURRENT_TIME";
const DURATION_TIME = "musicPlayer/DURATION_TIME";
const NEXT_MUSIC = "musicPlayer/NEXT_MUSIC";
const PREV_MUSIC = "musicPlayer/PREV_MUSIC";
const SET_REPEAT = "musicPlayer/SET_REPEAT";
const SET_CURRENT_INDEX = "musicPlayer/SET_CURRENT_INDEX";
const UPDATE_PLAY_LIST = "musicPlayer/UPDATE_PLAY_LIST";




export const playMusic = () => ({type:PLAY_MUSIC})
export const pauseMusic = () => ({type:PAUSE_MUSIC})
export const updateCurrentTime = (ct) => ({type:CURRENT_TIME, ct})
export const updateDurationTime = (dt) => ({type:DURATION_TIME, dt})
export const nextMusic = () => ({type:NEXT_MUSIC})
export const prevMusic = () => ({type:PREV_MUSIC})
export const setRepeat = () => ({type:SET_REPEAT})
export const setCurrentIndex = (index) => ({type:SET_CURRENT_INDEX, index})
export const updatePlayList = (newPlayList) => ({type:UPDATE_PLAY_LIST ,newPlayList})


const getRandomNum = (arr, excludeNum) => {
    const randomNumber = Math.floor(Math.random() * arr.length)
    return arr[randomNumber] === excludeNum ?
    getRandomNum(arr.excludeNum) : arr[randomNumber]
}

export default function JinPlayReducer(state = initialState, action){
    switch(action.type){
        case PLAY_MUSIC : 
            return {
                ...state,
                playing : true,
            }

        case PAUSE_MUSIC :
            return{
                ...state,
                playing : false,
            }

        case CURRENT_TIME :
            const { ct } = action
            return{
                ...state,
                currentTime : ct,
            }

        case DURATION_TIME :
            const { dt } = action
            return{
                ...state,
                duration : dt,
            }

        case NEXT_MUSIC :
            const nextIndex = state.repeat === "SHUFFLE" ? 
            getRandomNum(Array.from(Array(JinPlayList.length).keys()), state.currentIndex)
            :(state.currentIndex + 1) % state.JinPlayList.length;
            return{
                ...state,
                currentIndex : nextIndex,
                currentMusicId : state.JinPlayList[nextIndex].id
            }
        
        case PREV_MUSIC :
            const prevIndex = state.repeat === "SHUFFLE" ?
            getRandomNum(Array.from(Array(JinPlayList.length).keys()), state.currentIndex)
            : (state.currentIndex-1 + state.JinPlayList.length) % state.JinPlayList.length
            return{
                ...state,
                currentIndex : prevIndex,
                currentMusicId : state.JinPlayList[prevIndex].id
            }
        
        case SET_REPEAT :
            return{
                ...state,
                repeat : repeatMode[(repeatMode.indexOf(state.repeat) + 1) % repeatMode.length]
            }

        case SET_CURRENT_INDEX :
            return{
                ...state,
                currentIndex : action.index,
                currentMusicId : state.JinPlayList[action.index].id
            }

        case UPDATE_PLAY_LIST :
            const { newPlayList } = action
            return{
                ...state,
                JinPlayList : newPlayList,
                currentIndex : newPlayList.findIndex(music => music.id === state.currentMusicId)
            }

        default : return state;
    }
}
