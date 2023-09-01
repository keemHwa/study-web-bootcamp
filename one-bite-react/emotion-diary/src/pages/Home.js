import { useContext, useEffect, useState } from "react";
import MyHeader from "../components/Myheader";
import MyButton from "../components/MyButton";
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";

const Home = () => {

    const diaryList = useContext(DiaryStateContext);


    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date()); 
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`

    useEffect(() => {  // mount 될 때, 넘어온 데이터를 현재 조회하는 날짜에 맞춰서 filter

        if (diaryList.length === 0)
            return ;

        // 현재 조회 달의 첫번째 날짜 
        const firstDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth(),
            1
        ).getTime();

        const lastDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth() + 1,
            0
        ).getTime();

        setData(diaryList.filter((it)=> firstDay <= it.date && it.date <=  lastDay))
    }, [diaryList,curDate]); // diaryList와 curDate가 변화하는 순간에 diaryList filter
    
    useEffect(() => { console.log(data)}, [data]);

    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()))
    };

    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()))
    };

    return (
        <div>
            <MyHeader headerText={headText}
                leftChild={<MyButton text={'<'} onClick={decreaseMonth} />}
                rightChild={<MyButton text={`>`} onClick={increaseMonth} />}
            />
            <DiaryList diaryList={data}/>
        </div>
    );
};

export default Home;