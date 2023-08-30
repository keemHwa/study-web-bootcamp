import { useParams } from "react-router-dom";
    // 커스텀 훅(별도의 라이브러리가 자신의 라이브러리의 기능을 더 편하게 사용할 수있도록 함 )

const Diary = () => {

    const { id } = useParams(); // path variable

    console.log(id);

    return (
        <div>
            <h1>Diary</h1>
            <p2>이곳은 일기 페이지 입니다.</p2>
        </div>
    );
};

export default Diary;