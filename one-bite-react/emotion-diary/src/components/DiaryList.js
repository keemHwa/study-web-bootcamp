import { useState } from "react"
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";


const sortOptionList = [
    { value: 'latest', name: '최신순' },
    { value: 'oldest', name: '오래된순' }
];

const filterOptinList = [
    {value:'all',name:'전부다'},
    {value:'good',name:'좋은 감정만'},
    {value:'bad',name:'나쁜 감정만'}
];

const ControlMenu = ({value,onChange,optionList}) => {
    return (
        <select className='ControlMenu' value={value} onChange={(e) => onChange(e.target.value)}>
            {/*  onChange -> setSortType */}
            {optionList.map((it,idx) =>
                <option key={idx} value={it.value}> {it.name} </option>
                )}
        </select>
    )
}

const DiaryList = ({ diaryList }) => {

    const navigate = useNavigate();
    
    const [sortType, setSortType] = useState('lastest'); 
        // 해당 컴포넌트(DiaryList)의 상태(sortType)가 변경 될 때마다 컴포넌트(DiaryList)가 리렌더링 된다. 
            // 동시에 getProcessedDiaryList도 호출된다. 그러면서 DiaryList가 정렬 되는 것 
    const [filter, setFilter] = useState('all');

    const getProcessedDiaryList = () => {

        const filterCallBack = (item) => { // 필터링 조건 return 
            if (filter === 'good') {
                return parseInt(item.emotion) <= 3
            } else {
                return parseInt(item.emotion) > 3
            }
        }
        // .sort는 원본 배열을 재정렬한다.
        const compare = (a,b) => {
            if (sortType === 'latest') { // 정렬 순서를 정해주는 것 
                return parseInt(b.date) - parseInt(a.date); //string이 들어 올 수 있기에 
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        }

        const copyList = JSON.parse(JSON.stringify(diaryList)) // 깊은 복사
        // 1. JSON.stringify(diaryList): 원본 객체 diaryList를 JSON 문자열로 변환
        // 2. JSON.parse(...): JSON 문자열을 다시 JavaScript 객체로 변환, 이 단계에서 새로운 객체가 생성.
        
        const filteredList = filter === 'all' ? copyList :
            copyList.filter((it)=>filterCallBack(it)) // return true를 반환하는 애들만 
        const sortedList = filteredList.sort(compare);

        /**
         * array.sort(compareFunction) 
         * compareFunction은 두 개의 인수를 받아서 비교하며 비교 함수의 반환 값에 따라 정렬 순서가 결정된다.
            만약 compareFunction(a, b)이 0보다 작은 값을 반환하면 a가 b보다 앞에 오도록 정렬
            만약 compareFunction(a, b)이 0을 반환하면 a와 b의 순서는 변경되지 않는다. 
            만약 compareFunction(a, b)이 0보다 큰 값을 반환하면 b가 a보다 앞에 오도록 정렬
         */
        return sortedList;
    };

    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
                    <ControlMenu value={filter} onChange={setFilter} optionList={filterOptinList} />
                </div>
                <div className="right_col">
                    <MyButton type={'positive'} text={'새 일기쓰기'} onClick={() => { navigate('/new')}}/>
                </div>
            </div>
            {getProcessedDiaryList().map((it) =>
                <DiaryItem key={it.id} {...it} />
            )}
        </div>
    )
}

DiaryList.defaultProps = {
    diaryList : []
};

export default DiaryList;